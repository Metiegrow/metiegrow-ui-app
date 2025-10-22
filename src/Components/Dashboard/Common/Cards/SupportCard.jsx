import React from 'react';
import Card from './Card';
import { StarOutlined, ArrowRightOutlined } from '@ant-design/icons';

const SupportCard = ({ support, onBookClick }) => {
  const { name, title, company, rating, price, specialties = [], avatar } = support;

  return (
    <Card className='hover:bg-[#2A2A2A] transition-colors' padding='p-4'>
      <div className='space-y-4'>
        {/* Profile Section */}
        <div className='flex items-start space-x-3'>
          {/* Avatar */}
          <div className='w-14 h-14 rounded-2xl overflow-hidden'>
            {avatar ? (
              <img src={avatar} alt={name} className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                <span className='text-white font-medium text-lg'>
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className='flex-1'>
            <h3 className='text-white font-medium text-base'>{name}</h3>
            <div className='space-y-1'>
              <p className='text-gray-400 text-sm'>{title}</p>
              <p className='text-[#50FFB9] text-sm'>{company}</p>
            </div>
          </div>

          {/* Rating */}
          <div className='flex items-center space-x-1 bg-[#3C3803] px-2 py-1 rounded-full'>
            <StarOutlined className='text-xs text-[#FAFE43]' />
            <span className='text-[#FAFE43] text-xs font-semibold'>{rating}</span>
          </div>
        </div>

        {/* Specialties */}
        <div className='flex flex-wrap gap-2'>
          {specialties.map((specialty, index) => (
            <span
              key={index}
              className='px-3 py-1 bg-[#131313] text-white text-xs font-semibold rounded-xl'
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Price and Book Button */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1'>
            <span className='text-white text-2xl font-bold'>${price}</span>
            <span className='text-gray-400 text-sm'>Per hrs</span>
          </div>

          <button
            onClick={onBookClick}
            className='w-16 h-16 bg-[#BC5FFF] rounded-full flex items-center justify-center hover:bg-[#A82EFF] transition-colors'
          >
            <ArrowRightOutlined className='text-xl text-white' />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default SupportCard;
