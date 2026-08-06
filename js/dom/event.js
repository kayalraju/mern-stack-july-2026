

console.log('This is a sample code snippet from js/dom/event.js');



// function showCountry(){

// let country = document.getElementById("country").value;

// document.getElementById("result").innerHTML =
// "You selected " + country;

// }


function validateForm() {
    event.preventDefault();
 let name = document.getElementById("name").value;
 let email = document.getElementById("email").value;

    if(name == ""){

        alert("Name and email are required");

        return false;

    }
    if(name.length < 3){

        alert("Name must be at least 3 characters long");

        return false;

    }
    if(email == ""){

        alert("Email is required");

        return false;

    }
    document.getElementById("result").innerHTML = name + " - " + email ;

    console.log("Form submitted successfully with name: " + name + " and email: " + email);

    return true;
}