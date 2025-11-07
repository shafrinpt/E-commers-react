import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Only import toast (no ToastContainer here)

function Perfume() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedForWhom, setSelectedForWhom] = useState("");
  const [selectedConcentration, setSelectedConcentration] = useState("");
  const [priceRange, setPriceRange] = useState(20000);

  // ✅ Fetch perfumes from backend (MongoDB)
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/items`
        );

        const perfumes = res.data.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase().includes("perfume")
        );

        setProducts(perfumes);

        // ✅ Success message
        toast.success("✨ Perfume collection loaded successfully!", {
          position: "top-right",
        });
      } catch (err) {
        console.error("Error fetching perfumes:", err);

        // ❌ Error message
        toast.error("⚠️ Failed to load perfumes from server!", {
          position: "top-right",
        });
      }
    };

    fetchPerfumes();
  }, []);

  // ✅ Dynamic filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchBrand =
        selectedBrand === "" || product.brand === selectedBrand;
      const matchForWhom =
        selectedForWhom === "" || product.forWhom === selectedForWhom;
      const matchConcentration =
        selectedConcentration === "" ||
        product.concentration === selectedConcentration;
      const matchPrice = Number(product.price) <= priceRange;

      return (
        matchSearch &&
        matchBrand &&
        matchForWhom &&
        matchConcentration &&
        matchPrice
      );
    });
  }, [products, searchTerm, selectedBrand, selectedForWhom, selectedConcentration, priceRange]);

  // ✅ Unique filter options
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const forWhomOptions = [
    ...new Set(products.map((p) => p.forWhom).filter(Boolean)),
  ];
  const concentrations = [
    ...new Set(products.map((p) => p.concentration).filter(Boolean)),
  ];

  // ✅ Add to Cart
  const handleAddToCart = (product) => {
    try {
      dispatch(addToCart({ ...product, category: "Perfume", quantity: 1 }));

      // ✅ Success toast
      toast.success(`🛒 ${product.name} added to cart!`, {
        position: "top-right",
      });
    } catch (err) {
      console.error("Add to cart error:", err);

      // ❌ Error toast
      toast.error("❌ Something went wrong while adding to cart!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="px-4 md:px-16 py-10">
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-900 mb-10 text-center font-[Playfair_Display]">
        ✨ Perfume Collection ✨
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
            placeholder="Search perfumes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:outline-none"
          />
        </div>

        {/* For Whom */}
        <select
          value={selectedForWhom}
          onChange={(e) => setSelectedForWhom(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-900"
        >
          <option value="">For Whom</option>
          {forWhomOptions.map((option, i) => (
            <option key={i} value={option}>
              {option}
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

        {/* Concentration */}
        <select
          value={selectedConcentration}
          onChange={(e) => setSelectedConcentration(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-900"
        >
          <option value="">All Concentrations</option>
          {concentrations.map((c, i) => (
            <option key={i} value={c}>
              {c}
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
            min="500"
            max="20000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full accent-amber-900"
          />
        </div>
      </div>

      {/* ✅ Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <Link to={`/perfume/${product._id}`} className="block relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[380px] object-contain transform group-hover:scale-105 transition-transform duration-500 bg-white"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
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
                    to={`/perfume/${product._id}`}
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
          No perfumes found.
        </p>
      )}
    </div>
  );
}

export default Perfume;
