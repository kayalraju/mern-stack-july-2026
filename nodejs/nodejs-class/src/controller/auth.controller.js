const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyedEmail = require("../utils/send.mail");
const OTP = require("../models/otp.model");
const logger = require("../utils/logger");
const transporter = require("../config/emailconfig");
const httpStatus = require("../utils/status.code");
const {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  refreshCookieOptions,
  getRefreshExpiry,
} = require("../utils/auth.token");

class AuthController {
  
async register(req, res) {
  try {
    const { name, email, phone, password } = req.body;

    // 1. Validate fields
    if (!name || !email || !phone || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // 4. Create user document (not saved yet)
    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      password: hashedPassword,
    });

    // 5. Send verification email first
    //await verifyedEmail(req, user);

    // 6. Save user only after email succeeds
    const data = await user.save();

    // 7. Success response
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully and OTP sent to email",
    });

  } catch (error) {
    console.error("Registration Error:", error);

    if (error.code === 11000) {
      return res.status(httpStatus.CONFLICT).json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(httpStatus.SERVER_ERROR).json({
      success: false,
      message: "Unable to register user. Please try again.",
    });
  }
}


  async verify(req, res) {
    try {
      const { email, otp } = req.body;
      // Check if all required fields are provided
      if (!email || !otp) {
        return res
          .status(400)
          .json({ status: false, message: "All fields are required" });
      }
      const existingUser = await User.findOne({ email });

      // Check if email doesn't exists
      if (!existingUser) {
        return res
          .status(404)
          .json({ status: "failed", message: "user doesn't exists" });
      }

      // Check if email is already verified
      if (existingUser.isVerified) {
        return res
          .status(400)
          .json({ status: false, message: "Email is already verified" });
      }
      // Check if there is a matching email verification OTP
      const emailVerification = await OTP.findOne({
        userId: existingUser._id,
        otp,
      });
      if (!emailVerification) {
        if (!existingUser.isVerified) {
          // console.log(existingUser);
          await verifyedEmail(req, existingUser);
          return res
            .status(400)
            .json({
              status: false,
              message: "Invalid OTP, new OTP sent to your email",
            });
        }
        return res.status(400).json({ status: false, message: "Invalid OTP" });
      }
      // Check if OTP is expired
      const currentTime = new Date();
      // 10 * 60 * 1000 calculates the expiration period in milliseconds(10 minutes).
      const expirationTime = new Date(
        emailVerification.createdAt.getTime() + 10 * 60 * 1000,
      );
      if (currentTime > expirationTime) {
        // OTP expired, send new OTP
        await verifyedEmail(req, existingUser);
        return res
          .status(400)
          .json({
            status: "failed",
            message: "OTP expired, new OTP sent to your email",
          });
      }
      // OTP is valid and not expired, mark email as verified
      existingUser.isVerified = true;
      await existingUser.save();

      // Delete email verification document
      await OTP.deleteMany({ userId: existingUser._id });
      return res
        .status(200)
        .json({ status: true, message: "Email verified successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: false,
          message: "Unable to verify email, please try again later",
        });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Validate fields
      if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }
      // 2. Find user
      const user = await User.findOne({
        email: email.trim().toLowerCase(),
      }).select("+password +refreshTokenHash");

      console.log("user",user);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // 3. Verify password
      const isMatch = await bcryptjs.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // 4. Verify email
      if (!user.isVerified) {
        return res.status(403).json({
          success: false,
          message: "Please verify your email",
        });
      }

      // 5. Generate tokens
      const accessToken = generateAccessToken(user);

      const refreshToken = generateRefreshToken(user);

      // 6. Hash refresh token
      const refreshTokenHash = hashToken(refreshToken);

      // 7. Save refresh token in database
      user.refreshTokenHash = refreshTokenHash;

      user.refreshTokenExpiresAt = getRefreshExpiry();

      user.lastLogin = new Date();

      await user.save();

      // 8. Set HTTP-only cookie
      res.cookie(
        "refreshToken",
        refreshToken,
        refreshCookieOptions()
      );

      // 9. Response
      return res.status(200).json({
        success: true,
        message: "Login successful",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          lastLogin: user.lastLogin,
        },

        accessToken,
      });

    } catch (error) {
      console.error("Login Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
 

  async refreshToken(req,res){
    try {

      // 1. Get refresh token from cookie
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token is required",
        });
      }

      // 2. Verify refresh token
      let decoded;

      try {
        decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET_KEY,
          {
            algorithms: ["HS256"],
            issuer: "my-app",
            audience: "my-app-client",
          }
        );

      } catch (error) {

        res.clearCookie(
          "refreshToken",
          refreshCookieOptions()
        );

        return res.status(401).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
      }

      // 3. Validate token type
      if (
        decoded.type !== "refresh" ||
        !decoded.sub ||
        !decoded.jti
      ) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token",
        });
      }

      // 4. Generate hash of incoming token
      const incomingHash = hashToken(refreshToken);

      // 5. Find user
      const user = await User.findOne({
        _id: decoded.sub,
        refreshTokenHash: incomingHash,
        refreshTokenExpiresAt: {
          $gt: new Date(),
        },
      }).select("+refreshTokenHash");

      if (!user) {
        res.clearCookie(
          "refreshToken",
          refreshCookieOptions()
        );

        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please login again",
        });
      }

      // 6. Generate new tokens
      const newAccessToken = generateAccessToken(user);

      const newRefreshToken = generateRefreshToken(user);

      // 7. Hash new refresh token
      const newRefreshTokenHash = hashToken(
        newRefreshToken
      );

      // 8. Atomically replace old refresh token
      const result = await User.updateOne(
        {
          _id: user._id,
          refreshTokenHash: incomingHash,
          refreshTokenExpiresAt: {
            $gt: new Date(),
          },
        },
        {
          $set: {
            refreshTokenHash: newRefreshTokenHash,
            refreshTokenExpiresAt: getRefreshExpiry(),
          },
        }
      );

      // 9. Prevent reuse of an already rotated token
      if (result.modifiedCount !== 1) {
        res.clearCookie(
          "refreshToken",
          refreshCookieOptions()
        );

        return res.status(401).json({
          success: false,
          message: "Refresh token already used or invalid",
        });
      }

      // 10. Set new refresh token cookie
      res.cookie(
        "refreshToken",
        newRefreshToken,
        refreshCookieOptions()
      );

      // 11. Return new access token
      return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
      });

    } catch (error) {

      console.error("Refresh Token Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }


  async dashboard(req, res) {
    try {
      return res.status(200).json({
        success: true,
        message: "welcome to user Dashboard",
        user: req.user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

    // LOGOUT
  async logout(req, res) {
    try {

      const refreshToken = req.cookies?.refreshToken;

      if (refreshToken) {

        const refreshTokenHash = hashToken(refreshToken);

        // Invalidate refresh token in database
        await User.updateOne(
          {
            refreshTokenHash,
          },
          {
            $set: {
              refreshTokenHash: null,
              refreshTokenExpiresAt: null,
            },
          }
        );
      }

      // Clear cookie
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth",
      });

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });

    } catch (error) {

      console.error("Logout Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async updatePassword(req, res) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;

      // Validate fields
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check new password confirmation
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "New password and confirm password do not match",
        });
      }

      // Find logged-in user
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      }

      // Check old password
      const isMatch = await bcryptjs.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect",
        });
      }

      // Check new password is different
      const isSamePassword = await bcryptjs.compare(newPassword, user.password);

      if (isSamePassword) {
        return res.status(400).json({
          success: false,
          message: "New password must be different from old password",
        });
      }

      // Hash new password
      const hashedPassword = await bcryptjs.hash(newPassword, 10);

      // Update password
      user.password = hashedPassword;

      // Save user
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      logger.error(`Update password error: ${error.message}`);

      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating password",
      });
    }
  }

  async resetPasswordLink(req,res){
    try{
       const { email } = req.body;
        if (!email) {
          return res.status(400).json({ status:false, message: "Email field is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ status:false, message: "Email doesn't exist" });
        }
        // Generate token for password reset
        const secret = user._id + process.env.JWT_SECRET_KEY ;
        const forgetpasswordLink = jwt.sign({ userID: user._id }, secret, { expiresIn: '20m' });
        //logger.info(forgetpasswordLink);
        // Reset Link and this link generate by frontend developer
        const resetLink = `${process.env.FRONTEND_HOST}/account/reset-password-confirm/${user._id}/${forgetpasswordLink}`;
        //console.log(resetLink);
        // Send password reset email  
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link",
          html: `<p>Hello ${user.name},</p><p>Please <h1 style="background-color: #4CAF50; color: white;"><a href="${resetLink}">Click Here to reset your password</a></h1> to reset your password.</p>`
        });
        // Send success response
        return res.status(201).json({ status:true, message: "Password reset email sent. Please check your email." });

    }catch(error){
       return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

  }

  async resetPassword(req,res){

    try{
        const { password, confirm_password } = req.body;
       const { id, token } = req.params;
       const user = await User.findById(id);
       if (!user) {
         return res.status(500).json({ status:false, message: "User not found" });
       }
       // Validate token check 
       const new_secret = user._id + process.env.JWT_SECRET_KEY;
       const checkLINK = jwt.verify(token, new_secret);
       if (!checkLINK) {
         return res.status(500).json({ status:false, message: "Invalid link" });
       }
 
          if (!password || !confirm_password) {
            return res.status(400).json({ status:false, message: "New Password and Confirm New Password are required" });
          }
 
       if (password !== confirm_password) {
         return res.status(500).json({ status:false, message: "New Password and Confirm New Password don't match" });
       }
        // Generate salt and hash new password
        const salt = await bcryptjs.genSalt(10);
        const newHashPassword = await bcryptjs.hash(password, salt);
  
        // Update user's password
        await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });
  
        // Send success response
        res.status(200).json({ status: "success", message: "Password reset successfully" });
  
     }catch(error){
       return res.status(500).json({ status: "failed", message: "Unable to reset password. Please try again later." });
     }

  }
}

module.exports = new AuthController();
