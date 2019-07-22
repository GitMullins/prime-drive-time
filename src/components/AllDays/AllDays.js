import React from 'react';

class AllDays extends React.Component {
  render() {
    const sortedDates = [...this.props.minDrives];

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
      <div className="AllDays">
        <div className="">
        <h2>All Days' Data</h2>
          {averageTime()}
          {quickestTime()}
        </div>
      </div>
    );
  }
}

export default AllDays;
