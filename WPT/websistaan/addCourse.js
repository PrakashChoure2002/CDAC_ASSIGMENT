let selectedRow = null;


function CourseList() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4700/course/getcourse", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const course = JSON.parse(xhr.responseText);
            const table = document.getElementById("courseList").getElementsByTagName('tbody')[0];
            table.innerHTML = ""; 
            course.forEach(insertNewRecord);
        }
    };
    xhr.send();
}


function insertNewRecord(data) {
    const table = document.getElementById("courseList").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.length);

    newRow.insertCell(0).innerHTML = data.CourseName;
    newRow.insertCell(1).innerHTML = data.Duration;
    newRow.insertCell(2).innerHTML = data.Price;
    newRow.insertCell(3).innerHTML = data.Validations;
    
    newRow.insertCell(4).innerHTML = `<a style="cursor:pointer", onClick="onEdit(this)">Edit</a> 
                                       <a style="cursor:pointer", onClick="onDelete(this)">Delete</a>`;
}


function xhrFunction() {
    const data = readFormData();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4700/course/postcourse", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (xhr.status === 200) {
            CourseList();
            resetForm();


        }
    };
}


function updateRecordOnServer(formData) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://localhost:4700/course/putcourse/${formData.CourseName}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(formData));
    xhr.onload = function() {
        if (xhr.status === 200) {
            CourseList();
            resetForm();
        }
    };
}


function onFormSubmit() {
    if (validate()) {
        const formData = readFormData();
        if (selectedRow == null) {
            xhrFunction(); 
        } else {
            updateRecordOnServer(formData); 
        }
    }
}


function readFormData() {
    return {
        CourseName: document.getElementById("CourseName").value,
        Duration: document.getElementById("Duration").value,
        Price: document.getElementById("Price").value,
        Validations: document.getElementById("Validations").value,
      
    };
}


function resetForm() {
    document.getElementById("CourseName").value = "";
    document.getElementById("Duration").value = "";
    document.getElementById("Price").value = "";
    document.getElementById("Validations").value = "";
    
    selectedRow = null;
}

// Validate form data
function validate() {
    let isValid = true;
    if (document.getElementById("CourseName").value == "") {
        isValid = false;
        document.getElementById("courseValidationError").classList.remove("hide");
    } else {
        document.getElementById("courseValidationError").classList.add("hide");
    }
    return isValid;
}


function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("CourseName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Duration").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Price").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Validations").value = selectedRow.cells[3].innerHTML;
   
}


function deleteRecordOnServer(courseName) {
    const xhr = new XMLHttpRequest();
    console.log(courseName);
    xhr.open("DELETE", `http://localhost:4700/course/deletecourse/${courseName}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    

    xhr.onload = function() {
        if (xhr.status === 200) {
            CourseList();
        }
    };
    
    
    xhr.send();
}


function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        const row = td.parentElement.parentElement;
        const fullName = row.cells[0].innerHTML;
        deleteRecordOnServer(fullName);
        document.getElementById("courseList").deleteRow(row.rowIndex);
        resetForm();
    }
}


window.onload = CourseList;
