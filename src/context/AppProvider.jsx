import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { UserProvider } from './UserContext';
import { BrowserRouter } from 'react-router-dom';

// Create query client once
const queryClient = new QueryClient();

export function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </UserProvider>
    </QueryClientProvider>
  );
}