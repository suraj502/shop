import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
    calculateTotal(updatedCart);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    alert(`Order placed! Total: $${total.toFixed(2)}`);
    localStorage.removeItem('cart');
    setCartItems([]);
    setTotal(0);
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="bg-[var(--surface)] px-6 pb-24 pt-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="font-headline text-5xl italic tracking-tight text-[var(--primary)] md:text-7xl">Shopping Bag</h1>
          <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Review your selected objects</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="border border-[var(--outline)] bg-[var(--surface-low)] p-12 text-center">
            <p className="font-headline text-3xl italic text-[var(--primary)]">Your bag is empty</p>
            <p className="mt-4 text-sm text-[var(--text-muted)]">Add objects from the collection to begin checkout.</p>
            <Link to="/products" className="btn-primary mt-8">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-8">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex flex-col gap-8 md:flex-row">
                    <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--surface-low)] md:w-48">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale-[6%]" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-headline text-3xl italic text-[var(--primary)]">{item.name}</h3>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.category}</p>
                        </div>
                        <p className="font-headline text-2xl italic text-[var(--primary)]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
                        <div className="inline-flex items-center border border-[var(--outline)] px-4 py-2">
                          <button type="button" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="text-[var(--text-primary)] hover:text-[var(--primary)]">
                            <span className="material-symbols-outlined text-lg">remove</span>
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{String(item.quantity).padStart(2, '0')}</span>
                          <button type="button" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="text-[var(--text-primary)] hover:text-[var(--primary)]">
                            <span className="material-symbols-outlined text-lg">add</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] underline underline-offset-4 transition hover:text-[var(--primary)]"
                        >
                          Remove Object
                        </button>
                      </div>
                    </div>
                  </div>

                  {index !== cartItems.length - 1 && <div className="mt-10 h-px bg-[var(--outline)]" />}
                </div>
              ))}
            </div>

            <div className="sticky top-32 space-y-8 border border-[var(--outline)] bg-[var(--surface-low)] p-10 lg:col-span-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Order Summary</h2>

              <div className="space-y-5 border-t border-[var(--outline)] pt-6">
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span className="text-[10px] uppercase tracking-[0.2em]">Subtotal</span>
                  <span className="font-headline text-xl italic">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span className="text-[10px] uppercase tracking-[0.2em]">Shipping</span>
                  <span className="text-[10px] uppercase tracking-[0.2em]">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span className="text-[10px] uppercase tracking-[0.2em]">Taxes</span>
                  <span className="font-headline text-xl italic">$0.00</span>
                </div>
              </div>

              <div className="border-t border-[var(--outline)] pt-8">
                <div className="mb-8 flex items-baseline justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Total</span>
                  <span className="font-headline text-4xl italic text-[var(--primary)]">${total.toFixed(2)}</span>
                </div>

                <button type="button" onClick={handleCheckout} className="btn-primary w-full">
                  Proceed to Checkout
                  <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </button>

                <div className="mt-6 flex items-center justify-center gap-3 opacity-60">
                  <span className="material-symbols-outlined text-lg">lock</span>
                  <p className="text-[8px] uppercase tracking-[0.2em]">Encrypted Secure Checkout</p>
                </div>

                <Link to="/products" className="mt-6 block text-center text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] underline underline-offset-4 hover:text-[var(--primary)]">
                  Continue Shopping
                </Link>
              </div>

              <div className="border border-[var(--outline)] bg-[var(--surface-elevated)] p-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-primary)]">Need Assistance?</p>
                <p className="mt-2 font-headline text-sm italic text-[var(--text-muted)]">Our concierge is available Monday to Friday to assist with your selection.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
