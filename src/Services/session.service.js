import axiosInstance from './config/axios.config';

/**
 * Session API Service
 * Raw API functions for session operations
 */

export const sessionApi = {
  /**
   * Get upcoming sessions
   */
  getUpcomingSessions: async () => {
    // TODO: Implement when API is ready
    // const { data } = await axiosInstance.get('/api/sessions/upcoming');
    // return data;
    return []; // Return empty array for now
  },

  /**
   * Get past sessions
   */
  getPastSessions: async () => {
    // TODO: Implement when API is ready
    // const { data } = await axiosInstance.get('/api/sessions/past');
    // return data;
    return [];
  },

  /**
   * Get session by ID
   */
  getSessionById: async (sessionId) => {
    const { data } = await axiosInstance.get(`/api/sessions/${sessionId}`);
    return data;
  },

  /**
   * Book a session
   */
  bookSession: async (sessionData) => {
    const { data } = await axiosInstance.post('/api/sessions/book', sessionData);
    return data;
  },

  /**
   * Cancel a session
   */
  cancelSession: async (sessionId) => {
    const { data } = await axiosInstance.delete(`/api/sessions/${sessionId}`);
    return data;
  },
};
