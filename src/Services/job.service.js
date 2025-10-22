import axiosInstance from './config/axios.config';

// ============================================================================
// RAW API FUNCTIONS
// ============================================================================

export const jobApi = {
  /**
   * Get all job posts
   */
  getJobs: async (filters = {}) => {
    const { data } = await axiosInstance.get('/jobs', { params: filters });
    return data;
  },

  /**
   * Get job by ID
   */
  getJobById: async (jobId) => {
    const { data } = await axiosInstance.get(`/jobs/${jobId}`);
    return data;
  },

  /**
   * Create job post
   */
  createJob: async (jobData) => {
    const { data } = await axiosInstance.post('/jobs/create', jobData);
    return data;
  },

  /**
   * Apply for a job
   */
  applyForJob: async (jobId, applicationData) => {
    const { data } = await axiosInstance.post(`/jobs/${jobId}/apply`, applicationData);
    return data;
  },

  /**
   * Get job applications
   */
  getJobApplications: async (jobId) => {
    const { data } = await axiosInstance.get(`/jobs/${jobId}/applications`);
    return data;
  },
};
