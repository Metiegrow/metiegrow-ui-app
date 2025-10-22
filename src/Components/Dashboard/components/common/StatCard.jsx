import React from 'react';

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'white',
  bgColor = 'bg-[#1E1E1E]',
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className={`text-2xl font-bold text-${color}`}>{value}</div>
      <div className='text-sm text-gray-400'>{subtitle}</div>
      {icon && (
        <div className='flex justify-center mt-2'>
          <div className={`${bgColor} rounded-full p-2`}>{icon}</div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
