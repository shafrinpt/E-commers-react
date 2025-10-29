import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import perfumeData from "../data/perfume";

function Perfume() {
  const dispatch = useDispatch();

  return (
    <div className="px-4 md:px-16 py-10">
      {/* Page Title */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-900 mb-10 text-center font-[Playfair_Display]">
        ✨ Perfume Collection ✨
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {perfumeData.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <Link to={`/perfume/${product.id}`} className="block relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[320px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </Link>

            {/* Product Info */}
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

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
  onClick={() =>
    dispatch(addToCart({ ...product, category: "perfume", quantity: 1 }))
  }
  className="bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-2 rounded-lg transition-all"
>
  Add to Cart
</button>


                <Link
                  to={`/perfume/${product.id}`}
                  className="border border-amber-900 text-amber-900 hover:bg-amber-900 hover:text-white font-semibold px-6 py-2 rounded-lg transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Perfume;
