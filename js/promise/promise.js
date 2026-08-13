
//JavaScript normally executes code line by line sequentially.



// console.log("fiest request")
// console.log("second request")
// console.log("third request")

//Asynchronous JavaScript

// console.log("Start");

// setTimeout(() => {
//     console.log("Data received");
// }, 2000);

// console.log("End");


// const myPromise = new Promise((resolve, reject) => {

//     let success = true;

//     if (success) {
//         resolve("Data received successfully");
//     } else {
//         reject("Something went wrong");
//     }

// });

// myPromise.then((message) => {
//     console.log(message);
// }).catch((error) => {
//     console.log(error);
// });

function getUser() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const user = {
                id: 1,
                name: "Raju",
                email: "raju@example.com",
                phone: "1234567890",
                password: "123456"
            };

            resolve(user);

        }, 2000);

    });

}

getUser()
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
    });