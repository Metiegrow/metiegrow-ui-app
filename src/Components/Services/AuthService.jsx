// services/authService.js

import { getAuthHeaders } from '../Auth/Auth.Function';

const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${URL}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to request password reset');
    }

    return await response.json();
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch(`${URL}/api/verifyotp`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
        otp: parseInt(otp, 10),
      }),
    });

    if (!response.ok) {
      throw new Error('OTP verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
};

export const resetPassword = async (email, newPassword, confirmPassword) => {
  try {
    const response = await fetch(`${URL}/api/reset-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
        newPassword,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      throw new Error('Password reset failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};
