import React, { useState } from "react";
import "./nav.css";
import myimage from "./evangadi-logo-home (1).png";
import { Link } from "react-router-dom";
import image from "./drop-down-menu.png";

function Nav2({ logout }) {
  const [isMenuActive, setMenuActive] = useState(false);
  // a function that sets isMenuActive
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
            <button className="button1" onClick={logout}>
              LogOut
            </button>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Nav2;
