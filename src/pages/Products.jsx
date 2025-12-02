import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../Api/axiosInstance";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/api/items");

        setProducts(res.data);
      } catch (err) {
        toast.error("⚠️ Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  // Search filter
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    return products.filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [searchTerm, products]);

  // Add to Cart
  const handleAddToCart = (product) => {
    if (!localStorage.getItem("token")) {
      setShowLoginPopup(true);
      return;
    }

    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`🛒 ${product.name} added to cart!`);
  };

  return (
    <div className="px-4 md:px-16 py-10">
      <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">
        Our Products
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full md:w-1/2">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm 
            focus:ring-2 focus:ring-amber-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 flex flex-col items-center"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.image}
                  className="h-[320px] object-contain mb-4"
                  alt={product.name}
                />
              </Link>

              <Link
                to={`/products/${product._id}`}
                className="text-xl font-semibold text-gray-800 hover:text-amber-900"
              >
                {product.name}
              </Link>

              <p className="text-amber-700 font-bold text-lg">₹{product.price}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/products/${product._id}`}
                  className="border border-amber-900 text-amber-900 px-4 py-2 rounded-lg hover:bg-amber-900 hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          No products found for “{searchTerm}”.
        </p>
      )}

      {/* Login Required Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-semibold text-amber-900">Login Required</h2>
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
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
