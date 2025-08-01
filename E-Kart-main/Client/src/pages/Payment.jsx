// === pages/Payment.jsx ===
import React from 'react';
import { motion } from 'framer-motion';

const Payment = ({ navigateTo }) => {
  const handlePayment = () => {
    // Mock payment success
    alert('Payment successful!');
    navigateTo('products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Payment Details</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input type="text" className="mt-1 block w-full p-3 border rounded-md shadow-sm" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Expiry</label>
              <input type="text" className="mt-1 block w-full p-3 border rounded-md shadow-sm" placeholder="MM/YY" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input type="password" className="mt-1 block w-full p-3 border rounded-md shadow-sm" placeholder="***" />
            </div>
          </div>
          <motion.button
            type="button"
            onClick={handlePayment}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Pay Now
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Payment;
