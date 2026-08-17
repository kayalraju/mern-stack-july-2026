

// class ClassName{

// }


// class Student{
//     name="Raju";
//     age=25;
//     course="Btech";
// }


// const studentdata=new Student();
// console.log(studentdata);
// console.log(studentdata.name);
// console.log(studentdata.age);
// console.log(studentdata.course);

// constructor

// class Student{
//     constructor(){
//         console.log("constructor called");
//     }

//      course() {
//         console.log("Btech");
//     }
// }

// const std=new Student();

// class Student{
//     constructor(name,age,course){
//         this.name=name;
//         this.age=age;
//         this.course=course;
//     }
// }

// const studentdata=new Student("Raju",25,"Btech");
// console.log(studentdata);
// console.log(studentdata.name);
// console.log(studentdata.age);
// console.log(studentdata.course);

// class Student{
//     constructor(name,age,course){
//         this.name=name;
//         this.age=age;
//         this.course=course;
//     }
//     getData(){
//         console.log("Hello " + this.name);
//         console.log("age " + this.age);
//     }
// }

// const std=new Student("Raju",25,"Btech");
// console.log(std);

// console.log(std.getData());

//std.getData();



class Calculator{
    // constructor(num1,num2){
    //     this.num1=num1;
    //     this.num2=num2;
    // }
    // add(){
    //     return this.num1+this.num2;
    // }
    // sub(){
    //     return this.num1-this.num2;
    // }
    // mul(){
    //     return this.num1*this.num2;
    // }
    // div(){
    //     return this.num1/this.num2;
    // }

    Add(num1,num2){
        return num1+num2;
    }
}

const calc=new Calculator();
//console.log(calc.add());
console.log(calc.Add(20,30));
//console.log(calc.sub());
//console.log(calc.mul());
//console.log(calc.div());



