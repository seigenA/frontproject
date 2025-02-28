import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, onRemoveTask }) {
  return (
    <div className="todo-list">
      {tasks.length === 0 ? (
        <p className="empty-list">List of tasks is empty.</p>
      ) : (
        tasks.map((task) => (
          <TodoItem key={task.id} task={task} onRemoveTask={onRemoveTask} />
        ))
      )}
    </div>
  );
}
export default TodoList;