import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../libs/axios';

async function fetchCsrfToken() {
  console.debug('[CSRF] Requesting new CSRF token...');
  try {
    const response = await axiosInstance.get('/auth/csrf-token');
    
    if (!response.csrfToken) {
      console.warn('[CSRF] Token response missing csrfToken property:', response);
      return null;
    }
    
    console.debug('[CSRF] Token successfully retrieved:', 
      response.csrfToken.substring(0, 6) + '...' + response.csrfToken.substring(response.csrfToken.length - 6));
    return response.csrfToken;
  } catch (error) {
    console.error('[CSRF] Failed to fetch CSRF token:', error.message, error.response?.status);
    throw error;
  }
}

export function useCsrfToken() {
  const result = useQuery({
    queryKey: ['csrfToken'],
    queryFn: fetchCsrfToken,
    staleTime: 1000 * 60 * 30, // Consider token valid for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    retry: 3, // Retry 3 times if the request fails
    onError: (error) => {
      console.error('[CSRF] Query error:', error.message);
    },
    onSuccess: () => {
      console.debug('[CSRF] Token stored in React Query cache');
    },
  });

  // Log token status at every render
  console.debug('[CSRF] Token status:', {
    isLoading: result.isLoading,
    isError: result.isError,
    isSuccess: result.isSuccess,
    dataExists: !!result.data,
    timestamp: new Date().toISOString()
  });

  return result;
}