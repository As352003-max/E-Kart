// routes/checkout.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
  const { cartItems, shippingInfo, paymentInfo } = req.body;


  console.log(`User ${req.user.email} initiated checkout.`);
  console.log('Cart Items:', cartItems);
  console.log('Shipping Info:', shippingInfo);
 
  res.status(200).json({ message: 'Order placed successfully (mock)', orderId: 'MOCK_ORDER_' + Date.now() });
});

module.exports = router;
