import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import drivesData from '../../helpers/data/drivesData';
import DriveCard from '../DriveCard/DriveCard';

import './MyDrives.scss';


class MyDrives extends React.Component {
  state = {
    drives: [],
  }

  getDrives = () => {
    const { uid } = firebase.auth().currentUser;
    drivesData.getMyDrives(uid)
      .then(drives => this.setState({ drives }))
      .catch(err => console.error(err, 'could not get data from MyDrives'));
  }

  componentDidMount() {
    this.getDrives();
  }

  deleteDrive = (driveId) => {
    drivesData.deleteDrive(driveId)
      .then(() => this.getDrives())
      .catch(err => console.error(err, 'unable to delete'));
  }

  sortDates = () => {
    const descendingDates = this.state.drives.sort((a, b) => new Date(b.date) - new Date(a.date));
    return descendingDates;
  }

  render() {
    const makeDriveCards = this.sortDates().map(drive => (
      <DriveCard
      key={drive.id}
      drive={drive}
      deleteDrive={this.deleteDrive}
      />
    ));

    return (
      <div className="MyDrives container">
        <h1>My Drives</h1>
        <div className="d-flex row">
        { makeDriveCards }
        </div>
      </div>
    );
  }
}

export default MyDrives;
