import React, { Component } from 'react';
import styles from './TaskManager.module.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
export default class TaskManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            searchTerm: '',
            filter: 'all',
        };
    }

    componentDidMount() {
        const saved = localStorage.getItem('myTasks');
        if (saved) {
            this.setState({ tasks: JSON.parse(saved) });
        } else {
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tasks !== this.state.tasks) {
            localStorage.setItem('myTasks', JSON.stringify(this.state.tasks));
        }
    }
    handleAddTask = (text) => {
        const newTask = {
            id: Date.now(),
            text,
            status: 'in-progress',
        };
        this.setState((prev) => ({
            tasks: [...prev.tasks, newTask],
        }));
    };
    handleRemoveTask = (id) => {
        this.setState((prev) => ({
            tasks: prev.tasks.filter((t) => t.id !== id),
        }));
    };
    handleToggleStatus = (id) => {
        this.setState((prev) => {
            const updated = prev.tasks.map((task) => {
                if (task.id === id) {
                    const newStatus = task.status === 'done' ? 'in-progress' : 'done';
                    return { ...task, status: newStatus };
                }
                return task;
            });
            return { tasks: updated };
        });
    };
    handleEditTask = (id, newText) => {
        this.setState((prev) => {
            const updated = prev.tasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            );
            return { tasks: updated };
        });
    };
    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleFilterChange = (e) => {
        this.setState({ filter: e.target.value });
    };

    getFilteredTasks = () => {
        const { tasks, searchTerm, filter } = this.state;
        let result = tasks;
        if (searchTerm.trim()) {
            const lower = searchTerm.toLowerCase();
            result = result.filter((t) => t.text.toLowerCase().includes(lower));
        }

        if (filter === 'in-progress') {
            result = result.filter((t) => t.status === 'in-progress');
        } else if (filter === 'done') {
            result = result.filter((t) => t.status === 'done');
        }

        return result;
    };

    render() {
        const { searchTerm, filter } = this.state;
        const tasksToShow = this.getFilteredTasks();

        return (
            <div className={styles.managerContainer}>
                <h2 className={styles.title}>Tasks</h2>
                <TaskForm onAddTask={this.handleAddTask} />

                <div className={styles.filters}>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={this.handleSearchChange}
                        className={styles.searchInput}
                    />

                    <select
                        value={filter}
                        onChange={this.handleFilterChange}
                        className={styles.selectFilter}
                    >
                        <option value="all">All</option>
                        <option value="in-progress">In progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <TaskList
                    tasks={tasksToShow}
                    onRemoveTask={this.handleRemoveTask}
                    onToggleStatus={this.handleToggleStatus}
                    onEditTask={this.handleEditTask}
                />
            </div>
        );
    }
}