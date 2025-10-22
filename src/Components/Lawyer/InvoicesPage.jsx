import { useState } from 'react';
import { Button } from 'antd';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import InvoiceDetails from './InvoiceDetails';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const InvoiceCard = ({ invoiceNo, name, visaType, status, onOpenDetails }) => {
  const isPaid = status === 'Paid';

  return (
    <div className='w-full max-w-[350px] h-auto rounded-[24px] bg-[#232323] p-5 relative text-white mb-4 mx-auto md:mx-0'>
      {/* Status Pill */}
      <div
        className={`absolute top-5 right-5 h-[24px] min-w-[60px] px-3 rounded-full text-xs flex items-center justify-center border transition-colors ${
          isPaid
            ? 'text-green-400 border-green-400 bg-[#0f0f0f]'
            : 'text-purple-400 border-purple-400 bg-[#0f0f0f]'
        }`}
      >
        {status}
      </div>

      {/* Content */}
      <div className='space-y-1 pr-16'>
        <p className='text-green-400 text-sm'>Invoice NO#{invoiceNo}</p>
        <h3 className='text-lg font-semibold leading-snug'>{name}</h3>
        <p className='text-sm text-gray-400 leading-snug'>{visaType}</p>
      </div>

      {/* Trigger Details Page */}
      <Button
        type='text'
        className='bg-transparent text-white pl-0 rounded-full absolute bottom-7 right-1 flex items-center justify-center'
        onClick={onOpenDetails}
      >
        <svg
          width='63'
          height='63'
          viewBox='0 0 63 63'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
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
  );
};

export default function InvoicesPage() {
  // Changed export name back to InvoicesPage
  const [view, setView] = useState('list');

  const goBack = () => setView('list');
  const openDetails = () => setView('detail');

  // If view is detail, show InvoiceDetails
  if (view === 'detail') {
    return <InvoiceDetails goBack={goBack} />;
  }

  // Else, show the list of invoices
  return (
    <div className='min-h-screen bg-black px-4 py-6 text-white md:px-8 md:py-10'>
      {/* Header */}
      <div className='flex items-center mb-6'>
        <Button type='text' className='bg-transparent text-white pl-0' onClick={goBack}>
          {' '}
          {/* Added onClick for back button */}
          <BackButtonIcon color='white' size={20} />
        </Button>
        <h1 className='text-xl font-semibold ml-2'>Invoices</h1> {/* Added ml-2 for spacing */}
      </div>

      {/* Invoice Cards Container for Desktop */}
      <div className='flex flex-col items-center md:flex-row md:flex-wrap md:justify-start md:gap-4'>
        <InvoiceCard
          invoiceNo='1234'
          name='Surya Subramanian'
          visaType='Temporary Graduate Visa (Subclass 485)'
          status='Unpaid'
          onOpenDetails={openDetails}
        />
        <InvoiceCard
          invoiceNo='5678'
          name='Surya Subramanian'
          visaType='Temporary Graduate Visa (Subclass 485)'
          status='Paid'
          onOpenDetails={openDetails}
        />
        {/* Add more InvoiceCards here as needed */}
      </div>
    </div>
  );
}
