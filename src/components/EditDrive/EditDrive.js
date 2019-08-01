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

// const defaultRoute = {
//   description: '',
// };

class EditDrive extends React.Component {
  state = {
    newTrip: defaultTrip,
    // newRoute: defaultRoute,
    routes: [],
    route: [],
  }

  componentDidMount() {
    const tripId = this.props.match.params.id;
    // this.populateDescription();
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

  formFieldStringState2 = (name, e) => {
    const tempRoute = { ...this.state.newRoute };
    tempRoute[name] = e.target.value;
    this.setState({ newRoute: tempRoute });
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

  // descriptionChange = e => this.formFieldStringState2('description', e);

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
    // const { routeId } = this.state.newTrip;
    // console.error('route', routeId);
    // const saveRoute = { ...this.state.newRoute };
    const saveMe = { ...this.state.newTrip };
    const tripId = this.props.match.params.id;
    saveMe.uid = firebase.auth().currentUser.uid;
    tripsData.putTrip(saveMe, tripId)
      .then(() => this.props.history.push('/home'))
      // .then(() => routesData.putRoute(saveRoute, routeId))
      .catch(err => console.error('unable to save', err));
  }

  // populateDescription = () => {
  //   const tripId = this.props.match.params.id;
  //   tripsData.getSingleTrip(tripId)
  //   // .then(trip => console.error(trip.data.routeId))
  //     .then(trip => routesData.getSingleRoute(trip.data.routeId))
  //     .then((route) => {
  //       this.setState({ route: route.data });
  //       // console.error('description', route.data.description);
  //       // const description = <textarea id="description" placeholder="Description" value={route.data.description} onChange={this.descriptionChange} />;
  //       // console.error(description);
  //     });
  //   // console.error(routes.filter(tripId.routeId));
  //   // console.error('123456');
  //   // return <textarea id="description" placeholder="Description" value={route.description} onChange={this.descriptionChange} />;
  // };

  render() {
    const { newTrip } = this.state;
    // const { newRoute } = this.state;
    return (
      <div className="EditDrive">
        <h1>Edit Drive</h1>
        <form onSubmit={this.onSubmit}>
          <select onChange={this.routeChange}>
            {this.routesToDropdown()}
          </select><br/><br/>
          {/* <textarea id="description" placeholder="Description" value={newRoute.description} onChange={this.descriptionChange} /><br/> */}
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
