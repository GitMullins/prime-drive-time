import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import routesData from '../../helpers/data/routesData';
import tripsData from '../../helpers/data/tripsData';
import DriveCard from '../DriveCard/DriveCard';

import './MyDrives.scss';


class MyDrives extends React.Component {
  state = {
    routes: [],
    trips: [],
  }

  getRoutes = () => {
    const { uid } = firebase.auth().currentUser;
    routesData.getMyRoutes(uid)
      .then(routes => this.setState({ routes }))
      .catch(err => console.error(err, 'could not get data from MyDrives'));
  }

  getTrips = (routeId) => {
    const newTrips = [];
    const { uid } = firebase.auth().currentUser;
    tripsData.getMyTrips(uid)
      .then(trips => trips.filter((trip) => {
        if (trip.routeId.includes(routeId)) {
          newTrips.push(trip);
        } return null;
      }))
      .then(() => this.setState({ trips: newTrips }))
      .catch(err => console.error(err, 'could not get data from MyDrives'));
  }

  componentDidMount() {
    this.getRoutes();
  }

  routesToDropdown = () => {
    const { routes } = this.state;
    const values = [<option key={'chooseRoute'} defaultValue>CHOOSE ROUTE</option>];
    routes.forEach((route) => {
      values.push(<option value={route.id} key={route.origin}>{route.origin} to {route.destination}</option>);
    });
    return values;
  }

  routeChange = e => this.getTrips(e.target.value);

  deleteTrip = (tripId, routeId) => {
    tripsData.deleteTrip(tripId)
      .then(() => this.getTrips(routeId))
      .catch(err => console.error(err, 'unable to delete from MyDrives'));
  }

  sortDates = () => {
    const descendingDates = this.state.trips.sort((a, b) => new Date(b.date) - new Date(a.date));
    return descendingDates;
  }

  render() {
    const makeDriveCardsNewest = this.sortDates().map(trip => (
      <DriveCard
      key={trip.id}
      trip={trip}
      deleteTrip={this.deleteTrip}
      />
    ));
    return (
      <div className="MyDrives container">
        <div className="my-drives-title"><h1>My Drives</h1></div>
            <select onChange={this.routeChange}>
              {this.routesToDropdown()}
            </select><br/><br/>
        <div className="d-flex row">
        { makeDriveCardsNewest }
        </div>
      </div>
    );
  }
}

export default MyDrives;
