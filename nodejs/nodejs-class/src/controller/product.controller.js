const Product = require("../models/product.model");



class ProductController {
  async getProduct(req, res) {
    const products = await Product.find({is_deleted: false});
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

  async editProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.redirect('/product')
      }
      res.render("crud/edit", {
        title: "Product Edit Page",
        product: product
      });
    }catch (error) {
      console.log(error);
    }
  }

  async updateProduct(req, res) {
    try{
      const id = req.params.id;
      if(!id){
        return res.redirect('/product')
      }
      const { name, price, description, brand } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, description, brand },
        { new: true }
      );
      return res.redirect('/product');

    }catch(error){
      console.log(error);
    }
  }
  async deleteProduct(req, res) {
    try{
      const id = req.params.id;
      if(!id){
        return res.redirect('/product')
      }
      const deletedProduct = await Product.findByIdAndDelete(id);
      return res.redirect('/product');
    }catch(error){
      console.log(error);
    }
  }


  async softDeleteProduct(req, res) {
    try{
      const id = req.params.id;
      if(!id){
        return res.redirect('/product')
      }
      const deletedProduct = await Product.findByIdAndUpdate(id, { is_deleted: true }, { new: true });
      return res.redirect('/product');
    }catch(error){
      console.log(error);
    }
  }
}

module.exports = new ProductController();
