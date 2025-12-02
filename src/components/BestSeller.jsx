import { Link } from "react-router-dom";

const BestSeller = ({ products }) => {
  return (
    <section className="py-14 bg-amber-50 text-center px-6">
      <h2 className="text-3xl tracking-widest mb-8">BEST SELLER</h2>

      {products.length === 0 ? (
        <p>Loading best sellers...</p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.slice(0, 3).map((item) => (
            <Link
              key={item._id}
              to={`/products/${item._id}`}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md"
            >
              <img src={item.image} alt={item.name} className="h-72 w-full object-cover mb-3" />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default BestSeller;
