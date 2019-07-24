import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMyRoutes = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/routes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const drives = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbkey) => {
          res.data[fbkey].id = fbkey;
          drives.push(res.data[fbkey]);
        });
      }
      resolve(drives);
    })
    .catch(err => reject(err));
});

const deleteRoute = routeId => axios.delete(`${baseUrl}/routes/${routeId}.json`);

const getSingleRoute = routeId => axios.get(`${baseUrl}/routes/${routeId}.json`);

const postRoute = newRoute => axios.post(`${baseUrl}/routes.json`, newRoute);

// const putDrive = (updatedDrive, driveId) => axios.put(`${baseUrl}/drives/${driveId}.json`, updatedDrive);

export default {
  getMyRoutes,
  deleteRoute,
  getSingleRoute,
  postRoute,
};
