/* reference to date function & setting attributes to const for styling 
JavaScript date objects. (n.d.). https://www.w3schools.com/js/js_dates.asp
Element: setAttribute() method - Web APIs | MDN. (2024, April 6). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
 */

// Display date
function displayDate() {
  const date = new Date().toDateString();
  document.querySelector("#date").textContent = date;
}

window.onload = displayDate();
{
}

// make array where to store each to do task added
let itemsArray = [];
//define where input is written, link to hmtl ID
const inputBox = document.getElementById("input-text");
//get reference to the task lists, link to ID
const taskList = document.getElementById("tasks-list");

//load all tasks from local storage when window loads
window.addEventListener("load", function loadTasks() {
  // give a name to the content of local storage
  let storedData = localStorage.getItem("items");
  //if its not empty, show the data
  if (storedData) {
    itemsArray = JSON.parse(storedData);
  }
  renderTasks();
});

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
    const newTask = document.createElement("li");
    newTask.textContent = task.text;
    newTask.setAttribute("class", "new-task");
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
    removeButton.setAttribute("class", "delete-button");
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

// stores array as a string in local storage
function saveTasks() {
  localStorage.setItem("items", JSON.stringify(itemsArray));
}
