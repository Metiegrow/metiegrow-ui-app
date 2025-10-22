import React, { useState } from 'react';
import { ShareIcon } from './SVG/svg.function';
import ShareModal from './ShareModal';

/**
 * Advanced ShareButton Component
 * Opens a sophisticated share modal with templates, analytics, and bulk sharing
 *
 * @param {Object} props
 * @param {string} props.type - Type of content ('post', 'profile', 'question', 'room', etc.)
 * @param {Object} props.data - Content data for sharing
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Size of the button ('sm', 'md', 'lg')
 * @param {boolean} props.showText - Whether to show text alongside icon
 * @param {Function} props.onShare - Callback when share action is performed
 * @param {Object} props.userStats - User sharing statistics
 */
const ShareButton = ({
  type = 'general',
  data = {},
  className = '',
  size = 'md',
  showText = false,
  onShare = null,
  userStats = null,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: { icon: 'w-4 h-4', button: 'p-2', text: 'text-sm' },
    md: { icon: 'w-5 h-5', button: 'p-3', text: 'text-base' },
    lg: { icon: 'w-6 h-6', button: 'p-4', text: 'text-lg' },
  };

  const currentSize = sizeConfig[size];

  const handleShareComplete = (platform, result, shareData) => {
    if (onShare) {
      onShare(platform, result, shareData);
    }
  };

  return (
    <>
      {/* Main Share Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`
          ${currentSize.button}
          bg-gray-800 hover:bg-gray-700
          border border-gray-600 hover:border-gray-500
          rounded-full
          transition-all duration-200
          flex items-center justify-center gap-2
          text-white
          focus:outline-none focus:ring-2 focus:ring-purple-500
          ${className}
        `}
        title='Advanced Share'
      >
        <ShareIcon className={currentSize.icon} />
        {showText && <span className={`${currentSize.text} font-medium`}>Share</span>}
      </button>

      {/* Advanced Share Modal */}
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={type}
        data={data}
        onShare={handleShareComplete}
        userStats={userStats}
      />
    </>
  );
};

export default ShareButton;
