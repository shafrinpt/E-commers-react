import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import products from "../data/products"; // ✅ import products from data

function Products() {
  const dispatch = useDispatch();

  return (
    <div className="px-4 md:px-16 py-10">
      <h2 className="text-3xl font-bold text-pink-700 mb-8 text-center">
        Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col items-center text-center"
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-[180px] h-[180px] object-contain mb-4"
              />
            </Link>

            <Link
              to={`/products/${product.id}`}
              className="text-xl font-semibold text-gray-800 hover:text-pink-600 mb-2"
            >
              {product.name}
            </Link>

            <p className="text-pink-600 font-bold">₹{product.price}</p>

            <button
              onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
              className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
