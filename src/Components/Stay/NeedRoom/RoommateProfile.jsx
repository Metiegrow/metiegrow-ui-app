import React, { useState, useMemo } from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { BackButtonIcon, SaveIcon, ShareButtonIcon } from '../../Common/SVG/svg.function';
import {
  FitnessBreakIcon,
  FurnitureIcon,
  GamingIcon,
  KitchenIcon,
  LaundryIcon,
  MaleIcon,
  MessageIcon,
  NightOwlIcon,
  NonDrinkerIcon,
  NonSmokerIcon,
  OccupancyIcon,
  OutgoingCallIcon,
  ParkingIcon,
  StudiousIcon,
  TickIcon,
  VegFoodIcon,
  WifiIcon,
} from '../NeedRoomCommon.svg';
import MapPhoto from '../../../assets/MapPhoto.png';
import { useRouter, useParams, useSearch } from '@tanstack/react-router';
import { useStayCard } from '@/hooks/stay/queries';
import ImageGridDisplay from '../../Common/ImageGallery/ImageGridDisplay';

const URL = import.meta.env.VITE_API_BASE_URL;

export default function RoommateProfile() {
  const router = useRouter();
  const { roommateId } = useParams({ from: '/app/roommate/$roommateId' });

  // Get cardType from query parameter using useSearch hook
  const search = useSearch({ from: '/app/roommate/$roommateId' });
  const cardType = search?.cardType || 'ROOMMATE';

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log('Roommate ID from params:', roommateId, 'Card Type:', cardType);

  // Fetch profile data using useStayCard hook
  const { data: profileData, isLoading: loading, error } = useStayCard(cardType, roommateId);

  console.log('Profile Data:', profileData);
  console.log('Loading:', loading);
  console.log('Error:', error);

  // DEPRECATED: Old manual fetching with useEffect
  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       setLoading(true);
  //       // First try to get from session storage
  //       const storedRoommate = sessionStorage.getItem('selectedRoommate');
  //       let roommateData;

  //       if (storedRoommate) {
  //         roommateData = JSON.parse(storedRoommate);
  //       } else {
  //         // If not in session storage, fetch via helper
  //         roommateData = await getRoommateDetails(roommateId);
  //       }

  //       if (!roommateData) {
  //         throw new Error('No roommate data available');
  //       }

  //       // Normalize shapes from two sources:
  //       // 1) Session object from matches (flattened, with originalData and possibly imageUrls)
  //       // 2) Direct API /roommate/{id} (roomImages, simple fields)
  //       const original = roommateData.originalData || roommateData;
  //       // ... rest of transformation logic
  //     } catch (error) {
  //       console.error('Error loading profile:', error);
  //       setError(error.message);
  //       message.error('Failed to load roommate profile');
  //       setProfile(getDefaultProfile());
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfileData();
  // }, [roommateId]);

  // Map amenities from string array to objects with icons
  const parseAmenities = (amenities) => {
    const amenityMap = {
      KITCHEN: { value: 'KITCHEN', icon: <KitchenIcon />, label: 'Kitchen' },
      PARKING: { value: 'PARKING', icon: <ParkingIcon />, label: 'Parking' },
      WIFI: { value: 'WIFI', icon: <WifiIcon />, label: 'Wifi' },
      FURNITURE: { value: 'FURNITURE', icon: <FurnitureIcon />, label: 'Furniture' },
      LAUNDRY: { value: 'LAUNDRY', icon: <LaundryIcon />, label: 'Laundry' },
    };

    return amenities
      .map((item) => {
        const upperItem = item.toUpperCase();
        return amenityMap[upperItem] || { value: upperItem, icon: <KitchenIcon />, label: item };
      })
      .slice(0, 5); // Limit to first 5 amenities
  };

  // Map lifestyle from string array to objects with icons
  const parseLifestyle = (lifestyle) => {
    const lifestyleMap = {
      VEG_FOOD: { value: 'VEG_FOOD', icon: <VegFoodIcon />, label: 'Veg food' },
      NIGHT_OWL: { value: 'NIGHT_OWL', icon: <NightOwlIcon />, label: 'Night Owl' },
      STUDIOUS: { value: 'STUDIOUS', icon: <StudiousIcon />, label: 'Studious' },
      FITNESS_FREAK: { value: 'FITNESS_FREAK', icon: <FitnessBreakIcon />, label: 'Fitness Freak' },
      NON_SMOKER: { value: 'NON_SMOKER', icon: <NonSmokerIcon />, label: 'Non Smoker' },
      NON_DRINKER: { value: 'NON_DRINKER', icon: <NonDrinkerIcon />, label: 'Non Drinker' },
      GAMING: { value: 'GAMING', icon: <GamingIcon />, label: 'Gaming' },
    };

    return lifestyle.map((item) => {
      const upperItem = item.toUpperCase().replace(/\s+/g, '_');
      return lifestyleMap[upperItem] || { value: upperItem, icon: <StudiousIcon />, label: item };
    });
  };

  // Transform profileData using useMemo
  const profile = useMemo(() => {
    if (!profileData) {
      console.log('No profileData, returning null');
      return null;
    }

    console.log('Transforming profileData:', profileData);
    // Check if API response has nested data structure
    const original = profileData?.data || profileData;

    // Name
    let name = original.name;
    if (!name) {
      const uc = original.userCred || {};
      const raw = `${uc.firstName || ''} ${uc.lastName || ''}`.trim();
      name = raw.replace(/\s*null\s*$/i, '').trim() || 'Anonymous';
    }

    // Address
    const address =
      original.address ||
      `${original.city || ''}${original.city ? ', ' : ''}${original.state || ''}` ||
      'Unknown location';

    // Price
    const price = original.rentPerMonth ?? original.budget ?? 'N/A';

    // Gender / Looking for
    const gender = original.gender || 'Not specified';
    const lookingFor = original.lookingFor || original.genderPreference || 'Not specified';

    // Images (prefer uploaded arrays)
    const images = original.roomImages || original.imageUrls || [];

    // Profile image
    let profileImage =
      original.profileImage ||
      (original.userCred && original.userCred.profilePicUrl) ||
      (Array.isArray(images) && images[0]);
    if (profileImage && typeof profileImage === 'string' && !/^https?:\/\//i.test(profileImage)) {
      profileImage = `${URL}/${profileImage}`;
    }

    // Amenities / Lifestyle
    const lifestyleAmenities = original.lifestyleAmenities || {};
    const amenitiesRaw = original.amenities || lifestyleAmenities.amenities || [];
    const lifestyleRaw =
      original.lifestyle || original.lifeStyle || lifestyleAmenities.lifestyles || [];

    // Format occupancy/livingSpace - replace underscores with spaces and capitalize properly
    const formatOccupancy = (value) => {
      if (!value) return 'Single';
      return value
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return {
      name,
      isPremium: Boolean(original.isPremium),
      price,
      address,
      matchPercentage: original.matchPercentage || 0,
      gender,
      lookingFor,
      occupancy: formatOccupancy(original.occupancy || original.livingSpace),
      distance: original.distance ? parseInt(original.distance) : 3.5,
      amenities: parseAmenities(Array.isArray(amenitiesRaw) ? amenitiesRaw : []),
      lifestyle: parseLifestyle(Array.isArray(lifestyleRaw) ? lifestyleRaw : []),
      description:
        original.description ||
        "No description provided. This roommate hasn't added any additional information about themselves or their preferences.",
      role: original.occupation || 'Not specified',
      age: original.age || 25,
      phone: original.phoneNumber || '+61 999 999 999',
      images:
        Array.isArray(images) && images.length > 0
          ? images
          : [
              'https://img.freepik.com/free-photo/3d-rendering-luxury-modern-living-room-with-leather-sofa-lamp_105762-2255.jpg',
              'https://img.freepik.com/free-photo/3d-room-interior-with-classic-design-furniture_23-2150895588.jpg',
              'https://img.freepik.com/free-photo/3d-room-interior-with-classic-design-furniture_23-2150895586.jpg',
              'https://img.freepik.com/free-photo/3d-room-interior-with-classic-design-furniture_23-2150895586.jpg',
            ],
      profileImage:
        profileImage ||
        'https://img.freepik.com/premium-photo/young-indian-banker-agronomist-uniform-giving-expression_54391-5368.jpg',
    };
  }, [profileData]);

  console.log('Final profile object:', profile);

  // Default profile data when no data is available
  // DEPRECATED: Default profile fallback (no longer needed with useStayCard)
  // const getDefaultProfile = () => ({ ... });

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBackClick = () => {
    router.navigate({ to: '/app/roommate-housing' });
  };

  if (loading || !profile) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-dark text-white'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen bg-dark text-white'>
        <div className='text-center'>
          <p className='text-red-500 mb-2 text-xl'>Error loading profile</p>
          <p className='text-gray-400'>{error?.message || 'Failed to load roommate profile'}</p>
          <button
            onClick={() => router.navigate({ to: '/app/roommate-housing' })}
            className='mt-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700'
          >
            Go Back
          </button>
        </div>
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
      <div className='md:bg-[#131313] text-white min-h-screen w-full'>
        {/* Mobile View (below 768px) */}
        <div className='block md:hidden'>
          {/* Image Carousel */}
          <div className='relative w-full h-64 p-4'>
            <img
              src={profile.images[currentImageIndex]}
              alt={`Room view ${currentImageIndex + 1}`}
              className='w-full h-full object-cover rounded-[24px]'
            />
          </div>
          <div className='absolute bottom-18 left-0 right-0 flex justify-center gap-1'>
            {profile.images.map((_, index) => (
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
                <h2 className='text-lg font-semibold'>{profile.name}</h2>
                <TickIcon />
              </div>
              <div className='flex items-center text-xs text-gray-400'>
                <MapPin size={12} className='mr-1' />
                <span>{profile.address}</span>
              </div>
            </div>
            <div className='text-right'>
              <span className='text-purple-500 font-bold'>
                {typeof profile.price === 'number' ? `$${profile.price}` : profile.price}
              </span>
              <span className='text-xs text-gray-400 block'>pm</span>
            </div>
          </div>

          {/* Basic Info Section */}
          <div className='px-4 pt-2'>
            <h3 className='text-sm font-semibold mb-3'>Basic Info</h3>
            <div className='flex justify-between gap-2'>
              <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
                <div className='mb-1'>
                  <MaleIcon />
                </div>
                <span className='text-xs font-medium'>{profile.gender}</span>
                <span className='text-xs text-gray-500'>Gender</span>
              </div>
              <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
                <div className='mb-1'>
                  <OccupancyIcon />
                </div>
                <span className='text-xs font-medium'>{profile.occupancy}</span>
                <span className='text-xs text-gray-500'>Occupancy</span>
              </div>
              <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
                <div className='mb-1'>
                  <MaleIcon />
                </div>
                <span className='text-xs font-medium'>{profile.lookingFor}</span>
                <span className='text-xs text-gray-500'>Looking for</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className='px-4 pt-4'>
            <h3 className='text-sm font-semibold mb-2'>Description</h3>
            <p className='text-xs text-gray-300'>
              {isDescriptionExpanded
                ? profile.description
                : `${profile.description.substring(0, 100)}...`}
              <a
                className='text-[#F37766] ml-1 cursor-pointer'
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? 'read less' : 'read more'}
              </a>
            </p>
          </div>

          {/* Rest of mobile view sections same as before... */}
          {/* Amenities Section */}
          <div className='px-4 pt-4'>
            <h3 className='text-sm font-semibold mb-3'>Amenities</h3>
            <div className='flex justify-start'>
              {profile.amenities.map((amenity, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <div className='bg-cardblack rounded-full p-3 mb-1 w-12 h-12 flex items-center justify-center'>
                    {amenity.icon}
                  </div>
                  <span className='text-xs'>{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle Section */}
          <div className='px-4 pt-4 pb-20'>
            <h3 className='text-sm font-semibold mb-3'>Life style</h3>
            <div className='flex flex-wrap justify-start gap-4'>
              {profile.lifestyle.map((item, index) => (
                <div key={index} className='flex flex-col items-center w-16'>
                  <div className='bg-cardblack rounded-full p-3 mb-1 w-12 h-12 flex items-center justify-center'>
                    {item.icon}
                  </div>
                  <span className='text-xs text-center'>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className='block sm:hidden fixed bottom-0 left-0 right-0 bg-gray-900 p-3 flex justify-between items-center'>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-full mr-2 overflow-hidden'>
                <img
                  src={profile.profileImage}
                  className='w-full h-full object-cover'
                  alt={`${profile.name}'s profile`}
                />
              </div>
              <div>
                <div className='text-sm font-medium flex items-center gap-1'>
                  {profile.name}
                  <TickIcon size={16} />
                </div>
                <div className='text-xs text-gray-400'>
                  {profile.role} {profile.age}M
                </div>
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

        {/* Desktop View */}
        <div className='hidden md:block container mx-auto p-8 pb-12'>
          {/* Image Grid Section - Smart Grid Display */}
          <ImageGridDisplay images={profile.images} />

          <div className='flex flex-col lg:flex-row gap-12'>
            {/* Left Section - 5/8 width */}
            <div className='lg:w-[662px] w-full'>
              {/* Profile Header with Name and Price */}
              <div className='flex justify-between items-center mb-2'>
                <div className='flex items-center gap-2'>
                  <h2 className='text-2xl font-semibold'>{profile.name}</h2>
                  <TickIcon />
                </div>
                <div className='text-right'>
                  <span className='text-purple-500 text-2xl font-bold'>
                    {typeof profile.price === 'number' ? `₹${profile.price}` : profile.price}
                  </span>
                  <span className='text-xs text-gray-400 block'>pm</span>
                </div>
              </div>

              {/* Location */}
              <div className='flex items-center text-sm text-gray-400 mb-6'>
                <MapPin size={16} className='mr-1' />
                <span>{profile.address}</span>
              </div>

              {/* Description Section */}
              <div className='mb-8'>
                <h3 className='text-lg font-medium mb-2'>Description</h3>
                <p className='text-sm text-gray-300'>
                  {isDescriptionExpanded
                    ? profile.description
                    : `${profile.description.substring(0, 120)}...`}
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
                  {profile.amenities.map((amenity, index) => (
                    <div key={index} className='flex flex-col items-center'>
                      <div className='bg-cardblack rounded-full p-4 mb-2 w-14 h-14 flex items-center justify-center'>
                        {amenity.icon}
                      </div>
                      <span className='text-xs text-center'>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Section */}
              <div className='mb-8'>
                <h3 className='text-lg font-medium mb-4'>Life style</h3>
                <div className='grid grid-cols-3 sm:grid-cols-5 gap-4'>
                  {profile.lifestyle.map((item, index) => (
                    <div key={index} className='flex flex-col items-center'>
                      <div className='bg-cardblack rounded-full p-4 mb-2 w-14 h-14 flex items-center justify-center'>
                        {item.icon}
                      </div>
                      <span className='text-xs text-center'>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - 3/8 width */}
            <div className='lg:w-[437px] w-full mb-8'>
              {/* Basic Info Section */}
              <h3 className='text-sm font-semibold mb-3'>Basic Info</h3>
              <div className='flex justify-between gap-2 mb-6'>
                <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
                  <div className='mb-1'>
                    <MaleIcon />
                  </div>
                  <span className='text-xs font-medium'>{profile.gender}</span>
                  <span className='text-xs text-gray-500'>Gender</span>
                </div>
                <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
                  <div className='mb-1'>
                    <OccupancyIcon />
                  </div>
                  <span className='text-xs font-medium'>{profile.occupancy}</span>
                  <span className='text-xs text-gray-500'>Occupancy</span>
                </div>
                <div className='bg-cardblack rounded-lg p-3 flex-1 flex flex-col items-center'>
                  <div className='mb-1'>
                    <MaleIcon />
                  </div>
                  <span className='text-xs font-medium'>{profile.lookingFor}</span>
                  <span className='text-xs text-gray-500'>Looking for</span>
                </div>
              </div>

              {/* Map Section */}
              <div className='bg-cardblack rounded-xl overflow-hidden mb-3'>
                <img src={MapPhoto} alt='Map location' className='w-full h-auto' />
              </div>

              {/* Contact Info */}
              <div className='rounded-xl p-6'>
                <h3 className='text-lg font-medium mb-4'>Contact Info</h3>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <OutgoingCallIcon size={18} className='pr-6' />
                    <span className='text-sm'>{profile.phone}</span>
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
}
