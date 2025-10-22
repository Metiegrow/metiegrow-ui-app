import React from 'react';
import { ChevronDown } from 'lucide-react';

const earningsData = [
  { day: '1 Jun', value: 30 },
  { day: '2 Jun', value: 25 },
  { day: '3 Jun', value: 35 },
  { day: '4 Jun', value: 50 },
  { day: '5 Jun', value: 35 },
  { day: '6 Jun', value: 45 },
  { day: '7 Jun', value: 60 },
];

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
        <circle
          cx='100'
          cy='100'
          r={radius}
          stroke='#374151'
          strokeWidth={strokeWidth}
          fill='none'
        />
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

const DashboardOverview = () => (
  <div className='max-w-4xl mx-auto space-y-6'>
    {/* Session Overview */}
    <div className='bg-gray-800 rounded-2xl p-6'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold text-white'>Session Overview</h2>
      </div>
      <div className='bg-gray-700 rounded-xl p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-medium text-white'>Overview</h3>
          <button className='flex items-center gap-2 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors'>
            This month
            <ChevronDown size={16} />
          </button>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex-shrink-0'>
            <CircularProgress percentage={28} total={25} completed={18} upcoming={7} />
          </div>
          <div className='flex flex-col space-y-4 ml-8'>
            <div className='flex items-center gap-3'>
              <div className='w-3 h-3 bg-white rounded-full'></div>
              <span className='text-gray-300'>Total Session - 25</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-3 h-3 bg-green-400 rounded-full'></div>
              <span className='text-gray-300'>Upcoming Session - 07</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
              <span className='text-gray-300'>Completed Session - 18</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Earnings Overview */}
    <div className='bg-gray-800 rounded-2xl p-6'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold text-white'>Earnings Overview</h2>
      </div>
      <div className='bg-gray-700 rounded-xl p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-medium text-white'>Overview</h3>
          <button className='flex items-center gap-2 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors'>
            This month
            <ChevronDown size={16} />
          </button>
        </div>
        <div className='relative'>
          <div className='h-64 relative overflow-hidden'>
            <svg className='w-full h-full' viewBox='0 0 580 240'>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={i}
                  x1='0'
                  y1={40 + i * 32}
                  x2='580'
                  y2={40 + i * 32}
                  stroke='#374151'
                  strokeWidth='1'
                  opacity='0.3'
                />
              ))}
              <defs>
                <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                  <stop offset='0%' stopColor='#0891B2' stopOpacity='0.8' />
                  <stop offset='100%' stopColor='#0891B2' stopOpacity='0.1' />
                </linearGradient>
              </defs>
              <path d={`${createPath(earningsData)} L 580 200 L 0 200 Z`} fill='url(#gradient)' />
              <path
                d={createPath(earningsData)}
                stroke='#0891B2'
                strokeWidth='3'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              {earningsData.map((point, index) => {
                const x = (index / (earningsData.length - 1)) * 580;
                const y = 200 - (point.value / 60) * 200;
                return (
                  <g key={index}>
                    <circle cx={x} cy={y} r='4' fill='#0891B2' stroke='#1F2937' strokeWidth='2' />
                    {point.day === '4 Jun' && (
                      <>
                        <circle cx={x} cy={y} r='6' fill='none' stroke='#0891B2' strokeWidth='2' />
                        <g>
                          <rect
                            x={x - 20}
                            y={y - 35}
                            width='40'
                            height='25'
                            rx='4'
                            fill='#1F2937'
                            stroke='#374151'
                          />
                          <text x={x} y={y - 25} textAnchor='middle' className='text-xs fill-white'>
                            4 Jun
                          </text>
                          <text
                            x={x}
                            y={y - 15}
                            textAnchor='middle'
                            className='text-xs fill-white font-semibold'
                          >
                            30$
                          </text>
                        </g>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
            <div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 py-2'>
              <span>50$</span>
              <span>40$</span>
              <span>30$</span>
              <span>20$</span>
              <span>10$</span>
              <span>0$</span>
            </div>
          </div>
          <div className='flex justify-between text-xs text-gray-400 mt-2 px-2'>
            {earningsData.map((point) => (
              <span key={point.day}>{point.day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardOverview;
