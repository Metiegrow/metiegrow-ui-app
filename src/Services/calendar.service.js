import axiosInstance from './config/axios.config';

// ============================================================================
// RAW API FUNCTIONS
// ============================================================================

export const calendarApi = {
  /**
   * Book an appointment
   */
  bookAppointment: async (appointmentData) => {
    const { data } = await axiosInstance.post('/api/calendar/appointment/book', appointmentData);
    return data;
  },

  /**
   * Create mentor appointment - working
   */
  createMentorAppointment: async (appointmentData) => {
    const { data } = await axiosInstance.post(
      '/api/calendarv1/appointment/mentor',
      appointmentData
    );
    return data;
  },

  /**
   * Get appointments for a user
   */
  getAppointments: async (userId) => {
    const { data } = await axiosInstance.get(`/api/calendar/appointments/${userId}`);
    return data;
  },

  /**
   * Get mentor availability - working
   */
  getMentorAvailability: async (mentorId) => {
    const { data } = await axiosInstance.get(`/api/calendarv1/mentor/${mentorId}/availability`);
    // const { data } = await axiosInstance.get(`/api/calendar/availability/${mentorId}`);
    return data;
  },
};

// ============================================================================
// RE-EXPORT HOOKS FROM HOOKS DIRECTORY
// ============================================================================
// For convenience, re-export hooks so they can be imported from either location
export * from '../hooks/calendar';
