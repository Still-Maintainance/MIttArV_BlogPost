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
            <div className="min-h-screen bg-white flex font-roboto">
                <div className="w-full flex items-center justify-center p-6 sm:p-12">
                    <motion.div
                        className="w-full max-w-md"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="text-center lg:text-left mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Create Account
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Get started for free. No credit card required.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
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

                        <div className="my-8 flex items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button
                            onClick={handleGoogleSignup}
                            className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Sign up with Google
                        </button>

                        <p className="mt-8 text-center text-gray-600">
                            Already have an account?{" "}
                            <Link to="/sign-in" className="underline font-semibold text-indigo-600 hover:underline">
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
