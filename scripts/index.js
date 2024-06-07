"use strict"

window.onload = () => {
    //make sure we are working
    console.log("hello from inside the index.js file");

    populateTable();

}

async function populateTable() {

    //get thecourses from the API
    let courses = await getCourses();

    //get a hold of the table body where the data is going to go
    let tbody = document.querySelector("#courseTableBody")

    //loop over all the courses and work with a single course
    courses.forEach((course)=>{
        //call a function to build the row
        //pass it where the row goes (tbody)
        //pass it what goes in the row (data/course)
        buildRow(tbody,course)
    })

}

//the function that takes a table body and some data and puts the data in the table body
function buildRow(someTableBody, someData){

    //create the row for the table
    let row = someTableBody.insertRow();

    //crate the cell for the department
    let departmentCell = row.insertCell();
    //put the relevent course data in the
    departmentCell.innerHTML = someData.dept;

    //crate the cell for the course number
    let courseNumberCell = row.insertCell();
    //put the relevent course data in the
    courseNumberCell.innerHTML = someData.courseNum;

    //crate the cell for the course name
    let courseNameCell = row.insertCell();
    //put the relevent course data in the
    courseNameCell.innerHTML = someData.courseName;

}

async function getCourses() {

    // the try says try these things and if it doesnt work out, fall into the catch
    //and deal with the error
    try {
        // make the API call to get all the courses
        let response = await fetch("http://localhost:8081/api/courses");
        let courses = await response.json();

        return courses;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}