// RoomHousingList.jsx - Full list with pagination
import { Typography, Button, Spin, message, Pagination } from 'antd';
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import {
  MessageIcon,
  OutgoingCallIcon,
  Percentage,
  ProfileIcon,
  TickIcon,
} from '../NeedRoomCommon.svg';
import { NoDataIcon, BackButtonIcon } from '../../Common/SVG/svg.function';
import { useRouter } from '@tanstack/react-router';
import { usePreferencesMatched } from '@/hooks/stay/queries';
import { usePagination } from '@/hooks/usePagination';

const { Title } = Typography;

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

export default function RoomHousingList() {
  const router = useRouter();

  // Pagination
  const {
    currentPage,
    pageSize,
    paginationParams,
    handlePageChange,
  } = usePagination({
    initialPage: 1,
    initialPageSize: 12,
    zeroIndexed: true,
  });

  // Query: Preferences matched with pagination
  const {
    data: preferencesData,
    isLoading: loading,
    error: queryError,
  } = usePreferencesMatched({
    ...paginationParams,
    cardType: 'ROOM',
  });

  const navigateToProfile = (id) => {
    router.navigate({
      to: `/app/room-profile/${id}?cardType=ROOM`,
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

  // Format matches data
  const matches = React.useMemo(() => {
    if (preferencesData) {
      const dataArray = preferencesData?.data || [];
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return [];
      }

      return dataArray.map((item) => {
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
          roomType: item.roomType || 'Not specified',
          originalData: item,
        };
      });
    }
    return [];
  }, [preferencesData]);

  const totalMatches = preferencesData?.paginationMeta?.totalCount || 0;

  const handleBackClick = () => {
    router.navigate({ to: '/app/room-housing' });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen text-white bg-dark'>
        <Spin size='large' />
      </div>
    );
  }

  if (queryError) {
    return (
      <div className='flex items-center justify-center min-h-screen text-white bg-dark'>
        <div className='text-center'>
          <p className='mb-4 text-lg text-red-500'>
            Error: {queryError?.message || 'Failed to load data'}
          </p>
          <Button type='primary' onClick={handleBackClick}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen px-4 mx-auto font-sans text-white bg-dark sm:px-6 lg:px-8 max-w-7xl'>
      {/* Header Section */}
      <div className='flex flex-col items-start justify-between w-full py-4 text-white bg-dark sm:py-6 sm:flex-row sm:items-center'>
        <div className='flex items-center gap-4'>
          <button
            onClick={handleBackClick}
            className='flex items-center justify-center w-12 h-12 transition-colors rounded-full bg-cardblack hover:bg-gray-700 focus:outline-none'
            aria-label='Go back'
          >
            <BackButtonIcon />
          </button>
          <div>
            <h1 className='text-xl font-bold leading-tight sm:text-3xl'>
              All Roommate Matches ({totalMatches})
            </h1>
            <p className='mt-1 text-sm text-gray-400'>Find your perfect roommate</p>
          </div>
        </div>
      </div>

      {/* Matches Grid */}
      <div className='mt-6 mb-8'>
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
                          message.info('Call functionality coming soon');
                        }}
                      >
                        <OutgoingCallIcon className='w-4 h-4 text-white' />
                      </Button>
                      <Button
                        className='ant-btn-primary'
                        onClick={(e) => {
                          e.stopPropagation();
                          message.info('Message functionality coming soon');
                        }}
                      >
                        <MessageIcon className='w-4 h-4 text-white' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {preferencesData?.paginationMeta && totalMatches > pageSize && (
              <div className='flex justify-center mt-8 py-8'>
                <div className='bg-gray-900/50 border border-purple-600/20 rounded-lg px-6 py-4'>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalMatches}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showTotal={(total, range) => (
                      <span className='text-gray-300 mr-4'>
                        {range[0]}-{range[1]} of {total} rooms
                      </span>
                    )}
                    className='custom-pagination'
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className='flex flex-col items-center justify-center w-full p-8 mt-6 rounded-2xl bg-cardblack'>
            <NoDataIcon />
            <p className='text-base text-gray-300'>No matching rooms found</p>
          </div>
        )}
      </div>
    </div>
  );
}
