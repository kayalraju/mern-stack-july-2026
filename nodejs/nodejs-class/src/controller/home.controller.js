


class HomeController{

    async home(req,res){
        const data={
            name:"Raju",
            age:20,
            address:"Bangalore",
            course:"Nodejs"
        }
        res.render('home',{
            title:'Home Page',
            user:"Raju",
            data:data
        })
    }

    async about(req,res){
        res.render('about',{
            title:'About Page'
        })
    }   

}


module.exports=new HomeController()