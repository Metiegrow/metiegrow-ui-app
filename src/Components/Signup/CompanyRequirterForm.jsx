import React, { useState } from 'react';
import { Button, Card, DatePicker, message } from 'antd';
import { BackButtonIcon, UploadDocIcon } from '../Common/SVG/svg.function';
import { useCountries } from '../../Common/APIHandler';
import { CustomInput } from '../Common/Inputs';
import CustomSelect from './Common/CustomSelect';
import dayjs from 'dayjs';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '../../hooks/useMobile';
import { cn } from '../../lib/utils';

const CompanyRequirterForm = ({
  handleContinue,
  onBack,
  formData,
  loading = false,
  handleInputChange = () => { },
}) => {
  const { data: countriesData = [], isLoading: countriesLoading } = useCountries();
  const [messageApi, contextHolder] = message.useMessage();
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData?.experience) newErrors.experience = 'Total experience is required';
    if (!formData?.company) newErrors.company = 'Company name is required';
    if (!formData?.location) newErrors.location = 'Location is required';
    if (!formData?.role) newErrors.role = 'Role is required';
    if (!formData?.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
    if (!formData?.recruiterDocument) newErrors.recruiterDocument = 'Document is required';
    setErrors(newErrors);
    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    console.log('Errors validations ', v);
    if (Object.keys(v).length > 0) {
      messageApi.error({ content: 'Please fill all required fields', duration: 3 });
      return;
    }
    if (handleContinue) {
      handleContinue(e);
    }
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

      handleInputChange({ target: { name: 'recruiterDocument', value: file } });
      messageApi.success({ content: `File "${file.name}" selected successfully`, duration: 2 });
    }
  };
  const IsMobile = useIsMobile();

  return (
    <div className={cn('p-4 rounded-xl md:p-6 register-page', !IsMobile && 'bg-secondary')}>
      {contextHolder}
      <div className='space-y-8 md:space-y-6'>
        {/* Professional Info Header */}
        <h2 className='text-lg font-semibold text-white'>Professional Info</h2>

        {/* Experience */}
        <CustomInput
          type='number'
          label='Total Experience'
          name='experience'
          value={formData?.experience || ''}
          onChange={handleInputChange}
          placeholder='Enter Total Experience'
          required={true}
          error={errors.experience}
          aria-invalid={!!errors.experience}
          aria-describedby={errors.experience ? 'experience-error' : undefined}
        />

        {/* Company Name */}
        <CustomInput
          label='Company Name'
          name='company'
          value={formData?.company || ''}
          onChange={handleInputChange}
          placeholder='Enter Company Name'
          required={true}
          disabled={countriesLoading}
          error={errors.company}
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? 'company-error' : undefined}
        />

        {/* Location */}
        <CustomSelect
          label='Location'
          name='location'
          value={formData?.location || ''}
          options={countriesData.map((country) => country.name)}
          placeholder={countriesLoading ? 'Loading countries...' : 'Select Country'}
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required={true}
          disabled={countriesLoading}
          error={errors.location}
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? 'location-error' : undefined}
        />

        {/* Role */}
        <CustomSelect
          label='Role'
          name='role'
          value={formData?.role || ''}
          options={[
            { value: 'hr-manager', label: 'HR Manager' },
            { value: 'recruiter', label: 'Recruiter' },
            { value: 'talent-acquisition', label: 'Talent Acquisition' },
            { value: 'hr-generalist', label: 'HR Generalist' },
            { value: 'hr-specialist', label: 'HR Specialist' },
          ]}
          placeholder='Select Role'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required={true}
          error={errors.role}
          aria-invalid={!!errors.role}
          aria-describedby={errors.role ? 'role-error' : undefined}
        />

        <div className='mb-4 md:mb-6'>
          <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
            Date of Joining <span className='text-red-500'>*</span>
          </label>
          <DatePicker
            name='dateOfJoining'
            value={formData.dateOfJoining ? dayjs(formData.dateOfJoining) : null}
            onChange={(date, dateString) => {
              handleInputChange({
                target: { name: 'dateOfJoining', value: dateString || null },
              });
              if (formData.dateOfJoining) {
                setErrors((prev) => ({ ...prev, dateOfJoining: '' }));
              }
            }}
            placeholder='Select preferred move in date'
            className='w-full bg-transparent'
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            format='YYYY-MM-DD'
            allowClear
          />
          {errors.dateOfJoining && <p className='text-sm text-red-500'>{errors.dateOfJoining}</p>}
        </div>

        {/* Education Details Header */}
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-white'>Education Details</h2>
          <Button type='button' className='text-sm bg-transparent border-0 font-medium text-purple-400'>
            + Add
          </Button>
        </div>

        {/* Graduation Level */}
        <CustomSelect
          label='Graduation Level'
          name='graduationLevel'
          value={formData?.graduationLevel || ''}
          options={[
            { value: 'bachelors', label: "Bachelor's" },
            { value: 'masters', label: "Master's" },
            { value: 'phd', label: 'PhD' },
            { value: 'diploma', label: 'Diploma' },
          ]}
          placeholder='Select Graduation Level'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
        />

        {/* Field of Study */}
        <CustomSelect
          label='Field of Study'
          name='fieldOfStudy'
          value={formData?.fieldOfStudy || ''}
          options={[
            { value: 'human-resources', label: 'Human Resources' },
            { value: 'business-administration', label: 'Business Administration' },
            { value: 'psychology', label: 'Psychology' },
            { value: 'industrial-relations', label: 'Industrial Relations' },
            { value: 'management', label: 'Management' },
          ]}
          placeholder='Select Field of Study'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
        />

        {/* College Name */}
        <CustomSelect
          label='College Name'
          name='collegeName'
          value={formData?.collegeName || ''}
          options={[
            { value: 'university-of-sydney', label: 'University of Sydney' },
            { value: 'university-of-melbourne', label: 'University of Melbourne' },
            { value: 'university-of-queensland', label: 'University of Queensland' },
            { value: 'monash-university', label: 'Monash University' },
            { value: 'university-of-new-south-wales', label: 'University of New South Wales' },
          ]}
          placeholder='Select College Name'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
        />

        {/* Passed Out Year */}
        <CustomSelect
          label='Passed Out Year'
          name='passedOutYear'
          value={formData?.passedOutYear || ''}
          options={[
            { value: '2024', label: '2024' },
            { value: '2023', label: '2023' },
            { value: '2022', label: '2022' },
            { value: '2021', label: '2021' },
            { value: '2020', label: '2020' },
          ]}
          placeholder='Select Year'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
        />

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

                  // // ✅ Clear local error on file selection
                  if (errors.recruiterDocument) {
                    setErrors((prev) => ({ ...prev, recruiterDocument: null }));
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

          {formData.recruiterDocument && (
            <div className='flex items-center justify-between p-2 mt-2 border rounded-lg bg-green-900/20 border-green-500/30'>
              <span className='flex items-center text-xs text-green-400'>
                <span className='mr-2'>📄</span>
                {formData.recruiterDocument.name}
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-400'>
                  {(formData.recruiterDocument.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  type='button'
                  onChange={(e) => {
                    handleDocumentChange(e);

                    // // ✅ Clear local error on file selection
                    if (errors.recruiterDocument) {
                      setErrors((prev) => ({ ...prev, recruiterDocument: null }));
                    }
                  }}
                  className='px-2 py-1 text-xs text-red-400 transition-colors rounded hover:text-red-300 hover:bg-red-900/20'
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {errors.recruiterDocument && (
            <p className='mt-1 text-xs text-red-500 md:text-sm'>{errors.recruiterDocument}</p>
          )}
        </div>

        {/* Mobile submit button */}
        <div className='block mt-6 md:hidden'>
          <button
            type='submit'
            onClick={handleSubmit}
            className='w-full h-[56px] bg-purple-600 hover:bg-purple-500 text-white rounded-[28px] font-semibold transition-colors flex items-center justify-center disabled:opacity-50'
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
          </button>
        </div>

        {/* Desktop submit button */}
        <div className='justify-between hidden mt-8 md:flex'>
          <button
            type='button'
            onClick={onBack}
            className='border border-gray-700 hover:border-gray-600 text-black px-7 py-3 rounded-[28px] transition-colors'
          >
            Back
          </button>
          <button
            type='submit'
            onClick={handleSubmit}
            className='bg-purple-600 hover:bg-purple-500 text-white px-7 py-3 rounded-[28px] font-semibold transition-colors flex items-center justify-center disabled:opacity-50'
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
};

export default CompanyRequirterForm;
