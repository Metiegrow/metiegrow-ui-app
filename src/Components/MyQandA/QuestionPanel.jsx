// import React from "react";
// import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";

// const QuestionPanel = () => {
//   const responses = [
//     {
//       id: 1,
//       name: "David William",
//       role: "Student, TAC University",
//       message:
//         "Loved the structured approach of the webinar! The content was well-paced, covering both AI fundamentals and real-world applications. The Q&A session was especially helpful!",
//       time: "2d ago",
//     },
//     // Duplicate for demo
//     {
//       id: 2,
//       name: "David William",
//       role: "Student, TAC University",
//       message:
//         "Loved the structured approach of the webinar! The content was well-paced, covering both AI fundamentals and real-world applications. The Q&A session was especially helpful!",
//       time: "2d ago",
//     },
//   ];

//   return (
//     <div className="w-[400px] h-screen bg-[#111] text-white p-4 flex flex-col justify-between">
//       {/* Top Section */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Questions</h2>
//         <div className="bg-[#1e1e1e] p-4 rounded-xl mb-4">
//           <div className="flex items-center gap-2 mb-2">
//             <div className="w-8 h-8 rounded-full bg-gray-400"></div>
//             <div>
//               <p className="text-sm font-medium">Rajesh Kumar</p>
//               <p className="text-xs text-gray-400">2 days ago</p>
//             </div>
//           </div>
//           <p className="text-sm">Q. What are the key ethical concerns surrounding AI development and deployment?</p>
//           <div className="flex gap-4 text-gray-400 mt-2 text-sm">
//             <div className="flex items-center gap-1">
//               <ThumbsUp size={16} /> 123
//             </div>
//             <div className="flex items-center gap-1">
//               <MessageSquare size={16} /> 20
//             </div>
//             <Share2 size={16} className="ml-auto cursor-pointer" />
//           </div>
//         </div>

//         {/* Responses */}
//         <div>
//           <h3 className="mb-2 text-sm text-gray-400">Responses ({responses.length})</h3>
//           {responses.map((res) => (
//             <div
//               key={res.id}
//               className="bg-[#1a1a1a] p-4 rounded-xl mb-3 border border-[#2a2a2a]"
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-8 h-8 rounded-full bg-gray-500"></div>
//                 <div>
//                   <p className="text-sm font-medium flex items-center gap-1">
//                     {res.name}
//                     <span className="text-green-400 text-xs">✔</span>
//                   </p>
//                   <p className="text-xs text-gray-400">{res.role}</p>
//                 </div>
//               </div>
//               <p className="text-sm mb-2">{res.message}</p>
//               <p className="text-xs text-gray-500">{res.time}</p>
//               <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
//                 <p className="cursor-pointer">View Replies (1)</p>
//                 <p className="ml-auto text-purple-400 cursor-pointer">Reply</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Chat Input */}
//       <div className="mt-4">
//         <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] rounded-full">
//           <span className="text-purple-400 text-sm font-medium">@David William</span>
//           <input
//             type="text"
//             placeholder="Hey there..."
//             className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder-gray-400"
//           />
//           <button className="text-purple-500 hover:text-purple-400">
//             <svg
//               stroke="currentColor"
//               fill="none"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="w-5 h-5"
//             >
//               <line x1="22" y1="2" x2="11" y2="13"></line>
//               <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionPanel;

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  ThumbsDown,
  PlayCircle,
  User,
  Calendar,
} from 'lucide-react';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';
import { Button, message } from 'antd';
import axios from 'axios';
import { getAuthHeaders, getAuthData } from '../Auth/Auth.Function';
import { useNavigate } from '@tanstack/react-router';

