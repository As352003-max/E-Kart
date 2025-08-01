import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext.jsx';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl border transition flex flex-col"
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x200/cccccc/000000?text=No+Image';
          }}
        />
        <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
          {product.category || 'General'}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm flex-grow">{product.description || 'No description available.'}</p>
        <p className="text-indigo-600 font-bold text-xl mt-2">₹{product.price}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
