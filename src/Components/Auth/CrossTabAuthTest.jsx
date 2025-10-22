// Components/Auth/CrossTabAuthTest.jsx

import React, { useState, useEffect } from 'react';
import { getAuthData, clearAuthData } from './Auth.Function';
import { useCrossTabAuth, CrossTabAuthEvents } from './CrossTabAuthManager';

/**
 * Test component to demonstrate cross-tab authentication functionality
 * This component shows current auth status and provides manual testing controls
 */
const CrossTabAuthTest = () => {
  const [authStatus, setAuthStatus] = useState(null);
  const [testEvents, setTestEvents] = useState([]);
  const { logout } = useCrossTabAuth();

  useEffect(() => {
    // Check initial auth status
    checkAuthStatus();

    // Listen for cross-tab auth events
    const removeListener = CrossTabAuthEvents.onAuthEvent((event) => {
      setTestEvents((prev) => [
        ...prev,
        {
          ...event,
          receivedAt: new Date().toLocaleTimeString(),
        },
      ]);
    });

    // Check auth status periodically
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      removeListener();
      clearInterval(interval);
    };
  }, []);

  const checkAuthStatus = () => {
    const authData = getAuthData();
    setAuthStatus({
      isAuthenticated: !!authData?.token,
      user: authData?.fullName || 'Unknown',
      email: authData?.email || 'Unknown',
      lastChecked: new Date().toLocaleTimeString(),
    });
  };

  const handleManualLogout = () => {
    logout();
  };

  const handleClearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    checkAuthStatus();
  };

  const handleBroadcastLogout = () => {
    CrossTabAuthEvents.broadcastLogout();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: '#1a1a1a',
        color: 'white',
        padding: '15px',
        border: '1px solid #333',
        borderRadius: '8px',
        maxWidth: '300px',
        fontSize: '12px',
        zIndex: 9999,
      }}
    >
      <h4 style={{ margin: '0 0 10px 0', color: '#BC5FFF' }}>Cross-Tab Auth Test</h4>

      {/* Auth Status */}
      <div style={{ marginBottom: '10px' }}>
        <strong>Auth Status:</strong>
        <br />
        Status:{' '}
        <span style={{ color: authStatus?.isAuthenticated ? '#4CAF50' : '#f44336' }}>
          {authStatus?.isAuthenticated ? 'Logged In' : 'Logged Out'}
        </span>
        <br />
        {authStatus?.isAuthenticated && (
          <>
            User: {authStatus.user}
            <br />
            Email: {authStatus.email}
            <br />
          </>
        )}
        Last Check: {authStatus?.lastChecked}
      </div>

      {/* Test Controls */}
      <div style={{ marginBottom: '10px' }}>
        <strong>Test Controls:</strong>
        <br />
        <button
          onClick={handleManualLogout}
          style={{
            margin: '2px',
            padding: '4px 8px',
            background: '#f44336',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Logout (Cross-tab)
        </button>
        <button
          onClick={handleClearStorage}
          style={{
            margin: '2px',
            padding: '4px 8px',
            background: '#FF9800',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Clear Storage
        </button>
        <button
          onClick={handleBroadcastLogout}
          style={{
            margin: '2px',
            padding: '4px 8px',
            background: '#9C27B0',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Broadcast Logout
        </button>
      </div>

      {/* Event Log */}
      {testEvents.length > 0 && (
        <div>
          <strong>Recent Events:</strong>
          <br />
          <div
            style={{
              maxHeight: '100px',
              overflowY: 'auto',
              background: '#2a2a2a',
              padding: '5px',
              marginTop: '5px',
              borderRadius: '4px',
            }}
          >
            {testEvents.slice(-5).map((event, index) => (
              <div key={index} style={{ marginBottom: '2px' }}>
                <span style={{ color: '#4CAF50' }}>{event.receivedAt}:</span> {event.type}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrossTabAuthTest;
