import React from 'react';
import { ChevronLeft } from 'lucide-react';

const EmploymentTypeForm = ({ employmentType, setEmploymentType, onContinue, onBack }) => {
  const employmentOptions = [
    { id: 'Individual/Freelancer', label: 'Individual/Freelancer' },
    { id: 'Company Requirer', label: 'Company Requirer' },
    { id: 'Consulting agency', label: 'Consulting agency' },
  ];

  const handleContinue = () => {
    if (employmentType) {
      onContinue();
    }
  };

  return (
    <div className='bg-secondary rounded-lg p-4 md:p-6'>
      {/* Header with back button */}
      <div className='flex items-center mb-8'>
        <button
          onClick={onBack}
          className='mr-4 p-2 rounded-[28px] hover:bg-gray-800 transition-colors'
        >
          <ChevronLeft className='w-5 h-5 text-gray-400' />
        </button>
        <h2 className='text-xl font-semibold text-white'>Professional Io</h2>
      </div>

      <div className='space-y-6'>
        {/* Employment Type Section */}
        <div>
          <h3 className='text-lg font-medium mb-4 text-white'>
            Employment Type <span className='text-red-500'>*</span>
          </h3>
          <div className='space-y-8'>
            {employmentOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setEmploymentType(option.id)}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                  employmentType === option.id
                    ? 'border-green-500 bg-green-500 bg-opacity-10'
                    : 'border-gray-600 hover:border-purple-400 hover:bg-purple-500 hover:bg-opacity-5'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300 ${
                    employmentType === option.id
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-400 hover:border-purple-400'
                  }`}
                >
                  {employmentType === option.id ? (
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  ) : (
                    <div className='w-1 h-1 bg-gray-400 rounded-full'></div>
                  )}
                </div>
                <span
                  className={`text-base font-medium ${
                    employmentType === option.id ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout (< 756px) */}
        <div className='block md:hidden mt-8'>
          <button
            type='button'
            className={`w-full h-[56px] rounded-[28px] font-semibold transition-all duration-300 flex items-center justify-center ${
              employmentType
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleContinue}
            disabled={!employmentType}
          >
            Continue
          </button>
        </div>

        {/* Desktop Layout (>= 756px) */}
        <div className='hidden md:flex justify-end mt-8'>
          <button
            type='button'
            className={`px-8 py-3 rounded-[28px] font-semibold transition-all duration-300 ${
              employmentType
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleContinue}
            disabled={!employmentType}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmploymentTypeForm;
