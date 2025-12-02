import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/banner-2.jpg"; 

function HeroBanner() {
  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* ✅ Background Image */}
      <img
        src={logo}
        alt="Cosmetic Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ✅ Overlay (to darken or color-tint the image) */}
      <div className="absolute inset-0 text-banner text-primary"></div>

      {/* ✅ Text Content */}
      <div className="relative z-10 text-center px-4 md:px-12 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-secondery mb-4 leading-tight drop-shadow-lg"
        >
          Glow Like Never Before ✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-6"
        >
          Discover our premium range of beauty essentials and elevate your glow —
          because you deserve the best!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/products"
            className="text-secondery hover:text-secondery text-buttons font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroBanner;
