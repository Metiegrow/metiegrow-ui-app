import React, { useState } from 'react';
import { Pagination, Select } from 'antd';
import AskQuestionModal from '../Questions/AskQuestionModal';
import PostCard from '../Questions/PostCard';
import TypeQuestionsReplyDrawer from '../Questions/TypeQuestionsReplyDrawer';
import { useQuestions, useQuestionActions, usePagination } from '../../hooks';

const { Option } = Select;

export default function QuestionsCardLists() {
  // Pagination logic
  const { currentPage, pageSize, paginationParams, handlePageChange, handlePageSizeChange } =
    usePagination({
      initialPage: 1,
      initialPageSize: 12,
      zeroIndexed: true, // Backend uses 0-indexed pages
    });

  // Modal/Drawer state
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // Fetch questions with pagination
  const {
    data: questionsData,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
    error: questionsError,
  } = useQuestions(paginationParams);

  // Question actions (like/dislike)
  const { handleQuestionLike } = useQuestionActions();

  const handleCommentClick = (questionId) => {
    setSelectedQuestionId(questionId);
    setIsReplyOpen(true);
  };

  const handleReplyClose = () => {
    setIsReplyOpen(false);
    setSelectedQuestionId(null);
  };

  const handleAskModalClose = () => {
    setIsAskModalOpen(false);
  };

  if (isQuestionsLoading) {
    return (
      <div className='min-h-screen bg-black p-4 md:p-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4'></div>
              <p className='text-gray-400'>Loading questions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isQuestionsError) {
    return (
      <div className='min-h-screen bg-black p-4 md:p-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center bg-red-900/20 border border-red-500/50 rounded-lg p-6'>
              <p className='text-red-400'>Error loading questions</p>
              <p className='text-gray-400 text-sm mt-2'>{questionsError?.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalQuestions = questionsData?.paginationMeta?.totalCount || 0;
  const questions = questionsData?.data || [];

  // console.log('Questions Data:', questionsData);

  return (
    <div className='min-h-screen bg-black p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-purple-600/30'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-1'>Questions & Answers</h1>
            <p className='text-gray-400 text-sm'>Ask questions and get answers from experts</p>
          </div>
          <button
            onClick={() => setIsAskModalOpen(true)}
            className='text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-full px-6 py-2.5 font-medium transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50'
          >
            Ask Question
          </button>
        </div>

        {/* Page Size Selector */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gray-900/50 border border-purple-600/20 rounded-lg p-4'>
          <div className='text-gray-300 font-medium'>
            Showing <span className='text-purple-400'>{questions.length}</span> of{' '}
            <span className='text-purple-400'>{totalQuestions}</span> questions
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-gray-400 text-sm'>Items per page:</span>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              style={{ width: 80 }}
              className='custom-select'
            >
              {/* <Option value={6}>6</Option> */}
              <Option value={12}>12</Option>
              <Option value={24}>24</Option>
              <Option value={48}>48</Option>
              <Option value={60}>60</Option>
            </Select>
          </div>
        </div>

        {/* Questions Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <PostCard
                key={question.id || index}
                name={question.user?.name}
                field={question.questionType}
                timeAgo={new Date(question.createdAt).toLocaleDateString()}
                question={question.description}
                likes={question.likeCount ?? 0}
                answers={question.answerCount ?? 0}
                isLiked={question?.isLiked}
                onCommentClick={() => handleCommentClick(question.id)}
                onLikeClick={() => handleQuestionLike(question.id, question?.isLiked)}
              />
            ))
          ) : (
            <div className='col-span-full flex flex-col items-center justify-center py-16 px-4'>
              <div className='bg-gray-900/50 border-2 border-dashed border-purple-600/30 rounded-xl p-12 text-center max-w-md'>
                <div className='text-6xl mb-4'>💭</div>
                <h3 className='text-xl font-semibold text-white mb-2'>No questions yet</h3>
                <p className='text-gray-400 mb-6'>Be the first to ask a question!</p>
                <button
                  onClick={() => setIsAskModalOpen(true)}
                  className='text-white bg-purple-600 hover:bg-purple-700 rounded-full px-6 py-2 font-medium transition-colors'
                >
                  Ask First Question
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalQuestions > 0 && (
          <div className='flex justify-center py-8'>
            <div className='bg-gray-900/50 border border-purple-600/20 rounded-lg px-6 py-4'>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalQuestions}
                onChange={handlePageChange}
                showSizeChanger={false}
                showTotal={(total, range) => (
                  <span className='text-gray-300 mr-4'>
                    {range[0]}-{range[1]} of {total} questions
                  </span>
                )}
                className='custom-pagination'
              />
            </div>
          </div>
        )}
      </div>

      {/* Right-side Reply Drawer */}
      <TypeQuestionsReplyDrawer
        isOpen={isReplyOpen}
        onClose={handleReplyClose}
        questionId={selectedQuestionId}
      />

      {/* Ask Question Modal */}
      <AskQuestionModal isOpen={isAskModalOpen} onClose={handleAskModalClose} />
    </div>
  );
}
