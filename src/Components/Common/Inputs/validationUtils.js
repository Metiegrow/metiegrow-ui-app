// Form validation utilities
export const validationRules = {
  required: (value, message = 'This field is required') => {
    if (typeof value === 'string') {
      return value.trim() ? null : message;
    }
    if (Array.isArray(value)) {
      return value.length > 0 ? null : message;
    }
    return value ? null : message;
  },

  email: (value, message = 'Please enter a valid email address') => {
    if (!value) return null; // Let required rule handle empty values
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : message;
  },

  phone: (value, message = 'Please enter a valid phone number') => {
    if (!value) return null;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? null : message;
  },

  minLength: (min, message) => (value) => {
    if (!value) return null;
    return value.length >= min ? null : message || `Must be at least ${min} characters`;
  },

  maxLength: (max, message) => (value) => {
    if (!value) return null;
    return value.length <= max ? null : message || `Must be no more than ${max} characters`;
  },

  password: (
    value,
    message = 'Password must be at least 8 characters with uppercase, lowercase, number and special character'
  ) => {
    if (!value) return null;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value) ? null : message;
  },

  confirmPassword:
    (password, message = 'Passwords do not match') =>
    (value) => {
      return value === password ? null : message;
    },

  url: (value, message = 'Please enter a valid URL') => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return message;
    }
  },

  number: (value, message = 'Please enter a valid number') => {
    if (!value) return null;
    return !isNaN(value) && !isNaN(parseFloat(value)) ? null : message;
  },

  min: (min, message) => (value) => {
    if (!value) return null;
    const num = parseFloat(value);
    return num >= min ? null : message || `Must be at least ${min}`;
  },

  max: (max, message) => (value) => {
    if (!value) return null;
    const num = parseFloat(value);
    return num <= max ? null : message || `Must be no more than ${max}`;
  },

  fileSize: (maxSize, message) => (file) => {
    if (!file) return null;
    return file.size <= maxSize
      ? null
      : message || `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
  },

  fileType: (allowedTypes, message) => (file) => {
    if (!file) return null;
    const isValidType = allowedTypes.some((type) => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', '/'));
      }
      return file.type === type;
    });
    return isValidType ? null : message || `File type must be one of: ${allowedTypes.join(', ')}`;
  },

  dateRange: (minDate, maxDate, message) => (value) => {
    if (!value) return null;
    const date = new Date(value);
    const min = new Date(minDate);
    const max = new Date(maxDate);
    return date >= min && date <= max
      ? null
      : message || `Date must be between ${minDate} and ${maxDate}`;
  },

  date: (value, message = 'Please enter a valid date') => {
    if (!value) return null;
    const date = new Date(value);
    return !isNaN(date.getTime()) ? null : message;
  },

  minDate: (minDate, message) => (value) => {
    if (!value) return null;
    const date = new Date(value);
    const min = new Date(minDate);
    return date >= min ? null : message || `Date must be after ${minDate}`;
  },

  maxDate: (maxDate, message) => (value) => {
    if (!value) return null;
    const date = new Date(value);
    const max = new Date(maxDate);
    return date <= max ? null : message || `Date must be before ${maxDate}`;
  },

  futureDate: (value, message = 'Date must be in the future') => {
    if (!value) return null;
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today ? null : message;
  },

  pastDate: (value, message = 'Date must be in the past') => {
    if (!value) return null;
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today ? null : message;
  },

  year: (value, message = 'Please enter a valid year') => {
    if (!value) return null;
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear + 10 ? null : message;
  },

  custom: (validator, message) => (value) => {
    return validator(value) ? null : message;
  },
};

// Validate a single field
export const validateField = (value, rules) => {
  if (!rules || rules.length === 0) return null;

  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }

  return null;
};

// Validate entire form
export const validateForm = (formData, validationSchema) => {
  const errors = {};

  Object.keys(validationSchema).forEach((fieldName) => {
    const fieldRules = validationSchema[fieldName];
    const fieldValue = formData[fieldName];

    const error = validateField(fieldValue, fieldRules);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Common validation schemas
export const commonSchemas = {
  email: [validationRules.required(), validationRules.email()],
  password: [validationRules.required(), validationRules.password()],
  phone: [validationRules.required(), validationRules.phone()],
  name: [validationRules.required(), validationRules.minLength(2)],
  required: [validationRules.required()],
  optionalEmail: [validationRules.email()],
  optionalPhone: [validationRules.phone()],
  url: [validationRules.url()],
  optionalUrl: [validationRules.url()],
};

// Form field validation helpers
export const createValidationSchema = (fields) => {
  const schema = {};

  fields.forEach((field) => {
    const rules = [];

    if (field.required) {
      rules.push(validationRules.required(field.requiredMessage));
    }

    if (field.type === 'email') {
      rules.push(validationRules.email(field.emailMessage));
    }

    if (field.type === 'phone') {
      rules.push(validationRules.phone(field.phoneMessage));
    }

    if (field.minLength) {
      rules.push(validationRules.minLength(field.minLength, field.minLengthMessage));
    }

    if (field.maxLength) {
      rules.push(validationRules.maxLength(field.maxLength, field.maxLengthMessage));
    }

    if (field.type === 'password') {
      rules.push(validationRules.password(field.passwordMessage));
    }

    if (field.confirmPassword) {
      rules.push(validationRules.confirmPassword(field.password, field.confirmPasswordMessage));
    }

    if (field.url) {
      rules.push(validationRules.url(field.urlMessage));
    }

    if (field.number) {
      rules.push(validationRules.number(field.numberMessage));
    }

    if (field.min !== undefined) {
      rules.push(validationRules.min(field.min, field.minMessage));
    }

    if (field.max !== undefined) {
      rules.push(validationRules.max(field.max, field.maxMessage));
    }

    if (field.fileSize) {
      rules.push(validationRules.fileSize(field.fileSize, field.fileSizeMessage));
    }

    if (field.fileType) {
      rules.push(validationRules.fileType(field.fileType, field.fileTypeMessage));
    }

    if (field.dateRange) {
      rules.push(
        validationRules.dateRange(field.dateRange.min, field.dateRange.max, field.dateRangeMessage)
      );
    }

    if (field.custom) {
      rules.push(validationRules.custom(field.custom, field.customMessage));
    }

    schema[field.name] = rules;
  });

  return schema;
};
