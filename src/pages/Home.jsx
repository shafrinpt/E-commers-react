import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [products, setProducts] = useState([]);

  // ✅ Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/items`
        );
        setProducts(res.data);
        toast.success("✨ Products loaded successfully!", { position: "top-right" });
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("⚠️ Failed to load products.", { position: "top-right" });
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white text-amber-900">
      {/* ✅ Hero Banner */}
      <HeroBanner />

      {/* 🌟 1. Special Offer Section */}
      <section className="bg-[#fdf6ec] text-amber-900 flex items-center justify-center gap-6 py-8 px-8 rounded-b-3xl mt-8">
        <p className="text-4xl font-bold tracking-wide">
          🎉 Get <span className="text-amber-800 font-extrabold">20% OFF</span> on all skincare products!
        </p>
        <Link
          to="/products"
          className="bg-amber-900 hover:bg-amber-800 text-white text-lg font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Shop Now
        </Link>
      </section>

      {/* 💄 2. Featured Categories (STATIC) */}
      <section className="py-14 px-6 text-center">
        <h2 className="text-3xl font-stretch-semi-condensed bold tracking-widest mb-8 text-amber-900">
          FEATURED CATEGORIES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Link to="/makeup" className="p-4 bg-amber-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="src/assets/images/makeup.jpg"
              alt="Makeup"
              className="rounded-lg mx-auto mb-4 w-full h-56 object-cover"
            />
            <h3 className="text-xl font-medium text-amber-900">Makeup</h3>
          </Link>
          <Link to="/skincare" className="p-4 bg-amber-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="src/assets/images/skincare.jpg"
              alt="Skincare"
              className="rounded-lg mx-auto mb-4 w-full h-56 object-cover"
            />
            <h3 className="text-xl font-medium text-amber-900">Skincare</h3>
          </Link>
          <Link to="/perfume" className="p-4 bg-amber-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="src/assets/images/perfume.jpg"
              alt="Perfume"
              className="rounded-lg mx-auto mb-4 w-full h-56 object-cover"
            />
            <h3 className="text-xl font-medium text-amber-900">Perfume</h3>
          </Link>
        </div>
      </section>

      {/* 🛍️ 3. Best Seller (Dynamic from Backend) */}
      <section className="py-14 bg-amber-50 px-6 text-center">
        <h2 className="text-3xl font-stretch-semi-condensed bold tracking-widest mb-8 text-amber-900">
          BEST SELLER
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-600">Loading best sellers...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products
              .slice(0, 3) // ✅ first 3 products
              .map((item) => (
                <Link
                  key={item._id}
                  to={`/products/${item._id}`}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-md transition block"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-lg mb-4 w-full h-76 object-cover"
                  />
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">₹{item.price}</p>
                </Link>
              ))}
          </div>
        )}
      </section>

      {/* 💄 4. New Launches (STATIC) */}
      <section className="py-14 px-6 text-center">
        <h2 className="text-3xl font-stretch-semi-condensed bold tracking-widest mb-8 text-amber-900">
          NEW LAUNCHES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-4 bg-amber-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="src/assets/images/dior.jpg"
              alt="Dior"
              className="rounded-lg mx-auto mb-4 w-full h-56 object-cover"
            />
            <h3 className="text-xl font-medium text-amber-900">Dior</h3>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="src/assets/images/beauty-and-j.jpg"
              alt="Beauty and Joseon"
              className="rounded-lg mx-auto mb-4 w-full h-56 object-cover"
            />
            <h3 className="text-xl font-medium text-amber-900">Beauty and Joseon</h3>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="src/assets/images/prada.jpg"
              alt="Prada"
              className="rounded-lg mx-auto mb-4 w-full h-56 object-cover"
            />
            <h3 className="text-xl font-medium text-amber-900">Prada</h3>
          </div>
        </div>
      </section>

      {/* 💎 5. Elite Edition (Dynamic from Backend — shows newest) */}
      <section className="py-14 bg-amber-50 px-6 text-center">
        <h2 className="text-3xl font-stretch-semi-condensed bold tracking-widest mb-8 text-amber-900">
          ELITE EDITION
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-600">Loading elite edition...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products
              .slice(-3) // ✅ 3 most recently added
              .reverse() // show latest first
              .map((item, index) => (
                <Link
                  key={item._id}
                  to={`/products/${item._id}`}
                  className="relative p-4 bg-white rounded-xl shadow hover:shadow-md transition block"
                >
                  {/* Optional "New" badge for most recent product */}
                  {index === 0 && (
                    <span className="absolute top-3 right-3 bg-amber-900 text-white text-xs px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-lg mb-4 w-full h-76 object-cover"
                  />
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">₹{item.price}</p>
                </Link>
              ))}
          </div>
        )}
      </section>

      {/* 🌿 6. About Us (STATIC) */}
      <section className="bg-[#c2ad9f] text-white py-12 px-6 md:px-16 rounded-t-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="src/assets/images/about-us.jpg"
              alt="About BlushBay"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2 text-black space-y-4">
            <h2 className="text-4xl font-stretch-semi-condensed bold tracking-widest mb-3 text-white">
              Ready to take your blush game to cloud nine?
            </h2>
            <p className="text-lg leading-relaxed">
              At <span className="font-semibold text-amber-900">BlushBay</span>, we believe in
              Blush brighter, care deeper with our Cloud Nine Niacinamide Glow Blush that gives your cheeks
              the look straight out of a dream.
            </p>
            <p className="text-lg leading-relaxed">
              From skincare essentials to luxury perfumes, we’re committed to offering cruelty-free
              and eco-conscious products that make you feel confident, beautiful, and loved.
            </p>
          </div>
        </div>
      </section>

      {/* ⭐ 7. Customer Reviews (STATIC) */}
      <section className="py-14 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-amber-900">Customer Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <p className="italic text-gray-700 mb-3">
              “The products are amazing! My skin feels so soft and fresh.”
            </p>
            <p className="text-amber-900 font-medium">★★★★★</p>
            <p className="text-sm text-gray-600 mt-1">— Sarah M.</p>
          </div>
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <p className="italic text-gray-700 mb-3">
              “Fast delivery and beautiful packaging. Love it!”
            </p>
            <p className="text-amber-900 font-medium">★★★★★</p>
            <p className="text-sm text-gray-600 mt-1">— Priya K.</p>
          </div>
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <p className="italic text-gray-700 mb-3">
              “Great value for money. I’ll definitely shop again!”
            </p>
            <p className="text-amber-900 font-medium">★★★★★</p>
            <p className="text-sm text-gray-600 mt-1">— Aisha R.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
