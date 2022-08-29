import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    console.log(formState);
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
    <main className="container mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <ul class="nav-tabs d-flex" id="loginTabs" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="login"
                data-toggle="tab"
                href="#login-tab"
                role="tab"
                aria-controls="login"
                aria-selected="true"
              >
                <h4 className="bg-dark text-light p-2">Login</h4>
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                id="signup"
                data-toggle="tab"
                href="#signup-tab"
                role="tab"
                aria-controls="signup"
                aria-selected="false"
              >
                <h4 className="bg-dark text-light p-2">Sign Up</h4>
              </a>
            </li>
          </ul>

          <div className="card-body">
            {data ? (
              <p>
                You are logged in! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
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
                  className="btn btn-block btn-info p-2"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Login
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
      </div>
    </main>
  );
};

export default Login;
