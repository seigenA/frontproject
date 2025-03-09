import React, { Component } from 'react';
import styles from './TaskForm.module.css';

export default class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    handleChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const text = this.state.inputValue.trim();
        if (!text) return;
        this.props.onAddTask(text);
        this.setState({ inputValue: '' });
    };

    render() {
        const { inputValue } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Enter the task..."
                    value={inputValue}
                    onChange={this.handleChange}
                    className={styles.input}
                />
                <button type="submit" className={styles.btn}>
                    Add task
                </button>
            </form>
        );
    }
}