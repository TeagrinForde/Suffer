import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="card enterCard p-5 col-lg-8 col-md-8 col-sm-6">
      <h4 className="card-header enterTitle text-light p-2">Login</h4>
      <div className="card-body m-2">
        {Auth.loggedIn() ? (
          <Navigate to="/profile" />
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className="form-input p-3 col-lg-12 col-md-12 col-sm-9"
              placeholder="Your username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
            <input
              className="form-input p-3 col-lg-12 col-md-12 col-sm-9"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="btn btn-block btn-info p-3 enterbtn"
              style={{ cursor: "pointer" }}
              type="submit"
            >

              Let's SUFFER!

            </button>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{'Incorrect username or password'}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
