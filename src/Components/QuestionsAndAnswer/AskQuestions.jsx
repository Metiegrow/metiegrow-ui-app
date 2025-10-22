import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

const AskQuestions = () => {
  const [questionData, setQuestionData] = useState({
    id: '',
    questionHeading: '',
    questionHeadingBrief: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:9001/api/mentee/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      const data = await response.json();
      setSuccess(true);
      // Optionally navigate to answers page or clear form
      setQuestionData({
        id: '',
        questionHeading: '',
        questionHeadingBrief: '',
      });

      // Navigate to answers page after successful submission
      setTimeout(() => {
        navigate({ to: '/answers' });
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-black text-white p-4 md:p-6'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-2xl font-bold mb-8'>Ask a Question</h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='bg-gray-900 bg-opacity-50 rounded-lg p-6'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1 text-white'>
                  Question ID <span className='text-purple-500'>*</span>
                </label>
                <input
                  type='text'
                  name='id'
                  value={questionData.id}
                  onChange={handleInputChange}
                  placeholder='Enter question ID'
                  className='w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-white'>
                  Question Heading <span className='text-purple-500'>*</span>
                </label>
                <input
                  type='text'
                  name='questionHeading'
                  value={questionData.questionHeading}
                  onChange={handleInputChange}
                  placeholder='Enter your question'
                  className='w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-white'>
                  Question Brief <span className='text-purple-500'>*</span>
                </label>
                <textarea
                  name='questionHeadingBrief'
                  value={questionData.questionHeadingBrief}
                  onChange={handleInputChange}
                  placeholder='Provide more details about your question'
                  className='w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 min-h-[100px]'
                  required
                />
              </div>
            </div>

            {error && (
              <div className='mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-md'>
                {error}
              </div>
            )}

            {success && (
              <div className='mt-4 p-3 bg-green-500 bg-opacity-20 border border-green-500 text-green-500 rounded-md'>
                Question submitted successfully!
              </div>
            )}

            <div className='flex justify-end mt-6'>
              <button
                type='submit'
                disabled={loading}
                className='bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors flex items-center'
              >
                {loading ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Question'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestions;
