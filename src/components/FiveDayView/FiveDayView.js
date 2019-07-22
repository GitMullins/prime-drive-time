import React from 'react';

class FiveDayView extends React.Component {
  sortDates = () => {
    const descendingDates = this.props.minDrives.sort((a, b) => new Date(b.date) - new Date(a.date));
    return descendingDates;
  }

  render() {
    return (
      <div className="FiveDayView container">
        <h2>Five Day View</h2>
        <div>
        </div>
      </div>
    );
  }
}

export default FiveDayView;
