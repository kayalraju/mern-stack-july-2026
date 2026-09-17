const express=require('express');
const StudentController = require('../controller/Student.Controller');

const Route=express.Router();



Route.post('/student/create',StudentController.CreateStudent)
Route.get('/student',StudentController.getStudent)
Route.get('/student/:id',StudentController.getsingledata)
Route.put('/student/update/:id',StudentController.updateStudent)
Route.delete('/student/delete/:id',StudentController.deleteStudent)






module.exports=Route


