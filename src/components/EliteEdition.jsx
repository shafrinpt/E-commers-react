import { Link } from "react-router-dom";

const EliteEdition = ({ products }) => {
  return (
    <section className="py-14 bg-amber-50 text-center px-6">
      <h2 className="text-3xl tracking-widest mb-8">ELITE EDITION</h2>

      <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.slice(-3).reverse().map((item, index) => (
          <Link
            key={item._id}
            to={`/products/${item._id}`}
            className="bg-white p-4 rounded-xl shadow relative"
          >
            {index === 0 && (
              <span className="absolute top-3 right-3 bg-amber-900 text-white px-2 py-1 text-xs rounded">
                NEW
              </span>
            )}
            <img src={item.image} className="h-72 w-full object-cover mb-3" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EliteEdition;
