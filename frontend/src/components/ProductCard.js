import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group">
      <div className="mb-5 aspect-[3/4] overflow-hidden bg-[var(--surface-high)]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover grayscale-[8%] transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-headline text-2xl italic text-[var(--primary)]">{product.name}</h3>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{product.category}</p>
          </div>
          <span className="font-headline text-xl italic text-[var(--primary)]">${product.price}</span>
        </div>

        <p className="line-clamp-2 min-h-[2.8rem] text-sm text-[var(--text-muted)]">{product.description}</p>

        <div className="flex gap-3">
          <Link to={`/products/${product.id}`} className="btn-secondary flex-1 text-center">
            View Details
          </Link>
          <button onClick={() => onAddToCart(product)} className="btn-primary flex-1">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
