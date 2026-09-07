


class HomeController{

    async home(req,res){
        res.send("<h1>hello world</h1>")
    }

    async about(req,res){
        res.send("<h1>about page</h1>")
    }   

}





module.exports=new HomeController()