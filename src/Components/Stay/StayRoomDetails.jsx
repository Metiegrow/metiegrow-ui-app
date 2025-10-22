import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from '@tanstack/react-router';
import { Button, Spin, message, Tag, Divider } from 'antd';
import { ArrowLeft, MapPin, DollarSign, Calendar, Users, CheckCircle } from 'lucide-react';
import { getAuthHeaders } from '../Auth/Auth.Function';
import { getNeedRoomDetails } from './Common/StayFormHandler';
import {
  FitnessBreakIcon,
  FurnitureIcon,
  GamingIcon,
  KitchenIcon,
  LaundryIcon,
  NightOwlIcon,
  NonDrinkerIcon,
  NonSmokerIcon,
  ParkingIcon,
  StudiousIcon,
  VegFoodIcon,
  WifiIcon,
} from './NeedRoomCommon.svg';

const URL = import.meta.env.VITE_API_BASE_URL;

const LIFESTYLE_ICONS = {
  VEG_FOOD: <VegFoodIcon />,
  NIGHT_OWL: <NightOwlIcon />,
  STUDIOUS: <StudiousIcon />,
  FITNESS_FREAK: <FitnessBreakIcon />,
  NON_SMOKER: <NonSmokerIcon />,
  NON_DRINKER: <NonDrinkerIcon />,
  GAMING: <GamingIcon />,
};

const AMENITIES_ICONS = {
  KITCHEN: <KitchenIcon />,
  PARKING: <ParkingIcon />,
  WIFI: <WifiIcon />,
  FURNITURE: <FurnitureIcon />,
  LAUNDRY: <LaundryIcon />,
};

const ROOM_TYPE_LABELS = {
  SINGLE_ROOM: 'Single Room',
  SHARED_ROOM: 'Shared Room',
  ENTIRE_APARTMENT: 'Entire Apartment',
};

const OCCUPATION_LABELS = {
  STUDENT: 'Student',
  WORKING: 'Working Professional',
};

function StayRoomDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatLocationPart = (part) => {
    if (!part) return '';
    if (typeof part === 'string' || typeof part === 'number') return String(part);
    if (typeof part === 'object') {
      // Handle API response objects with different key formats
      return (
        part.value ||
        part.label ||
        part.name ||
        part.countryName ||
        part.cityName ||
        part.stateName ||
        part.countryname ||
        part.cityname ||
        part.statename ||
        part.text ||
        part.displayName ||
        part.display_name ||
        ''
      );
    }
    return '';
  };

  // Function to normalize API response data
  const normalizeRoomData = (data) => {
    if (!data) return data;

    const normalized = { ...data };

    // Normalize location fields
    if (normalized.country && typeof normalized.country === 'object') {
      normalized.country = formatLocationPart(normalized.country);
    }
    if (normalized.state && typeof normalized.state === 'object') {
      normalized.state = formatLocationPart(normalized.state);
    }
    if (normalized.city && typeof normalized.city === 'object') {
      normalized.city = formatLocationPart(normalized.city);
    }

    // Normalize other object fields that might be objects
    if (normalized.genderPreference && typeof normalized.genderPreference === 'object') {
      normalized.genderPreference = formatLocationPart(normalized.genderPreference);
    }
    if (normalized.occupation && typeof normalized.occupation === 'object') {
      normalized.occupation = formatLocationPart(normalized.occupation);
    }
    if (normalized.roomType && typeof normalized.roomType === 'object') {
      normalized.roomType = formatLocationPart(normalized.roomType);
    }
    if (normalized.durationOfStay && typeof normalized.durationOfStay === 'object') {
      normalized.durationOfStay = formatLocationPart(normalized.durationOfStay);
    }
    if (normalized.nationalityPreference && typeof normalized.nationalityPreference === 'object') {
      normalized.nationalityPreference = formatLocationPart(normalized.nationalityPreference);
    }

    return normalized;
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const data = await getNeedRoomDetails(id);
        // Normalize the API response data to handle object fields properly
        const normalizedData = normalizeRoomData(data);
        setRoomDetails(normalizedData);
      } catch (err) {
        console.error('Error fetching room details:', err);
        setError(err.message);
        message.error('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomDetails();
    }
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
    } else {
      // Fallback to navigate to a default route if no history
      router.navigate({ to: '/app/roommate-housing' });
    }
  };

  const handleContact = () => {
    message.info('Contact functionality will be implemented soon');
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-dark flex items-center justify-center'>
        <Spin size='large' />
      </div>
    );
  }

  if (error || !roomDetails) {
    return (
      <div className='min-h-screen bg-dark flex items-center justify-center'>
        <div className='text-center text-white'>
          <h2 className='text-xl font-semibold mb-4'>Failed to load room details</h2>
          <p className='text-gray-400 mb-4'>{error || 'Room not found'}</p>
          <Button onClick={handleBack} type='primary'>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-dark text-white'>
      {/* Header */}
      <div className='bg-cardblack border-b border-gray-700'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <div className='flex items-center gap-4'>
            <Button
              type='text'
              icon={<ArrowLeft className='w-5 h-5' />}
              onClick={handleBack}
              className='text-white hover:text-gray-300'
            />
            <div>
              <h1 className='text-2xl font-bold'>Room Details</h1>
              <p className='text-gray-400'>Stay Room Information</p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Basic Information */}
            <div className='bg-cardblack rounded-2xl p-6'>
              <h2 className='text-xl font-semibold mb-4'>Basic Information</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-3'>
                  <MapPin className='w-5 h-5 text-purple-400' />
                  <div>
                    <p className='text-gray-400 text-sm'>Location</p>
                    <p className='font-medium'>
                      {[
                        formatLocationPart(roomDetails.city),
                        formatLocationPart(roomDetails.state),
                        formatLocationPart(roomDetails.country),
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <DollarSign className='w-5 h-5 text-green-400' />
                  <div>
                    <p className='text-gray-400 text-sm'>Budget</p>
                    <p className='font-medium'>₹{roomDetails.budget}/month</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Calendar className='w-5 h-5 text-blue-400' />
                  <div>
                    <p className='text-gray-400 text-sm'>Move-in Date</p>
                    <p className='font-medium'>
                      {new Date(roomDetails.preferredMoveInDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Users className='w-5 h-5 text-orange-400' />
                  <div>
                    <p className='text-gray-400 text-sm'>Room Type</p>
                    <p className='font-medium'>
                      {ROOM_TYPE_LABELS[roomDetails.roomType] ||
                        formatLocationPart(roomDetails.roomType)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className='bg-cardblack rounded-2xl p-6'>
              <h2 className='text-xl font-semibold mb-4'>Preferences</h2>
              <div className='space-y-4'>
                <div>
                  <p className='text-gray-400 text-sm mb-2'>Gender Preference</p>
                  <Tag color='purple' className='text-sm px-3 py-1'>
                    {formatLocationPart(roomDetails.genderPreference)}
                  </Tag>
                </div>

                <div>
                  <p className='text-gray-400 text-sm mb-2'>Occupation</p>
                  <Tag color='blue' className='text-sm px-3 py-1'>
                    {OCCUPATION_LABELS[roomDetails.occupation] ||
                      formatLocationPart(roomDetails.occupation)}
                  </Tag>
                </div>

                <div>
                  <p className='text-gray-400 text-sm mb-2'>Duration of Stay</p>
                  <p className='font-medium'>{formatLocationPart(roomDetails.durationOfStay)}</p>
                </div>

                {roomDetails.nationalityPreference && (
                  <div>
                    <p className='text-gray-400 text-sm mb-2'>Nationality Preference</p>
                    <p className='font-medium'>
                      {formatLocationPart(roomDetails.nationalityPreference)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {roomDetails.description && (
              <div className='bg-cardblack rounded-2xl p-6'>
                <h2 className='text-xl font-semibold mb-4'>Description</h2>
                <p className='text-gray-300 leading-relaxed'>{roomDetails.description}</p>
              </div>
            )}

            {/* Lifestyle */}
            {roomDetails.lifeStyle && roomDetails.lifeStyle.length > 0 && (
              <div className='bg-cardblack rounded-2xl p-6'>
                <h2 className='text-xl font-semibold mb-4'>Lifestyle</h2>
                <div className='flex flex-wrap gap-3'>
                  {roomDetails.lifeStyle.map((lifestyle) => (
                    <div
                      key={lifestyle}
                      className='flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-full'
                    >
                      <span className='text-lg'>{LIFESTYLE_ICONS[lifestyle]}</span>
                      <span className='text-sm'>{lifestyle.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {roomDetails.amenities && roomDetails.amenities.length > 0 && (
              <div className='bg-cardblack rounded-2xl p-6'>
                <h2 className='text-xl font-semibold mb-4'>Amenities</h2>
                <div className='flex flex-wrap gap-3'>
                  {roomDetails.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className='flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-full'
                    >
                      <span className='text-lg'>{AMENITIES_ICONS[amenity]}</span>
                      <span className='text-sm'>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Contact Card */}
            <div className='bg-cardblack rounded-2xl p-6'>
              <h3 className='text-lg font-semibold mb-4'>Contact Information</h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='w-4 h-4 text-green-400' />
                  <span className='text-sm text-gray-300'>Verified Profile</span>
                </div>
                <Button
                  type='primary'
                  size='large'
                  className='w-full bg-purple-600 hover:bg-purple-700'
                  onClick={handleContact}
                >
                  Contact Owner
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className='bg-cardblack rounded-2xl p-6'>
              <h3 className='text-lg font-semibold mb-4'>Additional Information</h3>
              <div className='space-y-3'>
                {roomDetails.universityCourseMatch && (
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-400' />
                    <span className='text-sm text-gray-300'>University Course Match</span>
                  </div>
                )}
                <p className='text-sm text-gray-400'>
                  This room is looking for a compatible roommate based on your preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StayRoomDetails;
