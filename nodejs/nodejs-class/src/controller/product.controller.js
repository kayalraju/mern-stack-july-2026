


class ProductController{

    async getProduct(req,res){
        const Product=[
        {
            
        }
    ]

    return res.render('product',{
        title:'Product Page',
        Product
    })
    }

}



module.exports = new ProductController();