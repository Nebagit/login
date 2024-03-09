import React, { useState } from "react";
import "./nav.css";
import myimage from "./evangadi-logo-home (1).png";
import { Link } from "react-router-dom";
import image from "./drop-down-menu.png";

function Nav() {
  const [isMenuActive, setMenuActive] = useState(false);
  //function that sets menu active
  const toggleMenu = () => {
    setMenuActive((prevMenuState) => !prevMenuState);
    console.log(isMenuActive);
  };

  return (
    <div>
      <nav class="outerwrapper nav">
        <div>
          <img class="logo" src={myimage} alt="logo" />
        </div>
        <img
          src={image}
          alt="menu"
          className="menu-toggle"
          onClick={toggleMenu}
        />

        <div className={`navlinks  ${isMenuActive ? "active" : ""}`}>
          <Link to="/" className="hover home">
            Home
          </Link>

          <a
            class="howitworks hover"
            href="https://www.evangadi.com/explained/"
            target="blank"
          >
            How it works
          </a>
          <button class="button1">
            <Link to="/login" className="signbut">
              SIGN IN
            </Link>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
