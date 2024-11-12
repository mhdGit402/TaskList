let addTask = document.querySelector("#add");
let clearTask = document.querySelector("#clear");
let tasks = document.querySelector("#tasks");
let task = document.querySelector("#task");
let allTask = [];

// Show-Tasks
// get tasks from local storage and append to body on startup with iife
(() => {
  let localStorageTasks = JSON.parse(localStorage.getItem("task"));
  localStorageTasks.forEach((task, index) => {
    let showTask = document.createElement("li");
    showTask.setAttribute("id", `task${index + 1}`);
    showTask.innerHTML = `<span>${task}</span>
                        <a href="#" class="delete" id="${
                          index + 1
                        }" onClick="">Delete</a>
                        `;
    tasks.append(showTask);
    allTask.push(task);
  });
})();

// Add-Task Event
// create element li with task data => Done
// store task in local storage => Done
addTask.addEventListener("click", (e) => {
  e.preventDefault();
  let newTask = document.createElement("li");
  let id = allTask.length + 1;
  newTask.setAttribute("id", `task${id}`);
  newTask.innerHTML = `<span>${task.value}</span>
                      <a href="#" class="delete" id="${id}" onClick="">Delete</a>
                      `;
  tasks.append(newTask);

  allTask.push(task.value);
  localStorage.setItem("task", JSON.stringify(allTask));
  task.value = "";
});

// Delete-Task
// remove clicked task from body => Done
// remove clicked task from local storage => Done
document.body.addEventListener("click", (e) => {
  let deleteTask = e.target.className.includes("delete");
  if (deleteTask) {
    localStorage.removeItem("task");
    let taskValue = document.querySelector(
      `#${e.target.parentElement.id} span`
    ).textContent;
    allTask.forEach((task, index) => {
      if (task === taskValue) {
        allTask.splice(index, 1);
      }
    });
    localStorage.setItem("task", JSON.stringify(allTask));
    e.target.parentElement.remove();
  }
});

// Clear-Tasks
// remove all tasks from body => Done
// remove all tasks from local storage => Done
clearTask.addEventListener("click", (e) => {
  e.preventDefault();
  tasks.replaceChildren();
  allTask = [];
  localStorage.removeItem("task");
});
