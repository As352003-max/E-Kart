import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptop, FaHome, FaCouch, FaTshirt, FaMobileAlt, FaShippingFast } from 'react-icons/fa';

const features = [
  { icon: <FaLaptop />, title: 'Tech Gadgets', description: 'Explore the latest electronics and accessories.' },
  { icon: <FaHome />, title: 'Home Essentials', description: 'Top-rated tools and decor for your home.' },
  { icon: <FaCouch />, title: 'Furniture Deals', description: 'Upgrade your space with stylish furniture.' },
  { icon: <FaTshirt />, title: 'Fashion Finds', description: 'Trendy outfits and wardrobe essentials.' },
  { icon: <FaMobileAlt />, title: 'Mobile Magic', description: 'Smartphones, wearables, and more.' },
  { icon: <FaShippingFast />, title: 'Fast Delivery', description: 'Swift and safe delivery to your doorstep.' },
];

const Home = ({ navigateTo }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-between p-6"
      style={{
        backgroundImage:
          "url('https://c1.wallpaperflare.com/preview/513/910/334/shop-store-market-supermarket.jpg')",
      }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-sm bg-white/80 p-10 rounded-2xl shadow-2xl text-center max-w-3xl mx-auto mt-12"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-extrabold text-indigo-800 drop-shadow mb-6"
        >
          Welcome to E-Commerce Store
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl text-gray-700 mb-8 font-medium"
        >
          Your one-stop shop for all things tech, home, and lifestyle. Discover deals, explore categories, and enjoy seamless shopping.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateTo('products')}
          className="bg-indigo-700 text-white py-4 px-10 rounded-full text-lg font-semibold hover:bg-indigo-800 transition shadow-lg"
        >
          Start Shopping
        </motion.button>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center"
          >
            <div className="text-4xl text-indigo-700 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
