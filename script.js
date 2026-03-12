const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

button.addEventListener("click", function(){

    const taskText = input.value;

    if(taskText === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function(){
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);

    input.value = "";

});

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        button.click();
    }
});