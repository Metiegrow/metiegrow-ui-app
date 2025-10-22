import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL_BACKEND;


// ============================================================================
// COMMON API UTILITIES
// ============================================================================

/**
 * Common error handler for all API calls
 */
const handleApiError = (error, customMessage = 'API request failed') => {
  console.error('API Error:', error);

  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data?.message || 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return "Access denied. You don't have permission for this action.";
      case 404:
        return 'Resource not found.';
      case 409:
        return data?.message || 'Conflict. This resource already exists.';
      case 422:
        return data?.message || 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data?.message || `Request failed with status ${status}`;
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return error.message || customMessage;
  }
};

/**
 * Common fetch wrapper with error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${BACKEND_URL}${endpoint}`;

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
      mode: 'cors', // Enable CORS
      credentials: 'include', // Include credentials if needed
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || `HTTP ${response.status}`);
      error.response = { status: response.status, data: errorData };
      throw error;
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Common POST request
 */
export const apiPost = async (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * Common GET request
 */
export const apiGet = async (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    method: 'GET',
    ...options,
  });
};

/**
 * Common PUT request
 */
export const apiPut = async (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * Common DELETE request
 */
export const apiDelete = async (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    method: 'DELETE',
    ...options,
  });
};

/**
 * Common PATCH request
 */
export const apiPatch = async (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * Common FormData POST request for file uploads
 */
export const apiPostFormData = async (endpoint, formData, options = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type for FormData, let browser set it with boundary
      ...options.headers,
    },
    ...options,
  });
};

// ============================================================================
// AUTHENTICATION & USER MANAGEMENT APIs
// ============================================================================

/**
 * User registration - general
 */
export const registerUser = async (userData) => {
  return apiPost('/api/register/student', userData);
};

/**
 * Student registration - specific endpoint
 */
export const registerStudent = async (studentData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/register/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Prefer `statuses[0].message` if available
      const backendMsg =
        errorData?.statuses?.[0]?.message ||
        errorData.message ||
        `Registration failed with status ${response.status}`;

      const error = new Error(backendMsg);
      error.response = { status: response.status, data: errorData };
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('Student registration error:', error);
    throw error;
  }
};

/**
 * User login
 */
export const loginUser = async (credentials) => {
  return apiPost('/api/auth/login', credentials);
};

/**
 * User logout
 */
export const logoutUser = async () => {
  return apiPost('/api/auth/logout');
};

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  return apiGet('/api/auth/me');
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, profileData) => {
  return apiPut(`/api/users/${userId}/profile`, profileData);
};

// ============================================================================
// ACCOUNT SETTINGS APIs
// ============================================================================

/**
 * Get account settings for a user
 */
export const getAccountSettings = async (userId) => {
  return apiGet(`/api/account-settings/${userId}`);
};

/**
 * Change phone number
 */
export const changePhoneNumber = async (userId, phoneData) => {
  return apiPut(`/api/account-settings/${userId}/change-phone`, phoneData);
};

/**
 * Change password
 */
export const changePassword = async (userId, passwordData) => {
  return apiPut(`/api/account-settings/${userId}/change-password`, passwordData);
};

/**
 * Change email
 */
export const changeEmail = async (userId, emailData) => {
  return apiPut(`/api/account-settings/${userId}/change-email`, emailData);
};

/**
 * Change timezone
 */
export const changeTimezone = async (userId, timezone) => {
  return apiPut(
    `/api/account-settings/${userId}/change-timezone?timeZone=${encodeURIComponent(timezone)}`
  );
};

/**
 * Change language
 */
export const changeLanguage = async (userId, language) => {
  return apiPut(
    `/api/account-settings/${userId}/change-language?language=${encodeURIComponent(language)}`
  );
};

// ============================================================================
// LOCATION & GEOGRAPHY APIs
// ============================================================================

/**
 * Normalize countries response into [{ name, phoneCode, flagUrl }]
 */
