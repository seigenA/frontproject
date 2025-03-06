import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header-title">Pomodoro Timer (Class-based)</h1>
        <p className="header-subtitle">Focus on Work & Take Breaks Properly</p>
      </header>
    );
  }
}

export default Header;