import { Button, DatePicker, Input, InputNumber, Select, Switch, Upload, message } from 'antd';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { DollarSign, Camera } from 'lucide-react';
import { ArrowRightIcon, BackButtonIcon } from '../../Common/SVG/svg.function';
import { LoadingOutlined } from '@ant-design/icons';
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
} from '../NeedRoomCommon.svg';
import { useRouter } from '@tanstack/react-router';
import { getAuthHeaders } from '../../Auth/Auth.Function';
import { useStayFormNavigation, useStayFormQueries, postFormData } from '../Common/StayFormHandler';
import TypedInputNumber from 'antd/es/input-number';
import { NumberInput } from '../../Common/Inputs/NumberInput';

const DEFAULT_GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
];

// Constants
const ROOM_TYPES = [
  { value: 'SINGLE_ROOM', label: 'Single' },
  { value: 'SHARED_ROOM', label: 'Shared' },
  { value: 'ENTIRE_APARTMENT', label: 'Entire Apartment' },
];

const OCCUPATION_TYPES = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'WORKING', label: 'Working' },
];

const LIFESTYLE_OPTIONS = [
  { value: 'VEG_FOOD', icon: <VegFoodIcon />, label: 'Veg food' },
  { value: 'NIGHT_OWL', icon: <NightOwlIcon />, label: 'Night Owl' },
  { value: 'STUDIOUS', icon: <StudiousIcon />, label: 'Studious' },
  { value: 'FITNESS_FREAK', icon: <FitnessBreakIcon />, label: 'Fitness Freak' },
  { value: 'NON_SMOKER', icon: <NonSmokerIcon />, label: 'Non Smoker' },
  { value: 'NON_DRINKER', icon: <NonDrinkerIcon />, label: 'Non Drinker' },
  { value: 'GAMING', icon: <GamingIcon />, label: 'Gaming' },
];

const AMENITIES_OPTIONS = [
  { value: 'KITCHEN', icon: <KitchenIcon />, label: 'Kitchen' },
  { value: 'PARKING', icon: <ParkingIcon />, label: 'Parking' },
  { value: 'WIFI', icon: <WifiIcon />, label: 'Wifi' },
  { value: 'FURNITURE', icon: <FurnitureIcon />, label: 'Furniture' },
  { value: 'LAUNDRY', icon: <LaundryIcon />, label: 'Laundry' },
];

const URL = import.meta.env.VITE_API_BASE_URL;

async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${URL}/api/google/${endpoint}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || errorData?.error || 'Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

const CustomImageUploader = ({ images, handleImageChange }) => {
  return (
    <Upload
      multiple
      accept='image/*'
      beforeUpload={(file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
          message.error('You can only upload image files!');
          return Upload.LIST_IGNORE;
        }

        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          message.error('Image must be smaller than 5MB!');
          return Upload.LIST_IGNORE;
        }

        return false;
      }}
      onChange={handleImageChange}
      fileList={images}
      listType='picture-card'
      maxCount={5}
      showUploadList={{ showPreviewIcon: false }}
      className='custom-upload'
    >
      {images.length >= 5 ? null : (
        <div className='flex flex-col items-center'>
          <div className='flex items-center '>
            <Camera className='text-cyan-400 text-xl' />
          </div>
          <span className='text-white text-sm mt-2'>Capture Picture</span>
          <span className='text-gray-400 text-sm'>Min 3 images</span>
        </div>
      )}
    </Upload>
  );
};