const normalizeCountries = (raw) => {
  try {
    let list = raw;
    if (!list) return [];
    if (Array.isArray(list)) {
      // ok
    } else if (Array.isArray(list.data)) {
      list = list.data;
    } else if (Array.isArray(list.countries)) {
      list = list.countries;
    } else {
      // Unknown shape
      return [];
    }

    // If items are strings, map to objects with defaults
    if (list.length && typeof list[0] === 'string') {
      return list.map((name) => ({
        name,
        phoneCode:
          name.toLowerCase() === 'australia'
            ? '+61'
            : name.toLowerCase() === 'india'
              ? '+91'
              : '+1',
        flagUrl: name
          ? `https://flagcdn.com/w320/${name.substring(0, 2).toLowerCase()}.png`
          : 'https://flagcdn.com/w320/us.png',
      }));
    }

    // Map and ensure required fields
    return list
      .map((c) => ({
        name: c.name || c.country || '',
        phoneCode: c.phoneCode || c.dial_code || c.code || '',
        flagUrl:
          c.flagUrl ||
          c.flag_url ||
          (c.iso2 ? `https://flagcdn.com/w320/${String(c.iso2).toLowerCase()}.png` : ''),
      }))
      .filter((c) => c.name && c.phoneCode);
  } catch (e) {
    console.warn('Failed to normalize countries:', e);
    return [];
  }
};

/**
 * Get all countries with phone codes and flags
 */
export const fetchCountries = async () => {
  try {
    const raw = await apiGet('/api/location/countries');
    const normalized = normalizeCountries(raw);
    if (normalized.length > 0) return normalized;
    // Fallback if normalization produced empty array
    return [
      {
        name: 'Australia',
        phoneCode: '+61',
        flagUrl: 'https://flagcdn.com/w320/au.png',
      },
      {
        name: 'USA',
        phoneCode: '+1',
        flagUrl: 'https://flagcdn.com/w320/us.png',
      },
      {
        name: 'UK',
        phoneCode: '+44',
        flagUrl: 'https://flagcdn.com/w320/gb.png',
      },
      {
        name: 'Canada',
        phoneCode: '+1',
        flagUrl: 'https://flagcdn.com/w320/ca.png',
      },
      {
        name: 'Germany',
        phoneCode: '+49',
        flagUrl: 'https://flagcdn.com/w320/de.png',
      },
      {
        name: 'France',
        phoneCode: '+33',
        flagUrl: 'https://flagcdn.com/w320/fr.png',
      },
      {
        name: 'India',
        phoneCode: '+91',
        flagUrl: 'https://flagcdn.com/w320/in.png',
      },
    ];
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Fallback to default countries if API fails
    return [
      {
        name: 'Australia',
        phoneCode: '+61',
        flagUrl: 'https://flagcdn.com/w320/au.png',
      },
      {
        name: 'USA',
        phoneCode: '+1',
        flagUrl: 'https://flagcdn.com/w320/us.png',
      },
      {
        name: 'UK',
        phoneCode: '+44',
        flagUrl: 'https://flagcdn.com/w320/gb.png',
      },
      {
        name: 'Canada',
        phoneCode: '+1',
        flagUrl: 'https://flagcdn.com/w320/ca.png',
      },
      {
        name: 'Germany',
        phoneCode: '+49',
        flagUrl: 'https://flagcdn.com/w320/de.png',
      },
      {
        name: 'France',
        phoneCode: '+33',
        flagUrl: 'https://flagcdn.com/w320/fr.png',
      },
      {
        name: 'India',
        phoneCode: '+91',
        flagUrl: 'https://flagcdn.com/w320/in.png',
      },
    ];
  }
};

/**
 * Get states/provinces for a country
 */
