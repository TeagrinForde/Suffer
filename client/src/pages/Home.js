import React from 'react';
// import Typical from "react-typical";
// import { useQuery } from '@apollo/client';

// import { QUERY_PROFILES } from '../utils/queries';
const title = '<SUFFER/>';
const Home = () => {


  return (
  <div onClick={document.location.pathname = "/login"} className="p-auto" id='homeContainer'>
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
