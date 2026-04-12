import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card p-4">
      {/* Product Image */}
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      {/* Product Info */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {product.name}
      </h3>

      <p className="text-sm text-gray-600 mb-4 h-16">
        {product.description}
      </p>

      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-blue-600">
          ${product.price}
        </span>
        <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Link 
          to={`/products/${product.id}`}
          className="flex-1 btn-primary text-center"
        >
          View Details
        </Link>
        <button 
          onClick={() => onAddToCart(product)}
          className="flex-1 btn-secondary"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
