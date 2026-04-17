import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/20 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tight text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20">
                🛍️
              </span>
              <span>Store</span>
            </Link>

            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 lg:hidden">
              {isAuthenticated ? `Signed in as ${user?.name}` : 'Guest mode'}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            <Link
              to="/"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive('/') ? 'bg-white text-slate-950' : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive('/products') ? 'bg-white text-slate-950' : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive('/cart') ? 'bg-white text-slate-950' : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[11px] font-bold text-slate-950">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 lg:block">
                  Hi, {user?.name}
                </div>
                <Link
                  to="/logout"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                state={{ from: location }}
                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
