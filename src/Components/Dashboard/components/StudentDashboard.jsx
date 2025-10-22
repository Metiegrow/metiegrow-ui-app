import { Link, useRouter } from '@tanstack/react-router';
import { Button, Image, Skeleton, Modal, Upload, message, Divider } from 'antd';
import PostCard from '../../Questions/PostCard';
import TypeQuestionsReplyDrawer from '../../Questions/TypeQuestionsReplyDrawer';
// QuestionDetailModal removed per request
import AskQuestionModal from '../../Questions/AskQuestionModal';
import { useState, useEffect } from 'react';

import BannerImage2 from '../../../assets/BannerImage2.png';
import Industry2 from '../../../assets/Industry2.png';
import Upcoming from '../../../assets/Upcoming.png';

import { NoDataIcon } from '../../Common/SVG/svg.function';

import NeonButton from '../../Common/Button/NeonButton';

import PostRequirement from '../../Common/PostRequirement';
import Skelton from '../../Common/Skelton';
import AlumniCard from '../../Alumni/AlumniCard';
import MentorCard from '../../Mentors/MentorCard';
import LawyerCard from '../../Lawyer/LawyerCard';
import BannerCarouselDots from '../Common/BannerCarouselDots';
import StudentToolkit from '../Common/StudentToolKit';
import SessionCard from '../Common/SessionCard';
import {
  useQuestions,
  useQuestionActions,
  useMentorCards,
  useAlumniCards,
  useLawyerCards,
  useUpcomingSessions,
  usePostRequirementModals,
} from '../../../hooks';

