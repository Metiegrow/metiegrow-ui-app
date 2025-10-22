import React from 'react';
import {
  Users,
  Home,
  FileText,
  Shield,
  File,
  Target,
  GraduationCap,
  Calendar,
  User,
  DollarSign,
  MessageSquare,
  Settings,
  Plus,
} from 'lucide-react';

const CommonToolkit = ({ userType = 'student', router }) => {
  const toolkitData = {
    student: {
      title: 'Your Student Toolkit',
      items: [
        {
          name: 'Know your batch mate',
          icon: <Users className='w-5 h-5' />,
          to: '/app/batchmates',
        },
        {
          name: 'House Hunt',
          icon: <Home className='w-5 h-5' />,
          to: '/app/househunt',
        },
        {
          name: 'SOP/LOR Writing',
          icon: <FileText className='w-5 h-5' />,
          to: '/app/soplorwriting',
        },
        {
          name: 'Visa Help',
          icon: <Shield className='w-5 h-5' />,
          to: '/app/lawyer',
        },
        {
          name: 'Resume/CV Writing',
          icon: <File className='w-5 h-5' />,
          to: '/app/resume',
        },
        {
          name: 'Interview Preparation',
          icon: <Target className='w-5 h-5' />,
          to: '/app/interviewpreparation',
        },
        {
          name: 'University Admission Guidance',
          icon: <GraduationCap className='w-5 h-5' />,
          to: '/app/admission-guidance',
        },
      ],
    },
    mentor: {
      title: 'Mentor Toolkit',
      items: [
        {
          name: 'Set Availability',
          icon: <Calendar className='w-5 h-5' />,
          to: '/app/availability',
        },
        {
          name: 'My Students',
          icon: <User className='w-5 h-5' />,
          to: '/app/mentor/students',
        },
        {
          name: 'Earnings',
          icon: <DollarSign className='w-5 h-5' />,
          to: '/app/mentor/earnings',
        },
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
      ],
    },
  };

  const currentToolkit = toolkitData[userType] || toolkitData.student;

  return (
    <div className='mb-12'>
      <h2 className='font-bold text-lg mb-3'>{currentToolkit.title}</h2>

      {/* First row of tools */}
      <div className='grid grid-cols-3 gap-2 mb-4'>
        {currentToolkit.items.slice(0, 3).map((tool, index) => (
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

      {/* Second row of tools with gradient background */}
      <div
        className='grid grid-cols-3 gap-2 p-3 rounded-[24px] mb-0'
        style={{
          background: 'linear-gradient(221.28deg, #2E2E2E 16.16%, #323034 68.65%, #A82EFF 122.09%)',
        }}
      >
        {currentToolkit.items.slice(3, 6).map((tool, index) => (
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

      {/* Third row for student toolkit (if more than 6 items) */}
      {userType === 'student' && currentToolkit.items.length > 6 && (
        <div className='grid grid-cols-1 gap-2 mt-4'>
          <div
            className={`rounded-lg p-1 flex flex-col items-center justify-center ${currentToolkit.items[6].to ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={
              currentToolkit.items[6].to
                ? () => router.navigate({ to: currentToolkit.items[6].to })
                : undefined
            }
          >
            <div className='bg-[#1E1E1E] rounded-full p-3 flex items-center justify-center mb-1'>
              {currentToolkit.items[6].icon}
            </div>
            <p className='text-[10px] text-center leading-tight'>{currentToolkit.items[6].name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonToolkit;
