import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import {
  BatchmatesIcon,
  HomeIcon,
  HousingIcon,
  JobsIcon,
  LogoIcon,
  LogoutIcon,
  SettingsIcon,
  MessagesIcon,
  MyPostIcon,
} from './Common/SVG/svg.function';
import { getAuthData } from './Auth/Auth.Function';
import { useCrossTabAuth } from './Auth/CrossTabAuthManager';

const Sidebar = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const { logout } = useCrossTabAuth();

  useEffect(() => {
    const detectUserRole = () => {
      try {
        const authData = getAuthData();
        console.log('Auth data:', authData); // Debug log
        console.log('Auth data keys:', authData ? Object.keys(authData) : 'No auth data'); // Debug log

        if (!authData) {
          console.log('No auth data found, defaulting to student');
          setUserRole('student');
          return;
        }

        // Check for userType first (most common)
        if (authData.userType) {
          console.log('Found userType:', authData.userType);
          const roleValue = authData.userType.replace('ROLE_', '').toLowerCase();

          // Map backend roles to frontend roles
          switch (roleValue) {
            case 'realestate':
              setUserRole('pgowner');
              break;
            case 'hr':
              setUserRole('recruiter');
              break;
            case 'alumni':
              setUserRole('alumni');
              break;
            case 'recruiter':
              setUserRole('recruiter');
              break;
            case 'mentor':
              setUserRole('mentor');
              break;
            case 'lawyer':
              setUserRole('lawyer');
              break;
            default:
              setUserRole('student');
          }
          return;
        }

        // Check for roles array
        if (authData.roles && Array.isArray(authData.roles) && authData.roles.length > 0) {
          console.log('Found roles:', authData.roles);
          const firstRole = authData.roles[0];
          let roleValue = '';
          if (typeof firstRole === 'object' && firstRole.role) {
            roleValue = firstRole.role.replace('ROLE_', '').toLowerCase();
          } else if (typeof firstRole === 'string') {
            roleValue = firstRole.replace('ROLE_', '').toLowerCase();
          }

          // Map backend roles to frontend roles
          switch (roleValue) {
            case 'realestate':
              setUserRole('pgowner');
              break;
            case 'hr':
              setUserRole('recruiter');
              break;
            case 'alumni':
              setUserRole('alumni');
              break;
            case 'recruiter':
              setUserRole('recruiter');
              break;
            case 'mentor':
              setUserRole('mentor');
              break;
            case 'lawyer':
              setUserRole('lawyer');
              break;
            default:
              setUserRole('student');
          }
          return;
        }

        // Check for authorities array
        if (
          authData.authorities &&
          Array.isArray(authData.authorities) &&
          authData.authorities.length > 0
        ) {
          const authority = authData.authorities[0];
          console.log('Found authorities:', authData.authorities);
          // Remove 'ROLE_' prefix if present
          const roleValue = authority.replace('ROLE_', '').toLowerCase();

          // Map backend roles to frontend roles
          switch (roleValue) {
            case 'realestate':
              setUserRole('pgowner');
              break;
            case 'hr':
              setUserRole('recruiter');
              break;
            case 'alumni':
              setUserRole('alumni');
              break;
            case 'recruiter':
              setUserRole('recruiter');
              break;
            case 'mentor':
              setUserRole('mentor');
              break;
            case 'lawyer':
              setUserRole('lawyer');
              break;
            default:
              setUserRole('student');
          }
          return;
        }

        // Check for role field (single role)
        if (authData.role) {
          console.log('Found role:', authData.role);
          const roleValue = authData.role.replace('ROLE_', '').toLowerCase();

          // Map backend roles to frontend roles
          switch (roleValue) {
            case 'realestate':
              setUserRole('pgowner');
              break;
            case 'hr':
              setUserRole('recruiter');
              break;
            case 'alumni':
              setUserRole('alumni');
              break;
            case 'recruiter':
              setUserRole('recruiter');
              break;
            case 'mentor':
              setUserRole('mentor');
              break;
            case 'lawyer':
              setUserRole('lawyer');
              break;
            default:
              setUserRole('student');
          }
          return;
        }

        console.log('No role found, defaulting to student');
        // Default to student if no role detected
        setUserRole('student');
      } catch (error) {
        console.error('Error detecting user role:', error);
        setUserRole('student'); // Default fallback
      }
    };

    detectUserRole();
  }, []);

  const handleLogout = async () => {
    logout(); // This will trigger cross-tab logout
  };

  // Helper function to get dashboard route based on user role
  const getDashboardRoute = (role) => {
    switch (role) {
      case 'mentor':
        return '/app/mentor-dashboard';
      case 'lawyer':
        return '/app/lawyer-dashboard';
      case 'alumni':
        return '/app/alumni-dashboard';
      case 'recruiter':
        return '/app/recruiter-dashboard';
      case 'pgowner':
        return '/app/landlord-dashboard';
      default:
        return '/app/student-dashboard';
    }
  };

  console.log('Current userRole:', userRole); // Debug log
  console.log('Home route will be:', getDashboardRoute(userRole)); // Debug log

  // Complete sidebar items array - All possible sidebar items
  const ALL_SIDEBAR_ITEMS = useMemo(
    () => [
      {
        id: 'home',
        key: getDashboardRoute(userRole),
        icon: <HomeIcon />,
        label: 'Home',
        badge: false,
      },
      {
        id: 'housing',
        // key: '/app/room-housing',
        key: '/app/roommate-housing',
        icon: <HousingIcon />,
        label: 'Housing',
        badge: true,
      },
      {
        id: 'jobs',
        key: '/app/jobs',
        icon: <JobsIcon />,
        label: 'Jobs',
        badge: true,
      },
      {
        id: 'batchmates',
        key: '/app/batchmates',
        icon: <BatchmatesIcon />,
        label: 'Batchmates',
        badge: false,
      },
      {
        id: 'messages',
        key: '/app/message',
        icon: <MessagesIcon />,
        label: 'Messages',
        badge: false,
      },
      {
        id: 'settings',
        key: '/app/settings/account',
        icon: <SettingsIcon />,
        label: 'Settings',
        badge: false,
      },
      {
        id: 'landlord-my-post',
        key: '/app/landlord-my-post',
        icon: <MyPostIcon />,
        label: 'My Post',
        badge: false,
      },
    ],
    [userRole]
  );

  // User type sidebar configurations with index values
  const USER_SIDEBAR_CONFIGS = {
    student: [0, 1, 2, 3, 4, 5],
    mentor: [0, 1, 2, 4, 5],
    alumni: [0, 1, 2, 4, 5],
    lawyer: [0, 1, 2, 4, 5],
    recruiter: [0, 1, 2, 4],
    hr: [0, 1, 2, 4],
    'hr-recruiter': [0, 1, 2, 4],
    pgowner: [0, 6, 4, 5],
    landlord: [0, 6, 4, 5],
    owner: [0, 6, 4, 5],
    realestate: [0, 6, 4, 5],
    default: [0, 1, 2, 4, 5, 6],
  };

  // Get sidebar items based on user role
  const getSidebarItemsForUserType = (role) => {
    const userTypeKey = role?.toLowerCase() || 'default';
    const sidebarIndexes = USER_SIDEBAR_CONFIGS[userTypeKey] || USER_SIDEBAR_CONFIGS['default'];

    return sidebarIndexes.map((index) => ALL_SIDEBAR_ITEMS[index]);
  };

  // Define navItems with useMemo to ensure it updates when userRole changes
  const navItems = useMemo(
    () => getSidebarItemsForUserType(userRole),
    [userRole, ALL_SIDEBAR_ITEMS]
  );

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className='lg:hidden fixed  bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-[#1a1a1a] rounded-full shadow-xl px-2 py-2 flex justify-between items-center w-[90%] h-14 max-w-md'>
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <Link
              key={item.key}
              to={item.key}
              className={`relative flex items-center justify-center transition-all duration-200 ${
                isActive ? 'gap-2 px-4 py-2 bg-white rounded-full' : 'px-3'
              }`}
            >
              {/* Icon */}
              {/* <span className='text-base'> */}
              {React.cloneElement(item.icon, {
                fill: isActive ? '#BC5FFF' : '#9CA3AF',
                isActive: isActive,
                size: 24,
              })}
              {/* </span> */}

              {/* Label shown only if active */}
              {isActive && (
                <span className='text-sm font-medium text-[#1a1a1a] whitespace-nowrap'>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Desktop Sidebar */}
      <div className='hidden lg:flex fixed left-0 top-0 bottom-0 z-50 bg-[#131313] w-[200px] flex-col justify-between h-screen'>
        <div>
          <div className='flex items-center px-5 mb-8 h-16'>
            <Link to={getDashboardRoute(userRole)} className='flex gap-2 items-center'>
              <LogoIcon />
              <span className='text-xl font-bold text-white'>Metie</span>
            </Link>
          </div>

          <div className='flex flex-col gap-1 px-4'>
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.key}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  location.pathname === item.key
                    ? 'bg-white text-black font-medium'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                }`}
              >
                {/* <span
                  className={`bg-red-500 ${location.pathname === item.key ? 'text-[#BC5FF]' : 'text-gray-400'
                    }`}
                > */}
                {React.cloneElement(item.icon, {
                  fill: location.pathname === item.key ? '#BC5FFF' : '#9CA3AF',
                  isActive: location.pathname === item.key,
                })}
                {/* </span> */}
                <span
                  className={` ${
                    location.pathname === item.key ? 'text-[#BC5FF]' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className='px-4 mb-4'>
          <div className='pt-4 mt-2 border-t border-gray-800'>
            <Link
              to='/login'
              onClick={handleLogout}
              className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-gray-200 transition-colors'
            >
              <span className='text-lg'>
                <LogoutIcon />
              </span>
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
