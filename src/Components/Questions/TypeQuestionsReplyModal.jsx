import React, { useState } from 'react';
import { Modal, Button, Input, message, Avatar } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QnAService } from '../../Services/QnAService';
import { getAuthData } from '../Auth/Auth.Function';
import { ThumbsUpIcon, CommentIcon, ForwardShareIcon } from '../Dashboard/Dashboard.svg';
import { Message2Icon } from '../Common/SVG/svg.function';

const { TextArea } = Input;

export default function TypeQuestionsReplyModal({ isOpen, onClose, questionId }) {
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const queryClient = useQueryClient();

  // Fetch question details
  const { data: question, isLoading, error } = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => QnAService.getQuestionById(questionId),
    enabled: !!questionId && isOpen,
  });

  // Create answer mutation
  const createAnswerMutation = useMutation({
    mutationFn: QnAService.createAnswer,
    onSuccess: () => {
      message.success('Reply posted successfully!');
      queryClient.invalidateQueries(['question', questionId]);
      queryClient.invalidateQueries(['questions']);
      setReplyText('');
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to post reply');
    },
  });

  const handleSubmitReply = async () => {
    if (!replyText.trim()) {
      message.warning('Please enter a reply');
      return;
    }

    try {
      setIsSubmittingReply(true);
      const authData = getAuthData();
      
      if (!authData?.id) {
        message.error('Please login to post a reply');
        return;
      }

      const answerData = {
        questionId: questionId,
        text: replyText.trim(),
        userId: authData.id
      };

      await createAnswerMutation.mutateAsync(answerData);
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Modal
        title=""
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={560}
        className="type-questions-reply-modal"
        styles={{
          body: { padding: 0, backgroundColor: '#050505' },
          content: { backgroundColor: '#050505' }
        }}
      >
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-400">Loading...</div>
        </div>
      </Modal>
    );
  }

  if (error || !question) {
    return (
      <Modal
        title=""
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={560}
        className="type-questions-reply-modal"
        styles={{
          body: { padding: 0, backgroundColor: '#050505' },
          content: { backgroundColor: '#050505' }
        }}
      >
        <div className="flex justify-center items-center h-64">
          <div className="text-red-400">Error loading question</div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title=""
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={560}
      className="type-questions-reply-modal"
      styles={{
        body: { padding: 0, backgroundColor: '#050505' },
        content: { backgroundColor: '#050505' }
      }}
    >
      <div className="bg-[#050505] rounded-2xl p-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Questions</h2>
            <p className="text-gray-400 text-base">Manage your replies and reactions</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2.66667C8.63621 2.66667 2.66667 8.63621 2.66667 16C2.66667 23.3638 8.63621 29.3333 16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63621 23.3638 2.66667 16 2.66667ZM21.3333 20.6667L20.6667 21.3333L16 16.6667L11.3333 21.3333L10.6667 20.6667L15.3333 16L10.6667 11.3333L11.3333 10.6667L16 15.3333L20.6667 10.6667L21.3333 11.3333L16.6667 16L21.3333 20.6667Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Question Card */}
        <div className="bg-[#232323] rounded-2xl p-4 mb-6">
          {/* Question Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {question.userCred?.firstName?.[0] || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-medium text-base">
                  {question.userCred?.firstName || 'Anonymous'}
                </h3>
                <span className="text-gray-400 text-xs">
                  {question.userCred?.lastName || ''}
                </span>
              </div>
              <p className="text-gray-400 text-xs">
                {question.questionType}
              </p>
            </div>
            <p className="text-gray-400 text-xs">
              {formatDate(question.createdAt)}
            </p>
          </div>

          {/* Question Content */}
          <p className="text-white text-base font-medium mb-4">
            Q. {question.description}
          </p>

          {/* Question Footer */}
          <div className="flex items-center justify-between border-t border-[#4C4C4C] pt-4">
            <div className="flex gap-6">
              <div className="flex items-center gap-1">
                <ThumbsUpIcon />
                <span className="text-gray-400 text-sm">123</span>
              </div>
              <div className="flex items-center gap-1">
                <Message2Icon />
                <span className="text-gray-400 text-sm">20</span>
              </div>
            </div>
            <ForwardShareIcon />
          </div>
        </div>

        {/* Responses Section */}
        <div className="mb-6">
          <h3 className="text-white text-xl font-semibold mb-4">
            Responses({question.answers?.length || 0})
          </h3>
          
          {question.answers && question.answers.length > 0 ? (
            <div className="space-y-6">
              {question.answers.map((answer) => (
                <div key={answer.id} className="bg-[#232323] rounded-2xl p-4">
                  {/* Response Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-gray-400 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {answer.userCred?.firstName?.[0] || 'A'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold text-base">
                          {answer.userCred?.firstName || 'Anonymous'}
                        </h4>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L9.5 3.5L13.5 3.5L10.5 6L11.5 10L8 8L4.5 10L5.5 6L2.5 3.5L6.5 3.5L8 0Z" fill="#50FFB9"/>
                          </svg>
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs">
                        Student TAC university
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-11 h-11 rounded-full bg-[#BC5FFF] flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 3.58L2 20.42C2 21.28 2.72 22 3.58 22L20.42 22C21.28 22 22 21.28 22 20.42L22 3.58C22 2.72 21.28 2 20.42 2L3.58 2C2.72 2 2 2.72 2 3.58Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 8L17 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 12L17 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 16L13 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Response Content */}
                  <div className="ml-14">
                    <p className="text-gray-400 text-xs mb-3">
                      {formatDate(answer.createdAt)}
                    </p>
                    <p className="text-white text-sm leading-relaxed mb-4">
                      "{answer.text}"
                    </p>
                  </div>

                  {/* Response Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <p className="text-gray-400 text-sm">This article was helpful?</p>
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.48 2.65L2.38 6.65C2.38 6.65 2.38 6.65 2.38 6.65L7.48 2.65Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.14 18.7L7.48 2.65L2.38 6.65L14.14 18.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.38 2.65L7.48 6.65C7.48 6.65 7.48 6.65 7.48 6.65L2.38 2.65Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.86 18.7L12.52 2.65L17.62 6.65L5.86 18.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <button className="text-[#A82EFF] text-sm font-medium hover:text-purple-300 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No responses yet. Be the first to reply!
            </div>
          )}
        </div>

        {/* Reply Input Section */}
        <div className="bg-[#232323] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <TextArea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="@David Willaiam Hey there..."
              rows={1}
              className="flex-1 bg-transparent border-[#232323] text-white placeholder-gray-400 resize-none"
              styles={{
                textarea: {
                  backgroundColor: 'transparent',
                  border: '1px solid #232323',
                  color: 'white'
                }
              }}
            />
            <Button
              type="primary"
              onClick={handleSubmitReply}
              loading={isSubmittingReply}
              disabled={!replyText.trim()}
              className="bg-[#BC5FFF] hover:bg-purple-600 border-none rounded-full w-14 h-14 flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.12 3.12L17.76 17.77" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.11 10.06L3.58 3.59" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
