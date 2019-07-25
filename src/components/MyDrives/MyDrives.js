import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import routesData from '../../helpers/data/routesData';
import tripsData from '../../helpers/data/tripsData';
import DriveCard from '../DriveCard/DriveCard';

import './MyDrives.scss';


class MyDrives extends React.Component {
  state = {
    routes: [],
    trips: [],
  }

  getRoutes = () => {
    const { uid } = firebase.auth().currentUser;
    routesData.getMyRoutes(uid)
      .then(routes => this.setState({ routes }))
      .catch(err => console.error(err, 'could not get data from MyDrives'));
    tripsData.getMyTrips(uid)
      .then(trips => this.setState({ trips }))
      .catch(err => console.error(err, 'could not get data from MyDrives'));
  }

  componentDidMount() {
    this.getRoutes();
  }

  // deleteDrive = (driveId) => {
  //   drivesData.deleteDrive(driveId)
  //     .then(() => this.getDrives())
  //     .catch(err => console.error(err, 'unable to delete'));
  // }

  // sortDates = () => {
  //   const descendingDates = this.state.drives.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   return descendingDates;
  // }

  render() {
    // const makeDriveCardsNewest = this.sortDates().map(drive => (
    //   <DriveCard
    //   key={drive.id}
    //   drive={drive}
    //   deleteDrive={this.deleteDrive}
    //   />
    // ));
    console.error('render');
    return (
      <div className="MyDrives container">
        <h1>My Drives</h1>
        <div className="d-flex row">
        {/* { makeDriveCardsNewest } */}
        </div>
      </div>
    );
  }
}

export default MyDrives;
