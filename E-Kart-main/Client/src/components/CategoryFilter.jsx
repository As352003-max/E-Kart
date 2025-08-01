import React from 'react';
import { motion } from 'framer-motion';

const categories = ["All", "Men", "Women", "Children", "Others"];

const CategoryFilter = ({ filterCategory, setFilterCategory }) => {
  return (
    <div className="flex justify-center gap-4 py-4 bg-black shadow-md">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilterCategory(cat)}
          className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
            filterCategory === cat ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white hover:bg-yellow-300 hover:text-black'
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
