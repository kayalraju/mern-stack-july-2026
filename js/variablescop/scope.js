

//********global scope*****/

// const username="webskitters"
// let password="123456"
// function student(){
//     console.log(username);
//     console.log(password);
// }

// student()

// console.log('user name is ',username);


//***finctional scope */


function CarName(){
    let user={
        name:"shubham", // string
        age:22, // number


    }

    var sname="shubham";
    console.log(user);
    
    console.log('user age is',user.age);

}

CarName();

//console.log(sname);


// console.log(user.name);

//*****************block scope*********/

// {
//     const username="webskitters"
//     let password="123456"
//     console.log(username);
//     console.log(password);
// }

//console.log('user name is ',username);
// function student(){
//     const username="webskitters"
//     let password="123456"
//     console.log(username);
//     console.log(password);
// }
// student()


// function getStudent(){
//     let student2="Raju kayal";
//     if(true){
//         let student3="Pritam das";
//         console.log('student name is ',student2);
//         console.log('student name is ',student3)
//     };
// }
// getStudent();


// for(let i=0;i<10;i++){
//     console.log(i);
// }

// console.log(i);

//*****laxical scoping

// function Parent() {

//     let language = "JavaScript";

//     function inner() {
//         console.log(language);
//     }

//     inner();
// }

// Parent();
// console.log(language);