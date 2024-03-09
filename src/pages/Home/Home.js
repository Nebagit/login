import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-use-history";
import "@fortawesome/fontawesome-free/css/all.min.css";
import jwt_decode from "jwt-decode";
import "../../components/Nav/nav.css";
import Nav from "../../components/Nav/Nav2";
import "../Home/home.css";
import usericon from "../Home/user (1).png";

const Home = ({ logout }) => {
  // eslint-disable-next-line
  const [userData, setUserData] = useContext(UserContext);

  const [questionItems, setquestionItems] = useState([]);

  //calling useNavigate function
  const navigate = useNavigate();

  //calling useHistory
  const history = useHistory();

  // Fetch the questions from the server
  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await axios.get(
        `${process.env.REACT_APP_base_url}/api/question/all`
      );
      // eslint-disable-next-line
      const response = console.log(fetchedQuestions.json);
      const questions = fetchedQuestions.data.data;
      console.log(questions);

      //setting the updator function with the data comes from the database
      setquestionItems(questions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //function that navigates to Question page
  const gotoQuestion = () => {
    navigate("/askQuestion");
  };

  //use effect that navigate to login page if the userdata is undefined else do the fetching function
  useEffect(() => {
    if (!userData.user) {
      console.log(userData.user);
      navigate("/login");
    } else fetchQuestions();
  }, [userData, navigate]);

  // function declaration that checks if token is expired
  const isTokenExpired = (token) => {
    if (!token) {
      return true; // No token means it's expired or not available
    }
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime; // Convert to seconds as an integer
  };

  //use effect to check token expiration
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (isTokenExpired(token)) {
      // Redirect to the login page if token is expired
      history.push("/login");
    }
  }, [history]);

  // the return PrepareStatement
  return (
    <div className="Home-wrapper">
      {/* navigation */}
      <Nav logout={logout} />

      {/* the body of home page */}
      <div className="welcomesection">
        <div className="ask-Button">
          <button onClick={gotoQuestion} className="Askquestion">
            Ask question
          </button>
        </div>
        {/* welcome user section */}
        <div className="username-wrapper welcomeuser">
          Welcome: {userData.user?.display_name}
        </div>
      </div>
      <div className="Questions-Wrapper">
        {/* display question  */}
        <div className="question">Questions</div>
        {/* placing all the fetched questions in to a div using map function */}
        {questionItems.map((question, index) => (
          <div className="users-question" key={question.post_id}>
            <Link
              to={`/answer/${question.post_id}`}
              className="text-decoration-none  text-reset"
            >
              <div className="the-question">
                <img className="user-icon" src={usericon} alt="user-icon" />
                <div className="question-title-wrapper" key={question.post_id}>
                  <p className="decorationNone">{question.question}</p>
                </div>
                <p className="arrow-icon"></p>
              </div>
              <div className="usersname" key={index}>
                {question.user_name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
