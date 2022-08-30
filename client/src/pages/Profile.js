import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { userId } = useParams();

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.user || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.username) {
    return (
      <h4 class="text-white">
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  const title = "<SUFFER/>";

  return (
    <div class="wrapper text-white d-flex flex-column">
      <h1 class='p-5' id='scoreTitle'> {title} </h1>
      <p id="scoreSubTitle">HIGH SCORES</p>
      <table>
        
        <tr>
          <td>1</td>
          <td>Hunter</td>

          <td>69420</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Teagrin</td>

          <td>707070</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Charles</td>

          <td>123456</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Will</td>

          <td>88844</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Andy</td>

          <td>34796</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Tom</td>

          <td>3412</td>
        </tr>
        <tr>
          <td>7</td>
          <td>John</td>

          <td>3474</td>
        </tr>
        <tr>
          <td>8</td>

          <td>Michael</td>

          <td>34701</td>
        </tr>
        <tr>
          <td>9</td>

          <td>Jack</td>

          <td>3400</td>
        </tr>
        <tr>
          <td>10</td>

          <td>Jonny</td>

          <td>34321</td>
        </tr>
      </table>
    </div>
  );
};

export default Profile;
