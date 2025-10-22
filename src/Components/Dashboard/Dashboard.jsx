import { useRouter } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';

// Import the actual dashboard components
import MentorDashboard from '../Mentor/MentorDashboard';
import LawyerDashboard from './components/LawyerDashboard';
import StudentDashboard from './components/StudentDashboard';

// Common dashboard hook for user role detection
import useUserRole from './hooks/useUserRole';

// Main Dashboard Component
export default function Dashboard() {
  const router = useRouter();
  const { userRole, loading: roleLoading } = useUserRole();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageUpload = (info) => {
    if (window.innerWidth <= 750) {
      message.info('Image popup only available on screens wider than 750px.');
      return;
    }
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const file = info.file.originFileObj;
      if (file) {
        setUploadedImageUrl(URL.createObjectURL(file));
        setIsImageModalOpen(true);
      }
    }
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
    setUploadedImageUrl(null);
  };

  // Show loading while detecting user role
  if (roleLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-black'>
        <div className='text-white'>Loading dashboard...</div>
      </div>
    );
  }

  // Render role-specific dashboard
  if (userRole === 'mentor') {
    return (
      <MentorDashboard
        windowWidth={windowWidth}
        router={router}
        handleImageUpload={handleImageUpload}
        handleImageModalClose={handleImageModalClose}
        isImageModalOpen={isImageModalOpen}
        uploadedImageUrl={uploadedImageUrl}
      />
    );
  }

  if (userRole === 'lawyer') {
    return (
      <LawyerDashboard
        windowWidth={windowWidth}
        router={router}
        handleImageUpload={handleImageUpload}
        handleImageModalClose={handleImageModalClose}
        isImageModalOpen={isImageModalOpen}
        uploadedImageUrl={uploadedImageUrl}
      />
    );
  }

  // Default to student dashboard
  return (
    <StudentDashboard
      windowWidth={windowWidth}
      router={router}
      handleImageUpload={handleImageUpload}
      handleImageModalClose={handleImageModalClose}
      isImageModalOpen={isImageModalOpen}
      uploadedImageUrl={uploadedImageUrl}
    />
  );
}
