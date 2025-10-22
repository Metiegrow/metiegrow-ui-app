// RoomHousingPage.jsx
import { Typography, Button, Spin, message, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import {
  FilterIcon,
  MessageIcon,
  OutgoingCallIcon,
  Percentage,
  ProfileIcon,
  TickIcon,
} from '../NeedRoomCommon.svg';
import { NoDataIcon } from '../../Common/SVG/svg.function';
import { useRouter } from '@tanstack/react-router';
import { getAuthData } from '../../Auth/Auth.Function';
// import { useRoomMatching } from '@/hooks/stay/queries'; // DEPRECATED - no longer using roomId
import { usePreferencesMatched } from '@/hooks/stay/queries';
import RoomateNeedPage from './NeedRoommateForm';
import { CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const URL = import.meta.env.VITE_API_BASE_URL;
const getInitialAvatar = (name) => {
  if (!name) return '';
  const initials = name
    .trim()
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  return initials.length > 2 ? initials.substring(0, 2) : initials;
};

function RoomHousingPage() {
  const [properties, setProperties] = useState([]);
  const [isRoommateModalVisible, setIsRoommateModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // DEPRECATED: No longer using roomId - using preferencesData common API instead
  // Get roomId from URL search params or localStorage
  // const getRoomId = () => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const roomIdFromUrl = searchParams.get('roomId');

  //   if (roomIdFromUrl) {
  //     localStorage.setItem('lastCreatedRoomId', roomIdFromUrl);
  //     return roomIdFromUrl;
  //   }

  //   return localStorage.getItem('lastCreatedRoomId');
  // };

  // const roomId = getRoomId();
  // const roomId = null; // Always use preferencesData API

  // Pagination removed - no longer needed on this page
  // Items will be limited to 12 on this page
  // Full list with pagination will be on /app/room-housing-list

  // DEPRECATED: Query 1: Room matching (when roomId exists) - No longer needed
  // const {
  //   data: roomMatchingData,
  //   isLoading: isLoadingRoomMatching,
  //   error: roomMatchingError,
  // } = useRoomMatching(roomId, { enabled: !!roomId });

  // Set to null since we're not using roomId anymore
  // const roomMatchingData = null;
  // const isLoadingRoomMatching = false;
  // const roomMatchingError = null;

  // Query: Preferences matched - Show first 12 items only
  const {
    data: preferencesData,
    isLoading: isLoadingPreferences,
    error: preferencesError,
  } = usePreferencesMatched({
    pageNumber: 0,
    pageSize: 12,
    cardType: 'ROOM',
  }); // Fetch only first 12 items

  console.log('preferencesData:', preferencesData, preferencesError);

  const navigateToPropertyDetail = (id) => {
    router.navigate({
      to: '/app/stay-room-details/$id',
      params: { id: String(id) },
    });
  };

  const navigateToProfile = (id) => {
    // Navigate to room profile with the selected roommate ID
    router.navigate({
      // to: '/app/room-profile/$id',
      to: `/app/room-profile/${id}?cardType=ROOM`,
      // params: { roommateId: String(id) },
    });
  };

  // Function to render avatar with fallback to initials
  const renderAvatar = (match) => {
    if (match.profileImage) {
      return (
        <img
          src={match.profileImage}
          alt={`Profile of ${match.name}`}
          className='object-cover w-16 h-16 mt-2 border-2 border-white rounded-full sm:w-20 sm:h-20 sm:mt-4'
          loading='lazy'
          onError={(e) => {
            e.target.src = '';
            e.target.onerror = null;
            e.target.parentElement.innerHTML = `
              <div class="w-16 h-16 sm:w-20 sm:h-20 mt-2 sm:mt-4 rounded-full bg-gray-700 flex items-center justify-center border-2 border-white">
                <span class="text-lg font-bold text-white">
                  ${getInitialAvatar(match.name)}
                </span>
              </div>
            `;
          }}
        />
      );
    }
    return (
      <div className='flex items-center justify-center w-16 h-16 mt-2 bg-gray-700 border-2 border-white rounded-full sm:w-20 sm:h-20 sm:mt-4'>
        <span className='text-lg font-bold text-white'>{getInitialAvatar(match.name)}</span>
      </div>
    );
  };

  // Loading and error states (only from preferencesData now)
  const loading = isLoadingPreferences; // Removed isLoadingRoomMatching
  const error = preferencesError; // Removed roomMatchingError

  // Format matches data from preferencesData (common cards API)
  const matches = React.useMemo(() => {
    // DEPRECATED: Room matching data logic (commented out)
    // if (roomId && roomMatchingData) {
    //   // Format room matching data (has nested roommate structure)
    //   console.log('Room Matching API Response:', roomMatchingData);
    //   if (!Array.isArray(roomMatchingData)) return [];
    //   return roomMatchingData.map((item) => {
    //     const roommate = item?.roommate || {};
    //     const userCred = roommate?.userCred || {};
    //     const rawName = `${userCred.firstName || ''} ${userCred.lastName || ''}`.trim();
    //     const name = rawName.replace(/\s*null\s*$/i, '').trim() || 'Anonymous';
    //     let profileImage = userCred?.profilePicUrl || roommate?.profileImage;
    //     if (profileImage && typeof profileImage === 'string' && !/^https?:\/\//i.test(profileImage)) {
    //       profileImage = `${URL}/${profileImage}`;
    //     }
    //     const lifestyles = roommate?.lifestyleAmenities?.lifestyles || roommate?.lifeStyle || [];
    //     const amenities = roommate?.lifestyleAmenities?.amenities || roommate?.amenities || [];
    //     return {
    //       id: roommate.id,
    //       name,
    //       profileImage: profileImage || null,
    //       price: roommate.budget || 0,
    //       address: `${roommate.city || ''}, ${roommate.state || ''}`,
    //       matchPercentage: item.matchPercentage,
    //       distance: item.distance ? `${item.distance} km away` : 'Less than 5km away',
    //       verified: Boolean(userCred.active || roommate.isPremium),
    //       genderPreference: roommate.genderPreference,
    //       occupation: roommate.occupation,
    //       roomType: roommate.roomType,
    //       amenities,
    //       lifestyle: lifestyles,
    //       originalData: roommate,
    //     };
    //   });
    // }

    // Format preferences matched data (flat structure in data array)
    if (preferencesData) {
      console.log('Preferences Matched API Response:', preferencesData);

      const dataArray = preferencesData?.data || [];
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.log('No data array found or empty array');
        return [];
      }

      console.log('Mapping data array:', dataArray);

      return dataArray.map((item) => {
        // Use profileImage directly from API response (not imageUrl)
        let profileImage = item.profileImage;
        if (
          profileImage &&
          typeof profileImage === 'string' &&
          !/^https?:\/\//i.test(profileImage)
        ) {
          profileImage = `${URL}/${profileImage}`;
        }
        return {
          id: item.id,
          name: item.name || 'Anonymous',
          profileImage: profileImage || null,
          price: item.budget || 0,
          address: `${item.city || ''}`,
          matchPercentage: item.matchPercentage || 0,
          distance: item.distance ? `${item.distance} km away` : 'Less than 5km away',
          verified: false,
          genderPreference: item.genderPreference || 'No preference',
          occupation: null,
          roomType: item.roomType || 'Not specified',
          amenities: [],
          lifestyle: [],
          originalData: item,
        };
      });
    }

    return [];
  }, [preferencesData]); // Removed roomId and roomMatchingData dependencies

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Blur background when modal is open
  useEffect(() => {
    const body = document.body;
    if (isRoommateModalVisible) {
      body.classList.add('modal-blur');
    } else {
      body.classList.remove('modal-blur');
    }
  }, [isRoommateModalVisible]);

  // Initialize properties once
  useEffect(() => {
    setProperties([
      {
        id: 1,
        name: 'Luxury Apartment',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Downtown, Chennai',
        price: 12000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 2,
        name: 'Studio Apartment',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Central Chennai',
        price: 8000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 3,
        name: 'Shared Housing',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Near University, Chennai',
        price: 5000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 4,
        name: 'Cozy 2BHK',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Anna Nagar, Chennai',
        price: 15000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 5,
        name: 'Modern 3BHK',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'T Nagar, Chennai',
        price: 18000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 6,
        name: 'Spacious Villa',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Velachery, Chennai',
        price: 25000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 7,
        name: 'Budget Friendly PG',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Guindy, Chennai',
        price: 6000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 8,
        name: 'Premium Flat',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Adyar, Chennai',
        price: 22000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 9,
        name: 'Family House',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Mylapore, Chennai',
        price: 20000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 10,
        name: 'Compact 1BHK',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Tambaram, Chennai',
        price: 9000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 11,
        name: 'Duplex Apartment',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Porur, Chennai',
        price: 17000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 12,
        name: 'Sea View Flat',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Besant Nagar, Chennai',
        price: 28000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
    ]);
  }, []);

  // Show error message when query fails
  useEffect(() => {
    if (error) {
      message.error('Failed to load matching roommates');
    }
  }, [error]);

  const handleBackClick = () => {
    router.navigate({ to: '/app/room-form' });
  };

  // Get dashboard route based on user role
  const getDashboardRoute = () => {
    const authData = getAuthData();
    if (!authData) {
      return '/app/student-dashboard'; // default fallback
    }

    // Check userType first (most common)
    if (authData.userType) {
      const userTypeMap = {
        user: '/app/student-dashboard',
        mentor: '/app/mentor-dashboard',
        alumni: '/app/alumni-dashboard',
        lawyer: '/app/lawyer-dashboard',
        pgowner: '/app/landlord-dashboard',
        hr: '/app/recruiter-dashboard',
      };
      return userTypeMap[authData.userType.toLowerCase()] || '/app/student-dashboard';
    }

    // Check roles array
    if (authData.roles && authData.roles.length > 0) {
      const role = authData.roles[0]?.role; // Get first role

      const roleMap = {
        USER: '/app/student-dashboard',
        ROLE_USER: '/app/student-dashboard',
        MENTOR: '/app/mentor-dashboard',
        ROLE_MENTOR: '/app/mentor-dashboard',
        ALUMNI: '/app/alumni-dashboard',
        ROLE_ALUMNI: '/app/alumni-dashboard',
        LAWYER: '/app/lawyer-dashboard',
        ROLE_LAWYER: '/app/lawyer-dashboard',
        PG_OWNER: '/app/landlord-dashboard',
        ROLE_PG_OWNER: '/app/landlord-dashboard',
        HR: '/app/recruiter-dashboard',
        ROLE_HR: '/app/recruiter-dashboard',
      };

      return roleMap[role] || '/app/student-dashboard';
    }

    return '/app/student-dashboard';
  };

  // Handle Create Room button click
  const handleCreateRoomClick = () => {
    const dashboardRoute = getDashboardRoute();
    // Store flag to open modal after navigation
    sessionStorage.setItem('openRoommateModal', 'true');
    router.navigate({ to: dashboardRoute });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen text-white bg-dark'>
        <Spin size='large' />
      </div>
    );
  }

  if (error) {
    // Check if it's the specific "roommate not found" or "roommate details not available" error (400/404)
    const errorMessage = error?.message?.toLowerCase() || '';
    const responseMessage = error?.response?.data?.message?.toLowerCase() || '';
    const isNoPreferenceError =
      error?.response?.status === 400 ||
      error?.response?.status === 404 ||
      errorMessage.includes('roommate not found') ||
      errorMessage.includes('roommate details not available') ||
      responseMessage.includes('roommate not found') ||
      responseMessage.includes('roommate details not available');

    if (isNoPreferenceError) {
      // Show custom UI for no preference data
      return (
        <div className='flex items-center justify-center min-h-screen text-white bg-dark'>
          <div className='text-center max-w-md px-6'>
            <p className='mb-6 text-2xl font-semibold text-gray-200'>
              No roommate preferences found
            </p>
            <p className='mb-8 text-base text-gray-400'>
              You haven't posted your room details yet. Create your first room listing to find
              compatible roommates.
            </p>
            <button
              onClick={handleCreateRoomClick}
              className='w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-full font-medium transition-colors duration-200'
            >
              Create Room
            </button>
          </div>
        </div>
      );
    }

    // Show generic error for other errors
    return (
      <div className='flex items-center justify-center min-h-screen text-white bg-dark'>
        <div className='text-center'>
          <p className='mb-4 text-lg text-red-500'>Error: {error}</p>
          <Button type='primary' onClick={handleBackClick}>
            Go Back to Search
          </Button>
        </div>
      </div>
    );
  }

  // if (matches.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen text-white bg-dark">
  //       <div className="text-center">
  //         <p className="mb-4 text-lg">No matching roommates found</p>
  //         <Button type="primary" onClick={handleBackClick}>
  //           Go Back to Search
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // Get total count from pagination meta or matches length
  const totalMatches = preferencesData?.paginationMeta?.totalCount || matches.length; // Simplified, no roomId check needed

  return (
    <div className='w-full min-h-screen px-4 mx-auto font-sans text-white bg-dark sm:px-6 lg:px-8 max-w-7xl'>
      {/* Header Section */}
      <div className='flex flex-col items-start justify-between w-full py-4 text-white bg-dark sm:py-6 sm:flex-row sm:items-center'>
        <div className='flex items-center gap-4'>
          {/* <Link onClick={handleBackClick} className="cursor-pointer">
            <BackButtonIcon />
          </Link> */}
          <div>
            <h1 className='text-xl font-bold leading-tight sm:text-3xl'>
              Preference Matched ({totalMatches})
            </h1>
            <p className='mt-1 text-sm text-gray-400'>for you room</p>
          </div>
        </div>
        <Button
          onClick={() => router.navigate({ to: '/app/room-housing-list' })}
          className='mt-2 text-sm font-medium text-purple-500 cursor-pointer sm:mt-0 hover:underline ant-btn-primary'
        >
          View all
        </Button>
      </div>

      {/* Matches Section */}
      <div className='mt-6'>
        {Array.isArray(matches) && matches.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {matches.map((match) => (
                <div
                  key={match.id}
                  className='relative p-3 transition-colors shadow-lg cursor-pointer bg-cardblack rounded-2xl hover:bg-cardblack-hover'
                  onClick={() => navigateToProfile(match.id)}
                >
                  <div className='flex gap-3'>
                    <div className='flex items-center justify-center flex-shrink-0'>
                      {renderAvatar(match)}
                    </div>

                    <div className='flex flex-col justify-between flex-1 overflow-hidden'>
                      <div>
                        <div className='flex flex-wrap items-start justify-between gap-1'>
                          <div className='flex items-center'>
                            <h3 className='flex items-center mb-0 text-lg font-medium text-white break-words'>
                              {match.name}
                              {match.verified && <TickIcon className='inline ml-2' />}
                            </h3>
                          </div>
                          <div className='flex items-baseline mt-6'>
                            <span className='text-base font-bold text-purple-500 sm:text-lg'>
                              ₹{match.price}
                            </span>
                            <span className='ml-1 text-xs text-gray-400 sm:text-sm'>/mon</span>
                          </div>
                        </div>

                        <div className='flex items-center gap-1 text-gray-300'>
                          <MapPin className='flex-shrink-0 w-4 h-4 mt-0' />
                          <p className='text-xs leading-snug break-words sm:text-sm'>
                            {match.address}
                          </p>
                        </div>
                      </div>

                      <div className='mt-0'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <span className='flex items-center gap-1 text-xs text-white break-words sm:text-sm'>
                            <Percentage /> {match.matchPercentage}% Match
                          </span>
                          <span className='flex items-center gap-1 text-xs text-gray-300 break-words sm:text-sm'>
                            <ProfileIcon /> Looking for {match.genderPreference}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col items-start justify-between gap-2 mt-4 sm:flex-row sm:items-center'>
                    <p className='ml-1 text-xs text-green-400 break-words sm:text-sm sm:ml-4'>
                      {match.distance}
                    </p>

                    <div className='flex gap-0 ml-auto sm:ml-0'>
                      <Button
                        className='ant-btn-primary'
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <OutgoingCallIcon className='w-4 h-4 text-white' />
                      </Button>
                      <Button
                        className='ant-btn-primary'
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MessageIcon className='w-4 h-4 text-white' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // minimal: just an image + single-line message
          <div className='flex flex-col items-center justify-center w-full p-8 mt-6 rounded-2xl bg-cardblack'>
            <NoDataIcon />
            <p className='text-base text-gray-300'>No matching roommates found</p>
          </div>
        )}
      </div>

      {/* Properties Section */}
      <div className='mt-10'>
        <div className='flex items-center justify-between py-3 sm:py-6'>
          <h2 className='text-xl font-bold leading-tight text-white sm:text-3xl'>
            Find your next home
          </h2>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => router.navigate({ to: '/app/properties-list' })}
              className='text-sm font-medium text-purple-500 cursor-pointer hover:underline ant-btn-primary'
            >
              View all
            </Button>
          </div>
        </div>

        {Array.isArray(properties) && properties.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-4 pb-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-6'>
              {properties.map((property) => (
                <div
                  key={property.id}
                  className='relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] cursor-pointer'
                  onClick={() => navigateToPropertyDetail(property.id)}
                >
                  <img
                    src={property.imageUrl}
                    alt='Stay'
                    className='absolute object-cover object-center w-full h-full'
                  />

                  {property.recentlyPosted && (
                    <div className='absolute top-2 sm:top-3 left-2 sm:left-3 bg-black text-white font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs'>
                      Recently Posted
                    </div>
                  )}

                  <div className='absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-black bg-opacity-50 text-white p-3 sm:p-4 rounded-[16px] sm:rounded-[20px]'>
                    <div className='flex items-end justify-between gap-2'>
                      <div className='flex-1 min-w-0'>
                        <h2 className='text-sm font-semibold leading-tight truncate sm:text-base md:text-lg'>
                          {property.name}
                        </h2>
                        <p className='text-[11px] sm:text-xs md:text-sm text-gray-300 mt-0.5 sm:mt-1 truncate'>
                          {property.address}
                        </p>
                      </div>
                      <div className='flex-shrink-0 ml-1 text-right sm:ml-2'>
                        <p className='text-base font-bold text-white sm:text-lg md:text-xl whitespace-nowrap'>
                          ₹{property.price}{' '}
                          <span className='text-xs font-normal sm:text-sm'>
                            /{property.priceUnit}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // minimal placeholder for properties
          <div className='flex flex-col items-center justify-center w-full p-8 mt-6 rounded-2xl bg-cardblack'>
            <NoDataIcon />
            <p className='text-base text-gray-300'>No properties found</p>
          </div>
        )}
      </div>

      {/* Need Roommate Modal */}
      <Modal
        open={isRoommateModalVisible}
        onCancel={() => setIsRoommateModalVisible(false)}
        footer={null}
        width='100%'
        style={{ maxWidth: 800 }}
        bodyStyle={{ padding: 0, backgroundColor: 'black' }}
        closeIcon={
          isMobile ? null : (
            <div
              style={{
                border: '2px solid white',
                borderRadius: '9999px',
                padding: '8px',
                marginTop: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloseOutlined style={{ color: 'white', fontSize: 16 }} />
            </div>
          )
        }
      >
        <RoomateNeedPage noPadding />
      </Modal>
    </div>
  );
}

export default RoomHousingPage;
