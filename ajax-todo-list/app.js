const TODOS_URL = 'https://fep-app.herokuapp.com/api/todos';

const addTaskForm = document.getElementById('addTaskForm');
const taskNameInput = document.getElementById('taskNameInput');
const taskList = document.getElementById('taskList');
const taskItemTemplate = document.getElementById('taskItemTemplate').innerHTML;

// В этой переменной мы будем хранить список всех
let tasks = [];

init();


function init(){
    addTaskForm.addEventListener('submit', onAddTaskFormSubmit);
    taskList.addEventListener('click', onTaskListClick);

    // При инициализации запрашиваем список задач
    fetchTodos();
}

function fetchTodos(){
    // fetch возращает промис, в который при резолве передает обьект response
    // у этого response есть метод json(), 
    // он в свою очередь тоже возвращает промис, в который при резолве передает данные
    // Эти данные мы передаем в setTasks и дальше по цепочке
    return fetch(TODOS_URL)
        .then((resp) => resp.json())
        .then(setTasks)
        .then(renderTodos)
}

// Эта функция вызывается когда от сервера призодит новый списко задач
// этот список мы будем сохранять в глобальную переменную tasks
function setTasks(data){
    tasks = data;

    // Обязательно возвращаем данные, чтобы они попали в следющий then в цепочке
    return data;
}

// Бежим по массиву задач и каждый обьект превразаем в строку,
// Затем все строки вставляем в контейнер
function renderTodos(data){
    console.log(data);
    taskList.innerHTML = data.map((el) => {
        return taskItemTemplate
            .replace('{{title}}', el.title)
            .replace('{{id}}', el.id)
            .replace('{{class}}', el.isDone ? 'done' : '')
    }).join('\n');
}

// Обработчик сабмита формы
function onAddTaskFormSubmit(event){
    event.preventDefault();

    submitForm();
}

// Когда сабмитися форма, значит пользователь добавляет новую задачу
// Создаем новый обьект и вызываем addTask
// После того как таска сохранится на сервере, нужно перезапросить спиок
function submitForm(){
    const task = { title: taskNameInput.value, isDone: false };

    addTask(task).then(fetchTodos);

    resetForm();
}

// Функция отправляет POST запрос на сервер, в body отправляет находится то что мы сохраняем в формате JSON
function addTask(task){
    return fetch(TODOS_URL, {
        method: 'POST',
        // Обратите внимание на хедеры, в этом была проблема на лекции. 
        // Мы слали запрос на сервер, но он не понимал в каком формате эти данные
        //'Content-Type': 'application/json' - мы говорим, что данные которые мы шлем - это json
        // 'Accept': 'application/json и говорим серверу, что ответ ждем тоже в JSON
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}

// При клике на элемент мы хотим изменить его состояние
// Для этого вызываем toggleTaskState - он изменит состояние на сервере
// А когда состояние изменится нужно заново перезапросить список
function onTaskListClick(event){
    if (event.target.classList.contains('task-item')){
        toggleTaskState(event.target)
            .then(fetchTodos);
    }
}
// Очищаем форму
function resetForm(){
    addTaskForm.reset();
}

function toggleTaskState(el){

    // Находим какой имеено todo пользователь переключает
    const id = el.dataset.todoId;
    const task = tasks.find((el) => {return el.id == id});

    // Меняем его состояние
    task.isDone = !task.isDone;
    console.log(id, task);

    // и отправляем запрос на обновление
    // обратите внимание на URL
    return fetch(TODOS_URL + '/' + task.id, {
        method: "PUT",
        // Обратите внимание на хедеры, в этом была проблема на лекции. 
        // Мы слали запрос на сервер, но он не понимал в каком формате эти данные
        //'Content-Type': 'application/json' - мы говорим, что данные которые мы шлем - это json
        // 'Accept': 'application/json и говорим серверу, что ответ ждем тоже в JSON
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

