require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const path=require('path');
const DbConnection=require('./src/config/dbcon');



const app=express();
//db connection
DbConnection();

app.set('view engine','ejs');
app.set('views','./src/views');
//json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//create statioc folder
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))


const homeRoute=require('./src/router/home.route');
const studentRoute=require('./src/router/student.route');
const productRoute=require('./src/router/product.route');
const authRouter= require('./src/router/auth.route');
app.use(productRoute);
app.use(homeRoute);
app.use('/api',studentRoute);
app.use('/api',authRouter);

//*****admin router */

const adminRouter=require('./src/router/admin/admin.auth.router')
app.use('/api/admin',adminRouter)


const Port=process.env.PORT || 3000;

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})