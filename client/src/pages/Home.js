import React from 'react';
// import Typical from "react-typical";
import { Navigate } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import { QUERY_PROFILES } from '../utils/queries';
const title = '<SUFFER/>';
const Home = () => {

  function nextScreen() {
    console.log('click');
    // function to switch to the next screen
    return <Navigate to="/profile"/>
  }

  return (
  <div onClick={nextScreen} className="p-auto" id='homeContainer'>
    <div>
      <h1 className="" id='homeTitle'>
        {title}
      </h1>
      <h3 className="homeBody">Click Anywhere to Begin</h3>
    </div>
    {/*This is where the decorative icons would go*/}
  </div>
  );
};

export default Home;
