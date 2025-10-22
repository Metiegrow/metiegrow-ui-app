import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useRouter } from '@tanstack/react-router';
import { getAuthHeaders, getAuthData } from '../../Auth/Auth.Function';
import dayjs from 'dayjs';

const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

// Common constants
export const DEFAULT_GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
];

// Static nationality options (do not fetch from API)
export const NATIONALITY_OPTIONS = [
  'Afghan',
  'Albanian',
  'Algerian',
  'American',
  'Andorran',
  'Angolan',
  'Argentine',
  'Armenian',
  'Australian',
  'Austrian',
  'Azerbaijani',
  'Bahamian',
  'Bahraini',
  'Bangladeshi',
  'Barbadian',
  'Belarusian',
  'Belgian',
  'Belizean',
  'Beninese',
  'Bhutanese',
  'Bolivian',
  'Bosnian',
  'Botswanan',
  'Brazilian',
  'British',
  'Bruneian',
  'Bulgarian',
  'Burkinabé',
  'Burmese',
  'Burundian',
  'Cambodian',
  'Cameroonian',
  'Canadian',
  'Cape Verdean',
  'Central African',
  'Chadian',
  'Chilean',
  'Chinese',
  'Colombian',
  'Comoran',
  'Congolese (Congo-Brazzaville)',
  'Congolese (DRC)',
  'Costa Rican',
  'Croatian',
  'Cuban',
  'Cypriot',
  'Czech',
  'Danish',
  'Djiboutian',
  'Dominican',
  'Dutch',
  'East Timorese',
  'Ecuadorean',
  'Egyptian',
  'Emirati',
  'English',
  'Equatorial Guinean',
  'Eritrean',
  'Estonian',
  'Ethiopian',
  'Fijian',
  'Filipino',
  'Finnish',
  'French',
  'Gabonese',
  'Gambian',
  'Georgian',
  'German',
  'Ghanaian',
  'Greek',
  'Grenadian',
  'Guatemalan',
  'Guinean',
  'Bissau-Guinean',
  'Guyanese',
  'Haitian',
  'Honduran',
  'Hungarian',
  'Icelander',
  'Indian',
  'Indonesian',
  'Iranian',
  'Iraqi',
  'Irish',
  'Israeli',
  'Italian',
  'Ivorian',
  'Jamaican',
  'Japanese',
  'Jordanian',
  'Kazakh',
  'Kenyan',
  'Kiribati',
  'Kuwaiti',
  'Kyrgyz',
  'Laotian',
  'Latvian',
  'Lebanese',
  'Liberian',
  'Libyan',
  'Liechtensteiner',
  'Lithuanian',
  'Luxembourger',
  'Macedonian',
  'Malagasy',
  'Malawian',
  'Malaysian',
  'Maldivian',
  'Malian',
  'Maltese',
  'Marshallese',
  'Mauritanian',
  'Mauritian',
  'Mexican',
  'Micronesian',
  'Moldovan',
  'Monégasque',
  'Mongolian',
  'Montenegrin',
  'Moroccan',
  'Mozambican',
  'Namibian',
  'Nauruan',
  'Nepalese',
  'New Zealander',
  'Nicaraguan',
  'Nigerien',
  'Nigerian',
  'North Korean',
  'Northern Irish',
  'Norwegian',
  'Omani',
  'Pakistani',
  'Palauan',
  'Panamanian',
  'Papua New Guinean',
  'Paraguayan',
  'Peruvian',
  'Polish',
  'Portuguese',
  'Qatari',
  'Romanian',
  'Russian',
  'Rwandan',
  'Saint Lucian',
  'Salvadoran',
  'Samoan',
  'San Marinese',
  'Sao Tomean',
  'Saudi',
  'Scottish',
  'Senegalese',
  'Serbian',
  'Seychellois',
  'Sierra Leonean',
  'Singaporean',
  'Slovak',
  'Slovenian',
  'Solomon Islander',
  'Somali',
  'South African',
  'South Korean',
  'Spanish',
  'Sri Lankan',
  'Sudanese',
  'Surinamese',
  'Swazi',
  'Swedish',
  'Swiss',
  'Syrian',
  'Taiwanese',
  'Tajik',
  'Tanzanian',
  'Thai',
  'Togolese',
  'Tongan',
  'Trinidadian/Tobagonian',
  'Tunisian',
  'Turkish',
  'Turkmen',
  'Tuvaluan',
  'Ugandan',
  'Ukrainian',
  'Uruguayan',
  'Uzbek',
  'Vanuatuan',
  'Venezuelan',
  'Vietnamese',
  'Welsh',
  'Yemeni',
  'Zambian',
  'Zimbabwean',
];

