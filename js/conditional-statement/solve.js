// 1. Check if a number is positive (if)
let num = 10;

if (num > 0) {
    console.log("Positive Number");
}

// Output

// Positive Number
// 2. Check if a person is eligible to vote (if)
let age = 20;

if (age >= 18) {
    console.log("Eligible for Voting");
}

// Output

// Eligible for Voting
// 3. Check if a number is divisible by 5 (if)
let num = 25;

if (num % 5 === 0) {
    console.log("Divisible by 5");
}

// Output

// Divisible by 5
// 4. Check if a number is even (if)
let num = 18;

if (num % 2 === 0) {
    console.log("Even Number");
}

// Output

// Even Number
// 5. Check whether a character is uppercase (if)
let ch = "A";

if (ch >= "A" && ch <= "Z") {
    console.log("Uppercase Letter");
}

// Output

// Uppercase Letter
// 6. Check whether a number is even or odd (if...else)
let num = 13;

if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}

// Output

// Odd
// 7. Find the greater of two numbers (if...else)
let a = 40;
let b = 25;

if (a > b) {
    console.log(a + " is Greater");
} else {
    console.log(b + " is Greater");
}

// Output

// 40 is Greater
// 8. Check whether a number is positive or negative (if...else)
 let num = -5;

if (num >= 0) {
    console.log("Positive");
} else {
    console.log("Negative");
}

// Output

// Negative
// 9. Check whether a year is a leap year (if...else)
let year = 2024;

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log("Leap Year");
} else {
    console.log("Not Leap Year");
}

// Output

// Leap Year
// 10. Pass or Fail (if...else)
let marks = 65;

if (marks >= 40) {
    console.log("Pass");
} else {
    console.log("Fail");
}

// Output

// Pass
// 11. Find the largest of three numbers (else if)
let a = 30;
let b = 80;
let c = 50;

if (a > b && a > c) {
    console.log(a + " is Largest");
} else if (b > a && b > c) {
    console.log(b + " is Largest");
} else {
    console.log(c + " is Largest");
}

// Output

// 80 is Largest
// 12. Grade Calculator (else if)
let marks = 82;

if (marks >= 90) {
    console.log("Grade A+");
} else if (marks >= 80) {
    console.log("Grade A");
} else if (marks >= 70) {
    console.log("Grade B");
} else if (marks >= 60) {
    console.log("Grade C");
} else if (marks >= 40) {
    console.log("Grade D");
} else {
    console.log("Fail");
}

// Output

// Grade A
// 13. Vowel or Consonant (else if)
let ch = "e";

if (
    ch === "a" ||
    ch === "e" ||
    ch === "i" ||
    ch === "o" ||
    ch === "u"
) {
    console.log("Vowel");
} else {
    console.log("Consonant");
}

// Output

// Vowel
// 14. Simple Calculator (else if)
let a = 10;
let b = 5;
let operator = "*";

if (operator === "+") {
    console.log(a + b);
} else if (operator === "-") {
    console.log(a - b);
} else if (operator === "*") {
    console.log(a * b);
} else if (operator === "/") {
    console.log(a / b);
} else {
    console.log("Invalid Operator");
}

// Output

// 50
// 15. Electricity Bill (else if)
let units = 180;
let bill;

if (units <= 100) {
    bill = units * 5;
} else if (units <= 200) {
    bill = units * 7;
} else {
    bill = units * 10;
}

console.log("Bill = " + bill);

// Output

// Bill = 1260
// 16. Income Tax Calculator (else if)
let salary = 700000;

if (salary <= 300000) {
    console.log("No Tax");
} else if (salary <= 600000) {
    console.log("5% Tax");
} else if (salary <= 1000000) {
    console.log("10% Tax");
} else {
    console.log("20% Tax");
}

// Output

// 10% Tax
// 17. Ticket Price Based on Age (else if)
let age = 15;

if (age < 5) {
    console.log("Free Ticket");
} else if (age <= 18) {
    console.log("Ticket Price = ₹100");
} else if (age <= 60) {
    console.log("Ticket Price = ₹200");
} else {
    console.log("Senior Citizen Discount");
}

// Output

// Ticket Price = ₹100
// 18. Season Based on Month (else if)
let month = 12;

if (month === 12 || month === 1 || month === 2) {
    console.log("Winter");
} else if (month >= 3 && month <= 5) {
    console.log("Summer");
} else if (month >= 6 && month <= 8) {
    console.log("Monsoon");
} else if (month >= 9 && month <= 11) {
    console.log("Autumn");
} else {
    console.log("Invalid Month");
}

// Output

// Winter
// 19. Day Name Using switch
let day = 3;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    default:
        console.log("Invalid Day");
}

// Output

// Wednesday
// 20. Month Name Using switch
let month = 4;

switch (month) {
    case 1:
        console.log("January");
        break;
    case 2:
        console.log("February");
        break;
    case 3:
        console.log("March");
        break;
    case 4:
        console.log("April");
        break;
    case 5:
        console.log("May");
        break;
    case 6:
        console.log("June");
        break;
    case 7:
        console.log("July");
        break;
    case 8:
        console.log("August");
        break;
    case 9:
        console.log("September");
        break;
    case 10:
        console.log("October");
        break;
    case 11:
        console.log("November");
        break;
    case 12:
        console.log("December");
        break;
    default:
        console.log("Invalid Month");
}

Output

April