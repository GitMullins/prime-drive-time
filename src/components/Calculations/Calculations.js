import React from 'react';
// import moment from 'moment';

import './Calculations.scss';

class Calculations extends React.Component {
  averageTime = () => {
    const avgTimeArr = [];
    this.props.minDrives.forEach((minDrive) => {
      avgTimeArr.push(minDrive.minutes);
    });
    const avgTime = avgTimeArr.reduce((a, b) => a + b, 0) / avgTimeArr.length;
    return avgTime.toFixed(0);
  }

  quickestTime = () => {
    const quickestTimeArr = [];
    this.props.minDrives.forEach((minDrive) => {
      quickestTimeArr.push(minDrive.minutes);
    });
    return Math.min(...quickestTimeArr);
  }

  formatDates = () => {
    const datesArr = [];
    this.props.drives.forEach((drive) => {
      const momentDate = drive.date;
      datesArr.push(momentDate);
    });
    const c = datesArr.sort((a, b) => new Date(b) - new Date(a));
    console.error(c);
  }

  render() {
    this.averageTime();
    return (
      <div className="MyDrives container">
        <h1>Calculations</h1>
        <div>
          <h3>Average Time: {this.averageTime()} minutes</h3>
          <h3>Quickest Time: {this.quickestTime()} minutes</h3>
          <h3>{this.formatDates()}</h3>
        </div>
      </div>
    );
  }
}

export default Calculations;
