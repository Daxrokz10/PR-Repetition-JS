let ename = document.getElementById("ename");
let salary = document.getElementById("salary");
let post = document.getElementById("post");
let manager = document.getElementById("manager");
let addBtn = document.getElementById("addBtn");
let form = document.getElementById("form");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let emp = {
    name: ename.value,
    salary: salary.value,
    post: post.value,
    manager: manager.value,
  };
  employees.push(emp);
  localStorage.setItem("employees", JSON.stringify(employees));
  
  form.reset();
  alert("Employee added successfully!");

  getData();
});
