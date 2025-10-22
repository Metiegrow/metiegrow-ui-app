import axiosInstance from './config/axios.config';

/**
 * Authentication API Service
 * Raw API functions for authentication operations
 */

export const authApi = {
  /**
   * User login
   */
  login: async (credentials) => {
    const { data } = await axiosInstance.post('/api/auth/login', credentials);
    return data;
  },

  /**
   * User signup
   */
  signup: async (userData) => {
    const { data } = await axiosInstance.post('/api/auth/signUp', userData);
    return data;
  },

  /**
   * Register student
   */
  registerStudent: async (studentData) => {
    const { data } = await axiosInstance.post('/api/register/student', studentData);
    return data;
  },

  /**
   * User logout
   */
  logout: async () => {
    const { data } = await axiosInstance.post('/api/auth/logout');
    return data;
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    const { data } = await axiosInstance.get('/api/auth/me');
    return data;
  },

  /**
   * Reset password
   */
  resetPassword: async (resetData) => {
    const { data } = await axiosInstance.post('/api/reset-password', resetData);
    return data;
  },

  /**
   * Change password
   */
  changePassword: async (passwordData) => {
    const { data } = await axiosInstance.post('/api/change-password', passwordData);
    return data;
  },

  /**
   * Verify OTP
   */
  verifyOTP: async (otpData) => {
    const { data } = await axiosInstance.post('/api/verify-otp', otpData);
    return data;
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email) => {
    const { data } = await axiosInstance.post('/api/forgot-password', { email });
    return data;
  },

  /**
   * Authenticate (create token)
   */
  authenticate: async (credentials) => {
    const { data } = await axiosInstance.post('/api/authenticate', credentials);
    return data;
  },
};
