import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="  bg-gray-100 text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-secondery">BlushBay</h2>
          <p className="text-gray-600">
            Premium beauty and cosmetic products delivered to your doorstep.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:bg-amber-900"><Facebook size={20} /></a>
            <a href="#" className="hover:bg-amber-900"><Instagram size={20} /></a>
            <a href="#" className="hover:bg-amber-900"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li><Link to="/" className="hover:text-buttons">Home</Link></li>
            <li><Link to="/products" className="hover:text-buttons">Products</Link></li>
            <li><Link to="/cart" className="hover:text-buttons">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-buttons">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-4">Customer Service</h3>
          <ul className="flex flex-col gap-2">
            <li><Link to="#" className="hover:text-buttons">FAQ</Link></li>
            <li><Link to="#" className="hover:text-buttons">Shipping</Link></li>
            <li><Link to="#" className="hover:text-buttons">Returns</Link></li>
            <li><Link to="#" className="hover:text-buttons">Support</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold mb-2">Subscribe</h3>
          <p className="text-gray-600">Get the latest deals and offers</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none w-full"
            />
            <button
              type="submit"
              className="bg-amber-900 hover:bg-amber-700 text-white px-4 py-2 rounded-r-lg transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-gray-700 text-center py-4 mt-4">
        &copy; {new Date().getFullYear()} BlushBay. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
