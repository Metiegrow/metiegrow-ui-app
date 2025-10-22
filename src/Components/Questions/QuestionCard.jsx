import React, { useState } from 'react';
import { ForwardShareIcon, ThumbsUpIcon } from '../Dashboard/Dashboard.svg';
import { Message2Icon } from '../Common/SVG/svg.function';
import TypeQuestionsReplyDrawer from './TypeQuestionsReplyDrawer';
// QuestionDetailModal removed per request

export default function QuestionCard({ question }) {
  const [showReplyDrawer, setShowReplyDrawer] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  const handleReplyClick = () => {
    setActiveQuestionId(question.id);
    setShowReplyDrawer(true);
  };

  return (
    <>
      {/* Question Card */}
      <div className='bg-[#121212] rounded-2xl px-5 py-4 mb-4 shadow-sm'>
        {/* Header Section */}
        <div className='flex items-start justify-between mb-3'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center'>
              <span className='text-white font-semibold'>
                {question.userCred?.firstName?.[0] || 'U'}
              </span>
            </div>
            <div>
              <h3 className='text-white text-base font-semibold leading-tight'>{question.title}</h3>
              <p className='text-sm text-gray-400'>{question.questionType}</p>
            </div>
          </div>
          <p className='text-sm text-gray-500'>
            {new Date(question.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Question Content */}
        <p className='text-white text-base leading-relaxed mb-3'>
          <span className='font-medium'>Q.</span> {question.description}
        </p>

        {/* Footer Section */}
        <div className='flex items-center justify-between border-t border-[#2e2e2e] pt-4'>
          <div className='flex gap-5'>
            <div className='flex items-center gap-1 text-sm text-white'>
              <ThumbsUpIcon />
              <span>0</span>
            </div>
            <div
              className='flex items-center gap-1 text-sm text-white cursor-pointer hover:text-purple-400 transition-colors'
              onClick={handleReplyClick}
            >
              <Message2Icon />
              <span>{question.answers?.length || 0}</span>
            </div>
          </div>
          <div className='text-white'>
            <ForwardShareIcon />
          </div>
        </div>
      </div>

      <TypeQuestionsReplyDrawer
        isOpen={showReplyDrawer}
        onClose={() => setShowReplyDrawer(false)}
        questionId={activeQuestionId}
      />
    </>
  );
}
