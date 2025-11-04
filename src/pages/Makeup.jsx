import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import makeup from "../data/makeup";

function Makeup() {
  const dispatch = useDispatch();

  // ✅ Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(5000); // ✅ start from max price, not 20000

  // ✅ Dynamic filtering logic
  const filteredProducts = makeup.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchBrand = selectedBrand === "" || product.brand === selectedBrand;
    const matchCategory =
      selectedCategory === "" || product.category === selectedCategory;
    const matchPrice = product.price <= priceRange; // ✅ numeric comparison

    return matchSearch && matchBrand && matchCategory && matchPrice;
  });

  // ✅ Unique filter options
  const brands = [...new Set(makeup.map((p) => p.brand))];
  const categories = [...new Set(makeup.map((p) => p.category))];

  // ✅ Check if any filter is applied
  const hasFilterApplied =
    searchTerm || selectedBrand || selectedCategory || priceRange < 1500;

  // ✅ Decide what to show: all or filtered
  const visibleProducts = hasFilterApplied ? filteredProducts : makeup;

  return (
    <div className="px-4 md:px-16 py-10">
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-900 mb-10 text-center font-[Playfair_Display]">
        💋 Makeup Collection 💋
      </h2>

      {/* ✅ Filter + Search Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
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
            max="1500"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))} // ✅ ensure it's a number
            className="w-full accent-amber-900"
          />
        </div>
      </div>

      {/* ✅ Products Grid */}
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <Link to={`/makeup/${product.id}`} className="block relative">
                <div className="flex items-center justify-center bg-white h-[320px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[280px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
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
                    onClick={() =>
                      dispatch(
                        addToCart({
                          ...product,
                          category: "makeup",
                          quantity: 1,
                        })
                      )
                    }
                    className="bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/makeup/${product.id}`}
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
          No products found.
        </p>
      )}
    </div>
  );
}

export default Makeup;
