import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { forgotPassword, verifyOtp } from '../Services/AuthService';
import { BackButtonIcon, LogoIcon } from '../Common/SVG/svg.function';
import { Input } from 'antd';
import LoginButton from '../Common/Button/LoginButton';
import Loginbanner from '../../assets/Loginbanner.png';
import LeftPanel from '../Common/LeftPanel';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [currentSlide, setCurrentSlide] = useState(0);
  const refs = Array(6)
    .fill()
    .map(() => useRef());
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
    refs[0].current?.focus();

    // Countdown timer for resend OTP
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      refs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);
      await forgotPassword(email);
      setError('');
      setResendDisabled(true);
      setCountdown(30);

      // Restart countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits of the OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await verifyOtp(email, otpValue);
      navigate({ to: '/reset-password' });
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    navigate({ to: '/forgot-password' });
  };

  return (
    <div className='flex flex-col md:flex-row w-full min-h-screen bg-black '>
      <LeftPanel slides={slides} />

      {/* Right panel - OTP verification form */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center mt-20'>
        <div className='w-full max-w-sm lg:max-w-md'>
          <div className='mb-2 px-4'>
            <a
              onClick={() => navigate({ to: '/forgot-password' })}
              className='cursor-pointer flex items-center text-white hover:text-purple-500 transition duration-200'
            >
              <BackButtonIcon className='w-5 h-5 text-white' />
            </a>
          </div>

          <h1 className='text-white text-2xl font-bold mb-0 px-4'>Verify your Number</h1>

          <div className='mb-6 flex items-center px-4'>
            <p className='text-gray-400'>OTP sent to {email}</p>
            <a
              onClick={handleEdit}
              className='ml-2 text-purple-400 text-sm hover:text-purple-300 focus:outline-none'
            >
              Edit
            </a>
          </div>

          {error && <div className='mb-4 text-red-400 text-sm'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='flex justify-between mb-6 space-x-2 sm:space-x-4 px-4'>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={refs[index]}
                  type='text'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className='w-10 h-14 sm:w-12 sm:h-16 bg-black border-2 border-[#646464] text-white text-center text-2xl rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
              ))}
            </div>

            <div className='mb-6 px-4'>
              <a
                type='button'
                onClick={handleResend}
                disabled={resendDisabled || isLoading}
                className={`text-sm focus:outline-none ${
                  resendDisabled ? 'text-gray-500' : 'text-purple-400 hover:text-purple-300'
                }`}
              >
                {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </a>
            </div>
            <div className='flex justify-between mb-4 sm:mb-6 items-center px-4'>
              <LoginButton
                type='submit'
                text='Verify Now'
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

export default VerifyOTP;
