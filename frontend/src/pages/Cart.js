import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    alert(`Order placed! Total: $${total.toFixed(2)}`);
    localStorage.removeItem('cart');
    setCartItems([]);
    setTotal(0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {cartItems.length === 0 ? 'Your cart is empty' : `${cartItems.length} items in your cart`}
        </p>
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="card p-6 flex gap-6">
                {/* Product Image */}
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.category}
                  </p>
                  <p className="text-blue-600 font-bold">
                    ${item.price} each
                  </p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end justify-between">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <input 
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-l border-r border-gray-300"
                      min="1"
                    />
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="card p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            {/* Breakdown */}
            <div className="space-y-3 mb-6 border-b pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between text-2xl font-bold text-gray-800 mb-6">
              <span>Total</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={handleCheckout}
              className="w-full btn-secondary mb-3"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <Link  
              to="/products"
              className="block text-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              Continue Shopping
            </Link>

            {/* Info */}
            <div className="bg-blue-50 p-3 rounded mt-6 text-sm text-gray-700">
              <p>💾 Cart data is saved in localStorage</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
