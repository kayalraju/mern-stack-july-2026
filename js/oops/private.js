// class BankAccount {
//     #balance = 0; // Private property

//     constructor(accountHolder) {
//         this.accountHolder = accountHolder;
//     }

//     deposit(amount) {
//         this.#balance += amount;
//     }

//     showBalance() {
//         console.log(`Balance: ${this.#balance}`);
//     }
// }

// const account = new BankAccount("Raju");

// account.deposit(5000);
// account.showBalance();
//  console.log(account.#balance);



// //********************** */

// class User {
//     #password = "12345";

//     #checkPassword() {
//         console.log("Password checking...");
//     }

//     login() {
//         this.#checkPassword();
//         console.log("Login successful");
//     }
// }

// const user = new User();

// user.login();

// console.log(user.#password);


//***pubic */

class User {
    password = "12345";

    checkPassword() {
        console.log("Password checking...");
    }

    login() {
        this.checkPassword();
        console.log("Login successful");
    }
}

const user = new User();

user.login();

console.log(user.password);