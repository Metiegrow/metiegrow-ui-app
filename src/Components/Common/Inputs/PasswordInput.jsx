import { Button, Input } from 'antd';
import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

const PasswordInput = ({ value, onChange, placeholder, label }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='mb-4 sm:mb-6 px-0'>
      <label className='block text-sm font-open-sans sm:text-base text-white mb-2'>{label}</label>
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-full border  placeholder:text-text-graytext border-borders rounded-full py-2 sm:py-3 px-4 pr-10 text-textgray focus:outline-none focus:ring-2 focus:ring-purple-500'
          placeholder={placeholder}
        />
        <Button
          type='button'
          className='absolute inset-y-3 right-2 flex items-center cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff size={18} className='text-gray-400' />
          ) : (
            <Eye size={18} className='text-gray-400' />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PasswordInput;
