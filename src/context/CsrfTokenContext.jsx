import React, { createContext } from 'react';
import { useCsrfToken } from '../hooks/useCsrfToken';

const CsrfTokenContext = createContext(null);

export function CsrfTokenProvider({ children }) {
  const csrfTokenQuery = useCsrfToken();
  
  return (
    <CsrfTokenContext.Provider value={csrfTokenQuery}>
      {children}
    </CsrfTokenContext.Provider>
  );
}

export default CsrfTokenContext;