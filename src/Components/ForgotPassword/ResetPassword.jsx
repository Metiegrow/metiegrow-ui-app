import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { resetPassword } from '../Services/AuthService';
import { Button, Input, message } from 'antd';
import LoginButton from '../Common/Button/LoginButton';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Eye, EyeOff } from 'lucide-react';
import LeftPanel from '../Common/LeftPanel';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const slides = [
    {
      title: 'Better grades start with better days!',
      subtitle: 'Consistent effort and effective success',
    },
    {
      title: 'Track assignments with ease',
      subtitle: 'Never miss a deadline with smart notifications',
    },
    {
      title: 'Connect with study groups',
      subtitle: 'Collaborate and learn together with classmates',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('resetEmail');
    if (!storedEmail) {
      navigate({ to: '/forgot-password' });
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  const validatePassword = (password) => {
    // Minimum 8 characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setError('Password must be at least 8 characters with at least one letter and one number');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await resetPassword(email, newPassword, confirmPassword);
      sessionStorage.removeItem('resetEmail');
      message.success(response.message || 'Password reset successfully');
      navigate({
        to: '/login',
        search: { message: 'Password reset successful. Please login with your new password.' },
      });
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col md:flex-row w-full min-h-screen bg-black'>
      {/* Left panel - Only visible on larger screens */}
      <LeftPanel slides={slides} />

      {/* Right panel - Reset password form */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center mt-20'>
        <div className='w-full max-w-sm lg:max-w-md'>
          <div className='mb-2 px-4'>
            <a
              onClick={() => navigate({ to: '/verify-otp' })}
              className='cursor-pointer flex items-center text-white hover:text-purple-500 transition duration-200'
            >
              <BackButtonIcon className='w-5 h-5 text-white' />
            </a>
          </div>

          <h1 className='text-white text-2xl font-bold mb-0 px-4'>Set New Password</h1>

          {error && <div className='mb-4 text-red-400 text-sm'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='mb-4 px-4'>
              <label htmlFor='newPassword' className='block text-white mb-2'>
                New Password
              </label>
              <div className='relative'>
                <Input
                  id='newPassword'
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400'
                  placeholder='*********'
                  required
                />
                <a
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className='w-5 h-5 text-gray-400' />
                  ) : (
                    <Eye className='w-5 h-5 text-gray-400' />
                  )}
                </a>
              </div>
              <p className='text-gray-500 text-xs mt-1 px-4'>
                Minimum 8 characters with at least one letter and one number
              </p>
            </div>

            <div className='mb-6 px-4'>
              <label htmlFor='confirmPassword' className='block text-white mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <Input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400'
                  placeholder='*********'
                  required
                />
                <a
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className='w-5 h-5 text-gray-400' />
                  ) : (
                    <Eye className='w-5 h-5 text-gray-400' />
                  )}
                </a>
              </div>
            </div>
            <div className='flex justify-between mb-4 sm:mb-6 items-center px-4'>
              <LoginButton
                type='submit'
                text={isLoading ? 'Resetting...' : 'Confirm'}
                loading={isLoading}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
