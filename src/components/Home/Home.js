import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import moment from 'moment';
import tripsData from '../../helpers/data/tripsData';
import routesData from '../../helpers/data/routesData';

import './Home.scss';
import Calculations from '../Calculations/Calculations';
import FiveDayView from '../FiveDayView/FiveDayView';

const defaultTrip = {
  date: '',
  startTime: '',
  endTime: '',
  routeId: '',
};

class Home extends React.Component {
  state = {
    newTrip: defaultTrip,
    minTrips: [],
    routes: [],
    trips: [],
    fiveDayTrips: [],
  }

  assignMinutes = () => {
    const assign = this.state.trips.map((trip) => {
      const start = moment(trip.startTime, 'HH:mm');
      const end = moment(trip.endTime, 'HH:mm');
      const minutes = end.diff(start, 'minutes');
      trip.minutes = minutes;
      return trip;
    });
    this.setState({ minTrips: assign });
  };

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
      .then(() => this.assignMinutes())
      .catch(err => console.error(err, 'could not get trips from Home'));
  }

  getAllTrips = () => {
    const { uid } = firebase.auth().currentUser;
    tripsData.getMyTrips(uid)
      .then(allTrips => this.setState({ fiveDayTrips: allTrips }))
      .catch(err => console.error(err, 'could not get data from FiveDayView'));
  }

  getRoutes = () => {
    const { uid } = firebase.auth().currentUser;
    routesData.getMyRoutes(uid)
      .then(routes => this.setState({ routes }))
      .catch(err => console.error(err, 'could not get routes from Home'));
  }

  componentWillMount() {
    this.getRoutes();
    this.getAllTrips();
  }

  formFieldStringState = (name, e) => {
    const tempTrip = { ...this.state.newTrip };
    tempTrip[name] = e.target.value;
    this.setState({ newTrip: tempTrip });
  }

  dateChange = e => this.formFieldStringState('date', e);

  startTimeChange = e => this.formFieldStringState('startTime', e);

  endTimeChange = e => this.formFieldStringState('endTime', e);

  routeChange = e => this.formFieldStringState('routeId', e);

  routesToDropdown = () => {
    const { routes } = this.state;
    const values = [<option key={'chooseRoute'} value={'choose route'} defaultValue>CHOOSE ROUTE</option>];
    routes.forEach((route) => {
      values.push(<option value={route.id} key={route.origin}>{route.origin} to {route.destination}</option>);
    });
    return values;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newTrip };
    saveMe.uid = firebase.auth().currentUser.uid;
    tripsData.postTrip(saveMe)
      .then(() => this.getAllTrips());
  }

  render() {
    const { routes } = this.state;
    const { trips } = this.state;
    const { minTrips } = this.state;
    const { newTrip } = this.state;
    const { fiveDayTrips } = this.state;
    return (
      <div className="home-container">
      <div className="home-form-container">
      <div className="home-form">
        <form onSubmit={this.onSubmit}>
          <select onChange={this.routeChange}>
            {this.routesToDropdown()}
          </select>
          <br/><br/>
          <textarea placeholder="MM/DD/YYYY" onChange={this.dateChange} /><br/>
          <textarea placeholder="Start Time" onChange={this.startTimeChange} />
          <textarea placeholder="End Time" onChange={this.endTimeChange} /><br/>
          <input type="submit" value="Save" />
        </form>
        </div>
        <div className="home-newRoute">
          <Link className="btn btn-info" to={{ pathname: '/newRoute', state: { routes } }}>Add a new route</Link>
        </div>
        </div>
        <div className="views-container">
        <div className="home-fiveDayView">
        <FiveDayView
        fiveDayTrips={fiveDayTrips}
        />
        </div>
        <div className="home-calculations">
        <Calculations
          trips={trips}
          getTrips={this.getTrips}
          routes={routes}
          minTrips={minTrips}
          newTrip={newTrip}
          routesToDropdown={this.routesToDropdown}
        />
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
