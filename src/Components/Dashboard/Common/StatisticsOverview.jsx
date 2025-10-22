import React from 'react';
import Card from './Cards/Card';

const StatisticsOverview = ({ userType, stats }) => {
  const getStatsForUserType = () => {
    switch (userType) {
      case 'mentor':
        return {
          title: 'Session Overview',
          stats: [
            { label: 'Total Session', value: '25', color: 'bg-white' },
            { label: 'Upcoming Session', value: '07', color: 'bg-[#50FFB9]' },
            { label: 'Completed Session', value: '18', color: 'bg-[#474747]' },
          ],
        };
      case 'student':
        return {
          title: 'Your Progress',
          stats: [
            { label: 'Completed Courses', value: '12', color: 'bg-white' },
            { label: 'Active Sessions', value: '05', color: 'bg-[#50FFB9]' },
            { label: 'Total Hours', value: '156', color: 'bg-[#474747]' },
          ],
        };
      default:
        return {
          title: 'Overview',
          stats: [
            { label: 'Total Items', value: '25', color: 'bg-white' },
            { label: 'Active Items', value: '07', color: 'bg-[#50FFB9]' },
            { label: 'Completed Items', value: '18', color: 'bg-[#474747]' },
          ],
        };
    }
  };

  const { title, stats: userStats } = getStatsForUserType();

  return (
    <Card className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-xl font-bold'>{title}</h2>
        <div className='flex items-center space-x-2 bg-[#131313] border border-gray-600 rounded-full px-4 py-2'>
          <span className='text-gray-400 text-sm'>This month</span>
          <svg
            className='w-4 h-4 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </div>
      </div>

      {/* Chart Area */}
      <div className='relative'>
        {/* Background Grid */}
        <div className='absolute inset-0 opacity-20'>
          <svg width='100%' height='200' className='text-gray-600'>
            <defs>
              <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
                <path d='M 40 0 L 0 0 0 40' fill='none' stroke='currentColor' strokeWidth='1' />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid)' />
          </svg>
        </div>

        {/* Chart */}
        <div className='relative h-48 flex items-end space-x-2 px-4'>
          {/* Sample Chart Bars */}
          {[40, 60, 30, 80, 50, 70, 45].map((height, index) => (
            <div key={index} className='flex-1 flex flex-col items-center space-y-2'>
              <div
                className='w-full bg-gradient-to-t from-[#14C0FE] to-transparent rounded-t'
                style={{ height: `${height}%` }}
              ></div>
              <span className='text-gray-400 text-xs'>{index + 1} Jun</span>
            </div>
          ))}
        </div>

        {/* Y-axis Labels */}
        <div className='absolute left-0 top-0 h-full flex flex-col justify-between py-4'>
          {[50, 40, 30, 20, 10].map((value) => (
            <span key={value} className='text-gray-400 text-xs'>
              ${value}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className='flex justify-center space-x-8'>
        {userStats.map((stat, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <div className={`w-4 h-4 rounded-full ${stat.color}`}></div>
            <span className='text-white text-sm'>
              {stat.label} - {stat.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StatisticsOverview;
