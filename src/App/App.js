import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import MyDrives from '../components/MyDrives/MyDrives';
import EditDrive from '../components/EditDrive/EditDrive';
import NewRoute from '../components/NewRoute/NewRoute';
import EditRoute from '../components/EditRoute/EditRoute';

import fbConnection from '../helpers/data/connection';

import './App.scss';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
    <div className="App">
      <BrowserRouter>
        <React.Fragment>
        <MyNavbar authed={authed} />
          <div className="app-container">
              <Switch>
                <PublicRoute path='/auth' component={Auth} authed={authed} />
                <PrivateRoute path='/home' component={Home} authed={authed} />

                <PrivateRoute path='/myDrives' component={MyDrives} authed={authed} />
                <PrivateRoute path='/edit/:id' component={EditDrive} authed={authed} />
                <PrivateRoute path='/editRoute/:id' component={EditRoute} authed={authed} />
                <PrivateRoute path='/newRoute' component={NewRoute} authed={authed} />
                <Redirect from="*" to="/auth" />
              </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
