import { useQuery } from '@tanstack/react-query';
import { studentApi } from '@/Services/student.service';

/**
 * Query Keys
 */
export const studentKeys = {
  all: () => ['students'],
  list: (filters) => [...studentKeys.all(), { filters }],
  detail: (studentId) => [...studentKeys.all(), studentId],
};

// ============================================================================
// QUERY HOOKS (GET)
// ============================================================================

/**
 * Fetch student/batchmate by ID
 * Endpoint: {{baseUrl}}/api/getStudent/:id
 * Method: GET
 */
export const useStudent = (studentId, options = {}) => {
  return useQuery({
    queryKey: studentKeys.detail(studentId),
    queryFn: () => studentApi.getStudentById(studentId),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch all students/batchmates
 */
export const useStudents = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: studentKeys.list(filters),
    queryFn: () => studentApi.getStudents(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch batchmates with filters (search, course, pagination)
 * Endpoint: {{baseUrl}}/api/batchmates
 * Method: GET
 * Params: page, size, course, q (search query)
 */
export const useBatchmates = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ['batchmates', filters],
    queryFn: () => studentApi.getBatchmates(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Fetch batchmates with filters (search, course, pagination)
 * Endpoint: {{baseUrl}}/api/batchmates
 * Method: GET
 * Params: page, size, course, q (search query)
 */
export const useBatchmatesCoursesByUniversities = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ['batchmates-courses', filters],
    queryFn: () => studentApi.getBatchmatesCoursesByUniversity(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};
