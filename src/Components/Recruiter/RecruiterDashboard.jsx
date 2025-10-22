import React, { useState } from 'react';
import { Button } from 'antd';
import { Link, useRouter } from '@tanstack/react-router';

// import NeonButton from '../Components/Common/Button/NeonButton';
import NeonButton from '../Common/Button/NeonButton';
// import RecentlyPosted from './RecentlyPosted';
// import QuestionAnswer from './QuestionAnswer';
// import AskQuestionButton from './AskQuestionButton';

import QuestionsList from '../Questions/QuestionsList';
// import RecruiterPost from './RecruiterPost';

const Dashboard = () => {
  const [overviewDropdown, setOverviewDropdown] = useState(false);
  const [statsDropdown, setStatsDropdown] = useState(false);

  return (
    <div className='min-h-screen bg-black text-white px-4 py-6 space-y-8 relative'>
      {/* Overview & Stats Section */}
      <div className='flex flex-col md:flex-row md:justify-center md:gap-8 items-center space-y-6 md:space-y-0'>
        {/* Overview Card */}
        <div className='w-[350px] h-[251px] rounded-[24px] bg-[#232323] p-6 flex flex-col justify-between relative'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Overview</h2>
            <div className='relative'>
              <Button
                onClick={() => setOverviewDropdown(!overviewDropdown)}
                className='w-[131px] h-[40px] bg-[#474747] text-sm px-4 py-2 rounded-xl border border-white'
              >
                This Month
              </Button>
              {overviewDropdown && (
                <ul className='absolute mt-2 w-[131px] bg-[#474747] rounded-md text-sm z-10'>
                  <li className='hover:bg-gray-600 px-4 py-2 cursor-pointer'>This Month</li>
                  <li className='hover:bg-gray-600 px-4 py-2 cursor-pointer'>Last Month</li>
                </ul>
              )}
            </div>
          </div>

          <div className='flex justify-center items-center flex-col'>
            <div className='relative w-32 h-32 rounded-full bg-black flex items-center justify-center'>
              {/* Fixed correct green color */}
              <div className='absolute w-full h-full rounded-full border-[8px] border-gray-600 border-b-[#00C566] rotate-[135deg]'></div>
              <span className='text-3xl font-bold z-10'>25</span>
            </div>
            <p className='mt-3 text-sm'>
              <span className='inline-block w-3 h-3 rounded-full bg-gray-400 mr-1'></span>
              Total post
              <span className='inline-block w-3 h-3 rounded-full bg-[#00C566] ml-4 mr-1'></span>
              Active Post
            </p>
          </div>
        </div>

        {/* Stats Card */}
        <div className='w-[350px] h-[251px] rounded-[24px] bg-[#232323] p-6 flex flex-col justify-between relative'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Stats</h2>
            <div className='relative'>
              <Button
                onClick={() => setStatsDropdown(!statsDropdown)}
                className='w-[131px] h-[40px] bg-[#474747] text-sm px-4 py-2 rounded-xl border border-white'
              >
                This Week
              </Button>
              {statsDropdown && (
                <ul className='absolute mt-2 w-[131px] bg-[#474747] rounded-md text-sm z-10'>
                  <li className='hover:bg-gray-600 px-4 py-2 cursor-pointer'>This Week</li>
                  <li className='hover:bg-gray-600 px-4 py-2 cursor-pointer'>Last Week</li>
                </ul>
              )}
            </div>
          </div>

          <div className='mt-4 flex-grow flex items-center justify-center'>
            <div className='w-full h-32 relative bg-gradient-to-b from-[#2a2a2a] to-transparent rounded-md flex items-end justify-center'>
              <div className='absolute -top-4 text-xs bg-black px-2 py-1 rounded-md text-white'>
                4 Jun
                <br />
                300
              </div>
              <svg viewBox='0 0 100 40' className='w-full h-full'>
                {/* Fixed correct curve color */}
                <path d='M0,30 Q20,10 40,20 T100,10' stroke='#14C0FE' strokeWidth='2' fill='none' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Posted Section */}
      <div className='max-w-[350px] mx-auto md:mx-0'>
        {/* <h2 className="text-lg font-semibold mb-2">Recently Posted</h2> */}
        <div className='flex justify-between items-center'>
          <h2 className=''>Recently Posted</h2>
          <Link href='/app/job' className='text-sm text-purple-400'>
            View all
          </Link>
          {/* <RecruiterPost/> */}
        </div>
      </div>

      {/* Question & Answer Section */}
      <div className='max-w-[350px] mx-auto md:mx-0'>
        <div className='flex justify-between items-center'>
          <h2 className=''>Questions & Answer</h2>
          <Link href='/app/answers' className='text-sm text-purple-400'>
            View all
          </Link>
        </div>
        <p className='mt-4 mb-6 text-sm text-gray-400'>
          Ask your questions to industry experts & grow up your knowledge
        </p>
        <QuestionsList />
        <Link href='/app/ask-question'>
          <NeonButton>Button Text</NeonButton>
        </Link>
      </div>

      {/* Ask a Free Question Button */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <AskQuestionButton />
      </div> */}
    </div>
  );
};

export default Dashboard;
