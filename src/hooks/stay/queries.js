import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stayApi } from '@/Services/stay.service';

/**
 * Query Keys
 */
export const stayKeys = {
  all: () => ['stay'],
  rooms: {
    all: () => [...stayKeys.all(), 'rooms'],
    list: (filters) => [...stayKeys.rooms.all(), { filters }],
    detail: (roomId) => [...stayKeys.rooms.all(), roomId],
  },
  roommates: {
    all: () => [...stayKeys.all(), 'roommates'],
    list: (filters) => [...stayKeys.roommates.all(), { filters }],
  },
};

// ============================================================================
// QUERY HOOKS (GET)
// ============================================================================

/**
 * Fetch room listings
 */
export const useRooms = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: stayKeys.rooms.list(filters),
    queryFn: () => stayApi.getRooms(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch single room by ID
 */
export const useRoom = (roomId, options = {}) => {
  return useQuery({
    queryKey: stayKeys.rooms.detail(roomId),
    queryFn: () => stayApi.getRoomById(roomId),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
};

/**
 * Fetch roommate listings
 */
export const useRoommates = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: stayKeys.roommates.list(filters),
    queryFn: () => stayApi.getRoommates(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Preferences matched
 * Frontend path: http://localhost:5173/app/room-housing
 * Endpoint: {{baseUrl}}/api/posts/stay-post/cards
 * Method: GET
 */
export const usePreferencesMatched = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ['preferencesMatched', { filters }],
    queryFn: () => stayApi.getPreferencesMatched(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Room matching by roomId
 * Endpoint: {{baseUrl}}/api/posts/stay-post/room/matching/:roomId
 * Method: GET
 */
export const useRoomMatching = (roomId, options = {}) => {
  return useQuery({
    queryKey: ['roomMatching', roomId],
    queryFn: () => stayApi.getRoomMatching(roomId),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Get roommate/needroom profile by ID
 * Endpoint: {{baseUrl}}/api/posts/stay-post/needroom/:profileId
 * Method: GET
 */
export const useRoommateProfile = (profileId, options = {}) => {
  return useQuery({
    queryKey: ['roommateProfile', profileId],
    queryFn: () => stayApi.getRoommateProfile(profileId),
    enabled: !!profileId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Get stay card details by type and ID
 * Endpoint: {{baseUrl}}/api/posts/stay-post/cards/:type/:id
 * Method: GET
 * @param {string} cardType - ROOMMATE or ROOM
 * @param {string|number} cardId - The card ID
 * @param {object} options - React Query options
 */
export const useStayCard = (cardType, cardId, options = {}) => {
  return useQuery({
    queryKey: ['stayCard', cardType, cardId],
    queryFn: () => stayApi.getStayCardById(cardType, cardId),
    enabled: !!(cardType && cardId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

// ============================================================================
// MUTATION HOOKS (POST/PUT/DELETE)
// ============================================================================

/**
 * Create a room listing
 */
export const useCreateRoom = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stayApi.createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stayKeys.rooms.all() });
    },
    ...options,
  });
};

/**
 * Update a room listing
 */
export const useUpdateRoom = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, roomData }) => stayApi.updateRoom(roomId, roomData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: stayKeys.rooms.detail(variables.roomId),
      });
      queryClient.invalidateQueries({ queryKey: stayKeys.rooms.all() });
    },
    ...options,
  });
};

/**
 * Delete a room listing
 */
export const useDeleteRoom = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stayApi.deleteRoom,
    onSuccess: (data, roomId) => {
      queryClient.removeQueries({ queryKey: stayKeys.rooms.detail(roomId) });
      queryClient.invalidateQueries({ queryKey: stayKeys.rooms.all() });
    },
    ...options,
  });
};

/**
 * Express interest in a room
 */
export const useExpressInterest = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stayApi.expressInterest,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: stayKeys.rooms.detail(variables.roomId),
      });
      queryClient.invalidateQueries({ queryKey: stayKeys.rooms.all() });
    },
    ...options,
  });
};
