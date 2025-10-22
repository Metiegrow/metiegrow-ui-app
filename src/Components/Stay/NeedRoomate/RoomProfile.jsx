import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Button } from 'antd';
import {
  ArrowLeftIcon,
  BackButtonIcon,
  SaveIcon,
  ShareButtonIcon,
} from '../../Common/SVG/svg.function';
import { HomeOutlined, WifiOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  FitnessBreakIcon,
  FurnitureIcon,
  GamingIcon,
  KitchenIcon,
  LaundryIcon,
  MessageIcon,
  NightOwlIcon,
  NonDrinkerIcon,
  NonSmokerIcon,
  OutgoingCallIcon,
  ParkingIcon,
  StudiousIcon,
  TickIcon,
  VegFoodIcon,
  WifiIcon,
} from '../NeedRoomCommon.svg';
import { getAbsoluteImageUrl } from '../../Common/constants.function';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useStayCard } from '@/hooks/stay/queries';

const URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to format string
const formatString = (str) => {
  if (!str) return '';
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Constants for lifestyle and amenities options
const LIFESTYLE_OPTIONS = [
  { value: 'VEG_FOOD', icon: <VegFoodIcon />, label: 'Veg food' },
  { value: 'NIGHT_OWL', icon: <NightOwlIcon />, label: 'Night Owl' },
  { value: 'STUDIOUS', icon: <StudiousIcon />, label: 'Studious' },
  { value: 'FITNESS_FREAK', icon: <FitnessBreakIcon />, label: 'Fitness Freak' },
  { value: 'NON_SMOKER', icon: <NonSmokerIcon />, label: 'Non Smoker' },
  { value: 'NON_DRINKER', icon: <NonDrinkerIcon />, label: 'Non Drinker' },
  { value: 'GAMING', icon: <GamingIcon />, label: 'Gaming' },
  { value: 'NON_DRIVER', icon: <NonDrinkerIcon />, label: 'Non Driver' },
];

const AMENITIES_OPTIONS = [
  { value: 'KITCHEN', icon: <KitchenIcon />, label: 'Kitchen' },
  { value: 'PARKING', icon: <ParkingIcon />, label: 'Parking' },
  { value: 'WIFI', icon: <WifiIcon />, label: 'Wifi' },
  { value: 'FURNITURE', icon: <FurnitureIcon />, label: 'Furniture' },
  { value: 'LAUNDRY', icon: <LaundryIcon />, label: 'Laundry' },
];

// Create mappings from the constants
const lifestyleMapping = LIFESTYLE_OPTIONS.reduce((acc, option) => {
  acc[option.value] = { icon: option.icon, label: option.label };
  return acc;
}, {});

const amenitiesMapping = AMENITIES_OPTIONS.reduce((acc, option) => {
  acc[option.value] = { icon: option.icon, label: option.label };
  return acc;
}, {});

// ProfileImage component for consistent image rendering
const ProfileImage = ({ image, name, size, fontSize }) => {
  return (
    <div
      className={`${size} rounded-full overflow-hidden bg-gray-700 flex items-center justify-center`}
    >
      {image ? (
        <img
          src={getAbsoluteImageUrl(image)}
          alt={`${name}'s profile`}
          className='w-full h-full object-cover'
        />
      ) : (
        <div
          className='bg-purple-600 w-full h-full flex items-center justify-center text-white font-bold'
          style={{ fontSize: fontSize }}
        >
          {name?.charAt(0) || '?'}
        </div>
      )}
    </div>
  );
};

const RoomProfile = () => {
  const router = useRouter();
  // Get ID from URL path parameter
  const profileId =
    router?.state?.location?.pathname?.split('/').pop() || router?.currentMatches?.[0]?.params?.id;

  // Get cardType from query parameter
  const searchParams = new URLSearchParams(router?.state?.location?.search);
  const cardType = searchParams.get('cardType'); // 'ROOMMATE' or 'ROOM'

  const [profile] = useState({
    name: 'Ramesh',
    image: '',
    address: '2nd Cross street, Perth',
    matchPercentage: '56',
    distance: '3.5',
    price: 25,
    description:
      'Discover how AI is transforming user experience design in this hands-on workshop. Learn how to leverage AI-driven insights, personalization to more intuitive digital products...',
    occupation: 'Student',
    age: '24',
    gender: 'Male',
    lookingFor: 'MALE',
    roomType: 'SINGLE',
    rentPerMonth: 25000,
    livingSpace: '520',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['KITCHEN', 'PARKING', 'WIFI'],
    lifestyle: ['VEG_FOOD', 'FITNESS_FREAK', 'NON_SMOKER', 'NON_DRINKER', 'GAMING'],
    contact: '+61 999 999 999',
  });

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Fetch profile data using useStayCard hook
  const {
    data: profileData,
    isLoading: loading,
    error: queryError,
  } = useStayCard(cardType, profileId);

  // DEPRECATED: Old hook using needroom endpoint
  // const {
  //   data: profileData,
  //   isLoading: loading,
  //   error: queryError,
  // } = useRoommateProfile(profileId);

  // Transform profile data using useMemo - merge with defaults
  const displayProfile = useMemo(() => {
    if (!profileData) return profile;

    const price = profileData?.rentPerMonth || profileData.budget || profile.price;

    return {
      ...profile,
      name: profileData?.name || profile.name,
      occupation: profileData?.occupation || profile.occupation,
      lookingFor: profileData?.lookingFor || profile.lookingFor,
      price,
      contact: profileData?.phoneNumber || profile.contact,
      // price: profileData?.rentPerMonth ? profileData.rentPerMonth / 1000 : profile.price,
      rentPerMonth: profileData?.rentPerMonth || profileData.budget || profile.rentPerMonth,
      amenities: profileData?.amenities || profile.amenities,
      lifestyle: profileData?.lifestyle || profile.lifestyle,
      roomType: profileData?.roomType || profile.roomType,
      image: profileData?.profileImage || profile.image,
      livingSpace: profileData?.livingSpace || profile.livingSpace, // not there with http://localhost:5173/app/room-profile/4
      bedrooms: profileData?.bedrooms || profile.bedrooms, // not there with http://localhost:5173/app/room-profile/4
      bathrooms: profileData?.bathrooms || profile.bathrooms, // not there with http://localhost:5173/app/room-profile/4
      gender: profileData?.gender || profile.gender, // not there with http://localhost:5173/app/room-profile/4
      age: profileData?.age || profile.age, // not there with http://localhost:5173/app/room-profile/4
      address: profileData?.address || profile.address, // not there with http://localhost:5173/app/room-profile/4
      description: profileData?.description || profile.description,
      matchPercentage: profileData?.matchPercentage || profile.matchPercentage, // not there with http://localhost:5173/app/room-profile/4
      distance: profileData?.distance || profile.distance, // not there with http://localhost:5173/app/room-profile/4
    };
  }, [profileData, profile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  if (queryError) {
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-500 mb-2'>Error loading profile</p>
          <p className='text-gray-400 text-sm'>
            {queryError?.message || 'Failed to load profile data'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='text-white min-h-screen w-full relative pb-24'>
      <div className='max-w-full mx-auto p-4'>
        {/* Top navigation */}
        <div className='flex justify-between mb-4'>
          <div
            className='flex items-center cursor-pointer'
            onClick={() => {
              window.history.back();
            }}
          >
            <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center'>
              <ArrowLeftIcon />
            </div>
            {!isMobile && <span className='ml-2 text-lg font-medium'>Back</span>}
          </div>
          <div className='flex gap-2'>
            <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer'>
              <SaveIcon />
            </div>
            <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer'>
              <ShareButtonIcon />
            </div>
          </div>
        </div>

        {/* Main content columns */}
        <div className='bg-secondary flex flex-col lg:flex-row gap-4 mb-6 p-4 rounded-lg'>
          {/* Left Column - Profile Header */}
          <div className='lg:w-3/5'>
            <div className='bg-cardblack rounded-[24px] p-4'>
              <div className='flex items-start mb-2'>
                <div className='mr-3 mt-4'>
                  <ProfileImage
                    image={displayProfile.image}
                    name={displayProfile.name}
                    size='w-14 h-14'
                    fontSize='1.55rem'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h2 className='text-xl font-semibold flex items-center'>
                        {displayProfile?.name}
                        <TickIcon className='ml-2 text-green-500' />
                      </h2>
                      <p className='text-gray-400 flex items-center text-sm'>
                        <MapPin className='mr-1' />
                        {displayProfile?.address}
                      </p>
                    </div>
                    <div className='text-right'>
                      <div className='text-purple-500 text-xl font-bold'>
                        {/* $₹ {displayProfile?.price} */}₹ {displayProfile?.price}
                      </div>
                      <div className='text-gray-400 text-sm'>month</div>
                    </div>
                  </div>
                  <div className='flex flex-wrap justify-between mt-2'>
                    <div className='flex items-center text-sm'>
                      <span className='inline-block w-4 h-4 rounded-full bg-green-500 mr-1'></span>
                      <span className='mr-2'>{displayProfile?.matchPercentage}% Match</span>
                    </div>
                    <div className='flex items-center text-sm'>
                      <svg
                        className='w-4 h-4 mr-1'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                        />
                      </svg>
                      <span>Looking for {formatString(displayProfile?.lookingFor)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='text-sm text-green-400 mt-2'>
                {displayProfile?.distance} Km from your search
              </div>
            </div>

            {/* Description */}
            <div className='mb-6'>
              <h2 className='text-lg font-semibold mb-2'>Description</h2>
              <p className='text-gray-400'>
                {isDescriptionExpanded
                  ? displayProfile?.description
                  : displayProfile?.description?.length > 100
                    ? `${displayProfile?.description?.substring(0, 100)}...`
                    : displayProfile?.description}
                {displayProfile?.description?.length > 100 && (
                  <span
                    className='text-purple-500 ml-1 cursor-pointer'
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  >
                    {isDescriptionExpanded ? 'read less' : 'read more'}
                  </span>
                )}
              </p>
            </div>

            {/* Amenities */}
            {displayProfile?.amenities && displayProfile.amenities.length > 0 && (
              <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-3'>Amenities</h2>
                <div className='grid grid-cols-3 gap-4'>
                  {displayProfile.amenities.map((amenity, index) => {
                    const amenityData = amenitiesMapping[amenity] || {
                      icon: <KitchenIcon />,
                      label: formatString(amenity),
                    };
                    return (
                      <div
                        key={`amenity-${amenity}-${index}`}
                        className='bg-cardblack  rounded-full flex flex-col items-center '
                      >
                        {amenityData.icon}
                        <span className='text-sm mt-1'>{amenityData.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Life style */}
            {displayProfile?.lifestyle && displayProfile.lifestyle.length > 0 && (
              <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-3'>Life style</h2>
                <div className='grid grid-cols-3 gap-4'>
                  {displayProfile.lifestyle.map((style, index) => {
                    const lifestyleData = lifestyleMapping[style] || {
                      icon: <VegFoodIcon />,
                      label: formatString(style),
                    };
                    return (
                      <div
                        key={`lifestyle-${style}-${index}`}
                        className='bg-cardblack rounded-full flex flex-col items-center'
                      >
                        {lifestyleData.icon}
                        <span className='text-sm mt-1'>{lifestyleData.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Basic Info & Contact Info */}
          <div className='lg:w-2/5 flex flex-col gap-4'>
            {/* Basic Info */}
            <div className='rounded-lg p-4 mb-0'>
              <h2 className='text-lg font-semibold mb-3'>Basic Info</h2>
              {isMobile ? (
                <div className='grid grid-cols-3 gap-3'>
                  <div className='bg-cardblack rounded-xl p-3 flex flex-col items-center'>
                    <svg
                      className='w-6 h-6 mb-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
                      />
                    </svg>
                    <div className='text-sm text-white font-semibold'>
                      {formatString(displayProfile?.gender)}
                    </div>
                    <div className='text-xs text-gray-400'>Gender</div>
                  </div>
                  <div className='bg-cardblack rounded-xl p-3 flex flex-col items-center'>
                    <svg
                      className='w-6 h-6 mb-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                    <div className='text-sm text-white font-semibold'>
                      {formatString(displayProfile?.roomType)}
                    </div>
                    <div className='text-xs text-gray-400'>Occupancy</div>
                  </div>
                  <div className='bg-cardblack rounded-xl p-3 flex flex-col items-center'>
                    <svg
                      className='w-6 h-6 mb-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
                      />
                    </svg>
                    <div className='text-sm text-white font-semibold'>
                      {formatString(displayProfile?.lookingFor)}
                    </div>
                    <div className='text-xs text-gray-400'>Looking for</div>
                  </div>
                </div>
              ) : (
                <div className='grid grid-cols-3 gap-3'>
                  <div className='bg-cardblack rounded-xl p-4 flex flex-col items-center'>
                    <svg
                      className='w-6 h-6 mb-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
                      />
                    </svg>
                    <div className='text-sm text-white font-semibold'>
                      {formatString(displayProfile?.gender)}
                    </div>
                    <div className='text-xs text-gray-400'>Gender</div>
                  </div>
                  <div className='bg-cardblack rounded-xl p-4 flex flex-col items-center'>
                    <HomeOutlined className='text-xl mb-2' />
                    <div className='text-sm text-white font-semibold'>
                      {displayProfile?.livingSpace}Sq mtr
                    </div>
                    <div className='text-xs text-gray-400'>Living space</div>
                  </div>
                  <div className='bg-cardblack rounded-xl p-4 flex flex-col items-center'>
                    <svg
                      className='w-6 h-6 mb-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                    <div className='text-sm text-white font-semibold'>
                      {formatString(displayProfile?.roomType)}
                    </div>
                    <div className='text-xs text-gray-400'>Occupancy</div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className='rounded-lg p-4 mb-0'>
              <h2 className='text-lg font-semibold mb-3'>Contact Info</h2>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3'>
                    <PhoneOutlined className='text-lg' />
                  </div>
                  <span>{displayProfile?.contact}</span>
                </div>
                <div className='flex space-x-2'>
                  <Button className='bg-gray-800 border-none h-10 w-10 p-0 flex items-center justify-center'>
                    <MessageIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom nav for mobile */}
        {isMobile && (
          <div className='fixed bottom-0 left-0 right-0 bg-gray-900 p-3 flex items-center justify-between border-t border-gray-800'>
            <div className='flex items-center'>
              <div className='mr-2'>
                <ProfileImage
                  image={displayProfile.image}
                  name={displayProfile.name}
                  size='w-10 h-10'
                  fontSize='0.875rem'
                />
              </div>
              <div>
                <div className='text-sm font-medium'>{displayProfile.name}</div>
                <div className='text-xs text-gray-400'>
                  {displayProfile.occupation} {displayProfile.age}/
                  {displayProfile.gender?.charAt(0)}
                </div>
              </div>
            </div>
            <div className='flex space-x-2'>
              <Button
                type='default'
                className='bg-gray-800 border-none h-10 w-10 p-0 flex items-center justify-center rounded-full'
              >
                <PhoneOutlined className='text-white' />
              </Button>
              <Button
                type='default'
                className='bg-gray-800 border-none h-10 w-10 p-0 flex items-center justify-center rounded-full'
              >
                <MessageIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomProfile;
