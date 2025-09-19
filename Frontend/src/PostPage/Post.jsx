import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

// Framer Motion Variants
const slideFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

const BlogPage = () => {
    const [search, setSearch] = useState("");
    const [allBlogs, setAllBlogs] = useState([]);       // Full blogs from API
    const [items, setItems] = useState([]);            // Blogs displayed on screen
    const [filteredBlogs, setFilteredBlogs] = useState([]); // Filtered by search
    const [hasMore, setHasMore] = useState(true);
    const [suggestions, setSuggestions] = useState([]);

    // Fetch blogs from API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/blogs"); // Your API endpoint
                setAllBlogs(response.data);
                setFilteredBlogs(response.data);
                setItems(response.data.slice(0, 6));
                setHasMore(response.data.length > 6);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs on search change
    useEffect(() => {
        const filtered = allBlogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(search.toLowerCase()) ||
                blog.category.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredBlogs(filtered);
        setItems(filtered.slice(0, 6));
        setHasMore(filtered.length > 6);

        // Autocomplete suggestions
        if (search.length > 0) {
            const suggestionList = filtered
                .map((b) => [b.title, b.category])
                .flat()
                .filter((v, i, a) => a.indexOf(v) === i)
                .slice(0, 5);
            setSuggestions(suggestionList);
        } else {
            setSuggestions([]);
        }
    }, [search, allBlogs]);

    const fetchMoreData = () => {
        if (items.length >= filteredBlogs.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setItems((prev) => [
                ...prev,
                ...filteredBlogs.slice(prev.length, prev.length + 6),
            ]);
        }, 500);
    };

    const handleSuggestionClick = (s) => {
        setSearch(s);
        setSuggestions([]);
    };

    return (
        <section className="font-playfair bg-off-white py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Bar */}
                <motion.div
                    className="relative mb-12 w-full max-w-md mx-auto"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        className="w-full px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-md z-10">
                            {suggestions.map((s, idx) => (
                                <li
                                    key={idx}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSuggestionClick(s)}
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.div>

                {/* Section Heading */}
                <motion.div
                    className="text-center mb-12"
                    variants={slideFromLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-5xl sm:text-6xl font-bold text-gray-900">
                        From the Blog
                    </h2>
                </motion.div>

                {/* Infinite Scroll */}
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4 className="text-center mt-4">Loading...</h4>}
                    endMessage={
                        <p className="text-center mt-4 text-gray-600">
                            Yay! You have seen it all 🎉
                        </p>
                    }
                    scrollThreshold={0.9}
                >
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        variants={containerVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        {items.map((blog) => (
                            <Link to={`/post/${blog.id}`} key={blog.id}>
                                <motion.div
                                    className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col group"
                                    variants={slideFromLeft}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="overflow-hidden">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex-grow">
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                                                <span>{blog.date}</span>
                                                <span>•</span>
                                                <span>{blog.category}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                {blog.content.slice(0, 100)}...
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                                            <span className="font-semibold text-gray-800">{blog.author}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                </InfiniteScroll>
            </div>
        </section>
    );
};

export default BlogPage;
