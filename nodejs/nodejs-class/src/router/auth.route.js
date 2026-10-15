const express=require('express');
const authController = require('../controller/auth.controller');
const Auth = require('../middleware/auth');


const Router=express.Router();


Router.post('/register',authController.register)
Router.post('/login',authController.login)
Router.get('/dashboard',Auth,authController.dashboard)





module.exports=Router