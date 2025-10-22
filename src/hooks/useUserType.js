// import { useState, useEffect } from 'react';

// export const useUserType = () => {
//   const [userType, setUserType] = useState('student');

//   useEffect(() => {
//     // Get user type from auth data (localStorage or sessionStorage)
//     const authData = localStorage.getItem('authData') || sessionStorage.getItem('authData');
//     if (authData) {
//       try {
//         const parsedAuthData = JSON.parse(authData);
//         if (parsedAuthData.userType) {
//           setUserType(parsedAuthData.userType);
//         }
//       } catch (error) {
//         console.error('Error parsing auth data:', error);
//       }
//     }
//   }, []);

//   const updateUserType = (newUserType) => {
//     setUserType(newUserType);
//     // Update auth data in storage
//     const authData = localStorage.getItem('authData') || sessionStorage.getItem('authData');
//     if (authData) {
//       try {
//         const parsedAuthData = JSON.parse(authData);
//         parsedAuthData.userType = newUserType;
//         const storage = localStorage.getItem('authData') ? localStorage : sessionStorage;
//         storage.setItem('authData', JSON.stringify(parsedAuthData));
//       } catch (error) {
//         console.error('Error updating auth data:', error);
//       }
//     }
//   };

//   return {
//     userType,
//     updateUserType
//   };
// };
