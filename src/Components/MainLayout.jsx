import { Outlet } from '@tanstack/react-router';
import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CrossTabAuthProvider from './Auth/CrossTabAuthManager';

const { Content } = Layout;

const MainLayout = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);
  const sidebarWidth = 200;

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CrossTabAuthProvider>
      <div className='relative h-screen overflow-hidden'>
        {/* Fixed Header */}
        <div className='fixed top-0 left-0 right-0 z-50 h-16 '>
          <Header />
        </div>

        <Layout style={{ paddingTop: '85px', height: '100vh' }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <Content
            className='relative p-6 bg-black'
            style={{
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
              marginLeft: isWideScreen ? `${sidebarWidth}px` : '0px',
              transition: 'margin-left 0.3s',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </div>
    </CrossTabAuthProvider>
  );
};

export default MainLayout;
