import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import tripsData from '../../helpers/data/tripsData';

const defaultTrip = {
  date: '',
  startTime: '',
  endTime: '',
};

class EditDrive extends React.Component {
  state = {
    newTrip: defaultTrip,
  }

  componentDidMount() {
    const tripId = this.props.match.params.id;
    tripsData.getSingleTrip(tripId)
      .then(tripPromise => this.setState({ newTrip: tripPromise.data }))
      .catch(err => console.error('could not find drive', err));
  }

  formFieldStringState = (name, e) => {
    const tempTrip = { ...this.state.newTrip };
    tempTrip[name] = e.target.value;
    this.setState({ newTrip: tempTrip });
  }

  dateChange = e => this.formFieldStringState('date', e);

  // originChange = e => this.formFieldStringState('origin', e);

  // destinationChange = e => this.formFieldStringState('destination', e);

  startTimeChange = e => this.formFieldStringState('startTime', e);

  endTimeChange = e => this.formFieldStringState('endTime', e);

  onSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newTrip };
    const tripId = this.props.match.params.id;
    saveMe.uid = firebase.auth().currentUser.uid;
    tripsData.putTrip(saveMe, tripId)
      .then(() => this.props.history.push('/myDrives'))
      .catch(err => console.error('unable to save', err));
  }

  render() {
    const { newTrip } = this.state;
    return (
      <div className="EditDrive">
        <h1>Edit Drive</h1>
        <form onSubmit={this.onSubmit}>
        <textarea id="date" placeholder="Date" value={newTrip.date} onChange={this.dateChange} /><br/>
        {/* <textarea id="origin" placeholder="Origin" value={newDrive.origin} onChange={this.originChange} />
        <textarea id="destination" placeholder="Destination" value={newDrive.destination} onChange={this.destinationChange} /><br/> */}
        <textarea id="startTime" placeholder="Start Time" value={newTrip.startTime} onChange={this.startTimeChange} />
        <textarea id="endTime" placeholder="End Time" value={newTrip.endTime} onChange={this.endTimeChange} /><br/>
        <input type="submit" value="Save Edit" />
      </form>
      </div>

    );
  }
}

export default EditDrive;
