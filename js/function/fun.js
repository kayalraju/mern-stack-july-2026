

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


//************************ aray metrhods */

//*****map */
// array.map(callback)

// const users = [
//     { name: "Rahul", age: 20 },
//     { name: "Priya", age: 22 },
//     { name: "John", age: 25 },
// ];

// const names = users.map(user => user.age);

// console.log(names);

//filter()
//Returns elements that satisfy a condition.
// const products = [
//     { name: "Laptop", price: 60000 },
//     { name: "Mouse", price: 500 },
//     { name: "Keyboard", price: 1000 },
//     { name: "Monitor", price: 15000 },
// ];

// const expensive = products.filter(product => product.price > 1000);

// console.log(expensive);

//find()

//Returns the first matching element..
// const products = [
//     { name: "Laptop", price: 60000 },
//     { name: "Mouse", price: 500 }
// ];

// const expensive = products.find(product => product.name === "Laptop");

// console.log(expensive);

//reduce()
//converts an array into a single value.
//syntax
// array.reduce((accumulator, currentValue) => {
//     // logic
// }, initialValue);

// const products = [
//     { name: "Laptop", price: 60000 },
//     { name: "Mouse", price: 500 }
// ];

// const total = products.reduce((total, product) => total + product.price, 0);

// console.log(total);

//push()
//syntax
// array.push(item1, item2, ...)

// const fruits = ["Apple", "Banana", "Orange"];

// fruits.push("Mango");

// console.log(fruits);


//pop

// const fruits = ["Apple", "Banana", "Orange"];

// fruits.pop("Orange");

// console.log(fruits);

//syntax
// array.splice(startIndex, deleteCount, item1, item2, ...)
// startIndex → Position where you want to insert.
// deleteCount → Number of elements to remove (0 means don't remove any).
// item1, item2... → Elements to insert.

// const fruits = ["Apple", "Banana", "Orange"];

// fruits.splice(1, 1, "Mango");

// console.log(fruits);


//shift
//syntax
// array.shift();

 const fruits = ["Apple", "Banana", "Orange"];

 fruits.shift("Apple");

 console.log(fruits);