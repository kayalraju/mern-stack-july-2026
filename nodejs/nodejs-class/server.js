const express=require('express');



const app=express();

app.get('/',(req,res)=>{
    res.send("<h1>hello world</h1>")
})

app.get('/about',(req,res)=>{
    res.send("<h1>hello about</h1>")
})
app.get('/contact',(req,res)=>{
    res.send("<h1>hello contact</h1>")
})

const Port=3006

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})