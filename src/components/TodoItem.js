import React from 'react';

function TodoItem({ task, onRemoveTask }) {
  const handleRemove = () => {
    onRemoveTask(task.id);
  };
  return (
    <div className="todo-item">
      <p className="todo-text">{task.text}</p>
      <button className="remove-task-button" onClick={handleRemove}>
        Delete
      </button>
    </div>
  );
}
export default TodoItem;