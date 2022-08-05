const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Navigation
const columnViewBtn = document.getElementById('column-view-btn');
const rowViewBtn = document.getElementById('row-view-btn');

// Current Tasks
const tasksList = document.querySelector('.task-list');
const tasks = document.querySelectorAll('.task');

// Disabled Tasks
const tasksDisabledList = document.querySelector('.task-disabled-list');

// Modal
const closeNewTaskModal = document.getElementById('close-new-task-modal')
const newTaskNameInput = document.getElementById('new-task-name-input');
const newTaskDescriptionInput = document.getElementById('new-task-description-input');
const addTaskBtn = document.getElementById('add-task-btn');

// edit modal
const clodeEditModal = document.getElementById('close-edit-modal');
const editNameInput = document.getElementById('edit-name-input');
const editDescInput = document.getElementById('edit-desc-input');
const saveEditsBtn = document.getElementById('save-edit-btn');

// Variables
let todosArray = [
    {id:1, name: "English Learning", description:"Listening, speaking, writing"},
    {id:2, name: "shopping", description:"Dress for my birthday party"},
];

// Eventlisteners

window.addEventListener('load',todosGenerator);
columnViewBtn.addEventListener('click', columnView);
rowViewBtn.addEventListener('click', rowView);
closeNewTaskModal.addEventListener('click', closeNewTodoModal)
addTaskBtn.addEventListener('click', addNewTodo);

// Functions

function columnView() {
    tasksList.classList.add('column-style');
    tasksDisabledList.classList.add('column-style');
}

function rowView() {
    tasksList.classList.remove('column-style');
    tasksDisabledList.classList.remove('column-style');
}

function addToLocal(todoArray) {
    localStorage.setItem('todos', JSON.stringify(todoArray))
}

function closeNewTodoModal() {

    newTaskNameInput.value = '';
    newTaskDescriptionInput.value = '';
}

function addNewTodo() {

    let newTodoNameValue = newTaskNameInput.value;
    let newTodoDescValue = newTaskDescriptionInput.value;
    
    if (newTodoNameValue && newTodoDescValue) {

        let newTodoObj = {
            id: todosArray.length + 1,
            name: newTodoNameValue,
            description: newTodoDescValue,
        };
    
        todosArray.push(newTodoObj);
        addToLocal(todosArray);
        todosGenerator(todosArray);
    }

    console.log(todosArray);
}

function todosGenerator() {
    tasksList.innerHTML = '';
    addToLocal(todosArray)

    let newTodo, todoInfoDiv, todoBtnsDiv, todoNameDiv, todoDescSpan, todoEditBtn, todoDeleteBtn, todoDoneBtn;

    todosArray.forEach(todo => {

        // elements
        newTodo = document.createElement('li');
        newTodo.setAttribute('class','task list-group-item d-flex justify-content-between align-items-center rounded flex-fill');

        todoInfoDiv = document.createElement('div');
        todoInfoDiv.setAttribute('class','ms-2 me-auto');

        todoBtnsDiv = document.createElement('div');
        todoBtnsDiv.setAttribute('class','task-control-btns-wrapper d-flex flex-row');

        todoNameDiv = document.createElement('div');
        todoNameDiv.setAttribute('class','task-name');
        todoNameDiv.innerHTML = todo.name;

        todoDescSpan = document.createElement('span');
        todoDescSpan.setAttribute('class','task-description text-secondary');
        todoDescSpan.innerHTML = todo.description;
        
        todoEditBtn = document.createElement('button');
        todoEditBtn.setAttribute('class','task-control-btn');
        todoEditBtn.setAttribute('id','edit-task-btn');
        todoEditBtn.setAttribute('data-bs-toggle','modal');
        todoEditBtn.setAttribute('data-bs-target','#editModal');
        todoEditBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/></svg>';

        todoDeleteBtn = document.createElement('button');
        todoDeleteBtn.classList.add('task-control-btn');
        todoDeleteBtn.setAttribute('id','delete-task-btn');
        todoDeleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

        todoDoneBtn = document.createElement('button');
        todoDoneBtn.classList.add('task-control-btn');
        todoDoneBtn.setAttribute('id','done-task-btn');
        todoDoneBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>';
        
        todoBtnsDiv.append(todoEditBtn,todoDeleteBtn,todoDoneBtn);
        todoInfoDiv.append(todoNameDiv,todoDescSpan);
        newTodo.append(todoInfoDiv,todoBtnsDiv);

        tasksList.append(newTodo);

        todoEditBtn.addEventListener('click',editTodo)
        todoDeleteBtn.addEventListener('click',deleteTodo)
        todoDoneBtn.addEventListener('click',doneTodo)
    })
}

function editTodo(event) {

    let todoElem = event.target.parentElement.parentElement;
    let todoName = todoElem.children[0].children[0].innerHTML;

    todosArray.forEach( todo => {
        if(todo.name === todoName){

            saveEditsBtn.addEventListener('click', function(){

                todo.name = editNameInput.value
                todo.description = editDescInput.value;
                addToLocal(todosArray)
                todosGenerator(todosArray)
                console.log(todosArray);
            })
        }
    })

    clodeEditModal.addEventListener('click', function() {
        editNameInput.value = ''
        editDescInput.value = ''
    })
};

function deleteTodo(event) {

    let todoElem = event.target.parentElement.parentElement;
    let todoName = todoElem.children[0].children[0].innerHTML;
    let todoIndex; 

    todosArray.forEach( todo => {
        if(todo.name === todoName){
            todoIndex = todosArray.indexOf(todo);
            todosArray.splice(todoIndex,1);
            todosGenerator(todosArray)
        }
    })
};

function doneTodo(event) {

    let todoElem = event.target.parentElement.parentElement;
    let todoIndex;

    todoElem.classList.remove('task')

    todoElem.classList.add('task-disabled')

    todoElem.children[0].children[0].classList.add('text-decoration-line-through');
    todoElem.children[0].children[1].classList.add('text-decoration-line-through');

    Array.from(todoElem.children[1].children).forEach( btn => {
        btn.disabled = 'true'
    })

    tasksDisabledList.append(todoElem);

        // new line
        Array.from(tasksDisabledList.children).forEach( done => {
            done.addEventListener('dblclick', function () {
                done.remove()
            })
        })

    todosArray.forEach(todo => {

        if (todo.name == todoElem.children[0].children[0].innerHTML) {

            todoIndex = todosArray.indexOf(todo);
            todosArray.splice(todoIndex,1);
            addToLocal(todosArray)
        }
    })
    
};

Array.from(tasksDisabledList.children).forEach( done => {
    done.addEventListener('dblclick', function () {
        done.remove()
    })
})
