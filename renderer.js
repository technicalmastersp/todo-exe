const addTodoBtn = document.getElementById('addTodoBtn');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

addTodoBtn.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    const li = document.createElement('li');
    li.textContent = todoText;
    todoList.appendChild(li);
    todoInput.value = '';  // Clear input
  }
});