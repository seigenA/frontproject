import React, { Component } from 'react';
import styles from './TaskTimerForTask.module.css';

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default class TaskTimerForTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWork: true,
      timeLeft: WORK_TIME,
      isRunning: false,
    };
    this.intervalId = null;
  }

  componentWillUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
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
    this.setState((prev) => {
      if (prev.timeLeft <= 1) {
        if (prev.isWork) {
          return { isWork: false, timeLeft: BREAK_TIME };
        } else {
          return { isWork: true, timeLeft: WORK_TIME };
        }
      } else {
        return { timeLeft: prev.timeLeft - 1 };
      }
    });
  };

  handleStartPause = () => {
    this.setState((prev) => {
      if (!prev.isRunning) {
        this.startTimer();
      }
      return { isRunning: !prev.isRunning };
    });
  };

  handleReset = () => {
    this.setState((prev) => ({
      timeLeft: prev.isWork ? WORK_TIME : BREAK_TIME,
    }));
  };

  formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  render() {
    const { isWork, timeLeft, isRunning } = this.state;
    const sessionName = isWork ? 'Work' : 'Break';

    return (
      <div className={styles.timerContainer}>
        <p className={styles.info}>
          {sessionName} — {this.formatTime(timeLeft)}
        </p>

        <div className={styles.controls}>
          <button onClick={this.handleStartPause} className={styles.btn}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={this.handleReset} className={styles.btn}>Reset</button>
        </div>
      </div>
    );
  }
}