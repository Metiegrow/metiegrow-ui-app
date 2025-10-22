import { useState, useEffect } from 'react';
import { ModalCloseIcon, BackButtonIcon } from '../Common/SVG/svg.function';
import { ArrowRight } from 'lucide-react';
import { Button, message } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { getAuthHeaders, getAuthData } from '../Auth/Auth.Function';

export default function AskQuestions() {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [questionType, setQuestionType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper function to get dashboard route based on user role
  const getDashboardRoute = (role) => {
    switch (role) {
      case 'mentor':
        return '/app/mentor-dashboard';
      case 'lawyer':
        return '/app/lawyer-dashboard';
      case 'alumni':
        return '/app/alumni-dashboard';
      case 'recruiter':
      case 'hr':
        return '/app/recruiter-dashboard';
      case 'pgowner':
      case 'realestate':
        return '/app/landlord-dashboard';
      default:
        return '/app/student-dashboard';
    }
  };

  // Get user role and determine dashboard route
  const getUserDashboardRoute = () => {
    try {
      const authData = getAuthData();

      if (!authData) {
        return '/app/student-dashboard';
      }

      // Check for userType first (most common)
      if (authData.userType) {
        const roleValue = authData.userType.replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(roleValue);
      }

      // Check for roles array
      if (authData.roles && Array.isArray(authData.roles) && authData.roles.length > 0) {
        const roleValue = authData.roles[0].replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(roleValue);
      }

      // Check for authorities array
      if (
        authData.authorities &&
        Array.isArray(authData.authorities) &&
        authData.authorities.length > 0
      ) {
        const authority = authData.authorities[0];
        const role = authority.replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(role);
      }

      // Default to student dashboard
      return '/app/student-dashboard';
    } catch (error) {
      console.error('Error getting user dashboard route:', error);
      return '/app/student-dashboard';
    }
  };

  // Get user ID from auth data
  const getUserId = () => {
    try {
      const authData = getAuthData();
      return authData?.userId || 1; // Fallback to 1 if not found
    } catch (error) {
      console.error('Error getting user ID:', error);
      return 1;
    }
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col sm:items-center sm:justify-center'>
      <div className='bg-[#111111] text-white rounded-none sm:rounded-xl w-full sm:max-w-lg h-full sm:h-auto px-4 sm:px-6 py-6 overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center gap-2 sm:justify-between sm:gap-0 mb-6'>
          {/* Mobile: back button */}
          <div className='flex items-center sm:hidden'>
            <Button
              onClick={() => navigate({ to: getUserDashboardRoute() })}
              className='mr-2 p-0 m-0 bg-transparent border-none shadow-none outline-none hover:bg-transparent focus:outline-none'
            >
              <BackButtonIcon className='w-6 h-6 text-white' />
            </Button>
            <h2 className='text-lg font-semibold'>Ask Free Questions</h2>
          </div>

          {/* Desktop: title and close icon */}
          <div className='hidden sm:flex justify-between w-full items-center'>
            <h2 className='text-lg font-semibold'>Ask Free Questions</h2>
            <Button
              onClick={() => navigate({ to: getUserDashboardRoute() })}
              className='p-0 m-0 bg-transparent border-none shadow-none outline-none'
            >
              <ModalCloseIcon className='w-5 h-5 text-white' />
            </Button>
          </div>
        </div>

        {/* Question Type */}
        <div className='mb-4'>
          <label className='block text-sm mb-1 font-medium'>
            Question Type <span className='text-red-500'>*</span>
          </label>
          <select
            className='w-full bg-[#1c1c1c] border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-[#979797] focus:outline-none'
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value=''>Select Type</option>
            <option value='General'>General</option>
            <option value='Technical'>Technical</option>
          </select>
        </div>

        {/* Question Title */}
        <div className='mb-4'>
          <label className='block text-sm mb-1 font-medium'>
            Question Title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            maxLength={40}
            className='w-full bg-[#1c1c1c] border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-[#979797] focus:outline-none'
            placeholder='Enter Text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='text-right text-xs text-gray-500 mt-1'>({title.length}/40)</div>
        </div>

        {/* Description */}
        <div className='mb-6'>
          <label className='block text-sm mb-1 font-medium'>
            Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            rows='4'
            maxLength={1000}
            className='w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-[#979797] focus:outline-none resize-none'
            placeholder='Typing...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className='text-right text-xs text-gray-500'>({description.length}/1000)</div>
        </div>

        {/* Submit Button */}
        <div className='fixed sm:relative bottom-6 left-0 right-0 px-4 sm:px-0 sm:bottom-0 sm:left-auto sm:right-auto flex justify-center sm:justify-end'>
          <Button
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition ${
              title && questionType && description
                ? 'bg-[#B721FF] text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!(title && questionType && description) || loading}
            onClick={async () => {
              if (!(title && questionType && description)) return;

              setLoading(true);
              try {
                const userId = getUserId();
                const questionData = {
                  questionType: questionType,
                  title: title,
                  description: description,
                  userId: userId,
                };

                const response = await axios.post(`${URL}/api/qna/questions`, questionData, {
                  headers: getAuthHeaders(),
                });

                if (response.data) {
                  message.success('Question submitted successfully!');
                  // Reset form
                  setQuestionType('');
                  setTitle('');
                  setDescription('');
                  // Navigate back to dashboard
                  navigate({ to: getUserDashboardRoute() });
                }
              } catch (error) {
                console.error('Error submitting question:', error);
                message.error('Failed to submit question. Please try again.');
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Submitting...' : 'Submit'} <ArrowRight className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
