import React, { useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import "../Answer/answer.css";
import Nav from "../../components/Nav/Nav2";
import "../../components/Nav/nav.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import usericon from "../Answer/user (1).png";


function Answer({ logout }) {
  // declaring state variables
  const [form, setForm] = useState({});
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [userData,] = useContext(UserContext);

  //calling useNavigate function
  const navigate = useNavigate();

  //calling useParams function
  const params = useParams();

  //handle change function
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //fetch question data using post_id
  const questionByPostId = useCallback(async () => {
    try {
      const question = await axios.get(
        `${process.env.REACT_APP_base_url}/api/question/${params.post_id}`
      );
      // console.log(question)
      // console.log(question.data.data);
      setQuestion(question.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  }, [params.post_id]);

  //fetch answer using question_id
  const answersByQuestionId = useCallback(async () => {
    try {
      const answersRes = await axios.get(
        `${process.env.REACT_APP_base_url}/api/answer/${question?.question_id}`
      );
      setAnswers(answersRes.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  }, [question?.question_id]);

  //Check if the userData is defined and do the functions

  useEffect(() => {
    if (!userData.user) {
      console.log(userData.user)
      navigate("/login");}
    else{
    questionByPostId();
    answersByQuestionId();
    }
  }, [
    question?.question_id,
    userData,
    navigate,
    questionByPostId,
    answersByQuestionId,
  ]);


  //function to post answer
  const postAnswer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_base_url}/api/answer/`, {
        answer: form.answer,
        user_id: userData.user.id,
        question_id: question.question_id,
      });
      answersByQuestionId();
      // window.location.reload(false);
    } catch (err) {
      console.log("problem", err);
    }
  };

  // function that navigates to ask question page
  const gotoQuestion = () => {
    navigate("/askQuestion");
  };

  return (
    <div>
      <div className="Q&A-outer-wrapper">
        {/* navigation   */}
        <Nav logout={logout} />
        {/* body of answer page */}
        <div class="questionpart">
          {/* question details   */}
          <h3 className="h3">Question</h3>
          <h5 className="que-title">{question?.question}</h5>
          <p className="description">{question?.question_description}</p>
          {/* Given Answers from the users   */}
          <div class="AnsFromCommunity">
            {answers.length > 0 && (
              <h3 className="h3 communityans">Answer From The Community</h3>
            )}
          </div>
          {/* mapping the answer array and display on the page */}
          {/* <AnswerComponent content={answers.answer} username={answers.user_name} key={answers.answer_id} /> */}
          {answers.map((answer) => (
            <div key={answer.answer_id}>
              <div className="user-ans">
                <div className="user-icon-wrapper">
                  <img
                    className="my-users-icon"
                    src={usericon}
                    alt="user-icon"
                  />
                  <p className="the-username">{answer.user_name}</p>
                </div>

                {/* <div className="answer">
                {showFullAnswer ? answer.answer : answer.answer.slice(0, 380)}
                {answer.answer.length > 400  && (

                    <span className="show-more-btn" onClick={toggleShowAnswer}>
                      {showFullAnswer ? 'Read Less' : '... Read More'}
                  </span>
                 )}
                </div>  */}
                <div className="answer">{answer.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* giving answer to the question    */}
        <div class="answerpart ">
          <h3 className="answertop h3">Answer The Top Question</h3>
          <p class="goto" onClick={gotoQuestion}>
            Go to Question page
          </p>

          {/* text area that accepts answer   */}
          <textarea
            type="text"
            onChange={handleChange}
            name="answer"
            class="textarea"
            placeholder="Your Answer..."
          ></textarea>
          <br />
          {/* posting answer   */}
          <button class="button2" onClick={postAnswer}>
            <p>PostYourAnswer</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Answer;
