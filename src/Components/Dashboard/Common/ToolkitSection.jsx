import React from 'react';
import Card from './Cards/Card';
import ToolkitCard from './Cards/ToolkitCard';
import {
  FileTextOutlined,
  IdcardOutlined,
  BookOutlined,
  VideoCameraOutlined,
  BankOutlined,
  ShoppingOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const ToolkitSection = ({ userType }) => {
  const getToolkitItems = () => {
    const commonItems = [
      { icon: FileTextOutlined, title: 'Resume Builder' },
      { icon: IdcardOutlined, title: 'Visa Details' },
      { icon: BookOutlined, title: 'Courses' },
      { icon: VideoCameraOutlined, title: 'Session' },
      { icon: BankOutlined, title: 'Housing' },
      { icon: ShoppingOutlined, title: 'Jobs' },
    ];

    const userSpecificItems = {
      student: [
        { icon: MessageOutlined, title: 'Chat' },
        { icon: SettingOutlined, title: 'Settings' },
      ],
      mentor: [
        { icon: MessageOutlined, title: 'Chat' },
        { icon: SettingOutlined, title: 'Settings' },
      ],
      alumni: [
        { icon: MessageOutlined, title: 'Chat' },
        { icon: SettingOutlined, title: 'Settings' },
      ],
      lawyer: [
        { icon: MessageOutlined, title: 'Chat' },
        { icon: SettingOutlined, title: 'Settings' },
      ],
      recruiter: [
        { icon: MessageOutlined, title: 'Chat' },
        { icon: SettingOutlined, title: 'Settings' },
      ],
      'pg-owner': [
        { icon: MessageOutlined, title: 'Chat' },
        { icon: SettingOutlined, title: 'Settings' },
      ],
    };

    return [...commonItems, ...(userSpecificItems[userType] || [])];
  };

  const toolkitItems = getToolkitItems();

  return (
    <Card className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-xl font-bold'>Toolkit</h2>
        <button className='text-[#50FFB9] text-sm font-medium hover:text-[#40E0A0] transition-colors'>
          View All
        </button>
      </div>

      {/* Toolkit Grid */}
      <div className='grid grid-cols-4 gap-4'>
        {toolkitItems.map((item, index) => (
          <ToolkitCard
            key={index}
            icon={item.icon}
            title={item.title}
            onClick={() => console.log(`Clicked ${item.title}`)}
          />
        ))}
      </div>
    </Card>
  );
};

export default ToolkitSection;
