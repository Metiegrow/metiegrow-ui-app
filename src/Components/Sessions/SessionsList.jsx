import { useState } from 'react';
import { Bell, Search, Filter, ArrowUpRight, Clock } from 'lucide-react';
import { NextButtonPurpleIcon } from '../Common/SVG/svg.function';

export default function SessionUI() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const sessions = [
    {
      id: 1,
      title: 'From Pixels to Predictions: AI in Design & Product...',
      time: '4:30PM - 6:00PM IST, 14 Mar 2025',
      instructor: 'Rajesh Kumar',
      department: 'Computer Science',
      status: 'Alumni',
      type: 'Artificial Intelligence',
      coming: 'Coming soon',
      timeRemaining: '02:00:36',
    },
    {
      id: 2,
      title: 'From Pixels to Predictions: AI in Design & Product...',
      time: '4:30PM - 6:00PM IST, 14 Mar 2025',
      instructor: 'Rajesh Kumar',
      department: 'Computer Science',
      status: 'Alumni',
      type: 'Artificial Intelligence',
      coming: 'Coming soon',
      timeRemaining: '02:00:36',
    },
    {
      id: 3,
      title: 'From Pixels to Predictions: AI in Design & Product...',
      time: '4:30PM - 6:00PM IST, 14 Mar 2025',
      instructor: 'Rajesh Kumar',
      department: 'Computer Science',
      status: 'Alumni',
      type: 'Artificial Intelligence',
      coming: 'Coming soon',
      timeRemaining: '02:00:36',
    },
  ];

  return (
    <div className='bg-black min-h-screen text-white p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold'>My Session</h1>
          <div className='flex gap-4 items-center'>
            <div className='relative'>
              <div className='bg-zinc-800 rounded-full flex items-center pl-10 pr-4 py-2 w-64'>
                <Search className='absolute left-3 top-2.5 text-gray-400 w-5 h-5' />
                <input
                  type='text'
                  placeholder='Search..'
                  className='bg-transparent border-none outline-none text-white w-full'
                />
              </div>
            </div>
            <button className='bg-zinc-800 p-2 rounded-full'>
              <Filter className='w-5 h-5 text-white' />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className='bg-zinc-900 rounded-full inline-flex p-1.5 mb-6'>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'upcoming' ? 'bg-purple-600 text-white' : 'text-gray-300'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Session
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'past' ? 'bg-purple-600 text-white' : 'text-gray-300'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past Session
          </button>
        </div>

        {/* Session Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {sessions.map((session) => (
            <div key={session.id} className='bg-cardblack rounded-[24px] p-5'>
              {/* Card Header */}
              <div className='flex justify-between items-center mb-0'>
                <div className='flex items-center'>
                  <span className='text-gray-300'>{session.type}</span>
                  <span className='ml-2 text-emerald-400 text-sm'>{session.coming}</span>
                </div>
                <Bell className='w-5 h-5 text-white' />
              </div>

              {/* Card Title */}
              <h2 className='text-xl font-bold mb-0'>{session.title}</h2>

              {/* Time Section */}
              <div className='flex items-center justify-between mb-0 mt-0'>
                <div className='flex items-center'>
                  <div className='w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center mr-3'>
                    <Clock className='text-emerald-400 h-4 w-4' />
                  </div>
                  <span className='text-gray-300 text-sm'>{session.time}</span>
                </div>

                <div className='text-right'>
                  <p className='text-xs text-gray-400'>Start in</p>
                  <p className='text-emerald-400 font-mono'>{session.timeRemaining}</p>
                </div>
              </div>

              {/* Instructor Section */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='w-10 h-10 rounded-full overflow-hidden mr-3'>
                    <img
                      src='https://img.freepik.com/free-photo/confident-businessman_1098-21002.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740'
                      alt={session.instructor}
                    />
                  </div>
                  <div>
                    <p className='font-medium'>{session.instructor}</p>
                    <p className='text-sm text-gray-400'>{session.department}</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <span className='bg-purple-900 text-purple-200 text-xs px-4 py-1 rounded-full mr-3'>
                    {session.status}
                  </span>
                  <a className=''>
                    <NextButtonPurpleIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
