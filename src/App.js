import React, { Component } from 'react';
import Header from './components/Header/Header';
import TaskManager from './components/Tasks/TaskManager';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import styles from './App.module.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'light', 
        };
    }
    toggleTheme = () => {
        this.setState((prev) => ({
            theme: prev.theme === 'light' ? 'dark' : 'light',
        }));
    };

    render() {
        const { theme } = this.state;
        const appClass = theme === 'light' ? styles.appLight : styles.appDark;

        return (
            <div className={appClass}>
                <Header theme={theme} onToggleTheme={this.toggleTheme} />
                <PomodoroTimer /> 
                <TaskManager theme={theme} />
            </div>
        );
    }
}
