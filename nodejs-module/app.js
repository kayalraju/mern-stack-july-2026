const fs=require('fs');

// Create a new file and write some content to it
// fs.writeFile('test.txt', 'Hello, this is a sample text file!', (err) => {
//     if (err) throw err;
//     console.log('File has been created and content written!');
// });


// Read the content of the file
// fs.readFile('test.txt', 'utf8',(err, data) => {
//     if (err) throw err;
//     console.log('Content of the file:', data);
// });

//append content to the file
// fs.appendFile('test.txt', '\nThis is an appended line.', (err) => {
//     if (err) throw err;
//     console.log('Content has been appended to the file!');
// });



const path = require('path');
//console.log(path)
// const filePath = path.join(__dirname, 'test.txt');
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('Content of the file:', data);
// });

// console.log('Directory name:', __dirname);
// console.log('File name:', __filename);



// const os = require('os');
// console.log('Operating System Info:');
// console.log('Platform:', os.platform());


const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, this is a simple HTTP server!');
});


const Port = 3000;
server.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});