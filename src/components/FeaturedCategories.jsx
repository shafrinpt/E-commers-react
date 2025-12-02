import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  return (
    <section className="py-14 px-6 text-center">
      <h2 className="text-3xl tracking-widest mb-8">FEATURED CATEGORIES</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[
          { name: "Makeup", img: "makeup.jpg", link: "/makeup" },
          { name: "Skincare", img: "skincare.jpg", link: "/skincare" },
          { name: "Perfume", img: "perfume.jpg", link: "/perfume" },
        ].map((cat) => (
          <Link key={cat.name} to={cat.link}
            className="p-4 bg-amber-50 rounded-xl shadow hover:shadow-md">
            <img
              src={`src/assets/images/${cat.img}`}
              alt={cat.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
