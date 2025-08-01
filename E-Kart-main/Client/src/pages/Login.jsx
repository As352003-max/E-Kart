import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { motion } from 'framer-motion';

const Login = ({ navigateTo }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email] && users[email] === password) {
      login(email);
      navigateTo('products');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden 
                    bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
      
      {/* 🌌 Floating Bubbles Animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm shadow-lg"
          style={{
            width: `${30 + i * 10}px`,
            height: `${30 + i * 10}px`,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* 🌊 Bottom Wave */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-white/20 backdrop-blur-sm rounded-t-[50%]"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      ></motion.div>

      {/* ✅ Login Container */}
      <div className="relative z-10 flex w-full max-w-5xl bg-white/95 backdrop-blur-md 
                      rounded-2xl shadow-2xl overflow-hidden border border-white/20">

        {/* ✅ Left Side */}
        <motion.div
          className="w-1/2 bg-indigo-700 text-white p-10 flex flex-col justify-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Welcome Back!</h2>
          <p className="text-lg opacity-90">Sign in to explore amazing products and enjoy personalized shopping.</p>
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.uxIE2LBpY-1BAoASrZOvpQHaEK&pid=Api&P=0&h=180"
            alt="Welcome Illustration"
            className="mt-8 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* ✅ Right Side - Glowing Form */}
        <motion.div
          className="w-1/2 p-10 bg-gray-50 relative"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md 
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
                placeholder="user@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md 
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
                placeholder="password"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg text-lg font-semibold 
                         hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/50 
                         focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => navigateTo('signup')}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
