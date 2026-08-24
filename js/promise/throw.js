

//Error vs Throw
//throw new Error("Something went wrong");
//throw "Something went wrong";


// const error=new Error("Something went wrong");
// console.log(error.message);



function getUser(id){
    try{
        if(!id){
            throw new Error("Id is required");
        }
        if(id!==101){
            throw new Error("Id is not valid");
        }

        return{
            id: 1,
            name: "Raju",
            email: "raju@example.com",
            phone: "1234567890",
            password: "123456"
        }

    }catch(error){
        console.log('erroro',error.message);
    }
}

const user=getUser(106);
console.log(user);