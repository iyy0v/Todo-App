import {useState, useRef, useEffect} from 'react'
import TodoList from './todoList'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([])
  const todoRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  },[]) 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo() {
    const name = todoRef.current.value
    if(name === '') return null
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div id="todoField">
        <div id="todoList">
          <TodoList todos = {todos} toggleTodo={toggleTodo} />
        </div>
        <p id="todoCount"><b>{todos.filter(todo => !todo.complete).length}</b> left</p>
      </div>
      <input ref={todoRef} type="text" id="todoInput"/>
      <div id="controls">
        <button onClick={handleAddTodo} class="todoButton">Add</button>
        <button onClick={handleClearTodos} class="todoButton">Clear</button>
      </div>
      
    </>
  )
}

export default App;
