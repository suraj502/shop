import React from 'react';
import { Link } from 'react-router-dom';

const arrivals = [
  {
    id: 1,
    name: 'Verdant Prism I',
    type: 'Hand-Blown Glass',
    price: '$850',
    image: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'The Emerald Chronos',
    type: 'Limited Edition Timepiece',
    price: '$4,200',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Flora Silk Throw',
    type: 'Heritage Weave',
    price: '$620',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=900&q=80',
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--surface)] pt-24">
      <section className="relative flex h-[66vh] min-h-[460px] items-center overflow-hidden px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-stone-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950" />
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/20" />
        <div className="absolute bottom-0 right-12 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />

        <div className="relative z-10 max-w-2xl">
          <h1 className="font-headline text-5xl italic leading-tight tracking-tight text-[var(--primary)] md:text-7xl">
            The Emerald
            <br />
            Atelier
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            A curated sanctuary of sculptural objects and rare artifacts. Craftsmanship elevated to high-art through the lens of modern minimalism.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary">
              Explore the Archive
            </Link>
            <Link to="/login" className="btn-secondary">
              Enter Atelier
            </Link>
          </div>
        </div>

        <p className="absolute bottom-24 right-10 hidden -rotate-90 font-headline text-4xl italic text-[var(--primary)]/30 lg:block">
          ESTABLISHED 2026
        </p>
      </section>

      <section className="bg-[var(--surface-low)] py-16">
        <div className="mb-14 flex items-end justify-between px-6 md:px-12">
          <div>
            <span className="atelier-label block">The Latest</span>
            <h2 className="mt-2 font-headline text-4xl italic text-[var(--primary)]">New Arrivals</h2>
          </div>
          <Link to="/products" className="atelier-label border-b border-[var(--outline)] pb-1 hover:text-[var(--primary)]">
            View All
          </Link>
        </div>

        <div className="flex gap-5 overflow-x-auto px-6 pb-4 md:px-12">
          {arrivals.map((item) => (
            <Link key={item.id} to="/products" className="group min-w-[180px] md:min-w-[220px]">
              <div className="mb-4 h-56 overflow-hidden bg-[var(--surface-elevated)] md:h-64">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{item.name}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.type}</p>
                </div>
                <span className="font-headline text-lg italic text-[var(--primary)]">{item.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-12">
          <div className="group md:col-span-7">
            <div className="h-56 overflow-hidden md:h-72">
              <img
                src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1300&q=80"
                alt="The curated space"
                className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="mt-4 font-headline text-2xl italic text-[var(--primary)]">The Maison Series</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              Objects designed for the architectural home. A study in materiality, balance, and the silence between structures.
            </p>
          </div>

          <div className="flex items-center justify-center bg-[var(--surface-high)] p-6 text-center md:col-span-5">
            <div>
              <img
                src="https://images.unsplash.com/photo-1515549832467-8783363e19b6?auto=format&fit=crop&w=700&q=80"
                alt="Sculptural form"
                className="mx-auto mb-5 h-24 w-24 object-cover md:h-28 md:w-28"
              />
              <h3 className="font-headline text-lg italic text-[var(--primary)]">Sculptural Form</h3>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Curated Objects</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 text-center md:px-12">
        <div className="mx-auto max-w-4xl">
          <span className="material-symbols-outlined mb-8 text-5xl text-[var(--primary-soft)]">format_quote</span>
          <h2 className="font-headline text-4xl italic leading-tight text-[var(--primary)] md:text-5xl">
            "True luxury is found in the quiet tension between the hand of the maker and the soul of the material."
          </h2>
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">Lucian Thorne, Creative Director</p>
          <p className="mx-auto mt-8 max-w-2xl text-sm text-[var(--text-muted)]">
            API source remains the same for product browsing and details. Your visual layer is now fully refreshed in an editorial style.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto max-w-6xl border border-[var(--outline)] bg-[var(--surface-low)] p-8 md:p-10">
          <h3 className="font-headline text-2xl italic text-[var(--primary)]">API Summary</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
            <li>GET /api/products - Fetch all products</li>
            <li>GET /api/products/:id - Fetch single product</li>
            <li>GET /api/products/category/:category - Fetch by category</li>
          </ul>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Open browser console to inspect requests.
          </p>
        </div>
      </section>
    </div>
  );
}
