import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

const Answers = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${URL}/api/mentee/questions`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = () => {
    navigate({ to: '/ask-question' });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-black text-white p-4 md:p-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md'>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white p-4 md:p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl font-bold'>Questions & Answers</h1>
          <button
            onClick={handleAskQuestion}
            className='bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-colors'
          >
            Ask a Question
          </button>
        </div>

        {questions.length === 0 ? (
          <div className='bg-gray-900 bg-opacity-50 rounded-lg p-6 text-center'>
            <p className='text-gray-400'>No questions found. Be the first to ask a question!</p>
          </div>
        ) : (
          <div className='space-y-6'>
            {questions.map((question) => (
              <div key={question.id} className='bg-gray-900 bg-opacity-50 rounded-lg p-6'>
                <div className='mb-4'>
                  <h2 className='text-xl font-semibold text-purple-500'>
                    {question.questionHeading}
                  </h2>
                  <p className='text-gray-400 mt-2'>{question.questionHeadingBrief}</p>
                </div>

                {question.answers && question.answers.length > 0 ? (
                  <div className='mt-4 border-t border-gray-700 pt-4'>
                    <h3 className='text-lg font-medium mb-3'>Answers</h3>
                    <div className='space-y-4'>
                      {question.answers.map((answer, index) => (
                        <div key={index} className='bg-gray-800 rounded-lg p-4'>
                          <p className='text-gray-300'>{answer.content}</p>
                          <div className='mt-2 text-sm text-gray-500'>
                            Answered by: {answer.authorName}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='mt-4 text-gray-500 italic'>No answers yet</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Answers;
