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

export default {
  getMyDrives,
  deleteDrive,
};
