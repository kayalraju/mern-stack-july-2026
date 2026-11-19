

//********global scope*****/

// const username="webskitters"
// let password="123456"
// function student(){
//     console.log(username);
//     console.log(password);
// }

// student()

// console.log('user name is ',username);

// const  student="pritam sen"

// console.log('user name is ',student);
// function StudentFunction(){
//     console.log('user name is ',student);
// }

// StudentFunction()


//***finctional scope */


// function CarName(){
//     let user={
//         name:"shubham", // string
//         age:22, // number


//     }

//     var sname="djdjjdjjd";
//     console.log(user);
//     console.log(sname);
    
//     console.log('user age is',user.age);

// }

// CarName();


// function Car(){
//     const carobj={
//         name:"Auti", // string
//         color:"red",
//         price:10000 // number
        
//     }

//     const bike="honda"
//     console.log(carobj);
//     console.log("bike name",bike);
// }
// Car()
// console.log(bike);

//console.log(sname);


// console.log(user.name);

//*****************block scope*********/

// {
//     const username="webskitters"
//     let password="123456"
//     var city="kolkata";
//     console.log(username);
//     console.log(password);
//     console.log(city);
// }




//console.log('user name is ',username);
//console.log(city);
//console.log(sname);



//console.log('user name is ',username);
// function student(){
//     const username="webskitters"
//     let password="123456"
//     console.log(username);
//     console.log(password);
// }
// student()



// function getStudent(){
//     let student2="Raju kayal";
//     if(true){
//         let student3="Pritam das";
//         console.log('student name is ',student2);
//         console.log('student name is ',student3)
//     };
// }
// getStudent();


// for(let i=0;i<10;i++){
//     console.log(i);
// }

// console.log(i);

//*****laxical scoping

// function Parent() {

//     let language = "JavaScript";

//     function inner() {
//         console.log(language);
//     }

//     inner();
// }

// Parent();
// console.log(language);



// Redeclaration
// Redeclaration means declaring the same variable name again in the same scope.
// var - Allowed
var name = "Raju";
var name = "Rahul";

console.log(name); // Rahul


// let - Not Allowed
// let age = 25;
// let age = 30; // SyntaxError


// const - Not Allowed
// const country = "India";
// const country = "USA"; // SyntaxError



//Reassignment
//Reassignment means changing the value of an already declared variable.
// var - Allowed
var name = "Raju";
name = "Rahul";

console.log(name); // Rahul


// // let - Allowed
let age = 25;
age = 30;

 console.log(age); // 30


// const - Not Allowed
// const country = "India";
// country = "USA"; // TypeError