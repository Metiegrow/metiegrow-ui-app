import React from 'react';

const TimeZoneWidget = () => {
  return (
    <div className='max-w-md mx-auto bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl overflow-hidden text-white p-6'>
      {/* Header with search */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Time Zone</h1>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-white/10 backdrop-blur-sm rounded-full py-1 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-40'
          />
          <svg
            className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>

      {/* Globe visualization */}
      <div className='relative mb-6'>
        <div className='w-64 h-64 mx-auto bg-blue-800 rounded-full overflow-hidden shadow-inner border-4 border-blue-300/30 relative'>
          {/* Simplified world map */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-48 h-48 bg-blue-700 rounded-full'></div>
          </div>
          <div className='absolute top-1/4 left-1/4 w-8 h-8 bg-green-500 rounded-full'></div>
          <div className='absolute top-1/3 right-1/4 w-6 h-6 bg-green-500 rounded-full'></div>
          <div className='absolute bottom-1/4 right-1/3 w-10 h-10 bg-green-500 rounded-full'></div>

          {/* Sydney marker */}
          <div className='absolute bottom-1/4 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg'>
            <div className='absolute -top-6 -left-2 bg-yellow-400 text-xs px-2 py-1 rounded whitespace-nowrap'>
              Sydney
            </div>
          </div>
        </div>
      </div>

      {/* Time zone details */}
      <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-semibold'>Sydney</h2>
            <p className='text-sm text-white/80'>GMT+10hrs</p>
          </div>
          <div className='text-right'>
            <p className='text-2xl font-bold'>18:20</p>
            <p className='text-sm text-white/80'>10°C</p>
          </div>
        </div>
      </div>

      {/* Additional time zone info */}
      <div className='mt-4 text-sm text-white/70'>
        <p>Australian Eastern Standard Time (AEST)</p>
        <p>Latitude: 33.8688° S | Longitude: 151.2093° E</p>
      </div>
    </div>
  );
};

export default TimeZoneWidget;
