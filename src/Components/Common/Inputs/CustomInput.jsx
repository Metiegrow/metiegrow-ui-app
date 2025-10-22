import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';

export const CustomInput = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  backgroundColor = 'bg-transparent',
  required,
  onChange,
  error,
  disabled = false,
  maxLength,
  showCharCount = false,
  prefix,
  sufix,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState(error);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // ✅ Sync external error to localError
  useEffect(() => {
    setLocalError(error);
  }, [error]);

  // ✅ Wrap onChange to clear error when user types
  const handleChange = (e) => {
    if (localError) {
      setLocalError(null); // clear error immediately on input change
    }
    if (onChange) {
      onChange(e); // forward event to parent handler
    }
  };

  const containerClasses = `
    relative
    flex
    items-center
    w-full
    border
    rounded-full
    transition-colors
    ${backgroundColor}
    ${
      localError
        ? 'border-red-500'
        : isFocused
          ? 'border-purple-500 ring-1 ring-purple-500'
          : 'border-gray-600'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <div className='w-full mb-4 md:mb-6'>
      {label && (
        <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}

      {/* ✅ Ensure flex container allows children to stretch */}
      <Card
        bodyStyle={{ padding: 0, display: 'flex', alignItems: 'center', width: '100%' }}
        className={containerClasses}
      >
        {/* Prefix */}
        {prefix && (
          <div className='flex items-center justify-center flex-shrink-0 pl-2 text-gray-400'>
            {prefix}
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange} // ✅ using wrapped handler
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            'flex-1 h-12 bg-transparent border-none outline-none text-white placeholder-gray-500',
            prefix ? 'rounded-r-full' : 'rounded-full',
            disabled ? 'cursor-not-allowed' : '',
            !prefix && 'px-4',
            !sufix && 'px-4'
          )}
          aria-invalid={!!localError}
          aria-describedby={localError ? `${name}-error` : undefined}
          {...props}
        />

        {/* Right Icon */}
        {sufix && (
          <div className='flex items-center justify-center flex-shrink-0 text-gray-400'>
            {sufix}
          </div>
        )}
      </Card>

      {/* Error Message */}
      {localError && (
        <p id={`${name}-error`} className='mt-1 text-xs text-red-500 md:text-sm'>
          {localError}
        </p>
      )}

      {/* Character Count */}
      {showCharCount && maxLength && (
        <p className='mt-1 text-xs text-right text-gray-400'>
          {value?.length || 0}/{maxLength}
        </p>
      )}
    </div>
  );
};
