import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import drivesData from '../../helpers/data/drivesData';
// import DriveCard from '../DriveCard/DriveCard';

import './Home.scss';


class Home extends React.Component {
  state = {
    drives: [],
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

  render() {
    // const makeDriveCards = this.state.drives.map(drive => (
    //   <DriveCard
    //   key={drive.id}
    //   drive={drive}
    //   />
    // ));

    return (
      <div className="Home col">
        <h1>Home</h1>
        {/* <div className="d-col">
        { makeDriveCards }
        </div> */}
      </div>
    );
  }
}

export default Home;