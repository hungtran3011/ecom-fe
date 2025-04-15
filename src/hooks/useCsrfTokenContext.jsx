import { useContext } from 'react';
import CsrfTokenContext from '../context/CsrfTokenContext';

export function useCsrfTokenContext() {
  const context = useContext(CsrfTokenContext);
  if (!context) {
    throw new Error('useCsrfTokenContext must be used within a CsrfTokenProvider');
  }
  return context;
}