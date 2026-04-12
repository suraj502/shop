import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    window.location.reload();
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to E-Commerce Store
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          A simple MERN stack store to learn how APIs work
        </p>
        <Link 
          to="/products" 
          className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🚀', title: 'Fast Delivery', description: 'Quick shipping to your door' },
            { icon: '💳', title: 'Secure Payment', description: 'Safe and secure transactions' },
            { icon: '⭐', title: 'Quality Products', description: 'High-quality items at great prices' }
          ].map((feature, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Shop?</h2>
        <p className="text-gray-600 mb-6">Browse our collection of amazing products</p>
        <Link 
          to="/products" 
          className="inline-block btn-primary"
        >
          Explore Products
        </Link>
      </section>

      {/* API Documentation */}
      <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📝 API Summary</h3>
        <p className="text-gray-700 mb-4">
          This app uses the following APIs:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/products</code> - Fetch all products</li>
          <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/products/:id</code> - Fetch single product</li>
          <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/products/category/:category</code> - Fetch by category</li>
        </ul>
        <p className="text-gray-600 text-sm mt-4">
          Open Browser Console (F12) to see API calls in action!
        </p>
      </section>
    </div>
  );
}
