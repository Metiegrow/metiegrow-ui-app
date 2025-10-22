import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, BellIcon, Video } from 'lucide-react';
import { ArrowLeftIcon, BackButtonIcon, BellIcon1, ClockIcon } from '../Common/SVG/svg.function';
import UpcomingBanner from '../../assets/UpcomingBanner.png';
import { fetchMentorRatingsAndReviews } from '../Mentors/mentorsApi';
import NeonButton from '../Common/Button/NeonButton';
import { TickIcon } from '../Stay/NeedRoomCommon.svg';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import ReviewsSection from '../Mentors/ReviewsSection';

export default function WorkshopMeeting() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [remainingTime, setRemainingTime] = useState('02:00:36');
  const [ratingData, setRatingData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchMentorRatingsAndReviews(1).then((data) => {
      setRatingData(data.ratingData);
      setReviews(data.reviews);
    });
  }, []);

  const isMobile = windowWidth < 768;

  if (!ratingData) {
    return <div className='text-white'>Loading...</div>;
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      {isMobile ? (
        <MobileView
          remainingTime={remainingTime}
          ratingData={ratingData}
          reviews={reviews}
          setIsReviewModalOpen={setIsReviewModalOpen}
          setIsReportModalOpen={setIsReportModalOpen}
        />
      ) : (
        <DesktopView
          remainingTime={remainingTime}
          ratingData={ratingData}
          reviews={reviews}
          setIsReviewModalOpen={setIsReviewModalOpen}
          setIsReportModalOpen={setIsReportModalOpen}
        />
      )}
    </div>
  );
}

function DesktopView({
  remainingTime,
  ratingData,
  reviews,
  setIsReviewModalOpen,
  setIsReportModalOpen,
}) {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center p-4'>
        <div className='w-1/2 flex items-center'>
          <a className='text-white flex items-center'>
            <ArrowLeftIcon className='h-6 w-6 mr-2' />
            <span className='text-lg'>Back</span>
          </a>
        </div>
        <div className='w-1/2 pl-6'>
          <div className='text-xl font-medium'>Mentor by</div>
        </div>
      </div>

      <div className='flex flex-1 p-4'>
        <div className='w-1/2'>
          <div className='rounded-2xl overflow-hidden h-full relative'>
            <img
              src={UpcomingBanner}
              alt='AI visualization'
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        <div className='w-1/2 flex flex-col gap-6 pl-6'>
          <div className='flex items-center'>
            <img
              src='https://img.freepik.com/free-photo/confident-businessman_1098-21002.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740'
              alt='David Willaiam'
              className='w-12 h-12 rounded-full object-cover'
            />
            <div className='ml-4'>
              <div className='font-bold text-xl'>David Willaiam</div>
              <div className='text-gray-400 text-sm'>AI & Research Dev AIV Tech</div>
            </div>
          </div>

          <div className='bg-cardblack rounded-3xl p-6 h-full'>
            <div className='flex justify-between items-end mb-2'>
              <div className='bg-bgthinblack text-textorange py-1 px-3 rounded-full inline-block text-sm mb-0'>
                Today
              </div>
              <div className='px-2.5 py-2 bg-[#DCEBFF] rounded-full'>
                <BellIcon1 />
              </div>
            </div>

            <div className='text-found text-[16px] mb-1 mt-4'>Artificial Intelligence</div>
            <h2 className='text-white text-[20px] font-medium mb-4'>
              From Pixels to Predictions: AI in Design & Product
            </h2>

            <div className='flex items-center text-whites mb-4'>
              <div className='w-6 h-6 mr-2 flex-shrink-0'>
                <div className='w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center'>
                  <ClockIcon />
                </div>
              </div>
              <span>4:30PM - 6:00PM IST, 14 Mar 2025</span>
            </div>

            <div className='text-found text-[16px]'>
              <p className='mb-4'>
                Discover how AI is transforming user experience design in this hands-on workshop.
                Learn how to leverage AI-driven insights, automation, and personalization to create
                smarter, more intuitive interfaces that adapt to user needs in real time. Whether
                you're a designer, developer, or product strategist, this workshop will equip you
                with the tools to design experiences that feel almost human. Discover how AI is
                transforming user experience design in this hands-on workshop. Learn how to leverage
                AI-driven insights, automation, and personalization to create smarter, more
                intuitive interfaces that adapt to user needs in real time. Whether you're a
                designer, developer, or product strategist, this workshop will equip you with the
                tools to design experiences that feel almost human.
              </p>
            </div>
          </div>

          <div className='mt-4'>
            <div className='flex items-center justify-between'>
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-medium py-5 rounded-full flex-grow flex items-center justify-center'>
                <span>Join the Meeting</span>
                <Video className='ml-2 h-5 w-2' />
              </button>
              <div className='ml-4 text-right'>
                <div className='text-gray-400'>Remaining Time:</div>
                <div className='text-green-500 font-mono'>{remainingTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewsSection
        ratingData={ratingData}
        reviews={reviews}
        setIsReviewModalOpen={setIsReviewModalOpen}
        setIsReportModalOpen={setIsReportModalOpen}
      />
    </div>
  );
}

