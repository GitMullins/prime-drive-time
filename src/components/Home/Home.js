import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import moment from 'moment';
import tripsData from '../../helpers/data/tripsData';
import routesData from '../../helpers/data/routesData';
// import drivesData from '../../helpers/data/drivesData';

import './Home.scss';
import Calculations from '../Calculations/Calculations';
import FiveDayView from '../FiveDayView/FiveDayView';

const defaultDrive = {
  date: '',
  startTime: '',
  endTime: '',
};

class Home extends React.Component {
  state = {
    drives: [],
    newDrive: defaultDrive,
    minDrives: [],
    routes: [],
    trips: [],
  }

  assignMinutes = (drives) => {
    const assign = drives.map((drive) => {
      const start = moment(drive.startTime, 'HH:mm');
      const end = moment(drive.endTime, 'HH:mm');
      const minutes = end.diff(start, 'minutes');
      return { ...drive, minutes };
    });
    this.setState({ minDrives: assign });
  };

  routesToDropdown = () => {
    const { routes } = this.state;
    const values = [<option key={'chooseRoute'} defaultValue value="grapefruit">CHOOSE ROUTE</option>];
    routes.forEach((route) => {
      values.push(<option key={route.origin}>{route.origin}</option>);
    });
    return values;
  }

  getRoutes = () => {
    const { uid } = firebase.auth().currentUser;
    routesData.getMyRoutes(uid)
      .then(routes => this.setState({ routes }))
      // .then(() => this.routesToDropdown())
      .catch(err => console.error(err, 'could not get data from Home'));
  }

  // getDrives = () => {
  //   const { uid } = firebase.auth().currentUser;
  //   drivesData.getMyDrives(uid)
  //     .then((drives) => {
  //       this.assignMinutes(drives);
  //       this.getRoutes(drives);
  //       this.setState({ drives });
  //     })
  //     // .then(() => this.assignMinutes())
  //     // .then(() => this.getRoutes())
  //     .catch(err => console.error(err, 'could not get data from Home'));
  // }

  componentDidMount() {
    // this.getDrives();
    this.getRoutes();
  }

  formFieldStringState = (name, e) => {
    const tempDrive = { ...this.state.newDrive };
    tempDrive[name] = e.target.value;
    this.setState({ newDrive: tempDrive });
  }

  dateChange = e => this.formFieldStringState('date', e);

  startTimeChange = e => this.formFieldStringState('startTime', e);

  endTimeChange = e => this.formFieldStringState('endTime', e);

  onSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newDrive };
    saveMe.uid = firebase.auth().currentUser.uid;
    tripsData.postTrip(saveMe)
      .then(() => this.getDrives());
  }

  render() {
    const { minDrives } = this.state;
    const { drives } = this.state;
    const { routes } = this.state;
    const newRouteLink = '/newRoute';
    const check = () => {
      if (routes.length > 0) {
        return <div>
          <form onSubmit={this.onSubmit}>
            <select>
              {this.routesToDropdown()}
            </select><br/><br/>
            <textarea placeholder="MM/DD/YYYY" onChange={this.dateChange} /><br/>
            <textarea placeholder="Start Time" onChange={this.startTimeChange} />
            <textarea placeholder="End Time" onChange={this.endTimeChange} /><br/>
            <input type="submit" value="Save" />
          </form>
          <Link className="btn btn-success" to={newRouteLink}>Add new route</Link>
          <FiveDayView drives={drives}/>
          <Calculations minDrives={minDrives} />
        </div>;
      }
      return null;
    };
    return (
      <div className="Home col"><br/>
        {/* <form onSubmit={this.onSubmit}>
        <textarea placeholder="MM/DD/YYYY" value={this.state.value} onChange={this.dateChange} /><br/>
        <textarea placeholder="Origin" value={this.state.value} onChange={this.originChange} />
        <textarea placeholder="Destination" value={this.state.value} onChange={this.destinationChange} /><br/>
        <textarea placeholder="Start Time" value={this.state.value} onChange={this.startTimeChange} />
        <textarea placeholder="End Time" value={this.state.value} onChange={this.endTimeChange} /><br/>
        <input type="submit" value="Save" />
      </form>
      <Link className="btn btn-success" to={newRouteLink}>Add new route</Link>
      <FiveDayView drives={drives}/>
      <Calculations minDrives={minDrives} /> */}
      {check()}
      </div>
    );
  }
}

export default Home;
