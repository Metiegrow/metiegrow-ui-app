import { useQuery } from '@tanstack/react-query';
import { alumniApi } from '@/Services/alumni.service';

/**
 * Query Keys (Colocated with hooks)
 */
export const alumniKeys = {
  all: () => ['alumni'],
  lists: () => [...alumniKeys.all(), 'list'],
  list: (filters) => [...alumniKeys.lists(), { filters }],
  details: () => [...alumniKeys.all(), 'detail'],
  detail: (id) => [...alumniKeys.details(), id],
  cards: () => [...alumniKeys.all(), 'cards'],
};

// ============================================================================
// QUERY HOOKS (GET)
// ============================================================================

/**
 * Fetch alumni cards for dashboard
 */
export const useAlumniCards = (options = {}) => {
  return useQuery({
    queryKey: alumniKeys.cards(),
    queryFn: alumniApi.getAlumniCards,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch all alumni with filters
 * @param {Object} filters - Filter criteria
 */
export const useAlumni = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: alumniKeys.list(filters),
    queryFn: () => alumniApi.getAlumni(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch single alumni by ID
 * @param {string|number} alumniId - Alumni ID
 */
export const useAlumniById = (alumniId, options = {}) => {
  return useQuery({
    queryKey: alumniKeys.detail(alumniId),
    queryFn: () => alumniApi.getAlumniById(alumniId),
    enabled: !!alumniId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};
