import { Button, Card, Input, message } from 'antd';
import React, { useState } from 'react';
import { ChevronDown, CheckCircle, ChevronLeft, Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { registrationService } from '../Services/registrationService';
import CustomSelect from './Common/CustomSelect';
import { UploadDocIcon } from '../Common/SVG/svg.function';
import { cn } from '../../lib/utils';
import { useIsMobile } from '../../hooks/useMobile';

export default function MentorOnboardingForm({
  formData,
  errors = {},
  loading = false,
  handleInputChange,
  handleSelectChange,
  handleContinue,
  onBack,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [localFormData, setLocalFormData] = useState({
    currentJobTitle: '',
    companyName: '',
    industry: '',
    experience: '',
    skills: [],
    linkedinProfile: '',
    nationality: '',
    fieldOfStudy: '',
    collegeName: '',
    passedOutYear: '',
    degreeDocument: '',
    ...formData,
  });
  // const [documentFile, setDocumentFile] = useState(null);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  // Dropdown options
  const jobTitles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Other'];
  const companies = ['Google', 'Microsoft', 'Amazon', 'Startup', 'Other'];
  const industries = [
    'Information Technology',
    'Cybersecurity',
    'Finance',
    'Healthcare',
    'Education',
    'Other',
  ];
  const experiences = ['0-1 years', '1-3 years', '3-5 years', '5+ years'];
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'Leadership',
    'Communication',
    'Management',
    'Other',
  ];
  const nationalities = [
    'Indian',
    'Australian',
    'American',
    'British',
    'Canadian',
    'German',
    'Other',
  ];
  // Education Details
  const fieldsOfStudy = ['Computer Science', 'Engineering', 'Business', 'Arts', 'Other'];
  const colleges = ['Anna University', 'IIT', 'NIT', 'BITS', 'Other'];
  const years = Array.from({ length: 30 }, (_, i) => `${2024 - i}`);

  // Required fields for validation
  const personalFields = ['currentJobTitle', 'companyName', 'skills'];
  const educationFields = ['fieldOfStudy', 'collegeName', 'passedOutYear'];

  // Add required asterisks to labels for required fields
  const getLabelWithAsterisk = (label, field) => {
    return personalFields.includes(field)
      ? `${label} <span className="text-red-500">*</span>`
      : label;
  };

  // Validation
  const getFieldError = (field) => {
    if (!submitAttempted && !touched[field]) return '';

    const value = localFormData[field];

    // Only validate required fields
    if (field === 'currentJobTitle' || field === 'companyName') {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return 'This field is required.';
      }
    } else if (field === 'skills') {
      if (!Array.isArray(value) || value.length === 0) {
        return 'Please select at least one skill.';
      }
    } else if (field === 'linkedinProfile') {
      // LinkedIn is optional, but if provided, validate format
      if (value && value.trim() !== '') {
        const val = value.trim();
        if (!val.match(/^(https?:\/\/)?([\w.-]+)\.[a-z]{2,}(\/.*)?$/i)) {
          return 'Enter a valid URL or username.';
        }
      }
    }
    // For all other fields (industry, experience, nationality), no validation needed

    return '';
  };

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (handleInputChange) handleInputChange(e);
  };

  const handleSkillsChange = (selectedSkills) => {
    setLocalFormData((prev) => ({ ...prev, skills: selectedSkills }));
    setTouched((prev) => ({ ...prev, skills: true }));
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        messageApi.error({
          content: 'Please upload a valid file (PDF, JPEG, JPG, PNG)',
          duration: 3,
        });
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        messageApi.error({ content: 'File size must be less than 5MB', duration: 3 });
        return;
      }

      handleInputChange({ target: { name: 'degreeDocument', value: file } });
      messageApi.success({ content: `File "${file.name}" selected successfully`, duration: 2 });
    }
  };
  // Step navigation and validation
  const handleContinueStep = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Check all required fields
    let hasError = false;
    const errors = {};

    personalFields.forEach((field) => {
      const error = getFieldError(field);
      if (error) {
        hasError = true;
        errors[field] = error;
      }
    });

    // Additional validation for required fields
    if (!localFormData.currentJobTitle || localFormData.currentJobTitle.trim() === '') {
      hasError = true;
      errors.currentJobTitle = 'Current Job Title is required.';
    }

    if (!localFormData.companyName || localFormData.companyName.trim() === '') {
      hasError = true;
      errors.companyName = 'Company Name is required.';
    }

    if (
      !localFormData.skills ||
      !Array.isArray(localFormData.skills) ||
      localFormData.skills.length === 0
    ) {
      hasError = true;
      errors.skills = 'Please select at least one skill.';
    }

    // Set touched state for required fields to show errors
    setTouched((prev) => ({
      ...prev,
      currentJobTitle: true,
      companyName: true,
      skills: true,
    }));

    if (hasError) {
      console.log('Validation errors:', errors);
      return;
    }

    setSubmitAttempted(false);
    setStep(2);
  };

  const handleBackToStep1 = () => {
    setStep(1);
    setSubmitAttempted(false);
  };

  const handleBackToPrevious = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setApiError('');

    let hasError = false;
    educationFields.forEach((field) => {
      if (getFieldError(field)) {
        hasError = true;
      }
    });
    // if (!documentFile) hasError = true;
    if (hasError) return;

    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL_BACKEND;
      const requestJson = {
        username:
          formData.email?.split('@')[0] || formData.fullName?.toLowerCase()?.replace(/\s+/g, ''),
        password: formData.password,
        confirmPassword: formData.password,
        email: formData.email,
        fullName: formData.fullName,
        phoneNumber: formData.mobileNumber || formData.phoneNumber,
        currentJobTitle: localFormData.currentJobTitle,
        companyName: localFormData.companyName,
        industry: localFormData.industry,
        experience: localFormData.experience,
        linkedinProfile: localFormData.linkedinProfile,
        nationality: localFormData.nationality,
        fieldOfStudy: localFormData.fieldOfStudy,
        collegeName: localFormData.collegeName,
        passedOutYear: localFormData.passedOutYear,
        skills: Array.isArray(localFormData.skills)
          ? localFormData.skills
          : localFormData.skills
            ? [localFormData.skills]
            : [],
      };

      // Handle file upload for company certificate
      let degreeDocumentFile = null;
      if (formData.degreeDocument) {
        degreeDocumentFile = formData.degreeDocument;
      }

      const result = await registrationService.registerMentor(
        baseUrl,
        requestJson,
        degreeDocumentFile
      );

      if (result.ok) {
        console.log('Mentor registration successful:', result.data);
        const successMessage =
          result.data?.statuses?.[0]?.message ||
          'Mentor registration successful! Please check your email for verification link.';
        messageApi.success({
          content: successMessage,
          duration: 2,
        });

        // Wait for the message to display before navigating
        setTimeout(() => {
          if (handleContinue) {
            handleContinue();
          } else {
            navigate('/login');
          }
        }, 2500);
      } else {
        const serverMsg = result.data?.statuses?.[0]?.message || result.error;
        setApiError(serverMsg);
        messageApi.error({
          content: serverMsg || 'Mentor registration failed. Please try again.',
          duration: 5,
        });
      }
    } catch (error) {
      console.error('Mentor registration error:', error);
      const errorMessage = error.message || 'Mentor registration failed. Please try again.';
      setApiError(errorMessage);
      messageApi.error({
        content: errorMessage,
        duration: 5,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const IsMobile = useIsMobile();

  // Step 1: Personal Info
  if (step === 1) {
    return (
      <>
        {contextHolder}
        <form
          className={cn(
            'p-4 mb-20 rounded-xl md:p-6 register-page ',
            !IsMobile ? 'bg-secondary mt-10' : 'mt-5'
          )}
          onSubmit={handleContinueStep}
        >
          <div className='flex items-center mb-6'>
            <div className='text-lg font-semibold text-white'>Professional Info</div>
          </div>

          <div className='mb-4 md:mb-6'>
            <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
              Current Job Title <span className='text-red-500'>*</span>
            </label>
            <CustomSelect
              name='currentJobTitle'
              value={localFormData.currentJobTitle || ''}
              options={jobTitles}
              placeholder='Select Job Title'
              onChange={(name, value) => {
                handleLocalChange({ target: { name, value } });
              }}
              searchable={true}
            />
            {getFieldError('currentJobTitle') && (
              <span className='block mt-1 text-xs text-red-500'>
                {getFieldError('currentJobTitle')}
              </span>
            )}
          </div>

          <div className='mb-4 md:mb-6'>
            <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
              Company Name <span className='text-red-500'>*</span>
            </label>
            <CustomSelect
              name='companyName'
              value={localFormData.companyName || ''}
              options={companies}
              placeholder='Select Company Name'
              onChange={(name, value) => {
                handleLocalChange({ target: { name, value } });
              }}
              searchable={true}
            />
            {getFieldError('companyName') && (
              <span className='block mt-1 text-xs text-red-500'>
                {getFieldError('companyName')}
              </span>
            )}
          </div>

          <div className='mb-4 md:mb-6'>
            <CustomSelect
              label='Industry/Sector'
              name='industry'
              value={localFormData.industry || ''}
              options={industries}
              placeholder='Select Industry'
              onChange={(name, value) => {
                handleLocalChange({ target: { name, value } });
              }}
              searchable={true}
            />
            {getFieldError('industry') && (
              <span className='text-xs text-red-500'>{getFieldError('industry')}</span>
            )}
          </div>

          <div className='mb-4 md:mb-6'>
            <CustomSelect
              label='Years of Experience'
              name='experience'
              value={localFormData.experience || ''}
              options={experiences}
              placeholder='Select Experience'
              onChange={(name, value) => {
                handleLocalChange({ target: { name, value } });
              }}
              searchable={true}
            />
            {getFieldError('experience') && (
              <span className='text-xs text-red-500'>{getFieldError('experience')}</span>
            )}
          </div>

          <div className='mb-4 md:mb-6'>
            <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
              Key Skills or Areas of Expertise <span className='text-red-500'>*</span>
            </label>
            <CustomSelect
              name='skills'
              value={
                localFormData.skills && localFormData.skills.length > 0
                  ? localFormData.skills[0]
                  : ''
              }
              options={skills}
              placeholder='Select your key skills'
              onChange={(name, value) => {
                handleSkillsChange([value]);
              }}
              searchable={true}
            />
            {getFieldError('skills') && (
              <span className='block mt-1 text-xs text-red-500'>{getFieldError('skills')}</span>
            )}
          </div>

          <div className='mb-4 md:mb-6'>
            <label className='block pt-2 text-white'>LinkedIn Profile / Website (Optional)</label>
            <div className='relative flex items-center'>
              <Input
                type='text'
                name='linkedinProfile'
                value={localFormData.linkedinProfile || ''}
                onChange={handleLocalChange}
                placeholder='Profile link or User name (optional)'
                className={`w-full bg-transparent text-white rounded-full px-4 py-3 placeholder-white border ${getFieldError('linkedinProfile') ? 'border-red-500' : 'border-gray-700'}`}
              />
              {localFormData.linkedinProfile && !getFieldError('linkedinProfile') && (
                <CheckCircle className='absolute text-green-400 right-4' size={22} />
              )}
            </div>
            {getFieldError('linkedinProfile') && (
              <span className='text-xs text-red-500'>{getFieldError('linkedinProfile')}</span>
            )}
          </div>

          <div className='mb-4 md:mb-6'>
            <CustomSelect
              label='Nationality'
              name='nationality'
              value={localFormData.nationality || ''}
              options={nationalities}
              placeholder='Select Nationality'
              onChange={(name, value) => {
                handleLocalChange({ target: { name, value } });
              }}
              searchable={true}
            />
            {getFieldError('nationality') && (
              <span className='text-xs text-red-500'>{getFieldError('nationality')}</span>
            )}
          </div>

          {/* Mobile Button */}
          <div className='block mt-6 md:hidden'>
            <Button
              type='button'
              onClick={handleContinueStep}
              className='w-full flex items-center justify-center px-6 py-6 text-white bg-purple-600 rounded-full hover:bg-purple-500 disabled:opacity-50'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Processing...
                </>
              ) : (
                'Complete'
              )}
            </Button>
          </div>

          {/* Desktop Buttons */}
          <div className='hidden mt-8 md:block'>
            <div className='flex items-center justify-between gap-3'>
              <Button type='button' className='rounded-full px-6 py-6 bg-white text-black' onClick={handleBackToPrevious}>
                Back
              </Button>
              <Button
                type='button'
                onClick={handleContinueStep}
                className='flex items-center px-6 py-6 text-white bg-purple-600 rounded-full hover:bg-purple-500 disabled:opacity-50'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Processing...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </div>
        </form>
      </>
    );
  }

  // Step 2: Education Details
  // const isStep2Valid = Boolean(
  //   documentFile &&
  //     localFormData.fieldOfStudy &&
  //     localFormData.collegeName &&
  //     localFormData.passedOutYear
  // );
  return (
    <>
      {contextHolder}
      <form
        className='w-full p-6 px-4 mx-auto space-y-6 rounded-lg bg-secondary'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center mb-6'>
          <div className='text-lg font-semibold text-white'>Education Details</div>
        </div>

        <div className='mb-4 md:mb-6'>
          <CustomSelect
            label='Field of Study'
            name='fieldOfStudy'
            value={localFormData.fieldOfStudy || ''}
            options={fieldsOfStudy}
            placeholder='Select Field of Study'
            onChange={(name, value) => {
              handleLocalChange({ target: { name, value } });
            }}
            searchable={true}
          />
          {getFieldError('fieldOfStudy') && (
            <span className='text-xs text-red-500'>{getFieldError('fieldOfStudy')}</span>
          )}
        </div>

        <div className='mb-4 md:mb-6'>
          <CustomSelect
            label='College Name'
            name='collegeName'
            value={localFormData.collegeName || ''}
            options={colleges}
            placeholder='Select College Name'
            onChange={(name, value) => {
              handleLocalChange({ target: { name, value } });
            }}
            searchable={true}
          />
          {getFieldError('collegeName') && (
            <span className='text-xs text-red-500'>{getFieldError('collegeName')}</span>
          )}
        </div>

        <div className='mb-4 md:mb-6'>
          <CustomSelect
            label='Passed Out Year'
            name='passedOutYear'
            value={localFormData.passedOutYear || ''}
            options={years}
            placeholder='Select Year'
            onChange={(name, value) => {
              handleLocalChange({ target: { name, value } });
            }}
            searchable={true}
          />
          {getFieldError('passedOutYear') && (
            <span className='text-xs text-red-500'>{getFieldError('passedOutYear')}</span>
          )}
        </div>

        {/* Upload Documents */}
        <div className='mb-4 md:mb-6'>
          <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
            Upload Company Certificate <span className='text-red-500'>*</span>
          </label>
          <Card
            style={{
              border: '1px solid transparent',
              borderRadius: '16px',
              background: `
      linear-gradient(#232323 , #232323) padding-box, 
      linear-gradient(90deg, #14C0FE, #A82EFF, #CC9192) border-box
    `,
            }}
            className='w-full bg-cardblack rounded-2xl flex flex-col items-center justify-center text-center transition-all 
             hover:shadow-[0_0_12px_rgba(20,192,254,0.35),0_0_18px_rgba(168,46,255,0.3),0_0_24px_rgba(204,145,146,0.25)]'
          >
            {/* Icon Container */}
            <div className='flex flex-col items-center'>
              <input
                type='file'
                accept='.pdf,.jpeg,.jpg,.png'
                onChange={(e) => {
                  handleDocumentChange(e);

                  // ✅ Clear local error on file selection
                  if (errors.degreeDocument) {
                    console.log('Clearing degreeDocument error');
                    setApiError((prev) => ({ ...prev, degreeDocument: null }));
                  }
                }}
                className='absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer'
              />
              <div className='w-9 h-9 p-1.5 bg-black rounded-full flex justify-center items-center'>
                <div className='relative flex items-center justify-center w-6 h-6 overflow-hidden rounded-md'>
                  {/* Neon Gradient Block */}
                  <UploadDocIcon />
                </div>
              </div>

              {/* Text */}
              <div className='flex flex-col items-center '>
                <span className='text-sm font-medium text-white md:text-base'>Click to Upload</span>
                <p className='text-zinc-400 text-[10px] md:text-xs leading-4'>
                  Supported file formats: pdf, jpeg, jpg, png
                </p>
              </div>
            </div>
          </Card>

          {formData.degreeDocument && (
            <div className='flex items-center justify-between p-2 mt-2 border rounded-lg bg-green-900/20 border-green-500/30'>
              <span className='flex items-center text-xs text-green-400'>
                <span className='mr-2'>📄</span>
                {formData.degreeDocument.name}
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-400'>
                  {(formData.degreeDocument.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  type='button'
                  onClick={() =>
                    handleInputChange({ target: { name: 'degreeDocument', value: null } })
                  }
                  className='px-2 py-1 text-xs text-red-400 transition-colors rounded hover:text-red-300 hover:bg-red-900/20'
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {errors.degreeDocument && (
            <p className='mt-1 text-xs text-red-500 md:text-sm'>{errors.degreeDocument}</p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className='block mt-6 md:hidden'>
          <button
            type='button'
            className='w-full h-[56px] bg-purple-600 hover:bg-purple-500 text-white rounded-[28px] font-semibold transition-colors flex items-center justify-center disabled:opacity-50'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 md:w-5 md:h-5 animate-spin' />
                Processing...
              </>
            ) : (
              'Complete'
            )}
          </button>
        </div>

        <div className='justify-between hidden mt-8 md:flex'>
          <button
            type='button'
            className='border border-gray-700 cursor-pointer hover:border-gray-600 text-black px-7 py-3 rounded-[28px] transition-colors'
            onClick={handleBackToPrevious}
          >
            Back
          </button>
          <button
            type='button'
            className='bg-purple-600 hover:bg-purple-500 cursor-pointer text-white px-7 py-3 rounded-[28px] font-semibold transition-colors flex items-center justify-center disabled:opacity-50'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                Processing...
              </>
            ) : (
              'Complete'
            )}
          </button>
        </div>
      </form>
    </>
  );
}
