

// const user = {
//     name: "Raju",
//     age: 25,
//     email: "raju@gmail.com"
// };

// console.log(user.name)



// const Student= new Object();
// Student.name="Raju";
// Student.age=25;
// Student.email="raju@gmail.com";
// console.log(Student);


//****nested object */

// const employee={
//     name:"Raju",
//     age:25,
//     email:"raju@gmail.com",
//     address:{
//         street:"123 Main St",
//         city:"New York",
//         state:"NY",
//         zip:"10001"
//     },
//     dept:{
//         name:"IT",
//         manager:"John Doe"
//     }
// }

//console.log(employee.address.city);
//****this refers to the current object. */
const user = {
    name: "Raju",
    age: 25,

    getData: function() {
        console.log("Hello " + this.name);
        console.log("age " + this.age);
    }
};

user.getData();