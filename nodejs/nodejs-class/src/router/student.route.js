const express=require('express');
const StudentController = require('../controller/Student.Controller');
const upload = require('../utils/multer');
const Auth = require('../middleware/auth');
const Validation = require('../validation');
const StudentValidation = require('../validation/student.validation');

const Route=express.Router();



Route.post('/student/create', Validation.validate(StudentValidation.createStudent),Auth,upload.single('image'),StudentController.CreateStudent)
Route.get('/student',Auth,StudentController.getStudent)
Route.get('/student/:id',Auth,StudentController.getsingledata)
Route.put('/student/update/:id',Auth,StudentController.updateStudent)
Route.delete('/student/delete/:id',Auth,StudentController.deleteStudent)


//search student
Route.get("/search", StudentController.searchStudent);

Route.get("/filter", StudentController.filterStudent);
module.exports=Route


