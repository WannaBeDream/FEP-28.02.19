const TODOS_URL = 'https://fep-app.herokuapp.com/api/todos';

const addTaskForm = document.getElementById('addTaskForm');
const taskNameInput = document.getElementById('taskNameInput');
const taskList = document.getElementById('taskList');
const taskItemTemplate = document.getElementById('taskItemTemplate').innerHTML;

let tasks = [];

init();


function init(){
    addTaskForm.addEventListener('submit', onAddTaskFormSubmit);
    taskList.addEventListener('click', onTaskListClick);

    fetchTodos();
}

function fetchTodos(){
    return fetch(TODOS_URL)
        .then((resp) => resp.json())
        .then(setTasks)
        .then(renderTodos)
}

function setTasks(data){
    tasks = data;

    return data;
}

function renderTodos(data){
    console.log(data);
    taskList.innerHTML = data.map((el) => {
        return taskItemTemplate
            .replace('{{title}}', el.title)
            .replace('{{id}}', el.id)
            .replace('{{class}}', el.isDone ? 'done' : '')
    }).join('\n');
}

function onAddTaskFormSubmit(event){
    event.preventDefault();

    submitForm();
}

function submitForm(){
    const task = { title: taskNameInput.value, isDone: false };

    addTask(task).then(fetchTodos);

    resetForm();
}

function addTask(task){
    return fetch(TODOS_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}



function onTaskListClick(event){
    if (event.target.classList.contains('task-item')){
        toggleTaskState(event.target)
            .then(fetchTodos);
    }
}



function resetForm(){
    addTaskForm.reset();
}

function toggleTaskState(el){

    const id = el.dataset.todoId;
    const task = tasks.find((el) => {return el.id == id});

    task.isDone = !task.isDone;
    console.log(id, task);

    return fetch(TODOS_URL + '/' + task.id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

