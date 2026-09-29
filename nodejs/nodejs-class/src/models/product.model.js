const mongoose=require('mongoose')

const Schema=mongoose.Schema

const ProductSchema=new Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    price:{
        type:String,
        required:[true,'Price is required']
    },
   description:{
       type:String,
       required:[true,'Description is required']
   },
   image:{
       type:String,
       required:false,
       default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
   },
   brand:{
       type:String,
       required:[true,'Brand is required']
   },
    
},{
    timestamps:true
})

const ProductModel=mongoose.model('product',ProductSchema)

module.exports=ProductModel