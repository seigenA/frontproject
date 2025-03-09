import React, { Component } from 'react';
import styles from './Header.module.css';

export default class Header extends Component {
    handleThemeToggle = () => {
        this.props.onToggleTheme();
    };
    render() {
        const { theme } = this.props;
        return (
            <header className={styles.header}>
                <h1 className={styles.title}>My To-Do Application</h1>
                <p className={styles.subtitle}>Organize tasksn</p>

                <button className={styles.themeButton} onClick={this.handleThemeToggle}>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
                </button>
            </header>
        );
    }
}