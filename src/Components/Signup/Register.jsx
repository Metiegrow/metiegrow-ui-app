import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button, message } from 'antd';
import {
  GraduationCap,
  UserCircle2,
  Briefcase,
  Building2,
  HomeIcon,
  Loader2,
  CheckCircle,
  ChevronDown,
  EyeOff,
  Eye,
  Calendar,
  Users,
} from 'lucide-react';
import { UserTypeSelection } from './UserTypeSelection';
import { SuccessNotification } from './SuccessNotification';
import { ErrorNotification } from './ErrorNotification';
import { Step1Form } from './Step1Form';
import { Step2Form } from './Step2Form';
import { Step3Form } from './Step3Form';
import MentorOnboardingForm from './MentorOnboardingForm';
import LawyerOnboardingForm from './LawyerOnboardingForm';
import AlumniOnboardingForm from './AlumniOnboardingForm';
import FreelanceInfoForm from './FreelanceInfoForm';
import CompanyRequirterForm from './CompanyRequirterForm';
import EmploymentTypeForm from './EmploymentTypeForm';
import PGOwnerForm from './PGOwnerForm';
import { deriveUsername } from '../Services/registrationService';
// Use hooks from Common/APIHandler (centralized)
import { useCountries, useUniversities } from '../../Common/APIHandler';
import { registerStudent } from '../../Common/APIHandler';
import { useIsMobile } from '../../hooks/useMobile';
import { cn } from '../../lib/utils';
import { BackArraowIcon, BackButtonIcon } from '../Common/SVG/svg.function';

