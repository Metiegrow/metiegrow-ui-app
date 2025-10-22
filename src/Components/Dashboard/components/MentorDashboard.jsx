import { Link, useRouter } from '@tanstack/react-router';
import { Button, Image, Skeleton, Modal, Upload, message, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import Upcoming from '../../../assets/Upcoming.png';

import {
  BackButtonIcon,
  NextButtonPurpleIcon,
  NoDataIcon,
  RatingStarYellowIcon,
  StarIcon,
  VideoCallIcon,
} from '../../Common/SVG/svg.function';
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
} from './../Dashboard.svg';

import NeonButton from '../../Common/Button/NeonButton';

import PostRequirement from '../../Common/PostRequirement';
import Skelton from '../../Common/Skelton';
import QuestionsList from '../../Questions/QuestionsList';
import AskQuestionModal from '../../Questions/AskQuestionModal';
import AlumniCard from '../../Alumni/AlumniCard';
import MentorCard from '../../Mentors/MentorCard';
import LawyerCard from '../../Lawyer/LawyerCard';
import {
  usePostRequirementModals,
  useMentorCards,
  useAlumniCards,
  useLawyerCards,
  useQuestions,
} from '../../../hooks';

export default function MentorDashboard() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [isMobile, setIsMobile] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [showAskQuestionModal, setShowAskQuestionModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [sessionPeriod, setSessionPeriod] = useState('This month');
  const [earningsPeriod, setEarningsPeriod] = useState('This month');

  // Use custom hook to manage PostRequirement modals
  const { openRoommateModal, openRoomModal, handleRoommateModalClose, handleRoomModalClose } =
    usePostRequirementModals();

  // const [showQuestionPanel, setShowQuestionPanel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // check once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const router = useRouter();

  // Use custom hooks for all dashboard data
  const {
    data: mentorsData,
    isLoading: isMentorsLoading,
    isError: isMentorsError,
    error: mentorsError,
  } = useMentorCards({ page: 0, size: 2 });

  const {
    data: alumniData,
    isLoading: isAlumniLoading,
    isError: isAlumniError,
    error: alumniError,
  } = useAlumniCards();

  const {
    data: lawyerData,
    isLoading: isLawyerLoading,
    isError: isLawyerError,
    error: lawyerError,
  } = useLawyerCards({ page: 0, size: 2 });

  const {
    data: questionsData,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
    error: questionsError,
  } = useQuestions();

  const handleImageUpload = (info) => {
    if (window.innerWidth <= 750) {
      message.info('Image popup only available on screens wider than 750px.');
      return;
    }
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      // Use local preview
      const file = info.file.originFileObj;
      if (file) {
        setUploadedImageUrl(URL.createObjectURL(file));
        setIsImageModalOpen(true);
      }
    }
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
    setUploadedImageUrl(null);
  };

  const renderAlumniContent = () => {
    const isAbove750px = windowWidth >= 750;
    const isMobile = windowWidth < 400;
    const isTablet = windowWidth >= 400 && windowWidth < 750;

    if (isAlumniLoading) {
      return (
        <div
          className={
            isAbove750px
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3'
              : 'flex gap-3 overflow-x-auto pb-2 horizontal-scroll'
          }
        >
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className={
                isAbove750px
                  ? ''
                  : `flex-shrink-0 ${isMobile ? 'w-64' : isTablet ? 'w-72' : 'w-80'}`
              }
            >
              <Skelton />
            </div>
          ))}
        </div>
      );
    }

    if (!alumniData?.data || alumniData.data.length === 0) {
      return (
        <div className='text-center text-gray-400 text-lg mt-8'>
          No alumni profiles available right now.
        </div>
      );
    }

    return (
      <div
        className={
          isAbove750px
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mx-2'
            : 'flex gap-3 overflow-x-auto pb-2 mx-2 horizontal-scroll'
        }
      >
        {alumniData?.data?.map((alumni, index) => (
          <div
            key={index}
            className={
              isAbove750px ? '' : `flex-shrink-0 ${isMobile ? 'w-64' : isTablet ? 'w-72' : 'w-80'}`
            }
          >
            <AlumniCard
              alumni={alumni}
              backendUrl={URL}
              onClick={() => router.navigate({ to: '/app/alumni-dashboard' })}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderLawyerContent = () => {
    const isAbove750px = windowWidth >= 750;
    const isMobile = windowWidth < 400;
    const isTablet = windowWidth >= 400 && windowWidth < 750;

    if (isLawyerLoading) {
      return (
        <div
          className={
            isAbove750px
              ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
              : 'flex gap-3 overflow-x-auto pb-2 horizontal-scroll'
          }
        >
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className={
                isAbove750px
                  ? ''
                  : `flex-shrink-0 ${isMobile ? 'w-64' : isTablet ? 'w-72' : 'w-80'}`
              }
            >
              <Skelton />
            </div>
          ))}
        </div>
      );
    }

    if (!lawyerData?.data || lawyerData.data.length === 0) {
      return (
        <div className='text-center text-gray-400 text-lg mt-8'>
          No lawyer profiles available right now.
        </div>
      );
    }

    return (
      <div
        className={
          isAbove750px
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mx-2'
            : 'flex gap-3 overflow-x-auto pb-2 mx-2 horizontal-scroll'
        }
      >
        {lawyerData?.data?.map((lawyer, index) => (
          <div
            key={index}
            className={
              isAbove750px ? '' : `flex-shrink-0 ${isMobile ? 'w-64' : isTablet ? 'w-72' : 'w-80'}`
            }
          >
            <LawyerCard
              lawyer={lawyer}
              backendUrl={URL}
              onClick={() => router.navigate({ to: '/app/lawyer-dashboard' })}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderMentors = () => {
    const isAbove750px = windowWidth >= 750;

    // Show only 1 card on screens below 750px
    const displayMentors = mentorsData?.data?.slice(0, isAbove750px ? 2 : 1);

    if (isMentorsLoading) {
      return (
        <div
          className='grid gap-4 mt-5 mx-2'
          style={{
            gridTemplateColumns: isAbove750px ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
          }}
        >
          {[...Array(isAbove750px ? 2 : 1)].map((_, index) => (
            <Skelton key={index} />
          ))}
        </div>
      );
    }

    if (!mentorsData?.data || mentorsData.data.length === 0) {
      return (
        <div className='text-center text-gray-400 text-lg mt-8'>
          No mentor profiles available right now.
        </div>
      );
    }

    return (
      <div
        className='grid gap-4 mt-5 mx-2'
        style={{
          gridTemplateColumns: isAbove750px ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
        }}
      >
        {displayMentors?.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            backendUrl={URL}
            onClick={() => router.navigate({ to: '/app/mentor-profile' })}
          />
        ))}
      </div>
    );
  };

  const renderQuestions = () => {
    if (isQuestionsLoading) {
      return <div>Loading questions...</div>;
    }

    if (isQuestionsError) {
      return (
        <div className='flex items-center justify-center h-40'>
          <NoDataIcon />
        </div>
      );
    }

    // Handle both array and object with data property
    const questions = Array.isArray(questionsData) ? questionsData : questionsData?.data || [];

    return (
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8'>
        {!questions || questions.length === 0 ? (
          <div className='flex items-center justify-center h-40'>
            <NoDataIcon />
          </div>
        ) : (
          questions.slice(0, 3).map((question, index) => (
            <div key={question.id || index} className='bg-cardblack rounded-xl px-4 py-6 mb-4'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-[56px] h-[56px] rounded-full overflow-hidden bg-purple-600 flex items-center justify-center'>
                  <span className='text-white font-semibold'>
                    {question.userCred?.firstName?.[0] || 'U'}
                  </span>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <div className='m-0 p-0'>
                    <h3 className='text-xl m-0 p-0 font-semibold text-white'>{question.title}</h3>
                    <p className='text-sm m-0 p-0 text-gray-400'>{question.questionType}</p>
                  </div>
                  <p className='text-sm text-gray-400'>
                    {new Date(question.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className='text-lg mb-2'>Q . {question.description}</p>
              <div className='flex gap-4 justify-between py-4'>
                <div className='flex gap-4'>
                  <div className='flex items-center gap-1'>
                    <ThumbsUpIcon />
                    <span className='text-xs'>0</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <CommentIcon />
                    <span className='text-xs'>{question.answers?.length || 0}</span>
                  </div>
                </div>
                <div className='flex items-center gap-1 cursor-pointer'>
                  <ForwardShareIcon />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // Circular progress component
  const CircularProgress = ({ value, total, color = '#10B981' }) => {
    const percentage = (value / total) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className='relative w-32 h-32'>
        <svg className='w-32 h-32 transform -rotate-90' viewBox='0 0 100 100'>
          <circle cx='50' cy='50' r='45' stroke='#374151' strokeWidth='8' fill='none' />
          <circle
            cx='50'
            cy='50'
            r='45'
            stroke={color}
            strokeWidth='8'
            fill='none'
            strokeLinecap='round'
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className='transition-all duration-1000 ease-out'
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <div className='text-sm text-gray-400 mb-1'>Total Session</div>
          <div className='text-3xl font-bold text-white'>{total}</div>
        </div>
      </div>
    );
  };

  // Area chart component using SVG
  const AreaChart = () => {
    const data = [
      { day: '1 Jun', value: 20 },
      { day: '2 Jun', value: 30 },
      { day: '3 Jun', value: 18 },
      { day: '4 Jun', value: 50 },
      { day: '5 Jun', value: 25 },
      { day: '6 Jun', value: 35 },
      { day: '7 Jun', value: 45 },
    ];

    const maxValue = Math.max(...data.map((d) => d.value));
    const width = 600;
    const height = 200;
    const padding = 40;

    const getX = (index) => (index * (width - padding * 2)) / (data.length - 1) + padding;
    const getY = (value) => height - padding - (value / maxValue) * (height - padding * 2);

    const pathData = data
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${getX(index)},${getY(point.value)}`)
      .join(' ');

    const areaPath = `${pathData} L ${getX(data.length - 1)},${height - padding} L ${padding},${height - padding} Z`;

    return (
      <div className='w-full'>
        <svg
          width='100%'
          height='200'
          viewBox={`0 0 ${width} ${height}`}
          className='overflow-visible'
        >
          <defs>
            <linearGradient id='areaGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop offset='0%' stopColor='#0891B2' stopOpacity='0.8' />
              <stop offset='100%' stopColor='#0891B2' stopOpacity='0.1' />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[10, 20, 30, 40, 50].map((value) => (
            <g key={value}>
              <line
                x1={padding}
                y1={getY(value)}
                x2={width - padding}
                y2={getY(value)}
                stroke='#374151'
                strokeWidth='1'
                opacity='0.3'
              />
              <text
                x={padding - 10}
                y={getY(value) + 5}
                fill='#9CA3AF'
                fontSize='12'
                textAnchor='end'
              >
                {value}$
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill='url(#areaGradient)' />

          {/* Line */}
          <path
            d={pathData}
            stroke='#0891B2'
            strokeWidth='3'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          {/* Data points */}
          {data.map((point, index) => (
            <g key={index}>
              <circle
                cx={getX(index)}
                cy={getY(point.value)}
                r='4'
                fill='#0891B2'
                stroke='#0F172A'
                strokeWidth='2'
              />
              {index === 3 && (
                <>
                  <circle
                    cx={getX(index)}
                    cy={getY(point.value)}
                    r='6'
                    fill='none'
                    stroke='#0891B2'
                    strokeWidth='2'
                  />
                  <rect
                    x={getX(index) - 20}
                    y={getY(point.value) - 35}
                    width='40'
                    height='20'
                    rx='4'
                    fill='#1F2937'
                    stroke='#374151'
                  />
                  <text
                    x={getX(index)}
                    y={getY(point.value) - 20}
                    fill='white'
                    fontSize='10'
                    textAnchor='middle'
                  >
                    4 Jun
                  </text>
                  <text
                    x={getX(index)}
                    y={getY(point.value) - 10}
                    fill='white'
                    fontSize='10'
                    textAnchor='middle'
                  >
                    30$
                  </text>
                </>
              )}
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((point, index) => (
            <text
              key={index}
              x={getX(index)}
              y={height - 10}
              fill='#9CA3AF'
              fontSize='12'
              textAnchor='middle'
            >
              {point.day}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  const Dropdown = ({ value, onChange, options = ['This month', 'Last month', 'This year'] }) => (
    <Select
      value={value}
      onChange={onChange}
      className='bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-sm'
      style={{ width: 120 }}
      suffixIcon={<DownOutlined className='text-gray-400' />}
    >
      {options.map((option) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );

  const renderUpcomingSessions = () => {
    if (true) {
      return (
        <div className='mb-6'>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold mb-4'>Upcoming Session</h2>
            <div className='flex justify-center items-center h-54'>
              <img
                src={Upcoming}
                alt='No upcoming sessions'
                className='max-w-xs h-60 object-cover'
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className='flex flex-col bg-black text-white'>
      <div className='flex flex-col md:flex-row gap-4'>
        {/* Left side (Banner + Sessions) - 2/3 width on md screens and up */}
        <div className='w-full md:w-4/6 flex flex-col md:mt-4'>
          {/* Banner Section */}

          <div className='flex flex-col bg-black text-white'>
            <div className='flex flex-col md:flex-row gap-4'>
              {/* Left side - 2/3 width on md screens and up */}
              <div className='w-full flex flex-col'></div>
            </div>
          </div>

          {/* {bannerData?.[0] ? (
            <div className="mb-6">
              <div className="bg-[#A82EFF] rounded-2xl flex flex-col md:flex-row justify-between items-center p-6">
                <div className="mb-4 md:mb-0">
                  <h2 className="font-bold text-3xl mb-2">
                    Your smart study Abroad Companion
                  </h2>
                  <p className="text-lg mb-4">
                    Find housing, jobs, mentors & everything you need-all in one
                    place
                  </p>
                  <button className="bg-black text-white px-4 py-2 rounded-full flex items-center">
                    View Details <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
                <div className="md:w-2/5 flex justify-end">
                  <img
                    src={BannerImage}
                    className="max-w-xs h-60 object-contain"
                    alt="Study abroad companion"
                  />
                </div>
              </div>
            </div>
          ) : null} */}

          {/* Session Overview */}
          <div className='px-3 mb-8'>
            <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700'>
              <div className='flex justify-between items-center mb-8'>
                <h2 className='text-xl font-semibold text-white'>Session Overview</h2>
                <Dropdown value={sessionPeriod} onChange={setSessionPeriod} />
              </div>

              <div className='flex items-center gap-12'>
                <CircularProgress value={18} total={25} color='#10B981' />

                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 rounded-full bg-white'></div>
                    <span className='text-gray-300'>Total Session - 25</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 rounded-full bg-green-500'></div>
                    <span className='text-gray-300'>Upcoming Session - 07</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 rounded-full bg-gray-500'></div>
                    <span className='text-gray-300'>Completed Session - 18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings Overview */}
          <div className='px-3 mb-8'>
            <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700'>
              <div className='flex justify-between items-center mb-8'>
                <h2 className='text-xl font-semibold text-white'>Earnings Overview</h2>
                <Dropdown value={earningsPeriod} onChange={setEarningsPeriod} />
              </div>

              <AreaChart />
            </div>
          </div>
        </div>

        {/* Right-aligned Student Toolkit */}
        <div className='w-full md:w-2/6 flex flex-col p-4 bg-secondary rounded-2xl md:items-start md:justify-end self-end'>
          <div className='mb-12'>
            <h2 className='font-bold text-lg mb-3'>Your Student Toolkit</h2>

            {/* First row of tools */}
            <div className='grid grid-cols-4 gap-2 mb-4 '>
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
                { name: 'Visa Help', icon: <VisaHelp className='w-5 h-5' />, to: '/app/lawyer' },
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
                background:
                  'linear-gradient(221.28deg, #2E2E2E 16.16%, #323034 68.65%, #A82EFF 122.09%)',
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

          {/* Post Your Requirement Section */}
          <div className='mb-12'>
            <PostRequirement
              cardSize='compact'
              showTitle={true}
              title='Post Your Requirement'
              openRoommateModal={openRoommateModal}
              onRoommateModalClose={handleRoommateModalClose}
              openRoomModal={openRoomModal}
              onRoomModalClose={handleRoomModalClose}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row bg-black text-white mb-0'>
        {/* Left side content (2/3 width) */}
        <div className='md:w-2/3'>
          {/* Lawyer Section */}
          <div className='px-2 mb-6 bg-dark'>
            <div className='flex justify-between items-center mb-3'>
              <h2 className='font-bold'>Lawyer Supports</h2>
              <Link href='/app/lawyer' className='text-sm text-purple-400'>
                View all
              </Link>
            </div>
            {renderLawyerContent()}
          </div>
        </div>

        {/* Right side content (1/3 width) - Questions & Answers */}
        <div className='md:w-1/3 px-4'>
          <div className='mb-6 bg-dark'>
            <div className='flex flex-col'>
              <div className='flex justify-between items-center'>
                <h2 className=''>Questions & Answer</h2>
                <Link href='/app/answers' className='text-sm text-purple-400'>
                  View all
                </Link>
              </div>
              <p className='mt-4 mb-6 text-sm text-gray-400'>
                Ask your questions to industry experts & grow up your knowledge
              </p>
            </div>
            <QuestionsList
              questions={Array.isArray(questionsData) ? questionsData : questionsData?.data || []}
              loading={isQuestionsLoading}
              error={isQuestionsError}
            />
          </div>
          <button
            onClick={() => setShowAskQuestionModal(true)}
            className='w-full rounded-full py-3 px-4 text-center text-white font-medium'
            style={{
              background:
                'linear-gradient(221.28deg, #2E2E2E 16.16%, #323034 68.65%, #A82EFF 122.09%)',
            }}
          >
            Ask a Free Question
          </button>
        </div>
      </div>

      {/* Ask Question Modal */}
      <AskQuestionModal
        isOpen={showAskQuestionModal}
        onClose={() => setShowAskQuestionModal(false)}
      />
    </div>
  );
}
