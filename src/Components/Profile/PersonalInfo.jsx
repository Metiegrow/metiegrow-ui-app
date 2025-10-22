import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  ChevronRight,
  Building,
  CreditCard,
  FileText,
  X,
  Edit,
} from 'lucide-react';
import HouseImage from '../../assets/House.png';
import { Button, Input } from 'antd';
import {
  AccomodationDetailsIcon,
  Edit2Icon,
  EditIcon,
  JoIcon,
  Message3Icon,
  OtherPreferencesIcon,
  StudyInformationIcon,
  VisaDetailsIcon,
} from '../Common/SVG/svg.function';
import axios from 'axios';
import { getAuthHeaders, getAuthData } from '../Auth/Auth.Function';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';
import { Link } from '@tanstack/react-router';
import PassportImage from '../../assets/VisaDetails.png';
import ResumeImage from '../../assets/Resume.png';

const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

// Get user ID from auth data
const getUserId = () => {
  try {
    const authData = getAuthData();
    return authData?.userId || 1; // Fallback to 1 if not found
  } catch (error) {
    console.error('Error getting user ID:', error);
    return 1;
  }
};

// Get user type from auth data
const getUserType = () => {
  try {
    const authData = getAuthData();
    return authData?.user || 'student'; // Check for 'user' property, default to student if not found
  } catch (error) {
    console.error('Error getting user type:', error);
    return 'student'; // Default to student
  }
};

