// src/Global_Components/BannerSlide/BannerSlide.jsx
import { ArrowRightIcon } from '@/Components/Stay/NeedRoomCommon.svg';
import React from 'react';

const BannerSlide = ({ title, description, image, buttonText, buttonLink }) => {
  return (
    <div className='flex overflow-hidden justify-between items-center px-6 py-6 w-full h-64 text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl md:rounded-3xl md:px-10 md:py-8'>
      {/* Content */}
      <div className='z-10 flex-1 min-w-0'>
        <h2 className='text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-4xl'>
          {title || 'Welcome Banner'}
        </h2>
        <p className='mt-2 text-sm leading-relaxed opacity-90 sm:text-base md:text-lg'>
          {description || 'Discover amazing features and services'}
        </p>
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className='inline-flex gap-2 items-center px-6 py-2 mt-4 text-sm font-semibold text-white rounded-2xl transition bg-neutral-900 hover:opacity-90'
          >
            {buttonText}
            <ArrowRightIcon />
          </a>
        )}
      </div>

      {/* Image */}
      {image && (
        <div className='z-10 flex-shrink-0 ml-6 w-32 h-24 sm:w-40 md:w-48 sm:h-32 md:h-40'>
          <img
            src={image}
            alt={title || 'Banner image'}
            className='object-cover w-full h-full rounded-xl shadow-lg'
          />
        </div>
      )}
    </div>
  );
};

export default BannerSlide;
