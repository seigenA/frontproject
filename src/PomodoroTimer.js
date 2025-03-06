import React, { Component } from 'react';
const WORK_TIME = 10;
const BREAK_TIME = 5;

class PomodoroTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWork: true,
            timeLeft: WORK_TIME,
            isRunning: false,   
        };
        this.intervalId = null;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    startTimer = () => {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                if (this.state.isRunning) {
                    this.tick();
                }
            }, 1000);
        }
    };
    stopTimer = () => {
        this.setState({ isRunning: false });
    };
    tick = () => {
        this.setState((prevState) => {
            if (prevState.timeLeft <= 1) {
                if (prevState.isWork) {
                    return {
                        isWork: false,
                        timeLeft: BREAK_TIME,
                    };
                } else {
                    return {
                        isWork: true,
                        timeLeft: WORK_TIME,
                    };
                }
            } else {
                return { timeLeft: prevState.timeLeft - 1 };
            }
        });
    };
    handleStartPause = () => {
        if (!this.state.isRunning) {
            this.setState({ isRunning: true }, () => {
                this.startTimer();
            });
        } else {
            this.stopTimer();
        }
    };

    handleReset = () => {
        if (this.state.isWork) {
            this.setState({ timeLeft: WORK_TIME });
        } else {
            this.setState({ timeLeft: BREAK_TIME });
        }
    };
    formatTime = (totalSec) => {
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };
    render() {
        const { isWork, timeLeft, isRunning } = this.state;
        const sessionName = isWork ? 'Work' : 'Break';
        const buttonLabel = isRunning ? 'Pause' : 'Start';

        return (
            <div className="pomodoro-container">
                <h2 className="session-name">{sessionName} Session</h2>

                <div className="time-display">
                    {this.formatTime(timeLeft)}
                </div>

                <div className="controls">
                    <button onClick={this.handleStartPause} className="start-pause-btn">
                        {buttonLabel}
                    </button>
                    <button onClick={this.handleReset} className="reset-btn">
                        Reset
                    </button>
                </div>

                <p className="session-info">
                    (Work: {WORK_TIME}s, Break: {BREAK_TIME}s for quick demo!)
                </p>
            </div>
        );
    }
}
export default PomodoroTimer;