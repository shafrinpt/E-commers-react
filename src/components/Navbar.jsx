import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Menu, X, User } from "lucide-react";

function Navbar() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // 🔄 Refresh navbar on login/logout
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("userChange", updateUser);
    updateUser();
    return () => window.removeEventListener("userChange", updateUser);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userChange"));
    navigate("/login");
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-800 text-white flex items-center justify-center rounded-full font-bold">
              B
            </div>
            <Link to="/" className="text-2xl font-semibold text-amber-900">
              BlushBay
            </Link>
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex gap-8 text-lg text-amber-900">
            <Link to="/" className="hover:text-amber-700">Home</Link>
            <Link to="/products" className="hover:text-amber-700">Products</Link>
            <Link to="/skincare" className="hover:text-amber-700">Skincare</Link>
            <Link to="/makeup" className="hover:text-amber-700">Makeup</Link>
            <Link to="/perfume" className="hover:text-amber-700">Perfume</Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 relative">

            {/* CART (Login Required) */}
            <button
              onClick={() => {
                if (!user) return navigate("/login");
                navigate("/cart");
              }}
              className="relative text-2xl text-amber-900"
            >
              🛒
              {user && cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-amber-800 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* PROFILE ICON */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="text-amber-900 hover:text-amber-700"
              >
                <User size={26} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">

                  {!user ? (
                    <>
                      <button
                        onClick={() => { navigate("/login"); setShowProfileMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </button>

                      <button
                        onClick={() => { navigate("/register"); setShowProfileMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { navigate("/profile"); setShowProfileMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>

                      <button
                        onClick={() => setShowLogoutModal(true)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  )}

                </div>
              )}
            </div>

            {/* MOBILE MENU */}
            <button
              className="md:hidden text-amber-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>
        </div>
      </nav>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[900]">
          <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 text-center">
              Are you sure you want to Logout?
            </h2>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => { setShowLogoutModal(false); handleLogout(); }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
