const CustomerReviews = () => {
  

  return (
    <div className="w-full bg-white text-amber-900">
      {/* Hero */}
      <section className="py-14 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-amber-900">Customer Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <p className="italic text-gray-700 mb-3">
              “The products are amazing! My skin feels so soft and fresh.”
            </p>
            <p className="text-amber-900 font-medium">★★★★★</p>
            <p className="text-sm text-gray-600 mt-1">— Sarah M.</p>
          </div>
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <p className="italic text-gray-700 mb-3">
              “Fast delivery and beautiful packaging. Love it!”
            </p>
            <p className="text-amber-900 font-medium">★★★★★</p>
            <p className="text-sm text-gray-600 mt-1">— Priya K.</p>
          </div>
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <p className="italic text-gray-700 mb-3">
              “Great value for money. I’ll definitely shop again!”
            </p>
            <p className="text-amber-900 font-medium">★★★★★</p>
            <p className="text-sm text-gray-600 mt-1">— Aisha R.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerReviews;
