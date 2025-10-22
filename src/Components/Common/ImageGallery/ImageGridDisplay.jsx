import React, { useState } from 'react';
import ImageGallery from './ImageGallery';

/**
 * Smart Image Grid Display Component
 *
 * Displays images in a responsive grid:
 * - 3 images: Shows all 3 in an adjusted layout (no View More)
 * - 4+ images: Shows first 3 images + a 4th with "View More" overlay
 *
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs
 * @param {string} props.className - Additional CSS classes for the grid container
 */
export default function ImageGridDisplay({ images = [], className = '' }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className='w-full h-[400px] bg-cardblack rounded-xl flex items-center justify-center'>
        <p className='text-gray-500'>No images available</p>
      </div>
    );
  }

  const imageCount = images.length;
  const hasMoreThanThree = imageCount > 3;

  const openGallery = (index = 0) => {
    setInitialImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  // Layout for exactly 3 images
  if (imageCount === 3) {
    return (
      <>
        <div className={`grid grid-cols-2 gap-2 h-[400px] ${className}`}>
          {/* First image - takes left half, full height */}
          <div
            className='row-span-2 rounded-xl overflow-hidden cursor-pointer'
            onClick={() => openGallery(0)}
          >
            <img
              src={images[0]}
              alt='Room view 1'
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>

          {/* Second image - top right */}
          <div
            className='rounded-xl overflow-hidden cursor-pointer'
            onClick={() => openGallery(1)}
          >
            <img
              src={images[1]}
              alt='Room view 2'
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>

          {/* Third image - bottom right */}
          <div
            className='rounded-xl overflow-hidden cursor-pointer'
            onClick={() => openGallery(2)}
          >
            <img
              src={images[2]}
              alt='Room view 3'
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>

        <ImageGallery
          images={images}
          isOpen={isGalleryOpen}
          onClose={closeGallery}
          initialIndex={initialImageIndex}
        />
      </>
    );
  }

  // Layout for 4+ images with "View More" overlay
  return (
    <>
      <div className={`grid grid-cols-5 grid-rows-4 gap-2 h-[400px] ${className}`}>
        {/* First image - spans 3 columns and all 4 rows */}
        <div
          className='col-span-3 row-span-4 rounded-xl overflow-hidden cursor-pointer'
          onClick={() => openGallery(0)}
        >
          <img
            src={images[0]}
            alt='Room main view'
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          />
        </div>

        {/* Second image - starts at column 4, spans 2 rows */}
        <div
          className='col-start-4 row-span-2 rounded-xl overflow-hidden cursor-pointer'
          onClick={() => openGallery(1)}
        >
          <img
            src={images[1]}
            alt='Room view 2'
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          />
        </div>

        {/* Third image - starts at column 4 and row 3, spans 2 rows */}
        <div
          className='col-start-4 row-start-3 row-span-2 rounded-xl overflow-hidden cursor-pointer'
          onClick={() => openGallery(2)}
        >
          <img
            src={images[2]}
            alt='Room view 3'
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          />
        </div>

        {/* Fourth image with "View More" overlay - starts at column 5, spans all 4 rows */}
        {hasMoreThanThree && (
          <div
            className='col-start-5 row-span-4 relative rounded-xl overflow-hidden cursor-pointer group'
            onClick={() => openGallery(3)}
          >
            <img
              src={images[3]}
              alt='View more'
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 group-hover:bg-opacity-70 transition-all'>
              <h3 className='text-lg font-semibold mb-1'>View More</h3>
              <p className='text-sm text-center px-2'>
                +{imageCount - 3} more {imageCount - 3 === 1 ? 'photo' : 'photos'}
              </p>
            </div>
          </div>
        )}
      </div>

      <ImageGallery
        images={images}
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        initialIndex={initialImageIndex}
      />
    </>
  );
}
