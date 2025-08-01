import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { motion } from 'framer-motion';

const Signup = ({ navigateTo }) => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email]) {
      setError('User already exists.');
      return;
    }

    users[email] = password;
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess('Signed up successfully! Redirecting to login...');
    setError('');

    setTimeout(() => {
      navigateTo('login');
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden 
                    bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
      
      {/* 🌌 Animated Floating Bubbles */}
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
            y: [0, -25, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* 🌊 Animated Waves at Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-white/20 backdrop-blur-sm rounded-t-[50%]"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      ></motion.div>

      {/* ✅ Signup Container */}
      <div className="relative z-10 flex w-full max-w-5xl bg-white/95 backdrop-blur-md 
                      rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        
        {/* ✅ Left Side */}
        <motion.div
          className="w-1/2 bg-purple-700 text-white p-10 flex flex-col justify-center relative"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Join Us Today!</h2>
          <p className="text-lg opacity-90">Create an account and start your shopping journey with exclusive deals and features.</p>
          <img 
            src="https://tse4.mm.bing.net/th?id=OIP.uxIE2LBpY-1BAoASrZOvpQHaEK&pid=Api&P=0&h=180" 
            alt="Signup Illustration" 
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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md 
                           focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all"
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
                           focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md 
                           focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg text-lg font-semibold 
                         hover:bg-purple-700 shadow-lg hover:shadow-purple-500/50 
                         focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <button onClick={() => navigateTo('login')} className="text-purple-600 hover:text-purple-800 font-medium">
              Login
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
