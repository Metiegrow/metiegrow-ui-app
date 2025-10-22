import React from 'react';
import {
  BatchMate,
  CommentIcon,
  ForwardShareIcon,
  HouseHunt,
  InterviewPreparation,
  Resume,
  SOP,
  ThumbsUpIcon,
  UniversityAdmissionGuidance,
  VisaHelp,
} from '../Dashboard.svg';
import { useRouter } from '@tanstack/react-router'; // Example, use your router

export default function StudentToolkit() {
  const router = useRouter();

  const firstRow = [
    {
      name: 'Know your batch mate',
      icon: <BatchMate />,
      to: '/app/batchmates',
    },
    {
      name: 'House Hunt',
      icon: <HouseHunt />,
      to: '/app/househunt',
    },
    {
      name: 'SOP/LOR Writing',
      icon: <SOP />,
      to: '/app/soplorwriting',
    },
    {
      name: 'Visa Help',
      icon: <VisaHelp />,
      to: '/app/lawyer',
    },
  ];

  const secondRow = [
    {
      name: 'Resume/CV Writing',
      icon: <Resume />,
      to: '/app/resume',
    },
    {
      name: 'Interview Preparation',
      icon: <InterviewPreparation />,
      to: '/app/interviewpreparation',
    },
    {
      name: 'University Admission Guidance',
      icon: <UniversityAdmissionGuidance />,
      to: '/app/admission-guidance',
    },
  ];

  return (
    <div className='mb-12'>
      <h2 className='mb-3 text-base font-bold sm:text-lg md:text-xl lg:text-2xl'>
        Your Student Toolkit
      </h2>

      {/* First row */}
      <div className='grid grid-cols-2 gap-4 mb-4 sm:grid-cols-3 md:grid-cols-4'>
        {firstRow.map((tool, index) => (
          <div
            key={index}
            className={`rounded-lg  flex flex-col items-center justify-start ${
              tool.to ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
            }`}
            onClick={tool.to ? () => router.navigate({ to: tool.to }) : undefined}
          >
            <div className='flex items-center justify-center p-3 mb-2 rounded-full bg-cardblack'>
              {React.cloneElement(tool.icon, {
                className: 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6',
              })}
            </div>
            <p className='text-[10px] sm:text-xs md:text-sm text-center leading-tight text-ellipsis overflow-hidden text-wrap w-full text-white'>
              {tool.name}
            </p>
          </div>
        ))}
      </div>

      {/* Second row with gradient background */}
      <div
        className='grid grid-cols-2 sm:grid-cols-3 gap-4 p-3 rounded-[24px]'
        style={{
          background: 'linear-gradient(221.28deg, #2E2E2E 16.16%, #323034 68.65%, #A82EFF 122.09%)',
        }}
      >
        {secondRow.map((tool, index) => (
          <div
            key={index}
            className={`rounded-lg p-2 sm:p-3 flex flex-col items-center justify-start ${
              tool.to ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
            }`}
            onClick={tool.to ? () => router.navigate({ to: tool.to }) : undefined}
          >
            <div className='bg-[#1E1E1E] rounded-full p-3 flex items-center justify-center mb-2'>
              {React.cloneElement(tool.icon, {
                className: 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6',
              })}
            </div>
            <p className='text-[10px] sm:text-xs md:text-sm text-center  leading-tight text-ellipsis overflow-hidden text-wrap w-full text-white'>
              {tool.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
