import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from 'antd';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function'; // Assuming ModalCloseIcon is correctly imported

export default function BookALawyer({ goBack }) {
  return (
    // The main container for both mobile and desktop views
    <div className='min-h-screen w-full bg-black text-white flex justify-center items-start pt-8 px-4 overflow-hidden'>
      {/* This div will be conditionally styled for desktop */}
      <div className='w-full max-w-[500px] md:max-w-[700px] md:pt-12 desktop-container'>
        {' '}
        {/* Add desktop-container class */}
        {/* Header - Adjusted for desktop layout */}
        <div className='flex items-center justify-between mb-6 md:justify-center md:relative'>
          {' '}
          {/* Added justify-between for desktop positioning of close icon */}
          {/* Back button - visible on mobile, hidden on desktop as per image */}
          <Button
            type='text'
            className='bg-transparent text-white pl-0 md:hidden' // Hide on desktop
            onClick={goBack}
          >
            <BackButtonIcon size={16} color='white' />
          </Button>
          <h1 className='text-lg font-semibold md:text-2xl'>Book A lawyer</h1>{' '}
          {/* Adjust text size for desktop */}
          {/* Close icon - visible on desktop, positioned absolutely */}
          <Button
            type='text'
            className='bg-transparent text-white md:absolute md:right-0 md:top-0' // Position for desktop
            onClick={() => console.log('Close modal')} // Replace with actual close functionality
          >
            <ModalCloseIcon size={24} color='white' />{' '}
            {/* Assuming ModalCloseIcon takes size and color props */}
          </Button>
        </div>
        {/* Form */}
        <form className='space-y-5 md:space-y-7'>
          {' '}
          {/* Adjust spacing for desktop */}
          {/* Full Name */}
          <div>
            <label className='text-sm font-medium'>
              Full Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              placeholder='Enter Name'
              className='w-full h-[51px] rounded-xl bg-transparent border border-gray-600 px-4 mt-1 md:h-[55px] md:text-base'
            />
          </div>
          {/* Service Type */}
          <div>
            <label className='text-sm font-medium'>
              Service Type <span className='text-red-500'>*</span>
            </label>
            <select className='w-full h-[51px] rounded-xl bg-transparent border border-gray-600 px-4 mt-1 md:h-[55px] md:text-base'>
              <option>Select Service Type</option>
            </select>
          </div>
          {/* Lawyer */}
          <div>
            <label className='text-sm font-medium'>
              Lawyer <span className='text-red-500'>*</span>
            </label>
            <select className='w-full h-[51px] rounded-xl bg-transparent border border-gray-600 px-4 mt-1 md:h-[55px] md:text-base'>
              <option>Select Lawyer</option>
            </select>
          </div>
          {/* Upload Documents */}
          <div>
            <label className='text-sm font-medium'>Upload documents</label>
            <div className='w-full h-[122px] bg-[#232323] rounded-[14.91px] flex items-center justify-center border border-gray-600 mt-1 md:h-[150px]'>
              <div className='text-center'>
                <div className='text-xl pt-4'>
                  {/* The SVG for upload icon */}
                  <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg '
                  >
                    <path
                      d='M0.603546 18.1655C0.603546 8.5577 8.3922 0.769043 18 0.769043C27.6078 0.769043 35.3964 8.5577 35.3964 18.1655C35.3964 27.7733 27.6078 35.5619 18 35.5619C8.3922 35.5619 0.603546 27.7733 0.603546 18.1655Z'
                      fill='black'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M18 7.41553C18.4142 7.41553 18.75 7.75131 18.75 8.16553V19.1381L20.4306 17.1774C20.7001 16.8629 21.1736 16.8265 21.4881 17.0961C21.8026 17.3657 21.839 17.8391 21.5694 18.1536L18.5694 21.6536C18.427 21.8199 18.2189 21.9155 18 21.9155C17.7811 21.9155 17.573 21.8199 17.4306 21.6536L14.4306 18.1536C14.161 17.8391 14.1974 17.3657 14.5119 17.0961C14.8264 16.8265 15.2999 16.8629 15.5694 17.1774L17.25 19.1381V8.16553C17.25 7.75131 17.5858 7.41553 18 7.41553ZM12.9958 14.4175C13.41 14.4152 13.7477 14.7491 13.75 15.1633C13.7523 15.5775 13.4184 15.9152 13.0042 15.9175C11.9107 15.9236 11.1356 15.952 10.5473 16.06C9.98054 16.1641 9.65246 16.3313 9.40901 16.5748C9.13225 16.8515 8.9518 17.2401 8.85315 17.9739C8.75159 18.7292 8.75 19.7303 8.75 21.1657V22.1657C8.75 23.6012 8.75159 24.6023 8.85315 25.3576C8.9518 26.0914 9.13225 26.48 9.40901 26.7567C9.68577 27.0335 10.0743 27.2139 10.8081 27.3126C11.5635 27.4142 12.5646 27.4157 14 27.4157H22C23.4354 27.4157 24.4365 27.4142 25.1919 27.3126C25.9257 27.2139 26.3142 27.0335 26.591 26.7567C26.8678 26.48 27.0482 26.0914 27.1469 25.3576C27.2484 24.6023 27.25 23.6012 27.25 22.1657V21.1657C27.25 19.7303 27.2484 18.7292 27.1469 17.9739C27.0482 17.2401 26.8678 16.8515 26.591 16.5748C26.3475 16.3313 26.0195 16.1641 25.4527 16.06C24.8644 15.952 24.0893 15.9236 22.9958 15.9175C22.5816 15.9152 22.2477 15.5775 22.25 15.1633C22.2523 14.7491 22.59 14.4152 23.0042 14.4175C24.0857 14.4235 24.9871 14.4494 25.7236 14.5847C26.4816 14.7239 27.1267 14.9892 27.6517 15.5141C28.2536 16.116 28.5125 16.8739 28.6335 17.774C28.75 18.641 28.75 19.7433 28.75 21.1109V22.2206C28.75 23.5882 28.75 24.6905 28.6335 25.5575C28.5125 26.4576 28.2536 27.2155 27.6517 27.8174C27.0497 28.4193 26.2919 28.6782 25.3918 28.7992C24.5248 28.9158 23.4225 28.9158 22.0549 28.9157H13.9451C12.5775 28.9158 11.4752 28.9158 10.6082 28.7992C9.70814 28.6782 8.95027 28.4193 8.34835 27.8174C7.74643 27.2155 7.48754 26.4576 7.36652 25.5575C7.48754 16.8739 7.74643 16.116 8.34835 15.5141C8.87328 14.9892 9.51835 14.7239 10.2764 14.5847C11.0129 14.4494 11.9143 14.4235 12.9958 14.4175Z'
                      fill='url(#paint0_linear_4401_10117)'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear_4401_10117'
                        x1='10.1679'
                        y1='-5.83014'
                        x2='53.3285'
                        y2='14.3113'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop offset='0.192793' stopColor='#14C0FE' />
                        <stop offset='0.587042' stopColor='#CC9192' />
                        <stop offset='1' stopColor='#A82EFF' />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className='text-sm font-medium '>Click to Upload</p>
                <p className='text-xs text-gray-400'>Supported file formats: pdf, jpeg, jpg, png</p>
              </div>
            </div>
          </div>
          {/* Reason */}
          <div>
            <label className='text-sm font-medium'>
              Reason <span className='text-red-500'>*</span>
            </label>
            <textarea
              placeholder='Typing...'
              maxLength={1000}
              className='w-full h-[105px] rounded-xl bg-transparent border border-gray-600 px-4 py-2 mt-1 md:h-[130px] md:text-base'
            />
            <p className='text-right text-xs text-gray-500'>(0/1000)</p>
          </div>
          {/* Submit Button */}
          <div className='flex justify-center md:pt-4'>
            {' '}
            {/* Add padding top for desktop */}
            <Button className='w-full max-w-[352px] h-[48px] bg-[#B65AFB] text-white rounded-full font-semibold md:max-w-[400px] md:h-[55px] md:text-lg'>
              Submit →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import React from "react";
// import { ArrowLeft } from "lucide-react";
// import { Button } from 'antd';
// import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';

// export default function BookALawyer({ goBack }) {
//   return (
//     <div className="min-h-screen w-full bg-black text-white flex justify-center items-start pt-8 px-4 overflow-hidden">
//       <div className="w-full max-w-[500px]">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <Button type="text" // or "default"
//             className="bg-transparent text-white pl-0 "
//             onClick={goBack}>
//             <BackButtonIcon size={16} color="white" />
//           </Button>
//           <h1 className="text-lg font-semibold">Book A lawyer</h1>
//         </div>

//         {/* Form */}
//         <form className="space-y-5">
//           {/* Full Name */}
//           <div>
//             <label className="text-sm font-medium">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               className="w-full h-[51px] rounded-xl bg-transparent border border-gray-600 px-4 mt-1"
//             />
//           </div>

//           {/* Service Type */}
//           <div>
//             <label className="text-sm font-medium">
//               Service Type <span className="text-red-500">*</span>
//             </label>
//             <select className="w-full h-[51px] rounded-xl bg-transparent border border-gray-600 px-4 mt-1">
//               <option>Select Service Type</option>
//             </select>
//           </div>

//           {/* Lawyer */}
//           <div>
//             <label className="text-sm font-medium">
//               Lawyer <span className="text-red-500">*</span>
//             </label>
//             <select className="w-full h-[51px] rounded-xl bg-transparent border border-gray-600 px-4 mt-1">
//               <option>Select Lawyer</option>
//             </select>
//           </div>

//           {/* Upload Documents */}
//           <div>
//             <label className="text-sm font-medium">Upload documents</label>
//             <div className="w-full h-[122px] bg-[#232323] rounded-[14.91px] flex items-center justify-center border border-gray-600 mt-1">
//               <div className="text-center">
//                 <div className="text-xl pt-4">
//                   <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg ">
//                     <path d="M0.603546 18.1655C0.603546 8.5577 8.3922 0.769043 18 0.769043C27.6078 0.769043 35.3964 8.5577 35.3964 18.1655C35.3964 27.7733 27.6078 35.5619 18 35.5619C8.3922 35.5619 0.603546 27.7733 0.603546 18.1655Z" fill="black" />
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M18 7.41553C18.4142 7.41553 18.75 7.75131 18.75 8.16553V19.1381L20.4306 17.1774C20.7001 16.8629 21.1736 16.8265 21.4881 17.0961C21.8026 17.3657 21.839 17.8391 21.5694 18.1536L18.5694 21.6536C18.427 21.8199 18.2189 21.9155 18 21.9155C17.7811 21.9155 17.573 21.8199 17.4306 21.6536L14.4306 18.1536C14.161 17.8391 14.1974 17.3657 14.5119 17.0961C14.8264 16.8265 15.2999 16.8629 15.5694 17.1774L17.25 19.1381V8.16553C17.25 7.75131 17.5858 7.41553 18 7.41553ZM12.9958 14.4175C13.41 14.4152 13.7477 14.7491 13.75 15.1633C13.7523 15.5775 13.4184 15.9152 13.0042 15.9175C11.9107 15.9236 11.1356 15.952 10.5473 16.06C9.98054 16.1641 9.65246 16.3313 9.40901 16.5748C9.13225 16.8515 8.9518 17.2401 8.85315 17.9739C8.75159 18.7292 8.75 19.7303 8.75 21.1657V22.1657C8.75 23.6012 8.75159 24.6023 8.85315 25.3576C8.9518 26.0914 9.13225 26.48 9.40901 26.7567C9.68577 27.0335 10.0743 27.2139 10.8081 27.3126C11.5635 27.4142 12.5646 27.4157 14 27.4157H22C23.4354 27.4157 24.4365 27.4142 25.1919 27.3126C25.9257 27.2139 26.3142 27.0335 26.591 26.7567C26.8678 26.48 27.0482 26.0914 27.1469 25.3576C27.2484 24.6023 27.25 23.6012 27.25 22.1657V21.1657C27.25 19.7303 27.2484 18.7292 27.1469 17.9739C27.0482 17.2401 26.8678 16.8515 26.591 16.5748C26.3475 16.3313 26.0195 16.1641 25.4527 16.06C24.8644 15.952 24.0893 15.9236 22.9958 15.9175C22.5816 15.9152 22.2477 15.5775 22.25 15.1633C22.2523 14.7491 22.59 14.4152 23.0042 14.4175C24.0857 14.4235 24.9871 14.4494 25.7236 14.5847C26.4816 14.7239 27.1267 14.9892 27.6517 15.5141C28.2536 16.116 28.5125 16.8739 28.6335 17.774C28.75 18.641 28.75 19.7433 28.75 21.1109V22.2206C28.75 23.5882 28.75 24.6905 28.6335 25.5575C28.5125 26.4576 28.2536 27.2155 27.6517 27.8174C27.0497 28.4193 26.2919 28.6782 25.3918 28.7992C24.5248 28.9158 23.4225 28.9158 22.0549 28.9157H13.9451C12.5775 28.9158 11.4752 28.9158 10.6082 28.7992C9.70814 28.6782 8.95027 28.4193 8.34835 27.8174C7.74643 27.2155 7.48754 26.4576 7.36652 25.5575C7.24996 24.6905 7.24998 23.5882 7.25 22.2206V21.1109C7.24998 19.7433 7.24996 18.641 7.36652 17.774C7.48754 16.8739 7.74643 16.116 8.34835 15.5141C8.87328 14.9892 9.51835 14.7239 10.2764 14.5847C11.0129 14.4494 11.9143 14.4235 12.9958 14.4175Z" fill="url(#paint0_linear_4401_10117)" />
//                     <defs>
//                       <linearGradient id="paint0_linear_4401_10117" x1="10.1679" y1="-5.83014" x2="53.3285" y2="14.3113" gradientUnits="userSpaceOnUse">
//                         <stop offset="0.192793" stop-color="#14C0FE" />
//                         <stop offset="0.587042" stop-color="#CC9192" />
//                         <stop offset="1" stop-color="#A82EFF" />
//                       </linearGradient>
//                     </defs>
//                   </svg>
//                 </div>
//                 <p className="text-sm font-medium ">Click to Upload</p>
//                 <p className="text-xs text-gray-400">
//                   Supported file formats: pdf, jpeg, jpg, png
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Reason */}
//           <div>
//             <label className="text-sm font-medium">
//               Reason <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               placeholder="Typing..."
//               maxLength={1000}
//               className="w-full h-[105px] rounded-xl bg-transparent border border-gray-600 px-4 py-2 mt-1"
//             />
//             <p className="text-right text-xs text-gray-500">(0/1000)</p>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <Button className="w-full max-w-[352px] h-[48px] bg-[#B65AFB] text-white rounded-full font-semibold">
//               Submit →
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
