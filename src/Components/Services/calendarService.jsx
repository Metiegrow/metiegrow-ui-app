const BASE_URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

export const calendarService = {
  /**
   * Create mentor booking slots
   * @param {Object} payload
   * {
   *   startDate: 'YYYY-MM-DD',
   *   endDate: 'YYYY-MM-DD',
   *   weekDays: number[], // e.g., [1,3,5] (Mon, Wed, Fri)
   *   slotDurationMinutes: number, // e.g., 60
   *   startTime: 'HH:mm', // e.g., '09:00'
   *   endTime: 'HH:mm' // e.g., '17:00'
   * }
   */
  async createMentorSlots(payload) {
    console.log('payload', payload);
    try {
      const response = await fetch(`${BASE_URL}/api/calendarv1/appointment/mentor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || `HTTP error! status: ${response.status}`);
      }
      return { success: true, data };
    } catch (error) {
      console.error('createMentorSlots error:', error);
      return { success: false, error: error.message || 'Failed to create mentor slots.' };
    }
  },

  /**
   * Get mentor availability (for students to view)
   * GET /api/calendarv1/mentor/{mentorId}/availability
   */
  async getMentorAvailability(mentorId) {
    try {
      const response = await fetch(`${BASE_URL}/api/calendarv1/mentor/${mentorId}/availability`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || `HTTP error! status: ${response.status}`);
      }
      return { success: true, data };
    } catch (error) {
      console.error('getMentorAvailability error:', error);
      return { success: false, error: error.message || 'Failed to load mentor availability.' };
    }
  },

  /**
   * Create mentor appointment slots
   * POST /api/calendar/appointment/mentor
   * @param {Array} slots - Array of {fromTimeStamp, toTimeStamp}
   */
  async createMentorAppointmentSlots(slots) {
    try {
      const response = await fetch(`${BASE_URL}/api/calendar/appointment/mentor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slots),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || `HTTP error! status: ${response.status}`);
      }
      return { success: true, data };
    } catch (error) {
      console.error('createMentorAppointmentSlots error:', error);
      return { success: false, error: error.message || 'Failed to create mentor slots.' };
    }
  },
};