export const ROOM_TYPES = [
  { value: 'SINGLE_ROOM', label: 'Single' },
  { value: 'SHARED_ROOM', label: 'Shared' },
  { value: 'ENTIRE_APARTMENT', label: 'Entire Apartment' },
];

export const OCCUPATION_TYPES = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'WORKING', label: 'Working' },
];

export const LIFESTYLE_OPTIONS = [
  { value: 'VEG_FOOD', label: 'Veg food' },
  { value: 'NIGHT_OWL', label: 'Night Owl' },
  { value: 'STUDIOUS', label: 'Studious' },
  { value: 'FITNESS_FREAK', label: 'Fitness Freak' },
  { value: 'NON_SMOKER', label: 'Non Smoker' },
  { value: 'NON_DRINKER', label: 'Non Drinker' },
  { value: 'GAMING', label: 'Gaming' },
];

export const AMENITIES_OPTIONS = [
  { value: 'KITCHEN', label: 'Kitchen' },
  { value: 'PARKING', label: 'Parking' },
  { value: 'WIFI', label: 'Wifi' },
  { value: 'FURNITURE', label: 'Furniture' },
  { value: 'LAUNDRY', label: 'Laundry' },
];

// API functions using common API handler
export async function fetchAPI(endpoint) {
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

export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${URL}/api/posts/stay-post/${endpoint}`, {
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

// Convenience: POST without images to specific stay-post endpoints
export async function postStay(endpoint, data) {
  return postData(endpoint, data);
}

export async function postFormData(endpoint, data, images) {
  const formData = new FormData();

  // Create the roomInterest object with the exact field names expected by the API
  const roomInterest = {
    country: data.country,
    state: data.state,
    city: data.city,
    rentPerMonth: data.budget,
    availableMoveInDate: data.preferredMoveInDate,
    roomType: data.roomType,
    genderPreference: data.genderPreference,
    occupation: data.occupation,
    nationalityPreference: data.nationalityPreference,
    lifeStyle: data.lifeStyle,
    stayDuration: data.durationOfStay,
    amenities: data.amenities,
  };

  // Append the JSON request part as application/json under the key 'dto'
  formData.append('dto', new Blob([JSON.stringify(roomInterest)], { type: 'application/json' }));

  // Append each image file using the field name expected by the backend: 'image'
  if (images && images.length > 0) {
    images.forEach((image) => {
      if (image.originFileObj) {
        formData.append('image', image.originFileObj);
      }
    });
  }

  try {
    // Get auth headers but exclude Content-Type for FormData
    const authHeaders = getAuthHeaders();
    const { 'Content-Type': _, ...headersWithoutContentType } = authHeaders;

    const response = await fetch(`${URL}/api/posts/stay-post/${endpoint}`, {
      method: 'POST',
      headers: headersWithoutContentType,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Submission error:', error);
    throw error;
  }
}

// Fetch roommate details by ID
export async function getRoommateDetails(id) {
  if (!id) throw new Error('Roommate id is required');
  try {
    const response = await fetch(`${URL}/api/posts/stay-post/roommate/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || `Failed to fetch roommate ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching roommate details:', error);
    throw error;
  }
}

// Create Room (JSON payload)
export async function createRoom(data) {
  return postStay('createroom', data);
}

// Room matching for a given roomId
export async function getRoomMatching(roomId) {
  if (!roomId) throw new Error('roomId is required');
  try {
    const url = `${URL}/api/posts/stay-post/room/matching/${roomId}?roomId=${encodeURIComponent(String(roomId))}`;
    const response = await fetch(url, { headers: getAuthHeaders() });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || `Failed to fetch room matching for ${roomId}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching room matching:', error);
    throw error;
  }
}

