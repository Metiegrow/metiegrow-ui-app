import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable Image Gallery Modal Component
 *
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs
 * @param {boolean} props.isOpen - Whether the gallery is open
 * @param {Function} props.onClose - Callback to close the gallery
 * @param {number} props.initialIndex - Initial image index to display (default: 0)
 */
export default function ImageGallery({ images = [], isOpen, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update currentIndex when initialIndex changes
  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95'>
      {/* Close Button */}
      <button
        onClick={onClose}
        className='absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors'
        aria-label='Close gallery'
      >
        <X size={32} />
      </button>

      {/* Main Image Container */}
      <div className='relative w-full h-full flex items-center justify-center p-4 md:p-8'>
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={goToPrevious}
            className='absolute left-4 z-40 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2'
            aria-label='Previous image'
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Image Display */}
        <div className='relative w-full h-full flex items-center justify-center'>
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className='max-w-full max-h-full object-contain rounded-lg'
          />

          {/* Image Counter */}
          <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm'>
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            className='absolute right-4 z-40 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2'
            aria-label='Next image'
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className='absolute bottom-20 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto'>
          <div className='flex gap-2'>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index ? 'border-purple-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
