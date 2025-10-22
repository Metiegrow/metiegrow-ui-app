import { Button } from 'antd';

export const ToggleButton = ({ options, value, onChange, error }) => (
  <div>
    <div className='flex flex-wrap gap-2 sm:flex-nowrap'>
      {options.map((option) => (
        <Button
          key={option.value}
          type='button'
          className={`px-6 py-2 rounded-full border-2 text-sm font-medium shadow-none transition-colors duration-200 ${
            value === option.value
              ? 'border-[#A82EFF] text-white bg-cardblack'
              : 'border-gray-500 text-gray-500 hover:border-gray-400 hover:text-[#CCCCCC]'
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
    {error && <p className='mt-1 text-xs text-red-500 md:text-sm'>{error}</p>}
  </div>
);
