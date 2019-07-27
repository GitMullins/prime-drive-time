import React from 'react';
import { Link } from 'react-router-dom';
import driveShape from '../../helpers/propz/driveShape';

import './DriveCard.scss';

class DriveCard extends React.Component {
  static propTypes = {
    drive: driveShape.driveCardShape,
  }

  deleteMe = (e) => {
    e.preventDefault();
    const { trip, deleteTrip } = this.props;
    deleteTrip(trip.id, trip.routeId);
  }

  render() {
    const { trip } = this.props;
    const editLink = `/edit/${trip.id}`;
    return (
      <div className="DriveCard col-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{trip.date}</h5>
            <p className="card-text">{trip.startTime} to {trip.endTime}</p>
            <Link className="btn btn-warning" to={editLink}>Edit</Link>
            <button className="btn btn-danger" onClick={this.deleteMe}>x</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DriveCard;
