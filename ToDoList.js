import React from "react";

const ToDoList = () => {
    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <ul className="todo-list">
                <li className="todo-item">First task</li>
                <li className="todo-item">Second Task</li>
            </ul>
            <button className="add-task">Add Task</button>
        </div>
    );
};

export default ToDoList;
