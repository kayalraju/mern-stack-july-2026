console.log("connected")


const user = {
    id: 101,
    name: "Raju",
    email: "raju@gmail.com",
    password: "123456",
};



 //localStorage.setItem("user",JSON.stringify(user))



const data=JSON.parse(localStorage.getItem("user"));
document.write(data.name)

if(data){
    document.getElementById("name").innerHTML=data.name
    document.write(data.id);
    document.write(data.name);
    document.write(data.email);
}else{
    document.write("No data found");
}

//document.getElementById("name").innerHTML=data.name

 localStorage.removeItem("user");
