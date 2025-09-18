import hero from '../assets/img/try.jpg'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Hero() {
    // Animation variants
    const imageVariant = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
    }

    const textVariant = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut', delay: 0.2 } },
    }

    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">

            {/* Left: Image */}
            <motion.div
                className="flex-1 max-w-[600px] md:max-w-[700px] mb-8 md:mb-0"
                variants={imageVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <img
                    src={hero}
                    alt="Hero"
                    className="w-full h-auto rounded-xl object-cover"
                />
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
                className="flex-1 md:ml-12 text-center md:text-left"
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <h1 className="font-playfair text-6xl md:text-5xl font-bold text-gray-900 mb-4">
                    Your Ideas, Illuminated.
                </h1>
                <p className="font-playfair text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
                    Discover, read, and share articles that make a difference. Whether it’s stories, insights, or ideas, your voice deserves a platform that celebrates, connects, and amplifies it to the world..
                </p>

                <Link
                to="/signup"
                >
                    <button className="px-3 underline decoration-3 py-3 text-xl font-medium">
                        Get Started
                    </button>
                </Link>

              
            </motion.div>

        </section>
    )
}

export default Hero
