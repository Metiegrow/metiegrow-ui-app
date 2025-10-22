import React from 'react';
import {
  BatchMate,
  HouseHunt,
  SOP,
  VisaHelp,
  Resume,
  InterviewPreparation,
  UniversityAdmissionGuidance,
} from '../Dashboard.svg';

const StudentToolkit = ({ router }) => {
  return (
    <div className='mb-12'>
      <h2 className='font-bold text-lg mb-3'>Your Student Toolkit</h2>

      {/* First row of tools */}
      <div className='grid grid-cols-4 gap-2 mb-4'>
        {[
          {
            name: 'Know your batch mate',
            icon: <BatchMate className='w-5 h-5' />,
            to: '/app/batchmates',
          },
          {
            name: 'House Hunt',
            icon: <HouseHunt className='w-5 h-5' />,
            to: '/app/househunt',
          },
          {
            name: 'SOP/LOR Writing',
            icon: <SOP className='w-5 h-5' />,
            to: '/app/soplorwriting',
          },
          {
            name: 'Visa Help',
            icon: <VisaHelp className='w-5 h-5' />,
            to: '/app/lawyer',
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
        className='grid grid-cols-4 gap-2 p-3 rounded-[24px] mb-0'
        style={{
          background: 'linear-gradient(221.28deg, #2E2E2E 16.16%, #323034 68.65%, #A82EFF 122.09%)',
        }}
      >
        {[
          {
            name: 'Resume/CV Writing',
            icon: <Resume className='w-5 h-5' />,
            to: '/app/resume',
          },
          {
            name: 'Interview Preparation',
            icon: <InterviewPreparation className='w-5 h-5' />,
            to: '/app/interviewpreparation',
          },
          {
            name: 'University Admission Guidance',
            icon: <UniversityAdmissionGuidance className='w-5 h-5' />,
            to: '/app/admission-guidance',
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

export default StudentToolkit;
