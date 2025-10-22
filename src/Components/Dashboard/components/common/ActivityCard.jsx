import React from 'react';

const ActivityCard = ({ activities, title, viewAllLink, className = '' }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'active':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`bg-[#18181B] rounded-2xl p-6 ${className}`}>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-white'>{title}</h2>
        {viewAllLink && (
          <a href={viewAllLink} className='text-sm text-purple-400 hover:underline'>
            View all
          </a>
        )}
      </div>

      <div className='space-y-3'>
        {activities.map((activity) => (
          <div key={activity.id} className='flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg'>
            <div className={`rounded-full p-2 ${getStatusColor(activity.status)}`}>
              {activity.icon}
            </div>
            <div className='flex-1'>
              <div className='text-sm font-medium text-white'>{activity.title}</div>
              <div className='text-xs text-gray-400'>{activity.description}</div>
            </div>
            <div className='text-xs text-gray-400'>{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
