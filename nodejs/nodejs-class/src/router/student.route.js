const express=require('express');
const StudentController = require('../controller/Student.Controller');
const upload = require('../utils/multer');

const Route=express.Router();



Route.post('/student/create',upload.single('image'),StudentController.CreateStudent)
Route.get('/student',StudentController.getStudent)
Route.get('/student/:id',StudentController.getsingledata)
Route.put('/student/update/:id',StudentController.updateStudent)
Route.delete('/student/delete/:id',StudentController.deleteStudent)






module.exports=Route


