import { Link } from "react-router-dom";

const OfferSection = () => {
  return (
    <section className="bg-[#fdf6ec] flex items-center justify-center gap-6 py-8 px-8 rounded-b-3xl mt-8">
      <p className="text-4xl font-bold">
        🎉 Get <span className="text-amber-800">20% OFF</span> on all skincare products!
      </p>
      <Link
        to="/products"
        className="bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-800"
      >
        Shop Now
      </Link>
    </section>
  );
};

export default OfferSection;
