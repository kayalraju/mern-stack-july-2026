const jwt=require('jsonwebtoken')

const Auth=(req,res,next)=>{
    const token=req.headers['authorization']
   if(!token){
       return res.status(400).json({
           success:false,
           message:"Token is required for authentication"
       })
   }
   const brearToken=token.split(" ")[1]
   if(!brearToken){
       return res.status(400).json({
           success:false,
           message:"Token is required"
       })
   }

   try{
    const decode=jwt.verify(brearToken,process.env.JWT_SECRET_KEY)
    req.user=decode

   }catch(error){
       return res.status(400).json({
           success:false,
           message:"invalid token"
       })
   }
  return next()
  
}


module.exports=Auth