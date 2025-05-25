import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrderConfirmation({ orderId, isLoggedIn }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center">
          <span className="mdi text-4xl text-[var(--md-sys-color-on-primary-container)]">check_circle</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-[var(--md-sys-color-on-surface)]">Thank You!</h1>
        <p className="text-xl mb-2 text-[var(--md-sys-color-on-surface)]">Your order has been placed successfully.</p>
        <p className="mb-8 text-[var(--md-sys-color-on-surface-variant)]">
          Order number: <span className="font-medium">{orderId}</span>
        </p>
        <p className="mb-8 text-[var(--md-sys-color-on-surface-variant)]">
          We've sent a confirmation email to your inbox with the order details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isLoggedIn ? (
            <Link 
              to="/orders" 
              className="px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full"
            >
              View My Orders
            </Link>
          ) : (
            <Link 
              to="/" 
              className="px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full"
            >
              Back to Home
            </Link>
          )}
          <Link 
            to="/products" 
            className="px-6 py-3 border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)] rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

OrderConfirmation.propTypes = {
  orderId: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};