// Express interest in a room
export async function postRoomInterest(interestData) {
  return postStay('roominterest', interestData);
}

// Get roommate by id (alias kept for clarity)
export async function getRoommateById(id) {
  return getRoommateDetails(id);
}

// Roommate matching for a given roomId
export async function getRoommateMatching(roomId) {
  if (!roomId) throw new Error('roomId is required');
  try {
    const url = `${URL}/api/posts/stay-post/roommate/matching/${roomId}?roomId=${encodeURIComponent(String(roomId))}`;
    const response = await fetch(url, { headers: getAuthHeaders() });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || `Failed to fetch roommate matching for ${roomId}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching roommate matching:', error);
    throw error;
  }
}

// Fetch need-room details by ID
export async function getNeedRoomDetails(id) {
  if (!id) throw new Error('Need room id is required');
  try {
    const response = await fetch(`${URL}/api/posts/stay-post/needroom/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || `Failed to fetch need room ${id}`);
    }
    const data = await response.json();

    // Normalize the response data to handle object fields
    const normalizedData = { ...data };

    // Convert object fields to strings if needed
    const objectFields = [
      'country',
      'state',
      'city',
      'genderPreference',
      'occupation',
      'roomType',
      'durationOfStay',
      'nationalityPreference',
    ];

    objectFields.forEach((field) => {
      if (normalizedData[field] && typeof normalizedData[field] === 'object') {
        // Extract the most appropriate string value from the object
        normalizedData[field] =
          normalizedData[field].value ||
          normalizedData[field].label ||
          normalizedData[field].name ||
          normalizedData[field].countryName ||
          normalizedData[field].cityName ||
          normalizedData[field].stateName ||
          normalizedData[field].countryname ||
          normalizedData[field].cityname ||
          normalizedData[field].statename ||
          normalizedData[field].text ||
          String(normalizedData[field]);
      }
    });

    return normalizedData;
  } catch (error) {
    console.error('Error fetching need room details:', error);
    throw error;
  }
}

// Common form state hook
export function useStayFormState() {
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
  const [universityCourseMatch, setUniversityCourseMatch] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  return {
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    budget,
    setBudget,
    preferredMoveInDate,
    setPreferredMoveInDate,
    roomType,
    setRoomType,
    genderPreference,
    setGenderPreference,
    occupation,
    setOccupation,
    nationalityPreference,
    setNationalityPreference,
    lifeStyle,
    setLifeStyle,
    durationOfStay,
    setDurationOfStay,
    amenities,
    setAmenities,
    universityCourseMatch,
    setUniversityCourseMatch,
    formErrors,
    setFormErrors,
    description,
    setDescription,
    isSubmitting,
    setIsSubmitting,
  };
}

// Common form validation
export function validateStayForm(formData, requireImages = false, images = []) {
  const errors = {};

  if (!formData.selectedCountry) errors.country = 'Please select a country';
  if (!formData.selectedState) errors.state = 'Please select a state';
  if (!formData.selectedCity) errors.city = 'Please select a city';
  if (!formData.budget || formData.budget <= 0) errors.budget = 'Please enter a valid budget';
  if (!formData.preferredMoveInDate) errors.moveInDate = 'Please select a move-in date';
  if (!formData.roomType) errors.roomType = 'Please select a room type';
  if (!formData.genderPreference) errors.genderPreference = 'Please select a gender preference';
  if (!formData.occupation) errors.occupation = 'Please select an occupation';
  if (!formData.durationOfStay) errors.durationOfStay = 'Please select duration of stay';
  if (!formData.description?.trim()) errors.description = 'Please provide a description';

  if (requireImages && images.length < 3) {
    errors.images = 'Please upload at least 3 images';
  }

  return errors;
}

