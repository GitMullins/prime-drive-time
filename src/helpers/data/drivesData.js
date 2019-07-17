import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMyDrives = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/drives.json?orderBy="uid"&equalTo="${uid}"`)
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

const deleteDrive = driveId => axios.delete(`${baseUrl}/drives/${driveId}.json`);

const getSingleDrive = driveId => axios.get(`${baseUrl}/drives/${driveId}.json`);

const postDrive = newDrive => axios.post(`${baseUrl}/drives.json`, newDrive);

const putDrive = (updatedDrive, driveId) => axios.put(`${baseUrl}/drives/${driveId}.json`, updatedDrive);

export default {
  getMyDrives,
  deleteDrive,
  postDrive,
  putDrive,
  getSingleDrive,
};
