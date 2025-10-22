import {
  CarOutlined,
  CoffeeOutlined,
  HomeOutlined,
  MessageOutlined,
  PhoneOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { Badge, Button } from 'antd';
import React from 'react';
import {
  BathRoomIcon,
  BedRoomIcon,
  FitnessBreakIcon,
  GamingIcon,
  KitchenIcon,
  MessageIcon,
  NonDrinkerIcon,
  NonSmokerIcon,
  OutgoingCallIcon,
  ParkingIcon,
  VegFoodIcon,
} from './Stay/NeedRoomCommon.svg';

function StayListDetail() {
  return (
    <div className=' bg-gray-100'>
      <div className=' bg-black text-white'>
        {/* Header Image */}
        <div className='relative'>
          <img
            src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80'
            alt='SKG Apartments'
            className='w-full h-64 object-cover rounded-t-xl'
          />
          <Badge
            className='absolute top-4 left-4'
            count='Recently Found'
            style={{ backgroundColor: '#000' }}
          />
        </div>

        {/* Main Content */}
        <div className='p-6'>
          <div className='flex justify-between items-start mb-4'>
            <div>
              <h1 className='text-2xl font-bold'>SKG Apartments & Stay</h1>
              <p className='text-gray-400 flex items-center gap-1 mt-1'>
                <HomeOutlined /> No 20, 2nd Cross street, Pollachi
              </p>
            </div>
            <div className='text-xl font-bold text-purple-500'>$200/m</div>
          </div>

          {/* Basic Info */}
          {/* Basic Info */}
          <h2 className='text-lg font-semibold mb-3'>Basic Info</h2>
          <div className='grid grid-cols-3 gap-3 mb-6'>
            <div className='bg-cardblack rounded-xl p-4 flex flex-col items-center'>
              <HomeOutlined className='text-xl text-white mb-1' />
              <div className='text-sm text-white font-semibold'>520Sq mtr</div>
              <div className='text-xs text-gray-400'>Living space</div>
            </div>
            <div className='bg-cardblack rounded-xl p-4 flex flex-col items-center'>
              <BedRoomIcon className='text-xl text-white mb-1' />
              <div className='text-sm text-white font-semibold'>1</div>
              <div className='text-xs text-gray-400'>Bed room</div>
            </div>
            <div className='bg-cardblack rounded-xl p-4 flex flex-col items-center'>
              <BathRoomIcon className='text-xl text-white mb-1' />
              <div className='text-sm text-white font-semibold'>1</div>
              <div className='text-xs text-gray-400'>Bathroom</div>
            </div>
          </div>

          {/* Description */}
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-2'>Description</h2>
            <p className='text-gray-400'>
              Discover how AI is transforming user experience design practices. Learn how to
              leverage AI-driven insights, automation, and personalization to more intuitive digital
              products...
              <span className='text-purple-500'>read more</span>
            </p>
          </div>

          {/* Amenities */}
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-3'>Amenities</h2>
            <div className='grid grid-cols-3 gap-4'>
              <div className='bg-gray-800 p-3 rounded-lg flex flex-col items-center'>
                <KitchenIcon className='text-2xl mb-1' />
                <span className='text-sm'>Kitchen</span>
              </div>
              <div className='bg-gray-800 p-3 rounded-lg flex flex-col items-center'>
                <ParkingIcon className='text-2xl mb-1' />
                <span className='text-sm'>Parking</span>
              </div>
              <div className='bg-gray-800 p-3 rounded-lg flex flex-col items-center'>
                <WifiOutlined className='text-2xl mb-1' />
                <span className='text-sm'>Wifi</span>
              </div>
            </div>
          </div>

          {/* Life style */}
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-3'>Life style</h2>
            <div className='grid grid-cols-5 gap-2'>
              <div className='bg-gray-800 p-2 rounded-lg flex flex-col items-center'>
                <VegFoodIcon className='text-2xl mb-1' />
                <span className='text-xs mt-1'>Veg food</span>
              </div>
              <div className='bg-gray-800 p-2 rounded-lg flex flex-col items-center'>
                <FitnessBreakIcon className='text-2xl mb-1' />
                <span className='text-xs mt-1'>Fitness Freak</span>
              </div>
              <div className='bg-gray-800 p-2 rounded-lg flex flex-col items-center'>
                <NonSmokerIcon className='text-2xl mb-1' />
                <span className='text-xs mt-1'>Non Smoker</span>
              </div>
              <div className='bg-gray-800 p-2 rounded-lg flex flex-col items-center'>
                <NonDrinkerIcon className='text-2xl mb-1' />
                <span className='text-xs mt-1'>Non Drinker</span>
              </div>
              <div className='bg-gray-800 p-2 rounded-lg flex flex-col items-center'>
                <GamingIcon className='text-2xl mb-1' />
                <span className='text-xs mt-1'>Gaming</span>
              </div>
            </div>
          </div>

          {/* Owner Info */}
          <div className='flex items-center justify-between bg-gray-800 p-4 rounded-lg'>
            <div className='flex items-center gap-3'>
              <img
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
                alt='Owner'
                className='w-12 h-12 rounded-full'
              />
              <div>
                <h3 className='font-semibold'>Rajiv Mehtha</h3>
                <p className='text-gray-400 text-sm'>Owner</p>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button
                type='text'
                icon={<OutgoingCallIcon />}
                className='flex items-center justify-center w-10 h-10 rounded-full'
              />
              <Button
                type='text'
                icon={<MessageIcon />}
                className='flex items-center justify-center w-10 h-10 rounded-full'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StayListDetail;
