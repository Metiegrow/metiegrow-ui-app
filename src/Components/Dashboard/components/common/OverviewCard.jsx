import React from 'react';

const OverviewCard = ({ title, subtitle, icon, stats, className = '' }) => {
  return (
    <div className={`bg-[#18181B] rounded-2xl p-6 ${className}`}>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-white'>{title}</h2>
        <div className='flex items-center gap-2 text-sm text-gray-400'>
          {icon}
          {subtitle}
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {stats.map((stat, index) => (
          <div key={index} className='text-center'>
            <div className={`text-2xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
            <div className='text-sm text-gray-400'>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCard;
