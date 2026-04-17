import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const THEME_STORAGE_KEY = 'atelier-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = React.useState(0);
  const [theme, setTheme] = React.useState(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

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
  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--outline)] bg-[var(--surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-4 py-3 md:px-12 md:py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/" className="font-headline text-xl md:text-2xl tracking-tight text-[var(--primary)]">
              ATELIER
            </Link>

            <div className="hidden items-center gap-6 md:gap-8 md:flex">
              <Link to="/products" className={`atelier-label border-b pb-1 ${isActive('/products') ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent hover:border-[var(--outline)]'}`}>
                Collections
              </Link>
              <Link to="/products" className="atelier-label hover:text-[var(--primary)]">Objects</Link>
              <Link to="/" className="atelier-label hover:text-[var(--primary)]">Archive</Link>
              <Link to="/" className="atelier-label hover:text-[var(--primary)]">About</Link>
            </div>
          </div>

          <div className="rounded-full border border-[var(--outline)] px-2 py-0.5 text-[10px] md:text-xs text-[var(--text-muted)] md:hidden">
              {isAuthenticated ? `Signed in as ${user?.name}` : 'Guest mode'}
          </div>
        </div>

        <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto md:gap-3 scrollbar-hide">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 md:h-10 md:w-10 flex-shrink-0 items-center justify-center border border-[var(--outline)] text-[var(--primary)] transition hover:bg-[var(--surface-low)]"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="material-symbols-outlined text-base md:text-lg">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <Link to="/" className={`inline-flex md:hidden flex-shrink-0 atelier-label border px-3 py-2 text-xs ${isActive('/') ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--outline)] hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}>
            Home
          </Link>

          <Link to="/" className={`hidden md:inline-flex flex-shrink-0 atelier-label border px-3 md:px-4 py-2 text-xs md:text-sm ${isActive('/') ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--outline)] hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}>
            Home
          </Link>
          <Link to="/products" className={`hidden md:inline-flex flex-shrink-0 atelier-label border px-3 md:px-4 py-2 text-xs md:text-sm ${isActive('/products') ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--outline)] hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}>
            Shop
          </Link>
          <Link to="/cart" className={`relative flex-shrink-0 atelier-label border px-3 md:px-4 py-2 text-xs md:text-sm ${isActive('/cart') ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--outline)] hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}>
            Bag
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary)] px-0.5 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <div className="hidden border border-[var(--outline)] px-2 md:px-4 py-2 text-xs md:text-sm text-[var(--text-muted)] lg:block">
                Hi, {user?.name}
              </div>
              <Link
                to="/logout"
                className="flex-shrink-0 btn-primary text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              state={{ from: location }}
              className="flex-shrink-0 btn-primary text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4"
            >
              Login
            </Link>
          )}

          <button type="button" className="hidden md:inline-flex flex-shrink-0 h-9 w-9 md:h-10 md:w-10 items-center justify-center text-[var(--primary)] transition hover:opacity-70" aria-label="Search">
            <span className="material-symbols-outlined text-base">search</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
