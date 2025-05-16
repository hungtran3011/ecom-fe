import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../hooks/useCartContext';

export default function CartIcon() {
  const { totalItems } = useCartContext();
  
  return (
    <Link 
      to="/cart" 
      className="relative flex items-center justify-center p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <span className="mdi text-[var(--md-sys-color-on-surface)]">
        shopping_cart
      </span>
      {totalItems > 0 && (
        <div className="absolute -top-1 -right-1 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
          {totalItems > 99 ? '99+' : totalItems}
        </div>
      )}
    </Link>
  );
}