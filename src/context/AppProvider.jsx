import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '../components/ui/Toast';

// Create query client once
const queryClient = new QueryClient();

export function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <ToastProvider>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </ToastProvider>
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}