const Student = require("../models/student.model");

class StudentController {
  async CreateStudent(req, res) {
    //console.log(req.body);
    try {
      const { name, email, phone, address } = req.body;
      if (!name || !email || !phone || !address) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      const studentData = new Student({
        name,
        email,
        phone,
        address,
      });

      const data = await studentData.save();
      return res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new StudentController();
