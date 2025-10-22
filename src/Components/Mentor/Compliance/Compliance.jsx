import { Link } from '@tanstack/react-router';
import React, { useState } from 'react';

const complianceList = [
  {
    id: 457889,
    title: 'From Pixels to Predictions: AI in Design & Product...',
    description:
      'AI expert with hands-on experience in machine learning, deep learning, and AI product development.',
    status: 'Completed',
  },
  {
    id: 457890,
    title: 'From Pixels to Predictions: AI in Design & Product...',
    description:
      'AI expert with hands-on experience in machine learning, deep learning, and AI product development.',
    status: 'Pending',
  },
];

const Compliance = () => {
  const [search, setSearch] = useState('');

  const filteredList = complianceList.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const hasPending = complianceList.some((item) => item.status === 'Pending');
  const pendingItem = complianceList.find((item) => item.status === 'Pending');

  return (
    <div className='bg-[#181818] min-h-screen text-white p-4'>
      {hasPending && (
        <div className='flex items-center bg-[#A05C43] text-white rounded-2xl px-6 py-3 mb-4'>
          <span className='mr-2 text-xl'>⚠️</span>
          <span>Your response was still pending on #{pendingItem.id}</span>
        </div>
      )}
      <div className='flex items-center mb-4'>
        <button className='bg-transparent border-none text-white text-2xl mr-2 cursor-pointer focus:outline-none'>
          <span>&larr;</span>
        </button>
        <h2 className='text-xl font-semibold m-0'>Compliance</h2>
      </div>
      <input
        type='text'
        placeholder='Search..'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full px-4 py-3 rounded-2xl border-none mb-4 bg-[#232323] text-white placeholder-gray-400 focus:outline-none'
      />
      {filteredList.map((item, idx) => (
        <Link to={`/compliance/${item.id}`} key={item.id}>
          <div className='bg-[#232323] rounded-2xl p-4 mb-4 shadow flex flex-col cursor-pointer hover:bg-[#282828] transition'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-gray-400 text-sm font-mono'>#{item.id}</span>
              <span
                className={
                  item.status === 'Completed'
                    ? 'text-[#00C896] text-sm font-semibold'
                    : 'text-[#FFD600] text-sm font-semibold'
                }
              >
                {item.status}
              </span>
            </div>
            <div className='font-bold text-lg mb-2 leading-tight'>{item.title}</div>
            <div className='text-gray-300 text-sm'>{item.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Compliance;
