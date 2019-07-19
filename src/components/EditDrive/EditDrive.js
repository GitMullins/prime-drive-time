import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import drivesData from '../../helpers/data/drivesData';

const defaultDrive = {
  date: '',
  origin: '',
  destination: '',
  startTime: '',
  endTime: '',
};

class EditDrive extends React.Component {
  state = {
    newDrive: defaultDrive,
  }

  componentDidMount() {
    const driveId = this.props.match.params.id;
    drivesData.getSingleDrive(driveId)
      .then(drivePromise => this.setState({ newDrive: drivePromise.data }))
      .catch(err => console.error('could not find drive', err));
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
    const driveId = this.props.match.params.id;
    saveMe.uid = firebase.auth().currentUser.uid;
    drivesData.putDrive(saveMe, driveId)
      .then(() => this.props.history.push('/myDrives'))
      .catch(err => console.error('unable to save', err));
  }

  render() {
    const { newDrive } = this.state;
    return (
      <div className="EditDrive">
        <h1>Edit Drive</h1>
        <form onSubmit={this.onSubmit}>
        <textarea id="date" placeholder="Date" value={newDrive.date} onChange={this.dateChange} /><br/>
        <textarea id="origin" placeholder="Origin" value={newDrive.origin} onChange={this.originChange} />
        <textarea id="destination" placeholder="Destination" value={newDrive.destination} onChange={this.destinationChange} /><br/>
        <textarea id="startTime" placeholder="Start Time" value={newDrive.startTime} onChange={this.startTimeChange} />
        <textarea id="endTime" placeholder="End Time" value={newDrive.endTime} onChange={this.endTimeChange} /><br/>
        <input type="submit" value="Save Edit" />
      </form>
      </div>

    );
  }
}

export default EditDrive;
