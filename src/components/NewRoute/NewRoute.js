import React from 'react';
import firebase from 'firebase/app';
import routesData from '../../helpers/data/routesData';

const defaultRoute = {
  origin: '',
  destination: '',
};

class NewRoute extends React.Component {
  state = {
    newRoute: defaultRoute,
  }

  formFieldStringState = (name, e) => {
    const tempRoute = { ...this.state.newRoute };
    tempRoute[name] = e.target.value;
    this.setState({ newRoute: tempRoute });
  }

  originChange = e => this.formFieldStringState('origin', e);

  destinationChange = e => this.formFieldStringState('destination', e);

  onSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newRoute };
    saveMe.uid = firebase.auth().currentUser.uid;
    routesData.postRoute(saveMe);
  }

  render() {
    return (
      <div className="NewRoute col"><br/>
        <form onSubmit={this.onSubmit}>
          <textarea placeholder="Origin" onChange={this.originChange} />
          <textarea placeholder="Destination" onChange={this.destinationChange} /><br/>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default NewRoute;
