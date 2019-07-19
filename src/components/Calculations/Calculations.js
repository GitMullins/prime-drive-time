import React from 'react';
import moment from 'moment';

import './Calculations.scss';

class Calculations extends React.Component {
  state = {
    newDrives: [],
  }

  averageTime = () => {
    const minutesArr = [];
    this.state.newDrives.map((newDrive) => {
      minutesArr.push(newDrive.minutes);
    });
    return minutesArr.reduce((a, b) => a + b, 0) / minutesArr.length;
  }

  assignMinutes = () => {
    const assign = this.props.drives.map((drive) => {
      const start = moment(drive.startTime, 'HH:mm');
      const end = moment(drive.endTime, 'HH:mm');
      const minutes = end.diff(start, 'minutes');
      return { ...drive, minutes };
    });
    this.setState({ newDrives: assign });
  };

  componentDidMount() {
    this.assignMinutes();
  }

  render() {
    this.averageTime();
    return (
      <div className="MyDrives container">
        <h1>Calculations</h1>
        <button onClick={this.assignMinutes}>Calculate</button>
        <div className="d-flex row">
          <h3> Average Time: {this.averageTime()} minutes</h3>
        </div>
      </div>
    );
  }
}

export default Calculations;
