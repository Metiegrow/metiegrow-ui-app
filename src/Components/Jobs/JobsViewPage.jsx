import { useState, useEffect } from 'react';
import { Search, ArrowUpRight, MapPin, User } from 'lucide-react';
import { Button, Input, Spin, message, Skeleton } from 'antd';
import { useRouter } from '@tanstack/react-router';
import { BackButtonIcon, NextButtonPurpleIcon } from '../Common/SVG/svg.function';
import { getAuthHeaders } from '../Auth/Auth.Function';

export default function JobListingUI() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    hasNextPage: false,
  });
  const tabs = ['All', 'Strategist', 'Product Management', 'Researcher', 'Analyst'];

  // Skeleton loading array
  const skeletonCount = 6; // Number of skeleton cards to show

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${URL}/api/posts/job-post/?page=${pagination.pageNumber}&size=${pagination.pageSize}`,
          {
            headers: getAuthHeaders(),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobs(data.jobLists);
        setPagination((prev) => ({
          ...prev,
          hasNextPage: data.pagination.hasNextPage,
        }));
      } catch (err) {
        setError(err.message);
        message.error('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [pagination.pageNumber]);

  // Get all unique skills for filters
  const allSkills = [...new Set(jobs.flatMap((job) => job.skills))];
  const filterOptions = ['All', ...allSkills];

  // Filter jobs based on search query and active filter
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'All' || job.skills.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  const formatExperience = (min, max) => {
    if (min === undefined || max === undefined) return 'Not specified';
    return `${min}-${max} yrs`;
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return '10 K';
    if (min && max) return `${min}K-${max}K`;
    if (min) return `From ${min}K`;
    return `Up to ${max}K`;
  };

  const isNewJob = (postedOn) => {
    if (!postedOn) return false;
    const postedDate = new Date(postedOn);
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setPagination((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.pageNumber > 0) {
      setPagination((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber - 1,
      }));
    }
  };

  if (error) {
    return (
      <div className='bg-black min-h-screen text-white p-4 flex items-center justify-center'>
        <div className='text-red-500'>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen text-white p-4'>
      {/* Header */}
      <header className='mb-6'>
        <div className='flex items-center mb-6'>
          <div className='rounded-full flex items-center justify-center w-10 h-10 mr-4'>
            <a onClick={() => window.history.back()}>
              <BackButtonIcon />
            </a>
          </div>
          <h1 className='text-2xl font-bold'>Jobs</h1>
        </div>

        {/* Search Bar */}
        <div className='relative mb-6'>
          <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
            <Search className='h-5 w-5 text-gray-400' />
          </div>
          <Input
            type='text'
            placeholder='Search'
            className='bg-textblack w-full py-3 pl-10 pr-4 rounded-full text-white focus:outline-none placeholder-gray-400'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className='flex gap-2 overflow-x-auto pb-2'>
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-cardblack text-white border border-purple-500'
                  : 'bg-black text-gray-500 border border-gray-700'
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </header>

      {/* Job Cards Grid */}
      <div className='px-0 py-4'>
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <div key={index} className='bg-cardblack rounded-[24px] p-4'>
                <div className='flex items-start mb-3'>
                  <Skeleton.Avatar active size={40} className='mr-3 mt-4' />
                  <div className='flex-1 mb-0'>
                    <Skeleton.Input active size='small' className='w-3/4 mb-2' />
                    <Skeleton.Input active size='small' className='w-1/2' />
                  </div>
                </div>

                <div className='flex flex-wrap gap-2 mb-3'>
                  <Skeleton.Button active size='small' className='rounded-full' />
                  <Skeleton.Button active size='small' className='rounded-full' />
                  <Skeleton.Button active size='small' className='rounded-full' />
                </div>

                <div className='grid grid-cols-2 grid-rows-2 gap-px'>
                  <div className='row-start-1 col-start-1'>
                    <Skeleton.Input active size='small' className='w-full mb-3' />
                  </div>

                  <div className='row-start-2 col-start-1'>
                    <div className='flex items-center gap-4 mt-0'>
                      <Skeleton.Input active size='small' className='w-20' />
                      <Skeleton.Input active size='small' className='w-20' />
                    </div>
                  </div>

                  <div className='row-span-2 col-start-2 row-start-1 flex justify-end items-start'>
                    <Skeleton.Button active shape='circle' className='w-8 h-8' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredJobs.map((job) => (
              <div
                key={job.id || Math.random().toString()}
                className='bg-cardblack rounded-[24px] px-4'
              >
                <div className='flex items-start mb-3'>
                  <div className='bg-white rounded-full p-2 mr-3 mt-4'>
                    <div className='flex items-center justify-center h-10 w-10'>
                      {job.image ? (
                        <img
                          src={job.image}
                          alt={job.company}
                          className='w-full h-full object-cover rounded-full'
                        />
                      ) : (
                        <div className='flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full'>
                          <span className='text-blue-700 font-bold text-lg'>
                            {(job.company?.charAt(0) || 'J').toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='flex-1 mb-0'>
                    <div className='flex justify-between items-center mb-0'>
                      <h3 className='text-lg font-semibold'>
                        {job.jobTitle || 'Product Designer'}
                      </h3>

                      {isNewJob(job.postedOn) && (
                        <span className='bg-purple-900 text-white text-xs px-3 py-1 rounded-full'>
                          New
                        </span>
                      )}
                    </div>

                    <p className='text-[#50FFB9] text-sm mt-0'>
                      {job.company || 'MC info Tech PVT Ltd'}
                    </p>
                  </div>
                </div>

                <div className='flex flex-wrap gap-2 mb-3'>
                  {(job.skills || ['Product Management', 'Strategist', 'Analyst'])
                    .slice(0, 3)
                    .map((skill, index) => (
                      <span key={index} className='bg-black text-sm px-3 py-1 rounded-full'>
                        {skill}
                      </span>
                    ))}
                </div>

                <div className='grid grid-cols-2 grid-rows-2 gap-px'>
                  <div className='row-start-1 col-start-1'>
                    <p className='text-gray-400 text-sm mb-3'>
                      Exp {formatExperience(job.minExperienceYears, job.maxExperienceYears)} |{' '}
                      {formatSalary(job.minCTC, job.maxCTC)} AUSD
                    </p>
                  </div>

                  <div className='row-start-2 col-start-1'>
                    <div className='flex items-center gap-4 mt-0'>
                      <div className='flex items-center text-gray-400 text-sm'>
                        <MapPin className='h-4 w-4 mr-1' />
                        <span>{job.jobLocation || 'Sydney AUS'}</span>
                      </div>
                      <div className='flex items-center text-gray-400 text-sm'>
                        <User className='h-4 w-4 mr-0' />
                        <span>Applied : {job.interestedCount || job.appliedCount || 136}</span>
                      </div>
                    </div>
                  </div>

                  <div className='row-span-2 col-start-2 row-start-1 flex justify-end items-start'>
                    <a
                      className='flex items-center'
                      // onClick={() => router.navigate({ to: `/app/jobs-listing/${job.id}` })}
                      onClick={() => router.navigate({ to: `/app/jobs-details` })}
                    >
                      <NextButtonPurpleIcon />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-10 text-gray-400'>
            No jobs found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
