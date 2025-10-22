import React from 'react';

const DashboardLayout = ({ children, userType }) => {
  return (
    <div className='min-h-screen bg-[#050505]'>
      {/* Main Content */}
      <main className='flex-1 p-6 overflow-y-auto'>
        <div className='max-w-7xl mx-auto'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
