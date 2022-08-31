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

  const { scoreLoading, scoreData } = useQuery(QUERY_HIGHSCORES);
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

  const title = "<SUFFER/>";

  return (
    <div class="wrapper text-white d-flex flex-column">
      <h1 class='p-5' id='scoreTitle'> {title} </h1>
      <p id="scoreSubTitle">HIGH SCORES</p>
      <table>
        {() => {

        }}
        <ScoreRow position="1" name="Hunter" score="69420"/>
        <ScoreRow position="2" name="Teagrin" score="707070"/>
        <ScoreRow position="3" name="Charles" score="123456"/>
        <ScoreRow position="4" name="Will" score="88844"/>
        <ScoreRow position="5" name="Andy" score="34796"/>
        <ScoreRow position="6" name="Tom" score="3412"/>
        <ScoreRow position="7" name="John" score="3474"/>
        <ScoreRow position="8" name="Michael" score="34701"/>
        <ScoreRow position="9" name="Jack" score="3400"/>
        <ScoreRow position="10" name="Jonny" score="34321"/>
      </table>
    </div>
  );
};

export default Profile;