export const fetchStates = async (countryCode) => {
  if (!countryCode) return [];
  try {
    return await apiGet(`/api/location/states?country=${encodeURIComponent(countryCode)}`);
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
};

/**
 * Get cities for a state/country
 */
export const fetchCities = async (stateCode, countryCode) => {
  // Require both state and country to fetch cities (state-scoped cities)
  if (!stateCode || !countryCode) return [];
  try {
    const params = new URLSearchParams();
    params.append('state', stateCode);
    params.append('country', countryCode);
    return await apiGet(`/api/location/cities?${params.toString()}`);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

/**
 * Get available languages
 */
export const fetchLanguages = async () => {
  try {
    return await apiGet('/api/location/languages');
  } catch (error) {
    console.error('Error fetching languages:', error);
    // Fallback to default languages if API fails
    return [
      'English',
      'Hindi',
      'Mandarin',
      'Spanish',
      'French',
      'German',
      'Arabic',
      'Portuguese',
      'Russian',
      'Japanese',
      'Korean',
      'Italian',
      'Other',
    ];
  }
};

// ============================================================================
// EDUCATION APIs
// ============================================================================

/**
 * Get universities for a specific country
 */
export const fetchUniversities = async (country) => {
  const countryName = country ? country.toLowerCase() : null;
  console.log('fetchUniversities countryName : ', countryName);

  if (!countryName) return [];
  try {
    // Backend expects: GET /api/universities?country=india
    return await apiGet(
      `/api/universities?country=${encodeURIComponent(countryName.toLowerCase())}`
    );
  } catch (error) {
    // Try legacy path before falling back
    try {
      return await apiGet(
        `/api/location/universities?country=${encodeURIComponent(countryName.toLowerCase())}`
      );
    } catch (legacyError) {
      console.error('Error fetching universities:', legacyError);
      // Fallback to country-specific universities if API fails
      const countryLower = countryName.toLowerCase();
      if (countryLower.includes('india')) {
        return [
          'Indian Institute of Technology Delhi',
          'Indian Institute of Technology Bombay',
          'Indian Institute of Technology Madras',
          'Indian Institute of Technology Kanpur',
          'Indian Institute of Technology Kharagpur',
          'Delhi University',
          'Jawaharlal Nehru University',
          'Banaras Hindu University',
        ];
      } else if (countryLower.includes('australia')) {
        return [
          'University of Sydney',
          'University of Melbourne',
          'University of Queensland',
          'Monash University',
          'University of New South Wales',
          'Australian National University',
          'University of Western Australia',
        ];
      } else if (countryLower.includes('usa') || countryLower.includes('united states')) {
        return [
          'Harvard University',
          'Stanford University',
          'Massachusetts Institute of Technology',
          'California Institute of Technology',
          'University of California, Berkeley',
          'Yale University',
          'Princeton University',
        ];
      } else if (
        countryLower.includes('uk') ||
        countryLower.includes('united kingdom') ||
        countryLower.includes('britain')
      ) {
        return [
          'University of Oxford',
          'University of Cambridge',
          'Imperial College London',
          'University College London',
          'London School of Economics',
          'University of Edinburgh',
          "King's College London",
        ];
      } else if (countryLower.includes('canada')) {
        return [
          'University of Toronto',
          'University of British Columbia',
          'McGill University',
          'University of Montreal',
          'University of Alberta',
          'McMaster University',
        ];
      } else if (countryLower.includes('germany')) {
        return [
          'Technical University of Munich',
          'Ludwig Maximilian University of Munich',
          'Heidelberg University',
          'Karlsruhe Institute of Technology',
          'University of Freiburg',
          'RWTH Aachen University',
        ];
      } else {
        // Default fallback
        return [
          'University of Sydney',
          'University of Melbourne',
          'University of Queensland',
          'Monash University',
          'University of New South Wales',
        ];
      }
    }
  }
};

/**
 * Get courses/programs
 */
export const fetchCourses = async () => {
  try {
    return await apiGet('/api/education/courses');
  } catch (error) {
    console.error('Error fetching courses:', error);
    return ['Computer Science', 'Medicine', 'Engineering', 'Business Administration', 'Law'];
  }
};

// ============================================================================
// STAY & ACCOMMODATION APIs
// ============================================================================

/**
 * Create a room listing
 */
export const createRoom = async (roomData) => {
  return apiPost('/api/stay/rooms', roomData);
};

/**
 * Get room listings with filters
 */
export const getRooms = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  return apiGet(`/api/stay/rooms?${params.toString()}`);
};

/**
 * Get room by ID
 */
export const getRoomById = async (roomId) => {
  return apiGet(`/api/stay/rooms/${roomId}`);
};

/**
 * Update room listing
 */
export const updateRoom = async (roomId, roomData) => {
  return apiPut(`/api/stay/rooms/${roomId}`, roomData);
};

/**
 * Delete room listing
 */
export const deleteRoom = async (roomId) => {
  return apiDelete(`/api/stay/rooms/${roomId}`);
};

/**
 * Express interest in a room
 */
export const expressRoomInterest = async (roomId, interestData) => {
  return apiPost(`/api/stay/rooms/${roomId}/interest`, interestData);
};

// ============================================================================
// JOB & CAREER APIs
// ============================================================================

/**
 * Get job listings
 */
export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  return apiGet(`/api/jobs?${params.toString()}`);
};

/**
 * Get job by ID
 */
export const getJobById = async (jobId) => {
  return apiGet(`/api/jobs/${jobId}`);
};

/**
 * Apply for a job
 */
export const applyForJob = async (jobId, applicationData) => {
  return apiPost(`/api/jobs/${jobId}/apply`, applicationData);
};

/**
 * Create job posting
 */
export const createJob = async (jobData) => {
  return apiPost('/api/jobs', jobData);
};

// ============================================================================
// PERSONALISATION APIs
// ============================================================================

/**
 * Update study preferences
 */
export const updateStudyPreferences = async (userId, personalisationId, studyData) => {
  return apiPut(`/api/personalisation/${userId}/${personalisationId}/study`, studyData);
};

/**
 * Update mentor preferences
 */
export const updateMentorPreferences = async (userId, personalisationId, mentorData) => {
  return apiPut(`/api/personalisation/${userId}/${personalisationId}/mentor`, mentorData);
};

/**
 * Update job preferences
 */
export const updateJobPreferences = async (userId, personalisationId, jobData) => {
  return apiPut(`/api/personalisation/${userId}/${personalisationId}/job`, jobData);
};

/**
 * Update accommodation preferences
 */
export const updateAccommodationPreferences = async (
  userId,
  personalisationId,
  accommodationData
) => {
  return apiPut(
    `/api/personalisation/${userId}/${personalisationId}/accommodation`,
    accommodationData
  );
};

/**
 * Get personalisation data for a user
 */
export const getPersonalisationData = async (userId) => {
  return apiGet(`/api/personalisation/${userId}`);
};

/**
 * Get personalisation data by ID
 */
export const getPersonalisationDataById = async (userId, personalisationId) => {
  return apiGet(`/api/personalisation/${userId}/${personalisationId}`);
};

// ============================================================================
// REACT QUERY HOOKS
// ============================================================================

/**
 * Hook for fetching countries
 */
export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

/**
 * Hook for fetching states
 */
export const useStates = (countryCode) => {
  return useQuery({
    queryKey: ['states', countryCode],
    queryFn: () => fetchStates(countryCode),
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

/**
 * Hook for fetching cities
 */
export const useCities = (stateCode, countryCode) => {
  return useQuery({
    queryKey: ['cities', stateCode, countryCode],
    queryFn: () => fetchCities(stateCode, countryCode),
    // Only enable when both state and country are selected
    enabled: !!(stateCode && countryCode),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

/**
 * Hook for fetching languages
 */
export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

/**
 * Hook for fetching universities
 */
export const useUniversities = (country) => {
  return useQuery({
    queryKey: ['universities', country],
    queryFn: () => fetchUniversities(country),
    enabled: !!country,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

/**
 * Hook for fetching courses
 */
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

/**
 * Hook for fetching rooms
 */
export const useRooms = (filters = {}) => {
  return useQuery({
    queryKey: ['rooms', filters],
    queryFn: () => getRooms(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for fetching jobs
 */
export const useJobs = (filters = {}) => {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => getJobs(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for fetching personalisation data
 */
export const usePersonalisationData = (userId) => {
  return useQuery({
    queryKey: ['personalisation', userId],
    queryFn: () => getPersonalisationData(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for fetching personalisation data by ID
 */
export const usePersonalisationDataById = (userId, personalisationId) => {
  return useQuery({
    queryKey: ['personalisation', userId, personalisationId],
    queryFn: () => getPersonalisationDataById(userId, personalisationId),
    enabled: !!(userId && personalisationId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for fetching account settings
 */
export const useAccountSettings = (userId) => {
  return useQuery({
    queryKey: ['account-settings', userId],
    queryFn: () => getAccountSettings(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Hook for creating rooms
 */
export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      // Invalidate and refetch rooms
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

/**
 * Hook for creating jobs
 */
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      // Invalidate and refetch jobs
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

/**
 * Hook for applying to jobs
 */
export const useApplyForJob = () => {
  return useMutation({
    mutationFn: ({ jobId, applicationData }) => applyForJob(jobId, applicationData),
  });
};

/**
 * Hook for updating study preferences
 */
export const useUpdateStudyPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, personalisationId, studyData }) =>
      updateStudyPreferences(userId, personalisationId, studyData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch personalisation data
      queryClient.invalidateQueries({
        queryKey: ['personalisation', variables.userId],
      });
    },
  });
};

/**
 * Hook for updating mentor preferences
 */
export const useUpdateMentorPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, personalisationId, mentorData }) =>
      updateMentorPreferences(userId, personalisationId, mentorData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch personalisation data
      queryClient.invalidateQueries({
        queryKey: ['personalisation', variables.userId],
      });
    },
  });
};

/**
 * Hook for updating job preferences
 */
export const useUpdateJobPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, personalisationId, jobData }) =>
      updateJobPreferences(userId, personalisationId, jobData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch personalisation data
      queryClient.invalidateQueries({
        queryKey: ['personalisation', variables.userId],
      });
    },
  });
};

/**
 * Hook for updating accommodation preferences
 */
export const useUpdateAccommodationPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, personalisationId, accommodationData }) =>
      updateAccommodationPreferences(userId, personalisationId, accommodationData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch personalisation data
      queryClient.invalidateQueries({
        queryKey: ['personalisation', variables.userId],
      });
    },
  });
};

/**
 * Hook for changing phone number
 */
export const useChangePhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, phoneData }) => changePhoneNumber(userId, phoneData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch account settings
      queryClient.invalidateQueries({
        queryKey: ['account-settings', variables.userId],
      });
    },
  });
};

/**
 * Hook for changing password
 */
export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, passwordData }) => changePassword(userId, passwordData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch account settings
      queryClient.invalidateQueries({
        queryKey: ['account-settings', variables.userId],
      });
    },
  });
};

