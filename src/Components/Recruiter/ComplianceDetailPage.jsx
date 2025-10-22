import React from 'react';
import { Button } from 'antd';
import { BackButtonIcon } from '../Common/SVG/svg.function';

const ComplianceDetailsPage = ({ onBack }) => {
  // useEffect(() => {
  //   const fetchCompliance = async () => {
  //     try {
  //       const response = await fetch('http://localhost:9001/compliance'); // Change to actual backend URL
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch compliance detail data");
  //       }
  //       const data = await response.json();
  //       setCards(data);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Unable to load compliance data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCompliance();
  // }, []);

  return (
    <div className='bg-black min-h-screen text-white flex flex-col items-center'>
      <div className='w-full max-w-[350px] px-4 pt-6 pb-[80px] flex flex-col space-y-4'>
        {/* Header */}
        <div className='flex items-center gap-2'>
          <Button onClick={onBack} type='text' className='!bg-transparent !border-none p-0 m-0'>
            <BackButtonIcon className='w-6 h-6 text-white' />
          </Button>
          <h2 className='text-lg font-semibold'>Compliance details</h2>
        </div>

        {/* Card */}
        <div className='w-full bg-[#232323] rounded-[24px] p-4'>
          <div className='text-sm text-gray-400 flex justify-between'>
            <span>#457889</span>
            <span className='text-yellow-400 font-medium'>Pending</span>
          </div>
          <div className='mt-1'>
            <div className='text-lg font-semibold'>Product Designer</div>
            <div className='text-sm text-gray-300'>MC info Tech PVT Ltd</div>
            <p className='text-xs text-gray-300 mt-1 leading-snug'>
              AI expert with hands-on experience in machine learning, deep learning, and AI product
              development.
            </p>
          </div>
        </div>

        {/* Reason and Title */}
        <div className='w-full text-left space-y-1 text-sm'>
          <p>
            <span className='text-gray-400'>Reason:</span> Others
          </p>
          <p>
            <span className='text-gray-400'>Title:</span> Irrelevant Topic
          </p>
          <p className='text-gray-400'>Raised by</p>
          <div className='flex items-center space-x-2 mt-1'>
            {/* <img
              src="https://via.placeholder.com/32"
              alt="user"
              className="w-8 h-8 rounded-full"
            /> */}
            <span>User</span>
          </div>
        </div>

        {/* Complaint Box */}
        <div className='w-full bg-[#232323] rounded-[24px] p-4'>
          <div className='text-xs text-gray-400 text-right'>12 Jun 2025, 4:00PM</div>
          <p className='text-sm text-white mt-2 leading-snug'>
            AI expert with hands-on experience in machine learning, deep learning, and AI product
            development.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Chat Input */}
      <div className='absolute bottom-0 left-0 w-full bg-[#232323] h-[100px] px-4 flex items-center justify-between rounded-t-2xl'>
        <input
          type='text'
          placeholder='Type Something....'
          className='bg-[#1a1a1a] w-[75%] h-[56px] rounded-full px-4 text-white placeholder:text-gray-400 outline-none text-sm'
        />
        <Button type='text' className='bg-transparent text-white pl-0'>
          <svg
            width='56'
            height='57'
            viewBox='0 0 56 57'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              width='56'
              height='56'
              rx='28'
              transform='matrix(1 0 0 -1 0 56.5981)'
              fill='#BC5FFF'
            />
            <path
              d='M23.4001 22.9183L31.8901 20.0883C35.7001 18.8183 37.7701 20.8983 36.5101 24.7083L33.6801 33.1983C31.7801 38.9083 28.6601 38.9083 26.7601 33.1983L25.9201 30.6783L23.4001 29.8383C17.6901 27.9383 17.6901 24.8283 23.4001 22.9183Z'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M26.11 30.2482L29.69 26.6582'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ComplianceDetailsPage;
