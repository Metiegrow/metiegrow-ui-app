// Re-export global input components for backward compatibility
export {
  CustomInput,
  CustomSelect,
  MultiSelect,
  ToggleSwitch,
  RadioGroup,
  CustomTextarea,
  FileUpload,
  DatePicker,
} from '../Common/Inputs';

// Export local PasswordInput
export { PasswordInput } from './PasswordInput';

// Export Sign-specific components
export { ToggleButton } from './ToggleButton';

// Export form components
export { Step1Form } from './Step1Form';
export { Step2Form } from './Step2Form';
export { Step3Form } from './Step3Form';
export { AlumniOnboardingStep1 } from './AlumniOnboardingStep1';
export { AlumniOnboardingForm } from './AlumniOnboardingForm';
export { MentorOnboardingForm } from './MentorOnboardingForm';
export { LawyerOnboardingForm } from './LawyerOnboardingForm';
export { PGOwnerForm } from './PGOwnerForm';
export { EmploymentTypeForm } from './EmploymentTypeForm';
export { UserTypeSelection } from './UserTypeSelection';

// Export utility components
export { SuccessNotification } from './SuccessNotification';
export { ErrorNotification } from './ErrorNotification';
export { LoadingSpinner } from './LoadingSpinner';

// Re-export validation utilities from global system
export * from '../Common/Inputs/validationUtils';

// Export main register component
export { default as Register } from './Register';
