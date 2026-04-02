import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth, googleProvider, database } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Email/password signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Update displayName
            await updateProfile(user, { displayName: formData.fullName });

            // Save user info in Realtime Database
            await set(ref(database, `users/${user.uid}`), {
                fullName: formData.fullName,
                email: formData.email,
            });

            alert("Signup successful!");
            navigate("/edit-profile");
        } catch (error) {
            console.error("Firebase signup error:", error);
            alert(error.message);
        }
    };

    // Google signup
    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Set displayName if missing
            if (!user.displayName) {
                await updateProfile(user, { displayName: "Anonymous" });
            }

            // Save user info in database
            await set(ref(database, `users/${user.uid}`), {
                fullName: user.displayName || "Anonymous",
                email: user.email,
            });

            alert("Signup/Login successful!");
            navigate("/edit-profile");
        } catch (error) {
            console.error("Google signup error:", error);
            alert(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white flex font-roboto items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="text-center mb-8 sm:mb-10">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">Stack Scribe</h1>
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                                Create Account
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                Get started for free. No credit card required.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 sm:py-3 bg-gray-900 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="my-6 sm:my-8 flex items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 sm:mx-4 text-xs sm:text-sm text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button
                            onClick={handleGoogleSignup}
                            className="w-full flex items-center justify-center py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-7.918l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.637 44 30.039 44 24c0-1.341-.138-2.65-.389-3.917z" />
                            </svg>
                            <span className="text-sm sm:text-base">Sign up with Google</span>
                        </button>

                        <p className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-gray-600">
                            Already have an account?{" "}
                            <Link to="/sign-in" className="font-semibold text-indigo-600 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignupPage;
