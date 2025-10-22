/**
 * Share Templates System
 * Pre-defined templates for different content types and scenarios
 */

export const SHARE_TEMPLATES = {
  // Post templates
  post: {
    exciting: '🚀 Just discovered this amazing post! Check it out:',
    professional: '📈 Interesting insights shared in this post:',
    question: '🤔 Thought-provoking question that got me thinking:',
    inspirational: '✨ This post really inspired me. You might find it valuable too:',
  },

  // Profile templates
  profile: {
    networking: '👋 Great to connect with amazing people! Meet:',
    professional: '💼 Outstanding professional in the field:',
    student: '🎓 Talented student making waves:',
    mentor: '🧠 Experienced mentor sharing wisdom:',
  },

  // Question templates
  question: {
    help: '❓ Need some expert advice on this topic:',
    discussion: '💬 Interesting discussion happening here:',
    learning: '📚 Great learning opportunity:',
    career: '💼 Career-related question worth considering:',
  },

  // Room templates
  room: {
    available: '🏠 Great accommodation opportunity available:',
    shared: '🤝 Looking for roommates? Check this out:',
    premium: '⭐ Premium housing option:',
    student: '🎓 Perfect for students:',
  },

  // General templates
  general: {
    amazing: '😍 This is absolutely amazing! You have to see this:',
    useful: '💡 Found something really useful:',
    trending: '🔥 This is trending and worth checking out:',
    exclusive: "⭐ Exclusive content you don't want to miss:",
  },
};

export const EMOJI_CATEGORIES = {
  reactions: ['😍', '❤️', '🔥', '⭐', '🚀', '💡', '🤔', '👏', '🎉', '✨'],
  objects: ['📱', '💼', '🏠', '🎓', '📚', '💰', '⏰', '📍', '🎯', '📊'],
  symbols: ['✅', '❌', '⚠️', 'ℹ️', '🔗', '📎', '📌', '🎯', '💯', '🔥'],
  activities: ['🏃', '💼', '🎓', '✈️', '🏠', '💰', '📈', '🎨', '🎵', '⚽'],
};

/**
 * Get recommended templates for a content type
 * @param {string} contentType - Type of content
 * @param {Object} data - Content data
 * @returns {Array} Array of template objects
 */
export const getRecommendedTemplates = (contentType, data = {}) => {
  const templates = SHARE_TEMPLATES[contentType] || SHARE_TEMPLATES.general;

  return Object.entries(templates).map(([key, template]) => ({
    id: key,
    text: template,
    category: key,
    emoji: getTemplateEmoji(key),
  }));
};

/**
 * Get emoji for template category
 * @param {string} category - Template category
 * @returns {string} Emoji
 */
export const getTemplateEmoji = (category) => {
  const emojiMap = {
    exciting: '🚀',
    professional: '💼',
    question: '❓',
    inspirational: '✨',
    networking: '👋',
    student: '🎓',
    mentor: '🧠',
    help: '🆘',
    discussion: '💬',
    learning: '📚',
    career: '💼',
    available: '🏠',
    shared: '🤝',
    premium: '⭐',
    amazing: '😍',
    useful: '💡',
    trending: '🔥',
    exclusive: '⭐',
  };

  return emojiMap[category] || '📤';
};

/**
 * Generate personalized share message
 * @param {string} template - Template text
 * @param {Object} data - Content data
 * @returns {string} Personalized message
 */
export const generatePersonalizedMessage = (template, data) => {
  let message = template;

  // Replace placeholders with actual data
  if (data.title) {
    message = message.replace('{title}', data.title);
  }
  if (data.author) {
    message = message.replace('{author}', data.author);
  }
  if (data.name) {
    message = message.replace('{name}', data.name);
  }

  // Add content-specific details
  switch (data.type) {
    case 'post':
      if (data.category) {
        message += `\n\nCategory: ${data.category}`;
      }
      break;
    case 'profile':
      if (data.role) {
        message += `\n\nRole: ${data.role}`;
      }
      break;
    case 'question':
      if (data.tags) {
        message += `\n\nTags: ${data.tags.join(', ')}`;
      }
      break;
    case 'room':
      if (data.location) {
        message += `\n\nLocation: ${data.location}`;
      }
      if (data.price) {
        message += `\nPrice: ${data.price}`;
      }
      break;
  }

  return message;
};

