'use strict'

const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy

_createTodos()

function getTodosForDisplay() {
    var todoDisplay = gTodos.filter(todo => {
    if (gFilterBy === 'all') {
        document.querySelector('.no-todos').classList.add('hide')

        if (!gTodos.length){
            document.querySelector('.no-todos').classList.remove('hide')
            document.querySelector('.no-todos').innerText = 'No todos'
        }
        return todo
    }

    else if (gFilterBy === 'done') {
        document.querySelector('.no-todos').classList.add('hide')

        if (!gTodos.filter(todo => todo.isDone).length) {
            document.querySelector('.no-todos').classList.remove('hide')
            document.querySelector('.no-todos').innerText = 'No done todos'
        }
        return todo.isDone && gFilterBy === 'done'
    }

    else if (gFilterBy === 'active') {
        document.querySelector('.no-todos').classList.add('hide')

        if (!gTodos.filter(todo => !todo.isDone).length) {
            document.querySelector('.no-todos').classList.remove('hide')
            document.querySelector('.no-todos').innerText = 'No active todos'
        }
        return !todo.isDone && gFilterBy === 'active'
    }
    })

    return todoDisplay.sort((a, b) => {
        if (gSortBy === 'created') return b.createdAt - a.createdAt

        else if (gSortBy === 'importance') return a.importance - b.importance

        else if (gSortBy === 'text') return a.txt.localeCompare(b.txt)
    })

}


function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}


function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}


function setSort(filterBy) {
    gSortBy = filterBy
}


function getDoneTodos() {
    return gTodos.filter(todo => todo.isDone).length
}


function getTotalTodos() {
    return gTodos.length  
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance = 1) {
    return {
        id: _makeId(),
        txt: txt,
        importance ,
        createdAt: _timeStamp(),
        isDone: false,
    }
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}


function _timeStamp(){
    var timeStamp = new Date()

    var timeStampFormat = timeStamp.getHours()+
    ":"+timeStamp.getMinutes()+
    ":"+timeStamp.getSeconds()+
    " "+timeStamp.getDate()+
    "."+(timeStamp.getMonth()+1)+
    "."+timeStamp.getFullYear()

    return timeStampFormat
}