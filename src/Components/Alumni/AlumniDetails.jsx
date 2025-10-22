import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Calendar as LucideCalendar, ThumbsUp, MessageSquare, ChevronRight } from 'lucide-react';
import { Calendar, Button, Modal, Divider, Input } from 'antd';
import dayjs from 'dayjs';
import {
  ArrowLeftIcon,
  SaveIcon,
  ShareButtonIcon,
  Star2Icon,
  NextButtonPurpleIcon,
  StarIcon,
  Calender2Icon,
} from '../Common/SVG/svg.function';
import BannerImage from '../../assets/Industry2.png';
import { TickIcon } from '../Stay/NeedRoomCommon.svg';
import NeonButton from '../Common/Button/NeonButton';

const AlumniBookingPlatform = () => {
  const navigate = useNavigate();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10 AM');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportComments, setReportComments] = useState('');
  const [rating, setRating] = useState(0);
  const [questionTitle, setQuestionTitle] = useState('');
  const [comments, setComments] = useState('');

  // Sample available booking dates
  const availableDates = [
    '2025-05-03',
    '2025-05-07',
    '2025-05-11',
    '2025-05-14',
    '2025-05-18',
    '2025-05-21',
    '2025-05-25',
    '2025-05-30',
  ];

  const handleCommentsChange = (e) => {
    // Limit to 1000 characters
    if (e.target.value.length <= 1000) {
      setComments(e.target.value);
    }
  };

  const handleQuestionTitleChange = (e) => {
    // Limit to 40 characters
    if (e.target.value.length <= 40) {
      setQuestionTitle(e.target.value);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const handleViewAllSlots = () => setIsAvailabilityModalOpen(true);
  const handleCloseModal = () => setIsAvailabilityModalOpen(false);
  const handleProceedBooking = (date, timeSlot) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
    setIsAvailabilityModalOpen(false);
    navigate({ to: '/app/booking-confirmation' });
  };

  const mentorshipServices = [
    {
      id: 1,
      rating: 4.2,
      title: 'CV Review + Product Management Mock Interview',
      category: 'Career Guidance',
      duration: '1 hrs Meet',
      type: 'Video Meet',
      originalPrice: 25,
      discountedPrice: 20,
    },
    {
      id: 2,
      rating: 4.2,
      title: 'CV Review + Product Management Mock Interview',
      category: 'Career Guidance',
      duration: '1 hrs Meet',
      type: 'Video Meet',
      originalPrice: 25,
      discountedPrice: 20,
    },
    {
      id: 3,
      rating: 4.2,
      title: 'CV Review + Product Management Mock Interview',
      category: 'Career Guidance',
      duration: '1 hrs Meet',
      type: 'Video Meet',
      originalPrice: 25,
      discountedPrice: 20,
    },
  ];

  const ratingData = {
    average: 4.3,
    total: 256,
    reviewCount: 158,
    distribution: [
      { stars: 5, percentage: 20 },
      { stars: 4, percentage: 75 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 0 },
    ],
  };

  const reviews = [
    {
      id: 1,
      name: 'David Willaiam',
      timeAgo: '3d ago',
      institution: 'Student TAC university',
      verified: true,
      content:
        'Loved the structured approach of the webinar! The content was well-paced, covering both AI fundamentals and real-world applications. The Q&A session was especially helpful!',
      likes: 123,
      comments: 20,
    },
    {
      id: 2,
      name: 'David Willaiam',
      timeAgo: '3d ago',
      institution: 'Student TAC university',
      verified: true,
      content:
        'Loved the structured approach of the webinar! The content was well-paced, covering both AI fundamentals and real-world applications. The Q&A session was especially helpful!',
      likes: 123,
      comments: 20,
    },
    {
      id: 3,
      name: 'David Willaiam',
      timeAgo: '3d ago',
      institution: 'Student TAC university',
      verified: true,
      content:
        'Loved the structured approach of the webinar! The content was well-paced, covering both AI fundamentals and real-world applications. The Q&A session was especially helpful!',
      likes: 123,
      comments: 20,
    },
  ];

  const AvailabilityModal = () => {
    const [modalSelectedDate, setModalSelectedDate] = useState(selectedDate);
    const [modalSelectedTimeSlot, setModalSelectedTimeSlot] = useState(selectedTimeSlot);

    const slots = [
      '9.30 -10.30',
      '10.30 -11.30',
      '11.30 -12.30',
      '12.30 - 1.30',
      '2.30 - 3.30',
      '3.30 - 4.30',
      '4.30 - 5.30',
      '4.30 - 5.30',
      '4.30 - 5.30',
    ];

    if (!isAvailabilityModalOpen) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4'>
        <div className='bg-cardblack rounded-2xl w-full max-w-2xl p-6 relative'>
          {/* Header Row: Title left, Close right */}
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-2xl font-bold text-white'>Availability</h2>
            <button onClick={handleCloseModal} className='text-gray-400 hover:text-white text-2xl'>
              &times;
            </button>
          </div>

          {/* Slots Row: Label left, Toggle right */}
          <div className='flex items-center justify-between mb-2'>
            <span className='text-white font-semibold'>Slots</span>
            <div className='flex items-center gap-2 bg-[#222] rounded-full p-1 w-fit'>
              <Button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  dayjs(modalSelectedDate).isSame(dayjs(), 'day')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400'
                }`}
                onClick={() => setModalSelectedDate(dayjs())}
              >
                Today
              </Button>
              <Button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  dayjs(modalSelectedDate).isSame(dayjs().add(1, 'day'), 'day')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400'
                }`}
                onClick={() => setModalSelectedDate(dayjs().add(1, 'day'))}
              >
                Tomorrow
              </Button>
              <Button
                className='p-2 bg-transparent rounded-full text-gray-400'
                onClick={() => {
                  setIsCalendarModalOpen(true);
                  setIsAvailabilityModalOpen(false);
                }}
              >
                <LucideCalendar size={18} />
              </Button>
            </div>
          </div>

          {/* Slot Buttons */}
          <div className='flex flex-wrap gap-3 mb-6'>
            {slots.map((time) => (
              <Button
                key={time}
                onClick={() => setModalSelectedTimeSlot(time)}
                className={`px-6 py-2 rounded-full text-lg font-medium border transition-all ${
                  modalSelectedTimeSlot === time
                    ? 'border-purple-500 text-white'
                    : 'border-gray-400 text-gray-400'
                }`}
                style={{
                  background: modalSelectedTimeSlot === time ? '#1a0029' : 'transparent',
                }}
              >
                {time}
              </Button>
            ))}
          </div>

          {/* Industry Banner */}
          <div className='mb-6'>
            <img
              src={BannerImage}
              alt='Industry Support'
              className='w-full h-full object-cover rounded-xl'
            />
          </div>

          {/* Proceed Button */}
          <div className='flex justify-end'>
            <Button
              onClick={() => handleProceedBooking(modalSelectedDate, modalSelectedTimeSlot)}
              className='bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-full flex items-center text-lg shadow-lg'
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ReviewModal = () => {
    if (!isReviewModalOpen) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4'>
        <div className='bg-black rounded-xl w-full max-w-xl p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-white'>Write a Review</h2>
            <a
              onClick={() => setIsReviewModalOpen(false)}
              className='text-white rounded-full bg-black  hover:text-white p-2'
            >
              <span className='text-2xl'>&times;</span>
            </a>
          </div>

          <div className='mb-6'>
            <div className='flex justify-start mb-4 bg-black'>
              {[1, 2, 3, 4, 5].map((star) => (
                <a
                  key={star}
                  onClick={() => setRating(star)}
                  className='text-3xl mx-1 text-white bg-black border-transperent'
                >
                  {star <= rating ? '★' : '☆'}
                </a>
              ))}
            </div>

            <div className='mb-4'>
              <label className='block text-gray-300 mb-2'>Comments</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder='Typing'
                className='w-full bg-black text-white rounded-lg p-4 min-h-[120px]'
              />
              <div className='text-right text-gray-400 text-sm mt-1'>{reviewText.length}/1000</div>
            </div>
          </div>

          <div className='flex justify-end gap-3'>
            <Button
              onClick={() => setIsReviewModalOpen(false)}
              className='px-6 py-3 rounded-full border border-gray-600 text-black'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle review submission
                setIsReviewModalOpen(false);
              }}
              className='bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full'
              disabled={!rating || reviewText.length === 0}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ReportModal = () => {
    if (!isReportModalOpen) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4'>
        <div className='bg-black rounded-xl w-full max-w-xl p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-white'>Report an issue</h2>
            <a
              onClick={() => setIsReportModalOpen(false)}
              className='text-gray-400 hover:text-white bg-black '
            >
              <span className='text-2xl'>&times;</span>
            </a>
          </div>

          <div className='mb-6'>
            <div className='mb-4'>
              <label className='block mb-2'>Reason</label>
              <div className='relative'>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className='w-full py-3 px-4 bg-transparent border border-gray-600 rounded-full appearance-none text-gray-400'
                >
                  <option value=''>Select Type</option>
                  <option value='technical'>Technical Issue</option>
                  <option value='content'>Inappropriate Content</option>
                  <option value='behavior'>Inappropriate Behavior</option>
                  <option value='other'>Other</option>
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className='block mb-2'>
                Question Title <span className='text-red-500'>*</span>
              </label>
              <Input
                type='text'
                placeholder='Enter Text'
                value={questionTitle}
                onChange={handleQuestionTitleChange}
                className='w-full py-3 px-4 bg-transparent border border-gray-600 rounded-lg text-white'
              />
              <div className='text-right text-xs text-gray-400 mt-1'>
                ({questionTitle.length}/40)
              </div>
            </div>

            <label className='block mb-2'>Comments</label>
            <textarea
              placeholder='Typing...'
              value={comments}
              onChange={handleCommentsChange}
              className='w-full h-32 py-3 px-4 bg-transparent border border-gray-600 rounded-lg text-white resize-none'
            />
            <div className='text-right text-xs text-gray-400 mt-1'>({comments.length}/1000)</div>
          </div>

          <div className='flex justify-end gap-3'>
            <Button
              onClick={() => setIsReportModalOpen(false)}
              className='px-6 py-3 rounded-full bg-gray border border-gray-600 text-black'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle report submission
                setIsReportModalOpen(false);
              }}
              className='bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full'
              disabled={!reportReason || reportComments.length === 0}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const CalendarModal = () => {
    if (!isCalendarModalOpen) return null;

    return (
      <Modal
        title='Select Date'
        open={isCalendarModalOpen}
        onCancel={() => setIsCalendarModalOpen(false)}
        footer={null}
        width={400}
        className='availability-calendar-modal'
      >
        <Calendar
          fullscreen={false}
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setIsCalendarModalOpen(false);
          }}
          disabledDate={(current) => {
            // Only enable dates in availableDates
            return !availableDates.includes(current.format('YYYY-MM-DD'));
          }}
          dateCellRender={(date) => {
            if (availableDates.includes(date.format('YYYY-MM-DD'))) {
              return (
                <div
                  style={{
                    background: '#a259ff',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    margin: '0 auto',
                  }}
                />
              );
            }
            return null;
          }}
        />
      </Modal>
    );
  };

  return (
    <div className='text-white min-h-screen p-4 md:p-6 bg-black'>
      {/* Top Navigation */}
      <div className='flex items-center justify-between mb-6'>
        <a
          onClick={() => navigate({ to: '/app/mentor' })}
          className='flex items-center gap-2 text-gray-400 hover:text-white'
        >
          <ArrowLeftIcon size={20} />
          <span>Back</span>
        </a>
        <div className='flex gap-3'>
          <a className='text-gray-400 hover:text-white'>
            <SaveIcon size={isMobile ? 18 : 20} />
          </a>
          <a className='text-gray-400 hover:text-white'>
            <ShareButtonIcon size={isMobile ? 18 : 20} />
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Profile Card */}
        <div className='bg-cardblack text-white rounded-xl mt-[-4px] p-4'>
          {/* Top section with avatar, name and rating */}
          <div className='flex items-start gap-4'>
            <img
              src='https://img.freepik.com/free-photo/confident-businessman_1098-21002.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740'
              alt='Kevin Berg'
              className='rounded-full mt-4 w-16 h-16 md:w-20 md:h-20 object-cover'
            />
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl md:text-2xl font-semibold'>Kevin Berg</h2>
                <div className='flex items-center bg-amber-400 bg-opacity-20 px-2 py-0.5 rounded-full mb-0'>
                  <Star2Icon size={14} className='text-yellow-400' fill='currentColor' />
                  <span className='text-[#FAFE43] text-sm ml-1'>4.2</span>
                </div>
              </div>
              <p className='text-gray-400 mt-[-8px]'>Product Manager</p>
              <div className='flex items-center gap-2'>
                <span className='text-green-500 text-sm mt-[-8px]'>Crisc Technology Pvd</span>
                <span className='text-gray-400 text-sm '>USA</span>
              </div>
            </div>
          </div>

          {/* Skills section */}
          <div className='mb-6 mt-4'>
            <div className='text-purple-500 text-sm mb-2'>Skills:</div>
            <div className='flex flex-wrap gap-2'>
              {['Product Management', 'Strategist', 'Analyst', 'New Ideas'].map((skill) => (
                <span key={skill} className='bg-black text-white text-xs px-3 py-1 rounded-full'>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className='text-gray-300 text-sm mb-6'>
            AI expert with hands-on experience in machine learning, deep learning, and AI product
            development.
          </p>

          <div className='relative mt-0'>
            <hr className='border-t border-borderfoun mb-4' />

            <div className='flex justify-between items-center pt-6'>
              <div>
                <h3 className='text-lg font-medium'>Discovery Call</h3>
                <p className='text-gray-400 text-sm'>
                  Collaborate with communities such as UXPA, AIGA
                </p>
              </div>

              <div className='text-right'>
                <div className='text-cyan-400 text-2xl font-bold'>
                  $ 25 <span className='text-gray-400 text-sm'>Per hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div className='flex flex-col gap-6'>
          <div className='rounded-xl p-4'>
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
              <h2 className='text-2xl font-bold mb-1 md:mb-0 text-left'>Availability</h2>
              <div className='flex items-center'>
                <div className='flex items-center gap-2 bg-[#222] rounded-full p-1 w-fit'>
                  <Button
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                      dayjs(selectedDate).isSame(dayjs(), 'day')
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400'
                    }`}
                    onClick={() => setSelectedDate(dayjs())}
                  >
                    Today
                  </Button>
                  <Button
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                      dayjs(selectedDate).isSame(dayjs().add(1, 'day'), 'day')
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400'
                    }`}
                    onClick={() => setSelectedDate(dayjs().add(1, 'day'))}
                  >
                    Tomorrow
                  </Button>
                  <Button
                    className='p-2 bg-transparent rounded-full text-gray-400'
                    onClick={() => setIsCalendarModalOpen(true)}
                  >
                    <LucideCalendar size={18} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Remove inline calendar */}

            <div className='flex justify-between items-center mb-4'>
              <p className='italic text-gray-300'>Limited Availability</p>
              <a
                onClick={handleViewAllSlots}
                className='text-purple-500 hover:text-purple-400 text-lg font-semibold'
              >
                View All Slots
              </a>
            </div>

            <div className='flex flex-wrap gap-2'>
              {[
                '9.30 - 10.30',
                '10.30 - 11.30',
                '11.30 - 12.30',
                '12.30 - 1.30',
                '1.30 - 2.30',
                '2.30 - 3.30',
              ].map((time) => (
                <Button
                  key={time}
                  onClick={() => setSelectedTimeSlot(time)}
                  className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${
                    selectedTimeSlot === time
                      ? 'border-purple-500 text-white'
                      : 'border-gray-400 text-gray-400'
                  }`}
                  style={{
                    background: selectedTimeSlot === time ? '#1a0029' : 'transparent',
                  }}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Industry Support Banner */}
          <div className=''>
            <div className='flex'>
              <div className=''>
                <img
                  src={BannerImage}
                  alt='Industry Support'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mentorship Services */}
      <div className='mt-8'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-bold'>Mentorship Focus/Service</h2>
          <a
            onClick={() => navigate({ to: '/app/all-services' })}
            className='text-purple-400 hover:text-purple-300'
          >
            View all
          </a>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {mentorshipServices.map((service) => (
            <div
              key={service.id}
              className='bg-cardblack rounded-2xl p-8 hover:bg-zinc-800 transition-colors'
            >
              {/* Tightly aligned rating badge */}
              <div className='inline-flex items-center bg-[#3c3803] pl-2 pr-2 py-1 rounded-full'>
                <span className='text-yellow-400 text-sm mr-1'>
                  <StarIcon size={16} />
                </span>
                <span className='text-yellow-300 text-sm font-semibold'>5.0</span>
              </div>

              <h3 className='text-lg font-medium mb-0 mt-2'>{service.title}</h3>
              <p className='text-gray-400 text-sm mb-4 mt-1'>{service.category}</p>

              <hr className='border-t border-borderfoun mb-4' />
              <div className='flex items-center justify-between mt-4'>
                <div className='flex items-start'>
                  <div>
                    <p className='font-medium'>
                      <Calender2Icon className='h-5 w-5 text-gray-400 mr-2 mt-16' />1 hrs Meet
                    </p>
                    <p className='text-gray-400 text-sm'>Video Meet</p>
                  </div>
                </div>

                <button className='bg-purple-600 text-white py-2 px-4 rounded-full flex items-center'>
                  <span className='line-through mr-2'>$25</span>
                  <span className='mr-2'>$20</span>
                  <ChevronRight className='h-5 w-5' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings and Reviews */}
      <div className='mt-8 bg-black rounded-xl p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
          <div className='lg:col-span-2'>
            <h2 className='text-2xl font-bold mb-6'>Rating and Reviews</h2>

            <div className='bg-cardblack rounded-xl p-6 mb-6'>
              <div className='flex items-center mb-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className='text-yellow-400 text-2xl mr-1'>
                    {star <= Math.floor(ratingData.average) ? '★' : '☆'}
                  </span>
                ))}
                <span className='text-yellow-400 text-2xl ml-2'>{ratingData.average}/5</span>
              </div>

              <p className='text-gray-300 mb-4'>
                {ratingData.total} Ratings and {ratingData.reviewCount} Reviews
              </p>

              <div className='space-y-2'>
                {ratingData.distribution.map((item) => (
                  <div key={item.stars} className='flex items-center'>
                    <span className='w-16 text-gray-300'>{item.stars} star</span>
                    <div className='flex-1 mx-2 bg-gray-700 h-2 rounded-full overflow-hidden'>
                      <div
                        className='bg-green-400 h-full rounded-full'
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className='w-10 text-right text-gray-300'>{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className='text-2xl font-bold mb-4'>Reviews this Session</h2>
            <p className='text-gray-300 mb-6'>Share your thoughts with other Students</p>
            <div className=''>
              <NeonButton
                onClick={() => setIsReviewModalOpen(true)}
                className=''
                text='Write a Review'
              />
            </div>

            <div className='flex justify-center mt-8'>
              <a onClick={() => setIsReportModalOpen(true)} type='default' className='text-red-500'>
                Report an Issue
              </a>
            </div>
          </div>

          <div className='lg:col-span-3 space-y-0'>
            {reviews.map((review) => (
              <div key={review.id} className='border-b border-gray-800 pb-6'>
                <div className='flex justify-between items-start mb-2'>
                  <div className='flex items-center'>
                    <div className='w-12 h-12 rounded-full bg-gray-700 overflow-hidden mr-3'>
                      <img
                        src={`https://i.pravatar.cc/150?img=${review.id}`}
                        alt={review.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div>
                      <div className='flex items-center'>
                        <h3 className='font-semibold text-lg mb-0'>{review.name}</h3>
                        {review.verified && (
                          <span className='relative -bottom-[8px]'>
                            <TickIcon />
                          </span>
                        )}
                      </div>
                      <p className='text-gray-400 text-sm mt-0'>{review.institution}</p>
                    </div>
                  </div>
                  <span className='text-gray-400 text-sm'>{review.timeAgo}</span>
                </div>

                <p className='text-gray-300 mb-3 line-clamp-3'>"{review.content}"</p>

                <div className='flex items-center space-x-4'>
                  <a className='flex items-center text-gray-400 hover:text-white'>
                    <ThumbsUp size={18} className='mr-2' />
                    <span>{review.likes}</span>
                  </a>
                  <a className='flex items-center text-gray-400 hover:text-white'>
                    <MessageSquare size={18} className='mr-2' />
                    <span>{review.comments}</span>
                  </a>
                </div>
              </div>
            ))}

            <div className='text-center pt-4'>
              <a className='text-purple-500 hover:text-purple-400'>View all Reviews</a>
            </div>
          </div>
        </div>
      </div>

      <AvailabilityModal />
      <ReviewModal />
      <ReportModal />
      <CalendarModal />
    </div>
  );
};

export default AlumniBookingPlatform;
