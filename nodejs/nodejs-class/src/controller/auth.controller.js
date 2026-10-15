const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt=require('jsonwebtoken')

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
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
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
}

module.exports = new AuthController();
