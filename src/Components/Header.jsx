import { BellOutlined, MessageOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Edit2Icon,
  HeaderMessagesIcon,
  MessagesIcon,
  MoonIcon,
  SearchIcon,
  StarsIcon,
  SunIcon,
} from './Common/SVG/svg.function';
import {
  ChevronDown,
  ChevronRight,
  User,
  Users,
  GraduationCap,
  Users2,
  Briefcase,
  Bookmark,
  Home,
  Settings,
  Headphones,
  LogOut,
  Edit2,
} from 'lucide-react';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { getAuthData, getAuthHeaders } from './Auth/Auth.Function';
import { useCrossTabAuth } from './Auth/CrossTabAuthManager';
import { useIsMobile } from '../hooks/useMobile';
import { cn } from '@/lib/utils';
import { MessageIcon } from './Settings/Settings.svg';

// Complete menu items array - All possible menu items
const ALL_MENU_ITEMS = [
  {
    id: 'personal',
    icon: User,
    text: 'My Personal Info',
    path: '/app/personal-info',
  },
  {
    id: 'session',
    icon: Users,
    text: 'My Session',
    path: '/app/sessions',
  },
  {
    id: 'batchmates',
    icon: Users2,
    text: 'My Batchmates',
    path: '/app/batchmates',
  },
  {
    id: 'bookmarks',
    icon: Bookmark,
    text: 'Bookmarks',
    path: '/app/bookmarks',
  },
  {
    id: 'jobs',
    icon: Briefcase,
    text: 'My Jobs',
    path: '/app/jobs',
  },
  {
    id: 'jobs-internship',
    icon: Briefcase,
    text: 'Jobs & Internship',
    path: '/app/jobs',
  },
  {
    id: 'cases',
    icon: Briefcase,
    text: 'My Cases',
    path: '/app/my-cases',
  },
  {
    id: 'mentors',
    icon: Users,
    text: 'My Mentors',
    path: '/app/mentor',
  },
  {
    id: 'alumni',
    icon: User,
    text: 'My Alumni',
    path: '/app/alumni',
  },
  {
    id: 'lawyers',
    icon: Briefcase,
    text: 'My Lawyers',
    path: '/app/lawyer',
  },
  {
    id: 'availability',
    icon: Users,
    text: 'Availability Preferences',
    path: '/app/availability',
  },
  {
    id: 'transactions',
    icon: Briefcase,
    text: 'Transactions',
    path: '/app/transactions',
  },
  {
    id: 'gigs',
    icon: Briefcase,
    text: 'Gigs',
    path: '/app/gigs',
  },
  {
    id: 'compliance',
    icon: Settings,
    text: 'Compliance',
    path: '/app/compliance',
  },
  {
    id: 'complaints',
    icon: Settings,
    text: 'Complaints',
    path: '/app/compliance',
  },
  {
    id: 'settings',
    icon: Settings,
    text: 'room & Housing',
    // path: '/app/roommate-housing',
    path: '/app/room-housing',
  },
  {
    id: 'support',
    icon: Headphones,
    text: 'Help & Support',
    path: '/app/support',
  },
];

// User type menu configurations with index values
const USER_MENU_CONFIGS = {
  student: [0, 1, 2, 3, 4, 6, 15, 16],
  user: [0, 1, 2, 3, 4, 6, 15, 16],
  mentor: [0, 1, 10, 11, 12, 13, 3, 5, 15, 16],
  alumni: [0, 1, 10, 11, 12, 13, 3, 5, 15, 16],
  lawyer: [0, 1, 10, 11, 12, 13, 3, 4, 15, 16],
  'hr-recruiter': [0, 14, 15, 16],
  hr: [0, 14, 15, 16],
  owner: [0, 14, 16],
  landlord: [0, 14, 16],
  realestate: [0, 14, 16],
  default: [0, 1, 3, 15, 16],
};

// Menu configurations for different user types
const getMenuItemsForUserType = (userType) => {
  const userTypeKey = userType?.toLowerCase() || 'default';
  const menuIndexes = USER_MENU_CONFIGS[userTypeKey] || USER_MENU_CONFIGS['default'];

  return menuIndexes.map((index) => ALL_MENU_ITEMS[index]);
};

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

