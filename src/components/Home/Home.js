import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import drivesData from '../../helpers/data/drivesData';
// import DriveCard from '../DriveCard/DriveCard';

import './Home.scss';


class Home extends React.Component {
  state = {
    drives: [],
    date: '',
    origin: '',
    destination: '',
    start: '',
    end: '',
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

  dateChange = (e) => {
    this.setState({ date: e.target.value });
  }

  originationChange = (e) => {
    this.setState({ date: e.target.value });
  }

  destinationChange = (e) => {
    this.setState({ destination: e.target.value });
  }

  startChange = (e) => {
    this.setState({ start: e.target.value });
  }

  endChange = (e) => {
    this.setState({ end: e.target.value });
  }


  onSubmit = (e) => {
    e.preventDefault();
    this.props.addWalk(this.state);
    this.setState({ date: '' });
  }

  render() {
    return (
      <div className="Home col">
        <h1>Home</h1>
        <form onSubmit={this.onSubmit}>
        <textarea placeholder="Date" value={this.state.value} onChange={this.dateChange} /><br/>
        <textarea placeholder="Origin" value={this.state.value} onChange={this.originChange} />
        <textarea placeholder="Destination" value={this.state.value} onChange={this.destinationChange} /><br/>
        <textarea placeholder="Start Time" value={this.state.value} onChange={this.startChange} />
        <textarea placeholder="End Time" value={this.state.value} onChange={this.endChange} /><br/>
        <input type="submit" value="Save" />
      </form>
      </div>
    );
  }
}

export default Home;
