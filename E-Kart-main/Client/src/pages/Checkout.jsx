import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext'; // ✅ adjust path if needed
import { AuthContext } from '../contexts/AuthContext'; // ✅ adjust path if needed
import MessageModal from '../components/MessageModal'; // ✅ adjust path if needed

const Checkout = ({ navigateTo }) => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowMessageModal(true);
      return;
    }

    console.log('Order Details:', { cartItems, formData, totalPrice: getTotalPrice() });
    setOrderPlaced(true);
    clearCart();
  };

  const handleModalClose = () => {
    setShowMessageModal(false);
    navigateTo('login');
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl mt-8 text-center py-20">
        <h2 className="text-5xl font-extrabold text-green-600 mb-6">Order Placed Successfully!</h2>
        <p className="text-xl text-gray-700 mb-8">Thank you for your purchase. Your order will be processed shortly.</p>
        <button
          onClick={() => {
            setOrderPlaced(false);
            navigateTo('products');
          }}
          className="bg-indigo-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl mt-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty. Please add items to checkout.</p>
          ) : (
            <>
              <ul className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center text-lg text-gray-700">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 text-2xl font-bold text-gray-800 flex justify-between">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Shipping & Payment Form */}
        <div className={`${cartItems.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Shipping & Payment Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Info */}
            <fieldset className="border p-4 rounded-md shadow-sm">
              <legend className="text-lg font-medium text-gray-700 mb-3">Shipping Information</legend>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
                  <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
              </div>
            </fieldset>

            {/* Payment Info */}
            <fieldset className="border p-4 rounded-md shadow-sm">
              <legend className="text-lg font-medium text-gray-700 mb-3">Payment Information</legend>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="XXXX XXXX XXXX XXXX" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date (MM/YY)</label>
                  <input type="text" id="expiry" name="expiry" value={formData.expiry} onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="MM/YY" required />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="XXX" required />
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {showMessageModal && (
        <MessageModal
          message="Please log in to complete your order."
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Checkout;
