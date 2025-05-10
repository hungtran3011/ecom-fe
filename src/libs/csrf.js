import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// In-memory token storage (not persisted in localStorage for security)
let csrfToken = null;
let lastFetchTime = 0;
let fetchPromise = null;
const TOKEN_LIFETIME = 25 * 60 * 1000; // 25 minutes
const MIN_FETCH_INTERVAL = 1 * 60 * 1000; // 1 minute between fetch attempts

// Axios instance that doesn't use the token interceptor to avoid circular dependency
const tokenClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Get the CSRF token, fetching a new one if needed
export async function getCsrfToken(forceRefresh = false) {
  const now = Date.now();
  
  // Return cached token if it's still valid and not forcing refresh
  if (!forceRefresh && csrfToken && (now - lastFetchTime) < TOKEN_LIFETIME) {
    return csrfToken;
  }
  
  // If we're already fetching, return that promise
  if (fetchPromise) {
    return fetchPromise;
  }
  
  // Throttle requests
  if (!forceRefresh && (now - lastFetchTime) < MIN_FETCH_INTERVAL) {
    console.debug('[CSRF] Too many requests, using existing token');
    return csrfToken;
  }
  
  // Fetch new token
  try {
    console.debug('[CSRF] Fetching new token');
    fetchPromise = tokenClient.get('/auth/csrf-token')
      .then(response => {
        if (response.data && response.data.csrfToken) {
          csrfToken = response.data.csrfToken;
          lastFetchTime = Date.now();
          console.debug('[CSRF] New token received');
          return csrfToken;
        } else {
          console.warn('[CSRF] Invalid token response', response.data);
          return null;
        }
      })
      .catch(error => {
        console.error('[CSRF] Token fetch failed:', error.message);
        return null;
      })
      .finally(() => {
        fetchPromise = null;
      });
    
    return fetchPromise;
  } catch (error) {
    console.error('[CSRF] Error initiating token fetch:', error);
    fetchPromise = null;
    return null;
  }
}

// Apply CSRF token to an axios instance
export function applyCsrfInterceptor(axiosInstance) {
  // Request interceptor to add CSRF token to non-GET requests
  axiosInstance.interceptors.request.use(async (config) => {
    if (config.method !== 'get') {
      // Get token (will fetch if needed)
      console.log("post request, applying csrf interceptor");
      const token = await getCsrfToken();
      if (token) {
        config.headers['X-CSRF-Token'] = token;
      }
    }
    return config;
  });
  
  // Response interceptor to handle CSRF errors
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      
      // Handle CSRF validation errors
      if (error.response && 
          error.response.status === 403 && 
          error.response.data?.message?.includes('CSRF') &&
          !originalRequest._retry) {
        
        originalRequest._retry = true;
        
        // Force fetch a new token
        const newToken = await getCsrfToken(true);
        if (newToken) {
          originalRequest.headers['X-CSRF-Token'] = newToken;
          return axiosInstance(originalRequest);
        }
      }
      
      return Promise.reject(error);
    }
  );
}