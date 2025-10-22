import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { qnaApi } from '@/Services/qna.service';

/**
 * Query Keys (Colocated with hooks)
 */
export const qnaKeys = {
  all: () => ['qna'],
  questions: {
    all: () => [...qnaKeys.all(), 'questions'],
    list: (params) => [...qnaKeys.questions.all(), { params }],
    detail: (id) => [...qnaKeys.questions.all(), id],
    likes: (id) => [...qnaKeys.questions.detail(id), 'likes'],
  },
  answers: {
    all: () => [...qnaKeys.all(), 'answers'],
    byQuestion: (questionId) => [...qnaKeys.answers.all(), 'question', questionId],
    detail: (id) => [...qnaKeys.answers.all(), id],
    likes: (id) => [...qnaKeys.answers.detail(id), 'likes'],
  },
  comments: {
    all: () => [...qnaKeys.all(), 'comments'],
    byAnswer: (answerId) => [...qnaKeys.comments.all(), 'answer', answerId],
    replies: (commentId) => [...qnaKeys.comments.all(), 'replies', commentId],
  },
};

// ============================================================================
// QUERY HOOKS (GET)
// ============================================================================

/**
 * Fetch all questions
 */
export const useQuestions = (params = {}, options = {}) => {
  return useQuery({
    queryKey: qnaKeys.questions.list(params),
    queryFn: () => qnaApi.getQuestions(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch single question by ID
 */
export const useQuestion = (questionId, options = {}) => {
  return useQuery({
    queryKey: qnaKeys.questions.detail(questionId),
    queryFn: () => qnaApi.getQuestionById(questionId),
    enabled: !!questionId,
    ...options,
  });
};

/**
 * Fetch answers for a question
 */
export const useAnswers = (questionId, options = {}) => {
  return useQuery({
    queryKey: qnaKeys.answers.byQuestion(questionId),
    queryFn: () => qnaApi.getAnswers(questionId),
    enabled: !!questionId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
};

/**
 * Fetch comments for an answer
 */
export const useComments = (answerId, options = {}) => {
  return useQuery({
    queryKey: qnaKeys.comments.byAnswer(answerId),
    queryFn: () => qnaApi.getComments(answerId),
    enabled: !!answerId,
    ...options,
  });
};

/**
 * Fetch question like count
 */
export const useQuestionLikeCount = (questionId, options = {}) => {
  return useQuery({
    queryKey: qnaKeys.questions.likes(questionId),
    queryFn: () => qnaApi.getQuestionLikeCount(questionId),
    enabled: !!questionId,
    initialData: 0,
    ...options,
  });
};

/**
 * Fetch answer like count
 */
export const useAnswerLikeCount = (answerId, options = {}) => {
  return useQuery({
    queryKey: qnaKeys.answers.likes(answerId),
    queryFn: () => qnaApi.getAnswerLikeCount(answerId),
    enabled: !!answerId,
    initialData: 0,
    ...options,
  });
};

// ============================================================================
// MUTATION HOOKS (POST/PUT/DELETE)
// ============================================================================

/**
 * Create a new question
 */
export const useCreateQuestion = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: qnaApi.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qnaKeys.questions.all() });
    },
    ...options,
  });
};

/**
 * Update a question
 */
export const useUpdateQuestion = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, data }) => qnaApi.updateQuestion(questionId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: qnaKeys.questions.detail(variables.questionId),
      });
      queryClient.invalidateQueries({
        queryKey: qnaKeys.questions.all(),
      });
    },
    ...options,
  });
};

/**
 * Delete a question
 */
export const useDeleteQuestion = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: qnaApi.deleteQuestion,
    onSuccess: (data, questionId) => {
      queryClient.removeQueries({
        queryKey: qnaKeys.questions.detail(questionId),
      });
      queryClient.invalidateQueries({
        queryKey: qnaKeys.questions.all(),
      });
    },
    ...options,
  });
};

/**
 * Like a question
 */
export const useLikeQuestion = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, userId }) => qnaApi.likeQuestion(questionId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qnaKeys.questions.all(),
      });
    },
    ...options,
  });
};

/**
 * Dislike a question
 */
export const useDislikeQuestion = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, userId }) => qnaApi.dislikeQuestion(questionId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qnaKeys.questions.all(),
      });
    },
    ...options,
  });
};

/**
 * Create an answer
 */
export const useCreateAnswer = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: qnaApi.createAnswer,
    onSuccess: () => {
      // onSuccess: (data, variables) => {
      // const questionId = variables.questionId;
      queryClient.invalidateQueries({
        queryKey: qnaKeys.answers.all(),
        // queryKey: qnaKeys.answers.byQuestion(questionId),
      });
      queryClient.invalidateQueries({
        queryKey: qnaKeys.questions.all(),
      });
    },
    ...options,
  });
};

/**
 * Like an answer
 */
export const useLikeAnswer = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ answerId, userId }) => qnaApi.likeAnswer(answerId, userId),
    onSuccess: () => {
      // Invalidate questions (backend returns answers nested in question)
      queryClient.invalidateQueries({
        queryKey: qnaKeys.questions.all(),
      });
    },
    ...options,
  });
};

/**
 * Dislike an answer
 */
export const useDislikeAnswer = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ answerId, userId }) => qnaApi.dislikeAnswer(answerId, userId),
    onSuccess: () => {
      // Invalidate questions (backend returns answers nested in question)
      queryClient.invalidateQueries({
        queryKey: qnaKeys.questions.all(),
      });
    },
    ...options,
  });
};

/**
 * Post a comment
 */
export const usePostComment = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ answerId, userId, text }) => qnaApi.postComment(answerId, userId, text),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: qnaKeys.comments.byAnswer(variables.answerId),
      });
    },
    ...options,
  });
};

/**
 * Post a comment reply
 */
export const usePostCommentReply = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, userId, text }) => qnaApi.postCommentReply(commentId, userId, text),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: qnaKeys.comments.replies(variables.commentId),
      });
    },
    ...options,
  });
};
