'use strict'

function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt}
        <span class="importance">${(todo.importance)}</span>
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
        <span class="time-stamp">${(todo.createdAt)}</span>
    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value

    const elImportance = document.querySelector('input[name="todo-important"]')
    const importance = +elImportance.value

    if (txt) addTodo(txt, importance)
    elTxt.value = ''
    elImportance.value = ''
    renderTodos()

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    var isConfirm = confirm("Are you sure?")
    if (isConfirm){
        removeTodo(todoId)
        renderTodos()
    }
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(filterBy) {

    setSort(filterBy)
    renderTodos()
}