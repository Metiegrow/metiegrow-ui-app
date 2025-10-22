import { useQuery } from '@tanstack/react-query';
import { lawyerApi } from '@/Services/lawyer.service';

/**
 * Query Keys (Colocated with hooks)
 */
export const lawyerKeys = {
  all: () => ['lawyers'],
  lists: () => [...lawyerKeys.all(), 'list'],
  list: (filters) => [...lawyerKeys.lists(), { filters }],
  details: () => [...lawyerKeys.all(), 'detail'],
  detail: (id) => [...lawyerKeys.details(), id],
  profile: () => [...lawyerKeys.all(), 'profile'],
  services: () => [...lawyerKeys.all(), 'services'],
  cases: () => [...lawyerKeys.all(), 'cases'],
  cards: (params) => [...lawyerKeys.all(), 'cards', params],
};

// ============================================================================
// QUERY HOOKS (GET)
// ============================================================================

/**
 * Fetch lawyer cards for dashboard (paginated)
 * @param {Object} params - Pagination params (page, size)
 */
export const useLawyerCards = (params = { page: 0, size: 2 }, options = {}) => {
  return useQuery({
    queryKey: lawyerKeys.cards(params),
    queryFn: () => lawyerApi.getLawyerCards(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch all lawyers with filters
 * @param {Object} filters - Filter criteria
 */
export const useLawyers = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: lawyerKeys.list(filters),
    queryFn: () => lawyerApi.getLawyers(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch single lawyer by ID
 * @param {string|number} lawyerId - Lawyer ID
 */
export const useLawyer = (lawyerId, options = {}) => {
  return useQuery({
    queryKey: lawyerKeys.detail(lawyerId),
    queryFn: () => lawyerApi.getLawyerById(lawyerId),
    enabled: !!lawyerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch my cases
 */
export const useMyCases = (options = {}) => {
  return useQuery({
    queryKey: lawyerKeys.cases(),
    queryFn: lawyerApi.getMyCases,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};
