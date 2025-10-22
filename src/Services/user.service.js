import axiosInstance from './config/axios.config';

/**
 * User Profile API Service
 */

export const userApi = {
  getMyProfile: async () => {
    const { data } = await axiosInstance.get('/api/userprofile/myprofile');
    return data;
  },

  updateMyProfile: async (profileData) => {
    const { data } = await axiosInstance.put('/api/userprofile/myprofile', profileData);
    return data;
  },

  registerProfile: async (profileData) => {
    const { data } = await axiosInstance.post('/api/userprofile/profile', profileData);
    return data;
  },

  getProfileDetails: async () => {
    const { data } = await axiosInstance.get('/api/userprofile/profiledetails');
    return data;
  },

  updateProfileDetails: async (detailsData) => {
    const { data } = await axiosInstance.put('/api/userprofile/profiledetails', detailsData);
    return data;
  },

  addWork: async (workData) => {
    const { data } = await axiosInstance.post('/api/userprofile/work', workData);
    return data;
  },

  updateWork: async (workData) => {
    const { data } = await axiosInstance.put('/api/userprofile/work', workData);
    return data;
  },

  addEducation: async (educationData) => {
    const { data } = await axiosInstance.post('/api/userprofile/education', educationData);
    return data;
  },

  updateEducation: async (educationData) => {
    const { data} = await axiosInstance.put('/api/userprofile/education', educationData);
    return data;
  },

  getAccountSettings: async (userId) => {
    const { data } = await axiosInstance.get(`/api/account-settings/${userId}`);
    return data;
  },

  changePhoneNumber: async (userId, phoneData) => {
    const { data } = await axiosInstance.put(`/api/account-settings/${userId}/change-phone`, phoneData);
    return data;
  },

  changeEmail: async (userId, emailData) => {
    const { data } = await axiosInstance.put(`/api/account-settings/${userId}/change-email`, emailData);
    return data;
  },

  changeTimezone: async (userId, timezone) => {
    const { data } = await axiosInstance.put(
      `/api/account-settings/${userId}/change-timezone?timeZone=${encodeURIComponent(timezone)}`
    );
    return data;
  },

  changeLanguage: async (userId, language) => {
    const { data } = await axiosInstance.put(
      `/api/account-settings/${userId}/change-language?language=${encodeURIComponent(language)}`
    );
    return data;
  },
};
