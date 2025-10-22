import { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button, Card, Input } from 'antd';
import { CustomInput } from '../Common/Inputs';
import { PasswordInput } from './PasswordInput';
import { ToggleButton } from './ToggleButton';
import CountryCodeSelector from './Common/CountryCodeSelector';
import { cn } from '../../lib/utils';
import { useIsMobile } from '../../hooks/useMobile';

export const Step1Form = ({
  formData,
  errors = {},
  loading = false,
  selectedUserType,
  handleInputChange,
  setFormData,
  handleSignUp,
  setStep,
  employmentType,
  setEmploymentType,
  countries = [],
  countriesLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [profileDetailsType, setProfileDetailsType] = useState('driverLicense');

  // local errors override when parent doesn't control errors
  const [localErrors, setLocalErrors] = useState({});
  // keep a merged view that prefers external errors when provided
  const mergedErrors = { ...localErrors, ...errors };

  // keep refs for focusing fields
  const firstInvalidTriedRef = useRef(false);

  // Keep localErrors in sync when parent errors prop changes
  useEffect(() => {
    // formData.personalDetailsType = profileDetailsType;
    if (errors && Object.keys(errors).length > 0) {
      setLocalErrors((prev) => ({ ...prev, ...errors }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  // Validation function — does NOT modify any data, only constructs an errors object
  const validate = (data) => {
    const newErrors = {};

    // Full name
    if (!data.fullName || !String(data.fullName).trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Country code
    if (!data.countryCode) {
      newErrors.countryCode = 'Country code is required';
    }

    // Mobile number
    if (!data.mobileNumber || !String(data.mobileNumber).trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    }

    // Email
    if (!data.email || !String(data.email).trim()) {
      newErrors.email = 'Email is required';
    } else {
      // basic email format check (non-invasive)
      const emailRe = /^\S+@\S+\.\S+$/;
      if (!emailRe.test(String(data.email).trim())) {
        newErrors.email = 'Enter a valid email';
      }
    }

    // Passwords
    if (!data.password) {
      newErrors.password = 'Password is required';
    }
    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    }
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Mentor specific - Personal Details validation
    // if (selectedUserType === 'mentor') {
    //   if (!data.personalDetailsType) {
    //     newErrors.personalDetailsType = 'Please select identification type';
    //   }
    //   if (!data.personalIdNumber || !String(data.personalIdNumber).trim()) {
    //     newErrors.personalIdNumber = 'Identification number is required';
    //   }
    // }

    // Student specific
    if (selectedUserType === 'student') {
      // admissionOffer can be boolean true/false; check undefined/null
      if (data.admissionOffer === undefined || data.admissionOffer === null) {
        newErrors.admissionOffer = 'Please indicate if you have an admission offer';
      }
    }

    // HR recruiter specific
    // if (selectedUserType === 'mentor') {
    //   if (!data.employmentType) {
    //     newErrors.employmentType = 'Please select employment type';
    //   }
    // }

    // HR recruiter specific
    if (selectedUserType === 'hr-recruiter') {
      if (!employmentType) {
        newErrors.employmentType = 'Please select employment type';
      }
    }

    return newErrors;
  };

  // Focus first invalid field (tries to query an input by name)
  const focusFirstInvalid = (errObj) => {
    const keys = Object.keys(errObj);
    if (!keys.length) return;

    const firstKey = keys[0];
    // try to find the real input by name attribute
    const el =
      document.querySelector(`[name="${firstKey}"]`) || document.querySelector(`#${firstKey}`);
    if (el && typeof el.focus === 'function') {
      // small delay helps if element is not yet painted
      setTimeout(() => {
        try {
          el.focus();
        } catch (e) {
          /* ignore focus errors */
        }
      }, 50);
    }
  };

  // Handle personal details type change
  // const handlePersonalDetailsTypeChange = (type) => {
  //   setProfileDetailsType(type);
  //   // Update form data
  //   setFormData((prev) => ({
  //     ...prev,
  //     personalDetailsType: type,
  //     // Clear personal ID number when switching types
  //     personalIdNumber: '',
  //   }));

  //   // Clear errors when user makes a selection
  //   if (mergedErrors.personalDetailsType) {
  //     setLocalErrors((prev) => ({ ...prev, personalDetailsType: null }));
  //   }
  //   if (mergedErrors.personalIdNumber) {
  //     setLocalErrors((prev) => ({ ...prev, personalIdNumber: null }));
  //   }
  // };

  // Handle personal ID number change
  // const handlePersonalIdNumberChange = (value) => {
  //   setFormData((prev) => ({ ...prev, personalIdNumber: value }));

  //   // Clear error when user starts typing
  //   if (mergedErrors.personalIdNumber) {
  //     setLocalErrors((prev) => ({ ...prev, personalIdNumber: null }));
  //   }
  // };

  // Local handler that validates then calls parent's handleSignUp only on success
  const handleLocalSignUp = async () => {
    const newErrors = validate(formData);
    console.log('From Date : ', formData);
    console.log('handleLocalSignUp newErrors ', newErrors);
    setLocalErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (!firstInvalidTriedRef.current) {
        focusFirstInvalid(newErrors);
        firstInvalidTriedRef.current = true;
        setTimeout(() => {
          firstInvalidTriedRef.current = false;
        }, 1000);
      }
      return; // abort submission
    }

    // No client-side errors -> call parent's handleSignUp.
    // We intentionally do NOT mutate formData here or change any values.
    if (typeof handleSignUp === 'function') {
      handleSignUp();
    } else {
      console.warn('handleSignUp not provided — validation passed.');
    }
  };

  const IsMobile = useIsMobile();

  // useEffect(() => {
  //   console.log(' Step1Form formData changed:', formData);
  // }, [formData]);

  return (
    <div
      className={cn(
        'h-full p-4 mt-10 mb-20 rounded-xl md:p-6 register-page',
        !IsMobile && 'bg-secondary'
      )}
    >
      <div className='space-y-4 md:space-y-6'>
        <CustomInput
          label='Full Name'
          name='fullName'
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder='Enter Name'
          required={true}
          error={mergedErrors.fullName}
          aria-invalid={!!mergedErrors.fullName}
          aria-describedby={mergedErrors.fullName ? 'fullName-error' : undefined}
        />

        <CustomInput
          type='number'
          label='Mobile Number'
          prefix={
            <CountryCodeSelector
              selectedCountryCode={formData.countryCode}
              onCountryCodeChange={(code) =>
                handleInputChange({
                  target: { name: 'countryCode', value: code },
                })
              }
              countries={countries}
              loading={countriesLoading}
            />
          }
          name='mobileNumber'
          value={formData.mobileNumber}
          onChange={handleInputChange}
          placeholder='999 999 999'
          required={true}
          error={mergedErrors.mobileNumber}
          aria-invalid={!!mergedErrors.mobileNumber}
          aria-describedby={mergedErrors.mobileNumber ? 'mobileNumber-error' : undefined}
        />

        {/* Modern Personal Details Section for Mentor */}
        {/* {selectedUserType === 'mentor' && (
          <div>
            <label className='block text-sm font-medium text-white md:text-base'>
              Personal Details <span className='text-red-500'>*</span>
            </label>

            <div className='flex space-x-4'>
              {[
                { id: 'driverLicense', label: "Driver's license" },
                { id: 'passportNumber', label: 'Passport Number' },
              ].map((option) => (
                <div
                  key={option.id}
                  onClick={() => handlePersonalDetailsTypeChange(option.id)}
                  className={`flex items-center pb-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    profileDetailsType === option.id
                      ? 'border-green-500'
                      : 'border-gray-600 hover:border-gray-500 bg-secondary'
                  } flex-1 max-w-[200px]`}
                >
                  <Card
                    className={`w-5 h-5 rounded-full border-[3px] mr-3 flex items-center bg-transparent justify-center transition-all ${
                      profileDetailsType === option.id
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-400'
                    }`}
                  >
                    {profileDetailsType === option.id && (
                      <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    )}
                  </Card>
                  <span
                    className={`text-sm font-medium ${
                      profileDetailsType === option.id ? 'text-white' : 'text-gray-300'
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              ))}
            </div>

            {mergedErrors.personalDetailsType && (
              <p className='mt-2 text-xs text-red-500 md:text-sm'>
                {mergedErrors.personalDetailsType}
              </p>
            )}

            <CustomInput
              type='text'
              className='w-full text-base font-normal text-white placeholder-gray-400 bg-transparent outline-none'
              placeholder={
                profileDetailsType === 'driverLicense'
                  ? "Enter Driver's License Number"
                  : 'Enter Passport Number'
              }
              value={formData.personalIdNumber || ''}
              onChange={(e) => handlePersonalIdNumberChange(e.target.value)}
              error={mergedErrors.personalIdNumber}
              aria-invalid={!!mergedErrors.personalIdNumber}
              aria-describedby={
                mergedErrors.personalIdNumber ? 'personalIdNumber-error' : undefined
              }
            />
          </div>
        )} */}

        <CustomInput
          label='Email Address'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleInputChange}
          placeholder='Enter Email Address'
          required={true}
          error={mergedErrors.email}
          aria-invalid={!!mergedErrors.email}
          aria-describedby={mergedErrors.email ? 'email-error' : undefined}
        />

        <CustomInput
          sufix={
            <Button
              type='button'
              className='absolute right-3 top-2.5 md:top-3 text-gray-400 hover:text-white transition-colors'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
            </Button>
          }
          label='Password'
          name='password'
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          placeholder='**********'
          onChange={handleInputChange}
          required={true}
          error={mergedErrors.password}
          aria-invalid={!!mergedErrors.password}
          aria-describedby={mergedErrors.password ? 'password-error' : undefined}
        />

        <CustomInput
          sufix={
            <Button
              type='button'
              className='absolute right-3 top-2.5 md:top-3 text-gray-400 hover:text-white transition-colors'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
            </Button>
          }
          label='Confirm Password'
          name='confirmPassword'
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          placeholder='**********'
          onChange={handleInputChange}
          required={true}
          error={mergedErrors.confirmPassword}
          aria-invalid={!!mergedErrors.confirmPassword}
          aria-describedby={mergedErrors.confirmPassword ? 'confirmPassword-error' : undefined}
        />

        {selectedUserType === 'student' && (
          <div className='mb-4 md:mb-6'>
            <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
              Have you received an admission offer? <span className='text-red-500'>*</span>
            </label>

            <ToggleButton
              options={[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ]}
              value={formData.admissionOffer}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, admissionOffer: value }));

                // ✅ Clear local error when user selects
                if (mergedErrors.admissionOffer) {
                  setLocalErrors((prev) => ({ ...prev, admissionOffer: null }));
                }
              }}
              error={mergedErrors.admissionOffer}
              aria-invalid={!!mergedErrors.admissionOffer}
              aria-describedby={mergedErrors.admissionOffer ? 'admissionOffer-error' : undefined}
            />
          </div>
        )}

        {/* Rest of your existing code for hr-recruiter remains the same */}
        {selectedUserType === 'hr-recruiter' && (
          <div className='mb-4 md:mb-6'>
            <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
              Employment Type <span className='text-red-500'>*</span>
            </label>
            <div className='flex flex-col space-y-3'>
              {[
                { id: 'Individual/Freelancer', label: 'Individual/Freelancer' },
                { id: 'Company Requirer', label: 'Company Requirer' },
                { id: 'Consulting agency', label: 'Consulting agency' },
              ].map((type) => (
                <div
                  key={type.id}
                  onClick={() => setEmploymentType(type.id)}
                  style={{
                    background:
                      employmentType === type.id
                        ? 'linear-gradient(#131313, #131313) padding-box, linear-gradient(90deg, #BC5FFF 0%, #4B0082 100%) border'
                        : '#131313',
                  }}
                  className={`relative flex items-center  rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 ${employmentType === type.id ? '' : 'hover:border-[rgba(255,255,255,0.2)]'}`}
                >
                  <div
                    className={`icon-container mr-3 sm:mr-4 ${
                      employmentType === type.id ? 'selected-icon' : 'text-white'
                    }`}
                  >
                    {type.icon}
                  </div>
                  <div className='px-8 py-2'>
                    <div
                      className={`text-sm sm:text-xs md:text-base font-medium ${
                        employmentType === type.id ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {type.label}
                    </div>
                  </div>
                  <div
                    className={`user-type-radio ${employmentType === type.id ? 'selected' : ''}`}
                  >
                    <span className='dot'></span>
                  </div>
                </div>
              ))}
            </div>
            {mergedErrors.employmentType && (
              <p id='employmentType-error' className='mt-2 text-xs text-red-500 md:text-sm'>
                {mergedErrors.employmentType}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Mobile Layout (< 756px) */}
      <div className='block mt-6 md:hidden'>
        <button
          type='button'
          className={`w-full h-[56px] rounded-[28px] font-semibold transition-colors flex items-center justify-center ${
            (selectedUserType === 'hr-recruiter' && !employmentType) || loading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
          onClick={handleLocalSignUp}
          disabled={(selectedUserType === 'hr-recruiter' && !employmentType) || loading}
        >
          {loading ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 md:w-5 md:h-5 animate-spin' />
              Processing...
            </>
          ) : (
            'Continue'
          )}
        </button>
      </div>

      {/* Desktop Layout (>= 756px) */}
      <div className='justify-end hidden mt-8 md:flex'>
        <button
          type='button'
          className={`h-[56px] px-7 rounded-[28px] font-semibold transition-colors flex items-center ${
            loading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
          onClick={handleLocalSignUp}
          // disabled={(selectedUserType === 'hr-recruiter' && !employmentType) || loading}
        >
          {loading ? (
            <>
              <Loader2 className='w-5 h-5 mr-2 animate-spin' />
              Processing...
            </>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
};
