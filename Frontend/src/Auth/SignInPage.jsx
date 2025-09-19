import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

const SignInPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Sign in with email/password
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("User signed in:", userCredential.user);
            navigate("/posts");
        } catch (error) {
            console.error("Firebase login error:", error);
            if (error.code === "auth/user-not-found") {
                alert("No user found with this email.");
            } else if (error.code === "auth/wrong-password") {
                alert("Incorrect password.");
            } else if (error.code === "auth/invalid-email") {
                alert("Invalid email format.");
            } else {
                alert(error.message);
            }
        }
    };

    // Google login
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/posts");
        } catch (error) {
            console.error("Google login error:", error);
            alert(error.message);
        }
    };

    // Forgot password
    const handleForgotPassword = async () => {
        if (!formData.email) {
            alert("Please enter your email to reset password.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, formData.email);
            alert("Password reset email sent. Check your inbox.");
        } catch (error) {
            console.error("Password reset error:", error);
            if (error.code === "auth/user-not-found") {
                alert("No account found with this email.");
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen font-Roboto bg-white flex items-center justify-center py-16">
                <div className="w-full max-w-md p-6 sm:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="text-center lg:text-left mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Sign In</h2>
                            <p className="text-gray-600 mt-2">
                                Enter your credentials to access your account.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="password" className="block text-gray-700 font-semibold">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="text-sm text-indigo-600 hover:underline"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-gray-900 text-white text-lg font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300 shadow-md"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Or Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Google Login */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-7.918l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.637 44 30.039 44 24c0-1.341-.138-2.65-.389-3.917z" />
                            </svg>
                            Sign in with Google
                        </button>

                        {/* Sign Up Link */}
                        <p className="mt-8 text-center text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/sign-up" className="underline font-semibold text-indigo-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default SignInPage;
