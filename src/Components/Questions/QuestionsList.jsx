import React from 'react';
import QuestionCard from './QuestionCard';
import { NoDataIcon } from '../Common/SVG/svg.function';

export default function QuestionsList({ questions, loading, error }) {
  if (loading) {
    return (
      <div className='flex items-center justify-center h-40'>
        <div className='text-gray-400'>Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-40'>
        <div className='text-red-400'>Error loading questions</div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className='flex items-center justify-center h-40'>
        <div className='text-center'>
          <NoDataIcon />
          <p className='text-gray-400 mt-2'>No questions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {questions.slice(0, 3).map((question, idx) => (
        <QuestionCard key={question.id || idx} question={question} />
      ))}
    </div>
  );
}
