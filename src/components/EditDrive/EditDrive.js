import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import tripsData from '../../helpers/data/tripsData';
import routesData from '../../helpers/data/routesData';

const defaultTrip = {
  date: '',
  startTime: '',
  endTime: '',
  routeId: '',
};

class EditDrive extends React.Component {
  state = {
    newTrip: defaultTrip,
    routes: [],
  }

  componentDidMount() {
    const tripId = this.props.match.params.id;
    this.getRoutes();
    tripsData.getSingleTrip(tripId)
      .then(tripPromise => this.setState({ newTrip: tripPromise.data }))
      .catch(err => console.error('could not find drive', err));
  }

  formFieldStringState = (name, e) => {
    const tempTrip = { ...this.state.newTrip };
    tempTrip[name] = e.target.value;
    this.setState({ newTrip: tempTrip });
  }

  getRoutes = () => {
    const { uid } = firebase.auth().currentUser;
    routesData.getMyRoutes(uid)
      .then(routes => this.setState({ routes }))
      .catch(err => console.error(err, 'could not get routes from Home'));
  }

  dateChange = e => this.formFieldStringState('date', e);

  startTimeChange = e => this.formFieldStringState('startTime', e);

  endTimeChange = e => this.formFieldStringState('endTime', e);

  routeChange = e => this.formFieldStringState('routeId', e);

  routesToDropdown = () => {
    const { routes } = this.state;
    const values = [<option key={'chooseRoute'} value={'choose route'} defaultValue>CHOOSE ROUTE</option>];
    routes.forEach((route) => {
      values.push(<option value={route.id} key={route.origin}>{route.origin}</option>);
    });
    return values;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newTrip };
    const tripId = this.props.match.params.id;
    saveMe.uid = firebase.auth().currentUser.uid;
    tripsData.putTrip(saveMe, tripId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to save', err));
  }

  render() {
    const { newTrip } = this.state;
    return (
      <div className="EditDrive">
        <h1>Edit Drive</h1>
        <form onSubmit={this.onSubmit}>
          <select onChange={this.routeChange}>
            {this.routesToDropdown()}
          </select><br/><br/>
          <textarea id="date" placeholder="Date" value={newTrip.date} onChange={this.dateChange} /><br/>
          <textarea id="startTime" placeholder="Start Time" value={newTrip.startTime} onChange={this.startTimeChange} />
          <textarea id="endTime" placeholder="End Time" value={newTrip.endTime} onChange={this.endTimeChange} /><br/>
          <input type="submit" value="Save Edit" />
      </form>
      </div>

    );
  }
}

export default EditDrive;
