import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-6xl text-[var(--md-sys-color-on-surface-variant)] mb-4">
        <span className="mdi">shopping_cart</span>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-[var(--md-sys-color-on-surface)]">
        Your cart is empty
      </h2>
      <p className="text-[var(--md-sys-color-on-surface-variant)] mb-8 max-w-md mx-auto">
        Looks like you haven't added any products to your cart yet. 
        Browse our products and find something you'll love!
      </p>
      <Link
        to="/products"
        className="inline-flex items-center justify-center px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity"
      >
        Explore Products
      </Link>
    </div>
  );
}