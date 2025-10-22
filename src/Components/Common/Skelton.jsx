import React from 'react';

const Skelton = () => {
  return (
    <div className='bg-cardblack rounded-[24px] p-4 animate-pulse'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 rounded-full bg-gray-700' />
          <div>
            <div className='h-4 bg-gray-700 rounded w-32 mb-2' />
            <div className='h-3 bg-gray-600 rounded w-24 mb-1' />
            <div className='h-3 bg-gray-600 rounded w-20' />
          </div>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className='h-6 w-20 bg-gray-700 rounded-full' />
        ))}
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div>
          <div className='h-6 w-20 bg-gray-700 rounded mb-1' />
        </div>
        <div className='h-8 w-8 bg-gray-700 rounded-full' />
      </div>
    </div>
  );
};

export default Skelton;
