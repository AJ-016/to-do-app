const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

button.addEventListener("click", function(){

    const taskText = input.value;

    // prevent empty tasks
    if(taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    // create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function(){
        li.remove();
    };

    li.appendChild(deleteBtn);

    list.appendChild(li);

    input.value = "";

});

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        button.click();
    }
});