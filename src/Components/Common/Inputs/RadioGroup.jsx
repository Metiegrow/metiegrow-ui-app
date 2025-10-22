import { useState } from 'react';

export const RadioGroup = ({
  label,
  name,
  value,
  options = [],
  onChange,
  error,
  disabled = false,
  orientation = 'vertical',
  variant = 'default',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (optionValue) => {
    if (!disabled) {
      onChange(name, optionValue);
    }
  };

  const containerClasses = `
    mb-4 md:mb-6
    ${className}
  `.trim();

  const optionsClasses = `
    ${orientation === 'horizontal' ? 'flex flex-wrap gap-3' : 'space-y-3'}
  `.trim();

  const getOptionClasses = (option, isSelected) => {
    const baseClasses = `
      flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `.trim();

    if (variant === 'card') {
      return `
        ${baseClasses}
        ${
          isSelected
            ? 'border-green-500 bg-green-500 bg-opacity-10'
            : 'border-gray-600 hover:border-gray-500'
        }
      `.trim();
    }

    if (variant === 'pill') {
      return `
        ${baseClasses}
        ${
          isSelected
            ? 'border-purple-500 bg-purple-600 text-white'
            : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700'
        }
        rounded-full px-4 py-2
      `.trim();
    }

    // Default variant
    return `
      ${baseClasses}
      ${
        isSelected
          ? 'border-purple-500 bg-purple-500 bg-opacity-10'
          : 'border-gray-600 hover:border-gray-500'
      }
    `.trim();
  };

  const getRadioClasses = (isSelected) => {
    if (variant === 'card') {
      return `
        w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
        ${isSelected ? 'border-green-500 bg-green-500' : 'border-gray-400'}
      `.trim();
    }

    return `
      w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
      ${isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-400'}
    `.trim();
  };

  return (
    <div className={containerClasses}>
      <label className='block text-sm md:text-base font-medium mb-1 md:mb-2 text-white'>
        {label}
      </label>

      <div
        className={`
          ${optionsClasses}
          ${isFocused ? 'ring-1 ring-purple-500 rounded-lg p-1' : ''}
          transition-all duration-200
        `.trim()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
        role='radiogroup'
        aria-labelledby={`${name}-label`}
        {...props}
      >
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <div
              key={option.value}
              className={getOptionClasses(option, isSelected)}
              onClick={() => handleChange(option.value)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleChange(option.value);
                }
              }}
              role='radio'
              aria-checked={isSelected}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
            >
              <div className={getRadioClasses(isSelected)}>
                {isSelected && <div className='w-2 h-2 bg-white rounded-full'></div>}
              </div>

              <div className='flex-1'>
                <span
                  className={`text-base font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}
                >
                  {option.label}
                </span>
                {option.description && (
                  <p className={`text-sm mt-1 ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}>
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className='text-red-500 text-xs md:text-sm mt-1'>{error}</p>}
    </div>
  );
};
