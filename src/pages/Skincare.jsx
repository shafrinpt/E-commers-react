import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function Skincare() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(5000);

  // ✅ Fetch skincare products from backend
  useEffect(() => {
    const fetchSkincare = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/items`
        );

        const skincareItems = res.data.filter(
          (item) =>
            item.category && item.category.toLowerCase().includes("skincare")
        );

        setProducts(skincareItems);
        toast.success("🌿 Skincare products loaded successfully!", {
          position: "top-right",
        });
      } catch (err) {
        console.error("Error fetching skincare products:", err);
        toast.error("❌ Failed to load skincare products!", {
          position: "top-right",
        });
      }
    };

    fetchSkincare();
  }, []);

  // ✅ Dynamic filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchSkinType =
        selectedSkinType === "" ||
        (product.skinType && product.skinType === selectedSkinType);
      const matchBrand =
        selectedBrand === "" ||
        (product.brand && product.brand === selectedBrand);
      const matchCategory =
        selectedCategory === "" ||
        (product.category && product.category === selectedCategory);
      const matchPrice = Number(product.price) <= priceRange;

      return matchSearch && matchSkinType && matchBrand && matchCategory && matchPrice;
    });
  }, [products, searchTerm, selectedSkinType, selectedBrand, selectedCategory, priceRange]);

  // ✅ Unique filter options
  const skinTypes = [...new Set(products.map((p) => p.skinType).filter(Boolean))];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  // ✅ Add to cart
  const handleAddToCart = (product) => {
    try {
      dispatch(addToCart({ ...product, category: "skincare", quantity: 1 }));
      toast.success(`🧴 ${product.name} added to cart!`, { position: "top-right" });
    } catch (err) {
      toast.error("❌ Could not add item to cart!", { position: "top-right" });
    }
  };

  return (
    <div className="px-4 md:px-16 py-10">
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-900 mb-10 text-center font-[Playfair_Display]">
        🌿 Skincare Collection 🌿
      </h2>

      {/* ✅ Filter + Search Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search Bar */}
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

        {/* Skin Type */}
        <select
          value={selectedSkinType}
          onChange={(e) => setSelectedSkinType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-900"
        >
          <option value="">All Skin Types</option>
          {skinTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Brand */}
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

        {/* Category */}
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
            max="5000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-amber-900"
          />
        </div>
      </div>

      {/* ✅ Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <Link to={`/skincare/${product._id}`} className="block relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[380px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 font-[Playfair_Display] tracking-wide group-hover:text-amber-900 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-amber-800 font-bold text-xl mb-5">
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
                    to={`/skincare/${product._id}`}
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
          No skincare products found.
        </p>
      )}
    </div>
  );
}

export default Skincare;
