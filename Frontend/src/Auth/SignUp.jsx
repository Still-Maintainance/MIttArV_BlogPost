import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth, googleProvider } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            alert("Signup successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Firebase signup error:", error);
            alert(error.message);
        }
    };

    // ✅ Google Signup
    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // result.user contains the signed-in user info
            console.log("Google user:", result.user);
            alert("Signup/Login successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Google signup error:", error);
            alert(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white flex font-roboto">
                <div className="w-full flex items-center justify-center p-6 sm:p-12">
                    <motion.div
                        className="w-full max-w-md"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        {/* Header */}
                        <div className="text-center lg:text-left mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Create Account
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Get started for free. No credit card required.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-gray-900 text-white text-lg font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                            >
                                Create Account
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Google Signup */}
                        <button
                            onClick={handleGoogleSignup} // ✅ Use Firebase function
                            className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
                                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-7.918l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
                                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.637 44 30.039 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
                            </svg>
                            Sign up with Google
                        </button>

                        <p className="mt-8 text-center text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/sign-in"
                                className="underline font-semibold text-indigo-600 hover:underline"
                            >
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
