import axiosInstance from './config/axios.config';

// ============================================================================
// RAW API FUNCTIONS
// ============================================================================

export const lawyerApi = {
  /**
   * Create lawyer profile
   */
  createProfile: async (profileData) => {
    const { data } = await axiosInstance.post('/api/lawyer/profile', profileData);
    return data;
  },

  /**
   * Create lawyer services
   */
  createServices: async (servicesData) => {
    const { data } = await axiosInstance.post('/api/lawyer/services', servicesData);
    return data;
  },

  /**
   * Purchase lawyer package
   */
  purchasePackage: async (lawyerId, packageId) => {
    const { data } = await axiosInstance.post(
      `/api/lawyer/${lawyerId}/service/${packageId}/purchase`
    );
    return data;
  },

  /**
   * Get lawyer by ID
   */
  getLawyerById: async (lawyerId) => {
    const { data } = await axiosInstance.get(`/api/lawyers/${lawyerId}`);
    return data;
  },

  /**
   * Get all lawyers (with filters)
   */
  getLawyers: async (filters = {}) => {
    const { data } = await axiosInstance.get('/api/lawyers', { params: filters });
    return data;
  },

  /**
   * Get my cases
   */
  getMyCases: async () => {
    const { data } = await axiosInstance.get('/api/lawyer/cases');
    return data;
  },

  /**
   * Get lawyer cards for dashboard (paginated)
   */
  getLawyerCards: async (params = { page: 0, size: 2 }) => {
    const { data } = await axiosInstance.get('/api/lawyer/lawyercards', { params });
    return data;
  },
};
