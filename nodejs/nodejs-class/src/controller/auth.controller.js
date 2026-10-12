const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

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
}

module.exports = new AuthController();
