import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaShippingFast, FaTags, FaCreditCard, FaStar } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const productsList = [
  { id: 1, name: "Wireless Bluetooth", price: 59.99, imageUrl: "/products/blutooth.jpg" },
  { id: 2, name: "Smartwatch Series 7", price: 249.99, imageUrl: "/products/smartwatch.jpg" },
  { id: 3, name: "Gaming Mouse", price: 29.99, imageUrl: "/products/gamingmouse.avif" },
  { id: 4, name: "Smart LED TV 42\"", price: 399.99, imageUrl: "/products/smartledtv.avif" },
  { id: 5, name: "Stainless Steel Bottle", price: 14.99, imageUrl: "/products/stainlessteel.avif" },
  { id: 6, name: "Headphones Pro", price: 99.99, imageUrl: "/products/headphone.avif" },
];

const features = [
  { icon: <FaShippingFast />, title: "Fast Delivery", desc: "Get your orders within 2 days with our lightning-fast shipping." },
  { icon: <FaTags />, title: "Best Deals", desc: "Save big with exclusive offers and massive discounts." },
  { icon: <FaCreditCard />, title: "Secure Payments", desc: "Multiple payment options with top-notch security." },
  { icon: <FaStar />, title: "Top Rated", desc: "Trusted by thousands of happy customers across the globe." },
];

const testimonials = [
  { name: "Amit", text: "Best shopping experience! Fast delivery and great products." },
  { name: "Sneha", text: "Loved the discounts. Highly recommended!" },
  { name: "Ravi", text: "Customer service is amazing and the product quality is top-notch." },
];

const fallbackImg = "https://via.placeholder.com/400x300?text=E-Kart+Product";

const LandingPage = ({ navigateTo }) => {
  const [products] = useState(productsList);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ GSAP Refs
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const progressBarRef = useRef(null);

  // ✅ Animations
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      gsap.to(progressBarRef.current, { width: `${progress}%`, ease: "power3.out", duration: 0.2 });
    };
    window.addEventListener("scroll", updateProgress);

    gsap.to(heroRef.current, { backgroundPositionY: "40%", ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.utils.toArray("h2").forEach((heading) => {
      gsap.from(heading, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 80%" } });
    });
    gsap.utils.toArray(".product-card").forEach((card, i) => {
      gsap.to(card, { y: (i % 2 === 0 ? -20 : 20), ease: "power1.inOut", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.utils.toArray(".product-card img").forEach((img) => {
      gsap.from(img, { opacity: 0, scale: 0.8, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: img, start: "top 90%" } });
    });
    gsap.from(testimonialsRef.current.children, { opacity: 0, y: 50, stagger: 0.2, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: testimonialsRef.current, start: "top 85%" } });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // ✅ Tilt Effect
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    gsap.to(card, { rotateX: -rotateX, rotateY: rotateY, scale: 1.05, transformPerspective: 800, ease: "power2.out", duration: 0.3 });
  };
  const handleMouseLeave = (card) => gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, ease: "power2.inOut", duration: 0.4 });

  // ✅ Cart & Orders Logic
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`🛒 ${product.name} added to cart!`);
  };
  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    const orderId = `ORD-${Date.now()}`;
    setOrders((prev) => [...prev, orderId]);
    setCart([]);
    alert(`✅ Order placed successfully! Order ID: ${orderId}`);
  };
  const showCartItems = () => alert(cart.length ? `🛍 Cart Items:\n${cart.map((c) => `• ${c.name} ($${c.price})`).join("\n")}` : "🛍 Your cart is empty!");
  const showOrderHistory = () => alert(orders.length ? `📦 Orders:\n${orders.join("\n")}` : "📦 No orders yet.");

  return (
    <div className="font-sans relative">
      {/* ✅ Scroll Progress Bar */}
      <div ref={progressBarRef} className="fixed top-0 left-0 h-1 bg-yellow-400 z-50 w-0"></div>

      {/* ✅ Original Navbar (No Extra Icons) */}
      <nav className="bg-white shadow-lg p-4 flex justify-between items-center fixed w-full top-0 z-40">
        <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          <FaShoppingCart /> E-Kart
        </h1>
        <div className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-indigo-700">Features</a>
          <a href="#products" className="text-gray-700 hover:text-indigo-700">Products</a>
          <a href="#testimonials" className="text-gray-700 hover:text-indigo-700">Reviews</a>
          <a href="#newsletter" className="text-gray-700 hover:text-indigo-700">Subscribe</a>


        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header ref={heroRef} className="relative h-[90vh] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="relative z-10 text-white max-w-2xl px-4">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Shop Smarter with E-Kart</h1>
          <p className="text-lg mb-6">Your one-stop destination for top deals on electronics, fashion, and home essentials.</p>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => navigateTo("products")}
            className="bg-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-800 transition">
            Start Shopping
          </motion.button>
        </motion.div>
      </header>

      {/* ✅ Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">Why Choose E-Kart?</h2>
        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {features.map((f, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white shadow-lg p-6 rounded-xl text-center">
              <div className="text-4xl text-indigo-700 mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Product Section */}
      <section id="products" className="py-16">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">Popular Products</h2>
        <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {products.map((p) => (
            <div key={p.id} className="product-card bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
              <img src={p.imageUrl} alt={p.name} onError={(e) => (e.target.src = fallbackImg)}
                className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-indigo-700 font-bold">${p.price}</p>
                <button onClick={() => addToCart(p)} className="mt-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black">
                  ➕ Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Testimonials */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">What Our Customers Say</h2>
        <div ref={testimonialsRef} className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {testimonials.map((t, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white p-6 shadow-md rounded-xl text-center">
              <p className="italic text-gray-700 mb-3">"{t.text}"</p>
              <h4 className="font-semibold text-indigo-700">- {t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Newsletter */}
      <section id="newsletter" className="py-16 text-center bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-4">
        <h2 className="text-3xl font-bold mb-4">Subscribe & Get Exclusive Offers!</h2>
        <p className="mb-6">Join our newsletter and never miss a deal.</p>
        <div className="flex justify-center max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="w-2/3 p-3 rounded-l-lg text-black" />
          <button className="bg-yellow-400 text-black px-6 rounded-r-lg font-semibold hover:bg-yellow-500">Subscribe</button>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-indigo-900 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} E-Kart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
