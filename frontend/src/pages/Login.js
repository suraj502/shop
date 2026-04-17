import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fromPath = location.state?.from?.pathname || '/products';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      login(formData);
      navigate(fromPath, { replace: true });
      setIsSubmitting(false);
    }, 450);
  };

  if (isAuthenticated) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-100">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Account</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">You are already signed in.</h1>
        <p className="mt-4 text-gray-600">
          Continue browsing products, check your cart, or sign out when you are done.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
          <Link to="/logout" className="btn-secondary">
            Logout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-10 text-white sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Store login</p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          Sign in to keep shopping with a cleaner checkout flow.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-blue-100">
          Use this demo login to access your store account, move faster through product details,
          and keep the experience consistent across the site.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-blue-100">Fast access</p>
            <p className="mt-1 text-xl font-semibold">Returns you to the page you came from.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-blue-100">Simple demo auth</p>
            <p className="mt-1 text-xl font-semibold">Works fully in the browser for now.</p>
          </div>
        </div>
      </section>

      <section className="p-10 sm:p-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Welcome back</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">Login to your store account</h2>
          <p className="mt-3 text-gray-600">A clean demo sign-in page with a polished layout and clear actions.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <button type="submit" className="btn-primary w-full justify-center py-3" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 rounded-2xl bg-blue-50 p-4 text-sm text-gray-700">
          <p className="font-semibold text-gray-900">Tip</p>
          <p className="mt-1">
            After login, you will return to {fromPath === '/products' ? 'the product store' : 'the page you were viewing'}.
          </p>
        </div>
      </section>
    </div>
  );
}