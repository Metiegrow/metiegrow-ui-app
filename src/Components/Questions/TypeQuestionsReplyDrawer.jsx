import React, { useState, useEffect } from 'react';
import { Drawer, Button, Input, message, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './TypeQuestionsReplyDrawer.css';
import {
  useQuestion,
  useQuestionActions,
  useAnswerActions,
  useCreateAnswer,
  usePostComment,
  usePostCommentReply,
  qnaKeys,
} from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';
import { getAuthData } from '../Auth/Auth.Function';
import { ThumbsUpIcon, ForwardShareIcon, CommentIcon } from '../Dashboard/Dashboard.svg';
import { MessageIcon } from '../Stay/NeedRoomCommon.svg';
import { QnAService } from '../../Services/QnAService';
import { PostIcon } from '../Common/SVG/svg.function';

const { TextArea } = Input;

export default function TypeQuestionsReplyDrawer({ isOpen, onClose, questionId }) {
  const queryClient = useQueryClient();

  // UI state
  const [replyText, setReplyText] = useState('');
  const [commentsOpenMap, setCommentsOpenMap] = useState({}); // { [answerId]: boolean }
  const [commentsMap, setCommentsMap] = useState({}); // { [answerId]: comments[] }
  const [newCommentMap, setNewCommentMap] = useState({}); // { [answerId]: string }
  const [replyInputsMap, setReplyInputsMap] = useState({}); // { [commentId]: string }

  // Clear reply text when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setReplyText('');
    }
  }, [isOpen]);

  // ============================================================================
  // DATA LAYER - Using hooks for all data fetching
  // ============================================================================

  // Fetch question (includes likeCount, commentCount, and answers array)
  const { data: question, isLoading } = useQuestion(questionId, {
    enabled: !!questionId && isOpen,
  });

  // Use answers from question response (backend returns nested answers)
  const answers = question?.answers || [];

  // Separate useAnswers hook - commented for now since backend returns answers in question
  // const { data: answersData, isLoading: isAnswersLoading } = useAnswers(questionId, {
  //   enabled: !!questionId && isOpen,
  // });

  // ============================================================================
  // ACTIONS - Using mutation hooks
  // ============================================================================

  // Question actions (like/dislike) - reusable hook
  const {
    handleQuestionLike,
    isLiking: isLikingQuestion,
    isDisliking: isDislikingQuestion,
  } = useQuestionActions();

  // Answer actions (like/dislike) - reusable hook
  const {
    handleAnswerLike,
    isLiking: isLikingAnswer,
    isDisliking: isDislikingAnswer,
  } = useAnswerActions();

  // Get user ID helper
  const getResolvedUserId = () => {
    const authData = getAuthData();
    let userId = authData?.userId ?? authData?.id ?? authData?.userCred?.id ?? authData?.user?.id;

    // Fallback for dev
    if (!userId) {
      const configuredFallback = import.meta.env.VITE_DEFAULT_TEST_USER_ID;
      userId = configuredFallback ? Number(configuredFallback) : 1;
    }

    return userId;
  };

  // Create answer mutation
  const createAnswerMutation = useCreateAnswer({
    onSuccess: () => {
      message.success('Answer posted successfully');
      setReplyText('');
      // Invalidate to refetch question (which includes answers)
      queryClient.invalidateQueries({ queryKey: qnaKeys.questions.all() });
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to post answer');
    },
  });

  // Post comment mutation
  const postCommentMutation = usePostComment({
    onSuccess: async (data, variables) => {
      message.success('Comment added');
      setNewCommentMap((prev) => ({ ...prev, [variables.answerId]: '' }));

      // Refresh comments for this answer
      try {
        const comments = await QnAService.getAnswerComments(variables.answerId);
        setCommentsMap((prev) => ({ ...prev, [variables.answerId]: comments || [] }));
      } catch (e) {
        console.error('Failed to refresh comments:', e);
      }
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to add comment');
    },
  });

  // Post reply mutation
  const postReplyMutation = usePostCommentReply({
    onSuccess: async (data, variables) => {
      message.success('Reply added');
      setReplyInputsMap((prev) => ({ ...prev, [variables.commentId]: '' }));

      // Find answerId and refresh comments
      const answerId = Object.entries(commentsMap).find(([, comments]) =>
        comments?.some((c) => c.id === variables.commentId)
      )?.[0];

      if (answerId) {
        try {
          const comments = await QnAService.getAnswerComments(Number(answerId));
          setCommentsMap((prev) => ({ ...prev, [answerId]: comments || [] }));
        } catch (e) {
          console.error('Failed to refresh comments:', e);
        }
      }
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to add reply');
    },
  });

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleSubmitReply = () => {
    if (!replyText.trim()) {
      message.warning('Please enter a reply');
      return;
    }

    const userId = getResolvedUserId();

    createAnswerMutation.mutate({
      questionId,
      text: replyText.trim(),
      userId,
    });
  };

  const toggleComments = async (answerId) => {
    const currentlyOpen = !!commentsOpenMap[answerId];
    const nextOpen = !currentlyOpen;
    setCommentsOpenMap((prev) => ({ ...prev, [answerId]: nextOpen }));

    // Fetch comments if opening and not already loaded
    if (nextOpen && !commentsMap[answerId]) {
      try {
        const comments = await QnAService.getAnswerComments(answerId);
        setCommentsMap((prev) => ({ ...prev, [answerId]: comments || [] }));
      } catch (e) {
        message.error('Failed to load comments', e);
      }
    }
  };

  const handlePostComment = (answerId) => {
    const text = (newCommentMap[answerId] || '').trim();
    if (!text) return;

    const userId = getResolvedUserId();

    postCommentMutation.mutate({
      answerId,
      userId,
      text,
    });
  };

  const handlePostReply = (commentId) => {
    const text = (replyInputsMap[commentId] || '').trim();
    if (!text) return;

    const userId = getResolvedUserId();

    postReplyMutation.mutate({
      commentId,
      userId,
      text,
    });
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Drawer
      title={null}
      placement='right'
      open={isOpen}
      onClose={onClose}
      width={560}
      className='type-questions-reply-drawer'
      styles={{
        body: { padding: 10, backgroundColor: '#050505' },
        content: { backgroundColor: '#050505', borderRadius: '24px 0 0 24px' },
        mask: { backdropFilter: 'blur(20px)', background: 'rgba(23, 17, 26, 0.74)' },
      }}
    >
      <div className='bg-[#050505] text-white h-full flex flex-col mt-[-25px]'>
        {/* Header */}
        <div className='m-0 px-5 py-4 border-b border-[#2e2e2e] flex justify-between items-center'>
          <h2 className='m-0 text-xl font-semibold'>Questions</h2>
          <Button
            shape='circle'
            icon={<CloseOutlined />}
            onClick={onClose}
            className='bg-black text-white hover:bg-gray-800'
          />
        </div>
         <h4 className='m-0 pl-4 mb-4 mt-[-12px] ml-1 text-sm text-gray-400'>Manage Your Replies and Reactions</h4>
         <Divider className='m-0 !border-gray-700' />

        {/* Content */}
        <div className='p-5 overflow-y-auto flex-1'>
          {isLoading || !question ? (
            <div className='flex items-center justify-center h-40'>
              <div className='text-gray-400'>Loading question...</div>
            </div>
          ) : (
            <>
              {/* Question Card */}
              <div className='bg-[#232323] rounded-2xl p-4 mb-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center'>
                    <span className='text-white font-semibold text-sm'>
                      {question?.user?.name?.[0] || question?.userCred?.firstName?.[0] || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className='text-white text-sm font-medium leading-tight'>
                      {question?.user?.name || question?.userCred?.firstName || 'Anonymous'}
                    </h3>
                    <p className='text-xs text-gray-400'>{question?.questionType}</p>
                  </div>
                </div>

                <p className='text-white text-base mb-4'>Q. {question?.description}</p>

                <div className='flex items-center justify-between border-t border-[#4C4C4C] pt-3'>
                  <div className='flex gap-6'>
                    <button
                      className='flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      onClick={() => handleQuestionLike(questionId, question?.isLiked)}
                      disabled={isLikingQuestion || isDislikingQuestion}
                    >
                      <ThumbsUpIcon isLiked={question?.isLiked} />
                      <span className='font-medium'>{question?.likeCount || 0} Likes</span>
                    </button>
                    <div className='flex items-center gap-1 text-sm text-gray-300'>
                      <CommentIcon />
                      <span>{answers?.length || 0} Answers</span>
                    </div>
                  </div>
                  <button className='hover:opacity-70 transition-opacity'>
                    <ForwardShareIcon />
                  </button>
                </div>
              </div>

              {/* Answers Section */}
              <div className='mb-4'>
                <h3 className='text-lg font-semibold mb-4'>Responses ({answers?.length || 0})</h3>

                {isLoading ? (
                  <div className='flex items-center justify-center h-20'>
                    <div className='text-gray-400 text-sm'>Loading answers...</div>
                  </div>
                ) : answers?.length ? (
                  <div className='space-y-4'>
                    {answers.map((answer) => (
                      <div key={answer.id} className='bg-[#232323] rounded-2xl p-4'>
                        {/* Answer Header */}
                        <div className='flex items-start gap-3 mb-2'>
                          <div className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0'>
                            <span className='text-white text-xs font-semibold'>
                              {answer?.user?.name?.[0] ||
                                answer?.userCred?.firstName?.[0] ||
                                answer?.authorName?.[0] ||
                                'A'}
                            </span>
                          </div>
                          <div className='flex-1 min-w-0'>
                            <span className='text-white text-sm font-medium'>
                              {answer?.user?.name ||
                                answer?.userCred?.firstName ||
                                answer?.authorName ||
                                'Anonymous'}
                            </span>
                            <p className='text-sm text-gray-300 mt-1 break-words'>{answer?.text}</p>
                          </div>
                        </div>

                        {/* Answer Actions */}
                        <div className='flex items-center justify-between border-t border-[#3a3a3a] pt-3 mt-3'>
                          <div className='flex gap-6'>
                            <button
                              className='flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                              onClick={() => handleAnswerLike(answer.id, answer?.isLiked)}
                              disabled={isLikingAnswer || isDislikingAnswer}
                            >
                              <ThumbsUpIcon isLiked={answer?.isLiked} />
                              <span className='font-medium'>{answer?.likeCount || 0} Likes</span>
                            </button>
                            <button
                              className='flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors'
                              onClick={() => toggleComments(answer.id)}
                            >
                              <MessageIcon />
                              <span>Comments ({answer?.commentCount || 0})</span>
                            </button>
                          </div>
                        </div>

                        {/* Comments Section */}
                        {commentsOpenMap[answer.id] && (
                          <div className='mt-4 pt-3 border-t border-[#3a3a3a]'>
                            <div className='flex items-center justify-between mb-3'>
                              <div className='text-xs text-gray-400'>
                                {commentsMap[answer.id]?.length || 0} Comments
                              </div>
                              <button
                                className='text-xs text-gray-400 hover:text-white transition-colors'
                                onClick={() => toggleComments(answer.id)}
                              >
                                Hide Comments
                              </button>
                            </div>

                            {/* Add Comment Input */}
                            <div className='flex gap-2 mb-4'>
                              <Input
                                placeholder='Write a comment...'
                                value={newCommentMap[answer.id] || ''}
                                onChange={(e) =>
                                  setNewCommentMap((prev) => ({
                                    ...prev,
                                    [answer.id]: e.target.value,
                                  }))
                                }
                                className='bg-[#1b1b1b] text-white placeholder:text-gray-500 border-gray-600'
                                onPressEnter={() => handlePostComment(answer.id)}
                              />
                              <Button
                                className='bg-purple-600 hover:bg-purple-700'
                                type='primary'
                                onClick={() => handlePostComment(answer.id)}
                                loading={postCommentMutation.isPending}
                                disabled={!newCommentMap[answer.id]?.trim()}
                              >
                                <PostIcon />
                              </Button>
                            </div>

                            {/* Comments List */}
                            <div className='space-y-3'>
                              {(commentsMap[answer.id] || []).map((comment) => (
                                <div key={comment.id} className='bg-[#1b1b1b] rounded-xl p-3'>
                                  <div className='text-sm text-white mb-1'>{comment.text}</div>
                                  <div className='text-xs text-gray-400'>
                                    by{' '}
                                    {comment?.user?.firstName || comment?.user?.username || 'User'}
                                  </div>

                                  {/* Comment Replies */}
                                  {comment.replies?.length > 0 && (
                                    <div className='mt-3 ml-3 border-l-2 border-purple-600/30 pl-3 space-y-2'>
                                      {comment.replies.map((reply) => (
                                        <div key={reply.id} className='text-xs'>
                                          <span className='text-purple-400 font-medium'>
                                            {reply?.user?.firstName ||
                                              reply?.user?.username ||
                                              'User'}
                                          </span>
                                          <span className='text-gray-300 ml-1'>{reply.text}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Reply Input */}
                                  <div className='flex gap-2 mt-3'>
                                    <Input
                                      size='small'
                                      placeholder='Write a reply...'
                                      value={replyInputsMap[comment.id] || ''}
                                      onChange={(e) =>
                                        setReplyInputsMap((prev) => ({
                                          ...prev,
                                          [comment.id]: e.target.value,
                                        }))
                                      }
                                      className='bg-[#0a0a0a] text-white placeholder:text-gray-600 border-gray-700'
                                      onPressEnter={() => handlePostReply(comment.id)}
                                    />
                                    <button
                                      className='text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors whitespace-nowrap px-2'
                                      onClick={() => handlePostReply(comment.id)}
                                      disabled={
                                        postReplyMutation.isPending ||
                                        !replyInputsMap[comment.id]?.trim()
                                      }
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center py-12 px-4'>
                    <div className='text-gray-500 text-4xl mb-3'>💬</div>
                    <div className='text-gray-400 text-sm'>
                      No answers yet. Be the first to answer!
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer - Post Answer */}
        <div className='p-5 border-t border-[#2e2e2e] bg-[#0a0a0a]'>
          <div className='flex gap-3 items-end'>
            <TextArea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder='Share your knowledge and help others...'
              rows={3}
              maxLength={1000}
              showCount
              className='flex-1'
              styles={{
                textarea: {
                  backgroundColor: '#1b1b1b !important',
                  color: 'white !important',
                  borderColor: '#4a5568 !important',
                },
              }}
              style={{
                backgroundColor: '#1b1b1b',
                color: 'white',
                borderColor: '#4a5568',
              }}
            />
            <Button
              type='primary'
              size='large'
              onClick={handleSubmitReply}
              loading={createAnswerMutation.isPending}
              disabled={!replyText.trim()}
              className='!bg-purple-600 hover:!bg-purple-700 disabled:!bg-purple-600/50 !border-none h-[78px]'
              style={{
                backgroundColor: '#9333ea',
                borderColor: 'transparent',
              }}
            >
              <PostIcon />
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
