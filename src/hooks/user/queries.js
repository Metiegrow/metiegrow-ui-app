import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/Services/user.service';

/**
 * User Query Keys (Colocated)
 */
export const userKeys = {
  all: () => ['user'],
  myProfile: () => [...userKeys.all(), 'myProfile'],
  details: () => [...userKeys.all(), 'details'],
  accountSettings: (userId) => [...userKeys.all(), 'accountSettings', userId],
};

// ============================================================================
// QUERY HOOKS
// ============================================================================

export const useMyProfile = (options = {}) => {
  return useQuery({
    queryKey: userKeys.myProfile(),
    queryFn: userApi.getMyProfile,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useProfileDetails = (options = {}) => {
  return useQuery({
    queryKey: userKeys.details(),
    queryFn: userApi.getProfileDetails,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useAccountSettings = (userId, options = {}) => {
  return useQuery({
    queryKey: userKeys.accountSettings(userId),
    queryFn: () => userApi.getAccountSettings(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// ============================================================================
// MUTATION HOOKS
// ============================================================================

export const useUpdateMyProfile = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.myProfile() });
    },
    ...options,
  });
};

export const useRegisterProfile = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.registerProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
    },
    ...options,
  });
};

export const useUpdateProfileDetails = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfileDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.details() });
    },
    ...options,
  });
};

export const useAddWork = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.addWork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
    },
    ...options,
  });
};

export const useUpdateWork = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateWork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
    },
    ...options,
  });
};

export const useAddEducation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.addEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
    },
    ...options,
  });
};

export const useUpdateEducation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
    },
    ...options,
  });
};

export const useChangePhoneNumber = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, phoneData }) => userApi.changePhoneNumber(userId, phoneData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.accountSettings(variables.userId),
      });
    },
    ...options,
  });
};

export const useChangeEmail = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, emailData }) => userApi.changeEmail(userId, emailData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.accountSettings(variables.userId),
      });
    },
    ...options,
  });
};

export const useChangeTimezone = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, timezone }) => userApi.changeTimezone(userId, timezone),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.accountSettings(variables.userId),
      });
    },
    ...options,
  });
};

export const useChangeLanguage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, language }) => userApi.changeLanguage(userId, language),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.accountSettings(variables.userId),
      });
    },
    ...options,
  });
};
