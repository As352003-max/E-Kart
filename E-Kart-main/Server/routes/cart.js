const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

router.get('/', protect, async (req, res) => {
  try {
    res.status(200).json({ cartItems: [] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/add', protect, async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(`User ${req.user.email} added product ${productId} with quantity ${quantity}`);
  res.status(200).json({ message: 'Item added to cart (mock)' });
});

router.put('/update-quantity', protect, async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(`User ${req.user.email} updated quantity for product ${productId} to ${quantity}`);
  res.status(200).json({ message: 'Cart item quantity updated (mock)' });
});

router.delete('/remove', protect, async (req, res) => {
  const { productId } = req.body;
  console.log(`User ${req.user.email} removed product ${productId} from cart`);
  res.status(200).json({ message: 'Item removed from cart (mock)' });
});

module.exports = router;
