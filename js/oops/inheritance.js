
//basic structure

// class Parent{
//     //properties
//     //methods
//     //constructor
// }

// class Child extends Parent{
//     //properties
//     //methods
//     //constructor
// }

// class Animal{

    
//     constructor(name){
//         this.name=name;
//     }

   
//     eat(){
//         console.log(`${this.name} is eating`);
//     }
// }

// class Dog extends Animal{
//     bark(){
//         console.log(`${this.name} is barking`);
//     }
// }


// const dog1= new Dog("tommy");
// dog1.eat();
// dog1.bark();

// class Person{
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//     }

//     displayPerson(){
//         console.log(`Name: ${this.name}, Age: ${this.age}`);
//     }
// }

// class Student extends Person{
//     constructor(name,age,course){
//         super(name,age);
//         this.course=course;
//     }

//     display(){
//         console.log(`Name: ${this.name}, Age: ${this.age}, Course: ${this.course}`);
//     }
// }

// const student1=new Student("Raju",25,"MernStack");
// student1.display();
// student1.displayPerson();


//method overriding



// class Animal{

//     sound(){
//         console.log("Animal makes a sound");
//     }
// }


// class Dog extends Animal{
//     sound(){
//         console.log("Dog barks");
//     }
// }


// const dog=new Dog();
// dog.sound();


//solve method overriding

// class Animal{

//     sound(){
//         console.log("Animal makes a sound");
//     }
// }


// class Dog extends Animal{
//     sound(){
//         super.sound();
//         console.log("Dog barks");
//     }
// }


// const dog=new Dog();
// dog.sound();


//multilevel inheritance
class Animal{
    eat(){
        console.log("Animal is eating");
    }
}

class Cat extends Animal{
    walk(){
        console.log("cat is walking");
    }
}

class Dog extends Cat{
    bark(){
        console.log("Dog is barking");
    }
}


const dog=new Dog();
dog.eat();
dog.walk();
dog.bark();

