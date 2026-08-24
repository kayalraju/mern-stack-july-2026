
//const today=new Date();

// console.log(today);

// const year=today.getFullYear();
// console.log(year);
// const month=today.getMonth();
// console.log(month);
// const day=today.getDate();
// console.log(day);

//math floor
// const value=5.9;
// console.log(Math.floor(value));

const birthDate = new Date("2000-05-15");
const today = new Date();

const difference = today - birthDate;

const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
);

const years = Math.floor(days / 365);

console.log("Days:", days);
console.log("Years:", years);