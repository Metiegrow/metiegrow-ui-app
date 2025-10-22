import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const SettingsNav = ({ onNavigate }) => {
  const menuItems = [
    { id: 'account', icon: '👤', label: 'Account Settings' },
    { id: 'personalisation', icon: '🎨', label: 'Personalisation / Preferences' },
    { id: 'notifications', icon: '🔔', label: 'Notifications Setting' },
    { id: 'payment', icon: '💳', label: 'Payment Settings' },
    { id: 'identity', icon: '🆔', label: 'Identity Verification' },
    { id: 'privacy', icon: '🔒', label: 'Privacy Settings' },
  ];

  return (
    <div className='min-h-screen bg-black text-white max-w-md mx-auto'>
      <div className='flex items-center p-4 border-b border-gray-800'>
        <ArrowLeft className='w-6 h-6 mr-3' />
        <h1 className='text-xl font-medium'>Settings</h1>
      </div>
      <div className='p-4'>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className='flex items-center justify-between p-4 hover:bg-gray-900 rounded-lg cursor-pointer transition-colors'
          >
            <div className='flex items-center'>
              <span className='text-xl mr-3'>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <ChevronRight className='w-5 h-5 text-gray-400' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsNav;
