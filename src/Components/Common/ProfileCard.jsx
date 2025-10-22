import { Star, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NextButtonPurpleIcon } from './SVG/svg.function';

export default function ProfileCard({
  name,
  title,
  company,
  imageUrl,
  rating,
  skills = [],
  price,
  onClick,
}) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 400;

  return (
    <div
      className='w-full max-w-md bg-cardblack rounded-3xl p-4 text-white cursor-pointer'
      onClick={onClick}
    >
      <div className='flex flex-col gap-6'>
        {/* Top section with profile info */}
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div
              className={`${isMobile ? 'h-12 w-12' : 'h-12 w-12'} rounded-full overflow-hidden bg-gray-700 flex items-center justify-center`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt='Profile'
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class=\"text-white text-lg font-bold\">${
                      name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || ''
                    }</span>`;
                  }}
                />
              ) : (
                <span className='text-white text-lg font-bold'>
                  {name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase() || ''}
                </span>
              )}
            </div>
            <div>
              <h2 className={`${isMobile ? 'text-xl mt-0 mb-0' : 'text-2xl mt-0 mb-0'} font-bold`}>
                {name}
              </h2>
              <p className='text-gray-400 text-sm sm:text-base mt-0 mb-0'>{title}</p>
              <p className='text-emerald-400 text-sm sm:text-base mt-0 mb-0'>{company}</p>
            </div>
          </div>
          <div className='bg-yellow-900 rounded-full px-3 sm:px-3 py-1 flex items-center gap-1 ml-auto'>
            <Star fill='yellow' color='yellow' size={isMobile ? 10 : 14} />
            <span className='text-yellow-400 text-sm sm:text-base'>{rating}</span>
          </div>
        </div>

        {/* Skills section */}
        <div className='flex flex-wrap gap-1 sm:gap-3'>
          {skills.map((skill, i) => (
            <span
              key={i}
              className='bg-black rounded-full px-3 sm:px-5 py-0 sm:py-1 text-xs sm:text-sm'
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Price section */}
        <div className='flex items-center justify-between'>
          <div className='flex items-baseline'>
            <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold`}>$ {price}</span>
            <span className='text-gray-400 ml-2 text-sm sm:text-base'>Per hrs</span>
          </div>
          <div>
            <NextButtonPurpleIcon color='white' size={isMobile ? 20 : 24} />
          </div>
        </div>
      </div>
    </div>
  );
}
