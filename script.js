const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// load saved tasks when page opens
window.onload = function(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTask(task));
};

button.addEventListener("click", function(){
    const taskText = input.value;

    if(taskText === "") return;

    createTask(taskText);
    saveTasks();

    input.value = "";
});

function createTask(taskText){
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function(){
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
}

// save tasks to localStorage
function saveTasks(){
    const tasks = [];
    document.querySelectorAll("li span").forEach(span => {
        tasks.push(span.textContent);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        button.click();
    }
});