const express=require('express');
const authController = require('../controller/auth.controller');
const Auth = require('../middleware/auth');
const Validation = require('../validation');
const AuthValidation = require('../validation/user.validation');


const Router=express.Router();


Router.post('/register', Validation.validate(AuthValidation.signup),authController.register)
Router.post('/verify',authController.verify)
Router.post('/login',authController.login)
Router.get('/dashboard',Auth,authController.dashboard)
Router.post('/update-password',Auth,authController.updatePassword)
Router.post("/reset-password/link",authController.resetPasswordLink);
Router.post("/reset-password/:id/:token",authController.resetPassword);





module.exports=Router