import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Home/HomePage";
import SigninPage from "./Auth/SignInPage";
import SignupPage from "./Auth/SignUp";
import PostPage from "./PostPage/PostPage";
import DashboardPage from "./Dashboard/DashboardPage";
import EditPostPage from "./CreateEditPost/EditPostPage";
import EditProfilePage from "./EditProfile/EditProfilePage";
import CreatePostPage from "./CreateEditPost/CreatePostPage";
import BlogDetailPage from "./PostPage/PostDetailpage";
import ProfilePage from "./EditProfile/ProfilePage"; // ✅ Import ProfilePage
import { useAuth } from "./contexts/authContext";

import './App.css';

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/sign-in" />;
};

// Public route wrapper for auth pages
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/posts" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Protected Pages */}
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <PrivateRoute>
              <BlogDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <PrivateRoute>
              <EditPostPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePostPage />
            </PrivateRoute>
          }
        />

        {/* ✅ New Profile Page */}
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
