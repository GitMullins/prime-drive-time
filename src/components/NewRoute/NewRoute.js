import React from 'react';
import firebase from 'firebase/app';
import routesData from '../../helpers/data/routesData';
import RouteCard from '../RouteCard/RouteCard';

const defaultRoute = {
  origin: '',
  destination: '',
};

class NewRoute extends React.Component {
  state = {
    newRoute: defaultRoute,
    routes: this.props.location.state.routes,
  }

  routesToDropdown = () => {
    const { routes } = this.props.location.state;
    const values = [<option key={'chooseRoute'} value={'choose route'} defaultValue>CHOOSE ROUTE</option>];
    routes.forEach((route) => {
      values.push(<option value={route.id} key={route.origin}>{route.origin}</option>);
    });
    return values;
  }

  formFieldStringState = (name, e) => {
    const tempRoute = { ...this.state.newRoute };
    tempRoute[name] = e.target.value;
    this.setState({ newRoute: tempRoute });
  }

  originChange = e => this.formFieldStringState('origin', e);

  destinationChange = e => this.formFieldStringState('destination', e);

  getRoutes = () => {
    const { uid } = firebase.auth().currentUser;
    routesData.getMyRoutes(uid)
      .then(routes => this.setState({ routes }))
      // .then(() => this.getTrips()) // REMOVE - SET AS DEFAULT
      .catch(err => console.error(err, 'could not get routes data from NewRoute'));
  }

  deleteRoute = (routeId) => {
    routesData.deleteRoute(routeId)
      .then(() => this.getRoutes())
      .catch(err => console.error(err, 'unable to delete route'));
  }

  onSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newRoute };
    saveMe.uid = firebase.auth().currentUser.uid;
    routesData.postRoute(saveMe);
  }

  render() {
    const { routes } = this.state;
    const makeRouteCards = routes.map(route => (
      <RouteCard
      key={route.id}
      route={route}
      deleteRoute={this.deleteRoute}
      />
    ));
    return (
      <div className="NewRoute col"><br/>
        <form onSubmit={this.onSubmit}>
          <textarea placeholder="Origin" onChange={this.originChange} />
          <textarea placeholder="Destination" onChange={this.destinationChange} /><br/>
          <input type="submit" value="Save" />
        </form>
        {makeRouteCards}
      </div>
    );
  }
}

export default NewRoute;
