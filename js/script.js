let empTable = document.querySelector("#emp-table tbody");
let employees = JSON.parse(localStorage.getItem("employees")) || [];

function getData() {
    empTable.innerHTML = ""; // Clear previous rows
    employees.forEach((emp, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.salary}</td>
        <td>${emp.post}</td>
        <td>${emp.manager}</td>
        <td>
            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
        </td>
        `;
        empTable.appendChild(row);
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            let idx = this.getAttribute("data-index");
            employees.splice(idx, 1);
            localStorage.setItem("employees", JSON.stringify(employees));
            getData();
        });
    });
}

getData();

