export const TITLE = 'Metiegrow';

export const getAbsoluteImageUrl = (relativePath) => {
  if (!relativePath) return '';
  // Check if the path is already an absolute URL
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  // Construct absolute URL for relative paths
  const URL = import.meta.env.VITE_API_BASE_URL;
  return `${URL}/${relativePath}`;
};
