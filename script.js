// make array where to store each to do task added
let itemsArray = [];
//define where input is written, link to hmtl ID
const inputBox = document.getElementById("write-text");
//get reference to the task lists, link to ID
const taskList = document.getElementById("tasksList");

//load all tasks from local storage when window loads
window.addEventListener("load", function loadTasks() {
  // give a name to the content of local storage
  let storedData = localStorage.getItem("itemsArray");
  //if its not empty, show the data
  if (storedData) {
    itemsArray = JSON.parse(storedData);
  }
  renderTasks();
});
//adding tasks
function addTask() {
  // give name to content of input box
  const taskText = inputBox.value;
  // add new task to array
  itemsArray.push({ text: taskText, checked: false });
  renderTasks();
  saveTasks();
  // clearing it after adding a task
  inputBox.value = "";
}

function renderTasks() {
  // clear the content
  taskList.innerHTML = "";
  // apply conditions to all new tasks
  itemsArray.forEach(function (task, index) {
    // make new list item attatched to each task created
    let newTask = document.createElement("li");
    newTask.textContent = task.text;
    // make new  delete button for each task
    if (task.checked) {
      newTask.classList.add("checked");
    }

    newTask.addEventListener("click", function check() {
      task.checked = !task.checked;
      this.classList.toggle("checked");
      saveTasks();
    });

    const removeButton = document.createElement("button");
    removeButton.innerText = "-";
    removeButton.onclick = function () {
      // call function when the delete button is clicked
      removeTask(index);
    };
    removeButton.setAttribute("class", "deletebutton");
    // connects delete buttons to each new task, and each new task to the tasks list
    newTask.appendChild(removeButton);
    taskList.appendChild(newTask);
  });
}
// function to remove a task
function removeTask(index) {
  //removes selected item from array
  itemsArray.splice(index, 1);
  renderTasks();
  saveTasks();
}
// savins tasks to local storage
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
  console.log(date);
}

window.onload = function () {
  displayDate();
};
// stores array as a string in local storage
function saveTasks() {
  localStorage.setItem("items", JSON.stringify(itemsArray));
}
