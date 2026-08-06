
console.log("---------------------------------------------------");
console.log("DOM Manipulation");
console.log("---------------------------------------------------");



function changeText() {

    document.getElementById("text").innerHTML = "DOM Manipulation";

}


function changeColor() {

   const textcolor= document.getElementById("demo");
   textcolor.style.color="red";
   textcolor.style.fontSize="20px";
   textcolor.style.background="yellow";

}


function showText() {

    document.getElementById("demo").style.display="block";
}

function hideText() {

    document.getElementById("demo").style.display="none";
}


function showName(){
    const name = document.getElementById("name").value;
    const age= document.getElementById("age").value;

    const result=document.getElementById("result").innerHTML=
    "Hello " + name + ", you are " + age + " years old."


}


function addText(){

  let p = document.createElement("h1");

    p.innerHTML = "New Paragraph" 

    document.getElementById("container").appendChild(p);
}


function removeText(){
    let container = document.getElementById("container");
    let p = container.getElementsByTagName("h1")[0];

    container.removeChild(p);
}