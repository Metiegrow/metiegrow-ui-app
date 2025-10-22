import axiosInstance from './config/axios.config';

/**
 * Q&A API Service
 * Raw API functions for Q&A operations
 */

export const qnaApi = {
  // ==================== QUESTIONS ====================

  /**
   * Get all questions
   */
  getQuestions: async (params = {}) => {
    const { data } = await axiosInstance.get('/api/qna/questions/cards', { params });
    return data;
  },

  /**
   * Get question by ID
   */
  getQuestionById: async (questionId) => {
    const { data } = await axiosInstance.get(`/api/qna/questions/${questionId}`);
    return data;
  },

  /**
   * Create a new question
   */
  createQuestion: async (questionData) => {
    const { data } = await axiosInstance.post('/api/qna/questions', questionData);
    return data;
  },

  /**
   * Update a question
   */
  updateQuestion: async (questionId, updateData) => {
    const { data } = await axiosInstance.put(`/api/qna/questions/${questionId}`, updateData);
    return data;
  },

  /**
   * Delete a question
   */
  deleteQuestion: async (questionId) => {
    const { data } = await axiosInstance.delete(`/api/qna/questions/${questionId}`);
    return data;
  },

  /**
   * Like a question
   */
  likeQuestion: async (questionId, userId) => {
    const { data } = await axiosInstance.post(`/api/qna/questions/${questionId}/like`, null, {
      params: { userId },
    });
    return data;
  },

  /**
   * Dislike a question
   */
  dislikeQuestion: async (questionId, userId) => {
    const { data } = await axiosInstance.delete(`/api/qna/questions/${questionId}/dislike`, {
      params: { userId },
    });
    return data;
  },

  /**
   * Get question like count
   */
  getQuestionLikeCount: async (questionId) => {
    try {
      const { data } = await axiosInstance.get(`/api/qna/questions/${questionId}/likes/count`);
      return Number(data) || 0;
    } catch (error) {
      console.log('getQuestionLikeCount error: ', error);
      return 0;
    }
  },

  // ==================== ANSWERS ====================

  /**
   * Get answers for a question
   */
  getAnswers: async (questionId) => {
    const { data } = await axiosInstance.get(`/api/qna/questions/${questionId}/answers`);
    return data;
  },

  /**
   * Create an answer
   */
  createAnswer: async (answerData) => {
    const { data } = await axiosInstance.post('/api/qna/answers', answerData);
    return data;
  },

  /**
   * Add answer to question (alternative endpoint)
   */
  addAnswer: async (questionId, answerData) => {
    const { data } = await axiosInstance.post(
      `/api/qna/questions/${questionId}/answers`,
      answerData
    );
    return data;
  },

  /**
   * Like an answer
   */
  likeAnswer: async (answerId, userId) => {
    const { data } = await axiosInstance.post(`/api/qna/answers/${answerId}/like`, null, {
      params: { userId },
    });
    return data;
  },

  /**
   * Dislike an answer
   */
  dislikeAnswer: async (answerId, userId) => {
    const { data } = await axiosInstance.delete(`/api/qna/answers/${answerId}/dislike`, {
      params: { userId },
    });
    return data;
  },

  /**
   * Get answer like count
   */
  getAnswerLikeCount: async (answerId) => {
    try {
      const { data } = await axiosInstance.get(`/api/qna/answers/${answerId}/likes/count`);
      return Number(data) || 0;
    } catch (error) {
      console.log('getAnswerLikeCount error: ', error);
      return 0;
    }
  },

  // ==================== COMMENTS ====================

  /**
   * Get comments for an answer
   */
  getComments: async (answerId) => {
    const { data } = await axiosInstance.get(`/api/qna/answers/${answerId}/comments`);
    return data;
  },

  /**
   * Get comment count for an answer
   */
  getCommentCount: async (answerId) => {
    try {
      const { data } = await axiosInstance.get(`/api/qna/answers/${answerId}/comments/count`);
      return Number(data) || 0;
    } catch (error) {
      console.log('getCommentCount error: ', error);
      // Fallback: get comments and count them
      try {
        const comments = await qnaApi.getComments(answerId);
        return Array.isArray(comments) ? comments.length : 0;
      } catch {
        return 0;
      }
    }
  },

  /**
   * Post a comment on an answer
   */
  postComment: async (answerId, userId, text) => {
    const { data } = await axiosInstance.post(`/api/qna/answers/${answerId}/comments`, null, {
      params: { userId, text },
    });
    return data;
  },

  /**
   * Get replies for a comment
   */
  getCommentReplies: async (commentId) => {
    const { data } = await axiosInstance.get(`/api/qna/comments/${commentId}/replies`);
    return data;
  },

  /**
   * Post a reply to a comment
   */
  postCommentReply: async (commentId, userId, text) => {
    const { data } = await axiosInstance.post(`/api/qna/comments/${commentId}/replies`, null, {
      params: { userId, text },
    });
    return data;
  },
};

// Question types constant
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
