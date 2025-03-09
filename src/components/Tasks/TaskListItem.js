import React, { Component } from 'react';
import styles from './TaskListItem.module.css';

export default class TaskListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            editValue: props.task.text,
        };
    }

    handleToggleStatus = () => {
        if (this.props.task.status !== 'done') {
            this.props.onToggleStatus(this.props.task.id);
        }
    };

    handleRemove = () => {
        this.props.onRemoveTask(this.props.task.id);
    };

    handleEditToggle = () => {
        if (this.props.task.status !== 'done') {
            this.setState((prev) => ({ isEditing: !prev.isEditing }));
        }
    };

    handleEditChange = (e) => {
        this.setState({ editValue: e.target.value });
    };

    handleEditSave = () => {
        const { editValue } = this.state;
        if (!editValue.trim()) return;
        this.props.onEditTask(this.props.task.id, editValue.trim());
        this.setState({ isEditing: false });
    };

    render() {
        const { task } = this.props;
        const { isEditing, editValue } = this.state;

        const isDone = task.status === 'done';
        const statusLabel = isDone ? 'Done' : 'Mark Done';
        const itemClass = isDone ? styles.itemDone : styles.itemInProgress;

        return (
            <div className={`${styles.item} ${itemClass}`}>
                {isEditing ? (
                    <input
                        className={styles.editInput}
                        value={editValue}
                        onChange={this.handleEditChange}
                    />
                ) : (
                    <p className={styles.text}>{task.text}</p>
                )}

                <div className={styles.controls}>
                    <button className={styles.btn} onClick={this.handleToggleStatus}>
                        {statusLabel}
                    </button>

                    {!isDone && (
                        <>
                            <button className={styles.btn} onClick={this.handleEditToggle}>
                                Edit
                            </button>
                            <button className={styles.removeBtn} onClick={this.handleRemove}>
                                Delete
                            </button>
                        </>
                    )}

                    {isEditing && (
                        <>
                            <button className={styles.btn} onClick={this.handleEditSave}>
                                Save
                            </button>
                            <button className={styles.removeBtn} onClick={this.handleEditToggle}>
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
