const NewLaunches = () => {
  return (
    <section className="py-14 px-6 text-center">
      <h2 className="text-3xl tracking-widest mb-8">NEW LAUNCHES</h2>

      <div className="grid sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {["dior", "beauty-and-j", "prada"].map((brand) => (
          <div key={brand} className="bg-amber-50 p-4 rounded-xl shadow">
            <img
              src={`src/assets/images/${brand}.jpg`}
              alt={brand}
              className="h-56 w-full object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl capitalize">{brand.replace("-", " ")}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewLaunches;
