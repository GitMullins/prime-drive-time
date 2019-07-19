import React from 'react';
// import moment from 'moment';

import './Calculations.scss';

class Calculations extends React.Component {
  // state = {
  //   minDrives: [],
  // }

  averageTime = () => {
    const minutesArr = [];
    this.props.minDrives.forEach((minDrive) => {
      minutesArr.push(minDrive.minutes);
    });
    return minutesArr.reduce((a, b) => a + b, 0) / minutesArr.length;
  }

  // componentDidMount() {
  //   this.props.getDrives();
  // }

  render() {
    this.averageTime();
    return (
      <div className="MyDrives container">
        <h1>Calculations</h1>
        <div className="d-flex row">
          <h3> Average Time: {this.averageTime()} minutes</h3>
        </div>
      </div>
    );
  }
}

export default Calculations;
