import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/Services/auth.service';

/**
 * Auth Query Keys (Colocated)
 */
export const authKeys = {
  all: () => ['auth'],
  currentUser: () => [...authKeys.all(), 'currentUser'],
};

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Get current user
 */
export const useCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Login mutation
 */
export const useLogin = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.currentUser(), data);
    },
    ...options,
  });
};

/**
 * Signup mutation
 */
export const useSignup = (options = {}) => {
  return useMutation({
    mutationFn: authApi.signup,
    ...options,
  });
};

/**
 * Register student mutation
 */
export const useRegisterStudent = (options = {}) => {
  return useMutation({
    mutationFn: authApi.registerStudent,
    ...options,
  });
};

/**
 * Logout mutation
 */
export const useLogout = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
    },
    ...options,
  });
};

/**
 * Reset password mutation
 */
export const useResetPassword = (options = {}) => {
  return useMutation({
    mutationFn: authApi.resetPassword,
    ...options,
  });
};

/**
 * Change password mutation
 */
export const useChangePassword = (options = {}) => {
  return useMutation({
    mutationFn: authApi.changePassword,
    ...options,
  });
};

/**
 * Verify OTP mutation
 */
export const useVerifyOTP = (options = {}) => {
  return useMutation({
    mutationFn: authApi.verifyOTP,
    ...options,
  });
};

/**
 * Forgot password mutation
 */
export const useForgotPassword = (options = {}) => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    ...options,
  });
};
