// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const FeaturedPosts = () => {
    const posts = [
        { id: 1, title: 'The Art of Storytelling in the Digital Age', category: 'Writing', author: 'Jane Doe', excerpt: 'Discover how to captivate your audience with compelling narratives that resonate...', imageUrl: 'https://placehold.co/600x400/e2e8f0/334155?text=Blog+Post+1' },
        { id: 2, title: '10 Productivity Hacks for Creative Minds', category: 'Productivity', author: 'John Smith', excerpt: 'Boost your creative output with these simple, yet effective, productivity tips.', imageUrl: 'https://placehold.co/600x400/e2e8f0/334155?text=Blog+Post+2' },
        { id: 3, title: 'A Beginner\'s Guide to SEO for Bloggers', category: 'Marketing', author: 'Emily White', excerpt: 'Learn the fundamentals of SEO to increase your blog\'s visibility and reach a wider audience.', imageUrl: 'https://placehold.co/600x400/e2e8f0/334155?text=Blog+Post+3' },
    ];

    // Variants for cards
    const cardVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    // Variants for heading
    const headingVariant = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    return (
        <section className="font-playfair py-16 sm:py-20 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">

                {/* Section Heading */}
                <motion.div
                    className="text-center mb-12"
                    variants={headingVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2 className="text-6xl sm:text-5xl font-bold  text-gray-900">
                        Featured Articles
                    </motion.h2>
                    <motion.p className="text-lg text-gray-700 mt-6">
                        Thoughtful, inspiring, and engaging reads from fellow writers.
                        </motion.p>
                </motion.div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"   
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <span className="text-sm font-semibold text-indigo-600">{post.category}</span>
                                <h3 className="text-xl font-bold  text-gray-900 mt-2 mb-2">{post.title}</h3>
                                <p className="text-gray-700  leading-relaxed mb-4">{post.excerpt}</p>
                                <a href="#" className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">Read More &rarr;</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPosts;
