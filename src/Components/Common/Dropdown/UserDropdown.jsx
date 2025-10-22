import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';
import {
  ChevronDown,
  ChevronRight,
  User,
  Users,
  Briefcase,
  Bookmark,
  Home,
  Settings,
  Headphones,
  LogOut,
  Edit2,
  Users2,
  UserCheck,
  GraduationCap,
  Building,
} from 'lucide-react';
import { Edit2Icon, EditIcon } from '../SVG/svg.function';

// Helper function to get initials from full name
const getInitialAvatar = (name) => {
  if (!name) return '';
  const initials = name
    .trim()
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  return initials.length > 2 ? initials.substring(0, 2) : initials;
};

const UserDropdown = ({ open, setOpen, profileData, loading, error }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  // Menu items configuration
  const menuItems = [
    { id: 'personal', icon: User, text: 'My Personal Info', path: '/app/student-dashboard' },
    { id: 'session', icon: Users, text: 'My Session', path: '/app/session' },
    { id: 'batchmates', icon: Users2, text: 'My Batchmates', path: '/app/batchmates' },
    { id: 'bookmarks', icon: Bookmark, text: 'Bookmarks', path: '/bookmarks' },
    { id: 'job', icon: Briefcase, text: 'Job & Internship', path: '/jobs' },
    { id: 'settings', icon: Settings, text: 'Settings', path: '/settings' },
    { id: 'support', icon: Headphones, text: 'Help & Support', path: '/support' },
  ];

  const handleItemClick = (path) => {
    navigate({ to: path });
    setOpen(true);
  };

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate({ to: '/login' });
  };

  const handleEditProfile = () => {
    navigate({ to: '/app/profile' });
    setOpen(false);
  };

  // Construct full image URL or return null if no photo
  const getProfileImageUrl = () => {
    if (!profileData.photoUrl) return null;
    if (profileData.photoUrl.startsWith('http')) return profileData.photoUrl;
    return `${URL}${profileData.photoUrl}`;
  };

  // Render avatar with initials if no photo
  const renderAvatar = (size = 'w-10 h-10') => {
    const imageUrl = getProfileImageUrl();
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt='User'
          className={`${size} rounded-full object-cover`}
          onError={(e) => {
            e.target.src = '';
            e.target.onerror = null;
            e.target.parentElement.innerHTML = `
              <div class="${size} rounded-full bg-gray-700 flex items-center justify-center">
                <span class="text-lg font-bold text-white">
                  ${getInitialAvatar(profileData.fullName)}
                </span>
              </div>
            `;
          }}
        />
      );
    }
    return (
      <div className={`${size} rounded-full bg-gray-700 flex items-center justify-center`}>
        <span className='text-lg font-bold text-white'>
          {getInitialAvatar(profileData.fullName)}
        </span>
      </div>
    );
  };

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Dropdown trigger */}
      <div
        className={`flex items-center bg-cardblack rounded-full ${isSmallScreen ? 'p-1' : 'pl-1 pr-3 py-1'} hover:bg-gray-700 cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <div className='w-10 h-10 rounded-full overflow-hidden'>
          {loading ? (
            <div className='w-full h-full bg-gray-600 animate-pulse rounded-full' />
          ) : error ? (
            <div className='w-full h-full bg-gray-700 rounded-full flex items-center justify-center'>
              <span className='text-sm font-bold text-white'>U</span>
            </div>
          ) : (
            renderAvatar()
          )}
        </div>

        {/* Only show name and chevron on larger screens */}
        {!isSmallScreen && (
          <>
            <span className='ml-2 mr-2 text-white text-md'>
              {loading ? 'Loading...' : error ? 'User' : profileData.fullName}
            </span>
            <ChevronDown size={16} />
          </>
        )}
      </div>

      {/* Dropdown menu */}
      {open && (
        <div
          className={`absolute ${isSmallScreen ? 'left-0' : 'right-0'} top-full mt-2 bg-cardblack text-white w-64 rounded-lg shadow-lg z-50 overflow-hidden`}
          style={
            isSmallScreen
              ? {
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  position: 'fixed',
                  width: 'calc(100vw - 2rem)',
                  left: '1rem',
                  right: '1rem',
                }
              : {}
          }
        >
          {/* Profile section */}
          <div className='p-4 flex items-center justify-between border-b border-gray-800'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 rounded-full overflow-hidden'>
                {loading ? (
                  <div className='w-full h-full bg-gray-600 animate-pulse rounded-full' />
                ) : error ? (
                  <div className='w-full h-full bg-gray-700 rounded-full flex items-center justify-center'>
                    <span className='text-sm font-bold text-white'>U</span>
                  </div>
                ) : (
                  renderAvatar()
                )}
              </div>
              <div>
                <div className='font-medium'>
                  {loading ? 'Loading...' : error ? 'User' : profileData.fullName}
                </div>
                {isSmallScreen && <div className='text-sm text-gray-300'>Welcome Back!</div>}
              </div>
            </div>
            <a className='p-1 rounded hover:bg-gray-700' onClick={handleEditProfile}>
              <Edit2Icon size={18} className='text-gray-400' />
            </a>
          </div>

          {/* Menu items */}
          <div className='px-2 pb-2'>
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.path)}
                className='flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer'
              >
                <div className='flex items-center space-x-3'>
                  <item.icon size={20} className='text-white' />
                  <span className='text-white'>{item.text}</span>
                </div>
                <ChevronRight size={18} className='text-gray-400' />
              </div>
            ))}

            {/* Logout button - hidden on large screens (1024px and above) */}
            {!isLargeScreen && (
              <div
                className='flex items-center space-x-3 p-3 text-red-500 hover:bg-gray-800 bg-black rounded-lg cursor-pointer mt-2'
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span>Log out</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
