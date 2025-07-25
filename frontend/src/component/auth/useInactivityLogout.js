// src/component/auth/useInactivityLogout.js
import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust path if necessary, assuming firebase.js is at root/firebase.js

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 10 minutes in milliseconds

// Accept 'user' as a prop
const useInactivityLogout = (user) => { // <--- Added user parameter
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken'); // Good to clear local storage token too
      alert('You have been logged out due to inactivity.');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error during auto-logout:', error);
      // Even if there's an error signing out from Firebase, still redirect
      navigate('/login');
    }
  }, [navigate]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);
  }, [logout]);

  useEffect(() => {
    // Only set up activity listeners if a user is logged in
    if (user) { // <--- Conditional logic moved INSIDE useEffect
      const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

      activityEvents.forEach(event => {
        window.addEventListener(event, resetTimer);
      });

      // Start the initial timer when user logs in
      resetTimer();

      // Clean up event listeners and timer when the component unmounts or user logs out
      return () => {
        activityEvents.forEach(event => {
          window.removeEventListener(event, resetTimer);
        });
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      // If no user, ensure any existing timer is cleared
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [user, resetTimer]); // <--- Dependency on 'user' ensures effect re-runs when user logs in/out

  return null; // This hook doesn't render anything, just manages side effects
};

export default useInactivityLogout;