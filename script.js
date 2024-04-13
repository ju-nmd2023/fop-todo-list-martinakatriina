let itemsArray = [];
const inputBox = document.getElementById("write-text");
const taskList = document.getElementById("tasksList");

window.addEventListener("load", function loadTasks() {
  let storedData = localStorage.getItem("itemsArray");
  if (storedData) {
    itemsArray = JSON.parse(storedData);
  }
  renderTasks();
});

function addTask() {
  const taskText = inputBox.value;

  itemsArray.push({ text: taskText, checked: false });
  renderTasks();
  saveTasks();

  inputBox.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";
  itemsArray.forEach(function (task, index) {
    let newTask = document.createElement("li");
    newTask.textContent = task.text;

    if (task.checked) {
      newTask.classList.add("checked");
    }

    newTask.addEventListener("click", function check() {
      task.checked = !task.checked;
      this.classList.toggle("checked");
      saveTasks();
    });

    const removeButton = document.createElement("button");
    removeButton.innerText = "delete";
    removeButton.onclick = function () {
      removeTask(index);
    };
    removeButton.setAttribute("class", "deletebutton");

    newTask.appendChild(removeButton);
    taskList.appendChild(newTask);
  });
}

function removeTask(index) {
  itemsArray.splice(index, 1);
  renderTasks();
  saveTasks();
}

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

function saveTasks() {
  localStorage.setItem("items", JSON.stringify(itemsArray));
}
