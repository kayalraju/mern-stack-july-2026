


class BankAccount{

    constructor(accountHolder, balance){
        this.accountHolder = accountHolder;
        this.balance = balance;
    }


    deposit(amount){
        this.balance += amount
        console.log(`$ ${amount} deposited successfully`);

    }

    withdraw(amount){
        if(amount > this.balance){
            console.log("Insufficient balance");
            return;
        }
        this.balance -= amount;
        console.log(`$ ${amount} withdrawn successfully`);
        
    }

    showBlance(){
        console.log(`Account Holder: ${this.accountHolder}`);
        console.log(`Balance: $ ${this.balance}`);

    }

}

const account1 = new BankAccount("Raju", 1000);
 account1.deposit(500);
 account1.withdraw(300);
 account1.showBlance();