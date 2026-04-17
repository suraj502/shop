import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProductById } from '../services/api';

const relatedProducts = [
  {
    name: 'Ceramic Vessel No. 04',
    category: 'Objects',
    price: '$220.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlwyG7j3wR8eLi4tvqEUo08BFBUNx5CU5yLY67fjg6teFohe11rQFucSA7KGLQckwQD-lmegfVV5qS-oFdGamjZdq3FAAy1FGcybvlXYsjJkXKMSze5lkDIdczIVPMiszAwExzlyxr8VE39Bk_F5BOjYPsoFvs96v-Dxpjmc82gDZWabAZJBqk6V6AXSHRfS3xTmhVPPruM0LB5iCKLwgMk9dwgZETebrPz25q2JwQSZJzTHGEzCEqcUJpQnRJhQiK1iDImB-r7h4',
  },
  {
    name: 'Cashmere Throw',
    category: 'Living',
    price: '$480.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoH8cqN-4VU2LsXfBP--YDGQvfo3st4C6-aoGx-XzROawBh1twpgTwOgHsoNdtHDh-UYDJxcxwCmprHxGbt8kv67dfaFtzQ640rdQqr303HjQqcT0Yk6neNkn8dP_YYbL8xoZBGuiN-otoR97R2QaTiwawUWgkPvMChXRTuLeKjCUp9pjbjk_yIWAEbcchGysU5neivowTR66Y6LVuNoJ9uAfHlCsjqQzJgIcm5dBXF5BwIzS-8hetssjw5JM0AfB5Mhen0C2xFuQ',
  },
  {
    name: 'The Sculptural Tote',
    category: 'Leather',
    price: '$890.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOIb08rmy-1UtXZ_83JYl2RkT_Wfkf1gpsW4EDhNvtSOJJwa6bdkIbRPJz8dMsqzrLODbqMBRqm1oJW_J1Yps0TR16MCddk1IzWkiu3aqGYZqi6X8kuWukX9-kd0lY42KASL8Z97Z-_CZM31oCDtzQeC6yfCcpnn6_W8bQmYA3mWiVEm1Ha6exCA3sJUDVkMjIbmm30oHoK9KiKRo1Pgkm1Pj7kesoLdCjVAoSsytN2_td_oaKtYAmaqHudZAeBujNxnWqrZdvD4o',
  },
  {
    name: 'Textured Carafe',
    category: 'Dining',
    price: '$160.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkiy7daAlHPZ6RtSYCkuN1W3mS1sjGv_sM064DM-03CustTA2jwjWpohqfF-v7U4BF_YBb3p_hLqcCuQ2XAAvclG8MAKCGK33XM07DpV4nSZfMIVgPGJFw27ajwvFlbQTev06-0jk_lRFwT1K3XOgRH-deS4iZ5cToRX4w5Kyid1_jsCGQhyAEKIBvqKK2D1Pzy7FHt1QRRCoNcXU7FJt7_TFubsefN4QvkhvtQ6chox5djE2B8mefQKrCFhFV6GT2hk8BpDkoVEI',
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(parseInt(id, 10));
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="px-6 py-32 text-center md:px-12">
        <div className="inline-block animate-spin text-3xl text-[var(--primary)]">⏳</div>
        <p className="mt-4 text-[var(--text-muted)]">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="px-6 py-32 text-center md:px-12">
        <p className="font-headline text-3xl italic text-[var(--primary)]">Product not available</p>
        <p className="mt-3 text-[var(--text-muted)]">{error}</p>
        <Link to="/products" className="btn-primary mt-7">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] px-6 pb-24 pt-32 md:px-12">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-5 aspect-[4/5] overflow-hidden bg-[var(--surface-low)]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square overflow-hidden bg-[var(--surface-low)]">
                <img src={product.image} alt={`${product.name} view ${item}`} className="h-full w-full object-cover opacity-85" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <nav className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            <Link to="/products" className="hover:text-[var(--primary)]">Archive</Link>
            <span>/</span>
            <span>{product.category}</span>
          </nav>

          <h1 className="font-headline text-5xl italic leading-tight text-[var(--primary)] md:text-6xl">{product.name}</h1>

          <div className="mb-10 mt-8 flex items-center justify-between border-b border-[var(--outline)] pb-6">
            <p className="font-headline text-3xl italic text-[var(--text-primary)]">${Number(product.price).toFixed(2)}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Limited Edition 1/500</p>
          </div>

          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            {product.description}. Crafted with precision and balanced form, this object combines sculptural aesthetics with practical use.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Quantity</p>
              <div className="inline-flex items-center border border-[var(--outline)]">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--surface-low)]">−</button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-14 border-x border-[var(--outline)] bg-transparent px-2 py-2 text-center text-sm outline-none"
                />
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--surface-low)]">+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-primary w-full">
              Add to Cart
              <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </button>

            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              <button type="button" className="underline underline-offset-4 hover:text-[var(--primary)]">Find in Store</button>
              <button type="button" className="underline underline-offset-4 hover:text-[var(--primary)]">Shipping Inquiry</button>
            </div>
          </div>

          <div className="mt-10 border border-[var(--outline)] bg-[var(--surface-low)] p-4 text-sm text-[var(--text-muted)]">
            {isAuthenticated ? `Signed in as ${user?.name}.` : 'Guest checkout active.'} API Call Used: GET /api/products/{id}
          </div>
        </div>
      </div>

      <section className="mx-auto mt-24 max-w-[1600px] bg-[var(--surface-low)] p-10 md:p-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-headline text-2xl italic text-[var(--primary)]">Materials</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Grade 5 aerospace titanium. Sapphire crystal with anti-reflective finish and hand-stitched leather details.</p>
          </div>
          <div>
            <h3 className="font-headline text-2xl italic text-[var(--primary)]">Precision</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Caliber manual movement. 72-hour reserve. 28,800 vibrations per hour and 100m water resistance.</p>
          </div>
          <div>
            <h3 className="font-headline text-2xl italic text-[var(--primary)]">Heritage</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Each unit is personally inspected and signed by our lead maker over a three-month assembly cycle.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-headline text-4xl italic text-[var(--primary)]">You May Also Like</h2>
          <Link to="/products" className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--primary)]">View Full Archive</Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <div key={item.name} className="group">
              <div className="mb-4 aspect-[3/4] overflow-hidden bg-[var(--surface-high)]">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.category}</p>
              <p className="mt-1 font-headline text-xl italic text-[var(--primary)]">{item.name}</p>
              <p className="mt-1 text-sm text-[var(--text-primary)]">{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