// /app/roommate-housing?roomId=3
function NeedRoommateForm() {
  const router = useRouter();
  // Form state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [budget, setBudget] = useState(0);
  const [preferredMoveInDate, setPreferredMoveInDate] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [genderPreference, setGenderPreference] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [nationalityPreference, setNationalityPreference] = useState(null);
  const [lifeStyle, setLifeStyle] = useState([]);
  const [durationOfStay, setDurationOfStay] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);

  // Use common queries from StayFormHandler
  const {
    countries,
    loadingCountries,
    states,
    loadingStates,
    cities,
    loadingCities,
    universities,
    loadingUniversities,
    nationalityOptions,
    loadingNationalities,
    genderOptions,
    loadingGenders,
  } = useStayFormQueries(selectedCountry, selectedState);

  // Use common navigation
  const { navigateToRoommateHousing, navigateToNeedRoom, navigateToRoomHousing } =
    useStayFormNavigation();

  // Form submission mutation
  const { mutate: submitForm } = useMutation({
    mutationFn: (formData) => postFormData('roominterest', formData, images),
    onSuccess: (data) => {
      message.success(data?.message || 'Room interest created successfully!');
      // navigateToRoommateHousing(data.roomId || data.id);
      navigateToRoomHousing(data.roomId || data.id);
    },
    onError: (error) => {
      message.error(error.message || 'Failed to create room interest. Please try again.');
      setIsSubmitting(false);
    },
  });

  // Handlers
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedState(null);
    setSelectedCity(null);
    setFormErrors((prev) => ({ ...prev, country: null }));
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedCity(null);
    setFormErrors((prev) => ({ ...prev, state: null }));
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setFormErrors((prev) => ({ ...prev, city: null }));
  };

  const handleBudgetChange = (value) => {
    setBudget(value);
    setFormErrors((prev) => ({ ...prev, budget: null }));
  };

  const handleMoveInDateChange = (date) => {
    setPreferredMoveInDate(date);
    setFormErrors((prev) => ({ ...prev, preferredMoveInDate: null }));
  };

  const handleDurationChange = (value) => {
    setDurationOfStay(value);
    setFormErrors((prev) => ({ ...prev, durationOfStay: null }));
  };

  const handleImageChange = ({ fileList }) => {
    setImages(fileList);
  };

  const toggleLifeStyle = (value) => {
    setLifeStyle((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const toggleAmenity = (value) => {
    setAmenities((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!selectedCountry) {
      errors.country = 'Country is required';
      isValid = false;
    }
    if (!selectedState) {
      errors.state = 'State is required';
      isValid = false;
    }
    if (!selectedCity) {
      errors.city = 'City is required';
      isValid = false;
    }
    if (!budget || budget <= 0) {
      errors.budget = 'Budget must be greater than 0';
      isValid = false;
    }
    if (!preferredMoveInDate) {
      errors.preferredMoveInDate = 'Move-in date is required';
      isValid = false;
    }
    if (!roomType) {
      errors.roomType = 'Room type is required';
      isValid = false;
    }
    if (!genderPreference) {
      errors.genderPreference = 'Gender preference is required';
      isValid = false;
    }
    if (!occupation) {
      errors.occupation = 'Occupation is required';
      isValid = false;
    }
    if (!nationalityPreference) {
      errors.nationalityPreference = 'Nationality preference is required';
      isValid = false;
    }
    if (!durationOfStay) {
      errors.durationOfStay = 'Duration of stay is required';
      isValid = false;
    }
    if (images.length < 3) {
      errors.images = 'Please upload at least 3 images';
      isValid = false;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formData = {
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        budget: budget,
        preferredMoveInDate: preferredMoveInDate ? preferredMoveInDate.format('YYYY-MM-DD') : null,
        roomType: roomType,
        genderPreference: genderPreference,
        occupation: occupation,
        nationalityPreference: nationalityPreference,
        lifeStyle: lifeStyle,
        durationOfStay: durationOfStay,
        amenities: amenities,
        description: description.trim(),
      };

      submitForm(formData);
    } catch (error) {
      console.error('Submission error:', error);
      message.error(error.message || 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className='text-white bg-dark p-8 -mt-20'>
      <div className=''>
        <div className='flex items-center gap-4 mb-6'>
          <div
            role='button'
            className='lg:hidden cursor-pointer inline-flex items-center'
            onClick={() => navigateToNeedRoom()}
          >
            <BackButtonIcon />
          </div>

          <div>
            <h1 className='text-2xl font-bold'>Need a Roommate</h1>
            <p className='text-gray-400'>For your room</p>
          </div>
        </div>

        <div className='max-h-[calc(100vh-180px)] overflow-y-auto pr-2'>
          <form onSubmit={handleSubmit} className='space-y-6 pb-4'>
            {/* Country Selection */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Country <span className='text-red-500'>*</span>
              </label>
              <Select
                className='w-full h-14'
                placeholder='Select Country'
                loading={loadingCountries}
                onChange={handleCountryChange}
                value={selectedCountry}
                status={formErrors.country ? 'error' : ''}
                showSearch
                optionFilterProp='label'
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={countries?.map((country) => {
                  const val =
                    typeof country === 'object'
                      ? country.value ||
                        country.name ||
                        country.countryName ||
                        country.countryname ||
                        country
                      : country;
                  const lab =
                    typeof country === 'object'
                      ? country.label ||
                        country.name ||
                        country.countryName ||
                        country.countryname ||
                        country
                      : country;
                  return {
                    value: String(val),
                    label: String(lab),
                  };
                })}
              />
              {formErrors.country && (
                <div className='text-red-500 text-xs'>{formErrors.country}</div>
              )}
            </div>

            {/* State & City Selection */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>
                  State <span className='text-red-500'>*</span>
                </label>
                <Select
                  className='w-full rounded-full h-14 bg-gray-800'
                  placeholder='Select State'
                  loading={loadingStates}
                  disabled={!selectedCountry}
                  onChange={handleStateChange}
                  value={selectedState}
                  status={formErrors.state ? 'error' : ''}
                  showSearch
                  optionFilterProp='label'
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={states?.map((state) => {
                    const val =
                      typeof state === 'object'
                        ? state.value || state.name || state.stateName || state.statename || state
                        : state;
                    const lab =
                      typeof state === 'object'
                        ? state.label || state.name || state.stateName || state.statename || state
                        : state;
                    return {
                      value: String(val),
                      label: String(lab),
                    };
                  })}
                />
                {formErrors.state && <div className='text-red-500 text-xs'>{formErrors.state}</div>}
              </div>
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>
                  City <span className='text-red-500'>*</span>
                </label>
                <Select
                  className='w-full h-14'
                  placeholder='Select City'
                  loading={loadingCities}
                  disabled={!selectedState}
                  onChange={handleCityChange}
                  value={selectedCity}
                  status={formErrors.city ? 'error' : ''}
                  showSearch
                  optionFilterProp='label'
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={cities?.map((city) => {
                    const val =
                      typeof city === 'object'
                        ? city.value || city.name || city.cityName || city.cityname || city
                        : city;
                    const lab =
                      typeof city === 'object'
                        ? city.label || city.name || city.cityName || city.cityname || city
                        : city;
                    return {
                      value: String(val),
                      label: String(lab),
                    };
                  })}
                />
                {formErrors.city && <div className='text-red-500 text-xs'>{formErrors.city}</div>}
              </div>
            </div>

            <NumberInput
              label='Rent per month'
              name='budget'
              required
              value={budget}
              onChange={handleBudgetChange}
              placeholder='0'
              min={0}
              step={1}
              precision={0}
              error={formErrors.budget}
              icon={<DollarSign className='w-5 h-5' />}
              iconPosition='right'
              className='bg-dark border-gray-600 text-white'
              placeholderWhite
            />

            {/* Move-in Date */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Available move in date <span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <DatePicker
                  className='w-full h-14 rounded-full text-white'
                  placeholder='Select date'
                  bordered={false}
                  format='YYYY-MM-DD'
                  onChange={handleMoveInDateChange}
                  value={preferredMoveInDate}
                  status={formErrors.preferredMoveInDate ? 'error' : ''}
                />
              </div>
              {formErrors.preferredMoveInDate && (
                <div className='text-red-500 text-xs'>{formErrors.preferredMoveInDate}</div>
              )}
            </div>

            {/* Room Type */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Room Type <span className='text-red-500'>*</span>
              </label>
              <div className='flex flex-wrap sm:flex-nowrap gap-2'>
                {ROOM_TYPES.map((type) => (
                  <Button
                    key={type.value}
                    type='button'
                    className={`px-6 py-2 rounded-full border-2 text-sm font-medium shadow-none transition-colors duration-200
                    ${
                      roomType === type.value
                        ? 'border-[#A82EFF] text-white bg-black'
                        : 'border-gray-500 text-[#979797] bg-black hover:border-gray-400 hover:text-[#CCCCCC]'
                    }`}
                    onClick={() => setRoomType(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
              {formErrors.roomType && (
                <div className='text-red-500 text-xs'>{formErrors.roomType}</div>
              )}
            </div>

            {/* Gender Preference */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Gender Preference <span className='text-red-500'>*</span>
              </label>
              <Select
                className='w-full rounded-full h-14 bg-gray-800'
                placeholder='Select Gender Preferred'
                onChange={(value) => setGenderPreference(value)}
                value={genderPreference}
                options={genderOptions}
                loading={loadingGenders}
                status={formErrors.genderPreference ? 'error' : ''}
              />
              {formErrors.genderPreference && (
                <div className='text-red-500 text-xs'>{formErrors.genderPreference}</div>
              )}
            </div>

            {/* Occupation */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Occupation <span className='text-red-500'>*</span>
              </label>
              <div className='flex flex-wrap sm:flex-nowrap gap-2'>
                {OCCUPATION_TYPES.map((type) => (
                  <Button
                    key={type.value}
                    type='button'
                    className={`px-6 py-2 rounded-full border-2 text-sm font-medium shadow-none transition-colors duration-200
                    ${
                      occupation === type.value
                        ? 'border-[#A82EFF] text-white bg-black'
                        : 'border-gray-500 text-[#979797] bg-black hover:border-gray-400 hover:text-[#CCCCCC]'
                    }`}
                    onClick={() => setOccupation(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
              {formErrors.occupation && (
                <div className='text-red-500 text-xs'>{formErrors.occupation}</div>
              )}
            </div>

            {/* Nationality */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Nationality Preference <span className='text-red-500'>*</span>
              </label>
              <Select
                className='w-full rounded-full h-14 bg-gray-800'
                placeholder='Select Nationality'
                onChange={(value) => setNationalityPreference(value)}
                value={nationalityPreference}
                options={nationalityOptions?.map((nationality) => ({
                  value: nationality,
                  label: nationality,
                }))}
                status={formErrors.nationalityPreference ? 'error' : ''}
                showSearch
                optionFilterProp='label'
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
              {formErrors.nationalityPreference && (
                <div className='text-red-500 text-xs'>{formErrors.nationalityPreference}</div>
              )}
            </div>

            {/* Lifestyle */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>Life style</label>
              <div className='flex flex-wrap sm:flex-nowrap gap-2'>
                {LIFESTYLE_OPTIONS.map((option) => (
                  <div key={option.value} className='flex flex-col items-center'>
                    <Button
                      type='button'
                      className={`w-16 h-16 rounded-full p-2 flex items-center justify-center ${
                        lifeStyle.includes(option.value)
                          ? 'bg-cardblack border-2 border-purple-500'
                          : 'bg-cardblack'
                      }`}
                      onClick={() => toggleLifeStyle(option.value)}
                    >
                      <span className='text-2xl'>{option.icon}</span>
                    </Button>
                    <span className='text-xs mt-1'>{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Duration */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Stay Duration <span className='text-red-500'>*</span>
              </label>
              {/* <Input
                type='text'
                placeholder='e.g., 6 months, 1 year'
                value={durationOfStay}
                onChange={(e) => handleDurationChange(e.target.value)}
                status={formErrors.durationOfStay ? 'error' : ''}
                className='w-full h-14 bg-dark rounded-full px-4 text-white'
              /> */}
              <InputNumber
                min={1}
                value={durationOfStay}
                onChange={(val) => handleDurationChange(val)}
                placeholder='Enter duration'
                formatter={(value) => (value ? `${value} days` : '')}
                parser={(value) => (value ? value.replace(/\s*days\s*/i, '') : '')}
                controls={false}
                bordered={false}
                className='w-full'
                rootClassName='number-input-white-placeholder'
                status={formErrors.durationOfStay ? 'error' : ''}
              />
              {formErrors.durationOfStay && (
                <div className='text-red-500 text-xs'>{formErrors.durationOfStay}</div>
              )}
            </div>

            {/* Amenities */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>Amenities</label>
              <div className='flex flex-wrap sm:flex-nowrap gap-2'>
                {AMENITIES_OPTIONS.map((option) => (
                  <div key={option.value} className='flex flex-col items-center'>
                    <Button
                      type='button'
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        amenities.includes(option.value)
                          ? 'bg-cardblack border-2 border-purple-500'
                          : 'bg-cardblack'
                      }`}
                      onClick={() => toggleAmenity(option.value)}
                    >
                      <span className='text-2xl'>{option.icon}</span>
                    </Button>
                    <span className='text-xs mt-1'>{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className='space-y-2 mb-4'>
              <div className='flex justify-between items-center mb-4'>
                <label className='block text-sm font-medium text-white mb-2'>Cover Image</label>
              </div>

              <CustomImageUploader images={images} handleImageChange={handleImageChange} />
              {formErrors.images && <div className='text-red-500 text-xs'>{formErrors.images}</div>}
            </div>

            {/* Description */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Description <span className='text-red-500'>*</span>
              </label>
              <Input.TextArea
                placeholder='Describe your room, preferences, and any additional information...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                status={formErrors.description ? 'error' : ''}
                className='w-full min-h-[100px] bg-dark rounded-lg px-4 py-3 text-white resize-none'
                rows={4}
              />
              {formErrors.description && (
                <div className='text-red-500 text-xs'>{formErrors.description}</div>
              )}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
              } text-white py-4 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition-colors duration-200`}
            >
              {isSubmitting ? (
                <>
                  <span className='mr-2'>Submitting...</span>
                  <LoadingOutlined className='animate-spin' />
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <ArrowRightIcon className='w-5 h-5' />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NeedRoommateForm;
