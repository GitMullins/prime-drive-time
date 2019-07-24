import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMyTrips = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/trips.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const trips = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbkey) => {
          res.data[fbkey].id = fbkey;
          trips.push(res.data[fbkey]);
        });
      }
      resolve(trips);
    })
    .catch(err => reject(err));
});

const deleteTrip = tripId => axios.delete(`${baseUrl}/trips/${tripId}.json`);

const getSingleTrip = tripId => axios.get(`${baseUrl}/trips/${tripId}.json`);

const postTrip = newTrip => axios.post(`${baseUrl}/trips.json`, newTrip);

// const putDrive = (updatedDrive, driveId) => axios.put(`${baseUrl}/drives/${driveId}.json`, updatedDrive);

export default {
  getMyTrips,
  deleteTrip,
  getSingleTrip,
  postTrip,
};
