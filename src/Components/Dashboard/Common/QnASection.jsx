import React, { useState } from 'react';
import Card from './Cards/Card';
import { SearchOutlined, MessageOutlined } from '@ant-design/icons';

const QnASection = ({ userType }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sampleQuestions = [
    {
      id: 1,
      question: 'How to prepare for technical interviews?',
      answers: 12,
      category: 'Career',
      isResolved: true,
    },
    {
      id: 2,
      question: 'Best practices for React development?',
      answers: 8,
      category: 'Technology',
      isResolved: false,
    },
    {
      id: 3,
      question: 'How to handle work-life balance?',
      answers: 15,
      category: 'Lifestyle',
      isResolved: true,
    },
  ];

  const handleAskQuestion = () => {
    console.log('Ask new question');
    // Implement ask question logic
  };

  const handleViewQuestion = (questionId) => {
    console.log(`View question ${questionId}`);
    // Implement view question logic
  };

  return (
    <Card className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-xl font-bold'>Q&A</h2>
        <button
          onClick={handleAskQuestion}
          className='bg-[#BC5FFF] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#A82EFF] transition-colors'
        >
          Ask Question
        </button>
      </div>

      {/* Search Bar */}
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <SearchOutlined className='text-gray-400' />
        </div>
        <input
          type='text'
          placeholder='Search questions...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-3xl bg-[#1A1B24] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
        />
      </div>

      {/* Questions List */}
      <div className='space-y-4'>
        {sampleQuestions.map((question) => (
          <div
            key={question.id}
            className='bg-[#1A1B24] rounded-2xl p-4 cursor-pointer hover:bg-[#2A2A2A] transition-colors'
            onClick={() => handleViewQuestion(question.id)}
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <h3 className='text-white font-medium text-base mb-2'>{question.question}</h3>
                <div className='flex items-center space-x-4 text-sm text-gray-400'>
                  <span>{question.answers} answers</span>
                  <span className='px-2 py-1 bg-[#131313] rounded-lg'>{question.category}</span>
                </div>
              </div>

              <div className='flex items-center space-x-2 ml-4'>
                {question.isResolved && <div className='w-2 h-2 bg-[#50FFB9] rounded-full'></div>}
                <MessageOutlined className='text-gray-400' />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className='text-center'>
        <button className='text-[#50FFB9] text-sm font-medium hover:text-[#40E0A0] transition-colors'>
          View All Questions
        </button>
      </div>
    </Card>
  );
};

export default QnASection;
