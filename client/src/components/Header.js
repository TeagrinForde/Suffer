import { Link } from "react-router-dom";

import Auth from "../utils/auth";
import React from "react";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      {/* IF LOGGED IN */}
      {Auth.loggedIn() ? (
        <ul
          className="navContainer active"
          class="nav md p-1"
          id="navContainer"
        >
          <li class="nav-item">
            <Link to="/game" class="nav-link" id="navText">
              Play
            </Link>
          </li>
          <li class="nav-item">
            <Link to="" class="nav-link" onClick={logout} id="navText">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        // ELSE SHOW THIS
        <ul
          className="navContainer active"
          class="nav md p-1"
          id="navContainer"
        >
          <li class="nav-item">
            <Link to="/login" class="nav-link" id="navText">
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
