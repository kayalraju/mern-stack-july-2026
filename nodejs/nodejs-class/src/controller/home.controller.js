


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
    async admin(req,res){
        const {id,name} =req.params
        return res.send(`Admin Page ${id} and name is ${name}`)
    }   

}


module.exports=new HomeController()