const express=require('express');
const productController = require('../controller/product.controller');


const Router=express.Router();


Router.get('/product',productController.getProduct)


module.exports=Router