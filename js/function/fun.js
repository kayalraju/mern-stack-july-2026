

//*****normal function */


// function Car(name,model,price=10000,color="red") {
//     //return "car name is "+ name+" and model "+model +" and price "+price

//     return `car name is ${name} and model ${model} and price ${price} and color ${color}`
// }

// console.log(Car("honda","civic"));  



//***************arrow function */


// const Car=()=>{

//     console.log("this my car")

// }

// Car()

// const Car = (name, model, price = 10000, color = "red") => {
//     return "car name is "+ name+" and model "+model +" and price "+price
// }

// console.log(Car("honda","civic"));


//**********annonymous function

// const Car=function(){

//     console.log("this my car")

// }

// Car()

// setTimeout(function() {
//     console.log("Executed after 5 seconds");
// }, 5000);


//****callback */

// function greet(name) {
//     console.log("Hello " + name);
// }

// function processUser(callback) {
//     callback("Raju");
// }

// processUser(greet);


//***higher order function */

// function add(num1, num2) {
//     return num1 + num2;
// }

// function multiply(num1, num2) {
//     return num1 * num2;
// }

// function calculate(num1, num2, callback) {
//     return callback(num1, num2);
// }

// console.log(calculate(2, 3, add));
// console.log(calculate(2, 3, multiply));


//*** recurssion */

// function factorial(n) {
//     if (n === 1) {
//         return 1;
//     }

//     return n * factorial(n - 1);
// }

// console.log(factorial(5));


// const fruits = ["Apple", "Mango", "Orange","banana","grapes","pineapple"];

// fruits.forEach(function(fruit) {
//     console.log(fruit);
// });