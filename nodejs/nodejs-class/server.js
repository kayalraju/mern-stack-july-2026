require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const path=require('path');



const app=express();

app.set('view engine','ejs');
app.set('views','./src/views');
//create statioc folder
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


const homeRoute=require('./src/router/home.route');
app.use(homeRoute);





const Port=process.env.PORT || 3000;

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})