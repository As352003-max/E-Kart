import React, { useContext, useState, useEffect, useRef } from 'react';
import { CartContext } from '../contexts/CartContext';
import SearchBar from '../components/SearchBar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductListing = ({ products, convertCartToOrder, orderHistory }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const gridRef = useRef(null);

  const categories = ['All', 'Men', 'Women', 'Children', 'Accessories', 'Electronics', 'Others'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  // ✅ GSAP Animation for Product Cards
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [filteredProducts]);



  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-indigo-100 to-blue-100 overflow-hidden">
      {/* ✅ Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-20 h-20 bg-white/20 rounded-full blur-3xl animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

    

      {/* ✅ Product Grid */}
      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Explore Our Products</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* ✅ Categories */}
        <div className="flex justify-center gap-4 mt-6 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                category === cat ? 'bg-black text-yellow-400' : 'bg-gray-300 hover:bg-yellow-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ✅ Product Cards */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col transform transition hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-48 w-full object-cover rounded-md mb-4"
                onError={(e) => (e.target.src = 'https://placehold.co/300x200?text=No+Image')}
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-xl font-bold text-yellow-600">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-black text-white py-2 rounded-lg hover:bg-yellow-500 hover:text-black"
              >
                ➕ Add to Cart
              </button>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
