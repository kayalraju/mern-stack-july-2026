const Student = require("../models/student.model");

class StudentController {
  async CreateStudent(req, res) {
    //console.log(req.body);
    //console.log(req.file);
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

      if (req.file) {
        studentData.image = req.file.path;
      }

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

  async getStudent(req, res) {
    try {
      const getstudent = await Student.find();
      return res.status(200).json({
        success: true,
        message: "Student fetched successfully",
        total: getstudent.length,
        data: getstudent,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getsingledata(req, res) {
    try {
      const id = req.params.id;

      const getSingleData = await Student.findById(id);
      if (!getSingleData) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "get signle data",
        data: getSingleData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const id = req.params.id;
      const { name, email, phone, address } = req.body;
      const updatestudent = await Student.findByIdAndUpdate(
        id,
        { name, email, phone, address },
        { new: true },
      );
      if (!updatestudent) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Data updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const id = req.params.id;
      await Student.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Data delete successfully",
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
