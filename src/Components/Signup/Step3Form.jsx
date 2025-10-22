import { Input, Button, DatePicker } from 'antd';
import { ChevronDown, Calendar, Loader2 } from 'lucide-react';

import { ToggleButton } from './ToggleButton';
import { useUniversities } from '../../Common/APIHandler';
import dayjs from 'dayjs';
import { cn } from '../../lib/utils';
import { useIsMobile } from '../../hooks/useMobile';
import CustomSelect from './Common/CustomSelect';
import CountrySelector from './Common/CountrySelector';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const generateIntakeOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1, currentYear + 2];
  const semesters = ['Spring', 'Fall'];
  return years.flatMap((year) => semesters.map((sem) => `${sem} ${year}`));
};

export const Step3Form = ({
  formData,
  errors,
  loading,
  countries,
  universities,
  courses,
  handleInputChange,
  handleSelectChange,
  toggleCheckboxItem,
  handleCheckboxChange,
  handleAdmissionDetails,
  setStep,
}) => {
  // Use dynamic universities based on selected country
  // const selectedCountry = formData.destinationCountries && formData.destinationCountries[0];
  // const { data: dynamicUniversities = [], isLoading: universitiesLoading } = useUniversities(
  //   typeof selectedCountry === 'string'
  //     ? selectedCountry.map((c) => c.name).toLowerCase()
  //     : selectedCountry
  // );

  // NEW code
  const selectedCountry = formData.destinationCountries?.[0] || ''; // safely get first country as string

  const { data: dynamicUniversities = [], isLoading: universitiesLoading } = useUniversities(
    selectedCountry.toLowerCase() // pass string to your hook
  );

  const IsMobile = useIsMobile();

  // safe occupation tags array
  const accommodationTagsArray = Array.isArray(formData?.accommodationPreferences)
    ? formData.accommodationPreferences
    : [];

  const accommodationOptions = [
    'University housing',
    'Private rental',
    'Shared accommodation',
    'Need help finding one',
  ];

  // safe occupation tags array
  const otherSupportNeededTagsArray = Array.isArray(formData?.otherSupportNeeded)
    ? formData.otherSupportNeeded
    : [];

  const otherSupportNeededOptions = [
    'University housing',
    'Private rental',
    'Shared accommodation',
    'Need help finding one',
  ];

  useEffect(() => {
    console.log(' Step3Form formData changed:', formData);
  }, [formData]);

  const [localErrors, setLocalErrors] = useState({});
  const mergedErrors = { ...localErrors, ...errors };
  const firstInvalidTriedRef = useRef(false);

  // Keep localErrors in sync with parent errors
  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      setLocalErrors((prev) => ({ ...prev, ...errors }));
    }
  }, [errors]);

  // Validation only for the relevant fields
  const validate = (data) => {
    const newErrors = {};

    if (!data.destinationCountries?.length) {
      newErrors.destinationCountries = 'Destination country is required';
    }
    if (!data.universityName) {
      newErrors.universityName = 'University name is required';
    }
    if (!data.course) {
      newErrors.course = 'Course is required';
    }
    if (!data.intakeMonthYear) {
      newErrors.intakeMonthYear = 'Intake month & year is required';
    }
    if (!data.preferredMoveInDate) {
      newErrors.preferredMoveInDate = 'Preferred move-in date is required';
    }
    // if (!accommodationTagsArray.length) {
    //   newErrors.accommodationPreferences = 'Please select at least one accommodation preference';
    // }
    // if (data.lookingForPartTimeJob === null || data.lookingForPartTimeJob === undefined) {
    //   newErrors.lookingForPartTimeJob = 'Please select Yes or No';
    // }
    // if (!data.visaStatus) {
    //   newErrors.visaStatus = 'Visa status is required';
    // }
    // if (!otherSupportNeededTagsArray.length) {
    //   newErrors.otherSupportNeeded = 'Please select at least one option';
    // }
    // if (!data.preferredCommunicationMode) {
    //   newErrors.preferredCommunicationMode = 'Preferred communication mode is required';
    // }

    return newErrors;
  };

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
        } catch (e) {
          console.log('Focus error:', e);
        }
      }, 50);
    }
  };

  const handleLocalSignUp = () => {
    const newErrors = validate(formData);
    setLocalErrors(newErrors);

    console.log('handleAdmissionDetails called ', newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (!firstInvalidTriedRef.current) {
        focusFirstInvalid(newErrors);
        firstInvalidTriedRef.current = true;
        setTimeout(() => {
          firstInvalidTriedRef.current = false;
        }, 1000);
      }
      return;
    }

    if (typeof handleAdmissionDetails === 'function') handleAdmissionDetails();
  };

  return (
    <div
      className={cn(
        'p-4 mb-20 rounded-xl md:p-6 register-page ',
        !IsMobile ? 'bg-secondary mt-10' : 'mt-5'
      )}
    >
      <div className='space-y-4 md:space-y-6'>
        <CountrySelector
          label='Destination Country'
          name='destinationCountries'
          value={formData.destinationCountries[0] || ''}
          options={countries}
          placeholder='Select Country'
          required={true}
          onChange={(name, value) => handleSelectChange(name, [value])}
          searchable={true}
          error={mergedErrors.destinationCountries}
          aria-invalid={!!mergedErrors.destinationCountries}
          aria-describedby={
            mergedErrors.destinationCountries ? 'destinationCountries-error' : undefined
          }
        />
        {/* {mergedErrors.destinationCountries && (
          <p className='text-sm text-red-500'>{mergedErrors.destinationCountries}</p>
        )} */}

        <CustomSelect
          label='University Name'
          name='universityName'
          value={formData.universityName}
          options={dynamicUniversities.length > 0 ? dynamicUniversities : universities || []}
          placeholder={
            !selectedCountry
              ? 'Please select a destination country first'
              : universitiesLoading
                ? 'Loading universities...'
                : 'Select University'
          }
          required={true}
          onChange={handleSelectChange}
          searchable={true}
          disabled={!selectedCountry}
          error={mergedErrors.universityName}
          aria-invalid={!!mergedErrors.universityName}
          aria-describedby={mergedErrors.universityName ? 'universityName-error' : undefined}
        />

        <CustomSelect
          label='Course'
          name='course'
          value={formData.course}
          options={courses}
          placeholder='Select Course'
          required={true}
          onChange={handleSelectChange}
          searchable={true}
          error={mergedErrors.course}
          aria-invalid={!!mergedErrors.course}
          aria-describedby={mergedErrors.course ? 'course-error' : undefined}
        />
        <CustomSelect
          label='Intake Month & Year'
          name='intakeMonthYear'
          value={formData.intakeMonthYear}
          options={generateIntakeOptions()}
          placeholder='Select Intake Month & Year'
          required={true}
          onChange={handleSelectChange}
          error={mergedErrors.intakeMonthYear}
          aria-invalid={!!mergedErrors.intakeMonthYear}
          aria-describedby={mergedErrors.intakeMonthYear ? 'intakeMonthYear-error' : undefined}
        />

        <div className='mb-4 md:mb-6'>
          <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
            Preferred move in date <span className='text-red-500'>*</span>
          </label>
          <DatePicker
            name='preferredMoveInDate'
            value={formData.preferredMoveInDate ? dayjs(formData.preferredMoveInDate) : null}
            onChange={
              (date, dateString) =>
                handleInputChange({ target: { name: 'preferredMoveInDate', value: dateString } })
              // if (mergedErrors.accommodationPreferences) {
              //   setLocalErrors((prev) => ({ ...prev, accommodationPreferences: null }));
              // }
            }
            placeholder='Select preferred move in date'
            className='w-full bg-transparent'
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            format='YYYY-MM-DD'
          />
          {mergedErrors.preferredMoveInDate && (
            <p className='text-sm text-red-500'>{mergedErrors.preferredMoveInDate}</p>
          )}
        </div>

        {/* Accommodation Preference */}
        <div>
          <label className='block mb-1 text-sm font-medium text-white'>
            Accommodation Preference
          </label>
          <div className='flex flex-wrap gap-2'>
            {accommodationOptions.map((option) => {
              const isSelected = accommodationTagsArray.includes(option);
              return (
                <button
                  key={option}
                  type='button'
                  onClick={() => {
                    toggleCheckboxItem('accommodationPreferences', option);

                    // if (mergedErrors.accommodationPreferences) {
                    //   setLocalErrors((prev) => ({ ...prev, accommodationPreferences: null }));
                    // }
                  }}
                  aria-pressed={isSelected}
                  className={`h-8 w-auto rounded-full px-3 md:px-4 flex items-center justify-center text-sm transition cursor-pointer border focus:outline-none ${isSelected
                    ? 'bg-cardblack border-purple-500 text-white'
                    : 'bg-transparent border-gray-700 text-gray-300 hover:border-purple-400'
                    }`}
                >
                  <span className='truncate'>{option}</span>
                </button>
              );
            })}
          </div>
          {/* {mergedErrors.accommodationPreferences && (
            <p className='text-sm text-red-500'>{mergedErrors.accommodationPreferences}</p>
          )} */}
        </div>

        {/* <div>
          <label className='block mb-1 text-sm font-medium text-white'>
            Looking for part-time jobs?
          </label>
          <ToggleButton
            options={[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ]}
            value={formData.lookingForPartTimeJob}
            onChange={(value) => handleCheckboxChange('lookingForPartTimeJob', value)}
          />
        </div> */}

        <div className='flex items-center justify-between'>
          <label className='text-sm text-white md:text-base'>
            Looking for part-time jobs?
          </label>

          <div className='flex justify-center'>
            <div className='relative inline-block w-10 align-middle select-none md:w-12'>
              <input
                type='checkbox'
                checked={formData.lookingForPartTimeJob}
                onChange={(e) =>
                  handleCheckboxChange('lookingForPartTimeJob', e.target.checked)
                }
                className='hidden'
                id='toggle-mentor'
              />
              <label
                htmlFor='toggle-mentor'
                className={`block overflow-hidden h-6 md:h-7 rounded-full cursor-pointer transition-colors ${formData.lookingForPartTimeJob ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
              >
                <span
                  className={`block h-6 md:h-7 w-6 md:w-7 rounded-full bg-white transform transition-transform ${formData.lookingForPartTimeJob
                    ? 'translate-x-4 md:translate-x-5'
                    : 'translate-x-0'
                    }`}
                />
              </label>
            </div>
          </div>
        </div>

        <CustomSelect
          label='Visa Status'
          name='visaStatus'
          value={formData.visaStatus}
          options={['Not Applied', 'Applied', 'Approved', 'Rejected']}
          placeholder='Select Visa Status'
          onChange={handleSelectChange}
        />

        <div>
          <label className='block mb-1 text-sm font-medium text-white'>Other Support Needed</label>
          <div className='flex flex-wrap gap-2'>
            {otherSupportNeededOptions.map((tag) => {
              const isSelected = otherSupportNeededTagsArray.includes(tag);

              return (
                <button
                  key={tag}
                  type='button'
                  onClick={() => toggleCheckboxItem('otherSupportNeeded', tag)}
                  aria-pressed={isSelected}
                  className={`h-8 w-auto rounded-full px-3 md:px-4 flex items-center justify-center text-sm transition cursor-pointer border focus:outline-none ${isSelected
                    ? 'bg-cardblack border-purple-500 text-white'
                    : 'bg-transparent border-gray-700 text-gray-300 hover:border-purple-400'
                    }`}
                >
                  <span className='truncate'>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <label className='text-sm text-white md:text-base'>
            Would you like to receive mentor recommendations?
          </label>

          <div className='flex justify-center'>
            <div className='relative inline-block w-10 align-middle select-none md:w-12'>
              <input
                type='checkbox'
                checked={formData.receiveMentorRecommendation}
                onChange={(e) =>
                  handleCheckboxChange('receiveMentorRecommendation', e.target.checked)
                }
                className='hidden'
                id='toggle-mentor'
              />
              <label
                htmlFor='toggle-mentor'
                className={`block overflow-hidden h-6 md:h-7 rounded-full cursor-pointer transition-colors ${formData.receiveMentorRecommendation ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
              >
                <span
                  className={`block h-6 md:h-7 w-6 md:w-7 rounded-full bg-white transform transition-transform ${formData.receiveMentorRecommendation
                    ? 'translate-x-4 md:translate-x-5'
                    : 'translate-x-0'
                    }`}
                />
              </label>
            </div>
          </div>
        </div>

        <div className='flex flex-row items-center justify-between'>
          <label className='block mb-2 text-sm font-medium text-white md:text-base'>
            Would you like us to notify you about job and housing opportunities?
          </label>
          <div className='flex justify-center'>
            <div className='relative inline-block w-10 align-middle select-none md:w-12'>
              <input
                type='checkbox'
                checked={formData.notifyJobHousing}
                onChange={(e) => handleCheckboxChange('notifyJobHousing', e.target.checked)}
                className='hidden'
                id='toggle-job-housing'
              />
              <label
                htmlFor='toggle-job-housing'
                className={`block overflow-hidden h-6 md:h-7 rounded-full cursor-pointer transition-colors ${formData.notifyJobHousing ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
              >
                <span
                  className={`block h-6 md:h-7 w-6 md:w-7 rounded-full bg-white transform transition-transform ${formData.notifyJobHousing ? 'translate-x-4 md:translate-x-5' : 'translate-x-0'
                    }`}
                />
              </label>
            </div>
          </div>
        </div>

        <CustomSelect
          label='Preferred Communication Mode'
          name='preferredCommunicationMode'
          value={formData.preferredCommunicationMode}
          options={['Email', 'WhatsApp', 'Phone', 'SMS']}
          placeholder='Select Mode'
          onChange={handleSelectChange}
        />
      </div>

      {/* Submit Buttons */}
      <div className='block mt-6 md:hidden'>
        <button
          type='button'
          className='w-full h-[56px] bg-purple-600 hover:bg-purple-500 text-white rounded-[28px] font-semibold transition-colors flex items-center justify-center disabled:opacity-50'
          onClick={handleLocalSignUp}
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
          onClick={() => setStep(1)}
        >
          Back
        </button>
        <button
          type='button'
          className='bg-purple-600 hover:bg-purple-500 cursor-pointer text-white px-7 py-3 rounded-[28px] font-semibold transition-colors flex items-center justify-center disabled:opacity-50'
          onClick={handleLocalSignUp}
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
  );
};
