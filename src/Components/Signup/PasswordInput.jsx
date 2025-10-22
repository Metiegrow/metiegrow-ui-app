import { EyeOff, Eye } from 'lucide-react';
import { Input, Button } from 'antd';
import { useEffect, useState } from 'react';

export const PasswordInput = ({
  label,
  name,
  value,
  placeholder,
  backgroundColor = 'bg-transparent',
  showPassword,
  togglePassword,
  onChange,
  error,
}) => {
  const [localError, setLocalError] = useState(error);

  // ✅ Sync external error into local state
  useEffect(() => {
    setLocalError(error);
  }, [error]);

  // ✅ Clear error when user types
  const handleChange = (e) => {
    if (localError) {
      setLocalError(null);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className='mb-4 md:mb-6'>
      {label && (
        <label className='block mb-1 text-sm font-medium text-white md:text-base md:mb-2'>
          {label} <span className='text-red-500'>*</span>
        </label>
      )}
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full h-[56px] border ${backgroundColor} ${
            localError ? 'border-red-500' : 'border-gray-600'
          } rounded-[28px] px-4 md:px-5 pr-10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors`}
          aria-invalid={!!localError}
          aria-describedby={localError ? `${name}-error` : undefined}
        />
        <Button
          type='button'
          className='absolute right-3 top-2.5 md:top-3 text-gray-400 hover:text-white transition-colors'
          onClick={togglePassword}
        >
          {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
        </Button>
      </div>
      {localError && (
        <p id={`${name}-error`} className='mt-1 text-xs text-red-500 md:text-sm'>
          {localError}
        </p>
      )}
    </div>
  );
};