// Common form handlers
export function useStayFormHandlers(formState, setFormErrors) {
  const handleCountryChange = (value) => {
    formState.setSelectedCountry(value);
    formState.setSelectedState(null);
    formState.setSelectedCity(null);
    setFormErrors((prev) => ({ ...prev, country: null }));
  };

  const handleStateChange = (value) => {
    formState.setSelectedState(value);
    formState.setSelectedCity(null);
    setFormErrors((prev) => ({ ...prev, state: null }));
  };

  const handleCityChange = (value) => {
    formState.setSelectedCity(value);
    setFormErrors((prev) => ({ ...prev, city: null }));
  };

  const handleBudgetChange = (value) => {
    formState.setBudget(value);
    setFormErrors((prev) => ({ ...prev, budget: null }));
  };

  const handleMoveInDateChange = (date) => {
    formState.setPreferredMoveInDate(date);
    setFormErrors((prev) => ({ ...prev, preferredMoveInDate: null }));
  };

  const handleDurationChange = (value) => {
    formState.setDurationOfStay(value);
    setFormErrors((prev) => ({ ...prev, durationOfStay: null }));
  };

  const toggleLifeStyle = (value) => {
    formState.setLifeStyle((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const toggleAmenity = (value) => {
    formState.setAmenities((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  return {
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    handleBudgetChange,
    handleMoveInDateChange,
    handleDurationChange,
    toggleLifeStyle,
    toggleAmenity,
  };
}

// Common API queries
export function useStayFormQueries(selectedCountry = null, selectedState = null) {
  // Fetch countries
  const { data: countries = [], isLoading: loadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      try {
        const response = await fetch(`${URL}/api/location/countries`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }

        const data = await response.json();

        // Handle different API response formats
        if (Array.isArray(data)) {
          return data.map((country) => {
            // Prefer human-readable name as the value sent to backend
            if (typeof country === 'object') {
              const readable =
                country.name ||
                country.countryName ||
                country.countryname ||
                country.label ||
                country.value ||
                country;
              return {
                value: String(readable),
                label: String(readable),
                ...country,
              };
            }
            // Handle string responses
            return {
              value: String(country),
              label: String(country),
            };
          });
        }
        return [];
      } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
      }
    },
  });

  // Fetch states when country is selected
  const { data: states = [], isLoading: loadingStates } = useQuery({
    queryKey: ['states', selectedCountry],
    queryFn: async () => {
      if (!selectedCountry) return [];

      try {
        const response = await fetch(`${URL}/api/location/states?country=${selectedCountry}`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch states');
        }

        const data = await response.json();

        // Handle different API response formats
        if (Array.isArray(data)) {
          return data.map((state) => {
            // Prefer human-readable state name as both value and label
            if (typeof state === 'object') {
              const readable =
                state.name ||
                state.stateName ||
                state.statename ||
                state.label ||
                state.value ||
                state;
              return {
                value: String(readable),
                label: String(readable),
                ...state,
              };
            }
            // Handle string responses
            return {
              value: String(state),
              label: String(state),
            };
          });
        }
        return [];
      } catch (error) {
        console.error('Error fetching states:', error);
        return [];
      }
    },
    enabled: !!selectedCountry,
  });

  // Fetch cities when state is selected
  const { data: cities = [], isLoading: loadingCities } = useQuery({
    queryKey: ['cities', selectedCountry, selectedState],
    queryFn: async () => {
      if (!selectedCountry || !selectedState) return [];

      try {
        const citiesUrl = `${URL}/api/location/cities?country=${encodeURIComponent(String(selectedCountry))}&state=${encodeURIComponent(String(selectedState))}`;
        console.debug('Cities request:', citiesUrl);
        const response = await fetch(citiesUrl, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        console.debug('Cities response length:', Array.isArray(data) ? data.length : 'n/a');

        // Handle different API response formats
        if (Array.isArray(data)) {
          return data.map((city) => {
            // Handle object responses with specific keys
            if (typeof city === 'object') {
              return {
                value: String(city.value || city.name || city.cityName || city.cityname || city),
                label: String(city.label || city.name || city.cityName || city.cityname || city),
                ...city,
              };
            }
            // Handle string responses
            return {
              value: String(city),
              label: String(city),
            };
          });
        }
        return [];
      } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
      }
    },
    enabled: !!selectedCountry && !!selectedState,
  });

  // Fetch universities when country is selected
  const { data: universities = [], isLoading: loadingUniversities } = useQuery({
    queryKey: ['universities', selectedCountry],
    queryFn: async () => {
      if (!selectedCountry) return [];

      try {
        const response = await fetch(`${URL}/api/universities?country=${selectedCountry}`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch universities');
        }

        const data = await response.json();

        // Handle different API response formats
        if (Array.isArray(data)) {
          return data.map((university) => {
            // Handle object responses with specific keys
            if (typeof university === 'object') {
              return {
                value:
                  university.value || university.name || university.universityName || university,
                label:
                  university.label || university.name || university.universityName || university,
                ...university,
              };
            }
            // Handle string responses
            return {
              value: university,
              label: university,
            };
          });
        }
        return [];
      } catch (error) {
        console.error('Error fetching universities:', error);
        return [];
      }
    },
    enabled: !!selectedCountry,
  });

  // Nationalities: use static options (no API call)
  const nationalityOptions = NATIONALITY_OPTIONS;
  const loadingNationalities = false;

  // Use static gender options (no API call needed)
  const genderOptions = DEFAULT_GENDER_OPTIONS;
  const loadingGenders = false;

  return {
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
  };
}

// Common navigation
export function useStayFormNavigation() {
  const router = useRouter();

  const navigateToRoommateHousing = (roomId) => {
    router.navigate({
      to: '/app/roommate-housing',
      search: { roomId: roomId },
    });
  };

  const navigateToRoomHousing = (roommateId) => {
    router.navigate({
      to: '/app/room-housing',
      search: { roommateId },
    });
  };

  // Helper function to get dashboard route based on user role
  const getDashboardRoute = (role) => {
    switch (role) {
      case 'mentor':
        return '/app/mentor-dashboard';
      case 'lawyer':
        return '/app/lawyer-dashboard';
      case 'alumni':
        return '/app/alumni-dashboard';
      case 'recruiter':
      case 'hr':
        return '/app/recruiter-dashboard';
      case 'pgowner':
      case 'realestate':
        return '/app/landlord-dashboard';
      default:
        return '/app/student-dashboard';
    }
  };

  // Get user role and determine dashboard route
  const getUserDashboardRoute = () => {
    try {
      const authData = getAuthData();

      if (!authData) {
        return '/app/student-dashboard';
      }

      // Check for userType first (most common)
      if (authData.userType) {
        const roleValue = authData.userType.replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(roleValue);
      }

      // Check for roles array
      if (authData.roles && Array.isArray(authData.roles) && authData.roles.length > 0) {
        const roleValue = authData.roles[0].replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(roleValue);
      }

      // Check for authorities array
      if (
        authData.authorities &&
        Array.isArray(authData.authorities) &&
        authData.authorities.length > 0
      ) {
        const authority = authData.authorities[0];
        const role = authority.replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(role);
      }

      // Default to student dashboard
      return '/app/student-dashboard';
    } catch (error) {
      console.error('Error getting user dashboard route:', error);
      return '/app/student-dashboard';
    }
  };

  const navigateToDashboard = () => {
    router.navigate({ to: getUserDashboardRoute() });
  };

  const navigateToNeedRoom = () => {
    router.navigate({ to: '/app/need-room' });
  };

  return {
    navigateToRoommateHousing,
    navigateToDashboard,
    navigateToNeedRoom,
    navigateToRoomHousing,
  };
}
