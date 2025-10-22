import axiosInstance from './config/axios.config';

// ============================================================================
// RAW API FUNCTIONS
// ============================================================================

export const personalizationApi = {
  /**
   * Get personalization data for a user
   */
  getPersonalizationData: async (userId) => {
    const { data } = await axiosInstance.get(`/api/personalisation/${userId}`);
    return data;
  },

  /**
   * Get study preferences
   */
  getStudyPreferences: async (userId) => {
    const { data } = await axiosInstance.get(`/api/personalisation/${userId}/study`);
    return data;
  },

  /**
   * Update study preferences
   */
  updateStudyPreferences: async (userId, studyData) => {
    const { data } = await axiosInstance.post(`/api/personalisation/${userId}/study`, studyData);
    return data;
  },

  /**
   * Get mentor preferences
   */
  getMentorPreferences: async (userId) => {
    const { data } = await axiosInstance.get(`/api/personalisation/${userId}/mentor`);
    return data;
  },

  /**
   * Update mentor preferences
   */
  updateMentorPreferences: async (userId, mentorData) => {
    const { data } = await axiosInstance.post(`/api/personalisation/${userId}/mentor`, mentorData);
    return data;
  },

  /**
   * Get job preferences
   */
  getJobPreferences: async (userId) => {
    const { data } = await axiosInstance.get(`/api/personalisation/${userId}/job`);
    return data;
  },

  /**
   * Update job preferences
   */
  updateJobPreferences: async (userId, jobData) => {
    const { data } = await axiosInstance.post(`/api/personalisation/${userId}/job`, jobData);
    return data;
  },

  /**
   * Get accommodation preferences
   */
  getAccommodationPreferences: async (userId) => {
    const { data } = await axiosInstance.get(`/api/personalisation/${userId}/accommodation`);
    return data;
  },

  /**
   * Update accommodation preferences
   */
  updateAccommodationPreferences: async (userId, accommodationData) => {
    const { data } = await axiosInstance.post(
      `/api/personalisation/${userId}/accommodation`,
      accommodationData
    );
    return data;
  },
};
