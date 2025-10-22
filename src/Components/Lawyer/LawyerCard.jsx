import React from 'react';
import { Star as StarIcon } from 'lucide-react';
import { NextButtonPurpleIcon } from '../Common/SVG/svg.function';

export default function LawyerCard({ lawyer, onClick, backendUrl }) {
  return (
    <div className='bg-cardblack rounded-[24px] p-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center'>
            {lawyer.imageUrl ? (
              <img
                src={backendUrl ? `${backendUrl}/${lawyer.imageUrl}` : lawyer.imageUrl}
                alt={`${lawyer.firstName} ${lawyer.lastName}`}
                className='w-full h-full object-cover'
              />
            ) : (
              <span className='text-white text-lg font-bold'>
                {`${lawyer.firstName?.charAt(0) || ''}${lawyer.lastName?.charAt(0) || ''}`}
              </span>
            )}
          </div>
          <div className='!m-0 !p-0'>
            <h3 className='text-lg m-0 p-0 font-semibold mb-0 leading-tight text-white'>
              {lawyer.firstName} {lawyer.lastName}
            </h3>
            <p className='text-[#9b9b9b] m-0 p-0 mb-0 leading-tight text-md'>
              {lawyer.jobTitle || 'Product Manager'}
            </p>
            <p className='text-[#47cf99] m-0 p-0 mb-4 font-bold leading-tight text-md'>
              {lawyer.company}
            </p>
          </div>
        </div>
        <div className='flex items-center bg-[#3c3803] px-3 py-1 rounded-full h-8'>
          <span className='text-yellow-400 text-lg mr-1'>
            <StarIcon size={18} />
          </span>
          <span className='text-yellow-300 font-semibold'>{lawyer.star?.toFixed(1) || '5.0'}</span>
        </div>
      </div>

      <div className='mt-4'>
        <div className='flex flex-wrap gap-2'>
          {lawyer.skills?.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className='bg-[#131313] text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 py-0.5 rounded-full font-medium'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div>
          <span className='text-2xl font-bold text-white'>$ {lawyer.price}</span>
          <span className='text-gray-400 text-sm ml-2'>Per hrs</span>
        </div>
        <div className='cursor-pointer' onClick={onClick}>
          <NextButtonPurpleIcon className='text-purple-500' />
        </div>
      </div>
    </div>
  );
}
