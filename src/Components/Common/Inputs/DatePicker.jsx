import { useState } from 'react';
import { CalendarIcon, ClockIcon, CalendarClockIcon, YearIcon } from './Icons';

// Helper function to format date to YYYY-MM-DD
const formatDateForInput = (dateValue) => {
  if (!dateValue) return '';

  // If it's already in YYYY-MM-DD format, return as is
  if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return dateValue;
  }

  // If it's a Date object or other format, convert to YYYY-MM-DD
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const DatePicker = ({
  label,
  name,
  value,
  placeholder = 'Select date',
  required = false,
  onChange,
  error,
  disabled = false,
  minDate,
  maxDate,
  showTime = false,
  format = 'YYYY-MM-DD',
  className = '',
  type = 'date', // Support for different input types
  validationRules = [],
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (e) => {
    // Ensure we pass the event object properly
    if (onChange) {
      onChange(e);
    }
  };

  const getInputType = () => {
    if (type === 'datetime-local' || showTime) return 'datetime-local';
    if (type === 'time') return 'time';
    if (type === 'month') return 'month';
    if (type === 'year') return 'number'; // For year input, use number type
    return 'date';
  };

  const inputClasses = `
    w-full h-[56px] bg-secondary border
    ${error ? 'border-red-500' : isFocused ? 'border-purple-500' : 'border-gray-600'}
    rounded-[28px] px-4 md:px-5 text-white placeholder-gray-500
    focus:border-purple-500 focus:ring-1 focus:ring-purple-500
    transition-colors
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${getInputType() === 'date' ? 'date-input-no-calendar' : ''}
    ${className}
  `.trim();

  const getMinMaxProps = () => {
    const minMaxProps = {};
    if (minDate !== undefined && minDate !== null) {
      if (type === 'year') {
        if (typeof minDate === 'number') {
          minMaxProps.min = minDate;
        } else if (typeof minDate === 'string') {
          minMaxProps.min = minDate;
        } else if (minDate instanceof Date) {
          minMaxProps.min = minDate.getFullYear();
        }
      } else {
        if (typeof minDate === 'string') {
          minMaxProps.min = minDate;
        } else if (minDate instanceof Date) {
          minMaxProps.min = minDate.toISOString().split('T')[0];
        }
      }
    }
    if (maxDate !== undefined && maxDate !== null) {
      if (type === 'year') {
        if (typeof maxDate === 'number') {
          minMaxProps.max = maxDate;
        } else if (typeof maxDate === 'string') {
          minMaxProps.max = maxDate;
        } else if (maxDate instanceof Date) {
          minMaxProps.max = maxDate.getFullYear();
        }
      } else {
        if (typeof maxDate === 'string') {
          minMaxProps.max = maxDate;
        } else if (maxDate instanceof Date) {
          minMaxProps.max = maxDate.toISOString().split('T')[0];
        }
      }
    }
    return minMaxProps;
  };

  const getYearValue = () => {
    if (type === 'year' && value) {
      return typeof value === 'string' ? value : value.getFullYear();
    }
    return value;
  };

  const handleYearChange = (e) => {
    if (type === 'year') {
      const year = parseInt(e.target.value);
      if (!isNaN(year)) {
        const syntheticEvent = {
          target: {
            name: name,
            value: year.toString(),
            type: 'number',
          },
        };
        onChange(syntheticEvent);
      }
    } else {
      handleChange(e);
    }
  };

  return (
    <div className='mb-4 md:mb-6'>
      {label && (
        <label className='block text-sm md:text-base font-medium mb-1 md:mb-2 text-white'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}

      <div className='relative'>
        <input
          type={getInputType()}
          name={name}
          value={type === 'year' ? getYearValue() : formatDateForInput(value)}
          onChange={type === 'year' ? handleYearChange : handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          style={{
            colorScheme: 'dark',
          }}
          {...getMinMaxProps()}
          {...props}
        />

        <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'>
          {type === 'year' ? (
            <YearIcon className='w-5 h-5' />
          ) : type === 'time' ? (
            <ClockIcon className='w-5 h-5' />
          ) : showTime || type === 'datetime-local' ? (
            <CalendarClockIcon className='w-5 h-5' />
          ) : (
            <CalendarIcon className='w-5 h-5' />
          )}
        </div>
      </div>

      {error && (
        <p id={`${name}-error`} className='text-red-500 text-xs md:text-sm mt-1'>
          {error}
        </p>
      )}
    </div>
  );
};
