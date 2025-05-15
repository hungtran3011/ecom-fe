import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function CartSummary({ totalItems, subtotal, shipping = 0, tax = 0 }) {
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-[var(--md-sys-color-surface-container)] rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
        Order Summary
      </h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-[var(--md-sys-color-on-surface-variant)]">Subtotal ({totalItems} items)</span>
          <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-[var(--md-sys-color-on-surface-variant)]">Shipping</span>
          <span className="text-[var(--md-sys-color-on-surface)]">
            {shipping === 0 ? 'Free' : formatCurrency(shipping)}
          </span>
        </div>
        
        {tax > 0 && (
          <div className="flex justify-between">
            <span className="text-[var(--md-sys-color-on-surface-variant)]">Estimated tax</span>
            <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(tax)}</span>
          </div>
        )}
        
        <div className="border-t border-[var(--md-sys-color-outline-variant)] pt-3 mt-3">
          <div className="flex justify-between font-bold">
            <span className="text-[var(--md-sys-color-on-surface)]">Total</span>
            <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      <Link
        to="/checkout"
        className="w-full flex items-center justify-center px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity font-medium"
      >
        Proceed to Checkout
      </Link>
      
      <Link
        to="/products"
        className="w-full mt-3 flex items-center justify-center px-6 py-3 border border-[var(--md-sys-color-outline)] rounded-full text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}