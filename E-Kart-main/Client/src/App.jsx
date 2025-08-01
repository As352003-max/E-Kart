import React, { useState, useEffect } from 'react';
import ProductListing from './pages/ProductListing';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import Payment from './pages/Payment';
import Navbar from './components/Navbar';
import { CartContext } from './contexts/CartContext';
import { AuthContext } from './contexts/AuthContext';
import UserPage from './pages/UserPage';

const productsList = [
  { id: 1, name: "Bluetooth Speaker", price: 49.99, imageUrl: "/products/blutooth.jpg", category: "Electronics" },
  { id: 2, name: "Gaming Mouse", price: 29.99, imageUrl: "/products/gamingmouse.avif", category: "Electronics" },
  { id: 3, name: "Headphones", price: 59.99, imageUrl: "/products/headphone.avif", category: "Electronics" },
  { id: 4, name: "Smart LED TV", price: 499.99, imageUrl: "/products/smartledtv.avif", category: "Electronics" },
  { id: 5, name: "Smart Watch", price: 199.99, imageUrl: "/products/smartwatch.jpg", category: "Accessories" },
  { id: 6, name: "Stainless Steel Bottle", price: 19.99, imageUrl: "/products/stainlessteel.avif", category: "Others" },

  { id: 7, name: "Men's Cargo Pants", price: 69.99, imageUrl: "/products/mensCargo.jpg", category: "Men" },
  { id: 8, name: "Men's Jacket", price: 99.99, imageUrl: "/products/mensJackets.jpg", category: "Men" },
  { id: 9, name: "Men's Shirt", price: 49.99, imageUrl: "/products/mensShirts.jpg", category: "Men" },
  { id: 10, name: "Men's T-Shirt", price: 39.99, imageUrl: "/products/mensTshirts.jpg", category: "Men" },

  { id: 11, name: "Women's Purse", price: 129.99, imageUrl: "/products/WomenPurse.jpg", category: "Women" },
  { id: 12, name: "Women's Heels", price: 119.99, imageUrl: "/products/womensHeels.jpg", category: "Women" },
  { id: 13, name: "Women's Summer Dress", price: 89.99, imageUrl: "/products/womenSummerdress.jpg", category: "Women" },

  { id: 14, name: "Children's Hoodie", price: 59.99, imageUrl: "/products/childHoodie.jpg", category: "Children" },
  { id: 15, name: "Children's Shoes", price: 49.99, imageUrl: "/products/childShoes.jpg", category: "Children" },
  { id: 16, name: "Children's Toy Car", price: 39.99, imageUrl: "/products/childToyCar.jpg", category: "Children" },

  { id: 17, name: "Sports Shoes", price: 119.99, imageUrl: "/products/sportShoes.jpg", category: "Others" },
  { id: 18, name: "Travel Backpack", price: 89.99, imageUrl: "/products/travelbackpack.webp", category: "Others" },
  { id: 19, name: "Sunglasses", price: 49.99, imageUrl: "/products/sunglass.jpg", category: "Others" }
];


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('ecommCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    const savedAuth = localStorage.getItem('ecommAuth');
    if (savedAuth) {
      const { isAuthenticated: authStatus, userEmail: email } = JSON.parse(savedAuth);
      setIsAuthenticated(authStatus);
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ecommCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('ecommAuth', JSON.stringify({ isAuthenticated, userEmail }));
  }, [isAuthenticated, userEmail]);

  useEffect(() => {
    if (!isAuthenticated && ['products', 'user', 'checkout', 'payment'].includes(currentPage)) {
      setCurrentPage('login');
    }
  }, [isAuthenticated, currentPage]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      return existing ? prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p) : [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((p) => p.id !== id));
  const updateQuantity = (id, qty) => setCartItems((prev) => prev.map((p) => p.id === id ? { ...p, quantity: Math.max(1, qty) } : p));
  const clearCart = () => setCartItems([]);
  const getTotalItems = () => cartItems.reduce((acc, p) => acc + p.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const login = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setCurrentPage('home');
  };

  const signup = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setCurrentPage('home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setCurrentPage('home');
  };

  const navigateTo = (page, category = 'All') => {
    if (page === 'products') setFilterCategory(category);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <Navbar
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
        getTotalItems={getTotalItems}
        navigateTo={navigateTo}
        currentPage={currentPage}
        logout={logout}
      />
      <main className="pb-12">
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice }}>
          <AuthContext.Provider value={{ isAuthenticated, userEmail, login, signup, logout }}>
            {currentPage === 'home' && <LandingPage navigateTo={navigateTo} />}
            {currentPage === 'products' && isAuthenticated && (
              <ProductListing products={productsList} filterCategory={filterCategory} setFilterCategory={setFilterCategory} />
            )}
            {currentPage === 'cart' && <ShoppingCart navigateTo={navigateTo} />}
            {currentPage === 'checkout' && <Checkout navigateTo={navigateTo} />}
            {currentPage === 'payment' && <Payment navigateTo={navigateTo} />}
            {currentPage === 'login' && <Login navigateTo={navigateTo} />}
            {currentPage === 'signup' && <Signup navigateTo={navigateTo} />}
            {currentPage === 'user' && isAuthenticated && <UserPage navigateTo={navigateTo} />}
          </AuthContext.Provider>
        </CartContext.Provider>
      </main>
      <footer className="bg-black text-white p-6 text-center">
        <p>&copy; {new Date().getFullYear()} E-Kart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
