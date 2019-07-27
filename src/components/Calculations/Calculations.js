import React from 'react';
// import firebase from 'firebase/app';
import 'firebase/auth';
// import moment from 'moment';
// import tripsData from '../../helpers/data/tripsData';
import Last5Days from '../Last5Days/Last5Days';
import Last20Days from '../Last20Days/Last20Days';
import AllDays from '../AllDays/AllDays';

import './Calculations.scss';

class Calculations extends React.Component {
  // state = {
  //   minTrips: [],
  //   trips: [],
  // }

  sortDates = (arr) => {
    const descendingDates = arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    return descendingDates;
  }

  // assignMinutes = () => {
  //   const assign = this.props.trips.map((trip) => {
  //     const start = moment(trip.startTime, 'HH:mm');
  //     const end = moment(trip.endTime, 'HH:mm');
  //     const minutes = end.diff(start, 'minutes');
  //     return { ...trip, minutes };
  //   });
  //   this.setState({ minTrips: assign });
  // };

  // getTrips = (routeId) => {
  //   const newTrips = [];
  //   const { uid } = firebase.auth().currentUser;
  //   tripsData.getMyTrips(uid)
  //     .then(trips => trips.filter((trip) => {
  //       if (trip.routeId.includes(routeId)) {
  //         newTrips.push(trip);
  //       } return null;
  //     }))
  //     .then(() => this.setState({ trips: newTrips }))
  //     .then(() => this.assignMinutes())
  //     .catch(err => console.error(err, 'could not get data from Calculations'));
  // }

  routeChange = e => this.props.getTrips(e.target.value);

  routesToDropdown = () => {
    const { routes } = this.props;
    const values = [<option key={'chooseRoute'} value={'choose route'} defaultValue>CHOOSE ROUTE</option>];
    routes.forEach((route) => {
      values.push(<option value={route.id} key={route.origin}>{route.origin}</option>);
    });
    return values;
  }

  render() {
    return (
      <div className="Calculations container">
        <h1>Calculations</h1>
          <select onChange={this.routeChange}>
            {this.routesToDropdown()}
          </select><br/><br/>
          <Last5Days
          minTrips={this.props.minTrips}
          sortDates={this.sortDates}
          /><br/>
          <Last20Days
          minTrips={this.props.minTrips}
          sortDates={this.sortDates}
          /><br/>
          <AllDays
          minTrips={this.props.minTrips}
          sortDates={this.sortDates}
          />
      </div>
    );
  }
}

export default Calculations;
