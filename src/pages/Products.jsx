import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import products from "../data/products";

function Products() {
  const dispatch = useDispatch();

  return (
    <div className="px-4 md:px-16 py-10">
      <h2 className="text-3xl font-bold text-secondery mb-8 text-center">
        Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center text-center"
          >
            {/* Product Image */}
            <Link to={`/products/${product.id}`} className="w-full flex justify-center">
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
    </div>
  );
}

export default Products;
