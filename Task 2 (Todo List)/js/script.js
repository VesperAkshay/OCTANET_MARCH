const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const categorySelect = document.getElementById('category');
const descriptionTextarea = document.getElementById('description');
const deadlineInput = document.getElementById('deadline');
const prioritySelect = document.getElementById('priority');
const labelsInput = document.getElementById('labels');
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById('sort-button');

let tasks = [];

// Function to add a new task
function addTodo() {
  const todoText = newTodoInput.value.trim();
  const category = categorySelect.value;
  const description = descriptionTextarea.value.trim();
  const deadline = deadlineInput.value;
  const priority = prioritySelect.value;
  const labels = labelsInput.value.split(',').map(label => label.trim());

  if (todoText !== '') {
    const newTask = {
      text: todoText,
      category: category,
      description: description,
      deadline: deadline,
      priority: priority,
      labels: labels,
      completed: false
    };

    tasks.push(newTask);
    saveTasksToLocalStorage();
    renderTasks();
    clearInputs();
  }
}

// Function to render tasks
function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${task.priority}`;
    todoItem.innerHTML = `
      <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
      <label for="task-${index}">${task.text}</label>
      <button class="remove-button" data-index="${index}">Remove</button>
      <div>Category: ${task.category}</div>
      <div>Description: ${task.description}</div>
      <div>Deadline: ${task.deadline}</div>
      <div>Priority: ${task.priority}</div>
      <div>Labels: ${task.labels.join(', ')}</div>
    `;
    todoList.appendChild(todoItem);
  });
}

// Function to clear input fields
function clearInputs() {
  newTodoInput.value = '';
  descriptionTextarea.value = '';
  deadlineInput.value = '';
  labelsInput.value = '';
}

// Function to remove a task
function removeTodo(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
}

// Function to sort tasks by priority
function sortTasksByPriority() {
  tasks.sort((a, b) => {
    const priorityOrder = { urgent: 1, important: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  renderTasks();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Event listener for the add button
addButton.addEventListener('click', addTodo);

// Event delegation for remove buttons
todoList.addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-button')) {
    const index = event.target.getAttribute('data-index');
    removeTodo(index);
  }
});

// Event listener for the sort button
sortButton.addEventListener('click', sortTasksByPriority);

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
