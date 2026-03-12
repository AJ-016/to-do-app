const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

const taskCounter = document.getElementById("taskCounter"); // Counter element

// LOAD SAVED TASKS
window.onload = function(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        createTask(task.text, task.completed);
    });
    updateCounter(); // Update counter after loading
};

// ADD TASK BUTTON
button.addEventListener("click", function(){
    const taskText = input.value;
    if(taskText === "") return;

    createTask(taskText, false);
    saveTasks();
    updateCounter();

    input.value = "";
});

// ENTER KEY SUPPORT
input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        button.click();
    }
});

// CREATE TASK FUNCTION
function createTask(taskText, completed = false){

    const li = document.createElement("li");

    // CHECKBOX
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    // TASK TEXT
    const span = document.createElement("span");
    span.textContent = taskText;
    if(completed){
        span.classList.add("completed");
    }

    // Toggle completion on checkbox change
    checkbox.onchange = function(){
        span.classList.toggle("completed");
        saveTasks();
        updateCounter();
    };

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function(){
        li.remove();
        saveTasks();
        updateCounter();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
}

// SAVE TASKS TO LOCALSTORAGE
function saveTasks(){
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.querySelector("input").checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// FILTER BUTTONS
allBtn.onclick = function(){ filterTasks("all"); };
activeBtn.onclick = function(){ filterTasks("active"); };
completedBtn.onclick = function(){ filterTasks("completed"); };

function filterTasks(type){
    document.querySelectorAll("#taskList li").forEach(li => {
        const checkbox = li.querySelector("input");
        if(type === "all") li.style.display = "flex";
        if(type === "active") li.style.display = checkbox.checked ? "none" : "flex";
        if(type === "completed") li.style.display = checkbox.checked ? "flex" : "none";
    });
}

// TASK COUNTER
function updateCounter(){
    const activeTasks = Array.from(document.querySelectorAll("#taskList li input"))
        .filter(checkbox => !checkbox.checked).length;
    taskCounter.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}