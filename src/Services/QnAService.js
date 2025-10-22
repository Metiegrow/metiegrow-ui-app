import axios from 'axios';
import { getAuthHeaders } from '../Components/Auth/Auth.Function';

const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

// Q&A API Service
export const QnAService = {
  // Get all questions
  getQuestions: async () => {
    try {
      const response = await axios.get(`${URL}/api/qna/questions`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },

  // Get question by ID
  getQuestionById: async (questionId) => {
    try {
      const response = await axios.get(`${URL}/api/qna/questions/${questionId}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error;
    }
  },

  // Create a new question
  createQuestion: async (questionData) => {
    try {
      const response = await axios.post(`${URL}/api/qna/questions`, questionData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  },

  // Get answers for a specific question
  getAnswersByQuestionId: async (questionId) => {
    try {
      const response = await axios.get(`${URL}/api/qna/questions/${questionId}/answers`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching answers:', error);
      throw error;
    }
  },

  // Create a new answer
  createAnswer: async (answerData) => {
    try {
      const response = await axios.post(`${URL}/api/qna/answers`, answerData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating answer:', error);
      throw error;
    }
  },

  // Fallback: add answer via question scoped endpoint
  addAnswer: async (questionId, answerData) => {
    try {
      const response = await axios.post(
        `${URL}/api/qna/questions/${questionId}/answers`,
        answerData,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding answer:', error);
      throw error;
    }
  },

  // Get question like count (without incrementing)
  getQuestionLikeCount: async (questionId) => {
    try {
      console.log('API call - getQuestionLikeCount:', {
        questionId,
        url: `${URL}/api/qna/questions/${questionId}/likes/count`,
      });
      let headers = {};
      try {
        headers = getAuthHeaders();
      } catch (_) {
        headers = {};
      }
      const response = await axios.get(`${URL}/api/qna/questions/${questionId}/likes/count`, {
        headers,
      });
      console.log('API response - getQuestionLikeCount:', response.data);
      const count = Number(response.data);
      if (!Number.isNaN(count)) return count;
      return 0;
    } catch (error) {
      console.warn('Error fetching question like count:', error?.response?.status);
      return 0;
    }
  },

  // Get answer like count
  getAnswerLikeCount: async (answerId) => {
    try {
      console.log('API call - getAnswerLikeCount:', {
        answerId,
        url: `${URL}/api/qna/answers/${answerId}/likes/count`,
      });
      let headers = {};
      try {
        headers = getAuthHeaders();
      } catch (_) {
        headers = {};
      }
      const response = await axios.get(`${URL}/api/qna/answers/${answerId}/likes/count`, {
        headers,
      });
      console.log('API response - getAnswerLikeCount:', response.data);
      const count = Number(response.data);
      if (!Number.isNaN(count)) return count;
      return 0;
    } catch (error) {
      console.warn('Error fetching answer like count:', error?.response?.status);
      return 0;
    }
  },

  // Get answer comments count
  getAnswerCommentsCount: async (answerId) => {
    try {
      console.log('API call - getAnswerCommentsCount:', {
        answerId,
        url: `${URL}/api/qna/answers/${answerId}/comments/count`,
      });
      let headers = {};
      try {
        headers = getAuthHeaders();
      } catch (_) {
        headers = {};
      }
      const response = await axios.get(`${URL}/api/qna/answers/${answerId}/comments/count`, {
        headers,
      });
      console.log('API response - getAnswerCommentsCount:', response.data);
      const count = Number(response.data);
      if (!Number.isNaN(count)) return count;
      return 0;
    } catch (error) {
      console.warn(
        'Error fetching answer comments count (fallback to list length):',
        error?.response?.status
      );
      try {
        const list = await QnAService.getAnswerComments(answerId);
        return Array.isArray(list) ? list.length : 0;
      } catch (_e) {
        return 0;
      }
    }
  },

  // Like a question => returns total like count
  likeQuestion: async (questionId, userId) => {
    try {
      console.log('API call - likeQuestion:', {
        questionId,
        userId,
        url: `${URL}/api/qna/questions/${questionId}/like`,
      });
      let headers = {};
      try {
        headers = getAuthHeaders();
      } catch (_) {
        headers = {};
      }
      const response = await axios.post(`${URL}/api/qna/questions/${questionId}/like`, null, {
        params: { userId },
        headers,
      });
      console.log('API response - likeQuestion:', response.data);
      return response.data; // number
    } catch (error) {
      console.error('Error liking question:', error);
      throw error;
    }
  },

  // Like an answer => returns total like count
  likeAnswer: async (answerId, userId) => {
    try {
      console.log('API call - likeAnswer:', {
        answerId,
        userId,
        url: `${URL}/api/qna/answers/${answerId}/like`,
      });
      let headers = {};
      try {
        headers = getAuthHeaders();
      } catch (_) {
        headers = {};
      }
      const response = await axios.post(`${URL}/api/qna/answers/${answerId}/like`, null, {
        params: { userId },
        headers,
      });
      console.log('API response - likeAnswer:', response.data);
      return response.data; // number
    } catch (error) {
      console.error('Error liking answer:', error);
      throw error;
    }
  },

  // Get comments of an answer (tree)
  getAnswerComments: async (answerId) => {
    try {
      const response = await axios.get(`${URL}/api/qna/answers/${answerId}/comments`, {
        headers: getAuthHeaders(),
      });
      return response.data; // array tree
    } catch (error) {
      console.error('Error fetching answer comments:', error);
      throw error;
    }
  },

  // Post a comment to an answer
  postAnswerComment: async (answerId, userId, text) => {
    try {
      console.log('API call - postAnswerComment:', {
        answerId,
        userId,
        text,
        url: `${URL}/api/qna/answers/${answerId}/comments`,
      });
      let headers = {};
      try {
        headers = getAuthHeaders();
      } catch (_) {
        headers = {};
      }
      const response = await axios.post(`${URL}/api/qna/answers/${answerId}/comments`, null, {
        params: { userId, text },
        headers,
      });
      console.log('API response - postAnswerComment:', response.data);
      return response.data; // created comment
    } catch (error) {
      console.error('Error posting answer comment:', error);
      throw error;
    }
  },

  // Get replies for a comment
  getCommentReplies: async (commentId) => {
    try {
      const response = await axios.get(`${URL}/api/qna/comments/${commentId}/replies`, {
        headers: getAuthHeaders(),
      });
      return response.data; // array
    } catch (error) {
      console.error('Error fetching comment replies:', error);
      throw error;
    }
  },

  // Post reply for a comment
  postCommentReply: async (commentId, userId, text) => {
    try {
      console.log('API call - postCommentReply:', {
        commentId,
        userId,
        text,
        url: `${URL}/api/qna/comments/${commentId}/replies`,
      });
      let headers = {};
      try {
        headers = getAuthHeaders();
      } catch (_) {
        headers = {};
      }
      const response = await axios.post(`${URL}/api/qna/comments/${commentId}/replies`, null, {
        params: { userId, text },
        headers,
      });
      console.log('API response - postCommentReply:', response.data);
      return response.data; // created reply
    } catch (error) {
      console.error('Error posting comment reply:', error);
      throw error;
    }
  },
};

// Question types for dropdown
export const QUESTION_TYPES = [
  'Free question',
  'Admission purpose',
  'Career guidance',
  'Technical support',
  'General inquiry',
  'University selection',
  'Visa assistance',
  'Scholarship information',
  'Course selection',
  'Application process',
];
