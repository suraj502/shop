import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-3">About Store</h3>
            <p className="text-gray-300 text-sm">
              A simple e-commerce store built with MERN stack to demonstrate how API calls work.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/logout" className="hover:text-white transition">Logout</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <p className="text-gray-300 text-sm">
              Email: info@store.com<br/>
              Phone: 1-800-STORE
            </p>
          </div>
        </div>

        <hr className="bg-gray-700 my-6" />
        <p className="text-center text-gray-400 text-sm">
          &copy; 2024 E-Commerce Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
