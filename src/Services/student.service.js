import axiosInstance from './config/axios.config';

// ============================================================================
// RAW API FUNCTIONS
// ============================================================================

export const studentApi = {
  /**
   * Get student/batchmate by ID
   * Endpoint: {{baseUrl}}/api/getStudent/:id
   * Method: GET
   */
  getStudentById: async (studentId) => {
    const { data } = await axiosInstance.get(`/api/getStudent/${studentId}`);
    return data;
  },

  /**
   * Get all students/batchmates
   */
  getStudents: async (filters = {}) => {
    const { data } = await axiosInstance.get('/api/students', { params: filters });
    return data;
  },

  /**
   * Get batchmates with filters
   * Endpoint: {{baseUrl}}/api/batchmates
   * Method: GET
   * Params: page, size, course, q (search query)
   */
  getBatchmates: async (filters = {}) => {
    const { data } = await axiosInstance.get('/api/batchmates', { params: filters });
    return data;
  },

  /**
   * Get batchmates with filters
   * Endpoint: {{baseUrl}}/api/batchmates
   * Method: GET
   * Params: page, size, course, q (search query)
   */
  getBatchmatesCoursesByUniversity: async (filters = {}) => {
    const { data } = await axiosInstance.get('/api/batchmates/courses', { params: filters });
    return data;
  },
};

// ============================================================================
// RE-EXPORT HOOKS FROM HOOKS DIRECTORY
// ============================================================================
// For convenience, re-export hooks so they can be imported from either location
export * from '../hooks/students';
