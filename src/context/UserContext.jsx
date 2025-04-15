import React, { createContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../libs/axios';

// Create context
const UserContext = createContext(null);

// User provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Define logout first to avoid circular dependency
  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/sign-out');
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setUser(null);
      setToken(null);
    }
  }, []);

  // Function to refresh the access token
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh-token');
      setToken(response.data.accessToken);
      
      // Set up timer to refresh token before it expires
      if (response.data.expiresIn) {
        // Refresh 1 minute before expiration
        const msToExpiry = response.data.expiresIn * 1000;
        const refreshTime = msToExpiry - 60000;
        
        const tokenTimer = setTimeout(() => {
          refreshAccessToken();
        }, refreshTime);
        
        // Clean up timer
        return () => clearTimeout(tokenTimer);
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      logout(); // Now logout is defined before being used
    }
  }, [logout]);

  // Check if user is logged in
  const isLoggedIn = !!token;

  // Effect to refresh token if it's null
  useEffect(() => {
    if (!token) {
      refreshAccessToken();
    }
  }, [token, refreshAccessToken]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;