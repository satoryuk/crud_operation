document.addEventListener("DOMContentLoaded", function () {
  const userTableBody = document.querySelector("#userTable tbody");
  const userForm = document.getElementById("userForm");
  const btnAdd = document.getElementById("btnAdd");

  function fetchStudents() {
    fetch("http://localhost:3000/students")
      .then((response) => response.json())
      .then((students) => {
        userTableBody.innerHTML = "";
        students.forEach((student) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${student.firstname}</td>
            <td>${student.lastname}</td>
            <td>${student.gender}</td>
            <td>${student.phone}</td>
            <td>${student.email}</td>
          `;
          userTableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching students:", error));
  }

  // Initial fetch to populate the table
  fetchStudents();

  // Add a new student to the fake database
  btnAdd.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    const newStudent = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      gender: document.getElementById("gender").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
    };

    // POST new student to the server
    fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then(() => {
        fetchStudents(); // Refresh table data
        userForm.reset(); // Clear the form
      })
      .catch((error) => console.error("Error adding student:", error));
  });

  // Optionally, implement clear button functionality
  document.getElementById("btnClear").addEventListener("click", function () {
    userForm.reset();
  });
});
