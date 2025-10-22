import { useQuery } from '@tanstack/react-query';
import { sessionApi } from '@/Services/session.service';

/**
 * Query Keys (Colocated with hooks)
 */
export const sessionKeys = {
  all: () => ['sessions'],
  upcoming: () => [...sessionKeys.all(), 'upcoming'],
  past: () => [...sessionKeys.all(), 'past'],
  detail: (id) => [...sessionKeys.all(), 'detail', id],
};

// ============================================================================
// QUERY HOOKS (GET)
// ============================================================================

/**
 * Fetch upcoming sessions
 */
export const useUpcomingSessions = (options = {}) => {
  return useQuery({
    queryKey: sessionKeys.upcoming(),
    queryFn: sessionApi.getUpcomingSessions,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch past sessions
 */
export const usePastSessions = (options = {}) => {
  return useQuery({
    queryKey: sessionKeys.past(),
    queryFn: sessionApi.getPastSessions,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch single session by ID
 * @param {string|number} sessionId - Session ID
 */
export const useSession = (sessionId, options = {}) => {
  return useQuery({
    queryKey: sessionKeys.detail(sessionId),
    queryFn: () => sessionApi.getSessionById(sessionId),
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};
