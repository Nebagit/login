import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Question from "./pages/Question/Question";
import Answer from "./pages/Answer/Answer";

function App() {
  const [userData, setUserData] = useContext(UserContext);
  const [isLoggedInChecked, setIsLoggedInChecked] = useState(false);
  let token = localStorage.getItem("auth-token");

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!token || token === null) {
        // Handle the case when there's no token
      } else {
        try {
          const userRes = await axios.get(
            `${process.env.REACT_APP_base_url}/api/users`,
            {
              headers: { "x-auth-token": token },
            }
          );

          setUserData({
            token,
            user: {
              id: userRes.data.data.user_id,
              display_name: userRes.data.data.user_name,
            },
          });
          setIsLoggedInChecked(true);
        } catch (error) {
          // Handle error while fetching user data
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (!isLoggedInChecked) {
      checkLoggedIn();
    }
  }, [isLoggedInChecked, setUserData, token]);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Home logout={logout} userData={userData} />}
          />
          <Route
            path="/question"
            element={<Question logout={logout} userData={userData} />}
          />
          <Route
            path="/answer/:post_id"
            element={<Answer logout={logout} userData={userData} />}
          />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
