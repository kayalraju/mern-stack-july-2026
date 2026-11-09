const express=require('express');
const authEjscontroller = require('../controller/auth.ejscontroller');
const AuthCheck = require('../middleware/auth.check');



const Router=express.Router();


Router.get('/register/user',authEjscontroller.register)
Router.post('/register/create',authEjscontroller.createregister)
Router.get('/user/login',authEjscontroller.login)
Router.post('/user/login/create',authEjscontroller.createlogin)
Router.get('/user/dashboard',AuthCheck,authEjscontroller.CheckAuth,authEjscontroller.dashboard)
Router.get('/user/logout',AuthCheck,authEjscontroller.CheckAuth,authEjscontroller.logout)




module.exports=Router