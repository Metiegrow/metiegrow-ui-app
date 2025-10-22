import React, { useState } from 'react';
import { TrendingUp, CreditCard } from 'lucide-react';

import { BackButtonIcon, Message3Icon } from '../SVG/svg.function';

const TransactionsPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const transactions = Array(5).fill({
    message: 'Amount Credited to Your Account',
    date: '12 Jun 2025',
    amount: '$250',
  });

  return (
    <div className='min-h-screen bg-black text-white p-4 space-y-5 relative'>
      {/* Header */}
      <div className='flex items-center justify-between relative'>
        <button className='p-2 bg-[#1c1c1e] rounded-full'>
          <BackButtonIcon size={20} />
        </button>
        <h2 className='text-lg font-semibold'>Transactions</h2>

        <div className='relative'>
          <button
            className='p-2 bg-[#1c1c1e] rounded-full'
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Message3Icon size={20} />
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div className='absolute right-0 mt-2 bg-[#232323] border border-gray-700 rounded-2xl shadow-lg w-52 z-10 overflow-hidden'>
              <button
                className='w-full text-left px-4 py-3 hover:bg-gray-800 transition-all'
                onClick={() => {
                  setShowMenu(false);
                  alert('Downloading Statement...');
                }}
              >
                Download Statement
              </button>
              <button
                className='w-full text-left px-4 py-3 hover:bg-gray-800 transition-all'
                onClick={() => {
                  setShowMenu(false);
                  alert('Navigating to Change Bank Details...');
                }}
              >
                Change Bank Details
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stat Cards — Always in Same Row */}
      <div className='flex gap-4 w-full'>
        {/* Pending Dues */}
        <div className='bg-[#1c1c1e] p-4 rounded-xl w-1/2'>
          <div className='flex justify-between items-center'>
            <CreditCard className='text-yellow-300' />
            <p className='text-green-400 text-sm'>+2.3%</p>
          </div>
          <p className='text-lg font-semibold mt-2'>$250</p>
          <p className='text-sm text-gray-400'>Pending Dues</p>
        </div>

        {/* Received Amounts */}
        <div className='bg-[#1c1c1e] p-4 rounded-xl w-1/2'>
          <div className='flex justify-between items-center'>
            <CreditCard className='text-teal-400' />
            <p className='text-red-400 text-sm'>-2.3%</p>
          </div>
          <p className='text-lg font-semibold mt-2'>$250</p>
          <p className='text-sm text-gray-400'>Received Amounts</p>
        </div>
      </div>

      {/* Transaction List */}
      <div>
        <h3 className='text-base font-bold mb-3'>Transactions</h3>
        <div className='space-y-5'>
          {transactions.map((tx, index) => (
            <div
              key={index}
              className='flex justify-between items-start border-b border-gray-700 pb-3'
            >
              <div className='flex items-start gap-3 w-4/5'>
                <div className='bg-green-600 p-2 rounded-full shrink-0'>
                  <TrendingUp size={18} />
                </div>
                <div className='space-y-1 text-sm'>
                  <p className='font-medium leading-snug break-words'>{tx.message}</p>
                  <p className='text-xs text-gray-400'>Credited on: {tx.date}</p>
                </div>
              </div>
              <p className='text-sm font-semibold'>{tx.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