function MobileView({
  remainingTime,
  ratingData,
  reviews,
  setIsReviewModalOpen,
  setIsReportModalOpen,
}) {
  return (
    <div className='flex flex-col h-screen mt-16'>
      <div className='p-4'>
        <a className=''>
          <BackButtonIcon className='' />
        </a>
      </div>

      <div className='relative flex-1'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-purple-900/30'></div>
          <img src={UpcomingBanner} alt='AI visualization' className='w-full h-full object-cover' />
        </div>

        <div className='absolute bottom-0 w-full p-4'>
          <div className='bg-gray-800/90 rounded-2xl p-4'>
            <div className='flex justify-between items-center mb-2'>
              <div className='bg-orange-700 text-orange-100 py-1 px-3 rounded-full text-xs'>
                Today
              </div>
              <Bell className='h-5 w-5 text-gray-300' />
            </div>

            <div className='text-gray-400 text-sm'>Artificial Intelligence</div>
            <h2 className='text-xl font-bold mb-2'>
              From Pixels to Predictions: AI in Design & Product...
            </h2>

            <div className='flex items-center text-gray-400 text-sm mb-3'>
              <div className='w-5 h-5 mr-2 flex-shrink-0'>
                <div className='w-5 h-5 rounded-full border border-green-500 flex items-center justify-center'>
                  <span className='text-green-500 text-xs'>⏱</span>
                </div>
              </div>
              <span>4:30PM - 6:00PM IST, 14 Mar 2025</span>
            </div>

            <div className='text-gray-300 text-sm mb-3'>
              <p>
                Discover how AI is transforming user experience design in this hands-on workshop.
                Learn how to leverage AI-driven insights, automation, and personalization to create
                smarter...
              </p>
              <span className='text-purple-400'>more</span>
            </div>

            <div className='flex items-center mt-4'>
              <div className='text-sm'>Mentor by</div>
              <div className='flex items-center ml-4'>
                <img
                  src='/api/placeholder/40/40'
                  alt='David Willaiam'
                  className='w-8 h-8 rounded-full'
                />
                <div className='ml-2'>
                  <div className='font-medium text-sm'>David Willaiam</div>
                  <div className='text-gray-400 text-xs'>AI & Research Dev AIV Tech</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <button className='bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-full flex-grow flex items-center justify-center'>
            <span>Join the Meeting</span>
            <Video className='ml-2 h-5 w-5' />
          </button>
        </div>
        <div className='text-center mt-2'>
          <span className='text-gray-400 text-sm'>Remaining Time: </span>
          <span className='text-green-500 font-mono'>{remainingTime}</span>
        </div>
      </div>

      <ReviewsSection
        ratingData={ratingData}
        reviews={reviews}
        setIsReviewModalOpen={setIsReviewModalOpen}
        setIsReportModalOpen={setIsReportModalOpen}
      />
    </div>
  );
}
