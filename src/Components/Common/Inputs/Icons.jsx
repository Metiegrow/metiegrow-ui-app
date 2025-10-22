import React from 'react';

// Calendar Icon Component
export const CalendarIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg
    className={className}
    fill='none'
    stroke={color}
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);

// Clock Icon Component
export const ClockIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg
    className={className}
    fill='none'
    stroke={color}
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);

// Calendar with Clock Icon (for datetime inputs)
export const CalendarClockIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <div className={`flex items-center space-x-1 ${className}`}>
    <CalendarIcon className='w-4 h-4' color={color} />
    <ClockIcon className='w-4 h-4' color={color} />
  </div>
);

// Year Icon Component
export const YearIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg
    className={className}
    fill='none'
    stroke={color}
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    />
  </svg>
);

// Dropdown Arrow Icon
export const DropdownIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg
    className={className}
    fill='none'
    stroke={color}
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
  </svg>
);
