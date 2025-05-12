import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorDisplay({ error, onRetry }) {
  // Extract meaningful error message
  const errorMessage = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
  
  // Determine if the error is a network error
  const isNetworkError = error?.message?.includes('Network Error') || !navigator.onLine;
  
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-lg mx-auto text-center bg-[var(--md-sys-color-error-container)] p-8 rounded-lg shadow-md">
        <svg 
          className="w-16 h-16 text-[var(--md-sys-color-error)] mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        
        <h2 className="text-2xl font-bold mb-4 text-[var(--md-sys-color-on-error-container)]">
          {isNetworkError ? 'Connection Error' : 'Something Went Wrong'}
        </h2>
        
        <p className="mb-6 text-[var(--md-sys-color-on-error-container)]">
          {isNetworkError 
            ? 'Please check your internet connection and try again.' 
            : errorMessage}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {onRetry && (
            <button 
              onClick={onRetry}
              className="px-6 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          )}
          
          <Link 
            to="/"
            className="px-6 py-2 bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface-variant)] rounded-full hover:opacity-90 transition-opacity"
          >
            Return to Home
          </Link>
        </div>
        
        {/* Display technical details if available (only in development) */}
        {import.meta.env.NODE_ENV === 'development' && error?.stack && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-[var(--md-sys-color-on-error-container)] font-medium">
              Technical Details
            </summary>
            <pre className="mt-2 p-4 bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] rounded overflow-auto text-xs">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}