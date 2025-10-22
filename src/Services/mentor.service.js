import axiosInstance from './config/axios.config';

// ============================================================================
// RAW API FUNCTIONS
// ============================================================================

export const mentorApi = {
  /**
   * Register as mentor
   */
  registerMentor: async (mentorData) => {
    const { data } = await axiosInstance.post('/api/v1/mentor/register', mentorData);
    return data;
  },

  /**
   * Get mentor profile
   */
  getMyMentorProfile: async () => {
    const { data } = await axiosInstance.get('/api/mentor/myprofile');
    return data;
  },

  /**
   * Add mentor experience
   */
  addExperience: async (experienceData) => {
    const { data } = await axiosInstance.post('/api/mentor/experience', experienceData);
    return data;
  },

  /**
   * Get mentor by ID
   */
  getMentorById: async (mentorId) => {
    const { data } = await axiosInstance.get(`/api/mentors/${mentorId}`);
    return data;
  },

  /**
   * Get all mentors (with filters)
   */
  getMentors: async (filters = {}) => {
    const { data } = await axiosInstance.get('/api/mentors', { params: filters });
    return data;
  },

  /**
   * Get mentor cards for dashboard (paginated)
   */
  getMentorCards: async (params = { page: 0, size: 2 }) => {
    const { data } = await axiosInstance.get('/api/v1/mentor/cards', { params });
    return data;
  },
};
