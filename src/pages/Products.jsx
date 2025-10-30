import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { Search } from "lucide-react"; // ✅ Import icon
import products from "../data/products";

function Products() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 md:px-16 py-10">
      <h2 className="text-3xl font-bold text-secondery mb-8 text-center">
        Our Products
      </h2>

      {/* ✅ Search Bar with Icon */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full md:w-1/2">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-900"
          />
        </div>
      </div>

      {/* ✅ Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center text-center"
            >
              {/* Product Image */}
              <Link
                to={`/products/${product.id}`}
                className="w-full flex justify-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-[300px] h-[250px] sm:h-[280px] md:h-[300px] object-cover rounded-xl mb-4"
                />
              </Link>

              {/* Product Name */}
              <Link
                to={`/products/${product.id}`}
                className="text-xl font-semibold text-gray-800 hover:text-buttons mb-2"
              >
                {product.name}
              </Link>

              {/* Product Price */}
              <p className="text-secondery font-bold text-lg mb-2">
                ₹{product.price}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                className="mt-2 bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          No products found for “{searchTerm}”.
        </p>
      )}
    </div>
  );
}

export default Products;
