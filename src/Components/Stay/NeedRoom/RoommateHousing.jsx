import { Typography, Button, Spin, message, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import {
  FilterIcon,
  MessageIcon,
  OutgoingCallIcon,
  Percentage,
  ProfileIcon,
  TickIcon,
} from '../NeedRoomCommon.svg';
import { useRouter } from '@tanstack/react-router';

import { BackButtonIcon, NoDataIcon } from '../../Common/SVG/svg.function';
// import { getRoommateMatching } from '../Common/StayFormHandler'; // DEPRECATED - using preferencesData API
import { getAuthData } from '../../Auth/Auth.Function';
import Loader from '../../Common/Loader';
import { usePreferencesMatched } from '@/hooks/stay/queries';
import { usePagination } from '@/hooks/usePagination';
import RoomNeedPage from './NeedRoomForm';
import { CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const URL = import.meta.env.VITE_API_BASE_URL;
// Helper function to get initials from full name
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

function RoommateHousing() {
  // DEPRECATED: Using React Query hooks now instead of local state
  // const [loading, setLoading] = useState(true);
  // const [matches, setMatches] = useState([]);
  // const [error, setError] = useState(null);

  const [properties, setProperties] = useState([]);
  const [isRoomNeedModalVisible, setIsRoomNeedModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Pagination removed - no longer needed on this page
  // Items will be limited to 12 on this page
  // Full list with pagination will be on separate pages

  const CARD_TYPE = 'ROOMMATE';

  // Fetch from preferencesData API - Show first 12 items only
  const {
    data: preferencesData,
    isLoading: loading,
    error: queryError,
  } = usePreferencesMatched({
    pageNumber: 0,
    pageSize: 12,
    cardType: CARD_TYPE,
  });

  // Get dashboard route based on user role
  const getUserDashboardRoute = () => {
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
        recruiter: '/app/recruiter-dashboard',
        realestate: '/app/landlord-dashboard',
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
        RECRUITER: '/app/recruiter-dashboard',
        ROLE_RECRUITER: '/app/recruiter-dashboard',
        REALESTATE: '/app/landlord-dashboard',
        ROLE_REALESTATE: '/app/landlord-dashboard',
      };

      return roleMap[role] || '/app/student-dashboard';
    }

    return '/app/student-dashboard';
  };

  // Handle Create Roommate button click
  const handleCreateRoommateClick = () => {
    const dashboardRoute = getUserDashboardRoute();
    // Store flag to open modal after navigation
    sessionStorage.setItem('openRoomModal', 'true');
    router.navigate({ to: dashboardRoute });
  };

  // DEPRECATED: No longer using roomId - using preferencesData common API instead
  // Get room ID function defined before it's used
  // const getRoomId = () => {
  //   const roomIdFromUrl = router.state.location.search.roomId;
  //   const storedRoomId = localStorage.getItem('lastCreatedRoomId');
  //   const validRoomId = roomIdFromUrl || storedRoomId;

  //   if (!validRoomId) {
  //     message.error('No room ID found. Please initiate a roommate search.');
  //     // Navigate back to the dashboard or search page
  //     router.navigate({ to: getUserDashboardRoute() });
  //     return null;
  //   }

  //   if (roomIdFromUrl && roomIdFromUrl !== storedRoomId) {
  //     localStorage.setItem('lastCreatedRoomId', roomIdFromUrl);
  //   }

  //   return validRoomId;
  // };

  // const roomId = getRoomId();
  // const roomId = null; // Always use preferencesData API

  const navigateToProfile = (roommateId) => {
    console.log('Navigating to roommate profile with ID:', roommateId);
    // Navigate to room profile with the selected roommate ID
    router.navigate({
      to: `/app/roommate/${roommateId}`,
      search: { cardType: CARD_TYPE },
    });
  };

  // State to track failed images
  const [failedImages, setFailedImages] = useState(new Set());

  // Function to render avatar with fallback to initials
  const renderAvatar = (match) => {
    const imageKey = match.profileImage || match.id;
    const hasImageFailed = failedImages.has(imageKey);

    if (match.profileImage && !hasImageFailed) {
      return (
        <img
          src={match.profileImage}
          alt={`Profile of ${match.name}`}
          className='w-16 h-16 sm:w-20 sm:h-20 mt-2 sm:mt-4 rounded-full object-cover border-2 border-white'
          loading='lazy'
          onError={() => {
            setFailedImages((prev) => new Set(prev).add(imageKey));
          }}
        />
      );
    }
    return (
      <div className='w-16 h-16 sm:w-20 sm:h-20 mt-2 sm:mt-4 rounded-full bg-gray-700 flex items-center justify-center border-2 border-white'>
        <span className='text-lg font-bold text-white'>{getInitialAvatar(match.name)}</span>
      </div>
    );
  };

  // DEPRECATED: useEffect that fetches roommate matching based on roomId
  // useEffect(() => {
  //   if (!roomId) {
  //     setError('No room ID provided');
  //     setLoading(false);
  //     return;
  //   }
  //   const fetchMatches = async () => {
  //     try {
  //       console.log('Fetching matches for roomId:', roomId);
  //       const data = await getRoommateMatching(roomId);
  //       console.log('API Response data:', data);
  //       if (!Array.isArray(data)) {
  //         throw new Error('Invalid data format received from API');
  //       }
  //       const formattedMatches = data.map((item) => {
  //         const roommate = item?.roommate || {};
  //         const userCred = roommate?.userCred || {};
  //         const rawName = `${userCred.firstName || ''} ${userCred.lastName || ''}`.trim();
  //         const name = rawName.replace(/\s*null\s*$/i, '').trim() || 'Anonymous';
  //         let profileImage = item?.photoUrl || userCred?.profilePicUrl || undefined;
  //         if (profileImage && typeof profileImage === 'string' && !/^https?:\/\//i.test(profileImage)) {
  //           profileImage = `${URL}/${profileImage}`;
  //         }
  //         const lifestyles = roommate?.lifestyleAmenities?.lifestyles || roommate?.lifeStyle || [];
  //         const amenities = roommate?.lifestyleAmenities?.amenities || roommate?.amenities || [];
  //         const safeImage = (url) => typeof url === 'string' && /^https?:\/\//i.test(url) ? url : undefined;
  //         return {
  //           id: roommate.id,
  //           userId: userCred.id,
  //           name,
  //           profileImage: safeImage(profileImage),
  //           price: roommate.rentPerMonth ?? 'N/A',
  //           address: `${roommate.city || 'Unknown city'}, ${roommate.state || 'Unknown state'}`,
  //           matchPercentage: item.matchPercentage || 0,
  //           distance: 'Less than 5km away',
  //           verified: Boolean(userCred.active),
  //           genderPreference: roommate.genderPreference || roommate.lookingFor || 'No preference',
  //           roomType: roommate.roomType || 'Not specified',
  //           lifestyle: Array.isArray(lifestyles) ? lifestyles : [],
  //           amenities: Array.isArray(amenities) ? amenities : [],
  //           moveInDate: roommate.availableMoveInDate || 'Flexible',
  //           stayDuration: roommate.stayDuration || 'Not specified',
  //           occupation: roommate.occupation || 'Not specified',
  //           originalData: roommate,
  //         };
  //       });
  //       setMatches(formattedMatches);
  //       loadDemoProperties();
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //       setError(err.message);
  //       message.error(`Failed to load matching roommates: ${err.message}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   const loadDemoProperties = () => {
  //     setProperties([...]);
  //   };
  //   fetchMatches();
  // }, [roomId]);

  // NEW: Format matches data from preferencesData (common cards API)
  const matches = React.useMemo(() => {
    if (preferencesData) {
      console.log('Preferences Matched API Response:', preferencesData);

      // preferencesData now contains the full response { paginationMeta, data }
      const dataArray = preferencesData?.data || [];
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.log('No data array found or empty array');
        return [];
      }

      console.log('Mapping data array:', dataArray);

      return dataArray.map((item) => {
        // Use profileImage directly from API response
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
          price: item.rentPerMonth || item.budget || 0,
          address: `${item.city || ''}`,
          matchPercentage: item.matchPercentage || 0,
          distance: item.distance ? `${item.distance} km away` : 'Less than 5km away',
          verified: false,
          genderPreference: item.genderPreference || 'No preference',
          roomType: item.roomType || 'Not specified',
          originalData: item,
        };
      });
    }

    return [];
  }, [preferencesData]);

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
    if (isRoomNeedModalVisible) {
      body.classList.add('modal-blur');
    } else {
      body.classList.remove('modal-blur');
    }
  }, [isRoomNeedModalVisible]);

  // Load demo properties
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

  const handleBackClick = () => {
    router.navigate({ to: getUserDashboardRoute() });
  };

  // Get total count from pagination meta or matches length
  const totalMatches = preferencesData?.paginationMeta?.totalCount || matches.length;

  if (loading) {
    return <Loader />;
  }

  if (queryError) {
    // Check if it's the specific "room not found" or "room details not available" error (400/404)
    const errorMessage = queryError?.message?.toLowerCase() || '';
    const responseMessage = queryError?.response?.data?.message?.toLowerCase() || '';
    const isNoPreferenceError =
      queryError?.response?.status === 400 ||
      queryError?.response?.status === 404 ||
      errorMessage.includes('room not found') ||
      errorMessage.includes('room details not available') ||
      responseMessage.includes('room not found') ||
      responseMessage.includes('room details not available');

    if (isNoPreferenceError) {
      // Show custom UI for no preference data
      return (
        <div className='flex items-center justify-center min-h-screen text-white bg-dark'>
          <div className='text-center max-w-md px-6'>
            <p className='mb-6 text-2xl font-semibold text-gray-200'>No room preferences found</p>
            <p className='mb-8 text-base text-gray-400'>
              You haven't posted your roommate requirements yet. Create your first roommate listing
              to find compatible rooms.
            </p>
            <button
              onClick={handleCreateRoommateClick}
              className='w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-full font-medium transition-colors duration-200'
            >
              Create Roommate
            </button>
          </div>
        </div>
      );
    }

    // Show generic error for other errors
    return (
      <div className='flex justify-center items-center min-h-screen bg-dark text-white'>
        <div className='text-center'>
          <p className='text-lg text-red-500 mb-4'>
            Error: {queryError?.message || 'Failed to load data'}
          </p>
          <Button type='primary' onClick={handleBackClick}>
            Go Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // if (matches.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen bg-dark text-white">
  //       <div className="text-center">
  //         <p className="text-lg mb-4">No matching roommates found</p>
  //         <p className="text-sm text-gray-400 mb-6">
  //           Try adjusting your preferences for better results
  //         </p>
  //         <Button type="primary" onClick={handleBackClick}>
  //           Go Back to Search
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className='bg-dark text-white min-h-screen w-full font-sans p-0 max-w-7xl mx-auto'>
      {/* Header Section */}
      <div className='w-full bg-dark text-white py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
        <div className='flex items-center gap-4'>
          <Button
            onClick={handleBackClick}
            type='text'
            aria-label='Go back'
            className='md:hidden'
          >
            <BackButtonIcon />
          </Button>

          <div>
            <h1 className='text-xl sm:text-3xl font-bold leading-tight'>
              Preference Matched ({totalMatches})
            </h1>
            <p className='text-sm text-gray-400 mt-1'>for you room</p>
          </div>
        </div>
        <Button
          onClick={() => router.navigate({ to: '/app/roommate-housing-list' })}
          className='ant-btn-primary text-purple-500 text-sm font-medium mt-2 sm:mt-0 hover:underline cursor-pointer'
        >
          View all
        </Button>
      </div>

      {/* Matches Section */}
      {Array.isArray(matches) && matches.length > 0 ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {matches.map((match) => (
              <div
                key={match.id}
                className='bg-cardblack rounded-2xl p-2 relative shadow-lg cursor-pointer hover:shadow-purple-500/20 transition-shadow'
                onClick={() => navigateToProfile(match.id)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigateToProfile(match.id)}
              >
                <div className='flex gap-0'>
                  {/* Avatar Section */}
                  <div className='flex-shrink-0 pr-2 flex items-center justify-center'>
                    {renderAvatar(match)}
                  </div>

                  {/* Info Section */}
                  <div className='flex-1 flex flex-col justify-between overflow-hidden'>
                    <div>
                      {/* Name and Price Row */}
                      <div className='flex justify-between items-start flex-wrap gap-1'>
                        <div className='flex items-center'>
                          <h3 className='text-white font-medium text-lg break-words mb-0 flex items-center'>
                            {match.name}
                            {match.verified && <TickIcon className='inline ml-2' />}
                          </h3>
                        </div>

                        {/* Price */}
                        <div className='flex items-baseline'>
                          <span className='text-purple-500 text-base sm:text-lg font-bold'>
                            {typeof match.price === 'number' ? `₹${match.price}` : match.price}
                          </span>
                          {typeof match.price === 'number' && (
                            <span className='text-gray-400 text-xs sm:text-sm ml-1 mt-6'>/mon</span>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className='flex items-center gap-1 text-gray-300 mt-0 mb-0'>
                        <MapPin className='w-4 h-4 flex-shrink-0' />
                        <p className='text-xs sm:text-sm break-words leading-snug'>
                          {match.address}
                        </p>
                      </div>
                    </div>

                    {/* Match Info */}
                    <div className='mt-0'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <span className='text-white text-xs sm:text-sm flex items-center gap-1'>
                          <Percentage /> {match.matchPercentage}% Match
                        </span>
                        <span className='text-gray-300 text-xs sm:text-sm flex items-center gap-1'>
                          <ProfileIcon /> Looking for {match.genderPreference.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-0'>
                  <p className='text-green-400 text-xs sm:text-sm ml-1 sm:ml-4'>{match.distance}</p>

                  <div className='flex gap-2 ml-auto sm:ml-0'>
                    <button
                      className='ant-btn-primary'
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle call functionality
                        message.info('Call functionality not implemented yet');
                      }}
                      aria-label='Call'
                    >
                      <OutgoingCallIcon className='w-4 h-4 text-white' />
                    </button>
                    <Button
                      className='ant-btn-primary'
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle message functionality
                        message.info('Message functionality not implemented yet');
                      }}
                      aria-label='Message'
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
        <div className='flex flex-col items-center justify-center w-full p-8 mt-6 rounded-2xl bg-cardblack'>
          <NoDataIcon />
          <p className='text-base text-gray-300'>No matching roommates found</p>
        </div>
      )}

      {/* Properties Section */}
      <div className='mt-6 sm:mt-10'>
        <div className='flex items-center justify-between py-3 sm:py-6'>
          <h2 className='text-white text-xl sm:text-3xl font-bold leading-tight'>
            Find your next home
          </h2>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => router.navigate({ to: '/app/roommate-properties-list' })}
              className='text-sm font-medium text-purple-500 cursor-pointer hover:underline ant-btn-primary'
            >
              View all
            </Button>
          </div>
        </div>

        {Array.isArray(properties) && properties.length > 0 ? (
          <>
            {/* Properties Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-6'>
              {properties.map((property) => (
                <div
                  key={property.id}
                  className='relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] group'
                  role='button'
                  tabIndex={0}
                >
                  <img
                    src={property.imageUrl}
                    alt={property.name}
                    className='absolute w-full h-full object-cover object-center'
                    loading='lazy'
                  />

                  {property.recentlyPosted && (
                    <div className='absolute top-2 sm:top-3 left-2 sm:left-3 bg-black text-white font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs'>
                      Recently Posted
                    </div>
                  )}

                  <div className='absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-black bg-opacity-50 text-white p-3 sm:p-4 rounded-[16px] sm:rounded-[20px] backdrop-blur-sm group-hover:bg-opacity-70 transition-all'>
                    <div className='flex justify-between items-end gap-2'>
                      <div className='flex-1 min-w-0'>
                        <h2 className='text-sm sm:text-base md:text-lg font-semibold leading-tight truncate'>
                          {property.name}
                        </h2>
                        <p className='text-[11px] sm:text-xs md:text-sm text-gray-300 mt-0.5 sm:mt-1 truncate'>
                          {property.address}
                        </p>
                      </div>
                      <div className='flex-shrink-0 ml-1 sm:ml-2 text-right'>
                        <p className='text-base sm:text-lg md:text-xl font-bold text-white whitespace-nowrap'>
                          ₹{property.price}{' '}
                          <span className='text-xs sm:text-sm font-normal'>
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
          <div className='flex flex-col items-center justify-center w-full p-8 mt-6 rounded-2xl bg-cardblack'>
            <NoDataIcon />
            <p className='text-base text-gray-300'>No properties found</p>
          </div>
        )}
      </div>

      {/* Need Room with Roommate Modal */}
      <Modal
        open={isRoomNeedModalVisible}
        onCancel={() => setIsRoomNeedModalVisible(false)}
        footer={null}
        width='100%'
        style={{ maxWidth: 700 }}
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
        <RoomNeedPage noPadding />
      </Modal>
    </div>
  );
}

export default RoommateHousing;
