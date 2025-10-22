import axiosInstance from './config/axios.config';

/**
 * Alumni API Service
 * Raw API functions for alumni operations
 */

export const alumniApi = {
  /**
   * Get alumni cards for dashboard
   */
  getAlumniCards: async () => {
    const { data } = await axiosInstance.get('/api/alumni/cards');
    return data;
  },

  /**
   * Get alumni by ID
   */
  getAlumniById: async (alumniId) => {
    const { data } = await axiosInstance.get(`/api/alumni/${alumniId}`);
    return data;
  },

  /**
   * Get all alumni (with filters)
   */
  getAlumni: async (filters = {}) => {
    const { data} = await axiosInstance.get('/api/alumni', { params: filters });
    return data;
  },

  /**
   * Book alumni session
   */
  bookSession: async (alumniId, sessionData) => {
    const { data } = await axiosInstance.post(`/api/alumni/${alumniId}/book`, sessionData);
    return data;
  },
};
