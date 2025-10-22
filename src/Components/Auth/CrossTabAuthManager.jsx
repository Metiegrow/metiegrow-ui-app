// Components/Auth/CrossTabAuthManager.jsx

import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getAuthData, clearAuthData } from './Auth.Function';

/**
 * Cross-tab authentication manager
 * Handles automatic logout across all browser tabs when user logs out from any tab
 */
export const useCrossTabAuth = () => {
  const navigate = useNavigate();
  const isLoggingOut = useRef(false);
  const checkInterval = useRef(null);
  const lastAuthCheck = useRef(Date.now());

  useEffect(() => {
    // Initial auth check
    const authData = getAuthData();
    if (!authData?.token) {
      return; // Not logged in, no need to monitor
    }

    /**
     * Handle storage events (triggered when localStorage changes in other tabs)
     */
    const handleStorageChange = (event) => {
      // Only handle authData changes
      if (event.key !== 'authData') return;

      // If authData was removed from another tab, logout this tab too
      if (event.newValue === null && event.oldValue !== null) {
        if (!isLoggingOut.current) {
          console.log('Auth data cleared in another tab, logging out...');
          performLogout();
        }
      }
    };

    /**
     * Periodically check if auth data still exists
     * This catches cases where localStorage.clear() was called
     */
    const checkAuthStatus = () => {
      if (isLoggingOut.current) return;

      const currentTime = Date.now();
      // Only check every 2 seconds to avoid excessive checks
      if (currentTime - lastAuthCheck.current < 2000) return;

      lastAuthCheck.current = currentTime;
      const authData = getAuthData();

      if (!authData?.token) {
        console.log('Auth data no longer available, logging out...');
        performLogout();
      }
    };

    /**
     * Perform logout without clearing storage (since it's already cleared)
     */
    const performLogout = () => {
      if (isLoggingOut.current) return;

      isLoggingOut.current = true;

      // Clear any remaining auth data
      clearAuthData();

      // Navigate to login page
      navigate({ to: '/login' });
    };

    // Listen for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange);

    // Set up periodic auth check
    checkInterval.current = setInterval(checkAuthStatus, 1000);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
      }
    };
  }, [navigate]);

  /**
   * Enhanced logout function that triggers cross-tab logout
   */
  const logout = () => {
    if (isLoggingOut.current) return;

    isLoggingOut.current = true;

    // Clear all storage - this will trigger storage events in other tabs
    localStorage.clear();
    sessionStorage.clear();

    // Navigate to login
    navigate({ to: '/login' });
  };

  return { logout };
};

/**
 * Component wrapper for cross-tab auth management
 * Use this component in your main app to enable cross-tab authentication
 */
export const CrossTabAuthProvider = ({ children }) => {
  useCrossTabAuth();

  return children;
};

/**
 * Storage event utilities for manual cross-tab communication
 */
export const CrossTabAuthEvents = {
  /**
   * Broadcast logout event to all tabs
   */
  broadcastLogout: () => {
    // Use localStorage to send message to other tabs
    localStorage.setItem(
      'authEvent',
      JSON.stringify({
        type: 'LOGOUT',
        timestamp: Date.now(),
      })
    );

    // Remove the event immediately (this triggers storage event)
    localStorage.removeItem('authEvent');
  },

  /**
   * Listen for cross-tab auth events
   */
  onAuthEvent: (callback) => {
    const handleStorageChange = (event) => {
      if (event.key !== 'authEvent') return;

      if (event.newValue) {
        try {
          const authEvent = JSON.parse(event.newValue);
          callback(authEvent);
        } catch (error) {
          console.error('Failed to parse auth event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  },
};

export default CrossTabAuthProvider;
