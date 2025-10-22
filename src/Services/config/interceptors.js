import { getAuthHeaders } from '@/Components/Auth/Auth.Function';

/**
 * Setup axios request and response interceptors
 */
export const setupInterceptors = (axiosInstance) => {
  // Request interceptor - Add auth headers
  axiosInstance.interceptors.request.use(
    (config) => {
      try {
        const authHeaders = getAuthHeaders();
        config.headers = { ...config.headers, ...authHeaders };
      } catch (error) {
        // No auth headers available - continue without them
        console.log('No auth headers available', error);
      }

      // Log requests in development
      if (import.meta.env.DEV) {
        console.log(
          `📤 ${config.method?.toUpperCase()} ${config.url}`,
          config.data || config.params
        );
      }

      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle errors globally
  axiosInstance.interceptors.response.use(
    (response) => {
      // Log responses in development
      if (import.meta.env.DEV) {
        console.log(
          `📥 ${response.config.method?.toUpperCase()} ${response.config.url}`,
          response.data
        );
      }
      return response;
    },
    (error) => {
      const enhancedError = handleApiError(error);
      console.error('API Error:', enhancedError);
      return Promise.reject(enhancedError);
    }
  );
};

/**
 * Centralized API error handler
 */
const handleApiError = (error) => {
  // Network error
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return {
        message: 'Request timeout. Please try again.',
        type: 'TIMEOUT',
        originalError: error,
      };
    }
    return {
      message: 'Network error. Please check your connection.',
      type: 'NETWORK_ERROR',
      originalError: error,
    };
  }

  // Server responded with error
  const { status, data } = error.response;

  switch (status) {
    case 400:
      return {
        message:
          data?.message ||
          data?.statuses?.[0]?.message ||
          'Invalid request. Please check your input.',
        type: 'BAD_REQUEST',
        status,
        data,
      };

    case 401:
      return {
        message: 'Unauthorized. Please login again.',
        type: 'UNAUTHORIZED',
        status,
        data,
      };

    case 403:
      return {
        message: "Access denied. You don't have permission.",
        type: 'FORBIDDEN',
        status,
        data,
      };

    case 404:
      return {
        message: data?.message || 'Resource not found.',
        type: 'NOT_FOUND',
        status,
        data,
      };

    case 409:
      return {
        message: data?.message || 'Conflict. Resource already exists.',
        type: 'CONFLICT',
        status,
        data,
      };

    case 422:
      return {
        message: data?.message || data?.statuses?.[0]?.message || 'Validation failed.',
        type: 'VALIDATION_ERROR',
        status,
        data,
        errors: data?.errors || data?.statuses,
      };

    case 429:
      return {
        message: 'Too many requests. Please try again later.',
        type: 'RATE_LIMIT',
        status,
        data,
      };

    case 500:
    case 502:
    case 503:
    case 504:
      return {
        message: 'Server error. Please try again later.',
        type: 'SERVER_ERROR',
        status,
        data,
      };

    default:
      return {
        message: data?.message || `Request failed with status ${status}`,
        type: 'UNKNOWN_ERROR',
        status,
        data,
      };
  }
};
