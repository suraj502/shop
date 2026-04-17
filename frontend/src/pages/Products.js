import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Make sure backend is running on port 5000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    alert(`${product.name} added to cart!`);
    window.location.reload();
  };

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-[var(--surface)] px-6 pb-20 pt-32 md:px-12">
      <div className="mb-14">
        <h1 className="font-headline text-5xl italic leading-tight text-[var(--primary)] md:text-7xl">Collections</h1>
        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">A curated archive of objects and forms</p>
      </div>

      {error && (
        <div className="mb-8 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mb-12 flex flex-wrap items-center gap-3">
          <span className="atelier-label self-center">Filter by</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                selectedCategory === category
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-[var(--outline)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="py-16 text-center">
          <div className="inline-block animate-spin text-2xl text-[var(--primary)]">⏳</div>
          <p className="mt-4 text-[var(--text-muted)]">Loading products...</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Make sure backend is running: npm run dev</p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && !error && (
        <div className="py-14 text-center">
          <p className="font-headline text-2xl italic text-[var(--primary)]">No objects in this category</p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">Try another filter to continue browsing.</p>
        </div>
      )}
    </div>
  );
}
