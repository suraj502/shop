import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--outline)] bg-[var(--surface-low)] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-4">
          <div>
            <span className="font-headline text-lg italic text-[var(--primary)]">ATELIER</span>
            <p className="mt-6 max-w-[260px] text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Defining modern elegance through curation and craftsmanship.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Collections</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] underline underline-offset-4 transition hover:text-[var(--primary)]">Maison</Link></li>
              <li><Link to="/products" className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] underline underline-offset-4 transition hover:text-[var(--primary)]">Archive</Link></li>
              <li><Link to="/products" className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] underline underline-offset-4 transition hover:text-[var(--primary)]">Objects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Assistance</h4>
            <ul className="space-y-3">
              <li><span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Sustainability</span></li>
              <li><span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Shipping and Returns</span></li>
              <li><span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Contact</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Newsletter</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="w-full border-b border-[var(--outline)] bg-transparent py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-primary)] outline-none"
              />
              <button type="button" className="absolute bottom-2 right-0 text-[var(--primary)]" aria-label="Submit email">
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--outline)] pt-8 md:flex-row">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">© 2026 DIGITAL ATELIER. MADE BY SURAJ.</span>
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Instagram</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Journal</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
