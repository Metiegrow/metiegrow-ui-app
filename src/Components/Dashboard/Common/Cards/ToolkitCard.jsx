import React from 'react';
import Card from './Card';

const ToolkitCard = ({ icon: Icon, title, onClick }) => {
  return (
    <Card
      className='cursor-pointer hover:bg-[#2A2A2A] transition-colors'
      onClick={onClick}
      padding='p-5'
    >
      <div className='flex flex-col items-center space-y-2'>
        <div className='w-16 h-16 bg-[#232323] rounded-3xl flex items-center justify-center'>
          <Icon className='w-8 h-8 text-white' />
        </div>
        <span className='text-white text-xs text-center font-medium leading-tight'>{title}</span>
      </div>
    </Card>
  );
};

export default ToolkitCard;
