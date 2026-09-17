const express=require('express');
const homeController = require('../controller/home.controller');

const Router=express.Router();


Router.get('/',homeController.home)
Router.get('/about',homeController.about)
Router.get('/admin/:id/:name',homeController.admin)

module.exports=Router