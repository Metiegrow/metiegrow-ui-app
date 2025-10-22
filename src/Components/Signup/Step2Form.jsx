// Step2Form.jsx
import { Button, Input } from 'antd';
import { Loader2 } from 'lucide-react';
import CustomSelect from './Common/CustomSelect';
import CountrySelector from './Common/CountrySelector';
import { cn } from '../../lib/utils';
import { useIsMobile } from '../../hooks/useMobile';
import { useEffect, useRef, useState } from 'react';

const generateIntakeOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1, currentYear + 2];
  const semesters = ['Spring', 'Fall'];
  return years.flatMap((year) => semesters.map((sem) => `${sem} ${year}`));
};

export const Step2Form = ({
  formData,
  errors,
  loading,
  countries,
  universities,
  universitiesLoading = false,
  handleInputChange,
  handleSelectChange,
  toggleCheckboxItem,
  handleStudentOnboarding,
  setStep,
}) => {
  // local errors override when parent doesn't control errors
  const [localErrors, setLocalErrors] = useState({});
  const mergedErrors = { ...localErrors, ...errors };

  const firstInvalidTriedRef = useRef(false);

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      setLocalErrors((prev) => ({ ...prev, ...errors }));
    }
  }, [errors]);

  // ✅ Validation rules for each field
  const validate = (data) => {
    const newErrors = {};
    if (!data.destinationCountries || !data.destinationCountries.length) {
      newErrors.destinationCountries = 'Please select at least one destination country.';
    }
    if (!data.intakeYear) {
      newErrors.intakeYear = 'Please select an intake year.';
    }
    if (!data.fieldOfStudy || data.fieldOfStudy.trim() === '') {
      newErrors.fieldOfStudy = 'Field of study is required.';
    }
    if (!data.preferredUniversities || !data.preferredUniversities.length) {
      newErrors.preferredUniversities = 'Please select at least one preferred university.';
    }
    // if (!data.occupationTags || data.occupationTags.length === 0) {
    //   newErrors.occupationTags = 'Please select at least one occupation interest.';
    // }
    return newErrors;
  };

  // ✅ Validate before submission
  const handleLocalSubmit = async () => {
    const newErrors = validate(formData);
    setLocalErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (!firstInvalidTriedRef.current) {
        firstInvalidTriedRef.current = true;
        setTimeout(() => {
          firstInvalidTriedRef.current = false;
        }, 1000);
      }
      return;
    }
    handleStudentOnboarding();
  };

  // ✅ Clear errors when user types/selects
  const handleLocalInputChange = (e) => {
    const { name, value } = e.target;
    if (localErrors[name]) {
      setLocalErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    handleInputChange(e);
  };

  const handleLocalSelectChange = (name, value) => {
    if (localErrors[name]) {
      setLocalErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    handleSelectChange(name, value);
  };

  const handleToggleCheckbox = (name, value) => {
    // if (localErrors[name]) {
    //   setLocalErrors((prev) => {
    //     const updated = { ...prev };
    //     delete updated[name];
    //     return updated;
    //   });
    // }
    toggleCheckboxItem(name, value);
  };

  const occupationTagsArray = Array.isArray(formData?.occupationTags)
    ? formData.occupationTags
    : [];

  const occupationOptions = [
    'Understanding job prospects',
    'Application & SOP review',
    'Visa & immigration advice',
    'Scholarships & funding options',
    'Finding the right university/course',
    'Connecting with mentor/alumni',
  ];

  const IsMobile = useIsMobile();

  return (
    <div className={cn('p-4 rounded-xl md:p-6 register-page', !IsMobile && 'bg-secondary')}>
      <div className='space-y-4 md:space-y-6'>

        {/* Country Selector */}
        <div>
          <CountrySelector
            label='Destination Country'
            name='destinationCountries'
            value={formData.destinationCountries[0] || ''}
            options={countries}
            placeholder='Select Country'
            required
            searchable
            onChange={(name, value) => handleLocalSelectChange(name, [value])}
            error={mergedErrors.destinationCountries}
            aria-invalid={!!mergedErrors.destinationCountries}
            aria-describedby={
              mergedErrors.destinationCountries ? 'destinationCountries-error' : undefined
            }
          />
        </div>

        {/* Intake Year */}
        <div>
          <CustomSelect
            label='Intake & Year'
            name='intakeYear'
            value={formData.intakeYear}
            options={generateIntakeOptions()}
            placeholder='Select Intake & Year'
            required
            onChange={handleLocalSelectChange}
            searchable
            error={mergedErrors.intakeYear}
            aria-invalid={!!mergedErrors.intakeYear}
            aria-describedby={
              mergedErrors.intakeYear ? 'intakeYear-error' : undefined
            }
          />
        </div>

        {/* Field of Study */}
        <div>
          <label className='block mb-1 text-sm font-medium text-white'>
            Field of Study
          </label>
          <Input
            name='fieldOfStudy'
            value={formData.fieldOfStudy}
            onChange={handleLocalInputChange}
            placeholder='Select study field (e.g. Medical, Engineering)'
            className='w-full h-[56px] px-8 text-base bg-transparent border border-gray-700 rounded-[28px] text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-gray-400'
          />
          {mergedErrors.fieldOfStudy && (
            <p className='mt-1 text-sm text-red-500'>{mergedErrors.fieldOfStudy}</p>
          )}
        </div>

        {/* Preferred Universities */}
        <div>
          <CustomSelect
            label='Preferred Universities'
            name='preferredUniversities'
            value={formData.preferredUniversities}
            options={Array.isArray(universities) ? universities : []}
            placeholder={
              universitiesLoading
                ? 'Loading universities...'
                : universities?.length
                  ? 'Select Universities'
                  : 'Select a country first'
            }
            required
            onChange={handleLocalSelectChange}
            searchable
            disabled={universitiesLoading}
            error={mergedErrors.preferredUniversities}
            aria-invalid={!!mergedErrors.preferredUniversities}
            aria-describedby={
              mergedErrors.preferredUniversities ? 'preferredUniversities-error' : undefined
            }
          />
        </div>

        {/* Occupation */}
        <div>
          <label className='block mb-1 text-sm font-medium text-white'>Occupation</label>
          <div className='flex flex-wrap gap-2'>
            {occupationOptions.map((tag) => {
              const isSelected = occupationTagsArray.includes(tag);
              return (
                <button
                  key={tag}
                  type='button'
                  onClick={() => handleToggleCheckbox('occupationTags', tag)}
                  className={`h-8 rounded-full px-3 flex items-center justify-center text-sm border transition ${isSelected
                    ? 'bg-cardblack border-purple-500 text-white'
                    : 'bg-transparent border-gray-700 text-gray-300 hover:border-purple-400'
                    }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Button */}
      <div className='block mt-6 md:hidden'>
        <Button
          type='button'
          className='w-full flex items-center justify-center px-6 py-6 text-white bg-purple-600 rounded-full hover:bg-purple-500 disabled:opacity-50'
          onClick={handleLocalSubmit}
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
        <div className='flex items-center justify-end gap-3'>
          <Button type='button' className='text-purple-600' onClick={() => setStep(1)}>
            Skip
          </Button>
          <Button
            type='button'
            className='flex items-center px-6 py-6 text-white bg-purple-600 rounded-full hover:bg-purple-500 disabled:opacity-50'
            onClick={handleLocalSubmit}
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
    </div>
  );
};
