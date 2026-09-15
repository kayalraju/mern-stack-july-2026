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
//create statioc folder
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


const homeRoute=require('./src/router/home.route');
const studentRoute=require('./src/router/student.route');
app.use(homeRoute);
app.use('/api',studentRoute);





const Port=process.env.PORT || 3000;

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})