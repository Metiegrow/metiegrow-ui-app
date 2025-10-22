import React from 'react';
import { User, FileText, Settings, Headphones } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const recruiterMenuItems = [
  {
    id: 'personal',
    icon: <User size={22} className='mr-3' />,
    text: 'My Personal Info',
    path: '/app/recruiter/personal-info',
  },
  {
    id: 'complaints',
    icon: <FileText size={22} className='mr-3' />,
    text: 'Complaints',
    path: '/app/recruiter/complaints',
  },
  {
    id: 'settings',
    icon: <Settings size={22} className='mr-3' />,
    text: 'Settings',
    path: '/app/recruiter/settings',
  },
  {
    id: 'support',
    icon: <Headphones size={22} className='mr-3' />,
    text: 'Help & Support',
    path: '/app/recruiter/support',
  },
];

const RecruiterMenu = () => (
  <div className='bg-[#232323] rounded-2xl p-6 w-full max-w-xs shadow-lg'>
    <h2 className='text-xl font-bold mb-6 text-white'>Recruiter Menu</h2>
    <ul className='space-y-2'>
      {recruiterMenuItems.map((item) => (
        <li key={item.id}>
          <Link
            to={item.path}
            className='flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-white'
          >
            {item.icon}
            <span>{item.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RecruiterMenu;
