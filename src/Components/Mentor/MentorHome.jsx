import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SessionOverview from '../Dashboard/SessionOverview';
import EarningsOverview from '../Dashboard/EarningsOverview';
import PostRequirement from '../Common/PostRequirement';
import QuestionsList from '../Questions/QuestionsList';
import MentorCard from '../Mentors/MentorCard';
import {
  BatchMate,
  HouseHunt,
  SOP,
  VisaHelp,
  Resume,
  InterviewPreparation,
  UniversityAdmissionGuidance,
} from '../Dashboard/Dashboard.svg';
import { getAuthHeaders } from '../Auth/Auth.Function';

const Dashboard = () => {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL}/api/v1/mentor/cards?page=0&size=2`, {
          headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch mentors');
        const data = await response.json();
        setMentors(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [URL]);

  // Mock data for the earnings chart
  const earningsData = [
    { day: '1 Jun', value: 30 },
    { day: '2 Jun', value: 25 },
    { day: '3 Jun', value: 35 },
    { day: '4 Jun', value: 50 },
    { day: '5 Jun', value: 35 },
    { day: '6 Jun', value: 45 },
    { day: '7 Jun', value: 60 },
  ];

  const questionsData = [
    {
      name: 'Rajesh Kumar',
      role: 'Computer Science',
      daysAgo: 2,
      question: 'What are the key ethical concerns surrounding AI development and deployment?',
      likes: 123,
      comments: 20,
      imageUrl: '',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Computer Science',
      daysAgo: 2,
      question: 'What are the key ethical concerns surrounding AI development and deployment?',
      likes: 123,
      comments: 20,
      imageUrl: '',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Computer Science',
      daysAgo: 2,
      question: 'What are the key ethical concerns surrounding AI development and deployment?',
      likes: 123,
      comments: 20,
      imageUrl: '',
    },
  ];

  // Create SVG path for the earnings curve
  const createPath = (data) => {
    const width = 580;
    const height = 200;
    const maxValue = Math.max(...data.map((d) => d.value));
    let path = '';
    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (point.value / maxValue) * height;
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prevX = ((index - 1) / (data.length - 1)) * width;
        const prevY = height - (data[index - 1].value / maxValue) * height;
        const cpX = (prevX + x) / 2;
        path += ` Q ${cpX} ${prevY} ${x} ${y}`;
      }
    });
    return path;
  };

  const CircularProgress = ({ percentage, total, completed, upcoming }) => {
    const radius = 85;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className='relative'>
        <svg className='w-48 h-48 transform -rotate-90' viewBox='0 0 200 200'>
          {/* Background circle */}
          <circle
            cx='100'
            cy='100'
            r={radius}
            stroke='#374151'
            strokeWidth={strokeWidth}
            fill='none'
          />
          {/* Progress circle */}
          <circle
            cx='100'
            cy='100'
            r={radius}
            stroke='#10B981'
            strokeWidth={strokeWidth}
            fill='none'
            strokeLinecap='round'
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className='transition-all duration-300 ease-in-out'
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <div className='text-sm text-gray-400 mb-1'>Total Session</div>
          <div className='text-4xl font-bold text-white'>{total}</div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col bg-black text-white min-h-screen p-6'>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Left column */}
        <div className='w-full md:w-2/3 flex flex-col gap-6'>
          <SessionOverview total={25} completed={18} upcoming={7} />
          <EarningsOverview earningsData={earningsData} />
          {/* Upcoming Session */}
          <div className='bg-[#18181B] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-4'>Upcoming Session</h2>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='bg-[#FFF500] rounded-2xl p-4 flex-1'>
                <div className='text-xs font-bold text-black mb-2'>Today</div>
                <div className='text-black font-semibold mb-1'>Artificial Intelligence</div>
                <div className='text-black text-sm mb-2'>
                  From Pixels to Predictions: AI in Design & Product.
                </div>
                <div className='text-black text-xs mb-2'>4.30PM - 6.00PM IST, 13 March 2025</div>
                <button className='bg-black text-white px-4 py-2 rounded-full flex items-center mt-2'>
                  Join the Meeting
                </button>
              </div>
              <div className='bg-[#00FFE0] rounded-2xl p-4 flex-1'>
                <div className='text-xs font-bold text-black mb-2'>Tomorrow</div>
                <div className='text-black font-semibold mb-1'>Artificial Intelligence</div>
                <div className='text-black text-sm mb-2'>
                  Designing Human-Centered AI: Balancing Automation & User...
                </div>
                <div className='text-black text-xs mb-2'>4.30PM - 6.00PM IST, 14 March 2025</div>
                <button className='bg-black text-white px-4 py-2 rounded-full flex items-center mt-2'>
                  Join the Meeting
                </button>
              </div>
            </div>
          </div>
          {/* Recommended Mentors */}
          <div className='bg-[#18181B] rounded-2xl p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Recommended Mentors</h2>
              <a href='#' className='text-sm text-purple-400'>
                View all
              </a>
            </div>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {[1, 2].map((_, idx) => (
                  <div key={idx} className='bg-cardblack rounded-[24px] p-4 h-40 animate-pulse' />
                ))}
              </div>
            ) : error ? (
              <div className='text-red-500 text-center py-8'>{error}</div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {mentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} backendUrl={URL} onClick={() => {}} />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Right column */}
        <div className='w-full md:w-1/3 flex flex-col gap-6'>
          {/* Student Toolkit */}
          <div className='bg-[#18181B] rounded-2xl p-6'>
            <h2 className='text-lg font-semibold mb-4'>Your Student Toolkit</h2>
            <div className='grid grid-cols-4 gap-2 mb-4'>
              <div className='flex flex-col items-center'>
                <div className='bg-[#1E1E1E] rounded-full p-3 mb-1'>
                  <BatchMate />
                </div>
                <span className='text-xs text-center'>Know your batch mate</span>
              </div>
              <div className='flex flex-col items-center'>
                <div className='bg-[#1E1E1E] rounded-full p-3 mb-1'>
                  <HouseHunt />
                </div>
                <span className='text-xs text-center'>House Hunt</span>
              </div>
              <div className='flex flex-col items-center'>
                <div className='bg-[#1E1E1E] rounded-full p-3 mb-1'>
                  <SOP />
                </div>
                <span className='text-xs text-center'>SOP/LOR Writing</span>
              </div>
              <div className='flex flex-col items-center'>
                <div className='bg-[#1E1E1E] rounded-full p-3 mb-1'>
                  <VisaHelp />
                </div>
                <span className='text-xs text-center'>Visa Help</span>
              </div>
            </div>
            <div
              className='grid grid-cols-3 gap-2 p-3 rounded-[24px]'
              style={{
                background:
                  'linear-gradient(221.28deg, #2E2E2E 16.16%, #323034 68.65%, #A82EFF 122.09%)',
              }}
            >
              <div className='flex flex-col items-center'>
                <div className='bg-[#1E1E1E] rounded-full p-3 mb-1'>
                  <Resume />
                </div>
                <span className='text-xs text-center'>Resume/CV Writing</span>
              </div>
              <div className='flex flex-col items-center'>
                <div className='bg-[#1E1E1E] rounded-full p-3 mb-1'>
                  <InterviewPreparation />
                </div>
                <span className='text-xs text-center'>Interview Preparation</span>
              </div>
              <div className='flex flex-col items-center'>
                <div className='bg-[#1E1E1E] rounded-full p-3 mb-1'>
                  <UniversityAdmissionGuidance />
                </div>
                <span className='text-xs text-center'>University Admission Guidance</span>
              </div>
            </div>
          </div>
          {/* Post Your Requirement */}
          <div className='bg-[#18181B] rounded-2xl p-6'>
            <PostRequirement cardSize='compact' showTitle={true} title='Post Your Requirement' />
          </div>
          {/* Questions & Answer */}
          <div className='bg-[#18181B] rounded-2xl p-6'>
            <div className='flex justify-between items-center mb-2'>
              <h2 className='text-lg font-semibold'>Questions & Answer</h2>
              <a href='#' className='text-sm text-purple-400'>
                View all
              </a>
            </div>
            <p className='text-sm text-gray-400 mb-4'>
              Ask your questions to industry experts & grow up your knowledge
            </p>
            <QuestionsList questions={questionsData} loading={false} error={false} />
            <button className='w-full mt-4 bg-[#18181B] border border-[#A82EFF] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#A82EFF] hover:text-black transition'>
              Ask a Free Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
