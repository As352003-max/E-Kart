import React, { useContext, useState, useEffect, useRef } from 'react';
import { CartContext } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const ShoppingCart = ({ navigateTo }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useContext(CartContext);

  const [orders, setOrders] = useState([]);
  const bgRef = useRef(null);

  // 🌈 GSAP Gradient Background Animation
  useEffect(() => {
    gsap.to(bgRef.current, {
      backgroundPosition: '200% center',
      duration: 10,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  // ✅ Handle Checkout → Redirect to Payment Page
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      items: cartItems,
      totalAmount: getTotalPrice()
    };

    // 👉 Navigate to Payment Page with order details
    navigateTo('payment', newOrder);
  };

  // ✅ Show Cart Items
  const showCartItems = () => {
    if (cartItems.length === 0) {
      alert("🛒 No items in cart.");
      return;
    }
    const details = cartItems.map(item => `CartID: ${item.id}, ItemID: ${item.id}`).join("\n");
    alert("🛒 Cart Items:\n" + details);
  };

  // ✅ Show Order History
  const showOrderHistory = () => {
    if (orders.length === 0) {
      alert("📦 No orders placed yet.");
      return;
    }
    const orderList = orders.map(o => `OrderID: ${o.orderId}`).join("\n");
    alert("📦 Order History:\n" + orderList);
  };

  return (
    <div ref={bgRef} className="min-h-screen py-10 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb)',
        backgroundSize: '400% 400%',
        transition: 'background 0.5s ease-in-out'
      }}
    >
      {/* 🌟 Floating Circles Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
            animate={{ y: '-10vh' }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-full bg-white/30 blur-xl absolute"
            style={{ left: `${Math.random() * 90}%` }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-5xl bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl relative z-10"
      >
        {/* ✅ Action Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={showCartItems}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            🛒 View Cart
          </button>
          <button
            onClick={showOrderHistory}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            📦 Order History
          </button>
          <button
            onClick={handleCheckout}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-bold shadow-md"
          >
            ✅ Proceed to Payment
          </button>
        </div>

        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 drop-shadow-md">
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-700 text-xl py-10">
            🛍️ Your cart is empty. Start shopping!
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('products')}
              className="block mx-auto mt-6 bg-black text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition duration-300"
            >
              Browse Products
            </motion.button>
          </div>
        ) : (
          <>
            {/* 🛒 Cart Items */}
            <div className="space-y-6 divide-y divide-gray-300">
              {cartItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center py-6 bg-white/70 rounded-lg shadow-sm px-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mr-6 border"
                    onError={(e) => { e.target.src = 'https://placehold.co/100x100/cccccc/000000?text=No+Image'; }}
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-yellow-700 font-bold text-lg mt-1">₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="w-20 p-2 border border-gray-400 rounded-md text-center text-gray-700"
                      />
                      <span className="ml-3 text-gray-800">
                        x ₹{item.price.toFixed(2)} = ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-600 hover:text-red-800 text-xl transition duration-150"
                  >
                    ❌
                  </button>
                </motion.div>
              ))}
            </div>

            {/* 🏷️ Total */}
            <div className="mt-10 pt-6 border-t-2 border-gray-300 flex justify-between items-center text-2xl font-bold text-gray-900">
              <span>Total ({getTotalItems()} items):</span>
              <span className="text-yellow-700">₹{getTotalPrice().toFixed(2)}</span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ShoppingCart;
