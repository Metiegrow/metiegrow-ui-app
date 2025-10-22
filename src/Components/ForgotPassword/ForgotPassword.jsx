import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { forgotPassword } from '../Services/AuthService';
import { Button, Input, message } from 'antd';
import { BackButtonIcon, CheckBox, LogoIcon, Message2Icon } from '../Common/SVG/svg.function';
import LoginButton from '../Common/Button/LoginButton';
import Loginbanner from '../../assets/Loginbanner.png';
import { MessageIcon } from '../Stay/NeedRoomCommon.svg';
import LeftPanel from '../Common/LeftPanel';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
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

  // Clear any stored email when component mounts
  useEffect(() => {
    sessionStorage.removeItem('resetEmail');
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      message.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await forgotPassword(email);
      sessionStorage.setItem('resetEmail', email);
      message.success(response.message || 'OTP sent to your email');
      navigate({ to: '/verify-otp' });
    } catch (err) {
      message.error(err.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full min-h-screen bg-black md:flex-row md:p-0'>
      {/* Left panel - Only visible on larger screens */}
      <LeftPanel slides={slides} />

      {/* Right panel - Forgot password form */}
      <div className='flex flex-col items-center justify-center w-full mt-10 md:w-1/2 md:mt-5'>
        <div className='w-full max-w-sm lg:max-w-md'>
          <div className='mb-8'>
            <a
              onClick={() => navigate({ to: '/login' })}
              className='flex items-center px-4 text-white transition duration-200 cursor-pointer hover:text-purple-500'
            >
              <BackButtonIcon className='w-5 h-5 text-white' />
            </a>
          </div>

          <h1 className='px-4 mb-8 text-2xl font-bold text-white'>Forgot Password</h1>

          {/* Inline error removed; using antd message for toasts */}

          <form onSubmit={handleSubmit}>
            <div className='px-4 mb-6'>
              <label htmlFor='email' className='block mb-4 text-white text-md '>
                Email Address
              </label>
              <div className='relative'>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full py-4 text-white placeholder-gray-400 bg-black border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='email@example.com'
                  required
                />
                <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                  <Message2Icon />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between px-4 mb-4 sm:mb-6'>
              <LoginButton
                type='submit'
                text={isLoading ? 'Sending...' : 'Submit'}
                disabled={isLoading}
                loading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
