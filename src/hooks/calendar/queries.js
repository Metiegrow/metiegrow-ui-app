import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarApi } from '@/Services/calendar.service';

/**
 * Query Keys
 */
export const calendarKeys = {
  all: () => ['calendar'],
  appointments: {
    all: () => [...calendarKeys.all(), 'appointments'],
    byUser: (userId) => [...calendarKeys.appointments.all(), userId],
  },
  availability: {
    all: () => [...calendarKeys.all(), 'availability'],
    byMentor: (mentorId) => [...calendarKeys.availability.all(), mentorId],
  },
  slots: {
    all: () => [...calendarKeys.all(), 'slots'],
  },
};

// ============================================================================
// QUERY HOOKS (GET)
// ============================================================================

/**
 * Fetch appointments for a user
 */
export const useAppointments = (userId, options = {}) => {
  return useQuery({
    queryKey: calendarKeys.appointments.byUser(userId),
    queryFn: () => calendarApi.getAppointments(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
};

/**
 * Fetch mentor availability
 */
export const useMentorAvailability = (mentorId, options = {}) => {
  return useQuery({
    queryKey: calendarKeys.availability.byMentor(mentorId),
    queryFn: () => calendarApi.getMentorAvailability(mentorId),
    enabled: !!mentorId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

// ============================================================================
// MUTATION HOOKS (POST/PUT/DELETE)
// ============================================================================

/**
 * Book an appointment
 */
export const useBookAppointment = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calendarApi.bookAppointment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: calendarKeys.appointments.byUser(variables.userId),
      });
      queryClient.invalidateQueries({
        queryKey: calendarKeys.availability.all(),
      });
    },
    ...options,
  });
};

/**
 * Create mentor appointment
 */
export const useCreateMentorAppointment = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calendarApi.createMentorAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: calendarKeys.all() });
    },
    ...options,
  });
};
