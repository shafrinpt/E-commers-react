import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../Api/axiosInstance";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // ✅ Fetch single product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/api/items/${id}`);

        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        toast.error("❌ Failed to load product details", {
          className:
            "bg-red-100 text-red-800 border-l-4 border-red-500 font-medium",
        });
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Add to cart with Toastify
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, quantity }));
    toast.success("🛒 Added to cart!", {
      className:
        "bg-green-100 text-green-800 border-l-4 border-green-500 font-medium",
    });
  };

  // ✅ Buy now → open WhatsApp and show toast
  const handleBuyNow = () => {
    if (!product) {
      toast.error("❌ Product not found");
      return;
    }

    const message = `🛍️ *Order Details:*
--------------------------------
🧴 *Product:* ${product.name}
💰 *Price:* ₹${product.price}
📦 *Quantity:* ${quantity}
💵 *Total:* ₹${product.price * quantity}
🖼️ *Image:* ${product.image}

Please confirm my order.`;

    const phoneNumber = "918891278251"; // Replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");

    toast.info("📩 Redirecting to WhatsApp...", {
      className:
        "bg-blue-100 text-blue-800 border-l-4 border-blue-500 font-medium",
    });
  };

  // ✅ Show loading toast if product not loaded yet
  if (!product)
    return (
      <div className="text-center mt-20 text-gray-700">
        <p>Loading product details...</p>
        <ToastContainer position="top-right" autoClose={2500} theme="light" />
      </div>
    );

  return (
    <div className="px-4 md:px-20 py-10 flex flex-col md:flex-row gap-10 items-center md:items-start bg-amber-50">
      {/* ✅ Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-80 sm:w-[450px] md:w-[500px] h-[400px] sm:h-[480px] object-cover rounded-3xl shadow-2xl border border-amber-200"
        />
      </div>

      {/* ✅ Product Details */}
      <div className="md:w-1/2 flex flex-col justify-center gap-5 text-center md:text-left">
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-900 to-yellow-700 tracking-wide drop-shadow-md">
          {product.name}
        </h2>
        <p className="text-amber-700 font-bold text-2xl sm:text-3xl">
          ₹{product.price}
        </p>
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
          {product.description}
        </p>

        {/* ✅ Quantity Selector */}
        <div className="flex justify-center md:justify-start items-center gap-5 mt-4">
          <button
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="px-4 py-2 bg-gray-200 rounded-md font-bold text-xl hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-2xl font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 bg-gray-200 rounded-md font-bold text-xl hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* ✅ Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center md:justify-start">
          <button
            onClick={handleAddToCart}
            className="bg-amber-900 hover:bg-amber-800 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            🛒 Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-[#A07A51] hover:bg-[#ab9e8f] text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            Buy Now
          </button>
        </div>

        {/* ✅ Back Link */}
        <Link
          to="/products"
          className="mt-8 inline-block text-amber-800 text-lg font-medium hover:underline"
        >
          ← Back to Products
        </Link>
      </div>

      {/* ✅ Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        pauseOnHover
        draggable
        theme="light"
        toastClassName={() =>
          "relative flex p-4 bg-white text-gray-800 rounded-xl shadow-lg border-l-4 mt-2 transition-transform transform-gpu hover:scale-105"
        }
        bodyClassName={() => "text-sm font-medium"}
        progressClassName="bg-amber-700 h-1"
      />
    </div>
  );
}

export default ProductDetail;
