import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();

    const timer = window.setTimeout(() => {
      navigate('/', { replace: true });
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-2xl ring-1 ring-gray-100">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl text-blue-600">
        👋
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Signed out</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900">You have been logged out.</h1>
      <p className="mt-4 text-gray-600">
        Your session has been cleared. Redirecting you back to the store home page now.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
        <Link to="/login" className="btn-secondary">
          Sign In Again
        </Link>
      </div>
    </div>
  );
}