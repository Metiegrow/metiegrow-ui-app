import React, { useState, useMemo } from 'react';
import { Card, Input, message } from 'antd';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { registrationService } from '../Services/registrationService';
import { useCountries, useUniversities } from '../../Common/APIHandler';
import { UploadDocIcon } from '../Common/SVG/svg.function';
import CountrySelector from './Common/CountrySelector';
import { CustomInput } from '../Common/Inputs';
import CustomSelect from './Common/CustomSelect';
import { SkillsInput } from './Common/SkillsInput';
import { cn } from '../../lib/utils';
import { useIsMobile } from '../../hooks/useMobile';

export default function AlumniOnboardingForm({
  formData,
  errors = {},
  loading = false,
  handleInputChange,
  handleToggle,
  handleContinue,
  ...props
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { data: countries = [], isLoading: countriesLoading } = useCountries();
  const { data: universities = [], isLoading: universitiesLoading } = useUniversities(
    typeof formData.destinationCountry === 'string'
      ? formData.destinationCountry.toLowerCase()
      : formData.destinationCountry
  );

  const courses = ['Law', 'Engineering', 'Business', 'Other'];
  const jobTitles = ['Engineer', 'Manager', 'Lawyer', 'Other'];
  const companies = ['Google', 'Microsoft', 'Amazon', 'Other'];

  // Generate graduation year options
  const graduationYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1950; year--) {
      years.push({ value: year.toString(), label: year.toString() });
    }
    return years;
  }, []);

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

      handleInputChange({ target: { name: 'companyCertificate', value: file } });
      messageApi.success({ content: `File "${file.name}" selected successfully`, duration: 2 });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.destinationCountry) errors.destinationCountry = 'Destination country is required';
    if (!formData.university) errors.university = 'University is required';
    if (!formData.graduationYear) errors.graduationYear = 'Graduation year is required';
    if (!formData.courseProgram) errors.courseProgram = 'Course program is required';
    if (!formData.skills) errors.skills = 'Skills is required';
    if (!formData.currentJobTitle) errors.currentJobTitle = 'Current job title is required';
    if (!formData.companyName) errors.companyName = 'Company name is required';
    if (!formData.companyCertificate) errors.companyCertificate = 'Company certificate is required';
    setLocalErrors(errors);
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      messageApi.error({ content: 'Please fill all required fields', duration: 3 });
      return;
    }

    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL_BACKEND;
      const requestJson = {
        username:
          formData.email?.split('@')[0] || formData.fullName?.toLowerCase()?.replace(/\s+/g, ''),
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password,
        fullName: formData.fullName,
        phoneNumber: formData.mobileNumber || formData.phoneNumber,
        destinationCountry: formData.destinationCountry,
        university: formData.university,
        graduationYear: formData.graduationYear,
        courseProgram: formData.courseProgram,
        studentId: formData.studentId,
        currentJobTitle: formData.currentJobTitle,
        companyName: formData.companyName,
        skills: formData.skills || [],
        linkedinProfile: formData.linkedinProfile,
        careerSummary: formData.careerSummary,
      };

      // Handle file upload for company certificate
      let certificateFile = null;
      if (formData.companyCertificate) {
        certificateFile = formData.companyCertificate;
      }

      const result = await registrationService.registerAlumni(
        baseUrl,
        requestJson,
        certificateFile
      );
      if (!result.ok)
        throw new Error(result.data?.statuses?.[0]?.message || 'Alumni registration failed');
      const successMessage =
        result.data?.statuses?.[0]?.message || 'Registered. Check email for verification link';
      messageApi.success({ content: successMessage, duration: 2 });
      // Use the handleContinue prop instead of direct navigation
      setTimeout(() => {
        if (handleContinue) {
          handleContinue();
        } else {
          navigate('/login');
        }
      }, 2500);
    } catch (err) {
      messageApi.error({ content: err.message || 'Registration failed', duration: 3 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const IsMobile = useIsMobile();

  return (
    <div
      className={cn(
        'p-4 mb-20 rounded-xl md:p-6 register-page ',
        !IsMobile ? 'bg-secondary mt-10' : 'mt-5'
      )}
    >
      {contextHolder}
      <div className='space-y-4 md:space-y-6'>
        {/* 1. Destination Country */}
        <CountrySelector
          label='Destination Country'
          name='destinationCountry'
          value={formData.destinationCountry || ''}
          options={countries}
          placeholder={countriesLoading ? 'Loading countries...' : 'Select Destination Country'}
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required
          error={localErrors.destinationCountry}
          aria-invalid={!!localErrors.destinationCountry}
          aria-describedby={localErrors.destinationCountry ? 'destinationCountry-error' : undefined}
        />
        {/* {localErrors.destinationCountry && (
        <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.destinationCountry}</p>
      )} */}

        {/* 2. Country-based Universities */}
        <CustomSelect
          label='University Name'
          name='university'
          value={formData.university || ''}
          options={Array.isArray(universities) ? universities : []}
          placeholder={
            !formData.destinationCountry
              ? 'Please select a destination country first'
              : universitiesLoading
                ? 'Loading universities...'
                : 'Select University Name'
          }
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required
          disabled={!formData.destinationCountry}
          error={localErrors.university}
          aria-invalid={!!localErrors.university}
          aria-describedby={localErrors.university ? 'university-error' : undefined}
        />
        {/* {localErrors.university && (
        <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.university}</p>
      )} */}

        {/* 3. Graduation Year */}
        <CustomSelect
          label='Graduation Year'
          name='graduationYear'
          value={formData.graduationYear || ''}
          options={graduationYears}
          placeholder='Select Graduation Year'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required
          error={localErrors.graduationYear}
          aria-invalid={!!localErrors.graduationYear}
          aria-describedby={localErrors.graduationYear ? 'graduationYear-error' : undefined}
        />
        {/* {localErrors.graduationYear && (
        <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.graduationYear}</p>
      )} */}

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
                  if (localErrors.docFile) {
                    setLocalErrors((prev) => ({ ...prev, docFile: null }));
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

          {formData.companyCertificate && (
            <div className='flex items-center justify-between p-2 mt-2 border rounded-lg bg-green-900/20 border-green-500/30'>
              <span className='flex items-center text-xs text-green-400'>
                <span className='mr-2'>📄</span>
                {formData.companyCertificate.name}
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-400'>
                  {(formData.companyCertificate.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  type='button'
                  onClick={() =>
                    handleInputChange({ target: { name: 'companyCertificate', value: null } })
                  }
                  className='px-2 py-1 text-xs text-red-400 transition-colors rounded hover:text-red-300 hover:bg-red-900/20'
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {localErrors.docFile && (
            <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.docFile}</p>
          )}
        </div>

        {/* 5. Student ID */}
        <div className='mb-4 md:mb-6'>
          <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
            Student ID
          </label>
          <Input
            type='text'
            name='studentId'
            value={formData.studentId || ''}
            onChange={handleInputChange}
            placeholder='Enter Student ID'
            className='w-full h-[56px] bg-transparent border border-gray-700 rounded-[28px] px-4 md:px-5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors'
          />
        </div>

        {/* 6. Course Program */}
        <CustomSelect
          label='Course Program'
          name='courseProgram'
          value={formData.courseProgram || ''}
          options={courses}
          placeholder='Select Course Program'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required
          error={localErrors.courseProgram}
          aria-invalid={!!localErrors.courseProgram}
          aria-describedby={localErrors.courseProgram ? 'courseProgram-error' : undefined}
        />
        {/* {localErrors.courseProgram && (
        <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.courseProgram}</p>
      )} */}

        {/* 7. Career Journey Summary */}
        <div className='mb-4 md:mb-6'>
          <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
            Share a brief summary of your career journey
          </label>
          <Input.TextArea
            name='careerSummary'
            value={formData.careerSummary || ''}
            onChange={handleInputChange}
            placeholder='Enter your career journey description...'
            maxLength={1000}
            rows={4}
            className='w-full bg-transparent text-white rounded-[28px] px-4 md:px-5 py-3 placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors'
          />
          <div className='mt-1 text-xs text-right text-gray-400'>
            {formData.careerSummary?.length || 0}/1000
          </div>
        </div>

        {/* 8. Current Job Title */}
        <CustomSelect
          label='Current Job Title'
          name='currentJobTitle'
          value={formData.currentJobTitle || ''}
          options={jobTitles}
          placeholder='Select Current Job Title'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required
          error={localErrors.currentJobTitle}
          aria-invalid={!!localErrors.currentJobTitle}
          aria-describedby={localErrors.currentJobTitle ? 'currentJobTitle-error' : undefined}
        />
        {/* {localErrors.currentJobTitle && (
          <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.currentJobTitle}</p>
        )} */}

        {/* 9. Company Name */}
        <CustomSelect
          label='Company Name'
          name='companyName'
          value={formData.companyName || ''}
          options={companies}
          placeholder='Select Company Name'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required
          error={localErrors.companyName}
          aria-invalid={!!localErrors.companyName}
          aria-describedby={localErrors.companyName ? 'companyName-error' : undefined}
        />
        {/* {localErrors.companyName && (
          <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.companyName}</p>
        )} */}

        {/* 10. Skills */}
        <div className='mb-4 md:mb-6'>
          {/* Basic Skills Input */}
          <SkillsInput
            name='skills'
            value={formData.skills}
            onChange={handleInputChange}
            placeholder='Add your technical skills...'
            maxSkills={15}
            error={localErrors.skills}
            aria-invalid={!!localErrors.skills}
            aria-describedby={localErrors.skills ? 'skills-error' : undefined}
          />
        </div>

        {/* 11. LinkedIn Profile / Website */}
        <div className='mb-4 md:mb-6'>
          <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
            LinkedIn Profile / Website
          </label>
          <div className='relative'>
            <Input
              type='text'
              name='linkedinProfile'
              value={formData.linkedinProfile || ''}
              onChange={handleInputChange}
              placeholder='Profile link or User name'
              className={`w-full h-[56px] bg-transparent border ${localErrors.linkedinProfile ? 'border-red-500' : 'border-gray-700'} rounded-[28px] px-4 md:px-5 text-white placeholder-gray-500 pr-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors`}
            />
            {formData.linkedinProfile && !localErrors.linkedinProfile && (
              <CheckCircle
                className='absolute text-green-400 transform -translate-y-1/2 right-4 top-1/2'
                size={20}
              />
            )}
          </div>
          {localErrors.linkedinProfile && (
            <p className='mt-1 text-xs text-red-500 md:text-sm'>{localErrors.linkedinProfile}</p>
          )}
        </div>

        <div className='justify-end hidden mt-8 md:flex'>
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
      </div>
    </div>
  );
}
