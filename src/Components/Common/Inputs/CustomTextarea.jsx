import { Input } from 'antd';
import { useState } from 'react';

export const CustomTextarea = ({
  label,
  name,
  value = '',
  placeholder,
  required = false,
  onChange,
  error,
  disabled = false,
  maxLength,
  showCharCount = true,
  rows = 4,
  resize = 'vertical',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const textareaClasses = `
    w-full bg-secondary border 
    ${error ? 'border-red-500' : isFocused ? 'border-purple-500' : 'border-gray-600'} 
    rounded-[28px] px-4 md:px-5 py-3 text-white placeholder-gray-500 
    focus:border-purple-500 focus:ring-1 focus:ring-purple-500 
    transition-colors
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${resize === 'none' ? 'resize-none' : resize === 'vertical' ? 'resize-y' : 'resize'}
    ${className}
  `.trim();

  const currentLength = value?.length || 0;
  const isNearLimit = maxLength && currentLength > maxLength * 0.8;
  const isAtLimit = maxLength && currentLength >= maxLength;

  return (
    <div className='mb-4 md:mb-6'>
      <label className='block text-sm md:text-base font-medium mb-1 md:mb-2 text-white'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>

      <div className='relative'>
        <Input.TextArea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          className={textareaClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
      </div>

      {error && (
        <p id={`${name}-error`} className='text-red-500 text-xs md:text-sm mt-1'>
          {error}
        </p>
      )}

      {showCharCount && maxLength && (
        <div className='flex justify-between items-center mt-1'>
          <p
            className={`text-xs ${
              isAtLimit ? 'text-red-400' : isNearLimit ? 'text-amber-400' : 'text-gray-400'
            }`}
          >
            {currentLength}/{maxLength} characters
          </p>
          {isAtLimit && <p className='text-xs text-red-400'>Character limit reached</p>}
        </div>
      )}
    </div>
  );
};
