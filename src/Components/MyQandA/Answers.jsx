import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Avatar, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import axios from 'axios';
import { getAuthHeaders, getAuthData } from '../Auth/Auth.Function';
import { useNavigate, useParams } from '@tanstack/react-router';

export default function Answers() {
  const navigate = useNavigate();
  const { questionId } = useParams(); // Assuming we get questionId from route params
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Get user ID from auth data
  const getUserId = () => {
    try {
      const authData = getAuthData();
      return authData?.userId || 1;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return 1;
    }
  };

  // Fetch question details
  const fetchQuestionDetails = async (id) => {
    try {
      const response = await axios.get(`${URL}/api/qna/questions/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching question details:', error);
      throw error;
    }
  };

  // Fetch answers for the question
  const fetchAnswers = async (id) => {
    try {
      const response = await axios.get(`${URL}/api/qna/questions/${id}/answers`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching answers:', error);
      throw error;
    }
  };

  // Load question and answers
  const loadData = async () => {
    if (!questionId) return;

    try {
      setLoading(true);
      setError(null);

      const [questionData, answersData] = await Promise.all([
        fetchQuestionDetails(questionId),
        fetchAnswers(questionId),
      ]);

      setQuestion(questionData);
      setAnswers(answersData);
    } catch (error) {
      setError('Failed to load question and answers');
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [questionId]);

  // Submit answer
  const handleSubmitAnswer = async () => {
    if (!replyText.trim()) return;

    try {
      setSubmitting(true);

      const answerData = {
        questionId: parseInt(questionId),
        text: replyText.trim(),
        userId: getUserId(),
      };

      const response = await axios.post(`${URL}/api/qna/answers`, answerData, {
        headers: getAuthHeaders(),
      });

      if (response.data) {
        message.success('Answer submitted successfully!');
        setReplyText('');
        setShowReplyInput(false);
        // Reload answers
        const updatedAnswers = await fetchAnswers(questionId);
        setAnswers(updatedAnswers);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      message.error('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className='bg-black text-white min-h-screen w-full font-sans p-4 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4'></div>
          <p>Loading question...</p>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className='bg-black text-white min-h-screen w-full font-sans p-4 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-500 mb-4'>{error || 'Question not found'}</p>
          <Button
            onClick={() => navigate({ to: '/app/questions' })}
            className='bg-purple-600 hover:bg-purple-700 text-white'
          >
            Back to Questions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black text-white min-h-screen w-full font-sans'>
      {/* Header */}
      <div className='flex items-center p-4 border-b border-gray-800'>
        <Button
          onClick={() => navigate({ to: '/app/questions' })}
          className='mr-3 p-0 bg-transparent border-none'
        >
          <BackButtonIcon className='w-6 h-6 text-white' />
        </Button>
        <h1 className='text-xl font-semibold'>Question Details</h1>
      </div>

      {/* Main Question */}
      <div className='mx-4 bg-gray-900 rounded-xl p-4 my-4 border border-gray-800'>
        <div className='flex items-center mb-3'>
          <Avatar src={question.userCred?.profileImage} className='mr-3' size={40}>
            {question.userCred?.firstName?.[0] || 'U'}
          </Avatar>
          <div className='flex-1'>
            <p className='font-medium text-white'>{question.userCred?.firstName || 'Anonymous'}</p>
            <p className='text-gray-400 text-sm'>{question.questionType}</p>
          </div>
          <p className='text-gray-400 text-xs'>{formatDate(question.createdAt)}</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold text-white mb-2'>Q. {question.title}</h2>
          <p className='text-gray-300'>{question.description}</p>
        </div>
      </div>

      {/* Answers Section */}
      <div className='mx-4'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>Answers ({answers.length})</h2>
          {!showReplyInput && (
            <Button
              onClick={() => setShowReplyInput(true)}
              className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full'
            >
              Add Answer
            </Button>
          )}
        </div>

        {/* Add Answer Input */}
        {showReplyInput && (
          <div className='mb-6 bg-gray-900 rounded-xl p-4 border border-gray-800'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Your Answer</h3>
              <Button
                onClick={() => setShowReplyInput(false)}
                className='p-0 bg-transparent border-none'
              >
                <X className='w-5 h-5 text-white' />
              </Button>
            </div>

            <textarea
              className='w-full bg-gray-800 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
              placeholder='Type your answer here...'
              rows={4}
              maxLength={1000}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className='flex justify-between items-center mt-3'>
              <span className='text-xs text-gray-400'>{replyText.length}/1000</span>
              <Button
                onClick={handleSubmitAnswer}
                disabled={!replyText.trim() || submitting}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full disabled:opacity-50'
              >
                {submitting ? 'Submitting...' : 'Submit Answer'}
              </Button>
            </div>
          </div>
        )}

        {/* Answers List */}
        {answers.length === 0 ? (
          <div className='text-center py-8'>
            <MessageOutlined className='text-4xl text-gray-600 mb-4' />
            <p className='text-gray-400'>No answers yet. Be the first to answer!</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {answers.map((answer) => (
              <div key={answer.id} className='bg-gray-900 rounded-xl p-4 border border-gray-800'>
                <div className='flex items-center mb-3'>
                  <Avatar src={answer.userCred?.profileImage} className='mr-3' size={40}>
                    {answer.userCred?.firstName?.[0] || 'U'}
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center'>
                      <p className='font-medium text-white mr-2'>
                        {answer.userCred?.firstName || 'Anonymous'}
                      </p>
                      <CheckCircleFilled className='text-green-400' />
                    </div>
                    <p className='text-gray-400 text-sm'>
                      {answer.userCred?.userType === 1 ? 'Student' : 'User'}
                    </p>
                  </div>
                  <p className='text-gray-400 text-xs'>{formatDate(answer.createdAt)}</p>
                </div>

                <p className='text-gray-300 mb-3'>{answer.text}</p>

                <div className='flex items-center justify-between'>
                  <span className='text-gray-400 text-sm'>Was this answer helpful?</span>
                  <div className='flex gap-2'>
                    <Button
                      type='text'
                      icon={<LikeOutlined />}
                      className='text-gray-400 hover:text-white'
                    />
                    <Button
                      type='text'
                      icon={<DislikeOutlined />}
                      className='text-gray-400 hover:text-white'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
