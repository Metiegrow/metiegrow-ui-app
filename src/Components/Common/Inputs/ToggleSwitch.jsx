import { useState } from 'react';

export const ToggleSwitch = ({
  label,
  name,
  value = false,
  onChange,
  error,
  disabled = false,
  size = 'medium',
  color = 'purple',
  showLabels = true,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      onChange(name, !value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  const sizeClasses = {
    small: {
      container: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
      label: 'text-sm',
    },
    medium: {
      container: 'w-10 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-4',
      label: 'text-base',
    },
    large: {
      container: 'w-12 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-5',
      label: 'text-lg',
    },
  };

  const colorClasses = {
    purple: {
      on: 'bg-purple-600',
      off: 'bg-gray-700',
    },
    green: {
      on: 'bg-green-600',
      off: 'bg-gray-700',
    },
    blue: {
      on: 'bg-blue-600',
      off: 'bg-gray-700',
    },
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color];

  return (
    <div className={`mb-4 md:mb-6 ${className}`}>
      <div className='flex items-center justify-between'>
        <label className={`block font-medium text-white ${currentSize.label}`}>{label}</label>

        <div className='flex items-center space-x-3'>
          {showLabels && (
            <span className={`text-sm ${value ? 'text-white' : 'text-gray-400'}`}>
              {value ? 'Yes' : 'No'}
            </span>
          )}

          <div
            className={`
              ${currentSize.container} rounded-full cursor-pointer transition-colors duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${value ? currentColor.on : currentColor.off}
              ${isFocused ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}
            `.trim()}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={disabled ? -1 : 0}
            role='switch'
            aria-checked={value}
            aria-disabled={disabled}
            {...props}
          >
            <div
              className={`
                ${currentSize.thumb} bg-white rounded-full transform transition-transform duration-200
                ${value ? currentSize.translate : 'translate-x-0'}
              `.trim()}
            />
          </div>
        </div>
      </div>

      {error && <p className='text-red-500 text-xs md:text-sm mt-1'>{error}</p>}
    </div>
  );
};
