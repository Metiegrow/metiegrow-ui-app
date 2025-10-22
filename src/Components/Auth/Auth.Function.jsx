export const getAuthData = () => {
  const authDataString = localStorage.getItem('authData') || sessionStorage.getItem('authData');
  return authDataString ? JSON.parse(authDataString) : null;
};

export const getAuthHeaders = () => {
  const authData = getAuthData();
  if (!authData?.token) {
    throw new Error('No authentication token found');
  }
  return {
    Authorization: `Bearer ${authData.token}`,
    'Content-Type': 'application/json',
  };
};

export const storeAuthData = (data, rememberMe = false) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('authData', JSON.stringify(data));
};

export const clearAuthData = () => {
  localStorage.removeItem('authData');
  sessionStorage.removeItem('authData');
};
