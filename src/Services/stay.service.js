import axiosInstance from './config/axios.config';

// ============================================================================
// RAW API FUNCTIONS
// ============================================================================

export const stayApi = {
  /**
   * Get room listings
   */
  getRooms: async (filters = {}) => {
    const { data } = await axiosInstance.get('/api/stay/rooms', { params: filters });
    return data;
  },

  /**
   * Get room by ID
   */
  getRoomById: async (roomId) => {
    const { data } = await axiosInstance.get(`/api/stay/rooms/${roomId}`);
    return data;
  },

  /**
   * Create room listing
   */
  createRoom: async (roomData) => {
    const { data } = await axiosInstance.post('/api/stay/rooms', roomData);
    return data;
  },

  /**
   * Update room listing
   */
  updateRoom: async (roomId, roomData) => {
    const { data } = await axiosInstance.put(`/api/stay/rooms/${roomId}`, roomData);
    return data;
  },

  /**
   * Delete room listing
   */
  deleteRoom: async (roomId) => {
    const { data } = await axiosInstance.delete(`/api/stay/rooms/${roomId}`);
    return data;
  },

  /**
   * Express interest in a room
   */
  expressInterest: async (interestData) => {
    // const { data } = await axiosInstance.post(`/api/stay/rooms/${roomId}/interest`, interestData);
    const { data } = await axiosInstance.post(`/api/posts/stay-post/roominterest`, interestData);
    return data;
  },

  /**
   * Get roommate listings
   */
  getRoommates: async (filters = {}) => {
    const { data } = await axiosInstance.get('/api/stay/roommates', { params: filters });
    return data;
  },

  /**
   * Preferences matched:
   * Frontend path: http://localhost:5173/app/room-housing
   * Endpoint: {{baseUrl}}/api/posts/stay-post/cards
   * Method: GET
   */
  getPreferencesMatched: async (filters = {}) => {
    const { data } = await axiosInstance.get('/api/posts/stay-post/cards', { params: filters });
    return data;
  },

  /**
   * Room matching by roomId
   * Endpoint: {{baseUrl}}/api/posts/stay-post/room/matching/:roomId
   * Method: GET
   */
  getRoomMatching: async (roomId) => {
    const { data } = await axiosInstance.get(`/api/posts/stay-post/room/matching/${roomId}`, {
      params: { roomId },
    });
    return data;
  },

  /**
   * Get roommate/needroom profile by ID
   * Endpoint: {{baseUrl}}/api/posts/stay-post/needroom/:profileId
   * Method: GET
   */
  getRoommateProfile: async (profileId) => {
    const { data } = await axiosInstance.get(`/api/posts/stay-post/needroom/${profileId}`);
    return data;
  },

  /**
   * Get stay card details by type and ID
   * Endpoint: {{baseUrl}}/api/posts/stay-post/cards/:type/:id
   * Method: GET
   * @param {string} cardType - ROOMMATE or ROOM
   * @param {string|number} cardId - The card ID
   */
  getStayCardById: async (cardType, cardId) => {
    const { data } = await axiosInstance.get(`/api/posts/stay-post/cards/${cardType}/${cardId}`);
    return data;
  },
};

// ============================================================================
// RE-EXPORT HOOKS FROM HOOKS DIRECTORY
// ============================================================================
// For convenience, re-export hooks so they can be imported from either location

