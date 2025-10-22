import { useState } from 'react';
import { Button, Input, InputNumber, Select, Upload, message } from 'antd';
import { LoadingOutlined, CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { BackButtonIcon, ArrowRightIcon } from '../../Common/SVG/svg.function';
import {
  KitchenIcon,
  LaundryIcon,
  ParkingIcon,
  WifiIcon,
  FurnitureIcon,
  VegFoodIcon,
  NightOwlIcon,
  StudiousIcon,
  FitnessBreakIcon,
  NonSmokerIcon,
  NonDrinkerIcon,
  GamingIcon,
} from '@/Components/Stay/NeedRoomCommon.svg';
import { getAuthHeaders } from '../../Auth/Auth.Function';
import { NumberInput } from '../../Common/Inputs/NumberInput';
import { DollarSign } from 'lucide-react';

const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

const PROPERTY_TYPES = [
  { value: 'APARTMENT', label: 'Apartment' },
  { value: 'HOUSE', label: 'House' },
  { value: 'CONDO', label: 'Condo' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'VILLA', label: 'Villa' },
];

const RENTAL_BASIS = [
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'YEARLY', label: 'Yearly' },
  { value: 'DAILY', label: 'Daily' },
];

const GENDER_PREFERENCE = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'ANY', label: 'Any' },
];

const NATIONALITY_PREFERENCE = [
  { value: 'ANY', label: 'Any' },
  { value: 'LOCAL', label: 'Local Only' },
  { value: 'INTERNATIONAL', label: 'International Only' },
];

const TENANT_TYPE = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'WORKING', label: 'Working' },
];

const WHO_YOU_ARE = [
  { value: 'OWNER', label: 'Owner' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'CARE_TAKER', label: 'Care Taker' },
];

