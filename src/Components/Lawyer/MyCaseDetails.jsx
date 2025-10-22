import React, { useState, useEffect } from 'react';
import { BackButtonIcon, Message3Icon } from '../Common/SVG/svg.function';
import { Button } from 'antd';
import { Upload, FileText, Download } from 'lucide-react';

export default function MyCaseDetails({ data, goBack }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // This effect ensures the body overflow is hidden to prevent scrolling the whole page
    document.body.style.overflow = 'hidden';
    return () => {
      // Revert overflow to auto when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='w-full h-screen bg-black text-white flex justify-center items-start overflow-hidden'>
      {/* Main content area - responsive for desktop.
          On mobile, it's a single column (flex-col).
          On desktop (lg), it becomes a two-column layout (flex-row) with a gap. */}
      <div className='relative w-full max-w-[430px] lg:max-w-[1280px] bg-black flex flex-col h-full lg:pt-6'>
        {/* Header section.
            It remains at the top, spanning the width of the main content area.
            Padding is adjusted for desktop. */}
        <div
          className='flex items-center justify-between px-4 pt-6 pb-4 flex-shrink-0
                        lg:px-0 lg:pb-6'
        >
          <BackButtonIcon className='text-white cursor-pointer' onClick={goBack} />
          <h1 className='text-lg font-semibold'>My Cases</h1>
          <div className='relative'>
            <Button
              type='text'
              className='bg-transparent text-white pl-0'
              onClick={() => setShowMenu(!showMenu)}
            >
              <Message3Icon className='text-white' />
            </Button>
            {showMenu && (
              <div className='absolute top-8 right-0 bg-[#2F2F2F] rounded-xl py-2 px-3 flex flex-col gap-2 z-10 shadow-xl w-[150px]'>
                <div className='flex items-center gap-2 text-sm cursor-pointer'>
                  <Upload size={16} /> Upload
                </div>
                <div className='flex items-center gap-2 text-sm cursor-pointer'>
                  <FileText size={16} /> Invoices
                </div>
                <div className='flex items-center gap-2 text-sm cursor-pointer'>
                  <Download size={16} /> Downloads
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout: Two-column content area.
            On mobile, this is still flex-col, allowing cards to stack.
            On desktop, it switches to flex-row for side-by-side layout. */}
        <div className='flex-1 flex flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-6 lg:px-0'>
          {/* Left Column - Case Card.
              On mobile, it takes full width with horizontal padding and bottom margin.
              On desktop, it gets fluid width up to its max-width. */}
          <div
            className='w-full px-4 mb-6
                          lg:w-[calc(369/1104*100%)] lg:max-w-[369px] lg:h-[272px] lg:flex-shrink-0 lg:px-0 lg:mb-0'
          >
            <div className='bg-[#232323] w-full rounded-[24px] p-4 space-y-2 h-full relative'>
              <p className='text-green-400 text-sm'>Case {data?.id || '#1234'}</p>
              <h2 className='text-xl font-semibold leading-tight'>
                {data?.name || 'Surya Subramanian'}
              </h2>
              <p className='text-sm text-gray-400'>
                {data?.type || 'Temporary Graduate Visa (Subclass 485)'}
              </p>

              <p className='text-sm mt-1 text-[#B8B8B8] flex items-center gap-1'>
                {/* Calendar SVG Icon */}
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5.33398 1.33301V3.33301'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10.666 1.33301V3.33301'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M2.33398 6.05957H13.6673'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M14 5.66634V11.333C14 13.333 13 14.6663 10.6667 14.6663H5.33333C3 14.6663 2 13.333 2 11.333V5.66634C2 3.66634 3 2.33301 5.33333 2.33301H10.6667C13 2.33301 14 3.66634 14 5.66634Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10.4625 9.13314H10.4685'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10.4625 11.1331H10.4685'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7.99764 9.13314H8.00363'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7.99764 11.1331H8.00363'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M5.52889 9.13314H5.53488'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M5.52889 11.1331H5.53488'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Appointment on: {data?.date || '12 Jun 2025, 5:30PM'}
              </p>
              <p className='text-sm'>
                Service Type <span className='font-semibold'>Visa Renew</span>
              </p>
              <p className='text-sm text-gray-300'>
                Reason:
                <br />
                AI expert with hands-on experience in machine learning, deep learning, and AI
                product development.
              </p>
              {/* On Hold button - hidden on mobile, block on desktop */}
              <div className='absolute top-4 right-4 hidden lg:block'>
                <Button
                  type='primary'
                  className='bg-[#50FFB9] text-black font-semibold rounded-full px-4 py-1 h-auto text-xs'
                >
                  On Hold
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline and Chat.
              On mobile, it behaves as part of the flex-col.
              On desktop, it gets fluid width up to its max-width and fills available height. */}
          <div
            className='flex-1 px-4
                          lg:w-[calc(729/1104*100%)] lg:max-w-[729px] lg:h-full lg:bg-[#232323] lg:rounded-[24px] lg:px-6 lg:pt-6 lg:flex lg:flex-col'
          >
            {/* Timeline content - takes available space and is scrollable. */}
            <div className='flex-1 overflow-y-auto pr-2'>
              <p className='font-medium mb-2'>Lawyer Name</p>
              <div className='flex items-center gap-3 mb-4'>
                <img
                  src='https://randomuser.me/api/portraits/women/44.jpg'
                  alt='Anjana'
                  className='w-10 h-10 rounded-full object-cover'
                />
                <p className='text-base font-medium'>Anjana</p>
              </div>

              <div className='flex gap-3'>
                {/* SVG Timeline vertical line with circle */}
                <div className='flex flex-col items-center pt-[2px]'>
                  <svg
                    width='10'
                    height='166'
                    viewBox='0 0 10 166'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='5' cy='5' r='5' fill='#50FFB9' />
                    <path d='M5 10V166' stroke='#50FFB9' strokeDasharray='8 8' />
                  </svg>
                </div>

                {/* Timeline Content details */}
                <div className='space-y-6'>
                  <div>
                    <p className='text-xs text-gray-400 mb-1'>
                      Consulting on <span className='text-white'>12 Jun 2025, 4:00PM</span>
                    </p>
                    <p className='text-sm'>
                      AI expert with hands-on experience in machine learning, deep learning, and AI
                      product development.
                    </p>

                    {/* Aligned document and submitter info (mobile-friendly) */}
                    <div className='flex flex-col sm:flex-row flex-wrap sm:items-center gap-y-1 gap-x-4 mt-1'>
                      <p className='text-sm'>
                        📄 <span className='text-gray-400'>Documents Uploaded:</span>{' '}
                        <span className='text-red-400'>Passport.pdf</span>
                      </p>
                      <p className='text-sm'>
                        <span className='text-gray-400'>Submitted by:</span>{' '}
                        <span className='font-semibold'>Surya (You)</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className='text-xs text-gray-400 mb-1'>
                      Case Registered <span className='text-white'>8 Jun 2025, 4:00PM</span>
                    </p>
                    <p className='text-sm'>
                      AI expert with hands-on experience in machine learning, deep learning, and AI
                      product development.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Chat Bar - now part of the flex flow on desktop.
                On mobile, it's still at the bottom of the screen. */}
            <div className='w-full bg-[#232323] h-[100px] px-4 flex items-center justify-between rounded-b-2xl lg:rounded-t-none'>
              <input
                type='text'
                placeholder='Type Something....'
                className='bg-[#1a1a1a] w-[75%] h-[56px] rounded-full px-4 text-white placeholder:text-gray-400 outline-none text-sm'
              />
              <Button type='text' className='bg-transparent text-white pl-0'>
                {/* Send Message SVG Icon */}
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
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { BackButtonIcon, Message3Icon } from '../Common/SVG/svg.function';
// import { Button } from 'antd';
// import {
//   ArrowLeft,
//   Upload,
//   FileText,
//   Download,
//   MoreVertical,
// } from "lucide-react";

// export default function MyCaseDetails({ data,goBack }) {
//   const [showMenu, setShowMenu] = useState(false);

//   // Prevent body scroll when modal is active
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="w-full h-screen bg-black text-white flex justify-center items-start overflow-hidden">
//       <div className="relative w-full max-w-[430px] lg:max-w-[1280px] bg-black flex flex-col h-full">
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 pt-6 pb-4 flex-shrink-0">
//           <BackButtonIcon className="text-white cursor-pointer" onClick={goBack} />
//           <h1 className="text-lg font-semibold">My Cases</h1>
//           <div className="relative">
//             <Button type="text" // or "default"
//               className="bg-transparent text-white pl-0 " onClick={() => setShowMenu(!showMenu)}>
//               <Message3Icon className="text-white" />
//             </Button>
//             {showMenu && (
//               <div className="absolute top-8 right-0 bg-[#2F2F2F] rounded-xl py-2 px-3 flex flex-col gap-2 z-10 shadow-xl">
//                 <div className="flex items-center gap-2 text-sm cursor-pointer">
//                   <Upload size={16} /> Upload
//                 </div>
//                 <div className="flex items-center gap-2 text-sm cursor-pointer">
//                   <FileText size={16} /> Invoices
//                 </div>
//                 <div className="flex items-center gap-2 text-sm cursor-pointer">
//                   <Download size={16} /> Downloads
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto px-4 pb-[120px]">
//           {/* Case Card */}
//           <div className="bg-[#232323] w-full rounded-[24px] p-4 space-y-2 mb-6">
//             <p className="text-green-400 text-sm">Case {data?.id || "#1234"}</p>
//             <h2 className="text-xl font-semibold leading-tight">
//               {data?.name || "Surya Subramanian"}
//             </h2>
//             <p className="text-sm text-gray-400">
//               {data?.type || "Temporary Graduate Visa (Subclass 485)"}
//             </p>
//             <p className="text-sm mt-1">
//               📅 Appointment on: {data?.date || "12 Jun 2025, 5:30PM"}
//             </p>
//             <p className="text-sm">
//               Service Type <span className="font-semibold">Visa Renew</span>
//             </p>
//             <p className="text-sm text-gray-300">
//               Reason:
//               <br />
//               AI expert with hands-on experience in machine learning, deep
//               learning, and AI product development.
//             </p>
//           </div>

//           {/* Timeline */}
//           <div>
//             <p className="font-medium mb-2">Lawyer Name</p>
//             <div className="flex items-center gap-3 mb-2">
//               <img
//                 src="https://randomuser.me/api/portraits/women/44.jpg"
//                 alt="Anjana"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <p>Anjana</p>
//             </div>

//             <div className="ml-4 border-l-2 border-green-500 pl-4 space-y-6">
//               <div>
//                 <p className="text-xs text-gray-400">
//                   Consulting on <span className="text-white">12 Jun 2025, 4:00PM</span>
//                 </p>
//                 <p className="text-sm mt-1">
//                   AI expert with hands-on experience in machine learning, deep
//                   learning, and AI product development.
//                 </p>
//                 <p className="text-sm mt-1">
//                   📄 Documents Uploaded:{" "}
//                   <span className="text-red-400">Passport.pdf</span>
//                 </p>
//                 <p className="text-sm mt-1">
//                   Submitted by: <span className="font-semibold">Surya (You)</span>
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">
//                   Case Registered <span className="text-white">8 Jun 2025, 4:00PM</span>
//                 </p>
//                 <p className="text-sm mt-1">
//                   AI expert with hands-on experience in machine learning, deep
//                   learning, and AI product development.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Chat Bar */}
//         <div className="absolute bottom-0 left-0 w-full bg-[#232323] h-[100px] px-4 flex items-center justify-between rounded-t-2xl">
//           <input
//             type="text"
//             placeholder="Type Something...."
//             className="bg-[#1a1a1a] w-[75%] h-[56px] rounded-full px-4 text-white placeholder:text-gray-400 outline-none"
//           />
//           <Button type="text" // or "default"
//             className="bg-transparent text-white pl-0 ">
//             <svg width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect width="56" height="56" rx="28" transform="matrix(1 0 0 -1 0 56.5981)" fill="#BC5FFF" />
//               <path d="M23.4001 22.9183L31.8901 20.0883C35.7001 18.8183 37.7701 20.8983 36.5101 24.7083L33.6801 33.1983C31.7801 38.9083 28.6601 38.9083 26.7601 33.1983L25.9201 30.6783L23.4001 29.8383C17.6901 27.9383 17.6901 24.8283 23.4001 22.9183Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//               <path d="M26.11 30.2482L29.69 26.6582" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//             </svg>

//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
