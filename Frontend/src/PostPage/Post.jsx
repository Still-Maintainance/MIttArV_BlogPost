import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import blogs from '../data/mockdata.json'; // Your blog data file

// Framer Motion Variants
const slideFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        }
    }
};

const containerVariant = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2, // delay for each child
        }
    }
};

const BlogPage = () => {
    return (
        <section className="font-playfair bg-off-white py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

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
                    <p className="text-lg text-gray-700 mt-6 max-w-2xl mx-auto">
                        Explore articles on web development, design, and technology from our team of expert writers.
                    </p>
                </motion.div>

                {/* Posts Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    variants={containerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {blogs.map((blog) => (
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
                                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3">{blog.title}</h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">{blog.content.slice(0, 100)}...</p>
                                    </div>
                                    <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                                        <span className="font-semibold text-gray-800">{blog.author}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BlogPage;
