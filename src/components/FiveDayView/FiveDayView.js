import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import tripsData from '../../helpers/data/tripsData';
import FiveDayCard from '../FiveDayCard/FiveDayCard';

class FiveDayView extends React.Component {
state = {
  tripsArr: [],
}

  sortDates = (allTrips) => {
    const descendingDates = allTrips.sort((a, b) => new Date(b.date) - new Date(a.date));
    while (descendingDates.length > 5) {
      allTrips.pop();
    }
    this.setState({ tripsArr: allTrips });
  }

  getTrips = () => {
    const { uid } = firebase.auth().currentUser;
    tripsData.getMyTrips(uid)
      // .then(allTrips => this.setState({ tripsArr: allTrips }))
      .then(allTrips => this.sortDates(allTrips))
      .catch(err => console.error(err, 'could not get data from FiveDayView'));
  }

  componentDidMount() {
    this.getTrips();
  }

  deleteTrip = (tripId) => {
    tripsData.deleteTrip(tripId)
      .then(() => this.getTrips())
      .catch(err => console.error(err, 'unable to delete from FiveDayView'));
  }

  render() {
    const makeFiveDayCards = this.state.tripsArr.map(trip => (
      <FiveDayCard
      key={trip.id}
      trip={trip}
      deleteTrip={this.deleteTrip}
      />
    ));

    return (
      <div className="FiveDayView container">
        <h2>Five Day View</h2><br/>
        <div className="row">
          { makeFiveDayCards }
        </div>
      </div>
    );
  }
}

export default FiveDayView;
