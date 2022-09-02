import { Link } from "react-router-dom";

import Auth from "../utils/auth";
import React, { useState } from "react";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [color, setColor] = useState(false)
const changeNavBg = () => {
    if (window.scrollY >= 50) {
        setColor(true)
    } else {
        setColor(false)
    }
}

window.addEventListener('scroll', changeNavBg)

  return (
    <div>
      {/* IF LOGGED IN */}
      {Auth.loggedIn() ? (
        <ul
          className="navContainer active"
          class="nav md p-3"
          id={color ? 'navContainer-bg' : 'navContainer'}
        >
          <li class="nav-item">
            <Link to="/game" class="nav-link" id={color ? 'navText-bg' : 'navText'}>
              Play
            </Link>
          </li>
          <li class="nav-item">
            <Link to="" class="nav-link" onClick={logout} id={color ? 'navText-bg' : 'navText'}>
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
