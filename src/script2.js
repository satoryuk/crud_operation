// Select all rows of the table
const userTable = document
  .getElementById("userTable")
  .getElementsByTagName("tbody")[0];
let selectedRow = null;

// Select data from the row and populate the form
userTable.addEventListener("click", function (event) {
  const row = event.target.closest("tr");

  // If a row is clicked (not the header)
  if (row) {
    // Highlight the selected row
    if (selectedRow) {
      selectedRow.classList.remove("selected");
    }
    selectedRow = row;
    selectedRow.classList.add("selected");

    // Populate form fields with selected row data
    const firstName = row.cells[0].innerText;
    const lastName = row.cells[1].innerText;
    const gender = row.cells[2].innerText;
    const phone = row.cells[3].innerText;
    const email = row.cells[4].innerText;

    document.getElementById("firstname").value = firstName;
    document.getElementById("lastname").value = lastName;
    document.getElementById("gender").value = gender.toLowerCase();
    document.getElementById("phone").value = phone;
    document.getElementById("email").value = email;
  }
});

// Handle Update button click
document
  .getElementById("btnUpdate")
  .addEventListener("click", function (event) {
    event.preventDefault();

    if (selectedRow) {
      // Get updated form data
      const updatedFirstName = document.getElementById("firstname").value;
      const updatedLastName = document.getElementById("lastname").value;
      const updatedGender = document.getElementById("gender").value;
      const updatedPhone = document.getElementById("phone").value;
      const updatedEmail = document.getElementById("email").value;

      // Update the selected row with the new data
      selectedRow.cells[0].innerText = updatedFirstName;
      selectedRow.cells[1].innerText = updatedLastName;
      selectedRow.cells[2].innerText =
        updatedGender.charAt(0).toUpperCase() + updatedGender.slice(1); // Capitalize gender
      selectedRow.cells[3].innerText = updatedPhone;
      selectedRow.cells[4].innerText = updatedEmail;

      // Optionally, reset the form after updating
      document.getElementById("userForm").reset();
      selectedRow.classList.remove("selected");
      selectedRow = null;
    } else {
      alert("Please select a student to update.");
    }
  });

// Handle Delete button click
document
  .getElementById("btnDelete")
  .addEventListener("click", function (event) {
    event.preventDefault();

    if (selectedRow) {
      // Remove the selected row from the table
      selectedRow.remove(); // Removes the selected row directly
      document.getElementById("userForm").reset(); // Reset the form after deletion
      selectedRow = null;
    } else {
      alert("Please select a student to delete.");
    }
  });
