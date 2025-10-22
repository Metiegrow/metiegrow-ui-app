import React from 'react';
import { ArrowLeft, MapPin, Users, Calendar, ExternalLink, X } from 'lucide-react';
import { ArrowLeftIcon } from '../Common/SVG/svg.function';
import { Button } from 'antd';
import { Link, useNavigate } from '@tanstack/react-router';

const OVERVIEW_MAX_WORDS = 120;

const OverviewContent = () => {
  const fullText = `MC Info Tech Pvt Ltd is a leading technology services and consulting company dedicated to creating innovative solutions that address the most complex digital transformation challenges. By leveraging a comprehensive portfolio across consulting, design, engineering, and operations, we empower clients to achieve their boldest goals and build sustainable, future-ready businesses. With a strong team of professionals and partners operating across multiple countries, we are committed to helping our clients, employees, and communities thrive in a constantly evolving world. For more information, visit us at www.mcinfotech.com.`;
  const words = fullText.split(/\s+/);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const navigate = useNavigate();

  const displayedText = isExpanded
    ? fullText
    : words.slice(0, OVERVIEW_MAX_WORDS).join(' ') +
      (words.length > OVERVIEW_MAX_WORDS ? '...' : '');
  const shouldShowViewMore = words.length > OVERVIEW_MAX_WORDS;

  return (
    <>
      <p className='text-gray-300 leading-relaxed mb-4'>{displayedText}</p>
      {shouldShowViewMore && (
        <Link
          onClick={() => setIsExpanded(!isExpanded)}
          className='text-purple-400 hover:text-purple-300 font-medium cursor-pointer'
        >
          {isExpanded ? 'View Less' : 'View More'}
        </Link>
      )}
    </>
  );
};

const JobListingUI = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col md:flex-row text-white min-h-screen'>
      {/* Left Side - Main Job Detail (700px width) */}
      <div className='w-full md:w-[800px] p-6'>
        {/* Back Button */}
        <div className='flex items-center mb-6'>
          <ArrowLeftIcon className='w-5 h-5 mr-2' />
          <span className='text-gray-300'>Back</span>
        </div>

        {/* Main Job Card */}
        <div className='bg-cardblack rounded-[24px] p-6 mb-6'>
          <div className='flex items-start md:items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4'>
                <span className='text-white font-bold text-lg'>MC</span>
              </div>
              <div>
                <h1 className='text-2xl font-bold text-white'>Product Designer</h1>
                <p className='text-blue-400'>MC Info Tech PVT Ltd</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-gray-300'>Exp 0 - 1yrs | 10K AUSD</p>
            </div>
          </div>

          {/* Skills */}
          <div className='mb-4'>
            <span className='text-purple-400 text-sm'>Skills:</span>
            <div className='flex flex-wrap gap-2 mt-2'>
              {['Product Management', 'Strategist', 'Analyst', 'New Ideas'].map((skill) => (
                <span
                  key={skill}
                  className='bg-gray-600 px-3 py-1 rounded-full text-sm text-gray-200'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Location and Apply Button */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4 text-gray-300 text-sm'>
              <div className='flex items-center'>
                <MapPin className='w-4 h-4 mr-1' />
                Sydney AUS
              </div>
              <div className='flex items-center'>
                <Users className='w-4 h-4 mr-1' />
                Applied : 136
              </div>
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 mr-1' />
                Posted on : 1 May 2025
              </div>
            </div>
            <Button
              onClick={() => navigate({ to: '/app/jobs-form' })}
              className='bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full text-white font-medium flex items-center'
            >
              Apply Job
              <ArrowLeft className='w-4 h-4 ml-2 rotate-180' />
            </Button>
          </div>
        </div>

        {/* About Company Section */}
        <h2 className='text-xl font-bold text-white mb-4'>About Company</h2>
        <div className='bg-cardblack rounded-2xl p-6'>
          <div className='mb-2'>
            <h3 className='text-lg font-semibold text-white mb-3 mt-0'>Overview</h3>
            <OverviewContent />
          </div>

          <div>
            <h3 className='text-lg font-semibold text-white mb-3'>Company Contact Details</h3>
            <div className='space-y-2 text-gray-300'>
              <div className='flex'>
                <span className='w-24'>Headquarters :</span>
                <span>Sydney, Australia</span>
              </div>
              <div className='flex'>
                <span className='w-24'>Website :</span>
                <span className='text-blue-400'>www.mc info tech pvt ltd.com</span>
              </div>
              <div className='flex'>
                <span className='w-24'>Industry :</span>
                <span>IT Services and IT Consulting</span>
              </div>
              <div className='flex'>
                <span className='w-24'>Specialties :</span>
                <span>
                  Consulting, Business Process Outsourcing, Business Application Services,
                  Infrastructure Management
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Recommended Jobs (400px width) */}
      <div className='w-full md:w-[600px] p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-white'>Recommended Jobs</h2>
          <Link className='text-purple-400 hover:text-purple-300 text-sm'>View all</Link>
        </div>

        {/* Recommended Job Cards */}
        <div className='space-y-4'>
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className='bg-cardblack rounded-lg p-4 relative'>
              <div className='flex items-start md:items-center mb-3'>
                <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3'>
                  <span className='text-white font-bold text-sm'>MC</span>
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h3 className='text-white font-semibold'>Product Designer</h3>
                    <span className='bg-green-600 text-xs px-2 py-0.5 rounded text-white'>New</span>
                  </div>
                  <p className='text-blue-400 text-sm'>MC Info Tech PVT Ltd</p>
                </div>
              </div>

              <div className='flex flex-wrap gap-1 mb-3'>
                {['Product Management', 'Strategist', 'Analyst'].map((skill) => (
                  <span key={skill} className='bg-gray-700 px-2 py-1 rounded text-xs text-gray-300'>
                    {skill}
                  </span>
                ))}
              </div>

              <div className='text-gray-400 text-xs mb-2'>Exp 0 - 1yrs | 10K AUSD</div>

              <div className='flex items-center text-xs text-gray-400'>
                <div className='flex items-center mr-'>
                  <MapPin className='w-3 h-3 mr-1' />
                  Sydney AUS
                </div>
                <div className='flex items-center'>
                  <Users className='w-3 h-3 mr-1' />
                  Applied : 136
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListingUI;
