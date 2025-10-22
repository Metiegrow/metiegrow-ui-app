import React from 'react';
import Card from './Card';
import { ClockCircleOutlined, VideoCameraOutlined } from '@ant-design/icons';

const SessionCard = ({ session, onJoinClick }) => {
  const {
    title,
    description,
    time,
    date,
    isToday = false,
    isTomorrow = false,
    hasNotification = false,
  } = session;

  return (
    <Card className='hover:bg-[#2A2A2A] transition-colors' padding='p-4'>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            {/* Date Badge */}
            <div
              className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                isToday
                  ? 'bg-white text-orange-500'
                  : isTomorrow
                    ? 'bg-white text-orange-500'
                    : 'bg-gray-700 text-gray-300'
              }`}
            >
              {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : date}
            </div>

            {/* Notification Icon */}
            {hasNotification && (
              <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
                <div className='w-4 h-4 bg-black rounded-full'></div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className='space-y-4'>
          <div className='space-y-2'>
            <h3 className='text-gray-400 text-sm font-medium'>Artificial Intelligence</h3>
            <h2 className='text-white text-lg font-semibold leading-tight'>{title}</h2>
            <p className='text-black text-lg font-semibold leading-tight'>{description}</p>
          </div>

          {/* Time */}
          <div className='flex items-center space-x-2 text-gray-500'>
            <ClockCircleOutlined className='text-sm' />
            <span className='text-sm'>{time}</span>
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={onJoinClick}
          className='w-full bg-white text-[#BC5FFF] font-semibold py-4 px-4 rounded-full border-2 border-gradient-to-r from-blue-400 via-purple-500 to-purple-600 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2'
        >
          <span>Join the Meeting</span>
          <VideoCameraOutlined className='text-lg' />
        </button>
      </div>
    </Card>
  );
};

export default SessionCard;