const apiClient = {
  // Study operations
  getStudyDetails: async () => {
    try {
      const userId = getUserId();
      const response = await axios.get(`${URL}/api/personal-info/${userId}/study`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching study details:', error);
      throw error;
    }
  },

  updateStudyDetails: async (studyData) => {
    try {
      const userId = getUserId();
      const response = await axios.post(`${URL}/api/personal-info/${userId}/study`, studyData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating study details:', error);
      throw error;
    }
  },

  // Visa operations
  getVisaDetails: async () => {
    try {
      const userId = getUserId();
      const response = await axios.get(`${URL}/api/personal-info/${userId}/visa`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching visa details:', error);
      throw error;
    }
  },

  updateVisaDetails: async (visaData) => {
    try {
      const userId = getUserId();
      const response = await axios.post(`${URL}/api/personal-info/${userId}/visa`, visaData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating visa details:', error);
      throw error;
    }
  },

  // Accommodation operations
  getAccommodationDetails: async () => {
    try {
      const userId = getUserId();
      const response = await axios.get(`${URL}/api/personal-info/${userId}/accommodation`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching accommodation details:', error);
      throw error;
    }
  },

  updateAccommodationDetails: async (accommodationData) => {
    try {
      const userId = getUserId();
      const response = await axios.post(
        `${URL}/api/personal-info/${userId}/accommodation`,
        accommodationData,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating accommodation details:', error);
      throw error;
    }
  },

  // Others operations
  getOthersDetails: async () => {
    try {
      const userId = getUserId();
      const response = await axios.get(`${URL}/api/personal-info/${userId}/others`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching others details:', error);
      throw error;
    }
  },

  updateOthersDetails: async (othersData) => {
    try {
      const userId = getUserId();
      const response = await axios.post(`${URL}/api/personal-info/${userId}/others`, othersData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating others details:', error);
      throw error;
    }
  },
};

// Date helpers: accept DD-MM-YYYY and YYYY-MM-DD
const parseDateFlexible = (value) => {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    return isNaN(dt.getTime()) ? null : dt;
  }
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [d, m, y] = value.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    return isNaN(dt.getTime()) ? null : dt;
  }
  return null;
};

const formatDate = (dateString) => {
  const dt = parseDateFlexible(dateString);
  if (!dt) return dateString || '';
  const day = String(dt.getUTCDate()).padStart(2, '0');
  const month = dt.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
  const year = dt.getUTCFullYear();
  return `${day} ${month} ${year}`;
};

const toBackendDDMMYYYY = (value) => {
  if (!value) return '';
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) return value;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [y, m, d] = value.split('-');
  return `${d}-${m}-${y}`;
};

// Format address for display
const formatAddressForDisplay = (addressData) => {
  if (!addressData) return '';
  const { doorStreet, town, city, state, country } = addressData;
  return [doorStreet, town, city, state, country].filter(Boolean).join(', ');
};

// ResumeUpload component for resume update functionality
function ResumeUpload({ othersInfo, onUpdateOthers }) {
  const userType = getUserType();

  if (userType !== 'student') {
    return (
      <div className='w-full max-w-md mx-auto mt-2 mb-8 text-center'>
        <p className='text-gray-400'>Resume upload is only available for student users.</p>
      </div>
    );
  }

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setResumeFile(file);
      handleUpload(file);
    } else {
      alert('Please upload a PDF or Word document.');
    }
  };

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      // Convert file to base64 or handle upload
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        const othersData = {
          resumeUrl: base64String,
          otherSupportNeeded: othersInfo?.otherSupportNeeded || '',
        };

        const response = await apiClient.updateOthersDetails(othersData);
        if (response) {
          onUpdateOthers(othersData);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to upload resume:', error);
      alert('Failed to upload resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='w-full max-w-md mx-auto mt-2 mb-8'>
      {/* Row: Resume title left, Update button right */}
      <div className='flex flex-row items-center justify-between mb-4 px-1'>
        <span className='text-base font-semibold text-white'>Resume</span>
        <button
          onClick={handleUploadClick}
          disabled={loading}
          className='text-purple-400 font-semibold text-sm hover:underline focus:outline-none bg-transparent border-none p-0 disabled:opacity-50'
          style={{ background: 'none', border: 'none' }}
        >
          {loading ? 'Uploading...' : resumeFile ? 'Update' : 'Update'}
        </button>
        <input
          type='file'
          accept='.pdf,.doc,.docx'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
        />
      </div>
      {/* Centered image */}
      <div className='flex flex-col items-center justify-center'>
        <img src={ResumeImage} alt='Resume Placeholder' className='w-36 h-36 object-contain mb-4' />
        {/* Centered status text */}
        <div className='mb-2 text-gray-400 text-center'>
          {loading
            ? 'Uploading...'
            : othersInfo?.resumeUrl
              ? 'Resume uploaded'
              : "Still you're not updated resume"}
        </div>
      </div>
    </div>
  );
}

export default function PersonalInfo() {
  // Get user type
  const userType = getUserType();

  // State for screen navigation (mobile)
  const [currentScreen, setCurrentScreen] = useState('myPersonalInfo');

  // State for study information
  const [studyInfo, setStudyInfo] = useState({
    course: '',
    universityName: '',
    intakeMonthYear: '',
    movedOn: '',
  });

  // State for form data (study info)
  const [formData, setFormData] = useState({
    course: '',
    universityName: '',
    intakeMonthYear: '',
    movedOn: '',
  });

  // State for popups
  const [showStudyInfoPopup, setShowStudyInfoPopup] = useState(false);

  // State for active tab (desktop)
  const [activeTab, setActiveTab] = useState('My Personal Info');

  // State for visa information
  const [visaInfo, setVisaInfo] = useState({
    visaType: '',
    validity: '',
    institutionDetails: '',
    city: '',
    state: '',
    country: '',
  });
  const [visaFormData, setVisaFormData] = useState({
    visaType: '',
    validity: '',
    institutionDetails: '',
    city: '',
    state: '',
    country: '',
  });
  const [showVisaPopup, setShowVisaPopup] = useState(false);

  // State for accommodation information
  const [accommodationInfo, setAccommodationInfo] = useState({
    doorStreet: '',
    town: '',
    city: '',
    state: '',
    country: '',
    needRoommate: false,
  });
  const [accommodationFormData, setAccommodationFormData] = useState({
    doorStreet: '',
    town: '',
    city: '',
    state: '',
    country: '',
    needRoommate: false,
  });
  const [showAccommodationPopup, setShowAccommodationPopup] = useState(false);
  const [isEditingAccommodation, setIsEditingAccommodation] = useState(false);

  // State for others information
  const [othersInfo, setOthersInfo] = useState({
    resumeUrl: '',
    otherSupportNeeded: '',
  });
  const [othersFormData, setOthersFormData] = useState({
    resumeUrl: '',
    otherSupportNeeded: '',
  });
  const [showOthersPopup, setShowOthersPopup] = useState(false);

  // Accommodation popup state
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for other preferences
  const [supportNeeded] = useState([
    'Networking with alumni',
    'Understanding city & local culture',
  ]);

  // State for location data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Navigation tabs (desktop) - conditionally include student-specific tabs
  const tabs = [
    'My Personal Info',
    'My Mentors',
    'My Alumni',
    'My Batchmates',
    'My Lawyers',
    ...(userType === 'student' ? ['My Roommates & Housing'] : []),
  ];

  // Location API functions
  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${URL}/api/locations/countries`, {
        headers: getAuthHeaders(),
      });
      setCountries(response.data || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Fallback to hardcoded countries
      setCountries([
        { id: 'AU', name: 'Australia' },
        { id: 'IN', name: 'India' },
        { id: 'US', name: 'USA' },
      ]);
    }
  };

  const fetchStates = async (countryId) => {
    if (!countryId) {
      setStates([]);
      return;
    }
    try {
      const response = await axios.get(`${URL}/api/locations/countries/${countryId}/states`, {
        headers: getAuthHeaders(),
      });
      setStates(response.data || []);
    } catch (error) {
      console.error('Error fetching states:', error);
      // Fallback based on country
      if (countryId === 'AU') {
        setStates([
          { id: 'VIC', name: 'Victoria' },
          { id: 'NSW', name: 'New South Wales' },
          { id: 'QLD', name: 'Queensland' },
        ]);
      } else if (countryId === 'IN') {
        setStates([
          { id: 'TN', name: 'Tamil Nadu' },
          { id: 'KA', name: 'Karnataka' },
          { id: 'MH', name: 'Maharashtra' },
        ]);
      } else {
        setStates([]);
      }
    }
  };

  const fetchCities = async (stateId) => {
    if (!stateId) {
      setCities([]);
      return;
    }
    try {
      const response = await axios.get(`${URL}/api/locations/states/${stateId}/cities`, {
        headers: getAuthHeaders(),
      });
      setCities(response.data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      // Fallback based on state
      if (stateId === 'VIC') {
        setCities([
          { id: 'MEL', name: 'Melbourne' },
          { id: 'GEEL', name: 'Geelong' },
        ]);
      } else if (stateId === 'NSW') {
        setCities([
          { id: 'SYD', name: 'Sydney' },
          { id: 'NEW', name: 'Newcastle' },
        ]);
      } else if (stateId === 'TN') {
        setCities([
          { id: 'CHE', name: 'Chennai' },
          { id: 'MAD', name: 'Madurai' },
        ]);
      } else {
        setCities([]);
      }
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Only fetch student-specific data for students
        const fetchPromises = [fetchCountries()];

        if (userType === 'student') {
          fetchPromises.push(
            fetchStudyDetails(),
            fetchVisaDetails(),
            fetchAccommodationDetails(),
            fetchOthersDetails()
          );
        }

        await Promise.all(fetchPromises);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userType]);

  // Fetch study details from API
  const fetchStudyDetails = async () => {
    try {
      const data = await apiClient.getStudyDetails();
      setStudyInfo({
        course: data.course || '',
        universityName: data.universityName || '',
        intakeMonthYear: data.intakeMonthYear || '',
        movedOn: data.movedOn || '',
      });
    } catch (error) {
      // Don't throw error for study details, just log it
      console.error('Failed to fetch study details:', error);
    }
  };

  // Fetch visa details from API
  const fetchVisaDetails = async () => {
    try {
      const data = await apiClient.getVisaDetails();
      setVisaInfo({
        visaType: data.visaType || '',
        validity: data.validity || '',
        institutionDetails: data.institutionDetails || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
      });
    } catch (error) {
      // Don't throw error for visa details, just log it
      console.error('Failed to fetch visa details:', error);
    }
  };

  // Fetch accommodation details from API
  const fetchAccommodationDetails = async () => {
    try {
      const data = await apiClient.getAccommodationDetails();
      setAccommodationInfo({
        doorStreet: data.doorStreet || '',
        town: data.town || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
        needRoommate: data.needRoommate || false,
      });
    } catch (error) {
      // Don't throw error for accommodation details, just log it
      console.error('Failed to fetch accommodation details:', error);
    }
  };

  // Fetch others details from API
  const fetchOthersDetails = async () => {
    try {
      const data = await apiClient.getOthersDetails();
      setOthersInfo({
        resumeUrl: data.resumeUrl || '',
        otherSupportNeeded: data.otherSupportNeeded || '',
      });
    } catch (error) {
      // Don't throw error for others details, just log it
      console.error('Failed to fetch others details:', error);
    }
  };

  // No legacy address fetch; using accommodation endpoints

  // Mobile navigation
  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  // Handle form change (study info)
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle study info submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const studyData = {
        course: formData.course || studyInfo.course,
        universityName: formData.universityName || studyInfo.universityName,
        intakeMonthYear: formData.intakeMonthYear || studyInfo.intakeMonthYear,
        movedOn: toBackendDDMMYYYY(formData.movedOn) || studyInfo.movedOn,
      };

      const response = await apiClient.updateStudyDetails(studyData);

      if (response === 'Study Info saved' || !response.error) {
        setStudyInfo(studyData);
        setShowStudyInfoPopup(false);
        setFormData({
          course: '',
          universityName: '',
          intakeMonthYear: '',
          movedOn: '',
        });
        setError(null);
      } else {
        setError('Failed to update study details');
      }
    } catch (error) {
      setError('Failed to update study details');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit study info
  const handleEditStudyInfo = () => {
    setFormData({
      course: studyInfo.course,
      universityName: studyInfo.universityName,
      intakeMonthYear: studyInfo.intakeMonthYear,
      movedOn: studyInfo.movedOn,
    });
    setShowStudyInfoPopup(true);
  };

  // Handle accommodation form change
  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setAccommodationFormData({
      ...accommodationFormData,
      [name]: newValue,
    });

    // Handle cascading updates for location
    if (name === 'country') {
      setAccommodationFormData((prev) => ({
        ...prev,
        country: newValue,
        state: '',
        city: '',
      }));
      fetchStates(newValue);
      setCities([]);
    } else if (name === 'state') {
      setAccommodationFormData((prev) => ({
        ...prev,
        state: newValue,
        city: '',
      }));
      fetchCities(newValue);
    }
  };

  // Handle visa form change with cascading updates
  const handleVisaFormChange = (e) => {
    const { name, value } = e.target;

    setVisaFormData({
      ...visaFormData,
      [name]: value,
    });

    // Handle cascading updates for location
    if (name === 'country') {
      setVisaFormData((prev) => ({
        ...prev,
        country: value,
        state: '',
        city: '',
      }));
      fetchStates(value);
      setCities([]);
    } else if (name === 'state') {
      setVisaFormData((prev) => ({
        ...prev,
        state: value,
        city: '',
      }));
      fetchCities(value);
    }
  };

  // Handle save address
  const handleSaveAddress = async () => {
    if (!accommodationFormData.country) {
      setError('Country is required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.updateAccommodationDetails(accommodationFormData);
      if (response === 'Accommodation saved' || !response.error) {
        setAccommodationInfo(accommodationFormData);
        setShowAddressPopup(false);
        setIsEditingAddress(false);
        setError(null);
      } else {
        setError('Failed to save accommodation');
      }
    } catch (error) {
      setError('Failed to save accommodation');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add/edit address
  const handleDesktopAddAddress = () => {
    if (accommodationInfo && (accommodationInfo.doorStreet || accommodationInfo.city)) {
      setIsEditingAddress(true);
      setAccommodationFormData({
        doorStreet: accommodationInfo.doorStreet || '',
        town: accommodationInfo.town || '',
        city: accommodationInfo.city || '',
        state: accommodationInfo.state || '',
        country: accommodationInfo.country || '',
        needRoommate: !!accommodationInfo.needRoommate,
      });
    } else {
      setIsEditingAddress(false);
      setAccommodationFormData({
        doorStreet: '',
        town: '',
        city: '',
        state: '',
        country: '',
        needRoommate: false,
      });
    }
    setShowAddressPopup(true);
  };

  // Render mobile screens
  const renderMobileScreen = () => {
    if (isLoading) return <div className='p-4 text-center'>Loading...</div>;
    if (error) return <div className='p-4 text-red-500'>{error}</div>;

    switch (currentScreen) {
      case 'myPersonalInfo':
        return <MyPersonalInfo onNavigate={navigateTo} />;
      case 'studyInformation':
        return userType === 'student' ? (
          <StudyInformation
            onNavigate={navigateTo}
            studyInfo={studyInfo}
            onEdit={handleEditStudyInfo}
          />
        ) : (
          <MyPersonalInfo onNavigate={navigateTo} />
        );
      case 'accommodationDetails':
        return userType === 'student' ? (
          <AccommodationDetails
            onNavigate={navigateTo}
            address={formatAddressForDisplay(accommodationInfo)}
            onAddAddress={() => {
              setIsEditingAddress(false);
              navigateTo('addAddress');
            }}
            onEditAddress={() => {
              setIsEditingAddress(true);
              navigateTo('addAddress');
            }}
          />
        ) : (
          <MyPersonalInfo onNavigate={navigateTo} />
        );
      case 'addAddress':
        return userType === 'student' ? (
          <AddAddress
            onNavigate={navigateTo}
            onSaveAddress={handleSaveAddress}
            formData={accommodationFormData}
            onChange={handleChange}
            isEditing={isEditingAddress}
            isLoading={isLoading}
            error={error}
            countries={countries}
            states={states}
            cities={cities}
            onCountryChange={(countryId) => {
              fetchStates(countryId);
              setAccommodationFormData((prev) => ({
                ...prev,
                state: '',
                city: '',
              }));
            }}
            onStateChange={(stateId) => {
              fetchCities(stateId);
              setAccommodationFormData((prev) => ({
                ...prev,
                city: '',
              }));
            }}
          />
        ) : (
          <MyPersonalInfo onNavigate={navigateTo} />
        );
      case 'otherPreference':
        return userType === 'student' ? (
          <OtherPreference
            onNavigate={navigateTo}
            supportNeeded={supportNeeded}
            othersInfo={othersInfo}
            onUpdateOthers={setOthersInfo}
          />
        ) : (
          <MyPersonalInfo onNavigate={navigateTo} />
        );
      case 'visaDetails':
        return userType === 'student' ? (
          <VisaDetails onNavigate={navigateTo} />
        ) : (
          <MyPersonalInfo onNavigate={navigateTo} />
        );
      default:
        return <MyPersonalInfo onNavigate={navigateTo} />;
    }
  };

  // Render desktop view
  const cardClass =
    'border border-[#323232] rounded-[2rem] p-8 mt-2 relative bg-[#181818] min-h-[300px]';
  const renderDesktopView = () => (
    <div className='p-6 mx-5 bg-[#131313] min-h-screen'>
      {/* Tab Navigation */}
      <div className='flex gap-2 mb-8'>
        {tabs.map((tab) => (
          <a
            key={tab}
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
              activeTab === tab
                ? 'bg-purple-600 text-white'
                : 'bg-[#23232b] text-[#979797] hover:bg-[#23232b]'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </a>
        ))}
      </div>

      {/* 2x2 Grid for Main Info */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'>
        {/* Study Information - Only for students */}
        {userType === 'student' && (
          <div className='flex flex-col h-full'>
            <h2 className='text-xl font-bold mb-4'>Study Information</h2>
            <div
              className={`${cardClass} flex-1 flex flex-col justify-between`}
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
            >
              <a
                onClick={handleEditStudyInfo}
                className='absolute top-6 right-6 bg-[#232323] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#333]'
                aria-label='Edit study info'
              >
                <EditIcon size={28} className='text-white' />
              </a>
              <h3 className='text-3xl font-bold mb-4'>{studyInfo.course}</h3>
              <div className='flex items-center gap-4 mb-2'>
                <span className='text-green-400 text-2xl font-semibold'>
                  {studyInfo.intakeMonthYear}
                </span>
                <span className='text-white text-xl'>{studyInfo.universityName}</span>
              </div>
              <p className='text-gray-200 text-lg mt-2'>
                Moved on : {formatDate(studyInfo.movedOn)}
              </p>
            </div>
          </div>
        )}

        {/* Accommodation Details - Only for students */}
        {userType === 'student' && (
          <div className='flex flex-col h-full'>
            <h2 className='text-xl font-bold mb-4'>Accommodation Details</h2>
            <div
              className={`${cardClass} flex-1 flex flex-col justify-between`}
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
            >
              <a
                onClick={handleDesktopAddAddress}
                className='absolute top-6 right-6 bg-[#232323] rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#333]'
                aria-label='Edit address'
              >
                <Edit2Icon size={28} className='text-white' />
              </a>
              {accommodationInfo && (accommodationInfo.doorStreet || accommodationInfo.city) ? (
                <>
                  <h3 className='text-lg font-bold mb-2'>Address</h3>
                  <p className='text-gray-300 text-xl'>
                    {formatAddressForDisplay(accommodationInfo)}
                  </p>
                </>
              ) : (
                <>
                  <div className='flex flex-col items-center justify-center'>
                    <img
                      src={HouseImage}
                      className='w-20 h-20 object-contain mb-1'
                      alt='Find room'
                    />
                    <p className='mt-4 text-center text-gray-300 text-lg'>
                      Still you're not added any address
                    </p>
                    <a
                      className='w-full text-purple-500 text-center cursor-pointer mt-2'
                      onClick={handleDesktopAddAddress}
                    >
                      +Add Address
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Visa Information - Only for students */}
        {userType === 'student' && (
          <div className='flex flex-col h-full'>
            <h2 className='text-xl font-bold mb-4'>Visa Information</h2>
            <div
              className={`${cardClass} flex-1 flex flex-col justify-between`}
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
            >
              <a
                onClick={() => setShowVisaPopup(true)}
                className='absolute top-6 right-6 bg-[#232323] rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#333]'
                aria-label='Edit visa info'
              >
                <EditIcon size={28} className='text-white' />
              </a>
              {visaInfo.visaType ? (
                <>
                  <h3 className='text-lg font-bold mb-2'>{visaInfo.visaType}</h3>
                  <p className='text-green-400 text-xl mb-1'>{formatDate(visaInfo.validity)}</p>
                  <p className='text-gray-300 text-xl mb-2'>{visaInfo.institutionDetails}</p>
                  <p className='text-gray-200 text-lg mt-2'>
                    {visaInfo.city}, {visaInfo.state}, {visaInfo.country}
                  </p>
                </>
              ) : (
                <>
                  <div className='flex flex-col items-center justify-center'>
                    <img src={PassportImage} className='w-20 h-20 object-contain mb-1' alt='Visa' />
                    <p className='mt-4 text-center text-gray-300 text-lg'>
                      Still you're not added visa information
                    </p>
                    <a
                      className='w-full text-purple-500 text-center cursor-pointer mt-2'
                      onClick={() => setShowVisaPopup(true)}
                    >
                      +Add Visa Info
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Other Information (Resume) - Only for students */}
        {userType === 'student' && (
          <div className='flex flex-col h-full'>
            <h2 className='text-xl font-bold mb-4'>Other Information</h2>
            <div
              className={`${cardClass} flex-1 flex flex-col items-center justify-center h-full`}
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
            >
              <div className='flex flex-col items-center justify-center h-full w-full text-center'>
                <ResumeUpload othersInfo={othersInfo} onUpdateOthers={setOthersInfo} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Other Preference Section - Only for students */}
      {userType === 'student' && (
        <div className='mt-8'>
          <h2 className='text-lg font-semibold mb-2'>Other Preference</h2>
          <div className='flex flex-wrap gap-2'>
            {supportNeeded.map((item, idx) => (
              <span
                className='px-4 py-2 rounded-full border border-gray-700 text-gray-300'
                key={idx}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Mobile view (below 768px) */}
      <div className='block md:hidden'>{renderMobileScreen()}</div>

      {/* Desktop view (768px and above) */}
      <div className='hidden md:block'>{renderDesktopView()}</div>

      {/* Visa Information Popup */}
      {showVisaPopup && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-black p-6 rounded-lg w-full max-w-xl relative mx-4'>
            <a
              className='absolute top-4 right-4 text-gray-500 hover:text-white'
              onClick={() => setShowVisaPopup(false)}
            >
              <X size={20} />
            </a>
            <h2 className='text-xl font-bold mb-6'>Visa Information</h2>

            <div>
              <div className='mb-4'>
                <label className='block mb-2'>
                  Visa Type <span className='text-red-500'>*</span>
                </label>
                <Input
                  type='text'
                  name='visaType'
                  placeholder='Enter Visa Type'
                  value={visaFormData.visaType}
                  onChange={(e) => setVisaFormData({ ...visaFormData, visaType: e.target.value })}
                  className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white'
                />
              </div>

              <div className='mb-4'>
                <label className='block mb-2'>
                  Validity <span className='text-red-500'>*</span>
                </label>
                <Input
                  type='date'
                  name='validity'
                  value={visaFormData.validity}
                  onChange={(e) => setVisaFormData({ ...visaFormData, validity: e.target.value })}
                  className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white'
                />
              </div>

              <div className='mb-4'>
                <label className='block mb-2'>
                  Institution Details <span className='text-red-500'>*</span>
                </label>
                <Input
                  type='text'
                  name='institutionDetails'
                  placeholder='Enter Institution Details'
                  value={visaFormData.institutionDetails}
                  onChange={(e) =>
                    setVisaFormData({ ...visaFormData, institutionDetails: e.target.value })
                  }
                  className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white'
                />
              </div>

              <div className='mb-4 grid grid-cols-2 gap-4'>
                <div>
                  <label className='block mb-2'>City</label>
                  <div className='relative'>
                    <select
                      name='city'
                      value={visaFormData.city}
                      onChange={handleVisaFormChange}
                      className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white appearance-none'
                    >
                      <option value=''>Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                      <svg
                        className='w-4 h-4 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 9l-7 7-7-7'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className='block mb-2'>State</label>
                  <div className='relative'>
                    <select
                      name='state'
                      value={visaFormData.state}
                      onChange={handleVisaFormChange}
                      className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white appearance-none'
                    >
                      <option value=''>Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                      <svg
                        className='w-4 h-4 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 9l-7 7-7-7'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mb-4'>
                <label className='block mb-2'>
                  Country <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <select
                    name='country'
                    value={visaFormData.country}
                    onChange={handleVisaFormChange}
                    className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white appearance-none'
                  >
                    <option value=''>Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className='flex justify-end gap-2 mt-6'>
                <Button
                  type='button'
                  onClick={() => setShowVisaPopup(false)}
                  className='px-6 py-2 rounded-lg bg-gray-700 text-white'
                >
                  Cancel
                </Button>
                <Button
                  type='button'
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      const payload = {
                        ...visaFormData,
                        validity: toBackendDDMMYYYY(visaFormData.validity),
                      };
                      const response = await apiClient.updateVisaDetails(payload);
                      if (response === 'Visa saved' || !response.error) {
                        setVisaInfo(payload);
                        setShowVisaPopup(false);
                        setVisaFormData({
                          visaType: '',
                          validity: '',
                          institutionDetails: '',
                          city: '',
                          state: '',
                          country: '',
                        });
                        setError(null);
                      } else {
                        setError('Failed to update visa details');
                      }
                    } catch (error) {
                      setError('Failed to update visa details');
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={isLoading}
                  className='px-6 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50'
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Information Popup */}
      {showStudyInfoPopup && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-black p-6 rounded-lg w-full max-w-xl relative mx-4'>
            <a
              className='absolute top-4 right-4 text-gray-500 hover:text-white'
              onClick={() => setShowStudyInfoPopup(false)}
            >
              <X size={20} />
            </a>
            <h2 className='text-xl font-bold mb-6'>Study Information</h2>

            <div>
              <div className='mb-4'>
                <label className='block mb-2'>
                  Education <span className='text-red-500'>*</span>
                </label>
                <Input
                  type='text'
                  name='course'
                  placeholder='Enter Degree'
                  value={formData.course}
                  onChange={handleFormChange}
                  className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white'
                />
              </div>

              <div className='mb-4 grid grid-cols-2 gap-4'>
                <div>
                  <label className='block mb-2'>
                    Intake Month/Year <span className='text-red-500'>*</span>
                  </label>
                  <Input
                    type='text'
                    name='intakeMonthYear'
                    placeholder='MM/YYYY'
                    value={formData.intakeMonthYear}
                    onChange={handleFormChange}
                    className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white'
                  />
                </div>
                <div>
                  <label className='block mb-2'>
                    University <span className='text-red-500'>*</span>
                  </label>
                  <Input
                    type='text'
                    name='universityName'
                    placeholder='Enter University Name'
                    value={formData.universityName}
                    onChange={handleFormChange}
                    className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white'
                  />
                </div>
              </div>

              <div className='mb-4'>
                <label className='block mb-2'>
                  Moved On <span className='text-red-500'>*</span>
                </label>
                <Input
                  type='date'
                  name='movedOn'
                  placeholder='DD-MM-YYYY'
                  value={formData.movedOn}
                  onChange={handleFormChange}
                  className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white'
                />
              </div>

              <div className='flex justify-end gap-2 mt-6'>
                <Button
                  type='button'
                  onClick={() => setShowStudyInfoPopup(false)}
                  className='px-6 py-2 rounded-lg bg-gray-700 text-white'
                >
                  Cancel
                </Button>
                <Button
                  type='button'
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className='px-6 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50'
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accommodation Details Popup */}
      {showAddressPopup && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-black w-full h-[100dvh] sm:h-auto p-4 sm:p-6 rounded-none sm:rounded-lg mx-0 sm:mx-4 relative max-w-none sm:max-w-md'>
            {/* <a
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
              onClick={() => setShowAddressPopup(false)}
            >
              <X size={20} />
            </a> */}
            <div className='sm:hidden flex items-center gap-2 mb-4'>
              <button
                onClick={() => setShowAddressPopup(false)}
                className='appearance-none bg-transparent border-none p-0 m-0 focus:outline-none'
              >
                <BackButtonIcon className='w-5 h-5' />
              </button>
              <span className='text-lg font-semibold text-white'>Add Address</span>
            </div>

            <div className='hidden sm:flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold'>Accommodation Details</h2>
              <button
                onClick={() => setShowAddressPopup(false)}
                className='appearance-none bg-transparent border-none p-0 m-0 focus:outline-none'
              >
                <ModalCloseIcon className='w-6 h-6 text-gray-500 hover:text-white' />
              </button>
            </div>

            <div>
              <div className='mb-4'>
                <label className='block mb-2'>Door No/ Street Name</label>
                <Input
                  type='text'
                  name='doorStreet'
                  placeholder='Enter Address'
                  value={accommodationFormData.doorStreet}
                  onChange={handleAddressFormChange}
                  className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white placeholder-gray-500'
                />
              </div>

              <div className='mb-4 grid grid-cols-2 gap-4'>
                <div>
                  <label className='block mb-2'>Locality/Town</label>
                  <Input
                    type='text'
                    name='town'
                    placeholder='Enter Town Name'
                    value={accommodationFormData.town}
                    onChange={handleAddressFormChange}
                    className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block mb-2'>City</label>
                  <Input
                    type='text'
                    name='city'
                    placeholder='Enter City'
                    value={accommodationFormData.city}
                    onChange={handleAddressFormChange}
                    className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white placeholder-gray-500'
                  />
                </div>
              </div>

              <div className='mb-4 grid grid-cols-2 gap-4'>
                <div>
                  <label className='block mb-2'>State</label>
                  <div className='relative'>
                    <select
                      name='state'
                      value={accommodationFormData.state}
                      onChange={handleAddressFormChange}
                      className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white appearance-none placeholder-gray-500'
                    >
                      <option value=''>Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                      <svg
                        className='w-4 h-4 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 9l-7 7-7-7'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className='block mb-2'>
                    Country <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <select
                      name='country'
                      value={accommodationFormData.country}
                      onChange={handleAddressFormChange}
                      className='w-full px-4 py-2 rounded-full bg-black border border-gray-700 text-white appearance-none placeholder-gray-500'
                    >
                      <option value=''>Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                      <svg
                        className='w-4 h-4 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 9l-7 7-7-7'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

              {/* <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddressPopup(false)}
                  className="px-6 py-2 rounded-lg bg-gray-700 text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAddress}
                  disabled={isLoading}
                  className="px-6 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div> */}
              <div className='sm:flex justify-end gap-2 mt-6 sm:mt-4 sm:static fixed bottom-0 left-0 w-full p-4 bg-black z-50'>
                {/* Cancel Button – visible only on desktop */}
                <button
                  type='button'
                  onClick={() => setShowAddressPopup(false)}
                  className='hidden sm:block px-6 py-2 rounded-lg bg-gray-700 text-white'
                >
                  Cancel
                </button>

                {/* Save Button – full width on mobile, normal on desktop */}
                <button
                  type='button'
                  onClick={handleSaveAddress}
                  disabled={isLoading}
                  className='w-full sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white disabled:opacity-50'
                >
                  {isLoading ? (
                    'Saving...'
                  ) : (
                    <>
                      <span className='hidden sm:inline'>Save</span>
                      <span className='inline sm:hidden'>Confirm</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Components
function Header({ title, onBack, showMoreOptions = true, onEdit }) {
  return (
    <div className='flex items-center justify-between px-4 py-6 mt-10'>
      {/* Back button */}
      <Link
        onClick={onBack}
        className='rounded-full bg-[#232323] w-10 h-10 flex items-center justify-center mr-2'
      >
        <BackButtonIcon className='w-5 h-5' />
      </Link>
      {/* Title */}
      <h1 className='flex-1 text-start font-medium text-xl'>{title}</h1>
      {/* Edit/More icon */}
      {showMoreOptions && (
        <Link
          onClick={onEdit}
          className='rounded-full w-10 h-10 flex items-center justify-start ml-2 block max-[750px]:block hidden'
        >
          <Message3Icon className='w-5 h-5' />
        </Link>
      )}
    </div>
  );
}

function MyPersonalInfo({ onNavigate }) {
  const userType = getUserType();

  const menuItems = [
    ...(userType === 'student'
      ? [
          {
            id: 'studyInformation',
            title: 'Study Information',
            icon: <StudyInformationIcon className='w-6 h-6 mr-3' />,
            hasArrow: true,
          },
        ]
      : []),
    ...(userType === 'student'
      ? [
          {
            id: 'accommodationDetails',
            title: 'Accommodation Details',
            icon: <AccomodationDetailsIcon className='w-6 h-6 mr-3' />,
            hasArrow: true,
          },
        ]
      : []),
    ...(userType === 'student'
      ? [
          {
            id: 'visaDetails',
            title: 'Visa Details',
            icon: <VisaDetailsIcon className='w-6 h-6 mr-3' />,
            hasArrow: true,
          },
        ]
      : []),
    ...(userType === 'student'
      ? [
          {
            id: 'otherPreference',
            title: 'Others',
            icon: <OtherPreferencesIcon className='w-6 h-6 mr-3' />,
            hasArrow: true,
          },
        ]
      : []),
  ];

  return (
    <>
      <Header title='My Personal Info' onBack={() => {}} />
      <div className='px-4 py-4'>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className='flex items-center justify-between w-full py-4 border-b border-gray-800 text-white bg-black hover:bg-gray-800 rounded-lg mb-4'
          >
            <div className='flex items-center gap-3'>
              {item.icon}
              <span>{item.title}</span>
            </div>
            {item.hasArrow && <ChevronRight className='w-5 h-5 text-gray-400' />}
          </Link>
        ))}
      </div>
    </>
  );
}

function StudyInformation({ onNavigate, studyInfo, onEdit }) {
  const userType = getUserType();

  if (userType !== 'student') {
    return (
      <div className='min-h-screen bg-black text-white flex flex-col justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>Access Restricted</h2>
          <p className='text-gray-400'>This section is only available for student users.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        title='Study Information'
        onBack={() => onNavigate('myPersonalInfo')}
        showMoreOptions={true}
        onEdit={onEdit}
      />
      <div className='px-4 py-6'>
        <div className='mb-4'>
          <h2 className='text-xl font-medium'>{studyInfo.course}</h2>
        </div>
        <p className='text-green-400 mt-2'>{studyInfo.intakeMonthYear}</p>
        <p className='text-gray-400'>{studyInfo.universityName}</p>
        <p className='text-gray-400 mt-4'>Moved on: {formatDate(studyInfo.movedOn)}</p>
      </div>
    </>
  );
}

function AccommodationDetails({ onNavigate, address, onAddAddress, onEditAddress }) {
  const userType = getUserType();

  if (userType !== 'student') {
    return (
      <div className='min-h-screen bg-black text-white flex flex-col justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>Access Restricted</h2>
          <p className='text-gray-400'>This section is only available for student users.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header title='Accommodation Details' onBack={() => onNavigate('myPersonalInfo')} />
      <div className='flex flex-col items-center justify-center px-4 py-8'>
        {!address ? (
          <>
            <div className='my-8'>
              <div className=' '>
                <img src={HouseImage} className='w-12 h-12 object-contain mb-1' alt='Find room' />
              </div>
            </div>
            <p className='text-center text-gray-300 mb-8'>Still you're not added any address</p>
            <button
              onClick={onAddAddress}
              className='w-full bg-purple-500 text-white py-4 rounded-full font-medium'
            >
              Add Address
            </button>
          </>
        ) : (
          <>
            <div className='flex items-center w-full mb-8'>
              <Building className='w-6 h-6 mr-3' />
              <p className='text-gray-200'>{address}</p>
            </div>
            <div className='w-full bg-yellow-400 rounded-xl p-4 flex items-center'>
              <div className='flex-shrink-0 mr-4'>
                <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center'>
                  <span className='text-xs text-white'>Roommates</span>
                </div>
              </div>
              <div className='flex-grow'>
                <h3 className='font-medium text-black'>Need Roommate</h3>
                <p className='text-black text-sm'>for your room</p>
                <button className='bg-black text-white rounded-full px-4 py-2 mt-2 text-sm flex items-center'>
                  Post Requirement
                  <ChevronRight className='w-4 h-4 ml-1' />
                </button>
              </div>
            </div>
            <button
              onClick={onEditAddress}
              className='w-full bg-purple-500 text-white py-4 rounded-full font-medium mt-6'
            >
              Edit Address
            </button>
          </>
        )}
      </div>
    </>
  );
}

function AddAddress({
  onNavigate,
  onSaveAddress,
  formData,
  onChange,
  isEditing,
  isLoading,
  error,
  countries = [],
  states = [],
  cities = [],
  onCountryChange,
  onStateChange,
}) {
  const userType = getUserType();

  if (userType !== 'student') {
    return (
      <div className='min-h-screen bg-black text-white flex flex-col justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>Access Restricted</h2>
          <p className='text-gray-400'>This section is only available for student users.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveAddress();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(e);

    // Handle cascading updates
    if (name === 'country' && onCountryChange) {
      onCountryChange(value);
    } else if (name === 'state' && onStateChange) {
      onStateChange(value);
    }
  };

  return (
    <>
      <Header
        title={isEditing ? 'Edit Address' : 'Add Address'}
        onBack={() => onNavigate('accommodationDetails')}
        showMoreOptions={false}
      />
      <form onSubmit={handleSubmit} className='px-4 py-6 space-y-6'>
        <div className='space-y-2'>
          <label className='block text-sm text-gray-400'>Door No/ Street Name</label>
          <input
            type='text'
            name='doorStreet'
            value={formData.doorStreet}
            onChange={onChange}
            placeholder='Enter Value'
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white focus:outline-none focus:border-purple-500'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm text-gray-400'>Locality/Town</label>
          <input
            type='text'
            name='town'
            value={formData.town}
            onChange={onChange}
            placeholder='Enter Town Name'
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white focus:outline-none focus:border-purple-500'
          />
        </div>

        <div className='flex space-x-4'>
          <div className='space-y-2 w-1/2'>
            <label className='block text-sm text-gray-400'>City</label>
            <select
              name='city'
              value={formData.city}
              onChange={handleChange}
              className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none'
            >
              <option value=''>Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-2 w-1/2'>
            <label className='block text-sm text-gray-400'>State</label>
            <select
              name='state'
              value={formData.state}
              onChange={handleChange}
              className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none'
            >
              <option value=''>Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='space-y-2'>
          <label className='block text-sm text-gray-400'>
            Country <span className='text-red-500'>*</span>
          </label>
          <select
            name='country'
            value={formData.country}
            onChange={handleChange}
            required
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none'
          >
            <option value=''>Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <div className='flex items-center gap-2'>
          <input
            id='needRoommate'
            type='checkbox'
            name='needRoommate'
            checked={!!formData.needRoommate}
            onChange={onChange}
            className='h-4 w-4 rounded border-gray-700'
          />
          <label htmlFor='needRoommate' className='text-sm text-gray-300'>
            Need Roommate
          </label>
        </div>

        <div className='pt-6'>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-purple-500 text-white py-4 rounded-full font-medium disabled:opacity-50'
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Address' : 'Submit Address'}
          </button>
        </div>
      </form>
    </>
  );
}

function OtherPreference({ onNavigate, supportNeeded, othersInfo, onUpdateOthers }) {
  const userType = getUserType();

  if (userType !== 'student') {
    return (
      <div className='min-h-screen bg-black text-white flex flex-col justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>Access Restricted</h2>
          <p className='text-gray-400'>This section is only available for student users.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header title='Other Preference' onBack={() => onNavigate('myPersonalInfo')} />
      <div className='px-4 py-6'>
        <ResumeUpload othersInfo={othersInfo} onUpdateOthers={onUpdateOthers} />
        <h2 className='text-lg font-medium mb-4 mt-8'>Other Support Needed</h2>
        <div className='flex flex-wrap gap-2'>
          {supportNeeded.map((preference, index) => (
            <div
              key={index}
              className='bg-transparent border border-gray-700 rounded-full px-4 py-2 text-gray-300'
            >
              {preference}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function VisaForm({
  onBack,
  onSubmit,
  loading,
  countries = [],
  states = [],
  cities = [],
  onCountryChange,
  onStateChange,
}) {
  const userType = getUserType();

  if (userType !== 'student') {
    return (
      <div className='min-h-screen bg-black text-white flex flex-col justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>Access Restricted</h2>
          <p className='text-gray-400'>This section is only available for student users.</p>
        </div>
      </div>
    );
  }

  const [form, setForm] = useState({
    visaType: '',
    validity: '',
    institutionDetails: '',
    city: '',
    state: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Handle cascading updates
    if (name === 'country' && onCountryChange) {
      onCountryChange(value);
    } else if (name === 'state' && onStateChange) {
      onStateChange(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.country) return; // country required
    onSubmit(form);
  };

  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      {/* Header */}
      <div className='flex items-center px-4 pt-8 pb-4'>
        <button
          onClick={onBack}
          className='rounded-full bg-[#232323] w-10 h-10 flex items-center justify-center'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path d='M15 19l-7-7 7-7' />
          </svg>
        </button>
        <h1 className='flex-1 text-center font-bold text-xl -ml-10'>Visa Information</h1>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className='flex-1 flex flex-col gap-4 px-6'>
        <div>
          <label className='block mb-1'>Visa Type</label>
          <Input
            name='visaType'
            value={form.visaType}
            onChange={handleChange}
            placeholder='Enter Value'
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
          />
        </div>
        <div>
          <label className='block mb-1'>Validity</label>
          <Input
            name='validity'
            type='date'
            value={form.validity}
            onChange={handleChange}
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
          />
        </div>
        <div>
          <label className='block mb-1'>Institution Details</label>
          <Input
            name='institutionDetails'
            value={form.institutionDetails}
            onChange={handleChange}
            placeholder='Enter Institution Details'
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
          />
        </div>
        <div className='flex gap-2'>
          <div className='flex-1'>
            <label className='block mb-1'>City</label>
            <select
              name='city'
              value={form.city}
              onChange={handleChange}
              className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
            >
              <option value=''>Select city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex-1'>
            <label className='block mb-1'>State</label>
            <select
              name='state'
              value={form.state}
              onChange={handleChange}
              className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
            >
              <option value=''>Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className='block mb-1'>
            Country <span className='text-red-500'>*</span>
          </label>
          <select
            name='country'
            value={form.country}
            onChange={handleChange}
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
          >
            <option value=''>Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type='submit'
          disabled={loading}
          className='mt-8 w-full bg-[#B16CFE] text-white font-semibold py-4 rounded-full text-lg shadow-lg disabled:opacity-50'
        >
          {loading ? 'Saving...' : 'Confirm'}
        </button>
      </form>
    </div>
  );
}

function VisaDetails({ onNavigate }) {
  const userType = getUserType();
  const [showForm, setShowForm] = useState(false);
  const [visaInfo, setVisaInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch visa details from API - only for students
  const fetchVisaInfo = async () => {
    if (userType !== 'student') return;

    try {
      const data = await apiClient.getVisaDetails();
      setVisaInfo(data);
    } catch (error) {
      console.error('Failed to fetch visa details:', error);
      setVisaInfo(null);
    }
  };

  useEffect(() => {
    fetchVisaInfo();
  }, [userType]);

  // POST to API - only for students
  const handleVisaSubmit = async (form) => {
    if (userType !== 'student') return;

    setLoading(true);
    try {
      const response = await apiClient.updateVisaDetails(form);
      if (response === 'Visa saved' || !response.error) {
        setVisaInfo(form);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to save visa details:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasVisaDetails = visaInfo && Object.keys(visaInfo).length > 0;

  if (showForm) {
    return (
      <VisaForm
        onBack={() => setShowForm(false)}
        onSubmit={handleVisaSubmit}
        loading={loading}
        countries={countries}
        states={states}
        cities={cities}
        onCountryChange={(countryId) => {
          fetchStates(countryId);
          setCities([]);
        }}
        onStateChange={(stateId) => {
          fetchCities(stateId);
        }}
      />
    );
  }

  if (userType !== 'student') {
    return (
      <div className='min-h-screen bg-black text-white flex flex-col justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>Access Restricted</h2>
          <p className='text-gray-400'>This section is only available for student users.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white flex flex-col justify-between'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 pt-8 pb-4'>
        <Link onClick={() => onNavigate('myPersonalInfo')} className=''>
          <BackButtonIcon className='w-5 h-5' />
        </Link>
        <h1 className='flex-1 text-center font-bold text-xl -ml-10'>Visa Information</h1>
        <button className='rounded-full bg-[#232323] w-10 h-10 flex items-center justify-center'>
          <svg
            width='24'
            height='24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-more-vertical'
          >
            <circle cx='12' cy='12' r='1' />
            <circle cx='12' cy='5' r='1' />
            <circle cx='12' cy='19' r='1' />
          </svg>
        </button>
      </div>
      {/* Content */}
      <div className='flex flex-col items-center justify-center flex-1'>
        {!hasVisaDetails ? (
          <>
            <img src={PassportImage} alt='Visa' className='w-36 h-36 mb-4' />
            <p className='text-center text-gray-400 mb-8'>
              Still you're not added visa information
            </p>
            <button
              onClick={() => setShowForm(true)}
              className='w-full max-w-md bg-[#B16CFE] text-white font-semibold py-4 rounded-full text-lg shadow-lg'
              style={{ boxShadow: '0 8px 32px 0 #B16CFE55' }}
            >
              Add Information
            </button>
          </>
        ) : (
          <div className='w-full px-4'>
            <h3 className='text-lg font-bold mb-2'>Visa Details</h3>
            <div className='mb-2'>
              Visa Type: <span className='text-white'>{visaInfo.visaType}</span>
            </div>
            <div className='mb-2'>
              Validity: <span className='text-white'>{formatDate(visaInfo.validity)}</span>
            </div>
            <div className='mb-2'>
              Institution: <span className='text-white'>{visaInfo.institutionDetails}</span>
            </div>
            <div className='mb-2'>
              City: <span className='text-white'>{visaInfo.city}</span>
            </div>
            <div className='mb-2'>
              State: <span className='text-white'>{visaInfo.state}</span>
            </div>
            <div className='mb-2'>
              Country: <span className='text-white'>{visaInfo.country}</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className='mt-6 w-full max-w-md bg-[#B16CFE] text-white font-semibold py-3 rounded-full text-md shadow-lg'
              style={{ boxShadow: '0 8px 32px 0 #B16CFE55' }}
            >
              Update Information
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
