//***JSON Introduction JSON = JavaScript Object Notation

//JSON is commonly used to exchange data between:

// Frontend
//    ↓
// HTTP Request
//    ↓
// Backend API
//    ↓
// Database

//JSON looks similar to a JavaScript object, but there are some differences.

// {
//     "name": "Raju",
//     "age": 25,
//     "email": "raju@gmail.com"
// }

//****example */
//JavaScript object
// const user = {
//     name: "Raju",
//     age: 25
// };

//json

// {
//     "name": "Raju",
//     "age": 25
// }

//JSON.stringify() converts a JavaScript object into a JSON string.

// const user = {
//     name: "Raju",
//     age: 25,
//     email: "raju@gmail.com"
// };

// const jsonData = JSON.stringify(user);


//JSON.parse() converts a JSON string into a JavaScript object.

const json = '{"name": "Raju", "age": 25, "email": "raju@gmail.com"}';
const obj = JSON.parse(json);
console.log(obj);