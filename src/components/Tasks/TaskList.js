import React, { Component } from 'react';
import TaskListItem from './TaskListItem';
import styles from './TaskList.module.css';

export default class TaskList extends Component {
    render() {
        const { tasks, onRemoveTask, onToggleStatus, onEditTask } = this.props;

        if (!tasks || tasks.length === 0) {
            return <p className={styles.emptyList}>No tasks found.</p>;
        }

        return (
            <div className={styles.listContainer}>
                {tasks.map((task) => (
                    <TaskListItem
                        key={task.id}
                        task={task}
                        onRemoveTask={onRemoveTask}
                        onToggleStatus={onToggleStatus}
                        onEditTask={onEditTask}
                    />
                ))}
            </div>
        );
    }
}