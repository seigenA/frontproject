import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TodoList from './components/TodoList';

const defaultTasks = [
  { id: 1, text: 'Buy food' },
  { id: 2, text: 'Go chill' },
  { id: 3, text: 'Do homework' },
  { id: 4, text: 'Play Minecraft' },
];
function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(defaultTasks);
      localStorage.setItem('tasks', JSON.stringify(defaultTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (text) => {
    const newTask = {
      id: Date.now(), 
      text: text,
    };
    setTasks((prev) => [...prev, newTask]);
  };
  const removeTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };
  return (
    <div className="app-container">
      <Header />
      <AddTaskForm onAddTask={addTask} />
      <TodoList tasks={tasks} onRemoveTask={removeTask} />
    </div>
  );
}
export default App;
