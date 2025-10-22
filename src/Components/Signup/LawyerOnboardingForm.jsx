import React, { useState, useMemo, useEffect } from 'react';
import { Button, Card, DatePicker, Input, message } from 'antd';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { registrationService } from '../Services/registrationService';
import {
  useCountries,
  useStates,
  useCities,
  useLanguages,
  useUniversities,
} from './Common/SignupAPIHandler';
import CustomSelect from './Common/CustomSelect';
import CountrySelector from './Common/CountrySelector';
import { UploadDocIcon } from '../Common/SVG/svg.function';
import { useIsMobile } from '../../hooks/useMobile';
import { cn } from '../../lib/utils';
import { CustomInput } from '../Common/Inputs';
import dayjs from 'dayjs';
import { pass } from 'three/tsl';

export default function LawyerOnboardingForm({
  formData,
  errors = {},
  loading = false,
  handleInputChange,
  handleContinue,
  onBack,
  lawDegrees = ['LLB', 'LLM', 'JD', 'Other'],
  universities = ['Harvard Law', 'Yale Law', 'Stanford Law', 'Other'],
  graduationYears = Array.from({ length: 30 }, (_, i) => `${2024 - i}`),
  cities = ['Sydney', 'Melbourne', 'Brisbane', 'Other'],
  languages = ['English', 'Hindi', 'Mandarin', 'Other'],
}) {
  const [step, setStep] = useState(1);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [docFile, setDocFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleDocumentChange = (e, fieldName) => {
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
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        messageApi.error({ content: 'File size must be less than 5MB', duration: 3 });
        return;
      }

      // ✅ Set to local state if you want
      setDocFile(file);

      // ✅ Instantly update formData state
      console.log(fieldName, file);
      handleLocalChange({ target: { name: fieldName, value: file } });

      messageApi.success({ content: `File "${file.name}" selected successfully`, duration: 2 });
    } else {
      // Clear the file if user removes it
      setDocFile(null);
      handleLocalChange({ target: { name: fieldName, value: null } });
    }
  };

  const companies = ['Google', 'Microsoft', 'Amazon', 'Other'];
  const fieldsetOfStudy = [
    'Computer Science',
    'Medicine',
    'Engineering',
    'Business Administration',
    'Law',
  ];

  const passedOutYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1950; year--) {
      years.push({ value: year.toString(), label: year.toString() });
    }
    return years;
  }, []);

  const [touched, setTouched] = useState({});

  const [localFormData, setLocalFormData] = useState({
    // API fields
    username: '',
    barCouncilId: '',
    lawSchool: '',
    specialization: '',
    experience: '',
    skills: [],
    linkedinProfile: '',
    companyName: '',
    licenseNumber: '',
    issuingAuthority: '',
    expiringDate: null,
    jurisdictions: [],
    collegeName: '',
    passedOutYear: '',
    licenseDocument: null,
    ...formData,
  });

  const handleSkillsChange = (selectedSkills) => {
    setLocalFormData((prev) => ({ ...prev, skills: selectedSkills }));
    setTouched((prev) => ({ ...prev, skills: true }));
  };

  // Validation function for individual fields
  const getFieldError = (field) => {
    // if (!submitAttempted && !touched[field]) return '';

    const value = localFormData[field];

    console.log('Field:', field, 'Value:', value);

    // Required fields
    const requiredFields = [
      'fullName',
      'email',
      'password',
      'confirmPassword',
      'mobileNumber',
      // 'barCouncilId',
      // 'lawSchool',
      // 'specialization',
      'experience',
      'skills',
      'companyName',
      // 'licenseNumber',
      'issuingAuthority',
      'expiringDate',
      'jurisdictions',
      'licenseDocument',
    ];

    console.log('requiredFields: ', requiredFields);

    if (requiredFields.includes(field)) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return 'This field is required.';
      }
    }

    return '';
  };

  // Step continue handler
  const handleContinueStep = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const errors = {};
    let hasError = false;

    console.log('localFormData: ', localFormData);

    // Check all fields in request JSON
    const fieldsToCheck = [
      'fullName',
      'email',
      'password',
      'confirmPassword',
      'mobileNumber',
      // 'lawSchool',
      // 'specialization',
      'experience',
      'skills',
      'issuingAuthority',
      'companyName',
      // 'licenseNumber',
      'issuingAuthority',
      'expiringDate',
      'jurisdictions',
      'licenseDocument',
    ];

    fieldsToCheck.forEach((field) => {
      const error = getFieldError(field);
      if (error) {
        hasError = true;
        errors[field] = error;
      }
    });
    console.log('errors: ', errors);

    // Mark touched for all fields
    const touchedFields = {};
    fieldsToCheck.forEach((field) => {
      console.log('Field:', field, 'Value:', localFormData[field]);
      touchedFields[field] = true;
    });
    setTouched((prev) => ({ ...prev, ...touchedFields }));

    if (hasError) {
      console.log('Validation errors:', errors);
      messageApi.error({ content: 'Please fill all required fields', duration: 3 });
      setLocalErrors(errors);
      return;
    }

    setLocalErrors({});
    setSubmitAttempted(false);
    setStep(2); // or trigger next step
  };

  // Handle individual input changes
  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (handleInputChange) handleInputChange(e);
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

    let hasError = false;
    const errors = {};

    // Required fields for submission
    const requiredFields = [
      'fullName',
      'email',
      'password',
      'confirmPassword',
      'mobileNumber',
      // 'barCouncilId',
      // 'lawSchool',
      // 'specialization',
      'experience',
      'skills',
      'companyName',
      // 'licenseNumber',

      'issuingAuthority',
      'expiringDate',
      'fieldOfStudy',
      'licenseDocument',
      'jurisdictions',
      'collegeName',
      'passedOutYear',
      'fieldOfStudy',
    ];

    // Validate each required field
    requiredFields.forEach((field) => {
      const value = localFormData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        hasError = true;
        errors[field] = `${field} is required.`;
      }
    });

    // Set touched state for all fields
    const touchedFields = {};
    requiredFields.forEach((field) => {
      touchedFields[field] = true;
    });
    setTouched((prev) => ({ ...prev, ...touchedFields }));

    if (hasError) {
      console.log('Validation errors:', errors);
      messageApi.error({ content: 'Please fill all required fields', duration: 3 });
      setLocalErrors(errors);
      return;
    }

    // Prepare request JSON
    const requestJson = {
      username:
        localFormData.email?.split('@')[0] ||
        localFormData.fullName?.toLowerCase()?.replace(/\s+/g, ''),
      password: localFormData.password,
      confirmPassword: localFormData.password,
      email: localFormData.email,
      fullName: localFormData.fullName,
      phoneNumber: localFormData.mobileNumber || localFormData.phoneNumber,
      barCouncilId: localFormData.barCouncilId,
      lawSchool: localFormData.lawSchool,
      specialization: localFormData.specialization,
      experience: localFormData.experience,
      skills: localFormData.skills,
      linkedinProfile: localFormData.linkedinProfile,
      companyName: localFormData.companyName,
      licenseNumber: localFormData.licenseNumber,
      issuingAuthority: localFormData.issuingAuthority,
      expiringDate: localFormData.expiringDate,
      jurisdictions: localFormData.jurisdictions,
      fieldOfStudy: localFormData.fieldOfStudy,
      collegeName: localFormData.collegeName,
      passedOutYear: localFormData.passedOutYear,
    };

    // Alert the request JSON for debugging
    // alert('Submitting request JSON:\n' + JSON.stringify(requestJson, null, 2));
    console.log('Submitting lawyer registration with document:', localFormData?.name);

    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL_BACKEND;

      if (!baseUrl) {
        throw new Error('API base URL is not configured');
      }

      const result = await registrationService.registerLawyer(
        baseUrl,
        requestJson,
        localFormData.licenseDocument
      );

      if (!result.ok) {
        const errorMessage =
          result.data?.statuses?.[0]?.message ||
          result.data?.message ||
          `Registration failed (Status: ${result.status})`;
        throw new Error(errorMessage);
      }

      const successMessage =
        result.data?.statuses?.[0]?.message ||
        'Registered successfully. Check email for verification link';
      messageApi.success({ content: successMessage, duration: 3 });

      // Navigate after success
      setTimeout(() => {
        if (handleContinue) {
          handleContinue();
        } else {
          navigate('/login');
        }
      }, 3000);
    } catch (err) {
      console.error('Lawyer registration error:', err);
      const errorMessage = err.message || 'Registration failed. Please try again.';
      messageApi.error({ content: errorMessage, duration: 5 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const issuingAuthorities = [
    'Bar Council of India',
    'New York State Bar Association',
    'California State Bar',
    'London Bar Council',
    'Supreme Court Bar Association',
    'Ontario Bar Association',
    'Texas State Bar',
  ];
  // If you want objects for value/label (common for select components)
  const issuingAuthoritiesData = issuingAuthorities.map((authority, index) => ({
    value: authority.toLowerCase().replace(/\s+/g, '_'), // e.g., 'bar_council_of_india'
    label: authority,
  }));

  const jurisdictions = [
    'Civil Law',
    'Criminal Law',
    'Corporate Law',
    'Family Law',
    'Intellectual Property',
    'Environmental Law',
    'Tax Law',
    'Labor & Employment Law',
    'Constitutional Law',
    'International Law',
  ];

  // Convert to value/label objects if your select expects objects
  const jurisdictionsData = jurisdictions.map((zone, index) => ({
    value: zone.toLowerCase().replace(/\s+/g, '_'), // e.g., 'civil_law'
    label: zone,
  }));

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const errors = validate();
  //   if (Object.keys(errors).length > 0) {
  //     messageApi.error({ content: 'Please fill all required fields', duration: 3 });
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     const baseUrl = import.meta.env.VITE_API_BASE_URL_BACKEND;

  //     // Validate base URL
  //     if (!baseUrl) {
  //       throw new Error('API base URL is not configured');
  //     }

  //     const requestJson = {
  //       username:
  //         formData.email?.split('@')[0] || formData.fullName?.toLowerCase()?.replace(/\s+/g, ''),
  //       password: formData.password,
  //       confirmPassword: formData.password,
  //       email: formData.email,
  //       fullName: formData.fullName,
  //       phoneNumber: formData.mobileNumber || formData.phoneNumber,
  //       barCouncilId: formData.barCouncilId,
  //       lawSchool: formData.lawSchool,
  //       specialization: formData.specialization,
  //       experience: formData.experience,
  //       skills: formData.skills,
  //       linkedinProfile: formData.linkedinProfile,
  //       companyName: formData.companyName,
  //       licenseNumber: formData.licenseNumber,
  //       issuingAuthority: formData.issuingAuthority,
  //       expiringDate: formData.expiringDate,
  //       jurisdictions: formData.jurisdictions,
  //       fieldOfStudy: formData.fieldOfStudy,
  //       collegeName: formData.collegeName,
  //       passedOutYear: formData.passedOutYear,
  //     };

  //     console.log('Submitting lawyer registration with document:', docFile?.name);
  //     const result = await registrationService.registerLawyer(baseUrl, requestJson, docFile);

  //     if (!result.ok) {
  //       const errorMessage =
  //         result.data?.statuses?.[0]?.message ||
  //         result.data?.message ||
  //         `Registration failed (Status: ${result.status})`;
  //       throw new Error(errorMessage);
  //     }

  //     const successMessage =
  //       result.data?.statuses?.[0]?.message ||
  //       'Registered successfully. Check email for verification link';
  //     messageApi.success({ content: successMessage, duration: 3 });

  //     console.log('Lawyer registration successful, preparing navigation...');
  //     console.log('handleContinue function:', handleContinue);
  //     console.log('navigate function:', navigate);

  //     setTimeout(() => {
  //       console.log('Timeout executed, attempting navigation...');
  //       if (handleContinue) {
  //         console.log('Calling handleContinue...');
  //         handleContinue();
  //       } else {
  //         console.log('Calling navigate("/login")...');
  //         navigate('/login');
  //       }
  //     }, 3000);
  //   } catch (err) {
  //     console.error('Lawyer registration error:', err);
  //     const errorMessage = err.message || 'Registration failed. Please try again.';
  //     messageApi.error({ content: errorMessage, duration: 5 });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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

  const IsMobile = useIsMobile();

  useEffect(() => {
    console.log('localFormData changed: ', localFormData);
  }, [localFormData]);

  // Step 1: Personal Info
  if (step === 1) {
    return (
      <div>
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

          {/* Total Experience */}
          <CustomInput
            label='Total Experience'
            name='experience'
            value={localFormData.experience || ''}
            placeholder='Enter Total Experience'
            onChange={handleLocalChange}
            searchable={true}
            required
            error={localErrors.experience}
            aria-invalid={!!localErrors.experience}
            aria-describedby={localErrors.experience ? 'experience-error' : undefined}
          />

          {/* Current Company Name */}
          <CustomInput
            label='Current Company Name'
            name='companyName'
            value={localFormData.companyName || ''}
            placeholder={'Enter Company Name'}
            onChange={handleLocalChange}
            searchable={true}
            required
            error={localErrors.companyName}
            aria-invalid={!!localErrors.companyName}
            aria-describedby={localErrors.companyName ? 'companyName-error' : undefined}
          />

          {/* Key Skills / Areas of Expertise */}
          <CustomSelect
            label={'Key Skills / Areas of Expertise'}
            name='skills'
            required
            value={
              localFormData.skills && localFormData.skills.length > 0 ? localFormData.skills[0] : ''
            }
            options={skills}
            placeholder='Select skills'
            onChange={(name, value) => {
              handleSkillsChange([value]);
            }}
            searchable={true}
            error={localErrors.skills}
            aria-invalid={!!localErrors.skills}
            aria-describedby={localErrors.skills ? 'skills-error' : undefined}
          />

          {/* License Number */}
          <div className='mt-2 md:mt-4'>
            {/* Issuing Authority */}
            <CustomSelect
              label='Issuing Authority'
              name='issuingAuthority'
              value={localFormData.issuingAuthority || ''}
              options={
                issuingAuthoritiesData.length > 0 ? issuingAuthoritiesData : issuingAuthorities
              } // define data
              placeholder='Select Issuing Authority'
              onChange={(name, value) => handleLocalChange({ target: { name, value } })}
              searchable={true}
              required
              error={localErrors.issuingAuthority}
              aria-invalid={!!localErrors.issuingAuthority}
              aria-describedby={localErrors.issuingAuthority ? 'issuingAuthority-error' : undefined}
            />
          </div>

          {/* Expiry Date */}
          <div className='mt-2 md:mt-4'>
            <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
              Expiry Date <span className='text-red-500'>*</span>
            </label>
            <DatePicker
              name='expiringDate'
              value={localFormData.expiringDate ? dayjs(localFormData.expiringDate) : null}
              onChange={
                (date, dateString) =>
                  handleLocalChange({ target: { name: 'expiringDate', value: dateString } })
                // if (mergedErrors.accommodationPreferences) {
                //   setLocalErrors((prev) => ({ ...prev, accommodationPreferences: null }));
                // }
              }
              placeholder='Select preferred move in date'
              className='w-full bg-transparent'
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              format='YYYY-MM-DD'
            />
            {localErrors.expiringDate && (
              <p className='text-sm text-red-500'>{localErrors.expiringDate}</p>
            )}
          </div>

          {/* Jurisdictions */}
          <div className='mt-2 md:mt-4'>
            <CustomSelect
              label='Jurisdictions (Practice Zonal Area)'
              name='jurisdictions'
              value={localFormData.jurisdictions || ''}
              options={jurisdictionsData.length > 0 ? jurisdictionsData : jurisdictions} // define data
              placeholder='Select Jurisdictions'
              onChange={(name, value) => handleLocalChange({ target: { name, value } })}
              searchable={true}
              required
              error={localErrors.jurisdictions}
              aria-invalid={!!localErrors.jurisdictions}
              aria-describedby={localErrors.jurisdictions ? 'jurisdictions-error' : undefined}
            />
          </div>

          {/* License Certificate Upload */}
          <div className='mt-4 md:mt-6'>
            <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
              License Certificate Upload <span className='text-red-500'>*</span>
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
                    handleDocumentChange(e, 'licenseDocument');

                    // ✅ Clear local error on file selection
                    if (localErrors.licenseDocument) {
                      setLocalErrors((prev) => ({ ...prev, licenseDocument: null }));
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
                  <span className='text-sm font-medium text-white md:text-base'>
                    Click to Upload
                  </span>
                  <p className='text-zinc-400 text-[10px] md:text-xs leading-4'>
                    Supported file formats: pdf, jpeg, jpg, png
                  </p>
                </div>
              </div>
            </Card>

            {localFormData.licenseDocument && (
              <div className='flex items-center justify-between p-2 mt-2 border rounded-lg bg-green-900/20 border-green-500/30'>
                <span className='flex items-center text-xs text-green-400'>
                  <span className='mr-2'>📄</span>
                  {localFormData.licenseDocument.name}
                </span>
                <div className='flex items-center gap-2'>
                  <span className='text-xs text-gray-400'>
                    {(localFormData.licenseDocument.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <button
                    type='button'
                    onClick={() =>
                      handleLocalChange({ target: { name: 'licenseDocument', value: null } })
                    }
                    className='px-2 py-1 text-xs text-red-400 transition-colors rounded hover:text-red-300 hover:bg-red-900/20'
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {localErrors.licenseDocument && (
              <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.licenseDocument}</p>
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
      </div>
    );
  }

  return (
    <div>
      {contextHolder}
      <form
        className={cn(
          'p-4 mb-20 rounded-xl md:p-6 register-page ',
          !IsMobile ? 'bg-secondary mt-10' : 'mt-5'
        )}
        onSubmit={handleContinueStep}
      >
        <div className='flex items-center mb-6'>
          <div className='text-xl text-white'>Education Details</div>
        </div>

        {/* Filed of Study */}
        <div className='mb-4 md:mb-6'>
          <CustomSelect
            label='Filed of Study'
            name='fieldOfStudy'
            value={localFormData.fieldOfStudy || ''}
            options={fieldsetOfStudy}
            placeholder='Select Filed of Study'
            onChange={(name, value) => handleLocalChange({ target: { name, value } })}
            searchable={true}
            required
            error={localErrors.fieldOfStudy}
            aria-invalid={!!localErrors.fieldOfStudy}
            aria-describedby={localErrors.fieldOfStudy ? 'fieldOfStudy-error' : undefined}
          />
        </div>

        {/* College Name */}
        <div className='mb-4 md:mb-6'>
          <CustomSelect
            label='College Name'
            name='collegeName'
            value={localFormData.collegeName || ''}
            placeholder={'Select College Name'}
            onChange={(name, value) => handleLocalChange({ target: { name, value } })}
            searchable={true}
            options={companies}
            required
            error={localErrors.collegeName}
            aria-invalid={!!localErrors.collegeName}
            aria-describedby={localErrors.collegeName ? 'collegeName-error' : undefined}
          />
        </div>

        {/* Passed Out Year */}
        <div className='mb-4 md:mb-6'>
          <CustomSelect
            label={'Passed Out Year'}
            name='passedOutYear'
            required
            value={
              localFormData.passedOutYear && localFormData.passedOutYear.length > 0
                ? localFormData.passedOutYear[0]
                : ''
            }
            options={passedOutYears}
            placeholder='Select Year'
            onChange={(name, value) => handleLocalChange({ target: { name, value } })}
            searchable={true}
            error={localErrors.passedOutYear}
            aria-invalid={!!localErrors.passedOutYear}
            aria-describedby={localErrors.passedOutYear ? 'passedOutYear-error' : undefined}
          />
        </div>

        {/* Upload documents */}
        <div className='mb-4 md:mb-6'>
          <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
            Upload documents <span className='text-red-500'>*</span>
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
                  handleDocumentChange(e, 'documentUpload');

                  // ✅ Clear local error on file selection
                  if (localErrors.documentUpload) {
                    setLocalErrors((prev) => ({ ...prev, documentUpload: null }));
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

          {localFormData.documentUpload && (
            <div className='flex items-center justify-between p-2 mt-2 border rounded-lg bg-green-900/20 border-green-500/30'>
              <span className='flex items-center text-xs text-green-400'>
                <span className='mr-2'>📄</span>
                {localFormData.documentUpload.name}
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-400'>
                  {(localFormData.documentUpload.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  type='button'
                  onClick={() =>
                    handleLocalChange({ target: { name: 'documentUpload', value: null } })
                  }
                  className='px-2 py-1 text-xs text-red-400 transition-colors rounded hover:text-red-300 hover:bg-red-900/20'
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {localErrors.documentUpload && (
            <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.documentUpload}</p>
          )}
        </div>

        {/* Mobile Layout (< 756px) */}
        <div className='block mt-10 space-y-3 md:hidden'>
          <button
            type='button'
            onClick={handleBackToStep1}
            className='w-full h-[56px] rounded-[28px] bg-gray-300 hover:bg-gray-200 text-black font-semibold transition-colors flex items-center justify-center'
          >
            Back
          </button>
          <button
            type='submit'
            onClick={handleSubmit}
            className='w-full h-[56px] rounded-[28px] bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center'
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </div>

        {/* Desktop Layout (>= 756px) */}
        <div className='justify-between hidden mt-10 md:flex'>
          <button
            type='button'
            onClick={handleBackToStep1}
            className='h-[56px] px-7 rounded-[28px] bg-gray-300 hover:bg-gray-200 text-black font-semibold transition-colors flex items-center'
          >
            Back
          </button>
          <button
            type='submit'
            onClick={handleSubmit}
            className='h-[56px] px-7 rounded-[28px] bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center'
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
