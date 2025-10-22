import React, { useState } from 'react';
import { Modal, Button, Input, message, Divider } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QnAService } from '../../Services/QnAService';
import { getAuthData } from '../Auth/Auth.Function';
import { ThumbsUpIcon, CommentIcon, ForwardShareIcon } from '../Dashboard/Dashboard.svg';
import { Message2Icon } from '../Common/SVG/svg.function';

const { TextArea } = Input;

export default function QuestionDetailModal({ isOpen, onClose, questionId }) {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [answerText, setAnswerText] = useState('');
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const queryClient = useQueryClient();

  // Fetch question details
  const {
    data: question,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => QnAService.getQuestionById(questionId),
    enabled: !!questionId && isOpen,
  });

  // Create answer mutation
  const createAnswerMutation = useMutation({
    mutationFn: QnAService.createAnswer,
    onSuccess: () => {
      message.success('Answer posted successfully!');
      queryClient.invalidateQueries(['question', questionId]);
      queryClient.invalidateQueries(['questions']);
      setAnswerText('');
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to post answer');
    },
  });

  const handleSubmitAnswer = async () => {
    if (!answerText.trim()) {
      message.warning('Please enter an answer');
      return;
    }

    try {
      setIsSubmittingAnswer(true);
      const authData = getAuthData();

      if (!authData?.id) {
        message.error('Please login to post an answer');
        return;
      }

      const answerData = {
        questionId: questionId,
        text: answerText.trim(),
        userId: authData.id,
      };

      await createAnswerMutation.mutateAsync(answerData);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Modal
        title='Question Details'
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={800}
        className='question-detail-modal'
      >
        <div className='flex justify-center items-center h-64'>
          <div className='text-gray-400'>Loading...</div>
        </div>
      </Modal>
    );
  }

  if (error || !question) {
    return (
      <Modal
        title='Question Details'
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={800}
        className='question-detail-modal'
      >
        <div className='flex justify-center items-center h-64'>
          <div className='text-red-400'>Error loading question</div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title='Question Details'
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className='question-detail-modal'
    >
      <div className='max-h-[70vh] overflow-y-auto'>
        {/* Question Section */}
        <div className='bg-[#121212] rounded-2xl p-6 mb-6'>
          <div className='flex items-start gap-4 mb-4'>
            <div className='w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center'>
              {question.userCred?.profilePicUrl ? (
                <img
                  src={question.userCred.profilePicUrl.startsWith('http') ? question.userCred.profilePicUrl : `${URL}/${question.userCred.profilePicUrl}`}
                  alt={question.userCred?.firstName || question.username || 'User'}
                  className='w-full h-full rounded-full object-cover'
                  loading='lazy'
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : null}
              <span className='text-white font-semibold text-sm'>
                {question.userCred?.firstName?.[0] || question.username?.[0] || 'U'}
              </span>
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <h3 className='text-white text-lg font-semibold'>
                  {question.userCred?.firstName || question.username || 'Anonymous'}
                </h3>
                <span className='text-sm text-gray-400'>{question.userCred?.lastName || ''}</span>
                <span className='text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300'>
                  {question.questionType}
                </span>
              </div>
              <p className='text-sm text-gray-400'>{formatDate(question.createdAt)}</p>
            </div>
          </div>

          <div className='mb-4'>
            <h2 className='text-white text-xl font-semibold mb-2'>{question.title}</h2>
            <p className='text-gray-300 text-base leading-relaxed'>{question.description}</p>
          </div>

          <div className='flex items-center justify-between border-t border-[#2e2e2e] pt-4'>
            <div className='flex gap-6'>
              <div className='flex items-center gap-2 text-gray-400'>
                <ThumbsUpIcon />
                <span>0</span>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <Message2Icon />
                <span>{question.answers?.length || 0}</span>
              </div>
            </div>
            <div className='text-gray-400'>
              <ForwardShareIcon />
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className='mb-6'>
          <h3 className='text-white text-lg font-semibold mb-4'>
            Answers ({question.answers?.length || 0})
          </h3>

          {question.answers && question.answers.length > 0 ? (
            <div className='space-y-4'>
              {question.answers.map((answer) => (
                <div key={answer.id} className='bg-[#1a1a1a] rounded-xl p-4'>
                  <div className='flex items-start gap-3 mb-3'>
                    <div className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0'>
                      {answer.userCred?.profilePicUrl ? (
                        <img
                          src={answer.userCred.profilePicUrl.startsWith('http') ? answer.userCred.profilePicUrl : `${URL}/${answer.userCred.profilePicUrl}`}
                          alt={answer.userCred?.firstName || answer.username || 'User'}
                          className='w-full h-full rounded-full object-cover'
                          loading='lazy'
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : null}
                      <span className='text-white text-xs font-semibold'>
                        {answer.userCred?.firstName?.[0] || answer.username?.[0] || 'A'}
                      </span>
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-white font-medium'>
                          {answer.userCred?.firstName || answer.username || 'Anonymous'}
                        </span>
                        <span className='text-xs text-gray-400'>
                          {formatDate(answer.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className='text-gray-300 text-sm leading-relaxed ml-11'>{answer.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center text-gray-400 py-8'>
              No answers yet. Be the first to answer!
            </div>
          )}
        </div>

        {/* Answer Form */}
        <div className='bg-[#121212] rounded-2xl p-6'>
          <h4 className='text-white text-lg font-semibold mb-4'>Your Answer</h4>
          <TextArea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder='Share your knowledge and help others...'
            rows={4}
            className='mb-4'
          />
          <div className='flex justify-end'>
            <Button
              type='primary'
              onClick={handleSubmitAnswer}
              loading={isSubmittingAnswer}
              disabled={!answerText.trim()}
              className='bg-purple-600 hover:bg-purple-700'
            >
              Post Answer
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