const QuestionPanel = ({ setShowPanel, questionId }) => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllReplies, setShowAllReplies] = useState(true);

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
    if (questionId) {
      loadData();
    }
  }, [questionId]);

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

  const visibleResponses = showAllReplies ? answers : answers.slice(0, 1);

  if (loading) {
    return (
      <>
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
          onClick={() => setShowPanel(false)}
        ></div>
        <div className='fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-[#111] text-white p-4 flex items-center justify-center z-50'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4'></div>
            <p>Loading question...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !question) {
    return (
      <>
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
          onClick={() => setShowPanel(false)}
        ></div>
        <div className='fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-[#111] text-white p-4 flex items-center justify-center z-50'>
          <div className='text-center'>
            <p className='text-red-500 mb-4'>{error || 'Question not found'}</p>
            <Button
              onClick={() => setShowPanel(false)}
              className='bg-purple-600 hover:bg-purple-700 text-white'
            >
              Close
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
        onClick={() => setShowPanel(false)}
      ></div>

      <div className='fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-[#111] text-white p-4 flex flex-col justify-between z-50'>
        <div className='overflow-y-auto pb-4'>
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => setShowPanel(false)}
                className='sm:hidden bg-transparent border-none outline-none p-0'
              >
                <BackButtonIcon size={20} />
              </button>
              <h2 className='text-xl font-semibold'>Question Details</h2>
            </div>
            <button
              onClick={() => setShowPanel(false)}
              className='hidden sm:block bg-transparent border-none outline-none p-0'
            >
              <ModalCloseIcon size={20} />
            </button>
          </div>
          <hr className='border-gray-700 mb-4' />

          {/* Main Question */}
          <div className='bg-[#1e1e1e] p-4 rounded-xl mb-4'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center'>
                <User className='w-4 h-4 text-white' />
              </div>
              <div>
                <p className='text-sm font-medium'>{question.userCred?.firstName || 'Anonymous'}</p>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-3 h-3 text-gray-400' />
                  <p className='text-xs text-gray-400'>{formatDate(question.createdAt)}</p>
                </div>
              </div>
            </div>
            <p className='text-sm text-white mb-2'>Q. {question.title}</p>
            <p className='text-xs text-gray-300 mb-3'>{question.description}</p>
            <div className='flex gap-4 text-gray-400 mt-2 text-sm'>
              <div className='flex items-center gap-1 font-medium'>
                <MessageSquare size={16} /> {answers.length}
              </div>
              <span className='px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs'>
                {question.questionType}
              </span>
            </div>
          </div>

          <hr className='border-white/20 mb-4' />

          {/* Responses */}
          <div>
            <h3 className='mb-4 text-sm text-gray-400'>Answers ({answers.length})</h3>
            {answers.length === 0 ? (
              <div className='text-center py-8'>
                <MessageSquare className='w-8 h-8 text-gray-600 mx-auto mb-2' />
                <p className='text-gray-500 text-sm'>No answers yet</p>
              </div>
            ) : (
              visibleResponses.map((answer, index) => (
                <div key={answer.id} className='relative mb-6'>
                  <div className='flex items-start gap-3'>
                    <div className='w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center'>
                      <User className='w-4 h-4 text-white' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <p className='text-sm font-medium flex items-center gap-1'>
                            {answer.userCred?.firstName || 'Anonymous'}
                            <span className='text-green-400 text-xs'>✔</span>
                          </p>
                          <p className='text-xs text-gray-400'>
                            {answer.userCred?.userType === 1 ? 'Student' : 'User'}
                          </p>
                          <p className='text-xs text-gray-500'>{formatDate(answer.createdAt)}</p>
                        </div>
                        {index === 0 && (
                          <button className='w-8 h-8 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-lg'>
                            <PlayCircle size={18} className='text-white' />
                          </button>
                        )}
                      </div>
                      <p className='text-sm my-2 text-white'>{answer.text}</p>

                      {/* First Answer Extra */}
                      {index === 0 ? (
                        <>
                          <div className='flex items-center justify-between text-sm text-white mb-2'>
                            <span>Was this answer helpful?</span>
                            <div className='flex gap-3 text-gray-400'>
                              <ThumbsUp className='cursor-pointer hover:text-white' size={18} />
                              <ThumbsDown className='cursor-pointer hover:text-white' size={18} />
                            </div>
                            <p className='text-purple-400 hover:text-purple-300 cursor-pointer font-medium'>
                              Reply
                            </p>
                          </div>
                          {answers.length > 1 && (
                            <div
                              className='text-sm text-purple-400 cursor-pointer hover:text-purple-300 mb-2'
                              onClick={() => setShowAllReplies(!showAllReplies)}
                            >
                              {showAllReplies
                                ? 'Hide Answers'
                                : `Show All ${answers.length} Answers`}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className='flex items-center gap-4 mt-1 text-gray-400 text-sm'>
                          <div className='flex items-center gap-1 cursor-pointer hover:text-white font-medium'>
                            <ThumbsUp size={16} />
                            <span>0 Likes</span>
                          </div>
                          <p className='text-purple-400 hover:text-purple-300 cursor-pointer font-medium'>
                            Reply
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Input */}
        <div className='mt-4'>
          <div className='flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] rounded-full'>
            <span className='text-purple-400 text-sm font-medium whitespace-nowrap'>
              @{question.userCred?.firstName || 'User'}
            </span>
            <input
              type='text'
              placeholder='Write your answer...'
              className='bg-transparent border-none outline-none text-white text-sm flex-1 placeholder-gray-400'
            />
            <button className='text-purple-500 hover:text-purple-400'>
              <svg
                stroke='currentColor'
                fill='none'
                strokeWidth='2'
                viewBox='0 0 24 24'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-5 h-5'
              >
                <line x1='22' y1='2' x2='11' y2='13'></line>
                <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionPanel;
