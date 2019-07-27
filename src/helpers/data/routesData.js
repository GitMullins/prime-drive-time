import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMyRoutes = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/routes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const routes = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbkey) => {
          res.data[fbkey].id = fbkey;
          routes.push(res.data[fbkey]);
        });
      }
      resolve(routes);
    })
    .catch(err => reject(err));
});

const deleteRoute = routeId => axios.delete(`${baseUrl}/routes/${routeId}.json`);

const getSingleRoute = routeId => axios.get(`${baseUrl}/routes/${routeId}.json`);

const postRoute = newRoute => axios.post(`${baseUrl}/routes.json`, newRoute);

const putRoute = (updatedRoute, routeId) => axios.put(`${baseUrl}/routes/${routeId}.json`, updatedRoute);

export default {
  getMyRoutes,
  deleteRoute,
  getSingleRoute,
  postRoute,
  putRoute,
};
