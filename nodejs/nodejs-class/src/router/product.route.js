const express=require('express');
const productController = require('../controller/product.controller');


const Router=express.Router();


Router.get('/product',productController.getProduct)
Router.get('/product/create',productController.createProduct)
Router.post('/product/Store',productController.storeProduct)
Router.get('/product/edit/:id',productController.editProduct)
Router.post('/product/update/:id',productController.updateProduct)
Router.get('/product/delete/:id',productController.deleteProduct)

//soft delete
Router.get('/product/softdelete/:id',productController.softDeleteProduct)



module.exports=Router