import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import logo from '../assets/img/logo.png'

// SVG Search Icon to remove the dependency on 'react-icons'
const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-700 mr-2"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// Framer Motion Variants for animations
const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    }
};

const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
};

function Navbar() {
    return (
        <motion.nav
            className="flex items-center justify-between px-6 sticky top-0 bg-white/40 backdrop-blur-md font-playfair"
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
        >

            {/* Left: Logo */}
            <motion.div variants={navItemVariants} className="flex items-center">
                <Link to="/">
                    <motion.img
                        src={logo}
                        alt="StackScribe Logo"
                        className="w-56 "
                        whileHover={{ scale: 1.05 }}
                    />
                </Link>
            </motion.div>

            {/* Right: Navigation Items */}
            <motion.div variants={navbarVariants} className="flex items-center space-x-4 px-6">

                {/* Home Link */}
                <motion.div variants={navItemVariants}>
                    <Link
                        to="/"
                        className="text-xl px-2 font-semibold hover:text-xl hover:text-black transition-all duration-200"
                    >
                        Home
                    </Link>

                </motion.div>

                {/* Search Bar */}
                <motion.div variants={navItemVariants} className="flex items-center border border-gray-300 rounded-md px-2 py-1.5 w-80 focus-within:border-gray-500 transition-colors">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 outline-none border-none text-sm bg-transparent placeholder-gray-900 placeholder-text-md"
                    />
                </motion.div>

                {/* Login Link */}
                <motion.div variants={navItemVariants}>
                    <Link
                        to="/signin"
                        className="text-lg font-semibold hover:text-xl hover:text-black active:text-md transition-all duration-200 inline-block"
                    >
                        Sign In
                    </Link>

                </motion.div>

                {/* Sign Up Button (Primary Call-to-Action) */}
                <motion.div variants={navItemVariants}>
                    <Link to="/signup">
                        <motion.button
                            className=" py-1.5 text-lg font-semibold text-black "
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            Sign Up
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.nav>
    );
}

export default Navbar;

