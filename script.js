
function addTask() {

    let task = document.getElementById("taskInput").value;

    if (task.trim() === "") {
        alert("Please enter a task");
        return;
    }

    createTask(task, false);

    saveTasks();

    document.getElementById("taskInput").value = "";
}

function createTask(task, completed) {

    let li = document.createElement("li");

    let taskText = document.createElement("span");
    taskText.innerText = task;

    li.appendChild(taskText);

    let completeBtn = document.createElement("button");
    completeBtn.innerText = "Complete";

    if (completed) {
        taskText.style.textDecoration = "line-through";
    }

    completeBtn.onclick = function() {
        taskText.style.textDecoration = "line-through";
        saveTasks();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {

    let tasks = [];

    let items = document.querySelectorAll("#taskList li");

    items.forEach(function(li) {

        let span = li.querySelector("span");

        tasks.push({
            text: span.innerText,
            completed: span.style.textDecoration === "line-through"
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function(task) {
        createTask(task.text, task.completed);
    });
}

loadTasks();
