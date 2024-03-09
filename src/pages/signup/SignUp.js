import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import "../signup/signup.css";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import hideicon from "../signup/hide.png";
import viewicon from "../signup/view.png";
const SignUp = () => {
  //importing global state from context
  // eslint-disable-next-line
  const [userData, setUserData] = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  // const [password, setpassword] = useState("");
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  //calling useNavigate function
  const navigate = useNavigate();

  // function that controlls the eye password
  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent form submission
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // setpassword(e.target.value);
  };

  //handle submit  function that handle signing up
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending information to create user on the database
     const response= await axios.post(`${process.env.REACT_APP_base_url}/api/users`, form);
     console.log(response)
      //the new user log in to his account
      const Res = await axios.post(
        `${process.env.REACT_APP_base_url}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      //setting the updator function with the data comes from the login process
      setUserData({
        token: Res.data.token,
        user: Res.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", Res.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        // Extract the error message from the response and set it in the state
        setErrorMessage(error.response.data.msg);
      } else {
        // Fallback error message in case the response doesn't contain a specific error message
        setErrorMessage("An error occurred. Please try again later.");
      }

      console.log(error);

      return error.response.data.msg;
    }
  };

  return (
    <div>
      {/* navigation bar */}
      <Nav />

      {/* the body of signup page */}
      <div className="section1">
        <div className="internalsection">
          <h4 class="join">Join the network</h4>
          <p>
            Already have an account?
            <Link to="/login" className="sign">
              {" "}
              Sign in
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              {/* email field */}
              <input
                type="Email"
                name="email"
                onChange={handleChange}
                placeholder="Your Email"
                className="input"
              />
              {/* <br /> */}
              {/* first name and last name input field */}
              <div className="FLname">
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                  className="name-input Fname"
                />

                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="name-input Lname"
                />
              </div>
              {/* user name input field */}
              <input
                type="text"
                name="userName"
                onChange={handleChange}
                placeholder="User Name"
                className="input"
              />
              {/* password input field */}
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Your Password"
                  className="input passwordInput"
                />
                <button
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img
                      className="hide-icon"
                      src={hideicon}
                      alt="hide-password-icon"
                    />
                  ) : (
                    <img
                      className="view-icon"
                      src={viewicon}
                      alt="view-password-icon"
                    />
                  )}
                </button>
                {/* {password.length < 8 && (
                  <div className="warning-message">
                    Password must be at least 8 characters !!
                  </div>
                )} */}
                <div className="warning-message">{errorMessage}</div>
              </div>
              {/* passwordinput end */}
            </div>

            <button className="agree">Agree and Join</button>

            <p>
              I agree to the
              <a
                href="https://www.evangadi.com/legal/privacy/"
                target="blank"
                className="footlinks"
              >
                privacy policy
              </a>{" "}
              and
              <a
                href="https://www.evangadi.com/legal/terms/"
                className="footlinks"
                target="blank"
              >
                terms of service
              </a>
            </p>
          </form>
          {/* <div>{handleSubmit()}</div> */}

          <Link to={"/login"} className=" haveaccount">
            Already have an account?
          </Link>
        </div>

        <div className="About">
          <div className="aboutInternal">
            <p className="p1">About</p>
            <div className="aboutTitle">Evangadi Network Q&A</div>
            <div className="paragraph">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Massa tincidunt dui ut ornare lectus sit.
              </p>
              <p>
                Varius morbi enim nunc faucibus a. Aliquam ut porttitor leo a
                diam. Mi quis hendrerit dolor magna eget est lorem ipsum.
                Rhoncus dolor purus non enim. Consequat ac felis donec et odio
                pellentesque diam volutpat.
              </p>
              <p>
                Euismod nisi porta lorem mollis aliquam ut. Elementum pulvinar
                etiam non quam lacus suspendisse faucibus interdum. Massa eget
                egestas purus viverra. Aenean euismod elementum nisi quis
                eleifend. Quam quisque id diam vel quam elementum pulvinar etiam
                non.
              </p>
            </div>
            <button className="button">
              <a href="https://www.evangadi.com/explained/" target="blank">
                How it works
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* the footer */}
      <Footer />
    </div>
  );
};

export default SignUp;
