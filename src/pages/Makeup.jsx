import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../Api/axiosInstance";
function Makeup() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(7001);

  const [showLoginPopup, setShowLoginPopup] = useState(false); // ADDED

  // Fetch makeup items
  useEffect(() => {
  const fetchMakeup = async () => {
    try {
      const res = await axiosInstance.get("/api/items");

      const makeupItems = res.data.filter(
        (item) =>
          item.category && item.category.toLowerCase().includes("makeup")
      );

      setProducts(makeupItems);

      toast.success("💄 Makeup collection loaded successfully!", {
        position: "top-right",
      });
    } catch (err) {
      toast.error("⚠️ Failed to load makeup products from server!", {
        position: "top-right",
      });
    }
  };

  fetchMakeup();
}, []);


  // Filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchBrand =
        selectedBrand === "" ||
        (product.brand && product.brand === selectedBrand);
      const matchCategory =
        selectedCategory === "" ||
        (product.category && product.category === selectedCategory);
      const matchPrice = Number(product.price) <= priceRange;

      return matchSearch && matchBrand && matchCategory && matchPrice;
    });
  }, [products, searchTerm, selectedBrand, selectedCategory, priceRange]);

  // Add to Cart WITH LOGIN CHECK
  const handleAddToCart = (product) => {
    if (!localStorage.getItem("token")) {
      setShowLoginPopup(true);
      return;
    }

    dispatch(addToCart({ ...product, category: "makeup", quantity: 1 }));

    toast.success(`🛍️ ${product.name} added to cart!`, {
      position: "top-right",
    });
  };

  // Unique filters
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="px-4 md:px-16 py-10">
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-900 mb-10 text-center font-[Playfair_Display]">
        💋 Makeup Collection 💋
      </h2>

      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:outline-none"
          />
        </div>

        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-900"
        >
          <option value="">All Brands</option>
          {brands.map((brand, i) => (
            <option key={i} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-900"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Price Range */}
        <div className="col-span-1 flex flex-col items-center md:items-start">
          <label className="text-sm font-medium text-gray-700">
            Price: ₹{priceRange}
          </label>
          <input
            type="range"
            min="100"
            max="7001"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-amber-900"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <Link to={`/makeup/${product._id}`} className="block relative">
                <div className="flex items-center justify-center bg-white h-[320px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[280px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[Playfair_Display] tracking-wide group-hover:text-amber-900 transition-colors duration-300">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <p className="text-amber-800 font-bold text-lg mb-5">
                  ₹{product.price}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/makeup/${product._id}`}
                    className="border border-amber-900 text-amber-900 hover:bg-amber-900 hover:text-white font-semibold px-6 py-2 rounded-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          No makeup products found.
        </p>
      )}

      {/* 🔥 LOGIN POPUP */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-semibold text-amber-900">
              Login Required
            </h2>
            <p className="text-gray-600 mt-2">
              Please login to add items to your cart.
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowLoginPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => (window.location.href = "/login")}
                className="px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      {/* POPUP END */}
    </div>
  );
}

export default Makeup;
