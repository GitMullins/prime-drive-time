import React from 'react';
import Last5Days from '../Last5Days/Last5Days';
import Last20Days from '../Last20Days/Last20Days';
import AllDays from '../AllDays/AllDays';

import './Calculations.scss';

class Calculations extends React.Component {
  sortDates = () => {
    const descendingDates = this.props.minDrives.sort((a, b) => new Date(b.date) - new Date(a.date));
    return descendingDates;
  }

  render() {
    this.sortDates();
    return (
      <div className="Calculations container">
        <h1>Calculations</h1>
          <Last5Days
          minDrives={this.props.minDrives}
          sortDates={this.sortDates}
          /><br/>
          <Last20Days
          minDrives={this.props.minDrives}
          sortDates={this.sortDates}
          /><br/>
          <AllDays
          minDrives={this.props.minDrives}
          sortDates={this.sortDates}
          />
      </div>
    );
  }
}

export default Calculations;
