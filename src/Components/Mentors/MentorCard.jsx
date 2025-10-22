import React from 'react';
import { Star as StarIcon } from 'lucide-react';
import { NextButtonPurpleIcon } from '../Common/SVG/svg.function';

export default function MentorCard({ mentor, backendUrl, onClick }) {
  // Helper function to get full name
  const getFullName = () => {
    const firstName = mentor.firstName || '';
    const lastName = mentor.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Anonymous';
  };

  // Helper function to get initials
  const getInitials = () => {
    const firstName = mentor.firstName || '';
    const lastName = mentor.lastName || '';
    return `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`.toUpperCase();
  };

  // Helper function to get display name
  const getDisplayName = () => {
    const fullName = getFullName();
    return fullName !== 'Anonymous' ? fullName : 'Anonymous';
  };

  // Helper function to get job title
  const getJobTitle = () => {
    return mentor.jobTitle || 'Professional';
  };

  // Helper function to get company name
  const getCompanyName = () => {
    return mentor.company || 'Company not specified';
  };

  // Helper function to get rating
  const getRating = () => {
    return mentor.star || 0;
  };

  // Helper function to get skills
  const getSkills = () => {
    return Array.isArray(mentor.skills) ? mentor.skills : [];
  };

  return (
    <div className='bg-cardblack rounded-[24px] p-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center'>
            {mentor.imageUrl ? (
              <img
                src={backendUrl ? `${backendUrl}/${mentor.imageUrl}` : mentor.imageUrl}
                alt={getDisplayName()}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <span
              className='text-white text-xl sm:text-md md:text-xl font-semibold'
              style={{ display: mentor.imageUrl ? 'none' : 'flex' }}
            >
              {getInitials()}
            </span>
          </div>
          <div className='!m-0 !p-0'>
            <h3 className='text-base sm:text-sm md:text-md m-0 p-0 font-semibold mb-0 leading-tight text-white'>
              {getDisplayName()}
            </h3>
            <p className='text-[#9b9b9b] m-0 p-0 mb-0 leading-tight text-md'>{getJobTitle()}</p>
            <p className='text-[#47cf99] m-0 p-0 mb-4 font-bold leading-tight text-md'>
              {getCompanyName()}
            </p>
          </div>
        </div>
        <div className='flex items-center bg-[#3c3803] px-3 py-1 rounded-full h-8'>
          <span className='text-yellow-400 text-base sm:text-sm md:text-sm mr-1'>
            <StarIcon size={14} />
          </span>
          <span className='text-yellow-300 font-semibold text-sm sm-text-sm md-text-sm'>
            {getRating().toFixed(1)}
          </span>
        </div>
      </div>
      <div className='mt-4'>
        <div className='flex flex-wrap gap-2'>
          {getSkills()
            .slice(0, 3)
            .map((skill, i) => (
              <span
                key={i}
                className='bg-[#131313] text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 py-0.5 rounded-full font-medium'
              >
                {skill}
              </span>
            ))}
          {getSkills().length === 0 && (
            <span className='bg-[#131313] text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 py-0.5 rounded-full font-medium'>
              Skills not specified
            </span>
          )}
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-lg sm:text-xl md:text-2xl font-bold text-white'>
            ${mentor.price || '25'}
          </span>
          <span className='ml-2 text-xs sm:text-sm md:text-base text-gray-400'>Per hrs</span>
        </div>
        <div className='cursor-pointer p-2 md:p-2 sm:p-2 p-1 ' onClick={onClick}>
          <NextButtonPurpleIcon className='text-purple-500 w-7 h-7 md:w-6 md:h-6 sm:w-5 sm:h-5 w-4 h-4' />
        </div>
      </div>
    </div>
  );
}
