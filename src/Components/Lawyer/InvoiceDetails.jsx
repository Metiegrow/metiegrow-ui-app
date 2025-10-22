import React from 'react';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';
import { Button } from 'antd';

export default function InvoiceDetails() {
  return (
    <div className='w-full h-screen bg-black text-white flex justify-center items-center overflow-hidden'>
      <div className='w-full max-w-[400px] px-4 flex flex-col justify-between h-full'>
        {/* Top Section */}
        <div className='pt-6'>
          {/* Add Button */}
          <div className='mb-4'>
            <Button
              type='text' // or "default"
              className='bg-transparent text-white pl-0 '
            >
              <BackButtonIcon size={20} color='white' />
            </Button>
          </div>

          {/* Invoice Card */}
          <div className='relative w-full max-w-[350px] h-[122px] rounded-[24px] bg-[#232323] p-4 mb-6'>
            <p className='text-[12px] text-[#00FFA7] font-medium'>Invoice NO#1234</p>

            {/* Unpaid Badge */}
            <div className='absolute top-[25px] right-[16px] w-[55px] h-[24px] border border-[#A82EFF] rounded-[20px] flex items-center justify-center text-[10px] text-[#A82EFF] font-medium px-[10px] gap-[10px]'>
              Unpaid
            </div>

            <p className='mt-1 text-[16px] font-semibold'>Surya Subramanian</p>
            <p className='text-[12px] text-gray-400'>Temporary Graduate Visa (Subclass 485)</p>
          </div>

          {/* Invoice Details */}
          <div className='text-[14px] space-y-3 mb-4 px-1'>
            <div className='flex justify-between'>
              <span className='text-gray-400'>Title :</span>
              <span>Consulting Fee</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-400'>Amount :</span>
              <span>$25</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-400'>Due Date on :</span>
              <span>22 Jun 2025</span>
            </div>
          </div>

          {/* Lawyer Info */}
          <div className='px-1 mb-6'>
            <p className='text-[14px] text-gray-400 mb-1'>Lawyer Name:</p>
            <div className='flex items-center gap-3'>
              <img
                src='https://api.dicebear.com/7.x/personas/svg?seed=A'
                alt='avatar'
                className='w-8 h-8 rounded-full'
              />
              <span className='text-white font-medium'>Anjana</span>
            </div>
          </div>

          {/* Case Details */}
          <div className='text-[12px] text-gray-300 px-1 space-y-1'>
            <div className='flex justify-between'>
              <span>Case Details:</span>
              <span>8 Jun 2025, 4:00PM</span>
            </div>
            <p className='text-[13px] leading-snug'>
              AI expert with hands-on experience in machine learning, deep learning, and AI product
              development.
            </p>
          </div>
        </div>

        {/* Pay Button at Bottom */}
        <div className='w-full max-w-[350px] mx-auto pb-4'>
          <Button className='w-full h-12 bg-[#A82EFF] rounded-full text-white font-medium text-[16px]'>
            Pay Now →
          </Button>
        </div>
      </div>
    </div>
  );
}
