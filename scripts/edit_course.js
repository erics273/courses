"use strict"

window.onload = () => {

    // this allows us to get the urlParams to get the variables in the url
    const urlParams = new URLSearchParams(location.search);

    //we can access the individual params by calling .get on the variable that holds them
    //and requesting by name
    console.log(urlParams.get("courseid"))

    if (urlParams.has("courseid")) {

        //if we have a course id, display it's details
        populateCourseForm(urlParams.get("courseid"))

        //get the updateComment form off the page
        const updateCourseForm = document.querySelector("#editCourseForm");

        //listen for submit of the getCommentForm and attempt to populate the update form
        updateCourseForm.addEventListener("submit", updateACourse);


    } else {
        //let them know we didn't have a valid course id and send them back 
        //to the courses
        alert("no valid course id");
        window.location.href = "./index.html";
    }

}

//method to help get the data for update and fill out the form for the user
const populateCourseForm = async (courseId) => {

    //go get the single comment for the id the user selected
    let course = await getCourse(courseId);

    //fill out the form with the data from the comment we just got from the API
    document.querySelector("#dept").value = course.dept;
    document.querySelector("#courseNum").value = course.courseNum;
    document.querySelector("#courseName").value = course.courseName;
    document.querySelector("#instructor").value = course.instructor;
    document.querySelector("#startDate").value = course.startDate;
    document.querySelector("#numDays").value = course.numDays;
    document.querySelector("#id").value = course.id;

}

const getCourse = async (courseId) => {

    try {
        //use fetch to get the details for the specific course
        let response = await fetch("http://localhost:8081/api/courses/" + courseId);

        //deal with the response to get the data
        let data = await response.json();

        //hand the data back
        return data;
    } catch (err) {

        console.log(err);
        throw new Error(err);

    }

}

//method/function to update a course
//CRUD: (U)pdate a comment
const updateACourse = async (event) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (PUT) request to update a comment in the API
        let response = await fetch("http://localhost:8081/api/courses/" + event.target.id.value,
            {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    dept: event.target.dept.value,
                    courseNum: event.target.courseNum.value,
                    courseName: event.target.courseName.value,
                    instructor: event.target.instructor.value,
                    startDate: event.target.startDate.value,
                    numDays: event.target.numDays.value
                })
            }
        );
        //turn those comments in to something we can work with
       // let updatedCourse = await response.json();

        //put the comments in the console
      //  console.log(updatedCourse)
        if(response.ok){
            window.location.href = "./index.html"
        }
        

    } catch (err) {

        //what the hell happend
        console.log("something went south", err)

    }

}