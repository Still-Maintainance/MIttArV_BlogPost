import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth, googleProvider } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Update displayName immediately
            await updateProfile(user, { displayName: formData.fullName });

            alert("Signup successful!");
            navigate("/edit-profile");
        } catch (error) {
            console.error("Signup error:", error);
            alert(error.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // If displayName is missing, set a placeholder
            if (!user.displayName) await updateProfile(user, { displayName: "Anonymous" });

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
            <div className="min-h-screen flex items-center justify-center bg-white font-roboto p-6 sm:p-12">
                <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-2">Create Account</h2>
                    <p className="text-gray-600 mb-6">Get started for free. No credit card required.</p>

                    <form onSubmit={handleSubmit}>
                        <input id="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-3 mb-4 border rounded" required />
                        <input id="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 mb-4 border rounded" required />
                        <input id="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 mb-4 border rounded" required />
                        <button type="submit" className="w-full bg-gray-900 text-white p-3 rounded">Create Account</button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button onClick={handleGoogleSignup} className="w-full flex items-center justify-center border p-3 rounded hover:bg-gray-50">
                        Sign up with Google
                    </button>

                    <p className="mt-6 text-center text-gray-600">
                        Already have an account? <Link to="/sign-in" className="text-indigo-600 underline">Sign In</Link>
                    </p>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default SignupPage;
