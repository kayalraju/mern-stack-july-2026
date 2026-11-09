const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

class AuthEjsController {
  async CheckAuth(req, res, next) {
    try {
      if (req.user) {
        next();
      } else {
        res.redirect("/user/login");
      }
    } catch (err) {
      logger.error(err);
    }
  }
  async register(req, res) {
    try {
      res.render("register");
    } catch (error) {
      console.log(error);
    }
  }

  async createregister(req, res) {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
      });
      const result = await user.save();
      logger.info(result);

      if (result) {
        console.log("register successfully");

        return res.redirect("/user/login");
      } else {
        logger.error("register failed");

        return res.redirect("/register/user");
      }
    } catch (err) {
      logger.error(err);
      return res.redirect("/register/user");
    }
  }

  async login(req, res) {
    try {
      res.render("login");
    } catch (error) {
      console.log(error);
    }
  }

  async createlogin(req, res) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        logger.error("All input is required");
        return res.redirect("/user/login");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const tokendata = await jwt.sign(
          { user_id: user._id, name: user.name, email: user.email },
          process.env.JWT_SECRET_KEY_EJS,
          {
            expiresIn: "2h",
          },
        );
        if (tokendata) {
          res.cookie("token", tokendata);
          return res.redirect("/user/dashboard");
        } else {
          logger.error("login failed");
          return res.redirect("/user/login");
        }
      }
      logger.error("login failed");
      return res.redirect("/user/login");
    } catch (err) {
      logger.error(err);
      return res.redirect("/user/login");
    }
  }

  async dashboard(req, res) {
    try {
      res.render("dashboard", {
        user: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token");
      return res.redirect("/user/login");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthEjsController();
