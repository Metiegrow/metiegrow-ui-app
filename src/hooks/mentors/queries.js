import { useQuery } from '@tanstack/react-query';
import { mentorApi } from '@/Services/mentor.service';

/**
 * Query Keys (Colocated with hooks)
 */
export const mentorKeys = {
  all: () => ['mentors'],
  lists: () => [...mentorKeys.all(), 'list'],
  list: (filters) => [...mentorKeys.lists(), { filters }],
  details: () => [...mentorKeys.all(), 'detail'],
  detail: (id) => [...mentorKeys.details(), id],
  myProfile: () => [...mentorKeys.all(), 'myProfile'],
  cards: (params) => [...mentorKeys.all(), 'cards', params],
};

// ============================================================================
// QUERY HOOKS (GET)
// ============================================================================

/**
 * Fetch mentor cards for dashboard (paginated)
 * @param {Object} params - Pagination params (page, size)
 */
export const useMentorCards = (params = { page: 0, size: 2 }, options = {}) => {
  return useQuery({
    queryKey: mentorKeys.cards(params),
    queryFn: () => mentorApi.getMentorCards(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch all mentors with filters
 * @param {Object} filters - Filter criteria
 */
export const useMentors = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: mentorKeys.list(filters),
    queryFn: () => mentorApi.getMentors(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch single mentor by ID
 * @param {string|number} mentorId - Mentor ID
 */
export const useMentor = (mentorId, options = {}) => {
  return useQuery({
    queryKey: mentorKeys.detail(mentorId),
    queryFn: () => mentorApi.getMentorById(mentorId),
    enabled: !!mentorId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch my mentor profile
 */
export const useMyMentorProfile = (options = {}) => {
  return useQuery({
    queryKey: mentorKeys.myProfile(),
    queryFn: mentorApi.getMyMentorProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};
