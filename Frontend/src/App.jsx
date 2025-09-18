import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import SigninPage from "./Auth/SignInPage";
import SignupPage from "./Auth/SignUp";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />



      </Routes>
    </Router>
  );
}

export default App;
