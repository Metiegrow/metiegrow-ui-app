import { InputNumber } from 'antd';
import { useState } from 'react';

export const NumberInput = ({
  label,
  name,
  value,
  placeholder,
  required,
  onChange,
  error,
  disabled = false,
  min = 0,
  max,
  step = 1,
  precision,
  icon,
  iconPosition = 'left',
  className = '',
  placeholderWhite = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const inputClasses = `
    w-full h-[56px] border
    ${error ? 'border-red-500' : isFocused ? 'border-purple-500' : 'border-gray-600'}
    rounded-[28px] px-4 md:px-5 text-white placeholder-gray-500
    focus:border-purple-500 focus:ring-1 focus:ring-purple-500
    transition-colors
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${className}
  `.trim();

  return (
    <div className='mb-4 md:mb-6'>
      <label className='block text-sm md:text-base font-medium mb-1 md:mb-2 text-white'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <div className='relative'>
        {icon && iconPosition === 'left' && (
          <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10'>
            {icon}
          </div>
        )}
        <InputNumber
          min={min}
          max={max}
          step={step}
          precision={precision}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          bordered={false}
          controls={false}
          className={inputClasses}
          rootClassName={placeholderWhite ? 'number-input-white-placeholder' : undefined}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10'>
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p id={`${name}-error`} className='text-red-500 text-xs md:text-sm mt-1'>
          {error}
        </p>
      )}
    </div>
  );
};
