import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_USER, QUERY_ME, QUERY_HIGHSCORES } from "../utils/queries";
import ScoreRow from "../components/ScoreRow";

import Auth from "../utils/auth";

const Profile = () => {
  const { userId } = useParams();

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  const { loading: scoreLoading, data: scoreData } = useQuery(QUERY_HIGHSCORES);
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

  // loop to display the scores on the page
  const showScores = () => {
    let scoreList = [];
    for (let i = 0; i < highscores.length; i++) {
      scoreList.push(<ScoreRow position={i+1} name={highscores[i].user} score={highscores[i].score}/>);
    }
    return scoreList;
  }

  return (
    <div class="wrapper text-white d-flex flex-column">
      <h1 class='p-5' id='scoreTitle'> {title} </h1>
      <p id="scoreSubTitle">HIGH SCORES</p>
      <table>
        {console.log(highscores)}
        {showScores()}
      </table>
    </div>
  );
};

export default Profile;
