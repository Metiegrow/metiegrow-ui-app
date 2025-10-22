import React, { useState, useMemo, useRef } from 'react';
import { Button, Card, message } from 'antd';
import { useCountries, useStates } from './Common/SignupAPIHandler';
import { useIsMobile } from '../../hooks/useMobile';
import { cn } from '../../lib/utils';
import { UploadDocIcon } from '../Common/SVG/svg.function';
import dayjs from 'dayjs';
import CustomSelect from './Common/CustomSelect';
import { CustomInput } from '../Common/Inputs';

const PGOwnerForm = ({
  formData,
  loading,
  handleInputChange,
  handleContinue,
  onBack,
  setFormData,
  setStep,
}) => {
  const [mergedErrors, setMergedErrors] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const firstInvalidTriedRef = useRef(false);
  const IsMobile = useIsMobile();

  // Load countries and states
  const { data: countriesData = [], isLoading: countriesLoading } = useCountries();
  const selectedCountryName = formData.country || '';
  const { data: statesData = [], isLoading: statesLoading } = useStates(
    selectedCountryName ? selectedCountryName.toLowerCase() : undefined
  );
  const countryNames = useMemo(() => countriesData.map((c) => c.name), [countriesData]);
  const govIdTypes = ['Aadhar', 'PAN', 'VoterID', 'DrivingLicense', 'Passport'];

  // File upload
  const handleDocumentChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      messageApi.error('Please upload a valid file (PDF, JPEG, JPG, PNG)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      messageApi.error('File size must be less than 5MB');
      return;
    }

    setFormData((prev) => ({ ...prev, landlordDocument: file }));
    messageApi.success(`File "${file.name}" selected successfully`);
  };

  // Focus first invalid input
  const focusFirstInvalid = (errObj) => {
    const keys = Object.keys(errObj);
    if (!keys.length) return;
    const firstKey = keys[0];
    const el =
      document.querySelector(`[name="${firstKey}"]`) || document.querySelector(`#${firstKey}`);
    if (el && typeof el.focus === 'function') {
      setTimeout(() => {
        try {
          el.focus();
        } catch (e) {}
      }, 50);
    }
  };

  // Validation
  const validateForm = (data) => {
    const newErrors = {};
    if (!data.doorStreetName?.trim()) newErrors.doorStreetName = 'Door/Street name is required';
    if (!data.locality?.trim()) newErrors.locality = 'Locality is required';
    if (!data.cityTown?.trim()) newErrors.cityTown = 'City/Town is required';
    if (!data.state) newErrors.state = 'State is required';
    if (!data.country) newErrors.country = 'Country is required';
    if (!data.zipCode?.trim()) newErrors.zipCode = 'Zip/Postal code is required';
    if (!data.govIdType) newErrors.govIdType = 'Government ID type is required';
    if (!data.idNumber?.trim()) newErrors.idNumber = 'ID number is required';
    if (!data.landlordDocument) newErrors.landlordDocument = 'Document is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setMergedErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (!firstInvalidTriedRef.current) {
        focusFirstInvalid(newErrors);
        firstInvalidTriedRef.current = true;
        setTimeout(() => (firstInvalidTriedRef.current = false), 1000);
      }
      return;
    }

    handleContinue();
  };

  return (
    <div className={cn('p-4 rounded-xl md:p-6 register-page', !IsMobile && 'bg-secondary')}>
      {contextHolder}
      <h2 className='text-xl font-semibold text-white'>Personal Information</h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <CustomInput
          label='Door No/Street Name'
          name='doorStreetName'
          value={formData.doorStreetName || ''}
          onChange={handleInputChange}
          placeholder='Ex 12 VC Street'
          required
          error={mergedErrors.doorStreetName}
          aria-invalid={!!mergedErrors.doorStreetName}
          aria-describedby={mergedErrors.doorStreetName ? 'doorStreetName-error' : undefined}
        />

        <CustomInput
          label='Locality'
          name='locality'
          value={formData.locality || ''}
          onChange={handleInputChange}
          placeholder='Area Locality'
          required
          error={mergedErrors.locality}
          aria-invalid={!!mergedErrors.locality}
          aria-describedby={mergedErrors.locality ? 'locality-error' : undefined}
        />

        <CustomInput
          label='City/Town'
          name='cityTown'
          value={formData.cityTown || ''}
          onChange={handleInputChange}
          placeholder='Enter City/Town'
          required
          error={mergedErrors.cityTown}
          aria-invalid={!!mergedErrors.cityTown}
          aria-describedby={mergedErrors.cityTown ? 'cityTown-error' : undefined}
        />

        <div className='flex w-full gap-2'>
          <CustomSelect
            label='State'
            name='state'
            value={formData.state || ''}
            options={statesData}
            placeholder={statesLoading ? 'Loading states...' : 'Select State'}
            required
            onChange={(name, value) => handleInputChange({ target: { name, value } })}
            searchable
            disabled={statesLoading}
            error={mergedErrors.state}
            aria-invalid={!!mergedErrors.state}
            aria-describedby={mergedErrors.state ? 'state-error' : undefined}
          />

          <CustomSelect
            label='Country'
            name='country'
            value={formData.country || ''}
            options={countryNames}
            placeholder={countriesLoading ? 'Loading countries...' : 'Select Country'}
            required
            onChange={(name, value) => handleInputChange({ target: { name, value } })}
            searchable
            error={mergedErrors.country}
            aria-invalid={!!mergedErrors.country}
            aria-describedby={mergedErrors.country ? 'country-error' : undefined}
          />
        </div>

        <CustomInput
          label='Zip/Postal Code'
          name='zipCode'
          value={formData.zipCode || ''}
          onChange={handleInputChange}
          placeholder='Ex: 670008'
          required
          error={mergedErrors.zipCode}
          aria-invalid={!!mergedErrors.zipCode}
          aria-describedby={mergedErrors.zipCode ? 'zipCode-error' : undefined}
        />

        <CustomSelect
          label='Govt Issued ID'
          name='govIdType'
          value={formData.govIdType || ''}
          options={govIdTypes}
          placeholder='Select Issuing ID'
          required
          onChange={(name, value) => handleInputChange({ target: { name, value } })}
          searchable
          error={mergedErrors.govIdType}
          aria-invalid={!!mergedErrors.govIdType}
          aria-describedby={mergedErrors.govIdType ? 'govIdType-error' : undefined}
        />

        <CustomInput
          label='ID Number'
          name='idNumber'
          value={formData.idNumber || ''}
          onChange={handleInputChange}
          placeholder='Enter Number'
          required
          error={mergedErrors.idNumber}
          aria-invalid={!!mergedErrors.idNumber}
          aria-describedby={mergedErrors.idNumber ? 'idNumber-error' : undefined}
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

                  // ✅ Clear local error on file selection
                  if (mergedErrors.docFile) {
                    setMergedErrors((prev) => ({ ...prev, docFile: null }));
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

          {formData.landlordDocument && (
            <div className='flex items-center justify-between p-2 mt-2 border rounded-lg bg-green-900/20 border-green-500/30'>
              <span className='flex items-center text-xs text-green-400'>
                <span className='mr-2'>📄</span>
                {formData.landlordDocument.name}
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-400'>
                  {(formData.landlordDocument.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  type='button'
                  onClick={() => setFormData((prev) => ({ ...prev, landlordDocument: null }))}
                  className='px-2 py-1 text-xs text-red-400 transition-colors rounded hover:text-red-300 hover:bg-red-900/20'
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {mergedErrors.landlordDocument && (
            <p className='mt-1 text-xs text-red-500 md:text-sm'>{mergedErrors.landlordDocument}</p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className='flex justify-between mt-8'>
          <Button type='button' onClick={onBack} className='px-6 py-4 border rounded-full'>
            Back
          </Button>
          <Button
            type='submit'
            onClick={handleSubmit}
            loading={loading}
            className='px-6 py-4 text-white bg-purple-600 rounded-full'
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PGOwnerForm;
