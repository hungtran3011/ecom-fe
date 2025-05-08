import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '../libs/axios';

// Create context
const UserContext = createContext(null);

// User provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const tokenTimerRef = useRef(null);

  // Define logout first to avoid circular dependency
  const logout = useCallback(async () => {
    console.log('Logging out...');
    if (!token) {
      console.warn('No token found, skipping logout.');
      return;
    }
    try {
      await axiosInstance.post('/auth/sign-out', 
        {}, // Empty request body
        { 
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true // Ensure cookies are sent with the request
        }
      );
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      // Clear timer when logging out
      if (tokenTimerRef.current) {
        clearTimeout(tokenTimerRef.current);
        tokenTimerRef.current = null;
      }
      setUser(null);
      setToken(null);
    }
  }, [token]);

  // Function to refresh the access token
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh-token');
      setToken(response.data.accessToken);
      
      // Set up timer to refresh token before it expires
      if (response.data.expiresIn) {
        // Clear any existing timer
        if (tokenTimerRef.current) {
          clearTimeout(tokenTimerRef.current);
        }
        
        // Refresh 1 minute before expiration
        const msToExpiry = response.data.expiresIn * 1000;
        const refreshTime = msToExpiry - 60000;
        
        console.debug(`[Auth] Setting token refresh timer for ${Math.round(refreshTime/1000)}s from now`);
        tokenTimerRef.current = setTimeout(() => {
          refreshAccessToken();
        }, refreshTime);
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      logout();
    }
  }, [logout]);

  // Effect to refresh token if it's null
  useEffect(() => {
    if (!token) {
      refreshAccessToken();
    }
    
    // Cleanup function
    return () => {
      if (tokenTimerRef.current) {
        console.debug('[Auth] Cleaning up token refresh timer');
        clearTimeout(tokenTimerRef.current);
        tokenTimerRef.current = null;
      }
    };
  }, [token, refreshAccessToken]);

  // Check if user is logged in
  const isLoggedIn = !!token;

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;