export default function Register1() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [messageApi, contextHolder] = message.useMessage();
  const [step, setStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // State for mobile user type selection step
  const [showMobileUserTypeSelect, setShowMobileUserTypeSelect] = useState(
    () => window.innerWidth < 768
  );

  // State for HR-Recruiter employment type selection
  const [employmentType, setEmploymentType] = useState('');

  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    mobileNumber: '',
    countryCode: '+61',
    email: '',
    password: '',
    confirmPassword: '',
    admissionOffer: null,

    // Step 2 (Student without admission)
    destinationCountries: [],
    intakeYear: '',
    fieldOfStudy: '',
    preferredUniversities: '',
    occupationTags: [],

    // Step 3 (Student with admission)
    universityName: '',
    course: '',
    intakeMonthYear: '',
    preferredMoveInDate: null,
    accommodationPreferences: [],
    lookingForPartTimeJob: true,
    visaStatus: '',
    otherSupportNeeded: [],
    receiveMentorRecommendation: true,
    notifyJobHousing: false,
    preferredCommunicationMode: '',

    dateOfJoining: null,
  });

  const [lawyerStep, setLawyerStep] = useState(1);
  const [mentorStep, setMentorStep] = useState(1);
  const [alumniStep, setAlumniStep] = useState(1);
  const [hrRecruiterStep, setHrRecruiterStep] = useState(1);
  const [pgOwnerStep, setPgOwnerStep] = useState(1);

  const userTypes = useMemo(() => [
    {
      id: 'student',
      label: "I'm a Student",
      icon: <GraduationCap className='w-5 h-5' />,
    },
    {
      id: 'mentor',
      label: "I'm a Mentor",
      icon: <UserCircle2 className='w-5 h-5' />,
    },
    {
      id: 'lawyer',
      label: "I'm a Lawyer",
      icon: <Briefcase className='w-5 h-5' />,
    },
    {
      id: 'alumni',
      label: "I'm an Alumni",
      icon: <Building2 className='w-5 h-5' />,
    },
    {
      id: 'owner',
      label: "I'm an Home/PG owner",
      icon: <HomeIcon className='w-5 h-5' />,
    },
    {
      id: 'hr-recruiter',
      label: "I'm HR - Recruiter",
      icon: <Users className='w-5 h-5' />,
    },
  ], []);

  // Use React Query hooks for API data
  const { data: countriesData = [], isLoading: countriesLoading } = useCountries();
  // Normalize selected country for universities API (expects a single lowercase country string)
  const selectedCountry = useMemo(() => {
    const dest = formData.destinationCountries;
    if (Array.isArray(dest) && dest.length > 0) {
      const last = dest[dest.length - 1];
      if (typeof last === 'string') return last.trim().toLowerCase();
      if (last && typeof last === 'object') {
        // try common shapes
        const v = last.name || last.value || last.label || '';
        return String(v).trim().toLowerCase();
      }
    } else if (typeof dest === 'string' && dest) {
      return dest.trim().toLowerCase();
    }
    return undefined;
  }, [formData.destinationCountries]);

  const { data: universitiesData = [], isLoading: universitiesLoading } =
    useUniversities(selectedCountry);

  // Normalize universities data using useMemo to avoid recreating on every render
  const universities = useMemo(() => {
    if (Array.isArray(universitiesData) && universitiesData.length > 0) {
      // Deduplicate and map to string list consistently
      return Array.from(
        new Set(
          universitiesData
            .map((u) => (typeof u === 'string' ? u : u?.label || u?.name || ''))
            .filter(Boolean)
        )
      );
    }
    return [];
  }, [universitiesData]);

  // Memoize courses to avoid recreating on every render
  const courses = useMemo(() => [
    'Computer Science',
    'Medicine',
    'Engineering',
    'Business Administration',
    'Law'
  ], []);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        if (successMessage.includes('dashboard')) {
          navigate({ to: '/login' });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, successMessage, navigate]);

  // Optional: update on resize for better UX
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      // Only update state if the value actually changes
      setShowMobileUserTypeSelect((prev) => prev === isMobileView ? prev : isMobileView);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateStep1 = () => {
    const newErrors = {};

    console.log(' selectedCountry: ', selectedCountry);
    console.log(' Form Data: ', formData);

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (selectedUserType === 'student' && formData.admissionOffer === null) {
      newErrors.admissionOffer = 'Please select whether you have received an admission offer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const toggleCheckboxItem = (listName, item) => {
  //   setFormData((prev) => {
  //     const list = [...prev[listName]];
  //     const index = list.indexOf(item);
  //     if (index === -1) {
  //       list.push(item);
  //     } else {
  //       list.splice(index, 1);
  //     }
  //     return { ...prev, [listName]: list };
  //   });
  // };

  const toggleCheckboxItem = (listName, item) => {
    if (typeof item !== 'string') {
      console.warn(`Invalid item passed to ${listName}:`, item);
      return;
    }

    setFormData((prev) => {
      const list = Array.isArray(prev[listName]) ? [...prev[listName]] : [];
      const index = list.indexOf(item);
      if (index === -1) {
        list.push(item);
      } else {
        list.splice(index, 1);
      }
      return { ...prev, [listName]: list };
    });
  };
  const handleSignUp = async () => {
    if (!validateStep1()) return;
    setLoading(true);
    setErrors({});
    try {
      // const baseUrl = URL || "http://localhost:9091";
      if (selectedUserType === 'student') {
        // For Step 1, just proceed to next step without API call
        // Proceed to onboarding based on admission status
        if (formData.admissionOffer === true) {
          setStep(3); // Go to admission details
        } else if (formData.admissionOffer === false) {
          setStep(2); // Go to student onboarding
        }
        return;
      }

      if (selectedUserType === 'mentor') {
        setMentorStep(2);
        return;
      }
      if (selectedUserType === 'lawyer') {
        setLawyerStep(2);
        return;
      }
      if (selectedUserType === 'alumni') {
        setAlumniStep(2);
        return;
      }
      if (selectedUserType === 'hr-recruiter') {
        if (!employmentType) throw new Error('Select employment type');
        setHrRecruiterStep(2);
        return;
      }
      if (selectedUserType === 'owner') {
        setPgOwnerStep(2);
        return;
      }
    } catch (error) {
      console.error('Registration error:', error);
      messageApi.error({
        content: error.message || 'Registration failed. Please try again.',
        duration: 3,
      });
      setErrors({
        general: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStudentOnboarding = async () => {
    console.log('Destination countries:', formData.destinationCountries);
    console.log('Intake year:', formData.intakeYear);
    console.log('Field of study:', formData.fieldOfStudy);
    if (!formData.destinationCountries.length || !formData.intakeYear || !formData.fieldOfStudy) {
      setErrors({ general: 'Please fill all required fields' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Prepare complete student registration payload with ALL data
      const completePayload = {
        username: deriveUsername(formData.fullName, formData.email),
        password: formData.password,
        email: formData.email,
        fullName: formData.fullName,
        phoneNumber: `${formData.countryCode}-${formData.mobileNumber}`,
        admissionReceived: formData.admissionOffer === true,
        // Step 2 data
        destinationCountries: formData.destinationCountries,
        intakeYear: formData.intakeYear,
        fieldOfStudy: formData.fieldOfStudy,
        preferredUniversities: Array.isArray(formData.preferredUniversities)
          ? formData.preferredUniversities
          : formData.preferredUniversities
            ? [formData.preferredUniversities]
            : [],
        occupationStudentWorking: formData.occupationTags || [],
        // Step 3 data (if admission offer = true)
        universityName: formData.universityName || '',
        course: formData.course || '',
        intakeMonthYear: formData.intakeMonthYear || '',
        preferredMoveInDate: formData.preferredMoveInDate || new Date().toISOString().split('T')[0],
        accommodationPreferences: formData.accommodationPreferences || [],
        lookingForPartTimeJob:
          formData.lookingForPartTimeJob !== undefined ? formData.lookingForPartTimeJob : true,
        visaStatus: formData.visaStatus || '',
        otherSupportNeeded: formData.otherSupportNeeded || [],
        receiveMentorRecommendations:
          formData.receiveMentorRecommendation !== undefined
            ? formData.receiveMentorRecommendation
            : true,
        notifyJobHousingOpportunities:
          formData.notifyJobHousing !== undefined ? formData.notifyJobHousing : false,
      };

      console.log('Sending complete student registration payload:', completePayload);

      // Make the complete API call
      const result = await registerStudent(completePayload);
      console.log('Complete registration response:', result);

      // Redirect to login after successful registration
      navigate({ to: '/login' });
      // } catch (error) {
      //   console.error('Complete registration error:', error);
      //   messageApi.error({
      //     content: error.message || 'Registration failed. Please try again.',
      //     duration: 3,
      //   });
      // }
    } catch (error) {
      console.error('Complete registration error:', error);

      // Try to extract backend statuses message
      let errorMsg = 'Registration failed. Please try again.';

      if (error.response?.data?.statuses?.length > 0) {
        errorMsg = error.response.data.statuses[0].message;
      } else if (error.message) {
        errorMsg = error.message;
      }

      messageApi.error({
        content: errorMsg,
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdmissionDetails = async () => {
    // console.log('University name:', formData.universityName);
    // console.log('Course:', formData.course);
    // console.log('Intake:', formData.intakeMonthYear);
    if (!formData.universityName || !formData.course || !formData.intakeMonthYear) {
      setErrors({ general: 'Please fill all required fields' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Prepare complete student registration payload with ALL data
      const completePayload = {
        username: deriveUsername(formData.fullName, formData.email),
        password: formData.password,
        email: formData.email,
        fullName: formData.fullName,
        phoneNumber: `${formData.countryCode}-${formData.mobileNumber}`,
        admissionReceived: formData.admissionOffer === true,
        // Step 2 data (if user went through step 2)
        destinationCountries: formData.destinationCountries || [],
        intakeYear: formData.intakeYear || '',
        fieldOfStudy: formData.fieldOfStudy || '',
        preferredUniversities: Array.isArray(formData.preferredUniversities)
          ? formData.preferredUniversities
          : formData.preferredUniversities
            ? [formData.preferredUniversities]
            : [],
        occupationStudentWorking: formData.occupationTags || [],
        // Step 3 data
        universityName: formData.universityName,
        course: formData.course,
        intakeMonthYear: formData.intakeMonthYear,
        preferredMoveInDate: formData.preferredMoveInDate || new Date().toISOString().split('T')[0],
        accommodationPreferences: formData.accommodationPreferences || [],
        lookingForPartTimeJob:
          formData.lookingForPartTimeJob !== undefined ? formData.lookingForPartTimeJob : true,
        visaStatus: formData.visaStatus || '',
        otherSupportNeeded: formData.otherSupportNeeded || [],
        receiveMentorRecommendations:
          formData.receiveMentorRecommendation !== undefined
            ? formData.receiveMentorRecommendation
            : true,
        notifyJobHousingOpportunities:
          formData.notifyJobHousing !== undefined ? formData.notifyJobHousing : false,
      };

      console.log('Sending complete student registration payload:', completePayload);

      // Make the complete API call
      const result = await registerStudent(completePayload);
      console.log('Complete registration response:', result);

      message.success('Student Registration successful!!!');

      // Redirect to login after successful registration
      navigate({ to: '/login' });
      // } catch (error) {
      //   console.error('Complete registration error:', error);
      //   messageApi.error({
      //     content: error.message || 'Registration failed. Please try again.',
      //     duration: 3,
      //   });
      // }
    } catch (error) {
      console.error('Complete registration error:', error);

      // Try to extract backend statuses message
      let errorMsg = 'Registration failed. Please try again.';
      console.log('Error message:', error.statuses);

      if (error.response?.data?.statuses?.length > 0) {
        errorMsg = error.response.data.statuses[0].message;
      } else if (error.message) {
        errorMsg = error.message;
      }

      messageApi.error({
        content: errorMsg,
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  // Add handler for mentor continue
  const handleMentorContinue = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log('handleMentorContinue called, navigating to login...');
    navigate({ to: '/login' });
  };

  // Add handler for lawyer continue
  const handleLawyerContinue = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log('handleLawyerContinue called, navigating to login...');
    navigate({ to: '/login' });
  };

  const handleAlumniContinue = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log('handleAlumniContinue called, navigating to login...');
    navigate({ to: '/login' });
  };

  // Add handler for HR-Recruiter continue
  const handleHrRecruiterContinue = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    try {
      setLoading(true);
      const baseUrl = URL || 'http://localhost:9091';
      const requestJson = {
        username: deriveUsername(formData.fullName, formData.email),
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password,
        fullName: formData.fullName,
        country: formData.country,
        phoneNumber: `${formData.countryCode}-${formData.mobileNumber}`,
        companyName: formData.companyName || 'Freelancer',
        jobRole: formData.jobRole,
        passedOutYear: formData.passedOutYear || '',
        industryType: formData.industryType || '',
        fieldOfStudy: formData.fieldOfStudy || '',
        graduationLevel: formData.graduationLevel || '',
        experience: formData.experience,
        hiringDomains: [],
        linkedinProfile: formData.linkedinProfile || '',
      };
      const { registrationService } = await import('../Services/registrationService');
      const res = await registrationService.registerRecruiter(
        baseUrl,
        requestJson,
        formData.recruiterDocument
      );
      if (res.ok) {
        messageApi.success('Recruiter registration successful! Please verify email.');
        navigate({ to: '/login' });
      } else {
        throw new Error(res.data?.message || 'Recruiter registration failed');
      }
    } catch (e) {
      console.error('Recruiter registration error:', e);
      messageApi.error(e.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Add handler for PG Owner continue
  const handlePgOwnerContinue = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log('handlePgOwnerContinue called, navigating to login...');
    navigate({ to: '/login' });
  };

  const handleToggle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderStepContent = () => {
    if (selectedUserType === 'mentor') {
      if (mentorStep === 1) {
        return (
          <Step1Form
            formData={formData}
            errors={errors}
            loading={loading}
            selectedUserType={selectedUserType}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
            handleSignUp={() => setMentorStep(2)}
            countries={countriesData}
            countriesLoading={countriesLoading}
          />
        );
      }
      if (mentorStep === 2) {
        return (
          <MentorOnboardingForm
            formData={formData}
            errors={errors}
            loading={loading}
            handleInputChange={handleInputChange}
            handleContinue={handleMentorContinue}
            onBack={() => setMentorStep(1)}
          />
        );
      }
    }
    if (selectedUserType === 'lawyer') {
      if (lawyerStep === 1) {
        return (
          <Step1Form
            formData={formData}
            errors={errors}
            loading={loading}
            selectedUserType={selectedUserType}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
            handleSignUp={() => setLawyerStep(2)}
            countries={countriesData}
            countriesLoading={countriesLoading}
          />
        );
      }
      if (lawyerStep === 2) {
        return (
          <LawyerOnboardingForm
            setStep={setStep}
            formData={formData}
            errors={errors}
            loading={loading}
            handleInputChange={handleInputChange}
            handleContinue={handleLawyerContinue}
            onBack={() => setLawyerStep(1)}
            universities={universities}
            courses={courses}
          />
        );
      }
    }
    if (selectedUserType === 'alumni') {
      if (alumniStep === 1) {
        return (
          <Step1Form
            formData={formData}
            errors={errors}
            loading={loading}
            selectedUserType={selectedUserType}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
            handleSignUp={() => setAlumniStep(2)}
            countries={countriesData}
            countriesLoading={countriesLoading}
          />
        );
      }
      if (alumniStep === 2) {
        return (
          <AlumniOnboardingForm
            formData={formData}
            errors={errors}
            loading={loading}
            handleInputChange={handleInputChange}
            handleToggle={handleToggle}
            handleContinue={handleAlumniContinue}
            setStep={setStep}
          />
        );
      }
    }
    if (selectedUserType === 'hr-recruiter') {
      if (hrRecruiterStep === 1) {
        return (
          <Step1Form
            formData={formData}
            errors={errors}
            loading={loading}
            selectedUserType={selectedUserType}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
            employmentType={employmentType}
            setEmploymentType={setEmploymentType}
            handleSignUp={() => {
              if (employmentType) {
                setHrRecruiterStep(2);
              }
            }}
            countries={countriesData}
            countriesLoading={countriesLoading}
          />
        );
      }

      if (hrRecruiterStep === 2) {
        if (employmentType === 'Individual/Freelancer') {
          return (
            <FreelanceInfoForm
              formData={formData}
              loading={loading}
              handleInputChange={handleInputChange}
              handleContinue={handleHrRecruiterContinue}
              onBack={() => setHrRecruiterStep(1)}
            />
          );
        } else if (employmentType === 'Company Requirer') {
          return (
            <CompanyRequirterForm
              formData={formData}
              loading={loading}
              handleContinue={handleHrRecruiterContinue}
              onBack={() => setHrRecruiterStep(1)}
              handleInputChange={handleInputChange}
            />
          );
        } else if (employmentType === 'Consulting agency') {
          return (
            <CompanyRequirterForm
              formData={formData}
              loading={loading}
              handleContinue={handleHrRecruiterContinue}
              onBack={() => setHrRecruiterStep(1)}
              handleInputChange={handleInputChange}
            />
          );
        }
      }
    }
    if (selectedUserType === 'owner') {
      if (pgOwnerStep === 1) {
        return (
          <Step1Form
            formData={formData}
            errors={errors}
            loading={loading}
            selectedUserType={selectedUserType}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
            handleSignUp={() => setPgOwnerStep(2)}
            countries={countriesData}
            countriesLoading={countriesLoading}
          />
        );
      }
      if (pgOwnerStep === 2) {
        return (
          <PGOwnerForm
            formData={formData}
            loading={loading}
            handleInputChange={handleInputChange}
            handleContinue={async () => {
              try {
                setLoading(true);
                const baseUrl = URL || 'http://localhost:9091';
                const requestJson = {
                  username: deriveUsername(formData.fullName, formData.email),
                  email: formData.email,
                  password: formData.password,
                  confirmPassword: formData.password,
                  fullName: formData.fullName,
                  phoneNumber: `${formData.countryCode}-${formData.mobileNumber}`,
                  doorNo: formData.doorStreetName,
                  locality: formData.locality,
                  city: formData.cityTown,
                  state: formData.state,
                  country: formData.country,
                  zipCode: formData.zipCode,
                  govtIssuedId: formData.govIdType,
                  idNumber: formData.idNumber,
                };
                const { registrationService } = await import('../Services/registrationService');
                const res = await registrationService.registerLandlord(
                  baseUrl,
                  requestJson,
                  formData.landlordDocument
                );
                if (res.ok) {
                  messageApi.success(
                    'Registration successful! Please check your email for verification.'
                  );
                  navigate({ to: '/login' });
                } else {
                  throw new Error(res.data?.message || 'Landlord registration failed');
                }
              } catch (e) {
                console.error('Landlord registration error:', e);
                messageApi.error(e.message || 'Registration failed');
              } finally {
                setLoading(false);
              }
            }}
            onBack={() => setPgOwnerStep(1)}
            setFormData={setFormData}
          />
        );
      }
    }
    if (selectedUserType !== 'student') {
      return (
        <Step1Form
          formData={formData}
          errors={errors}
          loading={loading}
          selectedUserType={selectedUserType}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          handleSignUp={handleSignUp}
          countries={countriesData}
          countriesLoading={countriesLoading}
        />
      );
    }

    switch (step) {
      case 1:
        return (
          <Step1Form
            formData={formData}
            errors={errors}
            loading={loading}
            selectedUserType={selectedUserType}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
            handleSignUp={handleSignUp}
            countries={countriesData}
            countriesLoading={countriesLoading}
          />
        );
      case 2:
        return (
          <Step2Form
            formData={formData}
            errors={errors}
            loading={loading}
            countries={countriesData}
            universities={universities}
            universitiesLoading={universitiesLoading}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            toggleCheckboxItem={toggleCheckboxItem}
            handleStudentOnboarding={handleStudentOnboarding}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <Step3Form
            formData={formData}
            errors={errors}
            loading={loading}
            countries={countriesData}
            universities={universities}
            courses={courses}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            toggleCheckboxItem={toggleCheckboxItem}
            handleCheckboxChange={handleCheckboxChange}
            handleAdmissionDetails={handleAdmissionDetails}
            setStep={setStep}
          />
        );
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (showMobileUserTypeSelect) {
      // Already in userType selection (mobile) → do nothing
      return;
    }

    if (selectedUserType === 'student') {
      if (step > 1) {
        setStep(step - 1);
      } else {
        setShowMobileUserTypeSelect(true); // Go back to user type selection on mobile
      }
    }

    if (selectedUserType === 'mentor') {
      if (mentorStep > 1) {
        setMentorStep(mentorStep - 1);
      } else {
        setShowMobileUserTypeSelect(true);
      }
    }

    if (selectedUserType === 'lawyer') {
      if (lawyerStep > 1) {
        setLawyerStep(lawyerStep - 1);
      } else {
        setShowMobileUserTypeSelect(true);
      }
    }

    if (selectedUserType === 'alumni') {
      if (alumniStep > 1) {
        setAlumniStep(alumniStep - 1);
      } else {
        setShowMobileUserTypeSelect(true);
      }
    }

    if (selectedUserType === 'hr-recruiter') {
      if (hrRecruiterStep > 1) {
        setHrRecruiterStep(hrRecruiterStep - 1);
      } else {
        setShowMobileUserTypeSelect(true);
      }
    }

    if (selectedUserType === 'owner') {
      if (pgOwnerStep > 1) {
        setPgOwnerStep(pgOwnerStep - 1);
      } else {
        setShowMobileUserTypeSelect(true);
      }
    }
  };

  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'h-full overflow-auto px-4 text-white register-page md:px-8 xl:px-12 custom-scrollbar',
        isMobile
          ? 'bg-[linear-gradient(-30deg,#000000_16.16%,#000000_84.65%,#A82EFF_122.09%)]'
          : 'md:bg-cardblack'
      )}
    >
      {contextHolder}
      <div className='flex flex-col h-full md:flex-row'>
        {/* Mobile User Type Selection  */}
        {showMobileUserTypeSelect && (
          <div className='block md:hidden '>
            <h1 className='mb-8 text-2xl font-bold '>Who you are? Select user type</h1>
            <UserTypeSelection
              userTypes={userTypes}
              selectedUserType={selectedUserType}
              setSelectedUserType={setSelectedUserType}
            />
            <button
              className='w-full py-3 mt-8 font-semibold text-white bg-purple-500 rounded-full'
              onClick={() => setShowMobileUserTypeSelect(false)}
            >
              Continue
            </button>
          </div>
        )}

        {/* Main Content (form) */}
        <div
          className={`w-full pb-20 h-full md:ml-[320px] lg:ml-[360px] mt-4 md:pl-6 lg:pl-8 ${
            showMobileUserTypeSelect ? 'hidden md:block' : ''
          }`}
        >
          <div className='block mt-8 md:hidden'>
            <div className='flex items-center justify-between gap-3'>
              <Button
                className='flex items-center justify-center w-16 h-16 p-0 rounded-full bg-cardblack ant-btn-primary'
                onClick={handleBack}
              >
                <BackArraowIcon />
              </Button>

              {/* Show skip only when inside student onboarding */}
              {selectedUserType === 'student' && step !== 1 && (
                <Button type='button' className='text-purple-600' onClick={() => setStep(1)}>
                  Skip
                </Button>
              )}
            </div>
          </div>
          <div className='max-w-2xl mx-auto md:max-w-3xl lg:max-w-4xl'>{renderStepContent()}</div>
        </div>

        {/* Desktop Sidebar */}
        <div className='md:w-[320px] lg:w-[360px] min-h-screen p-3 lg:p-4 border-r border-gray-800 fixed ml-0 hidden md:block'>
          <h1 className='pl-6 mb-6 text-xl font-bold lg:text-2xl lg:mb-8 lg:pl-8'>
            Who you are? Select user type
          </h1>
          <UserTypeSelection
            userTypes={userTypes}
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
          />
        </div>
      </div>
      <SuccessNotification message={successMessage} showSuccess={showSuccess} />
      <ErrorNotification message={errors.general} />
    </div>
  );
}
