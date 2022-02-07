import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import UsersPage from "./pages/UsersPage";
import { useSelector } from "react-redux";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const [loggedIn, setLoggedIn] = useState(false);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [userInfo, setLoggedIn]);

  return (
 
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    
  );
}

export default App;
