import React from 'react';

class Last5Days extends React.Component {
  averageTime = () => {
    const { minDrives } = this.props;
    if (this.props.sortDates().length > 5) {
      minDrives.pop();
    }
    const avgTimeArr = [];
    minDrives.forEach((minDrive) => {
      avgTimeArr.push(minDrive.minutes);
    });
    const avgTime = avgTimeArr.reduce((a, b) => a + b, 0) / avgTimeArr.length;
    return <h4>{avgTime} minutes</h4>;
  }

  quickestTime = () => {
    const quickestTimeArr = [];
    this.props.minDrives.forEach((minDrive) => {
      quickestTimeArr.push(minDrive.minutes);
    });
    const quickTime = Math.min(...quickestTimeArr);
    return <h4>{quickTime} minutes</h4>;
  }

  render() {
    return (
      <div className="Last5Days container">
        <h2>Last 5 Days</h2>
        <div>
          <h3>Average Time:</h3>
          {this.averageTime()}
          <h3>Quickest Time:</h3>
          {this.quickestTime()}
        </div>
      </div>
    );
  }
}

export default Last5Days;
