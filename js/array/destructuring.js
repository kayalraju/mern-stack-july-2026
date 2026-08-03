
//Without Destructuring
// const colors = ["Red", "Green", "Blue"];

// const first = colors[0];
// const second = colors[1];
// const third = colors[2];

// console.log(first);
// console.log(second);
// console.log(third);

//With Destructuring
// const colors = ["Red", "Green", "Blue","Yellow","Orange","Purple"];

// const [...rest] = colors;
// // console.log(first);
// // console.log(second);
// // console.log(third);
// console.log(rest);



//****rest parameter */


// function sum(...args) {
//     let total = 0;
//     for (let arg of args) {
//         total += arg;
//     }
//     return total;
// }
// console.log(sum(1, 2, 3, 4, 5,6,85, 100, 200, 300, 400, 500)); 


//******spread operator */

// const numbers = [1, 2, 3, 4, 5];
// const newNumbers = [...numbers, 6, 7, 8, 9, 10];
// console.log(newNumbers);


//*** object destructuring */


//without destructuring
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

// console.log(person.name);
// console.log(person.age);
// console.log(person.city);

//with destructuring
const { name, age, city } = person;
console.log(name);
console.log(age);
console.log(city);