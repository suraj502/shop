import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    // Get cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🛍️ Store
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6 items-center">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-blue-600 transition font-medium"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