export default function Dashboard() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  // Reply drawer state
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isAskQuestionModalOpen, setIsAskQuestionModalOpen] = useState(false);

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

  // Use custom hooks for all dashboard data
  const {
    data: mentorsData,
    isLoading: isMentorsLoading,
    isError: _isMentorsError,
    error: _mentorsError,
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
    data: sessionsData,
    isLoading: isSessionsLoading,
    isError: isSessionsError,
    error: sessionsError,
  } = useUpcomingSessions();

  const {
    data: questionsData,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
    error: _questionsError,
  } = useQuestions({ size: 3 });

  // Question actions (like/dislike)
  const { handleQuestionLike } = useQuestionActions();

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

  const handleQuestionCommentClick = (questionId) => {
    setSelectedQuestionId(questionId);
    setIsReplyOpen(true);
  };

  const handleReplyClose = () => {
    setIsReplyOpen(false);
    setSelectedQuestionId(null);
  };

  const handleAskQuestionModalOpen = () => {
    setIsAskQuestionModalOpen(true);
  };

  const handleAskQuestionModalClose = () => {
    setIsAskQuestionModalOpen(false);
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
              ? 'grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2'
              : 'flex overflow-x-auto gap-3 pb-2 horizontal-scroll'
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
        <div className='mt-8 text-lg text-center text-gray-400'>
          No alumni profiles available right now.
        </div>
      );
    }

    return (
      <div
        className={
          isAbove750px
            ? 'grid grid-cols-1 gap-3 mx-2 md:grid-cols-2 lg:grid-cols-2'
            : 'flex overflow-x-auto gap-3 pb-2 mx-2 horizontal-scroll'
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
              ? 'grid grid-cols-1 gap-4 md:grid-cols-2'
              : 'flex overflow-x-auto gap-3 pb-2 horizontal-scroll'
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
        <div className='mt-8 text-lg text-center text-gray-400'>
          No lawyer profiles available right now.
        </div>
      );
    }

    return (
      <div
        className={
          isAbove750px
            ? 'grid grid-cols-1 gap-3 mx-2 md:grid-cols-2 lg:grid-cols-2'
            : 'flex overflow-x-auto gap-3 pb-2 mx-2 horizontal-scroll'
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
          className='grid gap-4 mx-2 mt-5'
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
        <div className='mt-8 text-lg text-center text-gray-400'>
          No mentor profiles available right now.
        </div>
      );
    }

    return (
      <div
        className='grid gap-4 mx-2 mt-5'
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
      return (
        <div className='space-y-4'>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className='bg-cardblack rounded-[24px] p-4'>
              <div className='animate-pulse'>
                <div className='flex items-center mb-3'>
                  <div className='mr-3 w-10 h-10 bg-gray-700 rounded-full'></div>
                  <div className='flex-1'>
                    <div className='mb-2 w-24 h-4 bg-gray-700 rounded'></div>
                    <div className='w-16 h-3 bg-gray-700 rounded'></div>
                  </div>
                  <div className='w-16 h-3 bg-gray-700 rounded'></div>
                </div>
                <div className='mb-2 w-full h-4 bg-gray-700 rounded'></div>
                <div className='mb-4 w-3/4 h-4 bg-gray-700 rounded'></div>
                <div className='flex justify-between items-center'>
                  <div className='flex space-x-4'>
                    <div className='w-8 h-4 bg-gray-700 rounded'></div>
                    <div className='w-8 h-4 bg-gray-700 rounded'></div>
                  </div>
                  <div className='w-4 h-4 bg-gray-700 rounded'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (isQuestionsError) {
      return (
        <div className='flex justify-center items-center h-40'>
          <div className='text-center'>
            <NoDataIcon />
            <p className='mt-2 text-gray-400'>Error loading questions</p>
          </div>
        </div>
      );
    }

    return (
      <div className='space-y-4'>
        {!questionsData?.data || questionsData.data.length === 0 ? (
          <div className='flex justify-center items-center h-40'>
            <div className='text-center'>
              <NoDataIcon />
              <p className='mt-2 text-gray-400'>No questions available</p>
            </div>
          </div>
        ) : (
          questionsData.data
            .slice(0, 3)
            .map((question, index) => (
              <PostCard
                key={question.id || index}
                name={question.user?.name}
                field={question.questionType}
                timeAgo={new Date(question.createdAt).toLocaleDateString()}
                question={question.description}
                likes={question.likeCount ?? 0}
                answers={question.answerCount ?? 0}
                isLiked={question?.isLiked}
                onCommentClick={() => handleQuestionCommentClick(question.id)}
                onLikeClick={() => handleQuestionLike(question.id, question?.isLiked)}
              />
            ))
        )}
      </div>
    );
  };

  const sessions = [
    {
      id: 1,
      dateLabel: 'Today',
      category: 'Artificial Intelligence',
      title: 'From Pixels to Predictions: AI in Design & Product.',
      time: '4.30PM - 6.00PM IST, 13 March 2025',
      bgColor: 'bg-yellow-300',
    },
    {
      id: 2,
      dateLabel: 'Tomorrow',
      category: 'Artificial Intelligence',
      title: 'Designing Human-Centered AI: Balancing Automation & User..',
      time: '4.30PM - 6.00PM IST, 14 March 2025',
      bgColor: 'bg-green-300',
    },
  ];

  const renderUpcomingSessions = () => {
    return (
      <div className='mb-6'>
        <div className='flex flex-col'>
          <h2 className='mb-4 text-2xl font-bold'>Upcoming Session</h2>
          <div className='grid grid-cols-1 gap-4 w-full sm:grid-cols-2'>
            {sessions ? (
              sessions.map((s) => <SessionCard key={s.id} {...s} />)
            ) : (
              <img
                src={Upcoming}
                alt='No upcoming sessions'
                className='object-cover max-w-xs h-60'
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const slidesData = [
    {
      title: 'Your smart study Abroad Companion',
      description: 'Find housing, jobs, mentors & everything you need—all in one place',
      buttonText: 'View Details',
      buttonLink: '/details',
      image: 'https://placehold.co/202x229',
    },
    {
      title: 'New Opportunities Await',
      description: 'Explore scholarships, internships & community support',
      buttonText: 'Learn More',
      buttonLink: '/opportunities',
      image: 'https://placehold.co/202x229',
    },
    // Add more slides dynamically
  ];

  const [slideBanner, setSlideBanner] = useState([]);

  // Use custom hook to manage PostRequirement modals
  const { openRoommateModal, openRoomModal, handleRoommateModalClose, handleRoomModalClose } =
    usePostRequirementModals();

  useEffect(() => {
    const loadSlides = async () => {
      // Example: you could fetch from API
      // const response = await fetch('/api/banners');
      // const data = await response.json();

      setSlideBanner(slidesData); // set your local data
    };

    loadSlides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col text-white bg-black custom-scrollbar'>
      <div className='flex flex-col gap-4 md:flex-row'>
        {/* Left side (Banner) - Fixed height container */}
        <div className='w-full md:w-4/6'>
          <div className='h-64 md:h-80'>
            {/* Fixed height */}
            {slideBanner.length > 0 && <BannerCarouselDots slides={slideBanner} />}
          </div>
          {/* Upcoming Sessions */}
          <div className='px-3'>{renderUpcomingSessions()}</div>
        </div>

        {/* Right-aligned Student Toolkit */}
        <div className='flex flex-col self-end p-4 w-full rounded-2xl md:w-2/6 bg-secondary md:items-start md:justify-end'>
          <StudentToolkit />

          {/* Post Your Requirement Section */}
          <div className='mb-12 w-full'>
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

      <div className='flex flex-col mb-40 text-white bg-black md:mb-0 md:flex-row'>
        {/* Left side content (2/3 width) */}
        <div className='md:w-2/3'>
          {/* Mentors Section */}
          <div>
            <div className='flex justify-between items-center mx-4'>
              <h2 className='font-bold'>Recommended Mentors</h2>
              <Link href='/app/mentor' className='text-sm text-purple-primary'>
                View all
              </Link>
            </div>
            {renderMentors()}
          </div>

          <div className='px-4 mt-8 mb-6'>
            <div className='rounded-2xl'>
              {/* Only the image - centered and responsive */}
              <img
                src={Industry2}
                className='object-cover w-full h-auto rounded-2xl'
                alt='Industry Support'
              />
            </div>
          </div>
          {/* 
          <div className="px-4 mt-8 mb-6">
            <div className="bg-[#A82EFF] rounded-2xl flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 text-center text-white md:w-3/5 md:text-left md:mb-0">
                <h2 className="mb-2 text-3xl font-bold">
                  Get Industry Support From Expertise
                </h2>
                <p className="text-lg">
                  Collaborate with communities such as UXPA, AIGA
                </p>
              </div>
              <div className="flex justify-center md:w-2/5 md:justify-end">
                {/* Static image reference */}
          {/* <img
                  src={Industry}
                  className="object-contain h-60"
                  alt="Industry experts collaboration"
                />
              </div>
            </div>
          </div>  */}

          {/* Alumni Section */}
          <div className='px-2 mb-6 bg-dark'>
            <div className='flex justify-between items-center mb-3'>
              <h2 className='font-bold'>Alumni Supports</h2>
              <Link href='/app/alumni' className='text-sm text-purple-400'>
                View all
              </Link>
            </div>
            {renderAlumniContent()}
          </div>

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
        <div className='px-4 md:w-1/3'>
          <div className='mb-6 bg-dark'>
            <div className='flex flex-col'>
              <div className='flex justify-between items-center'>
                <h2 className=''>Questions & Answer</h2>
                <Link href='/app/questions-list' className='text-sm text-purple-400'>
                  View all
                </Link>
              </div>
              <p className='mt-4 mb-6 text-sm text-gray-400'>
                Ask your questions to industry experts & grow up your knowledge
              </p>
            </div>
            {renderQuestions()}
          </div>
          <div onClick={handleAskQuestionModalOpen}>
            <NeonButton>Ask Question</NeonButton>
          </div>
        </div>
      </div>

      {/* Right-side Reply Drawer */}
      <TypeQuestionsReplyDrawer
        isOpen={isReplyOpen}
        onClose={handleReplyClose}
        questionId={selectedQuestionId}
      />

      {/* Ask Question Modal */}
      <AskQuestionModal isOpen={isAskQuestionModalOpen} onClose={handleAskQuestionModalClose} />
    </div>
  );
}
