import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { BackButtonIcon, UploadDocIcon } from '../Common/SVG/svg.function';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { CustomInput } from '../Common/Inputs';
import { useCountries } from '../../Common/APIHandler';
import Input from 'antd/es/input/Input';
import { useIsMobile } from '../../hooks/useMobile';
import { cn } from '../../lib/utils';
import Card from 'antd/es/card/Card';
import CustomSelect from './Common/CustomSelect';

const FreelanceInfoForm = ({ formData, loading, handleInputChange, handleContinue, onBack }) => {
  const { data: countriesData = [], isLoading: countriesLoading } = useCountries();
  const [messageApi, contextHolder] = message.useMessage();
  const [errors, setErrors] = React.useState({});

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

  const validate = () => {
    const newErrors = {};
    if (!formData.experience) newErrors.experience = 'Total experience is required';
    if (!formData.country) newErrors.country = 'Location is required';
    if (!formData.jobRole) newErrors.jobRole = 'Role is required';
    if (!formData.recruiterDocument) newErrors.recruiterDocument = 'Document is required';
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

  const IsMobile = useIsMobile();

  // useEffect(() => {
  //   console.log(' Step1Form formData changed:', formData);
  // }, [formData]);

  return (
    <div
      className={cn(
        'h-full p-4 mb-20 rounded-xl md:p-6 register-page',
        !IsMobile && 'bg-secondary'
      )}
    >
      {/* Header */}
      <h1 className='mx-8 text-xl font-medium md:ml-0'>Professional Info</h1>

      {contextHolder}

      <form onSubmit={handleSubmit} className='w-full max-w-full mx-auto space-y-4 md:space-y-6'>
        {/* Total Experience */}

        <CustomInput
          type='number'
          name='experience'
          label={'Total Experience'}
          value={formData.experience || ''}
          onChange={handleInputChange}
          placeholder='Enter Total Experience'
          // className='w-full h-[56px] bg-transparentx border border-gray-700 rounded-[28px] px-4 md:px-5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors'
          required
          error={errors.experience}
          aria-invalid={!!errors.experience}
          aria-describedby={errors.experience ? 'experience-error' : undefined}
        />

        {/* Location */}
        <CustomSelect
          label='Location'
          name='country'
          value={formData?.country || ''}
          options={countriesData.map((country) => country.name)}
          placeholder={countriesLoading ? 'Loading countries...' : 'Select Country'}
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required={true}
          disabled={countriesLoading}
          error={errors.country}
          aria-invalid={!!errors.country}
          aria-describedby={errors.country ? 'country-error' : undefined}
        />

        {/* Role */}
        <CustomSelect
          label='Role'
          name='jobRole'
          value={formData?.jobRole || ''}
          options={[
            { value: 'Frontend Developer', label: 'Frontend Developer' },
            { value: 'Backend Developer', label: 'Backend Developer' },
          ]}
          placeholder='Select Role'
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable={true}
          required={true}
          error={errors.jobRole}
          aria-invalid={!!errors.jobRole}
          aria-describedby={errors.jobRole ? 'jobRole-error' : undefined}
        />

        {/* Education Title */}
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-white'>Education Details</h2>
          <Button
            type='button'
            className='text-sm font-medium text-purple-400 bg-transparent border-0'
          >
            + Add
          </Button>
        </div>

        {/* Graduation Level */}
        <CustomSelect
          label='Graduation Level'
          name='graduationLevel'
          value={formData?.graduationLevel || ''}
          options={[
            { value: "Bachelor's", label: "Bachelor's" },
            { value: "Master's", label: "Master's" },
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
            { value: 'Computer Science', label: 'Computer Science' },
            { value: 'Engineering', label: 'Engineering' },
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
            { value: 'ABC College', label: 'ABC College' },
            { value: 'XYZ University', label: 'XYZ University' },
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
            { value: '2022', label: '2022' },
            { value: '2023', label: '2023' },
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
                  onClick={() =>
                    handleInputChange({ target: { name: 'recruiterDocument', value: null } })
                  }
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
      </form>
    </div>
  );
};

export default FreelanceInfoForm;
