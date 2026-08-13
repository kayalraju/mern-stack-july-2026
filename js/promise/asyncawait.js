

// async function getUser() {
//     const response = await fetch(
//         "https://jsonplaceholder.typicode.com/users/1"
//     );
//     const user = await response.json();
//     return user;
// }


// function getOrders(userId) {
//     return Promise.resolve([
//         {
//             id: 101,
//             userId: userId,
//             product: "Laptop"
//         }
//     ]);
// }


// function getPayment(orderId) {
//     return Promise.resolve({
//         orderId: orderId,
//         amount: 50000,
//         status: "Paid"
//     });

// }


// getUser()
//     .then((user) => {
//         console.log("User data:", user);
//         return getOrders("order",user.id);
//     })

//     .then((orders) => {
//         console.log("Orders:", orders);
//         return getPayment(orders[0].id);
//     })

//     .then((payment) => {
//         console.log("Payment:", payment);
//     })

//     .catch((error) => {
//         console.log("Error:", error);
//     });


//async await and try catch

// async function getUser() {
//     const response = await fetch(
//         "https://jsonplaceholder.typicode.com/users/1"
//     );
//     const user = await response.json();
//     return user;
// }

// async function getOrders(userId) {
//     return [
//         {
//             id: 101,
//             userId: userId,
//             product: "Laptop"
//         }
//     ];
// }

// async function getPayment(orderId) {
//     return {
//         orderId: orderId,
//         amount: 50000,
//         status: "Paid"
//     };
// }

// // Main function
// async function main() {
//     try {
//         // Step 1: Get User
//         const user = await getUser();
//         console.log("User:");
//         console.log(user);
//         // Step 2: Get Orders using User ID
//         const orders = await getOrders(user.id);
//         console.log("Orders:");
//         console.log(orders);

//         // Step 3: Get Payment using Order ID
//         const payment = await getPayment(orders[0].id);

//         console.log("Payment:");
//         console.log(payment);

//     } catch (error) {

//         console.log("Error:", error);

//     }
// }

// main()


//******promise chain */
//promise channinig is a way to handle multiple asynchronous operations in a sequence.

function step1() {
    return Promise.resolve("Step 1 completed");
}

function step2() {
    return Promise.resolve("Step 2 completed");
}

function step3() {
    return Promise.resolve("Step 3 completed");
}

step1()
    .then((result) => {

        console.log(result);

        return step2();

    })
    .then((result) => {

        console.log(result);

        return step3();

    })
    .then((result) => {

        console.log(result);

    })
    .catch((error) => {

        console.log(error);

    });