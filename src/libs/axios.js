import axios from 'axios';
import { applyCsrfInterceptor, getCsrfToken } from './csrf';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Pre-fetch the CSRF token when the app loads
getCsrfToken();

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Apply CSRF protection
applyCsrfInterceptor(axiosInstance);

export default axiosInstance;