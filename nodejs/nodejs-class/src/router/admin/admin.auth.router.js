const express=require('express');
const adminController = require('../../controller/admin/admin.controller');
const AdminAuth = require('../../middleware/admin.auth');
const Router=express.Router();


Router.post('/login',adminController.login)
Router.get('/dashboard',AdminAuth,adminController.dashboard)






module.exports=Router