import React from 'react';
// import Auth from '../components/Auth/Auth';

import 'bootstrap/dist/css/bootstrap.min.css';

import fbConnection from '../helpers/data/connection';

import './App.scss';

fbConnection();

function App() {
  return (
    <div className="App">
      <button className='btn btn-danger'>HELP ME</button>
    </div>
  );
}

export default App;
