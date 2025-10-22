import React, { useState, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import {
  BackButtonIcon,
  SaveIcon,
  ShareButtonIcon,
} from '../Common/SVG/svg.function';
import {
  KitchenIcon,
  LaundryIcon,
  MessageIcon,
  ParkingIcon,
  TickIcon,
  WifiIcon,
  FurnitureIcon,
  OutgoingCallIcon,
  VegFoodIcon,
  NightOwlIcon,
  StudiousIcon,
  FitnessBreakIcon,
  NonSmokerIcon,
  NonDrinkerIcon,
  GamingIcon,
} from '../Stay/NeedRoomCommon.svg';

// Helper function to format string
const formatString = (str) => {
  if (!str) return '';
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Constants for amenities options
const AMENITIES_OPTIONS = [
  { value: 'KITCHEN', icon: <KitchenIcon />, label: 'Kitchen' },
  { value: 'PARKING', icon: <ParkingIcon />, label: 'Parking' },
  { value: 'WIFI', icon: <WifiIcon />, label: 'Wifi' },
  { value: 'FURNITURE', icon: <FurnitureIcon />, label: 'Furniture' },
  { value: 'LAUNDRY', icon: <LaundryIcon />, label: 'Laundry' },
];

// Constants for lifestyle options
const LIFESTYLE_OPTIONS = [
  { value: 'VEG_FOOD', icon: <VegFoodIcon />, label: 'Veg food' },
  { value: 'NIGHT_OWL', icon: <NightOwlIcon />, label: 'Night Owl' },
  { value: 'STUDIOUS', icon: <StudiousIcon />, label: 'Studious' },
  { value: 'FITNESS_FREAK', icon: <FitnessBreakIcon />, label: 'Fitness Freak' },
  { value: 'NON_SMOKER', icon: <NonSmokerIcon />, label: 'Non Smoker' },
  { value: 'NON_DRINKER', icon: <NonDrinkerIcon />, label: 'Non Drinker' },
  { value: 'GAMING', icon: <GamingIcon />, label: 'Gaming' },
  { value: 'DJ_PARTIES', icon: <GamingIcon />, label: 'DJ Parties' },
];

// Create mappings from the constants
const amenitiesMapping = AMENITIES_OPTIONS.reduce((acc, option) => {
  acc[option.value] = { icon: option.icon, label: option.label };
  return acc;
}, {});

const lifestyleMapping = LIFESTYLE_OPTIONS.reduce((acc, option) => {
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
        <img src={image} alt={`${name}'s profile`} className='w-full h-full object-cover' />
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

const LandlordPostDetail = () => {
  const router = useRouter();

  // Get ID from URL path parameter
  const postId =
    router?.state?.location?.pathname?.split('/').pop() || router?.currentMatches?.[0]?.params?.id;

  // Mock data - replace with actual API call
  const [post] = useState({
    id: postId,
    name: 'Luxury Apartment',
    images: [
      'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
      'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
      'https://img.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
      'https://img.freepik.com/premium-photo/luxury-bedroom-interior-with-rich-furniture_1262-12844.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
    ],
    address: 'Downtown, Chennai',
    price: 12000,
    priceUnit: 'month',
    description:
      'Beautiful luxury apartment in the heart of downtown Chennai. Features modern amenities, spacious rooms, and excellent connectivity to major areas. Perfect for professionals and small families looking for a comfortable living space with all modern conveniences.',
    rentPerMonth: 12000,
    livingSpace: '850',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['KITCHEN', 'PARKING', 'WIFI'],
    lifestyle: ['DJ_PARTIES', 'NON_SMOKER', 'NON_DRINKER'],
    contact: '+91 999 999 9999',
    ownerName: 'Rajiv',
    ownerImage: '',
    postedDate: '12 Jan 2025',
  });

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-dark text-white'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
      </div>
    );
  }

  return (
    <>
      <div className='flex justify-between p-4'>
        <div
          className='w-12 h-12 flex items-center justify-center cursor-pointer'
          onClick={handleBackClick}
        >
          <BackButtonIcon />
        </div>
        <div className='flex gap-2'>
          <div className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer'>
            <SaveIcon />
          </div>
          <div className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer'>
            <ShareButtonIcon />
          </div>
        </div>
      </div>
      <div className='lg:bg-[#131313] text-white min-h-screen w-full'>
        {/* Mobile & Tablet View (below 1024px) */}
        <div className='block lg:hidden'>
          {/* Image Carousel */}
          <div className='relative w-full h-64 p-4'>
            <img
              src={post.images[currentImageIndex]}
              alt={`Room view ${currentImageIndex + 1}`}
              className='w-full h-full object-cover rounded-[24px]'
            />
          </div>
          <div className='absolute bottom-18 left-0 right-0 flex justify-center gap-1'>
            {post.images.map((_, index) => (
              <button
                key={index}
                className={`w-8 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-500'}`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>

          {/* Profile Header */}
          <div className='px-4 py-3 flex justify-between items-center'>
            <div>
              <div className='flex items-center gap-2'>
                <h2 className='text-lg font-semibold'>{post.name}</h2>
                <TickIcon />
              </div>
              <div className='flex items-center text-xs text-gray-400'>
                <MapPin size={12} className='mr-1' />
                <span>{post.address}</span>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-purple-500 font-bold'>₹{post.price}</span>
              <span className='text-xs text-gray-400 block'>pm</span>
            </div>
          </div>

          {/* Basic Info Section */}
          <div className='px-4 pt-2'>
            <h3 className='text-sm font-semibold mb-3'>Basic Info</h3>
            <div className='flex justify-between gap-2'>
              <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
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
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  />
                </svg>
                <span className='text-xs font-medium'>{post.livingSpace} Sq mtr</span>
                <span className='text-xs text-gray-500'>Living space</span>
              </div>
              <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
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
                <span className='text-xs font-medium'>{post.bedrooms} BHK</span>
                <span className='text-xs text-gray-500'>Bedrooms</span>
              </div>
              <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
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
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <span className='text-xs font-medium'>{post.bathrooms}</span>
                <span className='text-xs text-gray-500'>Bathrooms</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className='px-4 pt-4'>
            <h3 className='text-sm font-semibold mb-2'>Description</h3>
            <p className='text-xs text-gray-300'>
              {isDescriptionExpanded
                ? post.description
                : `${post.description.substring(0, 100)}...`}
              <a
                className='text-[#F37766] ml-1 cursor-pointer'
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? 'read less' : 'read more'}
              </a>
            </p>
          </div>

          {/* Amenities Section */}
          <div className='px-4 pt-4'>
            <h3 className='text-sm font-semibold mb-3'>Amenities</h3>
            <div className='flex justify-start gap-4'>
              {post.amenities.map((amenity, index) => {
                const amenityData = amenitiesMapping[amenity] || {
                  icon: <KitchenIcon />,
                  label: formatString(amenity),
                };
                return (
                  <div key={index} className='flex flex-col items-center'>
                    <div className='bg-cardblack rounded-full p-3 mb-1 w-12 h-12 flex items-center justify-center'>
                      {amenityData.icon}
                    </div>
                    <span className='text-xs'>{amenityData.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Life style Section */}
          {post.lifestyle && post.lifestyle.length > 0 && (
            <div className='px-4 pt-4'>
              <h3 className='text-sm font-semibold mb-3'>Life style</h3>
              <div className='flex justify-start gap-4'>
                {post.lifestyle.map((style, index) => {
                  const lifestyleData = lifestyleMapping[style] || {
                    icon: <VegFoodIcon />,
                    label: formatString(style),
                  };
                  return (
                    <div key={index} className='flex flex-col items-center'>
                      <div className='bg-cardblack rounded-full p-3 mb-1 w-12 h-12 flex items-center justify-center'>
                        {lifestyleData.icon}
                      </div>
                      <span className='text-xs'>{lifestyleData.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Posted by Section */}
          <div className='px-4 pt-4 pb-20'>
            <h3 className='text-sm font-semibold mb-3'>Posted by</h3>
            <div className='flex items-center gap-3'>
              <ProfileImage
                image={post.ownerImage}
                name={post.ownerName}
                size='w-16 h-16'
                fontSize='1.5rem'
              />
              <div>
                <h4 className='text-base font-semibold'>
                  {post.ownerName} <span className='text-gray-400 font-normal'>(you)</span>
                </h4>
                <p className='text-xs text-gray-400'>Owner</p>
                <p className='text-xs text-gray-400'>Posted on: {post.postedDate}</p>
              </div>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className='block sm:hidden fixed bottom-0 left-0 right-0 bg-gray-900 p-3 flex justify-between items-center'>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-full mr-2 overflow-hidden'>
                <ProfileImage
                  image={post.ownerImage}
                  name={post.ownerName}
                  size='w-10 h-10'
                  fontSize='0.875rem'
                />
              </div>
              <div>
                <div className='text-sm font-medium flex items-center gap-1'>
                  {post.ownerName}
                  <TickIcon size={16} />
                </div>
                <div className='text-xs text-gray-400'>Owner</div>
              </div>
            </div>
            <div className='flex gap-2'>
              <button className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'>
                <Phone size={18} />
              </button>
              <button className='w-10 h-10 bg-[#F37766] rounded-full flex items-center justify-center'>
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop View (1024px and above) */}
        <div className='hidden lg:block container mx-auto p-8 pb-12'>
          {/* Image Grid Section */}
          <div className='grid grid-cols-5 grid-rows-4 gap-2 h-[400px]'>
            {/* Div1 - spans 3 columns and all 4 rows */}
            <div className='col-span-3 row-span-4 rounded-xl overflow-hidden'>
              <img
                src={post.images[0]}
                alt='Property main view'
                className='w-full h-full object-cover'
              />
            </div>

            {/* Div2 - starts at column 4, spans 2 rows */}
            <div className='col-start-4 row-span-2 rounded-xl overflow-hidden'>
              <img
                src={post.images[1]}
                alt='Property view 2'
                className='w-full h-full object-cover'
              />
            </div>

            {/* Div3 - starts at column 4 and row 3, spans 2 rows */}
            <div className='col-start-4 row-start-3 row-span-2 rounded-xl overflow-hidden'>
              <img
                src={post.images[2]}
                alt='Property view 3'
                className='w-full h-full object-cover'
              />
            </div>

            {/* Div4 - starts at column 5 and row 1, spans all 4 rows */}
            <div className='col-start-5 row-span-4 relative rounded-xl overflow-hidden'>
              <img
                src={post.images[3]}
                alt='View more'
                className='w-full h-full object-cover opacity-70'
              />
              <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50'>
                <h3 className='text-lg font-semibold mb-1'>View More</h3>
                <p className='text-xs text-center'>Discover how AI is transforming</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-12'>
            {/* Left Section - 5/8 width */}
            <div className='lg:w-[662px] w-full'>
              {/* Profile Header with Name and Price */}
              <div className='flex justify-between items-center mb-2'>
                <div className='flex items-center gap-2'>
                  <h2 className='text-2xl font-semibold'>{post.name}</h2>
                  <TickIcon />
                </div>
                <div className='text-right'>
                  <span className='text-purple-500 text-2xl font-bold'>₹{post.price}</span>
                  <span className='text-xs text-gray-400 block'>pm</span>
                </div>
              </div>

              {/* Location */}
              <div className='flex items-center text-sm text-gray-400 mb-6'>
                <MapPin size={16} className='mr-1' />
                <span>{post.address}</span>
              </div>

              {/* Description Section */}
              <div className='mb-8'>
                <h3 className='text-lg font-medium mb-2'>Description</h3>
                <p className='text-sm text-gray-300'>
                  {isDescriptionExpanded
                    ? post.description
                    : `${post.description.substring(0, 120)}...`}
                  <a
                    className='text-[#F37766] ml-1 hover:underline cursor-pointer'
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  >
                    {isDescriptionExpanded ? 'read less' : 'read more'}
                  </a>
                </p>
              </div>

              {/* Amenities Section */}
              <div className='mb-8'>
                <h3 className='text-lg font-medium mb-4'>Amenities</h3>
                <div className='grid grid-cols-3 sm:grid-cols-5 gap-4'>
                  {post.amenities.map((amenity, index) => {
                    const amenityData = amenitiesMapping[amenity] || {
                      icon: <KitchenIcon />,
                      label: formatString(amenity),
                    };
                    return (
                      <div key={index} className='flex flex-col items-center'>
                        <div className='bg-cardblack rounded-full p-4 mb-2 w-14 h-14 flex items-center justify-center'>
                          {amenityData.icon}
                        </div>
                        <span className='text-xs text-center'>{amenityData.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Life style Section */}
              {post.lifestyle && post.lifestyle.length > 0 && (
                <div className='mb-8'>
                  <h3 className='text-lg font-medium mb-4'>Life style</h3>
                  <div className='grid grid-cols-3 sm:grid-cols-5 gap-4'>
                    {post.lifestyle.map((style, index) => {
                      const lifestyleData = lifestyleMapping[style] || {
                        icon: <VegFoodIcon />,
                        label: formatString(style),
                      };
                      return (
                        <div key={index} className='flex flex-col items-center'>
                          <div className='bg-cardblack rounded-full p-4 mb-2 w-14 h-14 flex items-center justify-center'>
                            {lifestyleData.icon}
                          </div>
                          <span className='text-xs text-center'>{lifestyleData.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Posted by Section */}
              <div className='mb-8'>
                <h3 className='text-lg font-medium mb-4'>Posted by</h3>
                <div className='flex items-center gap-4'>
                  <ProfileImage
                    image={post.ownerImage}
                    name={post.ownerName}
                    size='w-16 h-16'
                    fontSize='1.5rem'
                  />
                  <div>
                    <h4 className='text-base font-semibold'>
                      {post.ownerName} <span className='text-gray-400 font-normal'>(you)</span>
                    </h4>
                    <p className='text-sm text-gray-400'>Owner</p>
                    <p className='text-sm text-gray-400'>Posted on: {post.postedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - 3/8 width */}
            <div className='lg:w-[437px] w-full mb-8'>
              {/* Basic Info Section */}
              <h3 className='text-sm font-semibold mb-3'>Basic Info</h3>
              <div className='flex justify-between gap-2 mb-6'>
                <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
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
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  <span className='text-xs font-medium'>{post.livingSpace} Sq mtr</span>
                  <span className='text-xs text-gray-500'>Living space</span>
                </div>
                <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
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
                  <span className='text-xs font-medium'>{post.bedrooms} BHK</span>
                  <span className='text-xs text-gray-500'>Bedrooms</span>
                </div>
                <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
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
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  <span className='text-xs font-medium'>{post.bathrooms}</span>
                  <span className='text-xs text-gray-500'>Bathrooms</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className='rounded-xl p-6'>
                <h3 className='text-lg font-medium mb-4'>Contact Info</h3>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <OutgoingCallIcon size={18} className='pr-6' />
                    <span className='text-sm'>{post.contact}</span>
                  </div>
                  <a className='cursor-pointer'>
                    <MessageIcon size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandlordPostDetail;
