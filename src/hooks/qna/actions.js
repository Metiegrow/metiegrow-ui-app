import { message } from 'antd';
import { getAuthData } from '@/Components/Auth/Auth.Function';
import {
  useLikeQuestion,
  useDislikeQuestion,
  useLikeAnswer,
  useDislikeAnswer,
} from './queries';

/**
 * Custom hook for question actions (like/dislike)
 * Business logic layer - handles auth and user feedback
 */
export const useQuestionActions = () => {
  const likeQuestionMutation = useLikeQuestion({
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to like question');
    },
  });

  const dislikeQuestionMutation = useDislikeQuestion({
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to dislike question');
    },
  });

  /**
   * Handle question like/dislike toggle
   * @param {string|number} questionId - The question ID
   * @param {boolean} isLiked - Current like status
   */
  const handleQuestionLike = (questionId, isLiked) => {
    // Resolve userId from centralized auth helper
    const authData = getAuthData();
    let userId = authData?.userId;

    // Fallback for local/dev: allow configured default userId (or 8) to proceed
    if (!userId) {
      const configuredFallback = import.meta.env.VITE_DEFAULT_TEST_USER_ID;
      userId = configuredFallback ? Number(configuredFallback) : 8;
      console.warn('No auth userId found. Using fallback userId for like:', userId);
    }

    // Trigger the mutation
    if (isLiked) {
      dislikeQuestionMutation.mutate({ questionId, userId });
    } else {
      likeQuestionMutation.mutate({ questionId, userId });
    }
  };

  return {
    handleQuestionLike,
    isLiking: likeQuestionMutation.isPending,
    isDisliking: dislikeQuestionMutation.isPending,
  };
};

/**
 * Custom hook for answer actions (like/dislike)
 * Business logic layer - handles auth and user feedback
 */
export const useAnswerActions = () => {
  const likeAnswerMutation = useLikeAnswer({
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to like answer');
    },
  });

  const dislikeAnswerMutation = useDislikeAnswer({
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to dislike answer');
    },
  });

  /**
   * Handle answer like/dislike toggle
   * @param {string|number} answerId - The answer ID
   * @param {boolean} isLiked - Current like status
   */
  const handleAnswerLike = (answerId, isLiked) => {
    // Resolve userId from centralized auth helper
    const authData = getAuthData();
    let userId = authData?.userId;

    // Fallback for local/dev: allow configured default userId (or 8) to proceed
    if (!userId) {
      const configuredFallback = import.meta.env.VITE_DEFAULT_TEST_USER_ID;
      userId = configuredFallback ? Number(configuredFallback) : 8;
      console.warn('No auth userId found. Using fallback userId for answer like:', userId);
    }

    // Trigger the mutation
    if (isLiked) {
      dislikeAnswerMutation.mutate({ answerId, userId });
    } else {
      likeAnswerMutation.mutate({ answerId, userId });
    }
  };

  return {
    handleAnswerLike,
    isLiking: likeAnswerMutation.isPending,
    isDisliking: dislikeAnswerMutation.isPending,
  };
};
