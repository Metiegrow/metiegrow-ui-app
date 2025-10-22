// Share Handler Utility
// Provides common sharing functionality across the application

export const SHARE_PLATFORMS = {
  WHATSAPP: 'whatsapp',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  TELEGRAM: 'telegram',
  EMAIL: 'email',
  COPY_LINK: 'copy_link',
};

export const SHARE_CONFIG = {
  [SHARE_PLATFORMS.WHATSAPP]: {
    name: 'WhatsApp',
    icon: '📱',
    color: '#25D366',
    urlTemplate: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
  },
  [SHARE_PLATFORMS.FACEBOOK]: {
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    urlTemplate: (url, text) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
  },
  [SHARE_PLATFORMS.TWITTER]: {
    name: 'Twitter',
    icon: '🐦',
    color: '#1DA1F2',
    urlTemplate: (url, text) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  [SHARE_PLATFORMS.LINKEDIN]: {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0077B5',
    urlTemplate: (url, text) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  [SHARE_PLATFORMS.TELEGRAM]: {
    name: 'Telegram',
    icon: '✈️',
    color: '#0088CC',
    urlTemplate: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  [SHARE_PLATFORMS.EMAIL]: {
    name: 'Email',
    icon: '📧',
    color: '#EA4335',
    urlTemplate: (url, text) =>
      `mailto:?subject=${encodeURIComponent('Check this out!')}&body=${encodeURIComponent(text + '\n\n' + url)}`,
  },
};

/**
 * Share content to a specific platform
 * @param {string} platform - The platform to share to
 * @param {Object} shareData - The data to share
 * @param {string} shareData.url - The URL to share
 * @param {string} shareData.title - The title/text to share
 * @param {string} shareData.description - Optional description
 */
export const shareToPlatform = (platform, shareData) => {
  const { url, title, description } = shareData;
  const text = title || description || 'Check this out!';

  try {
    switch (platform) {
      case SHARE_PLATFORMS.WHATSAPP:
      case SHARE_PLATFORMS.FACEBOOK:
      case SHARE_PLATFORMS.TWITTER:
      case SHARE_PLATFORMS.LINKEDIN:
      case SHARE_PLATFORMS.TELEGRAM:
        const config = SHARE_CONFIG[platform];
        const shareUrl = config.urlTemplate(url, text);
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
        return { success: true, message: `Shared to ${config.name}` };

      case SHARE_PLATFORMS.EMAIL:
        const emailConfig = SHARE_CONFIG[platform];
        const emailUrl = emailConfig.urlTemplate(url, text);
        window.location.href = emailUrl;
        return { success: true, message: 'Email client opened' };

      case SHARE_PLATFORMS.COPY_LINK:
        navigator.clipboard
          .writeText(url)
          .then(() => {
            return { success: true, message: 'Link copied to clipboard!' };
          })
          .catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return { success: true, message: 'Link copied to clipboard!' };
          });
        return { success: true, message: 'Link copied to clipboard!' };

      default:
        return { success: false, message: 'Unsupported platform' };
    }
  } catch (error) {
    console.error('Share error:', error);
    return { success: false, message: 'Failed to share' };
  }
};

/**
 * Get available share platforms for the current device/browser
 * @returns {Array} Array of available platform keys
 */
export const getAvailablePlatforms = () => {
  const platforms = Object.keys(SHARE_PLATFORMS);

  // Check if Web Share API is available (modern browsers)
  if (navigator.share) {
    return platforms;
  }

  // Filter out platforms that require specific apps/browsers
  return platforms.filter((platform) => {
    switch (platform) {
      case SHARE_PLATFORMS.WHATSAPP:
        return (
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
          window.innerWidth <= 768
        ); // Mobile detection
      default:
        return true;
    }
  });
};

/**
 * Use native Web Share API if available
 * @param {Object} shareData - The data to share
 */
export const shareNative = async (shareData) => {
  const { url, title, description } = shareData;

  if (navigator.share) {
    try {
      await navigator.share({
        title: title || 'Check this out!',
        text: description || title || 'Check this out!',
        url: url,
      });
      return { success: true, message: 'Shared successfully!' };
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Native share error:', error);
        return { success: false, message: 'Share cancelled' };
      }
    }
  }

  return { success: false, message: 'Native sharing not supported' };
};

/**
 * Generate shareable content for different types
 * @param {string} type - Type of content ('post', 'profile', 'event', etc.)
 * @param {Object} data - Content data
 * @returns {Object} Formatted share data
 */
export const generateShareContent = (type, data) => {
  const baseUrl = window.location.origin;

  switch (type) {
    case 'post':
      return {
        url: `${baseUrl}/post/${data.id}`,
        title: data.title || 'Check out this post!',
        description: data.content?.substring(0, 100) + '...',
      };

    case 'profile':
      return {
        url: `${baseUrl}/profile/${data.userId}`,
        title: `Check out ${data.name}'s profile!`,
        description: data.bio || `Connect with ${data.name} on our platform.`,
      };

    case 'question':
      return {
        url: `${baseUrl}/question/${data.id}`,
        title: data.title || 'Interesting question!',
        description: data.content?.substring(0, 100) + '...',
      };

    case 'room':
      return {
        url: `${baseUrl}/room/${data.id}`,
        title: `Room available: ${data.location}`,
        description: `Check out this ${data.roomType} room in ${data.location}. ${data.description?.substring(0, 100)}...`,
      };

    default:
      return {
        url: baseUrl,
        title: 'Check out our platform!',
        description: 'Discover amazing opportunities and connect with others.',
      };
  }
};
