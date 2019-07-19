import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import drivesData from '../../helpers/data/drivesData';

import './Home.scss';
import Calculations from '../Calculations/Calculations';

const defaultDrive = {
  date: '',
  origin: '',
  destination: '',
  startTime: '',
  endTime: '',
};

class Home extends React.Component {
  state = {
    drives: [],
    newDrive: defaultDrive,
  }

  getDrives = () => {
    const { uid } = firebase.auth().currentUser;
    drivesData.getMyDrives(uid)
      .then(drives => this.setState({ drives }))
      .catch(err => console.error(err, 'could not get data from Home'));
  }

  componentDidMount() {
    this.getDrives();
  }

  formFieldStringState = (name, e) => {
    const tempDrive = { ...this.state.newDrive };
    tempDrive[name] = e.target.value;
    this.setState({ newDrive: tempDrive });
  }

  dateChange = e => this.formFieldStringState('date', e);

  originChange = e => this.formFieldStringState('origin', e);

  destinationChange = e => this.formFieldStringState('destination', e);

  startTimeChange = e => this.formFieldStringState('startTime', e);

  endTimeChange = e => this.formFieldStringState('endTime', e);

  onSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newDrive };
    saveMe.uid = firebase.auth().currentUser.uid;
    drivesData.postDrive(saveMe);
    this.getDrives();
  }

  render() {
    const { drives } = this.state;
    return (
      <div className="Home col">
        <h1>Home</h1>
        <form onSubmit={this.onSubmit}>
        <textarea placeholder="Date" value={this.state.value} onChange={this.dateChange} /><br/>
        <textarea placeholder="Origin" value={this.state.value} onChange={this.originChange} />
        <textarea placeholder="Destination" value={this.state.value} onChange={this.destinationChange} /><br/>
        <textarea placeholder="Start Time" value={this.state.value} onChange={this.startTimeChange} />
        <textarea placeholder="End Time" value={this.state.value} onChange={this.endTimeChange} /><br/>
        <input type="submit" value="Save" />
      </form>
      <Calculations drives={drives} />
      </div>
    );
  }
}

export default Home;
