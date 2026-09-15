const express=require('express');
const StudentController = require('../controller/Student.Controller');

const Route=express.Router();



Route.post('/student/create',StudentController.CreateStudent)






module.exports=Route


