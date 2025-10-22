import React from 'react';
import { Calendar, Users, DollarSign, MessageSquare, Settings, Plus } from 'lucide-react';

const MentorToolkit = ({ router }) => {
  return (
    <div className='mb-12'>
      <h2 className='font-bold text-lg mb-3'>Mentor Toolkit</h2>

      {/* First row of tools */}
      <div className='grid grid-cols-3 gap-2 mb-4'>
        {[
          {
            name: 'Set Availability',
            icon: <Calendar className='w-5 h-5' />,
            to: '/app/availability',
          },
          {
            name: 'My Students',
            icon: <Users className='w-5 h-5' />,
            to: '/app/mentor/students',
          },
          {
            name: 'Earnings',
            icon: <DollarSign className='w-5 h-5' />,
            to: '/app/mentor/earnings',
          },
        ].map((tool, index) => (
          <div
            key={index}
            className={`rounded-lg p-1 flex flex-col items-center justify-center ${tool.to ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={tool.to ? () => router.navigate({ to: tool.to }) : undefined}
          >
            <div className='bg-[#1E1E1E] rounded-full p-3 flex items-center justify-center mb-1 cursor-pointer'>
              {tool.icon}
            </div>
            <p className='text-[10px] text-center leading-tight'>{tool.name}</p>
          </div>
        ))}
      </div>

      {/* Second row of tools with gradient background */}
      <div
        className='grid grid-cols-3 gap-2 p-3 rounded-[24px] mb-0'
        style={{
          background: 'linear-gradient(221.28deg, #2E2E2E 16.16%, #323034 68.65%, #A82EFF 122.09%)',
        }}
      >
        {[
          {
            name: 'Messages',
            icon: <MessageSquare className='w-5 h-5' />,
            to: '/app/message',
          },
          {
            name: 'Create Service',
            icon: <Plus className='w-5 h-5' />,
            to: '/app/gigs',
          },
          {
            name: 'Settings',
            icon: <Settings className='w-5 h-5' />,
            to: '/app/settings',
          },
        ].map((tool, index) => (
          <div
            key={index}
            className={`rounded-lg p-1 flex flex-col items-center justify-center ${tool.to ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={tool.to ? () => router.navigate({ to: tool.to }) : undefined}
          >
            <div className='bg-[#1E1E1E] rounded-full p-3 flex items-center justify-center mb-1'>
              {tool.icon}
            </div>
            <p className='text-[10px] text-center leading-tight'>{tool.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorToolkit;
