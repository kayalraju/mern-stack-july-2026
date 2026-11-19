const Employee = require("../models/emoloyee.model");
const httpStatusCode = require("../utils/status.code");
class EmployeeController {
  async createEmployee(req, res) {
    try {
      const { firstname, lastname, email, gender, salary, department } =
        req.body;
      const newEmployee = new Employee({
        firstname: firstname,
        lastname: lastname,
        email: email,
        gender: gender,
        salary: salary,
        department: department,
      });

      const employee = await newEmployee.save();
      if (!employee) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Employee is not created",
          data: null,
        });
      } else {
        return res.status(httpStatusCode.CREATED).json({
          status: true,
          message: "Employee created successfully!",
          data: employee,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllEmployee(req, res) {
    try {

        const aggridateData=[
            {
                $project:{
                    __v:0,
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            },
            {
                $set:{
                    fullname:{$concat:["$firstname","$lastname"]}
                }
            }
        ]
      const employee = await Employee.aggregate(aggridateData);
      return res.status(httpStatusCode.OK).json({
        status: true,
        message: "Employee fetched successfully!",
        total: employee.length,
        data: employee,
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllEmployeeaggregate(req,res){

    
    try{
       const aggData= await Employee.aggregate([
        {
            $project:{
                __v:0,
            }
        },
        // {
        //     $match:{
        //         // salary:{$gt:20000}
        //         department:"Sales"
        //     }
        // },
        {
            $sort:{
                createdAt:-1
            }
        },
        // {
        //     $skip:5
        // },
        // {
        //     $limit:5
        // },
        {
            $set:{
                fullname:{$concat:["$firstname","$lastname"]}
            }
        },
        // {
        //     $sample:{
        //         size:3
        //     }
        // }

        // {
        //     $count:"total"
        // }

        // {
        //     $addFields:{
        //         // totalSalary:{$sum:"$salary"},
        //         // departmentCount:{$size:"$department"}
        //         location:"Delhi",
        //         company:"ABC"
        //     }
        // }

        // {
        //     $unwind:{
        //         path:"$department",
        //         preserveNullAndEmptyArrays:true
        //     }
        // }

        // {
        //   $group: {
        //     _id: "$department",
        //     totalEmployee: { $sum: 1 },
        //     averageSalary: { $avg: "$salary" },
        //   },
        // }

        //group by department and gender and get the total employee and average salary
        // {
        //   $group: {
        //     _id: { department: "$department", gender: "$gender" },
        //     totalEmployee: { $sum: 1 },
        //     averageSalary: { $avg: "$salary" },
        //   },
        // }
        {
          $unwind: "$department",
        },
         {
          $group: {
            _id: { department: "$department", gender: "$gender" },
            totalEmployee: { $sum: 1 },
            averageSalary: { $avg: "$salary" },
          },
        },

        ])
        return res.status(httpStatusCode.OK).json({
          status: true,
          message: "Employee fetched successfully!",
          total: aggData.length,
          data: aggData,
        })

    }catch(error){
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

}
module.exports = new EmployeeController();




