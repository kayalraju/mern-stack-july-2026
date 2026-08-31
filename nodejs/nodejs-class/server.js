const http=require('http');



const server=http.createServer((req,res)=>{
    res.write('Hello World!');
    res.end();
})
const port=3000
server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});