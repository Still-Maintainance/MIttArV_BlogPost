import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For route params (post id)
import { motion, AnimatePresence } from "framer-motion";

// --- Fake existing post data (replace with API fetch) ---
const fakePosts = [
    {
        id: "1",
        title: "Understanding React Hooks",
        description: "A deep dive into React Hooks and their usage",
        content: "React Hooks are functions that let you use state and other React features...",
        author: "Priya Sharma",
        date: "2025-09-01",
        category: "Technology",
    },
    {
        id: "2",
        title: "Healthy Living Tips",
        description: "Daily habits for a healthy lifestyle",
        content: "Eating balanced meals, exercising, and sleeping well are essential...",
        author: "John Doe",
        date: "2025-08-20",
        category: "Health",
    },
];

const EditPost = () => {
    const { postId } = useParams(); // Assuming route: /edit-post/:postId
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        author: "",
        date: "",
        category: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const categories = ["Technology", "Lifestyle", "Business", "Health", "Travel", "Education"];

    useEffect(() => {
        // Simulate fetching post data
        const post = fakePosts.find((p) => p.id === postId);
        if (post) {
            setFormData(post);
        }
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Post:", formData);
        // API call to update post here

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    // Variants
    const formVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
    const inputVariant = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } };

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 font-playfair">
            <motion.h1
                className="text-3xl md:text-5xl font-bold mb-10 text-gray-900 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Edit Your Blog Post
            </motion.h1>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                variants={formVariant}
                initial="hidden"
                animate="visible"
            >
                {/* Title */}
                <motion.input
                    type="text"
                    name="title"
                    placeholder="Title of your blog..."
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full text-2xl md:text-3xl font-semibold border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    required
                    variants={inputVariant}
                />

                {/* Description */}
                <motion.input
                    type="text"
                    name="description"
                    placeholder="Short description or subtitle..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    variants={inputVariant}
                />

                {/* Content */}
                <motion.textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={12}
                    placeholder="Write your content here..."
                    className="w-full text-lg leading-relaxed focus:outline-none focus:border-gray-900 border-b border-gray-300 pb-2 resize-none"
                    required
                    variants={inputVariant}
                />

                {/* Author */}
                <motion.input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    variants={inputVariant}
                />

                {/* Category */}
                <motion.select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    variants={inputVariant}
                >
                    <option value="">Select Category</option>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>
                            {cat}
                        </option>
                    ))}
                </motion.select>

                {/* Submit Button + Feedback */}
                <motion.div className="flex items-center space-x-4 mt-6">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, backgroundColor: "#1f2937" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                    >
                        Update Post
                    </motion.button>

                    <AnimatePresence>
                        {submitted && (
                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="text-green-600 font-semibold"
                            >
                                Post Updated!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.form>
        </div>
    );
};

export default EditPost;
