import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from '@tanstack/react-router';
import { BackButtonIcon } from '../../Common/SVG/svg.function';
import PostRequirement from '../../Common/PostRequirement';
import { getAuthData } from '../../Auth/Auth.Function';

export default function HouseHunt() {
  const router = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

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
      case 'hr':
        return '/app/recruiter-dashboard';
      case 'pgowner':
      case 'realestate':
        return '/app/landlord-dashboard';
      default:
        return '/app/student-dashboard';
    }
  };

  // Get user role and determine dashboard route
  const getUserDashboardRoute = () => {
    try {
      const authData = getAuthData();

      if (!authData) {
        return '/app/student-dashboard';
      }

      // Check for userType first (most common)
      if (authData.userType) {
        const roleValue = authData.userType.replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(roleValue);
      }

      // Check for roles array
      if (authData.roles && Array.isArray(authData.roles) && authData.roles.length > 0) {
        const roleValue = authData.roles[0].replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(roleValue);
      }

      // Check for authorities array
      if (
        authData.authorities &&
        Array.isArray(authData.authorities) &&
        authData.authorities.length > 0
      ) {
        const authority = authData.authorities[0];
        const role = authority.replace('ROLE_', '').toLowerCase();
        return getDashboardRoute(role);
      }

      // Default to student dashboard
      return '/app/student-dashboard';
    } catch (error) {
      console.error('Error getting user dashboard route:', error);
      return '/app/student-dashboard';
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // check once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='bg-secondary text-white min-h-screen p-6 rounded-xl'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-2'>
          <div className='flex items-center gap-4'>
            {isMobile && (
              <Link
                className='rounded-full p-2'
                onClick={() => router({ to: getUserDashboardRoute() })}
              >
                <BackButtonIcon size={20} />
              </Link>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-1 gap-8'>
          {/* Left Column - Post Your Requirement */}
          <div className='bg-secondary rounded-2xl p-2'>
            <PostRequirement cardSize='default' showTitle={true} title='Post Your Requirement' />
          </div>

          {/* Right Column - Information */}
          <div className='bg-[#131313] rounded-2xl p-6'></div>
        </div>
      </div>
    </div>
  );
}
