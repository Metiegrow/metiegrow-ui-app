import { Spin } from 'antd';
import React from 'react';

const Loader = ({ size = 'default' }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Spin size={size} />
    </div>
  );
};

export default Loader;
