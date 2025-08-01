import React, { useState } from "react";

const Navbar = ({ isAuthenticated, userEmail, getTotalItems, navigateTo, currentPage, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-black shadow-lg p-4 flex justify-between items-center">
      <button
        onClick={() => navigateTo("home")}
        className="text-2xl font-extrabold text-white hover:text-yellow-400 transition duration-300 ease-in-out"
      >
        E-Kart
      </button>

      <div className="flex items-center gap-6">
        {!isAuthenticated && (
          <>
            <button
              onClick={() => navigateTo("home")}
              className={`text-gray-300 hover:text-yellow-400 transition ${currentPage === "home" ? "underline" : ""}`}
            >
              Home
            </button>
            <button onClick={() => navigateTo("login")} className="text-gray-300 hover:text-yellow-400 transition">
              Login
            </button>
            <button onClick={() => navigateTo("signup")} className="text-gray-300 hover:text-yellow-400 transition">
              Sign Up
            </button>
          </>
        )}

        {isAuthenticated && (
          <>
            <button
              onClick={() => navigateTo("products")}
              className={`text-gray-300 hover:text-yellow-400 transition ${currentPage === "products" ? "underline" : ""}`}
            >
              All Products
            </button>
            <button onClick={() => navigateTo("products", "Men")} className="text-gray-300 hover:text-yellow-400 transition">
              Men
            </button>
            <button onClick={() => navigateTo("products", "Women")} className="text-gray-300 hover:text-yellow-400 transition">
              Women
            </button>
            <button onClick={() => navigateTo("products", "Children")} className="text-gray-300 hover:text-yellow-400 transition">
              Children
            </button>
            <button onClick={() => navigateTo("products", "Others")} className="text-gray-300 hover:text-yellow-400 transition">
              Others
            </button>

            {/* ✅ Cart */}
            <button
              onClick={() => navigateTo("cart")}
              className={`relative text-gray-300 hover:text-yellow-400 transition ${currentPage === "cart" ? "underline" : ""}`}
            >
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* ✅ Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${userEmail?.charAt(0).toUpperCase()}&background=FFD700&color=000&rounded=true&size=32`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden sm:inline">{userEmail?.split("@")[0]}</span>
              </button>

              {/* ✅ Dropdown Controlled by State */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black border rounded-md shadow-md py-1 z-10">
                  <button
                    onClick={() => {
                      closeMenu();
                      navigateTo("user");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
