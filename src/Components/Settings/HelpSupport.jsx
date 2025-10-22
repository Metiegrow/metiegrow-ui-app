import React, { useState } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { Search } from 'lucide-react';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Message2Icon, Message3Icon } from '../Common/SVG/svg.function';

import ContactForm from './ContactForm';

const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = [
    {
      title: 'Discover how AI is transforming user',
      content:
        'Discover how AI is transforming user experience design in this hands-on workshop. Learn how to leverage AI-driven insights, automation, and personalization to create smarter.',
    },
    { title: 'Discover how AI is transforming user' },
    { title: 'Discover how AI is transforming user' },
    { title: 'Discover how AI is transforming user' },
    { title: 'Discover how AI is transforming user' },
    { title: 'Discover how AI is transforming user' },
  ];

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='w-full bg-[#1f1f1f] sm:rounded-2xl p-4 sm:p-10 shadow-lg relative min-h-screen'>
      {/* Mobile Top Header */}
      <div className='sm:hidden flex items-center gap-3 mb-4'>
        <button className='block sm:hidden bg-transparent p-0 border-none shadow-none appearance-none focus:outline-none'>
          <BackButtonIcon className='w-6 h-6 text-white' />
        </button>
        <h2 className='text-lg font-semibold text-white'>Helps & Support</h2>
      </div>

      {/* Mobile Search */}
      <div className='sm:hidden mb-4'>
        <div className='flex items-center bg-[#2a2a2a] px-4 py-2 rounded-full'>
          <Search className='text-gray-400 w-5 h-5 mr-2' />
          <input
            type='text'
            placeholder='Search..'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 bg-transparent text-white placeholder-gray-400 outline-none border-none'
          />
        </div>
      </div>

      {/* Desktop Heading */}
      {/* <h2 className="hidden sm:block text-2xl sm:text-3xl font-bold mb-8 text-white">Helps & Support</h2> */}
      <h2 className='hidden sm:flex justify-between items-center text-2xl sm:text-3xl font-bold mb-8 text-white'>
        Helps & Support
        <button className='appearance-none bg-transparent border-none p-0 m-0 focus:outline-none pr-2'>
          <Message3Icon size={20} />
        </button>
      </h2>

      {/* Accordion Items */}
      <div className='space-y-4 pb-24 sm:pb-0'>
        {filteredData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className='w-full rounded-xl border border-white/20 overflow-hidden transition-all duration-300 bg-[#1f1f1f]'
            >
              <button
                onClick={() => toggleIndex(index)}
                className='w-full flex justify-between items-center px-5 py-4 text-left bg-[#1f1f1f] border border-white/20 rounded-xl focus:outline-none transition-all duration-300'
              >
                <span className='text-base sm:text-lg font-medium break-words w-full text-white'>
                  {index + 1}. {item.title}
                </span>
                <span className='text-2xl ml-4 text-white'>{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && item.content && (
                <div className='px-5 pb-4 text-sm text-gray-300 bg-[#1f1f1f]'>{item.content}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Contact Button (Sticky) */}
      {/* <div className="sm:hidden fixed bottom-4 left-4 right-4 z-10">
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full text-sm transition" onClick={() => setIsModalOpen(true)}>
          Contact Us
        </button>
      </div> */}
      <div className='sm:hidden fixed bottom-4 left-4 right-4 z-50'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full text-sm transition'
        >
          Contact Us
        </button>
      </div>

      {/* Desktop Button */}
      <div className='hidden sm:block text-right mt-8'>
        <Button
          className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm transition '
          onClick={() => setIsModalOpen(true)}
        >
          Contact Us
        </Button>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        closable={false}
        centered
        className='custom-dark-modal'
      >
        <ContactForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HelpSupport;
