import React, { useState, useEffect } from 'react';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';
import { MessageSquare, ThumbsUp, User, Calendar } from 'lucide-react';
import { Button, message } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { getAuthHeaders, getAuthData } from '../Auth/Auth.Function';

export default function QuestionsLists() {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${URL}/api/qna/questions`, {
        headers: getAuthHeaders(),
      });

      if (response.data) {
        setQuestions(response.data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again.');
      message.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Format date from timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4'></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-500 mb-4'>{error}</p>
          <Button onClick={fetchQuestions} className='bg-purple-600 hover:bg-purple-700 text-white'>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-gray-800'>
        <div className='flex items-center'>
          <Button
            onClick={() => navigate({ to: getUserDashboardRoute() })}
            className='mr-3 p-0 bg-transparent border-none'
          >
            <BackButtonIcon className='w-6 h-6 text-white' />
          </Button>
          <h1 className='text-xl font-semibold'>Questions</h1>
        </div>
        <Button
          onClick={() => navigate({ to: '/app/ask-questions' })}
          className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full'
        >
          Ask Question
        </Button>
      </div>

      {/* Questions List */}
      <div className='p-4'>
        {questions.length === 0 ? (
          <div className='text-center py-12'>
            <MessageSquare className='w-16 h-16 text-gray-600 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-400 mb-2'>No questions yet</h3>
            <p className='text-gray-500 mb-6'>Be the first to ask a question!</p>
            <Button
              onClick={() => navigate({ to: '/app/ask-questions' })}
              className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full'
            >
              Ask a Question
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            {questions.map((question) => (
              <div
                key={question.id}
                className='bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer'
                onClick={() => navigate({ to: `/app/questions/${question.id}` })}
              >
                {/* Question Header */}
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center'>
                      <User className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <p className='font-medium text-white'>
                        {question.userCred?.firstName || 'Anonymous'}
                      </p>
                      <div className='flex items-center gap-2 text-sm text-gray-400'>
                        <Calendar className='w-4 h-4' />
                        <span>{formatDate(question.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <span className='px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs font-medium'>
                    {question.questionType}
                  </span>
                </div>

                {/* Question Content */}
                <div className='mb-3'>
                  <h3 className='text-lg font-semibold text-white mb-2'>{question.title}</h3>
                  <p className='text-gray-300 text-sm line-clamp-2'>{question.description}</p>
                </div>

                {/* Question Stats */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4 text-sm text-gray-400'>
                    <div className='flex items-center gap-1'>
                      <MessageSquare className='w-4 h-4' />
                      <span>{question.answers?.length || 0} answers</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <ThumbsUp className='w-4 h-4' />
                      <span>0 likes</span>
                    </div>
                  </div>
                  <Button
                    size='small'
                    className='text-purple-400 hover:text-purple-300 bg-transparent border-none p-0'
                  >
                    View Details →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
