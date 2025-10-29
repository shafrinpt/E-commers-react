import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white text-primary shadow-sm px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo with Circle */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-800 text-white 
            flex items-center justify-center rounded-full font-medium text-lg shadow-sm border border-amber-900/40">
            B
          </div>
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-medium text-amber-900 tracking-wide"
          >
            BlushBay
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium text-amber-900">
          <Link to="/" className="hover:text-amber-700 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-amber-700 transition-colors">Products</Link>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-2 relative">
          <Link
            to="/cart"
            className="text-lg font-medium text-amber-900 hover:text-amber-700 relative"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-amber-800 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden  text-amber-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  bg-white text-amber-900 flex flex-col items-center space-y-2 pb-2 text-lg font-medium mt-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-amber-700">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-amber-700">
            Products
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
