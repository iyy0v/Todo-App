import React from 'react'
import './todo.css'

export default function Todo( {todo, toggleTodo} ) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <div id="todo">
            <label>
                <input type="checkbox" defaultChecked={todo.complete} onChange={handleTodoClick} class="todoBox"></input>
                <p>{todo.name}</p>
            </label>
            
        </div>
    )
}