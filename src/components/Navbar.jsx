import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const cartCount = useSelector((state) => state.cart.items.length);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full text-primary shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo - Left */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-3xl font-logo bg-clip-text text-secondery tracking-wide"
          >
            BlushBay
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium text-black">
          <Link to="/" className="hover:text-secondery">Home</Link>
          <Link to="/products" className="hover:text-secondery">Products</Link>
        </div>

        {/* Cart - Right */}
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="text-lg font-medium text-black hover:text-secondery flex items-center gap-1"
          >
            🛒{cartCount}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondery focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-50 text-black flex flex-col items-center space-y-2 pb-2 text-lg font-medium mt-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-secondery">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-secondery">
            Products
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
