import React from 'react';
import driveShape from '../../helpers/propz/driveShape';

import './DriveCard.scss';

class DriveCard extends React.Component {
  static propTypes = {
    drive: driveShape.driveCardShape,
  }

  render() {
    const { drive } = this.props;
    return (
      <div className="DriveCard col-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{drive.date}</h5>
            <p className="card-text">{drive.origination} to {drive.destination}</p>
            <p className="card-text">{drive.startingTime} to {drive.endingTime}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DriveCard;
