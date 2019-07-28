import React from 'react';
import { Link } from 'react-router-dom';
// import driveShape from '../../helpers/propz/driveShape';
import routesData from '../../helpers/data/routesData';

class FiveDayCard extends React.Component {
  state = {
    newRoute: [],
  }

  deleteMe = (e) => {
    e.preventDefault();
    const { trip, deleteTrip } = this.props;
    deleteTrip(trip.id, trip.routeId);
  }

  getRoute = () => {
    routesData.getSingleRoute(this.props.trip.routeId)
      .then(routePromise => this.setState({ newRoute: routePromise.data }))
      .catch(err => console.error('could not find route in FiveDayView', err));
  }

  componentDidMount() {
    this.getRoute();
  }

  render() {
    const { newRoute } = this.state;
    const { trip } = this.props;
    const editLink = `/edit/${trip.id}`;
    return (
      <div className="DriveCard col-6">
        <div className="drive-card card">
          <div className="card-body">
            <h5 className="card-title">{trip.date}</h5>
            <p><i>{newRoute.origin} to {newRoute.destination}</i></p>
            <p className="card-text">{trip.startTime} to {trip.endTime}</p>
            <Link className="btn btn-warning edit-btn" to={editLink}>Edit</Link>
            <button className="btn btn-danger delete-btn" onClick={this.deleteMe}>x</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FiveDayCard;
