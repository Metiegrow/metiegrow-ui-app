import { useState } from 'react';

export const MultiSelect = ({
  label,
  name,
  value = [],
  options = [],
  placeholder = 'Select options',
  required = false,
  onChange,
  error,
  maxSelections,
  className = '',
  gridCols = 'grid-cols-2',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleToggle = (option) => {
    if (maxSelections && value.length >= maxSelections && !value.includes(option)) {
      return; // Don't add if max selections reached
    }

    const newValue = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];

    onChange(name, newValue);
  };

  const containerClasses = `
    mb-4 md:mb-6
    ${className}
  `.trim();

  const gridClasses = `
    grid gap-2 md:gap-3
    ${gridCols}
  `.trim();

  return (
    <div className={containerClasses}>
      <label className='block text-sm md:text-base font-medium mb-1 md:mb-2 text-white'>
        {label} {required && <span className='text-red-500'>*</span>}
        {maxSelections && (
          <span className='text-xs text-gray-400 ml-2'>
            ({value.length}/{maxSelections})
          </span>
        )}
      </label>

      <div
        className={`
          ${gridClasses}
          ${isFocused ? 'ring-1 ring-purple-500' : ''}
          transition-all duration-200
        `.trim()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
        {...props}
      >
        {options.map((option) => {
          const isSelected = value.includes(option);
          const isDisabled = maxSelections && value.length >= maxSelections && !isSelected;

          return (
            <div
              key={option}
              className={`
                px-3 md:px-4 py-2 md:py-2.5 rounded-full text-center text-sm md:text-base 
                border cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600'
                    : isDisabled
                      ? 'bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed'
                      : 'bg-gray-500 border-white text-gray-300 hover:bg-gray-700 hover:border-gray-400'
                }
              `.trim()}
              onClick={() => !isDisabled && handleToggle(option)}
              role='button'
              tabIndex={isDisabled ? -1 : 0}
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
            >
              {option}
            </div>
          );
        })}
      </div>

      {error && <p className='text-red-500 text-xs md:text-sm mt-1'>{error}</p>}

      {maxSelections && value.length >= maxSelections && (
        <p className='text-xs text-amber-400 mt-1'>Maximum {maxSelections} selections allowed</p>
      )}
    </div>
  );
};
