import React from 'react';
import './Last5Days.scss';

class Last5Days extends React.Component {
  render() {
    const sortedDates = this.props.sortDates(this.props.minTrips);
    const sortedDatesCopy = [...sortedDates];

    const popOff = () => {
      while (sortedDatesCopy.length > 5) {
        sortedDatesCopy.pop();
      }
    };

    const averageTime = () => {
      const minsArr = [];
      sortedDatesCopy.forEach((day) => {
        minsArr.push(day.minutes);
      });
      const avgTime = minsArr.reduce((a, b) => a + b, 0) / minsArr.length;
      return <h4>Average Time: {avgTime.toFixed(0)} minutes</h4>;
    };

    const quickestTime = () => {
      const minsArr = [];
      sortedDatesCopy.forEach((day) => {
        minsArr.push(day.minutes);
      });
      const quickTime = Math.min(...minsArr);
      return <h4>Quickest Time: {quickTime.toFixed(0)} minutes</h4>;
    };

    const bestTimeToLeave = () => {
      const minsArr = [];
      sortedDatesCopy.forEach((day) => {
        minsArr.push(day.minutes);
      });
      const result = [];
      minsArr.forEach((element, index) => {
        // Find if there are duplicate minutes or not
        // element = duplicate mins
        if (minsArr.indexOf(element, index + 1) > -1) {
          // Find if the element is already in the result array or not
          if (result.indexOf(element) === -1) {
            result.push(element);
          }
        }
      });
      // accepts duplicate drive time as best time to leave if it is not the slowest or 2nd slowest in the 5day array
      if (result.length > 0 && minsArr.sort().indexOf(result) !== 3 && minsArr.sort().indexOf(result) !== 4) {
        result.length = 1;
        const newArray = sortedDatesCopy.find(drive => drive.minutes === result[0]);
        return <h4>Best Time to Leave: {newArray.startTime}</h4>;
      }
      const quickTime = Math.min(...minsArr);
      const quickArr = sortedDatesCopy.filter(drive => drive.minutes === quickTime);
      // if statement added to prevent empty array errors
      if (quickArr.length > 0) {
        return <h4>Best Time to Leave: {quickArr[0].startTime}</h4>;
      }
      return null;
    };

    return (
      <div className="Last5Days">
        {popOff()}
        <div className="card last-5-card">
        <h2>Last 5 Days</h2>
          {bestTimeToLeave()}
          {averageTime()}
          {quickestTime()}
        </div>
      </div>
    );
  }
}

export default Last5Days;
