let students = [];

let editIndex = -1;

displayStudents();

document
.getElementById("studentForm")
.addEventListener("submit", saveStudent);

function saveStudent(e){

    e.preventDefault();

    let name =
    document.getElementById("name").value;

    let age =
    document.getElementById("age").value;

    let course =
    document.getElementById("course").value;

    let student = {

        name,
        age,
        course

    };

    if(editIndex==-1){

        students.push(student);

    }else{

        students[editIndex]=student;

        editIndex=-1;

    }

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    document.getElementById("studentForm").reset();

    displayStudents();

}

function displayStudents(){

    students =
    JSON.parse(localStorage.getItem("students")) || [];

    let output="";

    students.forEach((student,index)=>{

        output += `

        <tr>

        <td>${index+1}</td>

        <td>${student.name}</td>

        <td>${student.age}</td>

        <td>${student.course}</td>

        <td>

        <button onclick="editStudent(${index})">
        Edit
        </button>

        <button onclick="deleteStudent(${index})">
        Delete
        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("studentList").innerHTML = output;

}

function deleteStudent(index){

    if(confirm("Delete Student?")){

        students.splice(index,1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

    }

}

function editStudent(index){

    let student = students[index];

    document.getElementById("name").value =
    student.name;

    document.getElementById("age").value =
    student.age;

    document.getElementById("course").value =
    student.course;

    editIndex=index;

}