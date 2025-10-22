import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Button } from 'antd';
import {
  ArrowLeftIcon,
  SaveIcon,
  ShareButtonIcon,
} from '../Common/SVG/svg.function';
import { PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import { MessageIcon, TickIcon } from '../Stay/NeedRoomCommon.svg';
import { getAbsoluteImageUrl } from '../Common/constants.function';
import { MapPin, Calendar, GraduationCap, Briefcase, Globe, FileCheck } from 'lucide-react';
import { useStudent } from '@/hooks/students/queries';

// Helper function to format string
const formatString = (str) => {
  if (!str) return 'Not specified';
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Helper function to format boolean values
const formatBoolean = (value) => {
  return value ? 'Yes' : 'No';
};

// ProfileImage component for consistent image rendering
const ProfileImage = ({ image, name, size, fontSize }) => {
  return (
    <div
      className={`${size} rounded-full overflow-hidden bg-gray-700 flex items-center justify-center`}
    >
      {image ? (
        <img
          src={getAbsoluteImageUrl(image)}
          alt={`${name}'s profile`}
          className='w-full h-full object-cover'
        />
      ) : (
        <div
          className='bg-purple-600 w-full h-full flex items-center justify-center text-white font-bold'
          style={{ fontSize: fontSize }}
        >
          {name?.charAt(0) || '?'}
        </div>
      )}
    </div>
  );
};

const BatchmateDetails = () => {
  const router = useRouter();
  // Get student ID from router
  const studentId =
    router?.state?.location?.pathname?.split('/').pop() || router?.currentMatches?.[0]?.params?.id;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Fetch student data using custom hook
  const {
    data: studentData,
    isLoading: loading,
    error: queryError,
  } = useStudent(studentId);

  // Transform student data using useMemo
  const displayStudent = useMemo(() => {
    if (!studentData) return null;

    return {
      fullName: studentData.fullName || 'Unknown',
      email: studentData.email || '',
      phoneNumber: studentData.phoneNumber || '',
      universityName: studentData.universityName || '',
      course: studentData.course || '',
      intakeMonthYear: studentData.intakeMonthYear || '',
      destinationCountries: studentData.destinationCountries || '',
      fieldOfStudy: studentData.fieldOfStudy || '',
      preferredUniversities: studentData.preferredUniversities || '',
      occupationStudentWorking: studentData.occupationStudentWorking || '',
      accommodationPreferences: studentData.accommodationPreferences || '',
      preferredMoveInDate: studentData.preferredMoveInDate || '',
      visaStatus: studentData.visaStatus || '',
      lookingForPartTimeJob: studentData.lookingForPartTimeJob || false,
      admissionReceived: studentData.admissionReceived || false,
      receiveMentorRecommendations: studentData.receiveMentorRecommendations || false,
      notifyJobHousingOpportunities: studentData.notifyJobHousingOpportunities || false,
      otherSupportNeeded: studentData.otherSupportNeeded || '',
      intakeYear: studentData.intakeYear || '',
    };
  }, [studentData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  if (queryError) {
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-500 mb-2'>Error loading batchmate details</p>
          <p className='text-gray-400 text-sm'>
            {queryError?.message || 'Failed to load student data'}
          </p>
        </div>
      </div>
    );
  }

  if (!displayStudent) {
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        No student data available
      </div>
    );
  }

  return (
    <div className='text-white min-h-screen w-full relative pb-24'>
      <div className='max-w-full mx-auto p-4'>
        {/* Top navigation */}
        <div className='flex justify-between mb-4'>
          <div
            className='flex items-center cursor-pointer'
            onClick={() => {
              window.history.back();
            }}
          >
            <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center'>
              <ArrowLeftIcon />
            </div>
            {!isMobile && <span className='ml-2 text-lg font-medium'>Back</span>}
          </div>
          <div className='flex gap-2'>
            <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer'>
              <SaveIcon />
            </div>
            <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer'>
              <ShareButtonIcon />
            </div>
          </div>
        </div>

        {/* Main content columns */}
        <div className='bg-secondary flex flex-col lg:flex-row gap-4 mb-6 p-4 rounded-lg'>
          {/* Left Column - Profile Header */}
          <div className='lg:w-3/5'>
            <div className='bg-cardblack rounded-[24px] p-4'>
              <div className='flex items-start mb-2'>
                <div className='mr-3 mt-4'>
                  <ProfileImage
                    image={''}
                    name={displayStudent.fullName}
                    size='w-14 h-14'
                    fontSize='1.55rem'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h2 className='text-xl font-semibold flex items-center'>
                        {displayStudent.fullName}
                        {displayStudent.admissionReceived && (
                          <TickIcon className='ml-2 text-green-500' />
                        )}
                      </h2>
                      <p className='text-gray-400 flex items-center text-sm'>
                        <GraduationCap className='mr-1' size={16} />
                        {displayStudent.course} at {displayStudent.universityName}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    <div className='flex items-center text-sm bg-gray-800 px-2 py-1 rounded-full'>
                      <Calendar className='mr-1' size={14} />
                      <span>{displayStudent.intakeMonthYear}</span>
                    </div>
                    {displayStudent.destinationCountries && (
                      <div className='flex items-center text-sm bg-gray-800 px-2 py-1 rounded-full'>
                        <Globe className='mr-1' size={14} />
                        <span>{displayStudent.destinationCountries}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className='mb-6 mt-4'>
              <h2 className='text-lg font-semibold mb-3'>Academic Information</h2>
              <div className='bg-cardblack rounded-lg p-4 space-y-3'>
                {displayStudent.fieldOfStudy && (
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>Field of Study:</span>
                    <span className='text-white'>{displayStudent.fieldOfStudy}</span>
                  </div>
                )}
                {displayStudent.preferredUniversities && (
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>Preferred Universities:</span>
                    <span className='text-white text-right'>{displayStudent.preferredUniversities}</span>
                  </div>
                )}
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Admission Status:</span>
                  <span className={`font-semibold ${displayStudent.admissionReceived ? 'text-green-500' : 'text-orange-500'}`}>
                    {displayStudent.admissionReceived ? 'Received' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Accommodation & Relocation */}
            {(displayStudent.accommodationPreferences || displayStudent.preferredMoveInDate) && (
              <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-3'>Accommodation & Relocation</h2>
                <div className='bg-cardblack rounded-lg p-4 space-y-3'>
                  {displayStudent.accommodationPreferences && (
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Accommodation Preference:</span>
                      <span className='text-white'>{displayStudent.accommodationPreferences}</span>
                    </div>
                  )}
                  {displayStudent.preferredMoveInDate && (
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Preferred Move-in Date:</span>
                      <span className='text-white'>
                        {new Date(displayStudent.preferredMoveInDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Employment & Career */}
            <div className='mb-6'>
              <h2 className='text-lg font-semibold mb-3'>Employment & Career</h2>
              <div className='bg-cardblack rounded-lg p-4 space-y-3'>
                {displayStudent.occupationStudentWorking && (
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>Current Occupation:</span>
                    <span className='text-white'>{displayStudent.occupationStudentWorking}</span>
                  </div>
                )}
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Looking for Part-time Job:</span>
                  <span className={`font-semibold ${displayStudent.lookingForPartTimeJob ? 'text-green-500' : 'text-gray-500'}`}>
                    {formatBoolean(displayStudent.lookingForPartTimeJob)}
                  </span>
                </div>
                {displayStudent.visaStatus && (
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>Visa Status:</span>
                    <span className={`font-semibold ${
                      displayStudent.visaStatus.toLowerCase() === 'approved' ? 'text-green-500' : 'text-orange-500'
                    }`}>
                      {displayStudent.visaStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Preferences */}
            <div className='mb-6'>
              <h2 className='text-lg font-semibold mb-3'>Preferences & Support</h2>
              <div className='bg-cardblack rounded-lg p-4 space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-400'>Mentor Recommendations:</span>
                  <span className={`font-semibold ${displayStudent.receiveMentorRecommendations ? 'text-green-500' : 'text-gray-500'}`}>
                    {formatBoolean(displayStudent.receiveMentorRecommendations)}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-400'>Job/Housing Notifications:</span>
                  <span className={`font-semibold ${displayStudent.notifyJobHousingOpportunities ? 'text-green-500' : 'text-gray-500'}`}>
                    {formatBoolean(displayStudent.notifyJobHousingOpportunities)}
                  </span>
                </div>
                {displayStudent.otherSupportNeeded && (
                  <div className='flex flex-col'>
                    <span className='text-gray-400 mb-1'>Other Support Needed:</span>
                    <span className='text-white'>{displayStudent.otherSupportNeeded}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info & Quick Actions */}
          <div className='lg:w-2/5 flex flex-col gap-4'>
            {/* Contact Info */}
            <div className='rounded-lg p-4 mb-0'>
              <h2 className='text-lg font-semibold mb-3'>Contact Information</h2>
              <div className='space-y-3'>
                {/* Email */}
                {displayStudent.email && (
                  <div className='bg-cardblack rounded-lg p-3'>
                    <div className='flex items-center'>
                      <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3'>
                        <MailOutlined className='text-lg' />
                      </div>
                      <div className='flex-1 overflow-hidden'>
                        <div className='text-xs text-gray-400'>Email</div>
                        <div className='text-sm truncate'>{displayStudent.email}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {displayStudent.phoneNumber && (
                  <div className='bg-cardblack rounded-lg p-3'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center flex-1'>
                        <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3'>
                          <PhoneOutlined className='text-lg' />
                        </div>
                        <div>
                          <div className='text-xs text-gray-400'>Phone</div>
                          <div className='text-sm'>{displayStudent.phoneNumber}</div>
                        </div>
                      </div>
                      <Button className='bg-gray-800 border-none h-10 w-10 p-0 flex items-center justify-center'>
                        <MessageIcon />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className='rounded-lg p-4'>
              <h2 className='text-lg font-semibold mb-3'>Quick Info</h2>
              <div className='grid grid-cols-2 gap-3'>
                <div className='bg-cardblack rounded-xl p-4 flex flex-col items-center'>
                  <FileCheck className='w-6 h-6 mb-1 text-purple-500' />
                  <div className='text-sm text-white font-semibold'>
                    {displayStudent.admissionReceived ? 'Admitted' : 'Applying'}
                  </div>
                  <div className='text-xs text-gray-400'>Status</div>
                </div>
                <div className='bg-cardblack rounded-xl p-4 flex flex-col items-center'>
                  <Briefcase className='w-6 h-6 mb-1 text-purple-500' />
                  <div className='text-sm text-white font-semibold'>
                    {displayStudent.lookingForPartTimeJob ? 'Yes' : 'No'}
                  </div>
                  <div className='text-xs text-gray-400'>Seeking Job</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom nav for mobile */}
        {isMobile && (
          <div className='fixed bottom-0 left-0 right-0 bg-gray-900 p-3 flex items-center justify-between border-t border-gray-800'>
            <div className='flex items-center'>
              <div className='mr-2'>
                <ProfileImage
                  image={''}
                  name={displayStudent.fullName}
                  size='w-10 h-10'
                  fontSize='0.875rem'
                />
              </div>
              <div>
                <div className='text-sm font-medium'>{displayStudent.fullName}</div>
                <div className='text-xs text-gray-400'>
                  {displayStudent.course}
                </div>
              </div>
            </div>
            <div className='flex space-x-2'>
              <Button
                type='default'
                className='bg-gray-800 border-none h-10 w-10 p-0 flex items-center justify-center rounded-full'
              >
                <PhoneOutlined className='text-white' />
              </Button>
              <Button
                type='default'
                className='bg-gray-800 border-none h-10 w-10 p-0 flex items-center justify-center rounded-full'
              >
                <MessageIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchmateDetails;
