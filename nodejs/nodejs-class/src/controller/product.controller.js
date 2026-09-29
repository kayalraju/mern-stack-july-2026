const Product = require("../models/product.model");



class ProductController {
  async getProduct(req, res) {
    const products = await Product.find();
    return res.render("crud/list", {
      title: "Product listing Page",
      product: products,
     
    });
  }

  async createProduct(req, res) {
    return res.render("crud/add", {
      title: "Product create Page",
     
    });
  }
  async storeProduct(req, res) {
    //console.log(req.body);
    try{
        const{name,price,description,brand}=req.body;
        const product=new Product({
            name,
            price,
            description,
            brand
        });
        const data=await product.save();
        //console.log(data);
        if(data){
           return res.redirect('/product')
        }else{
            return res.redirect('/product/create')
        }
        
    }catch(error){
        console.log(error);
    }
  }
}

module.exports = new ProductController();
