import React from 'react';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import { BackButtonIcon } from '../Components/Common/SVG/svg.function';

const PersonalInfoScreen = () => {
  return (
    <div className='bg-black min-h-screen text-white px-4 pt-10 relative'>
      {/* Alert Banner */}
      <div className='bg-yellow-600 text-white text-sm flex items-center gap-2 px-4 py-2 rounded-full mb-4 mx-auto w-[90%]'>
        <AlertTriangle size={16} />
        <span>Please update your accommodation details</span>
      </div>

      {/* Back button and Title */}
      <div className='flex items-center mb-6'>
        <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-2'>
          {/* Back Arrow */}
          <span className='text-white text-xl'>
            {/* {'←'} */}
            <BackButtonIcon className='w-6 h-6' />
          </span>
        </div>
        <h1 className='text-xl font-semibold'>My Personal Info</h1>
      </div>

      {/* Info Items */}
      <div className='space-y-4'>
        {/* Professional Info */}
        <div className='flex items-center justify-between bg-gray-900 px-4 py-3 rounded-lg'>
          <div className='flex items-center gap-3'>
            <img
              src='https://img.icons8.com/ios-filled/50/ffffff/briefcase.png'
              alt='professional'
              className='w-6 h-6'
            />
            <span className='text-white text-base'>Professional Info</span>
          </div>
          <ChevronRight size={20} className='text-white' />
        </div>

        {/* Study Information */}
        <div className='flex items-center justify-between bg-gray-900 px-4 py-3 rounded-lg'>
          <div className='flex items-center gap-3'>
            <img
              src='https://img.icons8.com/ios-filled/50/ffffff/university.png'
              alt='study'
              className='w-6 h-6'
            />
            <span className='text-white text-base'>Study Information</span>
          </div>
          <ChevronRight size={20} className='text-white' />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoScreen;
