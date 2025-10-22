import React from 'react';
import NeonButton from '../Common/Button/NeonButton';
import { TickIcon } from '../Stay/NeedRoomCommon.svg';
import { ThumbsUp, MessageSquare } from 'lucide-react';

const ReviewsSection = ({ ratingData, reviews, setIsReviewModalOpen, setIsReportModalOpen }) => (
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
);

export default ReviewsSection;