const AMENITIES_OPTIONS = [
  { value: 'KITCHEN', icon: <KitchenIcon />, label: 'Kitchen' },
  { value: 'PARKING', icon: <ParkingIcon />, label: 'Parking' },
  { value: 'WIFI', icon: <WifiIcon />, label: 'Wifi' },
  { value: 'FURNITURE', icon: <FurnitureIcon />, label: 'Furniture' },
  { value: 'LAUNDRY', icon: <LaundryIcon />, label: 'Laundry' },
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

async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${URL}/api/location/${endpoint}`, {
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

async function postData(endpoint, data) {
  try {
    const response = await fetch(`${URL}/api/landlord/${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || errorData?.error || 'Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}

export default function LandlordMyPostForm({ noPadding = false }) {
  const [step, setStep] = useState(1);

  // Step 1 - Property Details
  const [propertyType, setPropertyType] = useState(null);
  const [propertyName, setPropertyName] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [rentalAmount, setRentalAmount] = useState(0);
  const [rentalBasis, setRentalBasis] = useState('MONTHLY');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [genderPreference, setGenderPreference] = useState(null);
  const [nationalityPreference, setNationalityPreference] = useState(null);
  const [tenantType, setTenantType] = useState([]);
  const [whoYouAre, setWhoYouAre] = useState(null);
  const [propertyDocuments, setPropertyDocuments] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);

  // Step 2 - Location Details
  const [doorNo, setDoorNo] = useState('');
  const [locality, setLocality] = useState('');
  const [town, setTown] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [mapLocation, setMapLocation] = useState('');
  const [propertyPhotos, setPropertyPhotos] = useState([]);
  const [description, setDescription] = useState('');

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch countries
  const { data: countries = [], isLoading: loadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: () => fetchAPI('countries'),
  });

  // Fetch states when country is selected
  const { data: states = [], isLoading: loadingStates } = useQuery({
    queryKey: ['states', selectedCountry],
    queryFn: () => fetchAPI(`states?country=${encodeURIComponent(String(selectedCountry || ''))}`),
    enabled: !!selectedCountry,
  });

  const toggleTenantType = (value) => {
    setTenantType((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const toggleAmenity = (value) => {
    setAmenities((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const toggleLifestyle = (value) => {
    setLifestyle((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const validateStep1 = () => {
    const errors = {};

    if (!propertyType) errors.propertyType = 'Please select property type';
    if (!propertyName.trim()) errors.propertyName = 'Please enter property name';
    if (!totalArea.trim()) errors.totalArea = 'Please enter total area';
    if (!rentalAmount || rentalAmount <= 0) errors.rentalAmount = 'Please enter rental amount';
    if (!genderPreference) errors.genderPreference = 'Please select gender preference';
    if (!nationalityPreference)
      errors.nationalityPreference = 'Please select nationality preference';
    if (tenantType.length === 0) errors.tenantType = 'Please select at least one tenant type';
    if (!whoYouAre) errors.whoYouAre = 'Please select who you are';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};

    if (!doorNo.trim()) errors.doorNo = 'Please enter door/street name';
    if (!locality.trim()) errors.locality = 'Please enter locality/area';
    if (!town.trim()) errors.town = 'Please enter town/city';
    if (!selectedState) errors.state = 'Please select state';
    if (!selectedCountry) errors.country = 'Please select country';
    if (!zipCode.trim()) errors.zipCode = 'Please enter ZIP/postal code';
    if (propertyPhotos.length < 3) errors.propertyPhotos = 'Please upload at least 3 photos';
    if (!description.trim()) errors.description = 'Please enter description';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setStep(2);
      setFormErrors({});
    } else {
      message.error('Please fill in all required fields');
    }
  };

  const handleBack = () => {
    setStep(1);
    setFormErrors({});
  };

  const { mutate: submitForm } = useMutation({
    mutationFn: (formData) => postData('create-property', formData),
    onSuccess: (data) => {
      message.success(data?.message || 'Property posted successfully!');
      // Reset form or close modal
      setStep(1);
      setIsSubmitting(false);
      // You can add a callback here to close the modal
    },
    onError: (error) => {
      message.error(error.message || 'Failed to post property. Please try again.');
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      message.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        // Step 1 data
        propertyType,
        propertyName,
        totalArea,
        rentalAmount,
        rentalBasis,
        bedrooms,
        bathrooms,
        genderPreference,
        nationalityPreference,
        tenantType,
        whoYouAre,
        propertyDocuments: propertyDocuments.map((file) => file.originFileObj),
        amenities,
        lifestyle,
        // Step 2 data
        doorNo,
        locality,
        town,
        state: selectedState,
        country: selectedCountry,
        zipCode,
        mapLocation,
        propertyPhotos: propertyPhotos.map((file) => file.originFileObj),
        description,
      };

      submitForm(formData);
    } catch (error) {
      console.error('Submission error:', error);
      message.error('Failed to submit form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    onChange: (info) => {
      setPropertyPhotos(info.fileList);
      setFormErrors((prev) => ({ ...prev, propertyPhotos: null }));
    },
    fileList: propertyPhotos,
    maxCount: 10,
  };

  const documentUploadProps = {
    beforeUpload: () => false,
    onChange: (info) => {
      setPropertyDocuments(info.fileList);
    },
    fileList: propertyDocuments,
  };

  return (
    <div className={`text-white bg-black ${noPadding ? 'p-8' : 'p-8'} h-screen flex flex-col`}>
      <div className='flex-1 overflow-hidden'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-6'>
          {step === 2 && (
            <div
              role='button'
              className='cursor-pointer inline-flex items-center'
              onClick={handleBack}
            >
              <BackButtonIcon />
            </div>
          )}
          <div>
            <h1 className='text-2xl font-bold'>Post your Requirements</h1>
            <p className='text-gray-400'>For Your Property Rental</p>
          </div>
        </div>

        {/* Form Content */}
        <div className='max-h-[calc(100vh-180px)] overflow-y-auto pr-2'>
          {step === 1 ? (
            // Step 1: Property Details
            <form className='space-y-6 pb-4'>
              <h2 className='text-xl font-semibold'>Property Details</h2>

              {/* Property Type */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>
                  Property Type <span className='text-red-500'>*</span>
                </label>
                <Select
                  className='w-full h-14'
                  placeholder='Select Property Type'
                  value={propertyType}
                  onChange={(value) => {
                    setPropertyType(value);
                    setFormErrors((prev) => ({ ...prev, propertyType: null }));
                  }}
                  options={PROPERTY_TYPES}
                  status={formErrors.propertyType ? 'error' : ''}
                />
                {formErrors.propertyType && (
                  <div className='text-red-500 text-xs'>{formErrors.propertyType}</div>
                )}
              </div>

              {/* Property Name */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Property Name</label>
                <Input
                  className='h-14 bg-dark border-gray-600 text-white rounded-full'
                  placeholder='Ex: SKG Apartments & Stay'
                  value={propertyName}
                  onChange={(e) => {
                    setPropertyName(e.target.value);
                    setFormErrors((prev) => ({ ...prev, propertyName: null }));
                  }}
                  status={formErrors.propertyName ? 'error' : ''}
                />
                {formErrors.propertyName && (
                  <div className='text-red-500 text-xs'>{formErrors.propertyName}</div>
                )}
              </div>

              {/* Total Area */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>
                  Total Area <span className='text-red-500'>*</span>
                </label>
                <Input
                  className='h-14 bg-dark border-gray-600 text-white rounded-full'
                  placeholder='Ex: 650 Sq ft'
                  value={totalArea}
                  onChange={(e) => {
                    setTotalArea(e.target.value);
                    setFormErrors((prev) => ({ ...prev, totalArea: null }));
                  }}
                  status={formErrors.totalArea ? 'error' : ''}
                />
                {formErrors.totalArea && (
                  <div className='text-red-500 text-xs'>{formErrors.totalArea}</div>
                )}
              </div>

              {/* Rental Amount & Basis */}
              <div className='grid grid-cols-2 gap-4'>
                <NumberInput
                  label='Rental Amount'
                  name='rentalAmount'
                  required
                  value={rentalAmount}
                  onChange={(value) => {
                    setRentalAmount(value);
                    setFormErrors((prev) => ({ ...prev, rentalAmount: null }));
                  }}
                  placeholder='100'
                  min={0}
                  step={1}
                  precision={0}
                  error={formErrors.rentalAmount}
                  // icon={<DollarSign className='w-5 h-5' />}
                  // iconPosition='left'
                  className='bg-dark border-gray-600 text-white'
                  placeholderWhite
                />
                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>Basis</label>
                  <Select
                    className='w-full h-14'
                    value={rentalBasis}
                    onChange={(value) => setRentalBasis(value)}
                    options={RENTAL_BASIS}
                  />
                </div>
              </div>

              {/* Bed Room & Bath Room */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>
                    Bed Room <span className='text-red-500'>*</span>
                  </label>
                  <InputNumber
                    className='w-full h-14 bg-dark border-gray-600 text-white rounded-full'
                    placeholder='1'
                    min={1}
                    value={bedrooms}
                    onChange={(value) => setBedrooms(value)}
                    controls={false}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>
                    Bath Room <span className='text-red-500'>*</span>
                  </label>
                  <InputNumber
                    className='w-full h-14 bg-dark border-gray-600 text-white rounded-full'
                    placeholder='1'
                    min={1}
                    value={bathrooms}
                    onChange={(value) => setBathrooms(value)}
                    controls={false}
                  />
                </div>
              </div>

              {/* Gender Preference */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Gender Preference</label>
                <Select
                  className='w-full h-14'
                  placeholder='Select Gender Preferred'
                  value={genderPreference}
                  onChange={(value) => {
                    setGenderPreference(value);
                    setFormErrors((prev) => ({ ...prev, genderPreference: null }));
                  }}
                  options={GENDER_PREFERENCE}
                  status={formErrors.genderPreference ? 'error' : ''}
                />
                {formErrors.genderPreference && (
                  <div className='text-red-500 text-xs'>{formErrors.genderPreference}</div>
                )}
              </div>

              {/* Nationality Preference */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Nationality Preference</label>
                <Select
                  className='w-full h-14'
                  placeholder='Select Nationality'
                  value={nationalityPreference}
                  onChange={(value) => {
                    setNationalityPreference(value);
                    setFormErrors((prev) => ({ ...prev, nationalityPreference: null }));
                  }}
                  options={NATIONALITY_PREFERENCE}
                  status={formErrors.nationalityPreference ? 'error' : ''}
                />
                {formErrors.nationalityPreference && (
                  <div className='text-red-500 text-xs'>{formErrors.nationalityPreference}</div>
                )}
              </div>

              {/* Tenant Type Preferred */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Tenant Type Preferred</label>
                <div className='flex gap-2'>
                  {TENANT_TYPE.map((type) => (
                    <Button
                      key={type.value}
                      type='button'
                      className={`px-6 py-2 rounded-full border-2 text-sm font-medium shadow-none transition-colors duration-200
                      ${
                        tenantType.includes(type.value)
                          ? 'border-[#A82EFF] text-white bg-black'
                          : 'border-gray-500 text-[#979797] bg-black hover:border-gray-400 hover:text-[#CCCCCC]'
                      }`}
                      onClick={() => {
                        toggleTenantType(type.value);
                        setFormErrors((prev) => ({ ...prev, tenantType: null }));
                      }}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
                {formErrors.tenantType && (
                  <div className='text-red-500 text-xs'>{formErrors.tenantType}</div>
                )}
              </div>

              {/* Who you are for Property */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>
                  Who you are for Property? <span className='text-red-500'>*</span>
                </label>
                <div className='flex gap-2'>
                  {WHO_YOU_ARE.map((type) => (
                    <Button
                      key={type.value}
                      type='button'
                      className={`px-6 py-2 rounded-full border-2 text-sm font-medium shadow-none transition-colors duration-200
                      ${
                        whoYouAre === type.value
                          ? 'border-[#A82EFF] text-white bg-black'
                          : 'border-gray-500 text-[#979797] bg-black hover:border-gray-400 hover:text-[#CCCCCC]'
                      }`}
                      onClick={() => {
                        setWhoYouAre(type.value);
                        setFormErrors((prev) => ({ ...prev, whoYouAre: null }));
                      }}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
                {formErrors.whoYouAre && (
                  <div className='text-red-500 text-xs'>{formErrors.whoYouAre}</div>
                )}
              </div>

              {/* Property Document */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Property Document</label>
                <Upload {...documentUploadProps} accept='.pdf,.png,.jpg,.jpeg'>
                  <div className='w-full border-2 border-dashed border-gray-600 rounded-xl py-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors'>
                    <UploadOutlined className='text-4xl text-gray-400 mb-2' />
                    <p className='text-white text-sm'>Upload Documents</p>
                    <p className='text-gray-400 text-xs'>(pdf,jpg,png file size up to 10mb)</p>
                  </div>
                </Upload>
              </div>

              {/* Amenities */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Amenities</label>
                <div className='flex flex-wrap gap-4'>
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

              {/* Life style */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Life style</label>
                <div className='flex flex-wrap gap-4'>
                  {LIFESTYLE_OPTIONS.map((option) => (
                    <div key={option.value} className='flex flex-col items-center'>
                      <Button
                        type='button'
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          lifestyle.includes(option.value)
                            ? 'bg-cardblack border-2 border-purple-500'
                            : 'bg-cardblack'
                        }`}
                        onClick={() => toggleLifestyle(option.value)}
                      >
                        <span className='text-2xl'>{option.icon}</span>
                      </Button>
                      <span className='text-xs mt-1'>{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <button
                type='button'
                onClick={handleContinue}
                className='w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-full font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200'
              >
                <span>Continue</span>
                <ArrowRightIcon className='w-5 h-5' />
              </button>
            </form>
          ) : (
            // Step 2: Location Details
            <form onSubmit={handleSubmit} className='space-y-6 pb-4'>
              <h2 className='text-xl font-semibold'>Location Details</h2>

              {/* Door No/Street Name */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Door No/Street Name</label>
                <Input
                  className='h-14 bg-dark border-gray-600 text-white rounded-full'
                  placeholder='No 12 VC street'
                  value={doorNo}
                  onChange={(e) => {
                    setDoorNo(e.target.value);
                    setFormErrors((prev) => ({ ...prev, doorNo: null }));
                  }}
                  status={formErrors.doorNo ? 'error' : ''}
                />
                {formErrors.doorNo && (
                  <div className='text-red-500 text-xs'>{formErrors.doorNo}</div>
                )}
              </div>

              {/* Locality/Area */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Locality/Area</label>
                <Input
                  className='h-14 bg-dark border-gray-600 text-white rounded-full'
                  placeholder='Ex: SKG Apartments & Stay'
                  value={locality}
                  onChange={(e) => {
                    setLocality(e.target.value);
                    setFormErrors((prev) => ({ ...prev, locality: null }));
                  }}
                  status={formErrors.locality ? 'error' : ''}
                />
                {formErrors.locality && (
                  <div className='text-red-500 text-xs'>{formErrors.locality}</div>
                )}
              </div>

              {/* Town/City */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Town/City</label>
                <Input
                  className='h-14 bg-dark border-gray-600 text-white rounded-full'
                  placeholder='Ex: 650 Sq ft'
                  value={town}
                  onChange={(e) => {
                    setTown(e.target.value);
                    setFormErrors((prev) => ({ ...prev, town: null }));
                  }}
                  status={formErrors.town ? 'error' : ''}
                />
                {formErrors.town && <div className='text-red-500 text-xs'>{formErrors.town}</div>}
              </div>

              {/* State & Country */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>State</label>
                  <Select
                    className='w-full h-14'
                    placeholder='Select State'
                    value={selectedState}
                    onChange={(value) => {
                      setSelectedState(value);
                      setFormErrors((prev) => ({ ...prev, state: null }));
                    }}
                    loading={loadingStates}
                    disabled={!selectedCountry}
                    showSearch
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
                    status={formErrors.state ? 'error' : ''}
                  />
                  {formErrors.state && (
                    <div className='text-red-500 text-xs'>{formErrors.state}</div>
                  )}
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>Country</label>
                  <Select
                    className='w-full h-14'
                    placeholder='Select Coun..'
                    value={selectedCountry}
                    onChange={(value) => {
                      setSelectedCountry(value);
                      setSelectedState(null);
                      setFormErrors((prev) => ({ ...prev, country: null }));
                    }}
                    loading={loadingCountries}
                    showSearch
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
                    status={formErrors.country ? 'error' : ''}
                  />
                  {formErrors.country && (
                    <div className='text-red-500 text-xs'>{formErrors.country}</div>
                  )}
                </div>
              </div>

              {/* ZIP/ Postal Code */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>ZIP/ Postal Code</label>
                <Input
                  className='h-14 bg-dark border-gray-600 text-white rounded-full'
                  placeholder='Ex 578900'
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                    setFormErrors((prev) => ({ ...prev, zipCode: null }));
                  }}
                  status={formErrors.zipCode ? 'error' : ''}
                />
                {formErrors.zipCode && (
                  <div className='text-red-500 text-xs'>{formErrors.zipCode}</div>
                )}
              </div>

              {/* Map Location */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Map Location</label>
                <div className='relative'>
                  <Input
                    className='h-14 bg-dark border-gray-600 text-white rounded-full pr-12'
                    placeholder='Select Location from map'
                    value={mapLocation}
                    onChange={(e) => setMapLocation(e.target.value)}
                    readOnly
                  />
                  <div className='absolute right-4 top-1/2 -translate-y-1/2'>
                    <svg
                      className='w-6 h-6 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Property Photos */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Property Photos</label>
                <Upload {...uploadProps} listType='picture-card' accept='image/*' multiple>
                  <div className='flex flex-col items-center justify-center'>
                    <CameraOutlined className='text-2xl text-gray-400 mb-1' />
                    <p className='text-white text-xs'>Capture Picture</p>
                    <p className='text-gray-400 text-xs'>Min 3 images</p>
                  </div>
                </Upload>
                {formErrors.propertyPhotos && (
                  <div className='text-red-500 text-xs'>{formErrors.propertyPhotos}</div>
                )}
              </div>

              {/* Description */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Description</label>
                <div className='relative'>
                  <Input.TextArea
                    placeholder='Typing...'
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setFormErrors((prev) => ({ ...prev, description: null }));
                    }}
                    status={formErrors.description ? 'error' : ''}
                    className='min-h-[120px] bg-dark border-gray-600 text-white rounded-lg px-4 py-3 resize-none'
                    rows={5}
                    maxLength={1000}
                  />
                  <div className='absolute bottom-2 right-2 text-xs text-gray-500'>
                    ({description.length}/1000)
                  </div>
                </div>
                {formErrors.description && (
                  <div className='text-red-500 text-xs'>{formErrors.description}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
                } text-white py-4 px-6 rounded-full font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200`}
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
          )}
        </div>
      </div>
    </div>
  );
}
