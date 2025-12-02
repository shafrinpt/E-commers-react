const AboutUs = () => {
  return (
    <div className="w-full bg-[#f7f1ea] text-amber-900">
      {/* Hero */}
      <section className="bg-[#c2ad9f] text-white py-12 px-6 md:px-16 rounded-t-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="src/assets/images/about-us.jpg"
              alt="About BlushBay"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2 text-black space-y-4">
            <h2 className="text-4xl font-stretch-semi-condensed bold tracking-widest mb-3 text-white">
              Ready to take your blush game to cloud nine?
            </h2>
            <p className="text-lg leading-relaxed">
              At <span className="font-semibold text-amber-900">BlushBay</span>, we believe in
              Blush brighter, care deeper with our Cloud Nine Niacinamide Glow Blush that gives your cheeks
              the look straight out of a dream.
            </p>
            <p className="text-lg leading-relaxed">
              From skincare essentials to luxury perfumes, we’re committed to offering cruelty-free
              and eco-conscious products that make you feel confident, beautiful, and loved.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
