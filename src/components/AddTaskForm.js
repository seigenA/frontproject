import React, { useState } from 'react';
function AddTaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTask(inputValue);
    setInputValue('');
  };
  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Enter the task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="add-task-button">
        Add task
      </button>
    </form>
  );
}
export default AddTaskForm;