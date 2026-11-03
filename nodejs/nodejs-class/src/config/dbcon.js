const mongoose=require('mongoose');
const logger = require('../utils/logger');
const DBConnection=async()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URL);
       if(conn.connection.readyState===1){
        logger.info('Database connected successfully');
       }else{
        logger.error('Database connection failed');
       }
        
    } catch (error) {
        logger.error('Error connecting to database:', error);
    }
}


module.exports= DBConnection
