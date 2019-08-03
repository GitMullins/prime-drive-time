import React from 'react';
import { Link } from 'react-router-dom';
// import driveShape from '../../helpers/propz/driveShape';

import './RouteCard.scss';


class RouteCard extends React.Component {
  // static propTypes = {
  //   drive: driveShape.driveCardShape,
  // }

  deleteMe = (e) => {
    e.preventDefault();
    const { route, deleteRoute } = this.props;
    deleteRoute(route.id);
  }

  render() {
    const { route } = this.props;
    const editLink = `/editRoute/${route.id}`;
    return (
      <div className="RouteCard col-3">
        <div className="route-card card">
          <div className="card-body">
            <p className="card-text">{route.origin} to {route.destination}</p>
            <p className="card-text">{route.description}</p>
            <Link className="edit-btn btn btn-warning" to={editLink}>Edit</Link>
            <button className="delete-btn btn btn-danger" onClick={this.deleteMe}>x</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RouteCard;
