import { useState } from "react";
import { motion } from "framer-motion";

const BuildProfileForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        bio: "",
        profilePic: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile Data:", formData);
        alert("Profile submitted successfully!");
    };

    // Framer Motion variants for animations
    const formVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    };

    const inputVariant = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 font-playfair">
            <motion.h1
                className="text-3xl md:text-5xl font-bold mb-10 text-gray-900 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Build Your Profile
            </motion.h1>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                variants={formVariant}
                initial="hidden"
                animate="visible"
            >
                {/* Name */}
                <motion.input
                    type="text"
                    name="name"
                    placeholder="Enter your full name..."
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    required
                    variants={inputVariant}
                />

                {/* Date of Birth */}
                <motion.input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    required
                    variants={inputVariant}
                />

                {/* Bio */}
                <motion.textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us something about yourself..."
                    className="w-full text-lg leading-relaxed focus:outline-none focus:border-gray-900 border-b border-gray-300 pb-2 resize-none"
                    variants={inputVariant}
                ></motion.textarea>

                {/* Profile Picture */}
                <motion.input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    variants={inputVariant}
                />

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, backgroundColor: "#1f2937", color: "#fff" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-full text-lg font-semibold border border-gray-900 transition-colors"
                    variants={inputVariant}
                >
                    Submit Profile
                </motion.button>
            </motion.form>
        </div>
    );
};

export default BuildProfileForm;
