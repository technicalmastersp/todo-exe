const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

let tasks = [];

const setCurrentDateTime = () => {
    const now = new Date();
    // Get the local timezone offset (in minutes)
    const offset = now.getTimezoneOffset(); // This will give you the difference in minutes
    // Adjust the time to local timezone (add offset in minutes)
    now.setMinutes(now.getMinutes() - offset);
    
    const formattedDateTime = now.toISOString().slice(0, 16); // Use ISO format (yyyy-MM-ddTHH:mm)
    taskDate.value = formattedDateTime;
};

const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span>${index + 1}. ${task.text} <span class="date">(${task.date})</span></span>
            <div>
                <button class="bg-cyan-300 px-2 py-1 hover:bg-[#35bd47] mb-1" onclick="markComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="bg-cyan-300 px-2 py-1 hover:bg-[#bdbb35] mb-1" onclick="editTask(${index})">Edit</button>
                <button class="bg-cyan-300 px-2 py-1 hover:bg-[#bd3535] mb-1" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

const addTask = () => {
    const text = taskInput.value.trim();
    const date = taskDate.value;

    if (text && date) {
        tasks.push({ text, date, completed: false });
        taskInput.value = '';
        setCurrentDateTime();
        saveTasks(); // Save tasks to the file
        renderTasks();
    }
};

const markComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks(); // Save tasks to the file
    renderTasks();
};

const editTask = (index) => {
    const task = tasks[index];
    taskInput.value = task.text;
    taskDate.value = task.date;
    tasks.splice(index, 1);
    saveTasks(); // Save tasks to the file
    renderTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks(); // Save tasks to the file
    renderTasks();
};

const saveTasks = () => {
    window.electron.saveTasks(tasks);
};

const loadTasks = () => {
    window.electron.loadTasks().then((loadedTasks) => {
        tasks = loadedTasks;
        renderTasks();
    });
};

// Set initial datetime
setCurrentDateTime();

// Load tasks from file on start
loadTasks();

addTaskButton.addEventListener('click', addTask);