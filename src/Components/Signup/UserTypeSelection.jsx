import React from 'react';
import { GraduationCap, Users, GavelIcon, UserCheck, Building2 } from 'lucide-react';

export const UserTypeSelection = ({ userTypes, selectedUserType, setSelectedUserType }) => (
  <div className='w-full max-w-xs mx-auto space-y-2 sm:space-y-3 sm:max-w-md'>
    {userTypes.map((type) => (
      <div
        key={type.id}
        onClick={() => setSelectedUserType(type.id)}
        style={{
          background:
            selectedUserType === type.id
              ? 'linear-gradient(#131313, #131313) padding-box, linear-gradient(90deg, #BC5FFF 0%, #4B0082 100%) border-box'
              : '#131313',
          border:
            selectedUserType === type.id
              ? '1px solid transparent'
              : '1px solid rgba(255, 255, 255, 0.1)',
        }}
        className={`relative flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 
          ${selectedUserType === type.id ? '' : 'hover:border-[rgba(255,255,255,0.2)]'}`}
      >
        <div
          className={`icon-container mr-3 sm:mr-4 ${
            selectedUserType === type.id ? 'selected-icon' : 'text-white'
          }`}
        >
          {type.icon}
        </div>
        <div className='flex-grow'>
          <div
            className={`text-sm sm:text-base md:text-lg font-medium ${
              selectedUserType === type.id ? 'text-white' : 'text-gray-300'
            }`}
          >
            {type.label}
          </div>
        </div>
        <div className={`user-type-radio ${selectedUserType === type.id ? 'selected' : ''}`}>
          <span className='dot'></span>
        </div>
      </div>
    ))}
  </div>
);

export default UserTypeSelection;
