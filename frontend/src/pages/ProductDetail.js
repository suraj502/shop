import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(parseInt(id));
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin text-4xl">⏳</div>
        <p className="text-gray-600 mt-4">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">❌</div>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/products" className="text-blue-600 hover:text-blue-800 font-semibold">
        ← Back to Products
      </Link>

      {/* Product Detail */}
      <div className="grid md:grid-cols-2 gap-8 card p-8">
        {/* Image */}
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500">
              Category: <span className="font-semibold text-gray-700">{product.category}</span>
            </p>
          </div>

          {/* Price */}
          <div className="text-5xl font-bold text-blue-600">
            ${product.price}
          </div>

          {/* Description */}
          <div className="border-t border-b py-6">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="font-semibold text-gray-800">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                −
              </button>
              <input 
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-l border-r border-gray-300"
                min="1"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 btn-primary"
            >
              🛒 Add to Cart
            </button>
            <Link 
              to="/products"
              className="flex-1 btn-secondary text-center"
            >
              Continue Shopping
            </Link>
          </div>

          {/* API Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>💡 API Call Used:</strong><br/>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                GET /api/products/{id}
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
