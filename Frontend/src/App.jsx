import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import SigninPage from "./Auth/SignInPage";
import SignupPage from "./Auth/SignUp";
import PostPage from "./PostPage/PostPage";
import DashboardPage from "./Dashboard/DashboardPage";
import EditPostPage from "./CreateEditPost/EditPostPage";
import EditProfilePage from "./EditProfile/EditProfilePage";
import CreatePostPage from "./CreateEditPost/CreatePostPage";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/dashboard" element={< DashboardPage />} />
        <Route path="/edit-post" element={< EditPostPage />} />
        <Route path="/edit-profile" element={< EditProfilePage />} />
        <Route path="/create-post" element={< CreatePostPage />} />










      </Routes>
    </Router>
  );
}

export default App;
