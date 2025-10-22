import React, { useState, useEffect } from 'react';
import { BackButtonIcon, Message3Icon, CalenderIcon } from '../Common/SVG/svg.function';
import { Button } from 'antd';
import MyCaseDetails from './MyCaseDetails';
import BookALawyer from './BookALawyer';
import InvoicesPage from './InvoicesPage';

// Dropdown menu component
const DropdownMenu = ({ open, onBookLawyer, onInvoiceClick }) => {
  if (!open) return null;
  return (
    <div className='absolute right-2 top-10 w-44 bg-[#232323] text-white z-20 shadow-lg rounded-2xl'>
      <ul className='p-3 text-sm space-y-3'>
        <li
          className='flex items-center gap-2 hover:text-purple-400 cursor-pointer'
          onClick={onBookLawyer}
        >
          <Button type='text' className='bg-transparent text-white pl-0'>
            {/* Book a Lawyer Icon */}
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z'
                stroke='white'
                strokeWidth='1.5'
              />
              <path
                d='M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5'
                stroke='white'
                strokeWidth='1.5'
              />
              <path d='M8 13H12' stroke='white' strokeWidth='1.5' />
              <path d='M8 17H16' stroke='white' strokeWidth='1.5' />
            </svg>
            Book a Lawyer
          </Button>
        </li>
        <li
          className='flex items-center gap-2 hover:text-purple-400 cursor-pointer'
          onClick={onInvoiceClick}
        >
          <span>
            {/* Invoices Icon */}
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path d='M8 2V5' stroke='white' strokeWidth='1.5' />
              <path d='M16 2V5' stroke='white' strokeWidth='1.5' />
              <path d='M7 11H15' stroke='white' strokeWidth='1.5' />
              <path d='M7 15H12' stroke='white' strokeWidth='1.5' />
              <path
                d='M15 22H9C4 22 3 19.94 3 15.82V9.65C3 4.95 4.67 3.69 8 3.5H16C19.33 3.68 21 4.95 21 9.65V16'
                stroke='white'
                strokeWidth='1.5'
              />
              <path d='M21 16L15 22V19C15 17 16 16 18 16H21Z' stroke='white' strokeWidth='1.5' />
            </svg>
          </span>
          Invoices
        </li>
        <li className='flex items-center gap-2 hover:text-purple-400 cursor-pointer'>
          <span>
            {/* Downloads Icon */}
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path d='M8 2V5' stroke='white' strokeWidth='1.5' />
              <path d='M16 2V5' stroke='white' strokeWidth='1.5' />
              <path d='M7 11H15' stroke='white' strokeWidth='1.5' />
              <path d='M7 15H12' stroke='white' strokeWidth='1.5' />
              <path
                d='M15 22H9C4 22 3 19.94 3 15.82V9.65C3 4.95 4.67 3.69 8 3.5H16C19.33 3.68 21 4.95 21 9.65V16'
                stroke='white'
                strokeWidth='1.5'
              />
              <path d='M21 16L15 22V19C15 17 16 16 18 16H21Z' stroke='white' strokeWidth='1.5' />
            </svg>
          </span>
          Downloads
        </li>
      </ul>
    </div>
  );
};

const MyCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showBookLawyer, setShowBookLawyer] = useState(false);
  const [showInvoicePage, setShowInvoicePage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9001/myCases')
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (selectedCase) {
    return <MyCaseDetails data={selectedCase} goBack={() => setSelectedCase(null)} />;
  }

  if (showBookLawyer) return <BookALawyer goBack={() => setShowBookLawyer(false)} />;
  if (showInvoicePage) return <InvoicesPage goBack={() => setShowInvoicePage(false)} />;

  return (
    <div className='min-h-screen bg-black text-white px-4 py-6 overflow-x-hidden'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-2 md:hidden'>
          <BackButtonIcon size={24} />
          <h2 className='text-xl font-semibold'>My Cases</h2>
        </div>
        <div className='hidden md:block'>
          <h2 className='text-2xl font-semibold'>My Cases</h2>
        </div>
        <div className='relative'>
          <Button
            type='text'
            className='bg-transparent p-2'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Message3Icon size={24} />
          </Button>
          <DropdownMenu
            open={dropdownOpen}
            onBookLawyer={() => {
              setShowBookLawyer(true);
              setDropdownOpen(false);
            }}
            onInvoiceClick={() => {
              setShowInvoicePage(true);
              setDropdownOpen(false);
            }}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto'>
        {loading ? (
          <div className='text-gray-400'>Loading...</div>
        ) : cases.length === 0 ? (
          <div className='text-gray-400'>No cases found.</div>
        ) : (
          cases.map((item, index) => (
            <div
              key={index}
              className='relative bg-[#232323] rounded-2xl p-4 flex flex-col justify-between min-h-[148px] hover:bg-[#2c2c2c] transition-colors duration-200 cursor-pointer'
              onClick={() => setSelectedCase(item)}
            >
              {item.status && (
                <span
                  className={`absolute top-4 right-4 px-3 py-[2px] text-xs font-medium rounded-full border 
                                    ${
                                      item.status === 'Completed'
                                        ? 'border-green-500 text-green-500'
                                        : 'border-orange-500 text-orange-500'
                                    }
                                    bg-transparent`}
                >
                  {item.status}
                </span>
              )}
              <div>
                <p className='text-sm text-green-400 '>Case {item.id}</p>
                <h3 className='text-lg font-semibold mt-1 '>{item.name}</h3>
                <p className='text-sm text-gray-300 mt-1'>{item.type}</p>
              </div>
              <div className='flex items-center justify-between mt-6 text-sm text-gray-400'>
                <div className='flex items-center gap-2'>
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
                      stroke-width='1.5'
                      stroke-miterlimit='10'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M10.666 1.33301V3.33301'
                      stroke='white'
                      stroke-width='1.5'
                      stroke-miterlimit='10'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M2.33398 6.05957H13.6673'
                      stroke='white'
                      stroke-width='1.5'
                      stroke-miterlimit='10'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M14 5.66634V11.333C14 13.333 13 14.6663 10.6667 14.6663H5.33333C3 14.6663 2 13.333 2 11.333V5.66634C2 3.66634 3 2.33301 5.33333 2.33301H10.6667C13 2.33301 14 3.66634 14 5.66634Z'
                      stroke='white'
                      stroke-width='1.5'
                      stroke-miterlimit='10'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M10.4625 9.13314H10.4685'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M10.4625 11.1331H10.4685'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M7.99764 9.13314H8.00363'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M7.99764 11.1331H8.00363'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M5.52889 9.13314H5.53488'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M5.52889 11.1331H5.53488'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>

                  <span>{item.date}</span>
                </div>
                <div className='bg-purple-600 w-9 h-9 rounded-full flex items-center justify-center'>
                  <Button
                    type='text'
                    className='bg-transparent text-white p-2 '
                    onClick={() => setSelectedCase(item)}
                  >
                    <svg width='63' height='63' viewBox='0 0 63 63' fill='none'>
                      <rect
                        width='44'
                        height='44'
                        rx='22'
                        transform='matrix(0.707107 -0.707107 -0.707107 -0.707107 31.1127 62.2256)'
                        fill='#BC5FFF'
                      />
                      <path
                        d='M24.3952 37.8301L37.8302 24.395C33.2358 28.1975 29.7419 24.5637 29.1019 23.2239'
                        stroke='white'
                        strokeWidth='1.6'
                      />
                      <path
                        d='M24.3952 37.8301L37.8302 24.395C34.0277 28.9895 37.6615 32.4833 39.0013 33.1234'
                        stroke='white'
                        strokeWidth='1.6'
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCases;

// import React, { useState, useEffect } from "react";
// import { BackButtonIcon, Message3Icon } from '../Common/SVG/svg.function';
// import { Button } from "antd";
// import MyCaseDetails from "./MyCaseDetails";
// import BookALawyer from "./BookALawyer";
// import InvoicesPage from "./InvoicesPage";

// // Dropdown menu component
// const DropdownMenu = ({ open, onBookLawyer, onInvoiceClick }) => {
//     if (!open) return null;
//     return (
//         <div className="absolute right-2 top-10 w-44 bg-[#232323] text-white z-20 shadow-lg rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px]">
//             <ul className="p-3 text-sm space-y-3">
//                 <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer"
//                     onClick={onBookLawyer}>
//                     <Button type="text" className="bg-transparent text-white pl-0">
//                         <span>
//                             {/* Book a Lawyer Icon */}
//                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                                 <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M8 13H12" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M8 17H16" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                         </span>
//                         Book a Lawyer
//                     </Button>
//                 </li>
//                 <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer" onClick={onInvoiceClick}>
//                     <span>
//                         {/* Invoices Icon */}
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                             <path d="M8 2V5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M16 2V5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M7 11H15" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M7 15H12" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M15 22H9C4 22 3 19.94 3 15.82V9.65C3 4.95 4.67 3.69 8 3.5H16C19.33 3.68 21 4.95 21 9.65V16" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M21 16L15 22V19C15 17 16 16 18 16H21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </span>
//                     Invoices
//                 </li>
//                 <li className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
//                     <span>
//                         {/* Downloads Icon */}
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                             <path d="M8 2V5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M16 2V5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M7 11H15" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M7 15H12" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M15 22H9C4 22 3 19.94 3 15.82V9.65C3 4.95 4.67 3.69 8 3.5H16C19.33 3.68 21 4.95 21 9.65V16" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M21 16L15 22V19C15 17 16 16 18 16H21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </span>
//                     Downloads
//                 </li>
//             </ul>
//         </div>
//     );
// };

// const MyCases = () => {
//     const [cases, setCases] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [selectedCase, setSelectedCase] = useState(null);
//     const [showBookLawyer, setShowBookLawyer] = useState(false);
//     const [showInvoicePage, setShowInvoicePage] = useState(false);

//     useEffect(() => {
//         fetch("http://localhost:9001/myCases")
//             .then(res => res.json())
//             .then(data => {
//                 setCases(data);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     }, []);

//     if (selectedCase) {
//         return (
//             <MyCaseDetails
//                 data={selectedCase}
//                 goBack={() => setSelectedCase(null)}
//             />
//         );
//     }

//     if (showBookLawyer) {
//         return <BookALawyer goBack={() => setShowBookLawyer(false)} />;
//     }
//     if (showInvoicePage) {
//         return <InvoicesPage goBack={() => setShowInvoicePage(false)} />;
//     }

//     return (
//         <div className="min-h-screen bg-black text-white px-4 py-6 overflow-x-hidden">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 {/* Mobile Back Button */}
//                 <div className="flex items-center gap-2 md:hidden">
//                     <BackButtonIcon size={24} />
//                     <h2 className="text-xl font-semibold">My Cases</h2>
//                 </div>

//                 {/* Desktop Title */}
//                 <div className="hidden md:block">
//                     <h2 className="text-2xl font-semibold">My Cases</h2>
//                 </div>

//                 {/* Dropdown */}
//                 <div className="relative">
//                     <Button
//                         type="text"
//                         className="bg-transparent p-2"
//                         onClick={() => setDropdownOpen(!dropdownOpen)}
//                     >
//                         <Message3Icon size={24} />
//                     </Button>
//                     <DropdownMenu
//                         open={dropdownOpen}
//                         onBookLawyer={() => {
//                             setShowBookLawyer(true);
//                             setDropdownOpen(false);
//                         }}
//                         onInvoiceClick={() => {
//                             setShowInvoicePage(true);
//                             setDropdownOpen(false);
//                         }}
//                     />
//                 </div>
//             </div>

//             {/* Cards */}
//             <div className="flex justify-center">
//                 <div className="flex flex-col items-center gap-6 w-full max-w-md">
//                     {loading ? (
//                         <div className="text-gray-400">Loading...</div>
//                     ) : cases.length === 0 ? (
//                         <div className="text-gray-400">No cases found.</div>
//                     ) : (
//                         cases.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="relative w-[350px] min-h-[148px] bg-[#232323] rounded-[24px] p-4 flex flex-col justify-between"
//                             >
//                                 {/* Status Tag */}
//                                 {item.status && (
//                                     <span
//                                         className={`absolute top-4 right-4 px-3 py-[2px] text-xs font-medium rounded-full border ${item.status === "Completed"
//                                             ? "border-green-500 text-green-500"
//                                             : "border-orange-500 text-orange-500"
//                                             } bg-transparent`}
//                                     >
//                                         {item.status}
//                                     </span>
//                                 )}

//                                 {/* Main Info */}
//                                 <div>
//                                     <p className="text-sm text-green-400">Case {item.id}</p>
//                                     <h3 className="text-lg font-semibold mt-1">{item.name}</h3>
//                                     <p className="text-sm text-gray-300 mt-1">{item.type}</p>
//                                 </div>

//                                 {/* Bottom Row: Date + Icon */}
//                                 <div className="flex items-center justify-between mt-6">
//                                     <div className="flex items-center gap-2 text-sm text-gray-400">
//                                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                                             <path d="M5.33333 1.3335V3.3335" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M10.6667 1.3335V3.3335" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M2.33333 6.06006H13.6667" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M14 5.66683V11.3335C14 13.3335 13 14.6668 10.6667 14.6668H5.33333C3 14.6668 2 13.3335 2 11.3335V5.66683C2 3.66683 3 2.3335 5.33333 2.3335H10.6667C13 2.3335 14 3.66683 14 5.66683Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M10.4631 9.13314H10.4691" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M10.4631 11.1331H10.4691" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M7.99699 9.13314H8.00298" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M7.99699 11.1331H8.00298" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M5.52954 9.13314H5.53553" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                             <path d="M5.52954 11.1331H5.53553" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                         </svg>
//                                         <span>{item.date}</span>
//                                     </div>
//                                     <div className="bg-purple-600 w-9 h-9 rounded-full flex items-center justify-center">
//                                         <Button type="text"
//                                             className="bg-transparent text-white p-2 "
//                                             onClick={() => setSelectedCase(item)}>
//                                             <svg width="63" height="63" viewBox="0 0 63 63" fill="none">
//                                                 <rect width="44" height="44" rx="22" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 31.1127 62.2256)" fill="#BC5FFF" />
//                                                 <path d="M24.3952 37.8301L37.8302 24.395C33.2358 28.1975 29.7419 24.5637 29.1019 23.2239" stroke="white" strokeWidth="1.6" />
//                                                 <path d="M24.3952 37.8301L37.8302 24.395C34.0277 28.9895 37.6615 32.4833 39.0013 33.1234" stroke="white" strokeWidth="1.6" />
//                                             </svg>
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyCases;
