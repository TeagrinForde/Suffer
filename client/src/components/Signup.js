import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { username, value } = event.target;

    setFormState({
      ...formState,
      [username]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card enterCard p-3">
      <h4 className="card-header enterTitle text-light p-2">Sign Up</h4>
      <div className="card-body">
        {data ? (
          <p>
          You are logged in! Time to <Link to="/">SUFFER.</Link>
        </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className="form-input p-2"
              placeholder="Your username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
            <input
              className="form-input p-2"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="btn btn-block btn-info p-2 enterbtn"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Submit
            </button>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
