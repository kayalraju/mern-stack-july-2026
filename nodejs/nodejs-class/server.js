require('dotenv').config();
const express=require('express');
const ejs=require('ejs');



const app=express();

app.set('view engine','ejs');
app.set('views','./src/views');

const homeRoute=require('./src/router/home.route');
app.use(homeRoute);





const Port=process.env.PORT || 3000;

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})