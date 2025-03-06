import React, { Component } from 'react';
import Header from './Header';
import PomodoroTimer from './PomodoroTimer';

class App extends Component {
    render() {
        return (
            <div className="app-container">
                <Header />
                <PomodoroTimer />
            </div>
        );
    }
}

export default App;