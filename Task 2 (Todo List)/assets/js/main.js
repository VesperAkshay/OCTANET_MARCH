// VARIABLES
const taskInput = document.querySelector(".task__input input");
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear__button"),
taskBox = document.querySelector(".task__box");
enterBtn = document.querySelector(".input__button");
todoCount = document.querySelector(".count");
dragMsg = document.querySelector(".dragMsg")
drag = document.querySelector(".drag");


let editId;
let isEditedTask = false;

// DARK MODE
const darkmode = document.querySelector('.dark__toggle'),body = document.querySelector('.page');

darkmode.onclick = () => {
    body.classList.toggle("dark");
}

enterBtn.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    taskInput.value = "";
    let taskInfo = {name: userTask, status: "pending"};
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
    todoCount.innerHTML = todos.length;
});


let todos = JSON.parse(localStorage.getItem("todo-list"));


// FILTERS SORT
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
        todoCount.innerHTML = todos.length;
    });
});

function showTodo(filter) {
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all"){
                li += `<li class="task">
                <label for="${id}">
                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}></input>
                <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="liOptions">
                <i onclick="editTask(${id}, '${todo.name}')" class='bx bxs-pencil'></i>
                <i onclick="deleteTask(${id})" class='bx bx-x'></i>
                </div>
                    </li>`;
                }
            });
    }
    taskBox.innerHTML = li;
    nodeCount = todos.length;
    
}
// showTodo("all");

// Edit a list task
function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName; 
}

// Delete a list task
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
    todoCount.innerHTML = todos.length;    
}

// Delete all list task
clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
    todoCount.innerHTML =  todos.length;
})

// Update if it's pending or completed
function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
        nodeCount--;
        todoCount.innerHTML = nodeCount;
    }
    else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
        nodeCount++;
        todoCount.innerHTML = nodeCount;
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    
}

// Input enter key
taskInput.addEventListener("keyup", e => {
    
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditedTask){
            if(!todos) {
                todos = [];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
            
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        localStorage.setItem("todo-list", JSON.stringify(todos));
        
        showTodo("all");
        
        taskInput.value = "";
        nodeCount = todos.length;
        todoCount.innerHTML = nodeCount;
    }
});

// Draggable function

var sortable = Sortable.create(taskBox);

dragMsg.onclick = function () {
    var state = sortable.option("disabled"); // get
    
	sortable.option("disabled", !state); // set

    dragMsg.innerHTML = state ? 'Drag and drop reorder list | enabled' : 'Drag and drop reorder list | disabled';
};
