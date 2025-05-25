import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LoginRequired({ onContinueAsGuest }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">Sign in to continue</h1>
        <p className="mb-8 text-[var(--md-sys-color-on-surface-variant)]">
          Please sign in or create an account to complete your purchase with this payment method.
        </p>
        <p className="mb-8 text-[var(--md-sys-color-on-surface-variant)]">
          Alternatively, you can select Cash on Delivery and checkout as a guest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/login" 
            className="px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-3 border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)] rounded-full"
          >
            Create Account
          </Link>
          <button
            onClick={onContinueAsGuest}
            className="px-6 py-3 bg-[var(--md-sys-color-secondary)] text-[var(--md-sys-color-on-secondary)] rounded-full"
          >
            Continue as Guest with COD
          </button>
        </div>
      </div>
    </div>
  );
}

LoginRequired.propTypes = {
  onContinueAsGuest: PropTypes.func.isRequired
};