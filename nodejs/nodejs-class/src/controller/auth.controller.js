const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt=require('jsonwebtoken');
const verifyedEmail = require("../utils/send.mail");
const OTP = require("../models/otp.model");

class AuthController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hsahedpassword = await bcryptjs.hash(password, salt);
      const user = new User({
        name,
        email,
        phone,
        password: hsahedpassword,
      });
      const data = await user.save();
      await verifyedEmail(req, data);
      return res.status(201).json({
        success: true,
        message: "User created successfully and OTP sent to email for verification",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async verify(req,res){
    try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "user doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.isVerified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await OTP.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.isVerified) {
                    // console.log(existingUser);
                    await verifyedEmail(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 10 * 60 * 1000 calculates the expiration period in milliseconds(10 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 10 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await verifyedEmail(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.isVerified = true;
            await existingUser.save();

            // Delete email verification document
            await OTP.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            return res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
        }

  }

  async login(req,res){
    try{
      const {email,password}=req.body
      if(!email || !password){
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
      const isMatch = await bcryptjs.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

       if(!user.isVerified){
            return res.status(400).json({
                success: false,
                message: "Please verify your email",
              });
        }

      const token=jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone
      },process.env.JWT_SECRET_KEY,{expiresIn:"1d"})

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user:{
          id:user._id,
          name:user.name,
          email:user.email,
          phone:user.phone
        },
        token:token,
      });
    }catch(error){
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

  }

  async dashboard(req,res){
    try{
      return res.status(200).json({
        success: true,
        message: "welcome to user Dashboard",
        user:req.user
      });
    }catch(error){
      return res.status(500).json({
        success: false,
        message: error.message,
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
    const isMatch = await bcryptjs.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Check new password is different
    const isSamePassword = await bcryptjs.compare(
      newPassword,
      user.password
    );

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
}

module.exports = new AuthController();
