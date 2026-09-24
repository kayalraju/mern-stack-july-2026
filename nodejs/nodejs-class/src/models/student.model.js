const mongoose=require('mongoose')

const Schema=mongoose.Schema

const studentSchema=new Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
   phone:{
       type:Number,
       required:[true,'Phone is required'],
       unique:true
   },
   image:{
       type:String,
       required:false,
       default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
   },
   address:{
       type:String,
       required:[true,'Address is required']
   },
   createdAt:{
       type:Date,
       default:Date.now
   }
    
},{
    timestamps:true
})

const StudentModel=mongoose.model('student',studentSchema)

module.exports=StudentModel