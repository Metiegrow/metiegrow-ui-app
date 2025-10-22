import { getAuthHeaders } from '../Auth/Auth.Function';

const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${URL}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ...getAuthHeaders(),
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to request password reset');
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
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        email,
        otp: parseInt(otp, 10),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'OTP verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
};

export const resetPassword = async (email, newPassword, confirmPassword) => {
  try {
    const response = await fetch(`${URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        email,
        newPassword,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password reset failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};
