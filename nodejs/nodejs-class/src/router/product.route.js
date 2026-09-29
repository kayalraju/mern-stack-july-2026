const express=require('express');
const productController = require('../controller/product.controller');


const Router=express.Router();


Router.get('/product',productController.getProduct)
Router.get('/product/create',productController.createProduct)
Router.post('/product/Store',productController.storeProduct)


module.exports=Router