import { useState, useEffect } from 'react';
import { Input, message } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import Loginbanner from '../../assets/Loginbanner.png';
import { CheckBox, Message2Icon } from '../Common/SVG/svg.function';
import NeoButton from '../Common/Button/GoogleButton';
import LoginButton from '../Common/Button/LoginButton';
import LeftPanel from '../Common/LeftPanel';
import { routeAfterLogin } from '../Services/authRoutes';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  // ✅ Load saved credentials on mount
  useEffect(() => {
    const savedAuthData = localStorage.getItem('rememberCredentials');
    if (savedAuthData) {
      const { email: savedEmail, password: savedPassword } = JSON.parse(savedAuthData);
      setEmail(savedEmail || '');
      setPassword(savedPassword || '');
      setRememberMe(true);
    }

    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const validateForm = () => {
    if (!email) return { valid: false, message: 'Email is required.' };
    if (!email.includes('@'))
      return { valid: false, message: 'Please enter a valid email address.' };
    if (!password) return { valid: false, message: 'Password is required.' };
    if (password.length < 8)
      return {
        valid: false,
        message: 'Password must be at least 8 characters.',
      };
    return { valid: true };
  };

  const handleLogin = async (e) => {
    console.log('Login button clicked');
    e?.preventDefault();
    const validation = validateForm();
    if (!validation.valid) {
      messageApi.error(validation.message);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${URL}/api/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // ✅ Extract message safely from nested structure
        let errorMessage = 'Login failed. Please try again.';
        if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (Array.isArray(responseData?.statuses) && responseData.statuses.length > 0) {
          errorMessage = responseData.statuses[0]?.message || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const { token, userId, userName, imageUrl, roles } = responseData;

      let userType = 'student';
      if (roles?.length > 0) {
        const firstRole = roles[0];
        userType =
          typeof firstRole === 'string'
            ? firstRole.toLowerCase()
            : firstRole.role?.toLowerCase() || 'student';
      }

      const authData = {
        token,
        userId,
        fullName: userName,
        email,
        userType,
        roles,
        imageUrl,
      };

      if (rememberMe) {
        localStorage.setItem('authData', JSON.stringify(authData));
        localStorage.setItem('rememberCredentials', JSON.stringify({ email, password }));
      } else {
        sessionStorage.setItem('authData', JSON.stringify(authData));
        localStorage.removeItem('authData');
        localStorage.removeItem('rememberCredentials');
      }

      messageApi.success({
        content: 'Login successful!',
        duration: 2,
        style: { marginTop: '2vh' },
      });

      setTimeout(
        () =>
          routeAfterLogin(navigate, {
            token,
            userId,
            userName,
            imageUrl,
            roles,
          }),
        1000
      );
    } catch (error) {
      console.error('Login error:', error);
      messageApi.error({
        content: error.message || 'Login failed. Please try again.',
        duration: 3,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className='flex flex-col w-full min-h-screen bg-black md:flex-row'>
      {contextHolder}
      <LeftPanel slides={slides} currentSlide={currentSlide} />
      <div className='flex flex-col items-center justify-center w-full mt-12 md:w-1/2'>
        <div className='w-full max-w-md lg:max-w-md'>
          <h1 className='px-4 text-2xl text-white mb-7 sm:text-2xl font-open-sans'>
            Let's Get Started
          </h1>

          <form onSubmit={handleLogin}>
            <div className='px-4 mb-4 sm:mb-6'>
              <label className='block mb-2 text-sm text-white sm:text-base'>Email Address</label>
              <div className='relative'>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='surya@xyz.com'
                  className='w-full px-4 py-2 pr-10 text-white placeholder-gray-400 bg-black border rounded-full border-borders sm:py-3 focus:ring-2 focus:ring-purple-500'
                />
                <div className='absolute inset-y-0 flex items-center right-3'>
                  <Message2Icon size={18} className='text-gray-400' />
                </div>
              </div>
            </div>

            <div className='px-4 mb-4 sm:mb-6'>
              <label className='block mb-2 text-sm text-white sm:text-base'>Password</label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='***********'
                  className='w-full px-4 py-2 pr-10 placeholder-gray-400 border rounded-full text-textgray border-borders sm:py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
                <a
                  className='absolute inset-y-0 flex items-center right-3 cursor-pointer'
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <Eye size={18} className='text-gray-400' />
                  ) : (
                    <EyeOff size={18} className='text-gray-400' />
                  )}
                </a>
              </div>
            </div>

            <div className='flex items-center justify-between px-4 mb-8 sm:mb-6'>
              <div className='flex items-center'>
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center mr-2 cursor-pointer ${rememberMe ? 'bg-green' : 'border border-green'
                    }`}
                  onClick={() => setRememberMe(!rememberMe)}
                  role='checkbox'
                  aria-checked={rememberMe}
                >
                  <CheckBox checked={rememberMe} size={14} className='text-white' />
                </div>
                <span className='text-sm sm:text-base text-[#CFCFCF]'>Remember me</span>
              </div>
              <a href='/forgot-password' className='no-underline text-founday text-md sm:text-base'>
                Forgot Password?
              </a>
            </div>

            <div className='flex items-center justify-between px-4 mb-4 sm:mb-6'>
              <LoginButton
                type='submit'
                text={isLoading ? 'Logging in...' : 'Login'}
                disabled={isLoading}
                loading={isLoading}
                onClick={handleLogin}
              />
            </div>
          </form>

          <div className='mt-6 text-center'>
            <p className='mb-8 text-lg text-white sm:text-base sm:mb-6'>
              You don't have an account?{' '}
              <a href='/Signup' className='no-underline text-founday'>
                Sign Up
              </a>
            </p>
            <div className='flex items-center justify-between p-4 mb-4 sm:mb-6'>
              <NeoButton
                text='Continue with Google'
                alt='Google'
                onClick={() => navigate({ to: '/signin-google' })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
