import React from 'react';
import './Last5Days.scss';

class Last5Days extends React.Component {
  render() {
    const sortedDates = [...this.props.minDrives];

    const popOff = () => {
      while (sortedDates.length > 5) {
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

    const bestTimeToLeave = () => {
      const minsArr = [];
      sortedDates.forEach((day) => {
        minsArr.push(day.minutes);
      });
      const result = [];
      minsArr.forEach((element, index) => {
        // Find if there is a duplicate or not
        if (minsArr.indexOf(element, index + 1) > -1) {
          // Find if the element is already in the result array or not
          if (result.indexOf(element) === -1) {
            result.push(element);
          }
        }
        // accepts duplicate drive time as best time to leave if it is not the slowest or 2nd slowest in the 5day array
        if (result.length > 0 && minsArr.sort().indexOf(result[0]) !== 3 && minsArr.sort().indexOf(result[0]) !== 4) {
          const newArray = sortedDates.filter(drive => drive.minutes === result[0]);
          return <h4>Best Time to Leave: {newArray[0].startTime}</h4>;
        }
        const quickTime = Math.min(...minsArr);
        sortedDates.filter(drive => drive.minutes === quickTime);
        // console.error('dates', sortedDates);
        // return <h4>Best Time to Leave: {quickArr.startTime}</h4>;
      });
    };

    return (
      <div className="Last5Days">
        {popOff()}
        {console.error(sortedDates)}
        <div>
        <h2>Last 5 Days</h2>
          {averageTime()}
          {quickestTime()}
          {bestTimeToLeave()}
        </div>
      </div>
    );
  }
}

export default Last5Days;