/**
 * Get trending hashtags for content type
 * @param {string} contentType - Type of content
 * @param {Object} data - Content data
 * @returns {Array} Array of relevant hashtags
 */
export const getTrendingHashtags = (contentType, data = {}) => {
  const baseHashtags = ['#Metiegrow', '#Networking', '#Community'];

  const typeHashtags = {
    post: ['#Blog', '#Article', '#Content', '#Share'],
    profile: ['#Professional', '#Networking', '#Connect', '#Mentorship'],
    question: ['#Q&A', '#Learning', '#Discussion', '#Help'],
    room: ['#Housing', '#Accommodation', '#StudentHousing', '#Roommates'],
    general: ['#Share', '#Community', '#Discover'],
  };

  const hashtags = [...baseHashtags, ...(typeHashtags[contentType] || [])];

  // Add dynamic hashtags based on content
  if (data.category) {
    hashtags.push(`#${data.category.replace(/\s+/g, '')}`);
  }
  if (data.location) {
    hashtags.push(`#${data.location.replace(/\s+/g, '')}`);
  }
  if (data.field) {
    hashtags.push(`#${data.field.replace(/\s+/g, '')}`);
  }

  return [...new Set(hashtags)]; // Remove duplicates
};

/**
 * Create custom template
 * @param {string} name - Template name
 * @param {string} text - Template text
 * @param {string} category - Template category
 * @returns {Object} Template object
 */
export const createCustomTemplate = (name, text, category = 'custom') => {
  return {
    id: `custom_${Date.now()}`,
    name,
    text,
    category,
    emoji: '🎨',
    isCustom: true,
    createdAt: new Date().toISOString(),
  };
};

/**
 * Save custom template to localStorage
 * @param {Object} template - Template object
 */
export const saveCustomTemplate = (template) => {
  const existing = JSON.parse(localStorage.getItem('customShareTemplates') || '[]');
  existing.push(template);
  localStorage.setItem('customShareTemplates', JSON.stringify(existing));
};

/**
 * Get saved custom templates
 * @returns {Array} Array of custom templates
 */
export const getCustomTemplates = () => {
  return JSON.parse(localStorage.getItem('customShareTemplates') || '[]');
};

/**
 * Delete custom template
 * @param {string} templateId - Template ID to delete
 */
export const deleteCustomTemplate = (templateId) => {
  const existing = JSON.parse(localStorage.getItem('customShareTemplates') || '[]');
  const filtered = existing.filter((template) => template.id !== templateId);
  localStorage.setItem('customShareTemplates', JSON.stringify(filtered));
};

/**
 * Get template suggestions based on content analysis
 * @param {string} contentType - Type of content
 * @param {Object} data - Content data
 * @returns {Array} Array of suggested templates
 */
export const getSmartSuggestions = (contentType, data = {}) => {
  const suggestions = [];

  // Analyze content for smart suggestions
  if (data.title?.toLowerCase().includes('help')) {
    suggestions.push({
      id: 'help_needed',
      text: '🆘 Need help with this! Any experts available?',
      category: 'help',
    });
  }

  if (data.title?.toLowerCase().includes('opportunity')) {
    suggestions.push({
      id: 'opportunity',
      text: "🎯 Amazing opportunity that you shouldn't miss:",
      category: 'opportunity',
    });
  }

  if (data.content?.length > 500) {
    suggestions.push({
      id: 'detailed_content',
      text: '📖 In-depth content worth reading:',
      category: 'detailed',
    });
  }

  if (data.urgent || data.title?.toLowerCase().includes('urgent')) {
    suggestions.push({
      id: 'urgent',
      text: '⚡ URGENT: Time-sensitive information:',
      category: 'urgent',
    });
  }

  // Add time-based suggestions
  const hour = new Date().getHours();
  if (hour < 12) {
    suggestions.push({
      id: 'morning_share',
      text: '🌅 Good morning! Starting the day with this great content:',
      category: 'morning',
    });
  } else if (hour < 17) {
    suggestions.push({
      id: 'afternoon_share',
      text: '☀️ Great afternoon read:',
      category: 'afternoon',
    });
  } else {
    suggestions.push({
      id: 'evening_share',
      text: '🌙 Evening inspiration:',
      category: 'evening',
    });
  }

  return suggestions;
};
