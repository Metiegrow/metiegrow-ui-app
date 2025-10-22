import { useState, useEffect } from 'react';
import { getAuthData } from '../../Auth/Auth.Function';

export const useUserRole = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const detectUserRole = () => {
      try {
        setLoading(true);
        setError(null);

        const authData = getAuthData();

        if (!authData) {
          setUserRole('guest');
          return;
        }

        // Check for userType first (most common)
        if (authData.userType) {
          setUserRole(authData.userType.toLowerCase());
          return;
        }

        // Check for roles array
        if (authData.roles && Array.isArray(authData.roles) && authData.roles.length > 0) {
          setUserRole(authData.roles[0].toLowerCase());
          return;
        }

        // Check for authorities array
        if (
          authData.authorities &&
          Array.isArray(authData.authorities) &&
          authData.authorities.length > 0
        ) {
          const authority = authData.authorities[0];
          // Remove 'ROLE_' prefix if present
          const role = authority.replace('ROLE_', '').toLowerCase();
          setUserRole(role);
          return;
        }

        // Default to student if no role detected
        setUserRole('student');
      } catch (error) {
        console.error('Error detecting user role:', error);
        setError(error.message);
        setUserRole('student'); // Default fallback
      } finally {
        setLoading(false);
      }
    };

    detectUserRole();
  }, []);

  // Helper functions
  const isStudent = () => userRole === 'student' || userRole === 'user';
  const isMentor = () => userRole === 'mentor';
  const isLawyer = () => userRole === 'lawyer';
  const isAlumni = () => userRole === 'alumni';
  const isHR = () => userRole === 'hr' || userRole === 'hr-recruiter';
  const isAdmin = () => userRole === 'admin' || userRole === 'appadmin';
  const isRealEstate = () =>
    userRole === 'realestate' || userRole === 'landlord' || userRole === 'pgowner';
  const isGuest = () => userRole === 'guest' || !userRole;

  return {
    userRole,
    loading,
    error,
    isStudent,
    isMentor,
    isLawyer,
    isAlumni,
    isHR,
    isAdmin,
    isRealEstate,
    isGuest,
  };
};

export default useUserRole;
