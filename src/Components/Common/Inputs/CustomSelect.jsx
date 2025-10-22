import { ChevronDown, Search } from 'lucide-react';
import { Select } from 'antd';
import { useState } from 'react';

export const CustomSelect = ({
  label,
  name,
  value,
  options,
  placeholder,
  required,
  onChange,
  searchable = false,
  disabled = false,
  error,
  allowClear = false,
  loading = false,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const selectClasses = `
    w-full h-[56px] bg-secondary border 
    ${error ? 'border-red-500' : isFocused ? 'border-purple-500' : 'border-gray-600'} 
    rounded-[28px] px-4 md:px-5 text-white appearance-none 
    focus:border-purple-500 focus:ring-1 focus:ring-purple-500 
    transition-colors
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <div className='mb-4 md:mb-6'>
      <label className='block text-sm md:text-base font-medium mb-1 md:mb-2 text-white'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <div className='relative'>
        <Select
          showSearch={searchable}
          value={value || undefined}
          onChange={(val) => onChange && onChange(val)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          allowClear={allowClear}
          placement='bottomLeft'
          className='w-full [&_.ant-select-selector]:!bg-secondary [&_.ant-select-selector]:!border-gray-600 [&_.ant-select-selector]:!h-[56px] [&_.ant-select-selector]:!rounded-[28px] [&_.ant-select-selector]:!px-4 [&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-placeholder]:!text-gray-400 [&_.ant-select-arrow]:!opacity-0 hover:[&_.ant-select-selector]:!border-purple-500 focus:[&_.ant-select-selector]:!border-purple-500'
          options={(Array.isArray(options) ? options : []).map((o) =>
            typeof o === 'object' ? o : { value: o, label: o }
          )}
          filterOption={
            searchable
              ? (input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())
              : undefined
          }
          popupClassName='!bg-secondary !text-white'
          dropdownStyle={{ backgroundColor: '#131313', color: '#fff', border: '1px solid #374151' }}
          {...props}
        />
        <div className='absolute right-4 top-[28px] transform -translate-y-1/2 text-gray-400 pointer-events-none z-10 flex items-center justify-center h-0'>
          <ChevronDown className='w-4 h-4' />
        </div>
      </div>
      {error && <p className='text-red-500 text-xs md:text-sm mt-1'>{error}</p>}
    </div>
  );
};
