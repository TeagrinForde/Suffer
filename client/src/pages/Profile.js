import React from "react";
import "../App.css";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_USER, QUERY_ME, QUERY_HIGHSCORES } from "../utils/queries";
import ScoreRow from "../components/ScoreRow";
import Directions from "../components/Directions";

import Auth from "../utils/auth";

const Profile = () => {
  const { userId } = useParams();

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  const { data: scoreData } = useQuery(QUERY_HIGHSCORES);
  const highscores = scoreData?.highscores || [];

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.user || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.username) {
    return (
      <Navigate to="/login" />
    );
  }
  
  // the formatting of the title requires a variable to be inserted into the 
  // HTML for the sake of rendering itself
  const title = "<SUFFER/>";

  //username variable from profile
  const username = profile.username;

  // loop to display the scores on the page
  const showGlobalScores = () => {
    const sortedList = sortScores(highscores);
    let scoreList = [];
    for (let i = 0; i < sortedList.length; i++) {
      scoreList.push(<ScoreRow key={i} position={i+1} name={sortedList[i].user} score={sortedList[i].score}/>);
    }
    return scoreList;
  }

  function sortScores(scoreList) {
    const shortList = scoreList.slice();
    shortList.sort(by)
    console.log(shortList);
    return shortList.slice(0, 10);
  }

  function by(a, b) {
    if (a.score > b.score) return -1;
    else if (a.score < b.score) return 1;
    else return 0;
  }
  
  const showLocalScores = () => {
    let scoreList = [];
    return scoreList;
  }

  return (
    <div class="wrapper text-white d-flex flex-column p-2">
      <p class='d-flex pt-1 pl-1' id='welcome'>Welcome {username}</p>
      < Directions />
      <h1 class='p-4' id='scoreTitle'> {title} </h1>
      <div class="row">
        <div class='col'>
          <p className="scoreSubTitle" class="center">GLOBAL<br/>HIGH SCORES</p>
          <table id='global' class='col-sm-8 col-lg-6 m-auto'>
            <tbody>
            {showGlobalScores()}
            </tbody>
          </table>
        </div>
        <div class='col'>
          <p className="scoreSubTitle">LOCAL<br/>HIGH SCORES</p>
          <table id='local' class='col-sm-8 col-lg-6 m-auto'>
            <tbody>
            {showLocalScores()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
