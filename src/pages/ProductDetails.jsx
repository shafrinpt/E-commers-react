import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const products = [
  { id: 1, name: "Matte Lipstick", price: 499, description: "Long-lasting matte lipstick.", image: "/images/lipstick.jpg" },
  { id: 2, name: "Face Cream", price: 699, description: "Hydrating face cream.", image: "/images/cream.jpg" },
  { id: 3, name: "Eyeliner", price: 299, description: "Precision eyeliner.", image: "/images/eyeliner.jpg" },
];

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="px-4 md:px-16 py-10 flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 h-[350px] object-contain rounded-xl shadow-lg"
      />

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col justify-center gap-4">
        <h2 className="text-3xl font-bold text-pink-700">{product.name}</h2>
        <p className="text-pink-600 font-bold text-2xl">₹{product.price}</p>
        <p className="text-gray-700">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 w-full md:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
