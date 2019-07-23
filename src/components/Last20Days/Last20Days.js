import React from 'react';

class Last20Days extends React.Component {
  render() {
    const sortedDates = [...this.props.minDrives];

    const popOff = () => {
      while (sortedDates.length > 20) {
        sortedDates.pop();
      }
    };

    const averageTime = () => {
      const minsArr = [];
      sortedDates.forEach((day) => {
        minsArr.push(day.minutes);
      });
      const avgTime = minsArr.reduce((a, b) => a + b, 0) / minsArr.length;
      return <h4>Average Time: {avgTime.toFixed(0)} minutes</h4>;
    };

    const quickestTime = () => {
      const minsArr = [];
      sortedDates.forEach((day) => {
        minsArr.push(day.minutes);
      });
      const quickTime = Math.min(...minsArr);
      return <h4>Quickest Time: {quickTime.toFixed(0)} minutes</h4>;
    };

    return (
      <div className="Last20Days container">
        {popOff()}
        <h2>Last 20 Days</h2>
        <div>
          {averageTime()}
          {quickestTime()}
        </div>
      </div>
    );
  }
}

export default Last20Days;
