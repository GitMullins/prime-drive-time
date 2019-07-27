import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import routesData from '../../helpers/data/routesData';

const defaultRoute = {
  origin: '',
  destination: '',
};

class EditRoute extends React.Component {
  state = {
    newRoute: defaultRoute,
  }

  componentDidMount() {
    const routeId = this.props.match.params.id;
    routesData.getSingleRoute(routeId)
      .then(routePromise => this.setState({ newRoute: routePromise.data }))
      .catch(err => console.error('could not find route', err));
  }

  formFieldStringState = (name, e) => {
    const tempTrip = { ...this.state.newRoute };
    tempTrip[name] = e.target.value;
    this.setState({ newRoute: tempTrip });
  }


  originChange = e => this.formFieldStringState('origin', e);

  destinationChange = e => this.formFieldStringState('destination', e);

  onSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newRoute };
    const routeId = this.props.match.params.id;
    saveMe.uid = firebase.auth().currentUser.uid;
    routesData.putRoute(saveMe, routeId)
      .then(() => this.props.history.push('/Home'))
      .catch(err => console.error('unable to save', err));
  }

  render() {
    const { newRoute } = this.state;
    return (
      <div className="EditRoute">
        <h1>Edit Route</h1>
        <form onSubmit={this.onSubmit}>
        <textarea id="origin" placeholder="Origin" value={newRoute.origin} onChange={this.originChange} />
        <textarea id="destination" placeholder="Destination" value={newRoute.destination} onChange={this.destinationChange} /><br/>
        <input type="submit" value="Save Edit" />
      </form>
      </div>

    );
  }
}

export default EditRoute;
