import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button, message, Modal, Input, Form } from 'antd';
import StudyPreferenceModal from '../StudyPreferenceModal';
import MentorPreferenceModal from '../MentorPreferenceModal';
import PreferredCountryModal from '../PreferredCountryModal';
import { Message3Icon } from '../../Common/SVG/svg.function';
import { getAuthData } from '../../Auth/Auth.Function';

export default function Personalisation() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

  // Get user ID from auth data
  const getUserId = () => {
    try {
      const authData = getAuthData();
      return authData?.userId; // Fallback to 1 if not found
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  };

  // Get personalisation ID from auth data or use default
  const getPersonalisationId = () => {
    try {
      const authData = getAuthData();
      return authData?.personalisationId || 1; // Fallback to 1 if not found
    } catch (error) {
      console.error('Error getting personalisation ID:', error);
      return 1;
    }
  };

  const [personalizationData, setPersonalizationData] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showStudyPreferenceModal, setShowStudyPreferenceModal] = useState(false);
  const [editingStudyPreference, setEditingStudyPreference] = useState(null);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStudyPreference, setLoadingStudyPreference] = useState(false);
  const [showPreferredCountryModal, setShowPreferredCountryModal] = useState(false);
  const [selectedPreferredCountries, setSelectedPreferredCountries] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mentorPreferences, setMentorPreferences] = useState([]);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [selectedMentorPreference, setSelectedMentorPreference] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJobPreference, setSelectedJobPreference] = useState(null);
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);
  const [selectedAccommodationPreference, setSelectedAccommodationPreference] = useState(null);

  const tabs = [
    'All',
    'Preferred Country of Study',
    'Current Study Phase',
    'Mentor Preferences',
    'Accommodation Preferences',
  ];

  // Fetch personalization data
  const fetchPersonalizationData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Note: No GET API provided for fetching all personalization data
      // For now, we'll initialize with empty/default data
      // You may need to implement individual GET APIs for each preference type
      const defaultData = {
        studyPreference: null,
        mentorPreferences: [],
        jobPreference: null,
        accommodationPreferences: {
          city: '',
          gender: '',
          roomType: '',
          budget: '',
          amenities: [],
        },
        selectedCountries: [],
        preferredCountries: [],
        currentStudyPhase: {
          course: '',
          startDate: '',
          university: '',
          addedOn: '',
        },
      };

      setPersonalizationData(defaultData);
      // setSelectedCountries removed as it was unused
      setSelectedPreferredCountries(defaultData.preferredCountries || []);
      setMentorPreferences(defaultData.mentorPreferences || []);
      // If backend returns job preference later, ensure state aligns
      // setPersonalizationData will hold jobPreference field
    } catch (error) {
      console.error('Error initializing personalization data:', error);
      setError('Failed to initialize personalization data');
      message.error('Failed to initialize personalization data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalizationData();
  }, []);

  // Update preferred countries
  const handlePreferredCountriesUpdate = async (countries) => {
    try {
      setLoadingCountries(true);
      setError(null);

      const userId = getUserId();
      const personalisationId = getPersonalisationId();

      const response = await fetch(
        `${URL}/api/personalisation/${userId}/${personalisationId}/preferred-countries`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ preferredCountries: countries }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update preferred countries');
      }

      const updatedData = await response.json();
      setSelectedPreferredCountries(countries);
      setPersonalizationData((prev) => ({
        ...prev,
        preferredCountries: countries,
      }));
      message.success('Preferred countries updated successfully');
    } catch (error) {
      console.error('Error updating countries:', error);
      setError(error.message || 'Failed to update preferred countries');
      message.error(error.message || 'Failed to update preferred countries');
    } finally {
      setLoadingCountries(false);
    }
  };

  const handleStudyPreferenceAddEdit = (preference = null) => {
    setEditingStudyPreference(preference);
    setShowStudyPreferenceModal(true);
    setShowActions(false);
  };

  const handleStudyPreferenceUpdate = async (updatedPreference) => {
    setLoadingStudyPreference(true);
    try {
      const userId = getUserId();
      const personalisationId = getPersonalisationId();
      const response = await fetch(
        `${URL}/api/personalisation/${userId}/${personalisationId}/study`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studyDegree: updatedPreference.course,
            studyUniversity: updatedPreference.university,
            studyCountry: updatedPreference.country,
            studyStartDate: updatedPreference.startDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update study preference');
      }

      const updatedData = await response.json();
      setPersonalizationData(updatedData);
      message.success('Study preference updated successfully!');
      setShowStudyPreferenceModal(false);
    } catch (error) {
      console.error('Error updating study preference:', error);
      message.error(error.message || 'Failed to update study preference');
    } finally {
      setLoadingStudyPreference(false);
    }
  };

  const handleStudyPreferenceDelete = async () => {
    setLoadingStudyPreference(true);
    try {
      const response = await fetch(`${URL}/api/personalisation`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...personalizationData,
          studyPreference: null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete study preference');
      }

      const updatedData = await response.json();
      setPersonalizationData(updatedData);
      message.success('Study preference deleted successfully!');
      setShowActions(false);
    } catch (error) {
      console.error('Error deleting study preference:', error);
      message.error(error.message || 'Failed to delete study preference');
    } finally {
      setLoadingStudyPreference(false);
    }
  };

  // Update mentor preferences
  const handleMentorPreferenceUpdate = async (data) => {
    try {
      setLoading(true);
      const userId = getUserId();
      const personalisationId = getPersonalisationId();
      const response = await fetch(
        `${URL}/api/personalisation/${userId}/${personalisationId}/mentor`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mentorIndustryType: data.industryType,
            mentorLocation: data.location,
            mentorExperience: data.experience,
            mentorSkills: data.skills,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update mentor preferences');
      }

      const updatedData = await response.json();

      if (selectedMentorPreference) {
        setMentorPreferences((prev) =>
          prev.map((pref) => (pref.id === selectedMentorPreference.id ? updatedData : pref))
        );
        message.success('Mentor preferences updated successfully');
      } else {
        setMentorPreferences((prev) => [...prev, updatedData]);
        message.success('Mentor preferences added successfully');
      }

      setIsMentorModalOpen(false);
      setSelectedMentorPreference(null);
    } catch (error) {
      console.error('Error updating mentor preferences:', error);
      message.error('Failed to update mentor preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMentorPreference = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/mentor-preferences/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete mentor preference');
      }

      setMentorPreferences((prev) => prev.filter((pref) => pref.id !== id));
      message.success('Mentor preference deleted successfully');
    } catch (error) {
      console.error('Error deleting mentor preference:', error);
      message.error('Failed to delete mentor preference');
    } finally {
      setLoading(false);
    }
  };

  const openMentorModal = (preference = null) => {
    setSelectedMentorPreference(preference);
    setIsMentorModalOpen(true);
  };

  // Job preferences modal open
  const openJobModal = (preference = null) => {
    setSelectedJobPreference(preference);
    setIsJobModalOpen(true);
  };

  // Accommodation preferences modal open
  const openAccommodationModal = (preference = null) => {
    setSelectedAccommodationPreference(preference);
    setIsAccommodationModalOpen(true);
  };

  const toggleDropdown = (section) => {
    setDropdownOpen(dropdownOpen === section ? null : section);
  };

  // Dropdown menu component
  const DropdownMenu = ({ section, onEdit, onDelete }) => {
    return (
      <div className='absolute right-2 sm:right-3 md:right-4 top-10 sm:top-12 bg-cardblack border border-gray-600 rounded-lg shadow-lg z-10 min-w-20 sm:min-w-24'>
        <a
          onClick={onEdit}
          className='flex items-center gap-1.5 sm:gap-2 w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-transparent text-white hover:bg-gray-600 text-xs sm:text-sm'
        >
          <Edit size={14} className='sm:w-4 sm:h-4' /> Edit
        </a>
        <a
          onClick={onDelete}
          className='flex items-center gap-1.5 sm:gap-2 w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-transparent text-white hover:bg-gray-600 text-xs sm:text-sm'
        >
          <Trash2 size={14} className='sm:w-4 sm:h-4' /> Delete
        </a>
      </div>
    );
  };

  // Update job preferences
  const handleJobPreferenceUpdate = async (data) => {
    try {
      setLoading(true);
      const userId = getUserId();
      const personalisationId = getPersonalisationId();
      const response = await fetch(
        `${URL}/api/personalisation/${userId}/${personalisationId}/job`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobIndustryType: data.industryType,
            jobLocation: data.location,
            jobExperience: data.experience,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update job preferences');
      }

      const updatedData = await response.json();
      setPersonalizationData((prev) => ({
        ...prev,
        jobPreference: {
          industryType: data.industryType,
          location: data.location,
          experience: data.experience,
        },
      }));
      setIsJobModalOpen(false);
      setSelectedJobPreference(null);
      message.success('Job preferences updated successfully');
    } catch (error) {
      console.error('Error updating job preferences:', error);
      message.error('Failed to update job preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleJobPreferenceDelete = async () => {
    try {
      setLoading(true);
      // If backend has a delete endpoint, use it. For now, clear locally.
      setPersonalizationData((prev) => ({ ...prev, jobPreference: null }));
      message.success('Job preference deleted successfully');
    } catch (error) {
      console.error('Error deleting job preference:', error);
      message.error('Failed to delete job preference');
    } finally {
      setLoading(false);
    }
  };

  // Update accommodation preferences
  const handleAccommodationPreferenceUpdate = async (updatedPreference) => {
    try {
      setLoadingStudyPreference(true);
      setError(null);
      const userId = getUserId();
      const personalisationId = getPersonalisationId();

      const response = await fetch(
        `${URL}/api/personalisation/${userId}/${personalisationId}/accommodation`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accommodationLocation: updatedPreference.city,
            accommodationGender: updatedPreference.gender,
            roomType: updatedPreference.roomType,
            accommodationBudget: updatedPreference.budget,
            amenities: updatedPreference.amenities,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update accommodation preferences');
      }

      const updatedData = await response.json();
      setPersonalizationData((prev) => ({
        ...prev,
        accommodationPreferences: updatedPreference,
      }));
      message.success('Accommodation preferences updated successfully');
    } catch (error) {
      console.error('Error updating accommodation preferences:', error);
      setError(error.message || 'Failed to update accommodation preferences');
      message.error(error.message || 'Failed to update accommodation preferences');
    } finally {
      setLoadingStudyPreference(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center'>
        <div className='text-red-500 mb-4'>{error}</div>
        <Button
          onClick={fetchPersonalizationData}
          className='bg-purple-600 hover:bg-purple-700 text-white'
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!personalizationData) {
    return (
      <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center'>
        No data available
      </div>
    );
  }

  const sectionTitleClass = 'text-xl sm:text-2xl font-semibold mb-2';
  const cardClass = 'bg-[#161616] border border-[#2A2A2A] rounded-2xl p-4 sm:p-5 md:p-6 relative';

  return (
    <div className='relative z-0 min-h-screen text-white py-4 md:py-6 px-3 md:px-6'>
      <div className='w-full max-w-5xl mx-auto'>
        {/* Tab Navigation */}
        <div className='flex flex-wrap md:flex-nowrap gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1'>
          <div className='flex flex-wrap md:flex-nowrap gap-2 min-w-0'>
            {tabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 text-sm font-medium min-w-fit flex-shrink-0 border ${
                  activeTab === tab
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-transparent border-[#2A2A2A] text-gray-300 hover:bg-[#1E1E1E]'
                }`}
              >
                <span className='truncate'>{tab}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Preferred Country of Study */}
        {(activeTab === 'All' || activeTab === 'Preferred Country of Study') && (
          <div className='mb-8'>
            <div className='flex items-start sm:items-center sm:justify-between mb-3'>
              <h2 className={sectionTitleClass}>Preferred Country of Study</h2>
              <a
                onClick={() => setShowPreferredCountryModal(true)}
                className='sm:hidden self-end p-1.5 text-purple-400 hover:text-purple-300 transition-colors'
              >
                <Message3Icon size={18} />
              </a>
            </div>
            <div className={cardClass}>
              <a
                onClick={() => setShowPreferredCountryModal(true)}
                className='hidden sm:block absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors'
              >
                <Message3Icon size={18} />
              </a>

              <div className='mb-4'>
                <label className='block text-gray-300 mb-2 text-sm font-medium'>Country</label>
                <div className='flex gap-2 flex-wrap'>
                  {(selectedPreferredCountries || []).length > 0 ? (
                    (selectedPreferredCountries || []).map((country) => (
                      <span
                        key={country}
                        className='bg-[#1E1E1E] border border-[#2A2A2A] px-3 py-1.5 rounded-xl text-sm'
                      >
                        {country}
                      </span>
                    ))
                  ) : (
                    <p className='text-gray-500 text-sm'>No countries selected yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Study Phase */}
        {(activeTab === 'All' || activeTab === 'Current Study Phase') && (
          <div className='mb-8'>
            <div className='flex items-start sm:items-center sm:justify-between mb-3'>
              <h2 className={sectionTitleClass}>Current Study Phase</h2>
              <a
                onClick={() => handleStudyPreferenceAddEdit(null)}
                className='sm:hidden self-end p-1.5 text-purple-400 hover:text-purple-300'
              ></a>
            </div>
            <div className={cardClass}>
              <a
                onClick={() => toggleDropdown('study')}
                className='hidden sm:block absolute top-4 right-4 p-2 text-gray-400 hover:text-white'
              >
                <Message3Icon size={18} />
              </a>

              {dropdownOpen === 'study' && (
                <DropdownMenu
                  section='study'
                  onEdit={() => {
                    handleStudyPreferenceAddEdit(personalizationData.studyPreference);
                    setDropdownOpen(null);
                  }}
                  onDelete={() => {
                    handleStudyPreferenceDelete();
                    setDropdownOpen(null);
                  }}
                />
              )}

              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4'>
                <h3 className='text-lg font-semibold mb-1 sm:mb-0 truncate'>
                  {personalizationData.currentStudyPhase.course || 'No course selected'}
                </h3>
                <a
                  onClick={() => handleStudyPreferenceAddEdit(null)}
                  className='hidden sm:block text-purple-400 hover:text-purple-300 text-base sm:text-lg font-medium'
                ></a>
              </div>

              {(personalizationData.currentStudyPhase.startDate ||
                personalizationData.currentStudyPhase.university) && (
                <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2'>
                  {personalizationData.currentStudyPhase.startDate && (
                    <span className='text-green-400 font-medium text-sm'>
                      {personalizationData.currentStudyPhase.startDate}
                    </span>
                  )}
                  {personalizationData.currentStudyPhase.university && (
                    <span className='text-gray-300 text-sm'>
                      {personalizationData.currentStudyPhase.university}
                    </span>
                  )}
                </div>
              )}

              {personalizationData.currentStudyPhase.addedOn && (
                <p className='text-gray-400 text-xs sm:text-sm'>
                  Added on: {personalizationData.currentStudyPhase.addedOn}
                </p>
              )}

              {!personalizationData.currentStudyPhase.course && (
                <div className='text-center py-3 sm:py-4'>
                  <p className='text-gray-400 text-xs sm:text-sm md:text-base mb-2 sm:mb-3'>
                    No study phase added yet
                  </p>
                  <a
                    onClick={() => handleStudyPreferenceAddEdit(null)}
                    className='text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors'
                  >
                    + Add Study Phase
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mentor Preferences */}
        {(activeTab === 'All' || activeTab === 'Mentor Preferences') && (
          <div className='mb-8'>
            <div className='flex items-start sm:items-center sm:justify-between mb-3'>
              <h2 className={sectionTitleClass}>Mentor Preferences</h2>
              <a
                onClick={() => openMentorModal()}
                className='sm:hidden self-end text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium px-2 py-1'
              >
                + Add More
              </a>
              <a
                onClick={() => openMentorModal()}
                className='hidden sm:block text-purple-400 hover:text-purple-300 text-sm sm:text-base md:text-lg font-medium'
              >
                + Add More
              </a>
            </div>
            <div className='space-y-4'>
              {(mentorPreferences || []).length > 0 ? (
                <div className='space-y-2 sm:space-y-3 md:space-y-4'>
                  {(mentorPreferences || []).map((preference) => (
                    <div key={preference.id || preference.industryType} className={`${cardClass}`}>
                      <button
                        onClick={() => setDropdownOpen(preference.id)}
                        className='absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors'
                      >
                        <Message3Icon size={16} />
                      </button>
                      {dropdownOpen === preference.id && (
                        <DropdownMenu
                          section='mentor'
                          onEdit={() => {
                            openMentorModal(preference);
                            setDropdownOpen(null);
                          }}
                          onDelete={() => {
                            handleDeleteMentorPreference(preference.id);
                            setDropdownOpen(null);
                          }}
                        />
                      )}
                      <div className='pr-10 sm:pr-12'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                          <div className='text-gray-300'>
                            <span className='font-semibold text-white text-sm'>Industry Type:</span>
                            <p className='text-sm mt-1 truncate'>{preference.industryType}</p>
                          </div>
                          <div className='text-gray-300'>
                            <span className='font-semibold text-white text-sm'>
                              Locations Preferred:
                            </span>
                            <p className='text-sm mt-1 truncate'>{preference.location}</p>
                          </div>
                          <div className='text-gray-300'>
                            <span className='font-semibold text-white text-sm'>Experience:</span>
                            <p className='text-green-400 text-sm mt-1'>{preference.experience}</p>
                          </div>
                          <div className='text-gray-300 sm:col-span-2'>
                            <span className='font-semibold text-white text-sm'>Skills:</span>
                            <div className='flex flex-wrap gap-2 mt-2'>
                              {(preference.skills || []).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className='bg-[#1E1E1E] border border-[#2A2A2A] px-3 py-1 rounded-lg text-sm'
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`${cardClass} text-center`}>
                  <p className='text-gray-500 text-sm mb-3'>No mentor preferences added yet.</p>
                  <a
                    onClick={() => openMentorModal()}
                    className='text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors'
                  >
                    + Add Your First Mentor Preference
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Study Preference */}
        {activeTab === 'All' && (
          <div className='mb-8'>
            <div className='flex items-start sm:items-center sm:justify-between mb-3'>
              <h2 className={sectionTitleClass}>Study Preference</h2>
              <a
                onClick={() => openAccommodationModal(personalizationData.accommodationPreferences)}
                className='sm:hidden self-end text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium transition-colors px-2 py-1'
              >
                + Add More
              </a>
              <a
                onClick={() => openAccommodationModal(personalizationData.accommodationPreferences)}
                className='hidden sm:block text-purple-400 hover:text-purple-300 text-sm sm:text-base md:text-lg font-medium transition-colors'
              >
                + Add More
              </a>
            </div>
            <div className={cardClass}>
              <a
                onClick={() => toggleDropdown('study')}
                className='absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors'
              >
                <Message3Icon size={16} />
              </a>
              {dropdownOpen === 'study' && (
                <DropdownMenu
                  section='study'
                  onEdit={() => {
                    handleStudyPreferenceAddEdit(personalizationData.studyPreference);
                    setDropdownOpen(null);
                  }}
                  onDelete={() => {
                    handleStudyPreferenceDelete();
                    setDropdownOpen(null);
                  }}
                />
              )}
              {personalizationData.studyPreference ? (
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                  <div className='flex-1'>
                    <h3 className='text-white font-medium text-lg mb-2 truncate'>
                      {personalizationData.studyPreference.course}
                    </h3>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3 text-sm'>
                      {personalizationData.studyPreference.startDate && (
                        <span className='text-green-400 font-medium'>
                          {personalizationData.studyPreference.startDate}
                        </span>
                      )}
                      {personalizationData.studyPreference.university && (
                        <span className='text-gray-300 truncate'>
                          {personalizationData.studyPreference.university}
                        </span>
                      )}
                    </div>
                    {personalizationData.studyPreference.addedOn && (
                      <p className='text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2'>
                        Added on: {personalizationData.studyPreference.addedOn}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleStudyPreferenceAddEdit(null)}
                    className='hidden sm:block text-purple-400 hover:text-purple-300 text-base sm:text-lg font-medium transition-colors mt-3 sm:mt-0'
                  >
                    <Message3Icon size={16} />
                  </button>
                </div>
              ) : (
                <div className='text-center py-6'>
                  <p className='text-gray-500 text-sm mb-3'>No study preference set yet.</p>
                  <a
                    onClick={() => handleStudyPreferenceAddEdit(null)}
                    className='text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors'
                  >
                    + Add Study Preference
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Accommodation Preferences */}
        {(activeTab === 'All' || activeTab === 'Accommodation Preferences') && (
          <div className='mb-8'>
            <div className='flex items-start sm:items-center sm:justify-between mb-3'>
              <h2 className={sectionTitleClass}>Accommodation Preferences</h2>
              <a
                onClick={() => handleStudyPreferenceAddEdit(null)}
                className='sm:hidden self-end text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium transition-colors px-2 py-1'
              >
                + Add More
              </a>
              <a
                onClick={() => handleStudyPreferenceAddEdit(null)}
                className='hidden sm:block text-purple-400 hover:text-purple-300 text-sm sm:text-base md:text-lg font-medium transition-colors'
              >
                + Add More
              </a>
            </div>
            <div className={cardClass}>
              <a
                onClick={() => toggleDropdown('accommodation')}
                className='absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors'
              >
                <Message3Icon size={16} />
              </a>
              {dropdownOpen === 'accommodation' && (
                <DropdownMenu
                  section='accommodation'
                  onEdit={() => {
                    openAccommodationModal(personalizationData.accommodationPreferences);
                    setDropdownOpen(null);
                  }}
                  onDelete={() => setDropdownOpen(null)}
                />
              )}

              <div className='space-y-3 sm:space-y-4 md:space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                  <div>
                    <span className='text-gray-300 text-xs sm:text-sm md:text-base font-medium'>
                      City/Location:
                    </span>
                    <p className='text-white text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 truncate'>
                      {personalizationData.accommodationPreferences.city || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <span className='text-gray-300 text-xs sm:text-sm md:text-base font-medium'>
                      Gender:
                    </span>
                    <p className='text-white text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1'>
                      {personalizationData.accommodationPreferences.gender || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <span className='text-gray-300 text-xs sm:text-sm md:text-base font-medium'>
                      Room Type:
                    </span>
                    <p className='text-green-400 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1'>
                      {personalizationData.accommodationPreferences.roomType || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <span className='text-gray-300 text-xs sm:text-sm md:text-base font-medium'>
                      Budget:
                    </span>
                    <p className='text-white text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1'>
                      {personalizationData.accommodationPreferences.budget || 'Not specified'}
                    </p>
                  </div>
                </div>

                {(personalizationData.accommodationPreferences.jobType || []).length > 0 && (
                  <div>
                    <span className='text-gray-300 text-xs sm:text-sm md:text-base font-medium block mb-1.5 sm:mb-2'>
                      Job Type:
                    </span>
                    <div className='flex gap-1.5 sm:gap-2 md:gap-3 flex-wrap'>
                      {(personalizationData.accommodationPreferences.jobType || []).map((type) => (
                        <span
                          key={type}
                          className='bg-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs sm:text-sm'
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(personalizationData.accommodationPreferences.amenities || []).length > 0 && (
                  <div>
                    <span className='text-gray-300 text-xs sm:text-sm md:text-base font-medium block mb-1.5 sm:mb-2'>
                      Amenities:
                    </span>
                    <div className='flex gap-1.5 sm:gap-2 md:gap-3 flex-wrap'>
                      {(personalizationData.accommodationPreferences.amenities || []).map(
                        (amenity) => (
                          <span
                            key={amenity}
                            className='bg-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs sm:text-sm'
                          >
                            {amenity}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {!personalizationData.accommodationPreferences.city &&
                  !personalizationData.accommodationPreferences.gender &&
                  !personalizationData.accommodationPreferences.roomType &&
                  !personalizationData.accommodationPreferences.budget &&
                  (!personalizationData.accommodationPreferences.jobType ||
                    personalizationData.accommodationPreferences.jobType.length === 0) &&
                  (!personalizationData.accommodationPreferences.amenities ||
                    personalizationData.accommodationPreferences.amenities.length === 0) && (
                    <div className='text-center py-4'>
                      <p className='text-gray-500 text-sm mb-3'>
                        No accommodation preferences set yet
                      </p>
                      <a
                        onClick={() =>
                          openAccommodationModal(personalizationData.accommodationPreferences)
                        }
                        className='text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors'
                      >
                        + Add Accommodation Preferences
                      </a>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Job Preferences */}
        {activeTab === 'All' && (
          <div className='mb-4 sm:mb-6 md:mb-8'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 md:mb-4'>
              <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-0'>
                Job Preferences
              </h2>
              <a
                onClick={() => openJobModal(personalizationData.jobPreference)}
                className='sm:hidden self-end text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium transition-colors px-2 py-1'
              >
                + Add More
              </a>
              <a
                onClick={() => openJobModal(personalizationData.jobPreference)}
                className='hidden sm:block text-purple-400 hover:text-purple-300 text-sm sm:text-base md:text-lg font-medium transition-colors'
              >
                + Add More
              </a>
            </div>
            <div className='bg-secondary rounded-lg p-3 sm:p-4 md:p-6 relative'>
              <a
                onClick={() => toggleDropdown('job')}
                className='absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors'
              >
                <Message3Icon size={16} />
              </a>
              {dropdownOpen === 'job' && (
                <DropdownMenu
                  section='job'
                  onEdit={() => {
                    openJobModal(personalizationData.jobPreference);
                    setDropdownOpen(null);
                  }}
                  onDelete={() => {
                    handleJobPreferenceDelete();
                    setDropdownOpen(null);
                  }}
                />
              )}

              {personalizationData.jobPreference ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                  <div className='text-gray-300'>
                    <span className='font-semibold text-white text-xs sm:text-sm md:text-base'>
                      Industry Type:
                    </span>
                    <p className='text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 truncate'>
                      {personalizationData.jobPreference.industryType}
                    </p>
                  </div>
                  <div className='text-gray-300'>
                    <span className='font-semibold text-white text-xs sm:text-sm md:text-base'>
                      Locations Preferred:
                    </span>
                    <p className='text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 truncate'>
                      {personalizationData.jobPreference.location}
                    </p>
                  </div>
                  <div className='text-gray-300 sm:col-span-2'>
                    <span className='font-semibold text-white text-xs sm:text-sm md:text-base'>
                      Experience:
                    </span>
                    <p className='text-green-400 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1'>
                      {personalizationData.jobPreference.experience}
                    </p>
                  </div>
                </div>
              ) : (
                <div className='text-center py-4 sm:py-6'>
                  <p className='text-gray-400 text-xs sm:text-sm md:text-base mb-2 sm:mb-3'>
                    No job preferences added yet.
                  </p>
                  <a
                    onClick={() => openJobModal(personalizationData.jobPreference)}
                    className='text-purple-400 hover:text-purple-300 text-xs sm:text-sm md:text-base font-medium transition-colors'
                  >
                    + Add Job Preferences
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modals */}
        <StudyPreferenceModal
          isOpen={showStudyPreferenceModal}
          onClose={() => setShowStudyPreferenceModal(false)}
          onUpdate={handleStudyPreferenceUpdate}
          initialData={editingStudyPreference}
        />
        <PreferredCountryModal
          visible={showPreferredCountryModal}
          onClose={() => setShowPreferredCountryModal(false)}
          selectedCountry={selectedPreferredCountries}
          onSelect={handlePreferredCountriesUpdate}
        />
        <MentorPreferenceModal
          isOpen={isMentorModalOpen}
          onClose={() => {
            setIsMentorModalOpen(false);
            setSelectedMentorPreference(null);
          }}
          onUpdate={handleMentorPreferenceUpdate}
          initialData={selectedMentorPreference}
        />

        {/* Inline Job Preference Modal */}
        <Modal
          open={isJobModalOpen}
          onCancel={() => {
            setIsJobModalOpen(false);
            setSelectedJobPreference(null);
          }}
          footer={null}
          title={
            <span className='text-sm sm:text-base md:text-lg'>
              {selectedJobPreference ? 'Edit Job Preference' : 'Add Job Preference'}
            </span>
          }
          className='bg-cardblack text-white'
          width='95%'
          style={{ maxWidth: '500px' }}
          bodyStyle={{ padding: '16px 20px' }}
        >
          <Form
            layout='vertical'
            initialValues={{
              industryType: selectedJobPreference?.industryType || '',
              location: selectedJobPreference?.location || '',
              experience: selectedJobPreference?.experience || '',
            }}
            onFinish={(values) => handleJobPreferenceUpdate(values)}
          >
            <Form.Item
              label={
                <span className='text-white text-xs sm:text-sm md:text-base'>Industry Type</span>
              }
              name='industryType'
              rules={[{ required: true, message: 'Please enter industry type' }]}
            >
              <Input
                placeholder='e.g., Information Tech'
                className='text-xs sm:text-sm md:text-base'
              />
            </Form.Item>
            <Form.Item
              label={
                <span className='text-white text-xs sm:text-sm md:text-base'>
                  Locations Preferred
                </span>
              }
              name='location'
              rules={[{ required: true, message: 'Please enter location' }]}
            >
              <Input
                placeholder='e.g., Sydney- Australia'
                className='text-xs sm:text-sm md:text-base'
              />
            </Form.Item>
            <Form.Item
              label={<span className='text-white text-xs sm:text-sm md:text-base'>Experience</span>}
              name='experience'
              rules={[{ required: true, message: 'Please enter experience range' }]}
            >
              <Input placeholder='e.g., 0 - 2yrs' className='text-xs sm:text-sm md:text-base' />
            </Form.Item>
            <div className='flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6'>
              <Button
                onClick={() => {
                  setIsJobModalOpen(false);
                  setSelectedJobPreference(null);
                }}
                className='bg-gray-700 text-white text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2'
              >
                Cancel
              </Button>
              <Button
                htmlType='submit'
                className='bg-purple-600 text-white text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2'
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal>
        {/* Inline Accommodation Preference Modal */}
        <Modal
          open={isAccommodationModalOpen}
          onCancel={() => {
            setIsAccommodationModalOpen(false);
            setSelectedAccommodationPreference(null);
          }}
          footer={null}
          title={
            <span className='text-sm sm:text-base md:text-lg'>
              {selectedAccommodationPreference
                ? 'Edit Accommodation Preferences'
                : 'Add Accommodation Preferences'}
            </span>
          }
          className='bg-cardblack text-white'
          width='95%'
          style={{ maxWidth: '560px' }}
          bodyStyle={{ padding: '16px 20px' }}
        >
          <Form
            layout='vertical'
            initialValues={{
              city: selectedAccommodationPreference?.city || '',
              gender: selectedAccommodationPreference?.gender || '',
              roomType: selectedAccommodationPreference?.roomType || '',
              budget: selectedAccommodationPreference?.budget || '',
              amenitiesInput: (selectedAccommodationPreference?.amenities || []).join(', '),
            }}
            onFinish={(values) => {
              const amenities = (values.amenitiesInput || '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
              handleAccommodationPreferenceUpdate({
                city: values.city,
                gender: values.gender,
                roomType: values.roomType,
                budget: values.budget,
                amenities,
              }).then(() => {
                setIsAccommodationModalOpen(false);
                setSelectedAccommodationPreference(null);
              });
            }}
          >
            <Form.Item
              label={
                <span className='text-white text-xs sm:text-sm md:text-base'>City/Location</span>
              }
              name='city'
              rules={[{ required: true, message: 'Please enter city/location' }]}
            >
              <Input placeholder='e.g., Melbourne' className='text-xs sm:text-sm md:text-base' />
            </Form.Item>
            <Form.Item
              label={<span className='text-white text-xs sm:text-sm md:text-base'>Gender</span>}
              name='gender'
            >
              <Input
                placeholder='e.g., Any / Male / Female'
                className='text-xs sm:text-sm md:text-base'
              />
            </Form.Item>
            <Form.Item
              label={<span className='text-white text-xs sm:text-sm md:text-base'>Room Type</span>}
              name='roomType'
            >
              <Input
                placeholder='e.g., Shared, Private'
                className='text-xs sm:text-sm md:text-base'
              />
            </Form.Item>
            <Form.Item
              label={<span className='text-white text-xs sm:text-sm md:text-base'>Budget</span>}
              name='budget'
            >
              <Input placeholder='e.g., $800/month' className='text-xs sm:text-sm md:text-base' />
            </Form.Item>
            <Form.Item
              label={
                <span className='text-white text-xs sm:text-sm md:text-base'>
                  Amenities (comma separated)
                </span>
              }
              name='amenitiesInput'
            >
              <Input
                placeholder='WiFi, Parking, Laundry'
                className='text-xs sm:text-sm md:text-base'
              />
            </Form.Item>
            <div className='flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6'>
              <Button
                onClick={() => {
                  setIsAccommodationModalOpen(false);
                  setSelectedAccommodationPreference(null);
                }}
                className='bg-gray-700 text-white text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2'
              >
                Cancel
              </Button>
              <Button
                htmlType='submit'
                className='bg-purple-600 text-white text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2'
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      </div>

      {/* Custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
