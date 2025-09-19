import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import Post from './Post'

// Search Icon Component
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

function PostPage() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center w-full mt-5 px-4">
                <motion.div
                    className="flex items-center border border-black rounded-md px-3 py-2 bg-white shadow-sm w-full max-w-md"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        opacity: { duration: 0.3, ease: "easeOut" }, // fades in quicker
                        y: { duration: 0.7, ease: "easeOut" }          // descends slowly
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileFocus={{ scale: 1.05 }}
                >
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search"
                        className="ml-2 flex-1 px-2 py-1 text-sm bg-transparent outline-none placeholder-gray-500"
                    />
                </motion.div>

                <Post />


            </div>
        </>
    )
}

export default PostPage
