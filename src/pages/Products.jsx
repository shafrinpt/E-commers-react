import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import products from "../data/products";


function Products() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = product.name || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  return (
    <div className="px-4 md:px-16 py-10">
      <h2 className="text-3xl font-bold text-secondery mb-8 text-center">
        Our Products
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full md:w-1/2">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-900"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
  key={product.id}
  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center text-center"
>
  <Link
    to={`/products/${product.id}`}
    className="w-full flex justify-center items-center"
  >
    <img
  src={product.image}
  alt={product.name}
  className="h-[320px] w-auto object-contain rounded-xl mb-4" // ✅ Increased size
/>

  </Link>

  <Link
    to={`/products/${product.id}`}
    className="text-xl font-semibold text-gray-800 hover:text-buttons mb-2"
  >
    {product.name}
  </Link>

  <p className="text-secondery font-bold text-lg mb-2">₹{product.price}</p>

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
        <p className="text-center text-gray-600">No products found for “{searchTerm}”.</p>
      )}
    </div>
  );
}

export default Products;