/**
 * Hook for changing email
 */
export const useChangeEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, emailData }) => changeEmail(userId, emailData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch account settings
      queryClient.invalidateQueries({
        queryKey: ['account-settings', variables.userId],
      });
    },
  });
};

/**
 * Hook for changing timezone
 */
export const useChangeTimezone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, timezone }) => changeTimezone(userId, timezone),
    onSuccess: (data, variables) => {
      // Invalidate and refetch account settings
      queryClient.invalidateQueries({
        queryKey: ['account-settings', variables.userId],
      });
    },
  });
};

/**
 * Hook for changing language
 */
export const useChangeLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, language }) => changeLanguage(userId, language),
    onSuccess: (data, variables) => {
      // Invalidate and refetch account settings
      queryClient.invalidateQueries({
        queryKey: ['account-settings', variables.userId],
      });
    },
  });
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get country by phone code
 */
export const getCountryByPhoneCode = (phoneCode, countries) => {
  return countries.find((country) => country.phoneCode === phoneCode);
};

/**
 * Get phone code by country name
 */
export const getPhoneCodeByCountry = (countryName, countries) => {
  const country = countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
  return country ? country.phoneCode : '+61'; // Default to Australia
};

/**
 * Get flag by country name
 */
export const getFlagByCountry = (countryName, countries) => {
  const country = countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
  return country ? country.flagUrl : 'https://flagcdn.com/w320/au.png'; // Default to Australia flag
};

/**
 * Build query string from object
 */
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  return searchParams.toString();
};

/**
 * Handle API response with proper error handling
 */
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }
  return response.json();
};

export default {
  // Common methods
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPatch,
  apiPostFormData,

  // Auth methods
  registerUser,
  registerStudent,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,

  // Account Settings methods
  getAccountSettings,
  changePhoneNumber,
  changePassword,
  changeEmail,
  changeTimezone,
  changeLanguage,

  // Location methods
  fetchCountries,
  fetchStates,
  fetchCities,

  // Education methods
  fetchUniversities,
  fetchCourses,

  // Stay methods
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  expressRoomInterest,

  // Job methods
  getJobs,
  getJobById,
  applyForJob,
  createJob,

  // Personalisation methods
  updateStudyPreferences,
  updateMentorPreferences,
  updateJobPreferences,
  updateAccommodationPreferences,
  getPersonalisationData,
  getPersonalisationDataById,

  // Utility methods
  getCountryByPhoneCode,
  getPhoneCodeByCountry,
  getFlagByCountry,
  buildQueryString,
  handleApiResponse,
};
