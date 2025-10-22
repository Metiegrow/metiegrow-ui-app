import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function SessionOverview({ total = 25, completed = 18, upcoming = 7 }) {
  const percentage = (completed / total) * 100;
  const radius = 85;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className='bg-gray-800 rounded-2xl p-6 mb-6'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold text-white'>Session Overview</h2>
      </div>
      <div className='bg-gray-700 rounded-xl p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-medium text-white'>Overview</h3>
          <button className='flex items-center gap-2 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors'>
            This month
            <ChevronDown size={16} />
          </button>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex-shrink-0 relative'>
            <svg className='w-48 h-48 transform -rotate-90' viewBox='0 0 200 200'>
              <circle
                cx='100'
                cy='100'
                r={radius}
                stroke='#374151'
                strokeWidth={strokeWidth}
                fill='none'
              />
              <circle
                cx='100'
                cy='100'
                r={radius}
                stroke='#10B981'
                strokeWidth={strokeWidth}
                fill='none'
                strokeLinecap='round'
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className='transition-all duration-300 ease-in-out'
              />
            </svg>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <div className='text-sm text-gray-400 mb-1'>Total Session</div>
              <div className='text-4xl font-bold text-white'>{total}</div>
            </div>
          </div>
          <div className='flex flex-col space-y-4 ml-8'>
            <div className='flex items-center gap-3'>
              <div className='w-3 h-3 bg-white rounded-full'></div>
              <span className='text-gray-300'>Total Session - {total}</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-3 h-3 bg-green-400 rounded-full'></div>
              <span className='text-gray-300'>Upcoming Session - {upcoming}</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
              <span className='text-gray-300'>Completed Session - {completed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
