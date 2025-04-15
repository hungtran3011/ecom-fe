import axios from 'axios';

const API_URL = import.meta.env.API_URL || 'http://localhost:8080/api';

// CSRF token storage
let csrfToken = null;

// Function to set the CSRF token (will be called from context)
export const setCsrfToken = (token) => {
  console.debug('[CSRF] Token set in axios:', token ? `${token.substring(0, 6)}...` : 'null');
  csrfToken = token;
};

// Create a configured axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor for adding CSRF token
axiosInstance.interceptors.request.use(
  (config) => {
    // Add CSRF token to non-GET requests except for the CSRF token endpoint itself
    if (config.method !== 'get' && csrfToken && !config.url.includes('/csrf-token')) {
      console.debug(`[CSRF] Adding token to ${config.method.toUpperCase()} ${config.url}`);
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle CSRF token errors (usually 403 Forbidden)
    if (error.response && error.response.status === 403 && 
        (error.response.data?.message?.includes('CSRF') || 
         error.response.statusText?.includes('CSRF'))) {
      console.warn('[CSRF] Token validation failed, triggering refresh');
      // Trigger token refresh
      window.dispatchEvent(new CustomEvent('csrf-token-expired'));
    } else if (error.response && error.response.status === 401) {
      console.error('[Auth] Authentication error');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;