const Header = () => {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [darkMode, setDarkMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    photoUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userType, setUserType] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useCrossTabAuth();

  // Clear any stored data when component mounts
  useEffect(() => {
    // Clear any stored sensitive data
    sessionStorage.removeItem('resetEmail');
    localStorage.removeItem('password');
    localStorage.removeItem('searchHistory');
    sessionStorage.removeItem('searchHistory');
  }, []);

  // Fetch profile data with headers
  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      const authData = getAuthData();
      if (!authData?.token) {
        throw new Error('No authentication token found');
      }

      // Set user type from auth data
      setUserType(authData.userType);

      const response = await axios.get(`${URL}/api/user/profile/info`, {
        headers: getAuthHeaders(),
      });

      setProfileData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Failed to load profile data');
      message.error(err.response?.data?.message || 'Failed to load profile data');
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('authData');
        sessionStorage.removeItem('authData');
        navigate({ to: '/login' });
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfileData();
  }, [navigate]);

  // Listen for profile update events to refresh header instantly
  useEffect(() => {
    const handleProfileUpdate = () => {
      fetchProfileData();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [fetchProfileData]);

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
  }, []);

  // Check user's preferred color scheme and saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log('Searching for:', searchQuery);
  };

  // Dropdown menu items - dynamically generated based on user type
  const menuItems = getMenuItemsForUserType(userType);

  const handleItemClick = (path) => {
    console.log('handleItemClick ', path);
    navigate({ to: path });
    setOpen(false);
  };

  const handleLogout = async () => {
    logout(); // This will trigger cross-tab logout
  };

  const handleEditProfile = () => {
    navigate({ to: '/app/profile' });
    setOpen(false);
  };

  // Construct full image URL or return null if no photo
  const getProfileImageUrl = () => {
    if (!profileData.photoUrl) return null;
    if (profileData.photoUrl.startsWith('http')) return profileData.photoUrl;
    return `${URL}/${profileData.photoUrl}`;
  };

  // Render avatar with initials if no photo
  const renderAvatar = (size = 'w-12 h-12') => {
    const imageUrl = getProfileImageUrl();
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt='User'
          className={`object-cover rounded-full ${size}`}
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
      <div className={`flex justify-center items-center bg-gray-700 rounded-full ${size}`}>
        <span className='text-lg font-bold text-white'>
          {getInitialAvatar(profileData.fullName)}
        </span>
      </div>
    );
  };

  const textRef = useRef(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const lines = Math.round(el.offsetHeight / lineHeight);
      setIsWrapped(lines > 1);
    }
  }, [loading, error, profileData.fullName]);

  const IsMobile = useIsMobile();

  const renderProfilebar = () => {
    return (
      <div className='relative' ref={dropdownRef}>
        <div
          className={cn(
            'inline-flex gap-3 justify-start items-center rounded-full transition-colors duration-200 cursor-pointer',
            {
              'bg-neutral-700/50': open,
              'min-w-[160px] max-w-[200px] h-[50px] bg-neutral-800 hover:bg-neutral-700': !IsMobile,
            }
          )}
          onClick={toggleDropdown}
        >
          <div className='flex justify-start items-center'>
            <div className='overflow-hidden w-[50px] h-[50px] rounded-full'>
              {loading ? (
                <div className='w-full h-full bg-gray-600 rounded-full animate-pulse' />
              ) : error ? (
                <div className='flex justify-center items-center w-full h-full bg-gray-700 rounded-full'>
                  <span className='text-sm font-bold text-white'>U</span>
                </div>
              ) : (
                renderAvatar('w-[50px] h-[50px]')
              )}
            </div>
          </div>

          <div className='flex flex-1 justify-between items-center pr-2'>
            <div className='flex-1 mr-2 min-w-0'>
              {IsMobile && (
                <span className='text-sm font-medium leading-tight text-white'>Welcome Back!</span>
              )}
              <div
                ref={textRef}
                className={cn('font-medium text-white break-words hyphens-auto', {
                  'text-base leading-snug text-ellipsis': !IsMobile && !isWrapped,
                  'text-sm leading-snug': !IsMobile && isWrapped,
                  'text-xl font-bold leading-tight': IsMobile,
                })}
              >
                {loading ? 'Loading...' : error ? 'User' : profileData.fullName}
              </div>
            </div>

            {!IsMobile && (
              <div className='flex flex-shrink-0 justify-center items-center w-4 h-4'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='text-white'>
                  <path
                    d='M6 9L12 15L18 9'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {open && (
          <div
            className={`z-50 overflow-hidden text-white transition-all shadow-lg bg-cardblack ${
              IsMobile
                ? 'fixed top-0 right-0 w-full h-[calc(100vh-0px)]'
                : 'absolute right-0 top-16 w-64 rounded-2xl'
            }`}
          >
            {/* Profile */}
            <div
              className={`flex items-center space-x-5 border-b border-gray-800 ${IsMobile ? 'p-6' : 'p-4'}`}
            >
              <div className={`overflow-hidden rounded-full w-[50px] h-[50px]`}>
                {loading ? (
                  <div className='w-full h-full bg-gray-600 rounded-full animate-pulse' />
                ) : error ? (
                  <div className='flex justify-center items-center w-full h-full bg-gray-700 rounded-full'>
                    <span className={`font-bold text-white ${IsMobile ? 'text-xl' : 'text-lg'}`}>
                      U
                    </span>
                  </div>
                ) : (
                  renderAvatar('w-[50px] h-[50px]')
                )}
              </div>
              <div className='flex-1 mr-2 min-w-0'>
                {IsMobile && (
                  <span className='text-sm font-medium leading-tight text-white'>
                    Welcome Back!
                  </span>
                )}
                <div
                  ref={textRef}
                  className={cn('font-medium text-white break-words hyphens-auto', {
                    'text-base leading-snug text-ellipsis': !IsMobile && !isWrapped,
                    'text-sm leading-snug': !IsMobile && isWrapped,
                    'text-xl font-bold leading-tight': IsMobile,
                  })}
                >
                  {loading ? 'Loading...' : error ? 'User' : profileData.fullName}
                </div>
              </div>

              <Button
                className='p-1 ml-auto bg-transparent border-none shadow-none hover:bg-transparent'
                onClick={handleEditProfile}
              >
                <Edit2Icon size={18} className='text-gray-400' />
              </Button>
            </div>

            <div className='mx-5 h-[1px] bg-gray-500 rounded-full' />

            {/* Menu Items */}
            <div
              className={`overflow-y-auto ${IsMobile ? 'flex-1 px-2 py-4' : 'pb-3 max-h-[60vh]'}`}
            >
              {menuItems.map((item, index) => (
                <Button
                  key={item.id}
                  className={`flex items-center w-full text-left border-0 transition-colors hover:bg-gray-800 bg-cardblack ${
                    IsMobile ? 'px-6 py-4 mb-2 rounded-lg' : 'px-4 py-5'
                  }`}
                  onClick={() => handleItemClick(item.path)}
                >
                  <item.icon
                    size={IsMobile ? 24 : 22}
                    className={`text-white ${IsMobile ? 'mr-6' : 'mr-4'}`}
                  />
                  <span className={`flex-1 text-white ${IsMobile ? 'text-base font-medium' : ''}`}>
                    {item.text}
                  </span>
                  <ChevronRight size={IsMobile ? 20 : 18} className='text-gray-400' />
                </Button>
              ))}
            </div>

            {/* Logout */}
            {IsMobile && (
              <div className='absolute right-0 bottom-0 left-0 border-t border-gray-800'>
                <Button
                  className='flex justify-start items-center pl-10 w-full h-20 text-red-500 bg-black rounded-none border-0 shadow-none transition-colors hover:bg-red-500 hover:text-white'
                  onClick={handleLogout}
                >
                  <LogOut size={20} className='mr-3' />
                  <span className='font-medium'>Log out</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className='flex justify-between items-center px-3 py-3 w-full h-full text-white bg-black dark:bg-dark'>
      {/* <div className='flex justify-between items-center px-4 w-full'> */}
      {/* Left section */}
      <div className=' rounded-full flex justify-center items-center lg:ml-[200px]'>
        {IsMobile ? (
          // Mobile user avatar + name
          renderProfilebar()
        ) : (
          // Desktop search bar
          <form
            onSubmit={handleSearchSubmit}
            className='w-[270px] h-[56px] rounded-[33px] flex items-center bg-[#1A1B24] px-4'
          >
            <SearchIcon className='mr-2' />
            <Input
              type='search'
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder='Search...'
              className='bg-transparent border-none outline-none placeholder-[#959497] text-white w-full text-lg'
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              spellCheck='false'
            />
            <StarsIcon className='ml-2' />
          </form>
        )}
      </div>

      {/* Right section */}
      <div className='flex items-center px-5 space-x-1 md:space-x-2'>
        {/* Dark mode toggle */}
        {!IsMobile && (
          <div
            className='flex items-center w-[105px] h-[50px] bg-gray-800 rounded-full cursor-pointer'
            onClick={toggleDarkMode}
          >
            <div className={`flex relative items-center w-full h-7`}>
              <div
                className={`absolute h-[50px] w-[50px] rounded-full transition-all duration-300 flex items-center justify-center
                          ${darkMode ? 'right-0 bg-purple-600' : 'left-0 bg-gray-600'}`}
              >
                {darkMode ? <MoonIcon className='text-yellow-300' /> : <SunIcon />}
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div
          className='flex relative justify-center items-center w-16 h-16 rounded-full cursor-pointer bg-cardblack hover:bg-gray-700'
          onClick={() => navigate({ to: '/app/notifications' })}
        >
          <BellOutlined className='text-xl text-white' />
          <span className='absolute top-5 right-5 w-2 h-2 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center'></span>
        </div>

        {/* Chat */}
        {!IsMobile && (
          <div
            className='flex relative justify-center items-center w-16 h-16 rounded-full cursor-pointer bg-cardblack hover:bg-gray-700'
            onClick={() => navigate({ to: '/app/message' })}
          >
            <HeaderMessagesIcon className='text-xl text-white' />
            <span className='flex absolute top-4 right-4 justify-center items-center w-4 h-4 text-[10px] text-white bg-red-500 rounded-full'>
              3
            </span>
          </div>
        )}

        {/* User dropdown */}
        {!IsMobile && renderProfilebar()}
      </div>
      {/* </div> */}
    </header>
  );

  // return (
  //   <header className='mb-0 w-full text-white bg-black dark:bg-dark'>
  //     {/* Mobile Header */}
  //     <div className='md:hidden'>
  //       {/* User greeting section */}
  //       <div className='flex justify-between items-center px-4 py-3'>
  //         <div
  //           className='flex items-center space-x-3 cursor-pointer'
  //           onClick={toggleDropdown} // mobile avatar/name toggles dropdown
  //           ref={dropdownRef} // safe to reuse: only mobile OR desktop renders at a time
  //         >
  //           <div className='overflow-hidden w-12 h-12 rounded-full'>
  //             {loading ? (
  //               <div className='w-full h-full bg-gray-600 rounded-full animate-pulse' />
  //             ) : error ? (
  //               <div className='flex justify-center items-center w-full h-full bg-gray-700 rounded-full'>
  //                 <span className='text-lg font-bold text-white'>l</span>
  //               </div>
  //             ) : (
  //               renderAvatar('w-12 h-12') // use same size as desktop avatar for consistent look
  //             )}
  //           </div>
  //           <div className='flex items-center space-x-2'>
  //             <h2 className='text-lg font-medium leading-none'>
  //               {loading ? 'Loading...' : error ? 'User' : profileData.fullName}
  //             </h2>
  //             {/* dropdown chevron to match desktop */}
  //             <ChevronDown size={16} className='text-white' />
  //           </div>
  //         </div>

  //         <div
  //           className='flex relative justify-center items-center w-8 h-8 rounded-full cursor-pointer bg-cardblack hover:bg-gray-700'
  //           onClick={() => navigate({ to: '/app/notifications' })}
  //         >
  //           <BellOutlined className='text-lg text-white' />
  //           <span className='absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center'>
  //             1
  //           </span>
  //         </div>
  //       </div>

  //       {/* Mobile dropdown: rendered when `open` is true (same structure as desktop but mobile-friendly positioning) */}
  //       {open && (
  //         <div className='px-5'>
  //           <div className='overflow-hidden absolute right-4 left-4 top-16 z-50 w-auto text-white rounded-lg shadow-lg transition-all bg-cardblack'>
  //             {/* Profile section */}
  //             <div className='flex items-center p-4 border-b border-gray-800'>
  //               <div className='overflow-hidden w-12 h-12 rounded-full'>
  //                 {loading ? (
  //                   <div className='w-full h-full bg-gray-600 rounded-full animate-pulse' />
  //                 ) : error ? (
  //                   <div className='flex justify-center items-center w-12 h-12 bg-gray-700 rounded-full'>
  //                     <span className='text-lg font-bold text-white'>U</span>
  //                   </div>
  //                 ) : (
  //                   renderAvatar('w-12 h-12')
  //                 )}
  //               </div>
  //               <div className='ml-3'>
  //                 <h2 className='text-lg font-medium'>
  //                   {loading ? 'Loading...' : error ? 'User' : profileData.fullName}
  //                 </h2>
  //               </div>
  //               <Button
  //                 className='p-1 ml-auto bg-transparent border-none shadow-none hover:bg-transparent'
  //                 onClick={handleEditProfile}
  //               >
  //                 <Edit2Icon size={18} className='text-gray-400' />
  //               </Button>
  //             </div>

  //             {/* Menu items */}
  //             <div className='max-h-[60vh] overflow-y-auto'>
  //               {menuItems.map((item) => (
  //                 <Button
  //                   key={item.id}
  //                   className='flex items-center px-4 py-4 w-full text-left border-b border-gray-800 transition-colors hover:bg-gray-800 bg-cardblack'
  //                   onClick={() => handleItemClick(item.path)}
  //                 >
  //                   <item.icon size={22} className='mr-4 text-white' />
  //                   <span className='flex-1 text-white'>{item.text}</span>
  //                   <ChevronRight size={18} className='text-gray-400' />
  //                 </Button>
  //               ))}
  //             </div>

  //             {/* Logout button (kept commented as in your original) */}
  //             <div className='px-4 py-3'>
  //               <Button
  //                 className='flex items-center py-5 w-full text-red-500 bg-transparent border-none shadow-none transition-colors hover:text-red-400'
  //                 onClick={handleLogout}
  //               >
  //                 <LogOut size={20} className='' />
  //                 <span>Log out</span>
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Search bar (currently disabled) */}
  //       {/*
  //   <div className="px-4 mt-2">
  //     <form onSubmit={handleSearchSubmit} className="w-full">
  //       <div className="w-full bg-[#1A1B24] rounded-full flex items-center py-2 px-3">
  //         <SearchIcon className="mr-2 searchbtngray" />
  //         <Input
  //           type="search"
  //           value={searchQuery}
  //           onChange={handleSearchChange}
  //           placeholder="Search..."
  //           className="w-full text-base text-white bg-transparent border-none outline-none placeholder-foundationgray"
  //           autoComplete="off"
  //           autoCorrect="off"
  //           autoCapitalize="off"
  //           spellCheck="false"
  //         />
  //       </div>
  //     </form>
  //   </div>
  //   */}
  //     </div>

  //     {/* Desktop Header */}
  //     <div className='hidden justify-between items-center p-3 w-full md:flex'>
  //       {/* Search bar */}

  //       <div className='w-[270px] h-[56px] rounded-[33px] py-17 px-22 lg:ml-[200px]'>
  //         <form onSubmit={handleSearchSubmit} className='w-full h-full'>
  //           <div className='bg-[#1A1B24] rounded-full flex items-center w-full h-full pl-4'>
  //             <SearchIcon />
  //             <Input
  //               type='search'
  //               value={searchQuery}
  //               onChange={handleSearchChange}
  //               placeholder='Search...'
  //               className='bg-transparent border-none focus:border-none focus:outline-none focus:ring-0 text-white placeholder-[#959497] w-full text-lg'
  //               autoComplete='off'
  //               autoCorrect='off'
  //               autoCapitalize='off'
  //               spellCheck='false'
  //             />
  //             <StarsIcon className='mr-2' />
  //           </div>
  //         </form>
  //       </div>

  //       {/* Right side icons */}
  //       <div className='flex items-center space-x-6 mr-[42px]'>
  //         {/* Theme toggle */}
  //         <div
  //           className='flex items-center p-1 w-16 bg-gray-800 rounded-full cursor-pointer'
  //           onClick={toggleDarkMode}
  //         >
  //           <div className={`flex relative items-center w-full h-7`}>
  //             <div
  //               className={`absolute h-10 w-10 rounded-full transition-all duration-300 flex items-center justify-center
  //                         ${darkMode ? 'right-0 bg-purple-600' : 'left-0 bg-gray-600'}`}
  //             >
  //               {darkMode ? <MoonIcon className='text-yellow-300' /> : <SunIcon />}
  //             </div>
  //           </div>
  //         </div>

  //         {/* Notification bell */}
  //         <div
  //           className='flex relative justify-center items-center w-12 h-12 rounded-full cursor-pointer bg-cardblack hover:bg-gray-700'
  //           onClick={() => navigate({ to: '/app/notifications' })}
  //         >
  //           <BellOutlined className='text-xl text-white' />
  //           <span className='absolute top-2 right-2 w-3.5 h-3.5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center'>
  //             1
  //           </span>
  //         </div>

  //         {/* Chat icon */}
  //         <div
  //           className='flex relative justify-center items-center w-12 h-12 rounded-full cursor-pointer bg-cardblack hover:bg-gray-700'
  //           onClick={() => navigate({ to: '/app/message' })}
  //         >
  //           <MessageOutlined className='text-xl text-white' />
  //           <span className='absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full top-1.5 right-1.5'>
  //             3
  //           </span>
  //         </div>

  //         {/* Custom User dropdown */}
  //         <div className='relative' ref={dropdownRef}>
  //           <div
  //             className='flex items-center py-1 pr-3 pl-1 rounded-full cursor-pointer bg-cardblack hover:bg-gray-700'
  //             onClick={toggleDropdown}
  //           >
  //             <div className='overflow-hidden w-12 h-12 rounded-full'>
  //               {loading ? (
  //                 <div className='w-full h-full bg-gray-600 rounded-full animate-pulse' />
  //               ) : error ? (
  //                 <div className='flex justify-center items-center w-12 h-12 bg-gray-700 rounded-full'>
  //                   <span className='text-sm font-bold text-white'>U</span>
  //                 </div>
  //               ) : (
  //                 renderAvatar('w-12 h-12')
  //               )}
  //             </div>
  //             <span className='mr-2 ml-2 text-white text-md'>
  //               {loading ? 'Loading...' : error ? 'User' : profileData.fullName}
  //             </span>
  //             <ChevronDown size={16} />
  //           </div>

  //           {/* Custom dropdown menu */}
  //           {open && (
  //             <div className='overflow-hidden absolute right-0 z-50 w-64 text-white rounded-2xl shadow-lg transition-all top-22 bg-cardblack'>
  //               {/* Profile section */}
  //               <div className='flex items-center p-4 border-b border-gray-800'>
  //                 <div className='overflow-hidden w-12 h-12 rounded-full'>
  //                   {loading ? (
  //                     <div className='w-full h-full bg-gray-600 rounded-full animate-pulse' />
  //                   ) : error ? (
  //                     <div className='flex justify-center items-center w-12 h-12 bg-gray-700 rounded-full'>
  //                       <span className='text-lg font-bold text-white'>U</span>
  //                     </div>
  //                   ) : (
  //                     renderAvatar('w-12 h-12')
  //                   )}
  //                 </div>
  //                 <div className='ml-3'>
  //                   <h2 className='text-lg font-medium'>
  //                     {loading ? 'Loading...' : error ? 'User' : profileData.fullName}
  //                   </h2>
  //                 </div>
  //                 <Button
  //                   className='p-1 ml-auto bg-transparent border-none shadow-none hover:bg-transparent'
  //                   onClick={handleEditProfile}
  //                 >
  //                   <Edit2Icon size={18} className='text-gray-400' />
  //                 </Button>
  //               </div>

  //               {/* Menu items */}
  //               <div className='overflow-y-auto max-h-screen'>
  //                 {menuItems.map((item) => (
  //                   <Button
  //                     key={item.id}
  //                     className='flex items-center px-4 py-3 w-full text-left border-b border-gray-800 transition-colors hover:bg-gray-800 bg-cardblack'
  //                     onClick={() => handleItemClick(item.path)}
  //                   >
  //                     <item.icon size={22} className='mr-4 text-white' />
  //                     <span className='flex-1 text-white'>{item.text}</span>
  //                     <ChevronRight size={18} className='text-gray-400' />
  //                   </Button>
  //                 ))}
  //               </div>

  //               {/* Logout button */}
  //               <div className='px-4 py-3'>
  //                 {/* <Button
  //               className="flex items-center py-2 w-full text-red-500 bg-transparent border-none shadow-none transition-colors hover:text-red-400"
  //               onClick={handleLogout}
  //             >
  //               <LogOut size={20} className="mr-4" />
  //               <span>Log out</span>
  //             </Button> */}
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </header>
  // );
};

export default Header;
