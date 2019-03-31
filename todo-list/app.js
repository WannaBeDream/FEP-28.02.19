const addTaskForm = document.getElementById('addTaskForm');
const taskNameInput = document.getElementById('taskNameInput');
const taskList = document.getElementById('taskList');
const taskItemTemplate = document.getElementById('taskItemTemplate').innerHTML;

addTaskForm.addEventListener('submit', onAddTaskFormSubmit);
taskList.addEventListener('click', onTaskListClick);

function onAddTaskFormSubmit(event){
    event.preventDefault();

    submitForm();
}

function onTaskListClick(event){
    if (event.target.classList.contains('task-item')){
        toggleTaskState(event.target);
    }
}

function submitForm(){
    const task = { title: taskNameInput.value };

    addTask(task);
    resetForm();
}

function addTask(task){
    const html = taskItemTemplate.replace('{{title}}', task.title);

    const newTaskEl = htmlToElement(html)
    taskList.appendChild(newTaskEl);
}

function resetForm(){
    addTaskForm.reset();
}

function toggleTaskState(el){
    el.classList.toggle('done');
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}