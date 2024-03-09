import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Nav from "../../components/Nav/Nav2";
import Footer from "../../components/Footer/Footer";
import "../Question/Question.css";

const Question = ({ logout }) => {
  // declare state variable
  // eslint-disable-next-line
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const [quesionTitle, setTitle] = useState("");

  // calling useNavigate
  const navigate = useNavigate();

  // function that navigates to ask question page
  const questionPage = () => {
    navigate("/askQuestion");
  };

  //handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTitle(e.target.value);
  };

  //use effect that navigate to login page if the userdata is undefined else do the fetching function
  useEffect(() => {
    if (!userData.user) {
      console.log(userData.user)
      navigate("/login");
    }
  }, [userData, navigate]);

  // function that inserts question to database
  const asking = async () => {
    try {
      //sending the data
      // eslint-disable-next-line
      const Res = await axios.post(
        `${process.env.REACT_APP_base_url}/api/question/`,
        {
          user_id: userData.user.id,
          question: form.question,
          description: form.description,
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* navigation */}
      <Nav logout={logout} />

      {/* the body of askquestion page */}
      <section className="wrapper">
        <div className="first-wrapper">
          <h1 className="title">Steps to write a good Question</h1>
          <div className="intenal-steps-wrapper">
            <div className=" steps">
              <p>● Summarize your problem in a one-line title.</p>
              <p>● Describe your problem in more detail.</p>
              <p>● Describe what you tried and what you expected to happen.</p>
              <p>● Review your question and post it to the site</p>
            </div>
          </div>
        </div>
        <div className="askquestion">
          <div className="ask-question-wrapper">
            <h4 className="ask">Ask a public question</h4>
            <p className="go" onClick={questionPage}>
              Go to question page
            </p>
            {/*input that accepts the title of the question */}
            <input
              type="text"
              name="question"
              onChange={handleChange}
              className="input1"
              placeholder="Title"
            ></input>
            {/* checking if the length of the words in the title is greater than 200 */}
            {quesionTitle.length > 200 && (
              <div className="warning-message">
                Question title must be less than 200 words !!
              </div>
            )}
            {/* text area field to accept question description  */}
            <textarea
              type="text"
              name="description"
              className="area"
              placeholder="Question Description..."
              onChange={handleChange}
            ></textarea>
            <br />
            {/* button to submit the question */}
            <div className="button-wrapper">
              <button onClick={asking} className="post">
                Post Your question
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Question;
