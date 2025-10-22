// JobSearchUI.jsx
import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, User, FilterIcon } from 'lucide-react';
import Industry2 from '../../assets/Industry2.png';
import { Link, useRouter } from '@tanstack/react-router';
import { Button, Input, Skeleton, message } from 'antd';
import { NextButtonPurpleIcon, StarIcon, LogoIcon } from '../Common/SVG/svg.function';
import axios from 'axios';

/**
 * Minimal inline NoDataIcon component (SVG)
 */
const NoDataIcon = ({ className = 'h-auto mb-3 w-36' }) => (
  <svg
    className={className}
    viewBox='0 0 160 120'
    xmlns='http://www.w3.org/2000/svg'
    role='img'
    aria-hidden='true'
  >
    <rect x='2' y='2' rx='10' ry='10' width='156' height='116' fill='#0f1724' />
    <g fill='none' stroke='#9ca3af' strokeWidth='2'>
      <path d='M22 86c18-22 46-30 74-22 17 5 30 16 40 28' />
      <circle cx='40' cy='44' r='14' />
      <rect x='70' y='28' width='60' height='40' rx='6' ry='6' />
    </g>
    <text x='80' y='108' fill='#9ca3af' fontSize='10' textAnchor='middle' fontFamily='Arial'>
      No data available
    </text>
  </svg>
);

/**
 * Mock fallback data (temporary sample)
 */
const MOCK_JOBS = [
  {
    id: 'm1',
    jobTitle: 'Product Designer',
    company: 'Acme Studios',
    skills: ['Product Management', 'Design', 'Research'],
    minExperienceYears: 1,
    maxExperienceYears: 3,
    minCTC: 50,
    maxCTC: 90,
    postedOn: new Date().toISOString(),
    image: '',
    jobLocation: 'Sydney AUS',
    interestedCount: 10,
  },
  {
    id: 'm2',
    jobTitle: 'Business Analyst',
    company: 'Bright Analytics',
    skills: ['Analyst', 'SQL', 'Stakeholder Mgmt'],
    minExperienceYears: 2,
    maxExperienceYears: 5,
    minCTC: 60,
    maxCTC: 100,
    postedOn: new Date().toISOString(),
    image: '',
    jobLocation: 'Melbourne AUS',
    interestedCount: 7,
  },
  {
    id: 'm3',
    jobTitle: 'Product Strategist',
    company: 'Strategy Co',
    skills: ['Strategist', 'Product', 'Roadmap'],
    minExperienceYears: 3,
    maxExperienceYears: 6,
    minCTC: 80,
    maxCTC: 120,
    postedOn: new Date().toISOString(),
    image: '',
    jobLocation: 'Sydney AUS',
    interestedCount: 5,
  },
];

const MOCK_COMPANIES = [
  {
    id: 'c1',
    name: 'Acme Studios',
    rating: 4.6,
    location: 'Sydney',
    logoText: 'AS',
  },
  {
    id: 'c2',
    name: 'Bright Analytics',
    rating: 4.4,
    location: 'Melbourne',
    logoText: 'BA',
  },
  {
    id: 'c3',
    name: 'Strategy Co',
    rating: 4.2,
    location: 'Sydney',
    logoText: 'SC',
  },
];

const MOCK_MENTORS = [
  {
    id: 't1',
    name: 'Anita Desai',
    role: 'Product Manager',
    company: 'Acme Studios',
    skills: ['Product', 'Research'],
    rating: 4.8,
    hourlyRate: 40,
    image: '',
  },
  {
    id: 't2',
    name: 'Paul Kim',
    role: 'Data Analyst',
    company: 'Bright Analytics',
    skills: ['SQL', 'Analysis'],
    rating: 4.5,
    hourlyRate: 35,
    image: '',
  },
];

export default function JobSearchUI() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false); // used to decide mock fallback
  const [topCompanies, setTopCompanies] = useState([]);
  const [mentors, setMentors] = useState([]);
  const router = useRouter();

  const initialJobDisplayLimit = 3;
  const INITIAL_COMPANY_DISPLAY_LIMIT = 3;

  const tabs = ['All', 'Strategist', 'Product Management', 'Researcher', 'Analyst'];

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setFetchErrorOccurred(false);

      try {
        // small timeout & safe get
        const response = await axios.get(`${URL}/api/jobs`, { timeout: 8000 });
        const data = response?.data || [];

        // If API returned an empty array (success but no rows), keep it as empty array (we will show NoData)
        if (!cancelled) {
          setJobs(Array.isArray(data) ? data : []);
          // topCompanies & mentors may be different endpoints in a real app;
          // here we attempt to use separate endpoints if present, otherwise handle gracefully
          try {
            const companiesResp = await axios.get(`${URL}/api/companies`, {
              timeout: 8000,
            });
            setTopCompanies(Array.isArray(companiesResp?.data) ? companiesResp.data : []);
          } catch (e) {
            // don't show raw error to user — fallback to mock
            console.warn('companies fetch failed, using fallback data');
            setTopCompanies(MOCK_COMPANIES);
          }

          try {
            const mentorsResp = await axios.get(`${URL}/api/mentors`, {
              timeout: 8000,
            });
            setMentors(Array.isArray(mentorsResp?.data) ? mentorsResp.data : []);
          } catch (e) {
            console.warn('mentors fetch failed, using fallback data');
            setMentors(MOCK_MENTORS);
          }
        }
      } catch (err) {
        // don't show raw error to user
        console.error('Jobs fetch error (logged):', err);
        // Tell user a friendly/neutral message and provide mock data for UX continuity
        message.warning("Couldn't load live jobs — showing sample jobs temporarily.");
        if (!cancelled) {
          setFetchErrorOccurred(true);
          setJobs(MOCK_JOBS);
          setTopCompanies(MOCK_COMPANIES);
          setMentors(MOCK_MENTORS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [URL]);

  // Filter jobs based on search query and active tab
  const filteredJobs = useMemo(() => {
    return (jobs || []).filter((job) => {
      const matchesSearch =
        !searchQuery ||
        (job.jobTitle && job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.company && job.company.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter = activeTab === 'All' || (job.skills && job.skills.includes(activeTab));
      return matchesSearch && matchesFilter;
    });
  }, [jobs, searchQuery, activeTab]);

  // Format helpers
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

  // skeleton renderers (kept same)
  const renderJobSkeleton = () => (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <div key={index} className='bg-cardblack rounded-[24px] p-4'>
          <div className='flex items-start mb-3'>
            <Skeleton.Avatar active size={48} shape='circle' className='mt-4 mr-3' />
            <div className='flex-1'>
              <Skeleton.Input active size='small' className='mb-2' />
              <Skeleton.Input active size='small' />
            </div>
          </div>
          <div className='flex flex-wrap gap-2 mb-3'>
            <Skeleton.Button active size='small' shape='round' />
            <Skeleton.Button active size='small' shape='round' />
            <Skeleton.Button active size='small' shape='round' />
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-px'>
            <Skeleton.Input active size='small' className='mb-3' />
            <Skeleton.Input active size='small' className='justify-self-end' />
            <Skeleton.Input active size='small' />
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompanySkeleton = () => (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {[1, 2].map((_, index) => (
        <div key={index} className='bg-cardblack rounded-[24px] p-4'>
          <div className='flex items-start justify-between mb-2'>
            <Skeleton.Avatar active size={48} shape='circle' />
            <Skeleton.Button active size='small' shape='round' />
          </div>
          <Skeleton.Input active size='small' className='mb-2' />
          <Skeleton.Input active size='small' className='mb-3' />
          <div className='flex items-center justify-between'>
            <Skeleton.Button active size='small' />
            <Skeleton.Button active shape='circle' />
          </div>
        </div>
      ))}
    </div>
  );

  // mentors renderer simplified
  const renderMentors = () => {
    if (loading) {
      return (
        <div className='grid grid-cols-1 gap-4 mx-2 mt-5 md:grid-cols-2'>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className='bg-cardblack rounded-[24px] p-4'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                  <Skeleton.Avatar active size={80} shape='circle' />
                  <div className='!m-0 !p-0'>
                    <Skeleton.Input active size='small' className='mb-2' />
                    <Skeleton.Input active size='small' className='mb-2' />
                    <Skeleton.Input active size='small' />
                  </div>
                </div>
                <Skeleton.Input active size='small' />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!mentors || mentors.length === 0) {
      return (
        <div className='mt-8 text-lg text-center text-gray-400'>
          No mentor profiles available right now.
        </div>
      );
    }

    return (
      <div className='grid grid-cols-1 gap-4 mt-5 md:grid-cols-2'>
        {mentors.map((mentor) => (
          <div key={mentor.id} className='bg-cardblack rounded-[24px] p-4'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-20 h-20 overflow-hidden rounded-full'>
                  <img
                    src={
                      mentor.image ||
                      'https://img.freepik.com/free-photo/confident-businessman_1098-21002.jpg'
                    }
                    alt={`${mentor.name}'s avatar`}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='!m-0 !p-0'>
                  <h3 className='p-0 m-0 mb-0 text-2xl font-semibold leading-tight text-white'>
                    {mentor.name}
                  </h3>
                  <p className='text-[#9b9b9b] m-0 p-0 mb-0 leading-tight text-lg'>
                    {mentor.role || 'Product Manager'}
                  </p>
                  <p className='text-[#47cf99] m-0 p-0 mb-4 font-bold leading-tight text-lg'>
                    {mentor.company || 'Company not specified'}
                  </p>
                </div>
              </div>
              <div className='flex items-center bg-[#3c3803] px-3 py-1 rounded-full h-8'>
                <span className='mr-1 text-lg text-yellow-400'>
                  <StarIcon />
                </span>
                <span className='font-semibold text-yellow-300'>
                  {mentor.rating?.toFixed(1) || '0.0'}
                </span>
              </div>
            </div>

            <div className='mt-4'>
              <div className='flex flex-wrap gap-2'>
                {(mentor.skills || ['No skills specified']).slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className='px-6 py-1 text-base font-medium text-white rounded-full bg-dark'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between mt-4'>
              <div>
                <span className='text-3xl font-bold text-white'>${mentor.hourlyRate || 'N/A'}</span>
                <span className='ml-2 text-sm text-gray-400'>Per hr</span>
              </div>
              <NextButtonPurpleIcon />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='flex flex-col min-h-screen text-white bg-black'>
      {/* Header */}
      <div className='px-4 pb-2 md:px-6 lg:px-8'>
        <h1 className='block mb-4 text-2xl font-bold text-center md:hidden'>Jobs</h1>

        {/* Search */}
        {/* <div className="relative max-w-3xl mx-auto mb-6">
          <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-400 rounded-full bg-textblack"
          />
        </div> */}
        <div className='relative block max-w-3xl mx-auto mb-6 rounded-full md:hidden'>
          <Search className='absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2' />
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full py-4 pl-10 pr-3 text-sm text-white placeholder-gray-400 bg-black border border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500'
            autoFocus
          />
          <FilterIcon className='absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 right-5 top-1/2' />
        </div>

        {/* Jobs header and tabs */}
        <div className='px-2 md:px-0'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-sm font-semibold sm:text-lg'>Jobs based on your profile</h2>
            <Link href='/app/jobs-listing' className='text-xs text-purple-500 sm:text-sm'>
              View all
            </Link>
          </div>

          <div className='flex gap-2 px-1 pb-2 overflow-x-auto'>
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
        </div>
      </div>

      {/* Loading */}
      {loading && <div className='px-4 md:px-6 lg:px-8'>{renderJobSkeleton()}</div>}

      {/* Error state is handled quietly; if fetch failed we show mock jobs instead.
          If fetch succeeded but returned empty jobs array -> show NoDataIcon */}
      {!loading && Array.isArray(jobs) && jobs.length === 0 && !fetchErrorOccurred && (
        <div className='flex flex-col items-center justify-center py-16'>
          <NoDataIcon />
          <div className='mt-2 text-gray-400'>No jobs found. Try changing the filters.</div>
        </div>
      )}

      {/* Job Cards */}
      <div className='px-4 md:px-6 lg:px-8'>
        {!loading && filteredJobs.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredJobs.slice(0, initialJobDisplayLimit).map((job) => (
              <div key={job.id || job.jobTitle} className='bg-cardblack rounded-[24px] px-4 py-4'>
                <div className='flex items-start mb-3 md:items-center'>
                  <div className='p-2 mt-4 mr-3 bg-white rounded-full'>
                    <div className='flex items-center justify-center w-10 h-10'>
                      {job.image ? (
                        <img
                          src={job.image}
                          alt={job.company}
                          className='object-cover w-full h-full rounded-full'
                        />
                      ) : (
                        <div className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full'>
                          <span className='text-lg font-bold text-blue-700'>
                            {(job.company?.charAt(0) || 'J').toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='flex-1 mb-0'>
                    <div className='flex items-center justify-between mb-0'>
                      <h3 className='text-lg font-semibold'>
                        {job.jobTitle || 'Product Designer'}
                      </h3>
                      {isNewJob(job.postedOn) && (
                        <div className='px-3 py-1 text-xs text-white border-purple-900 rounded-full'>
                          New
                        </div>
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
                      <span key={index} className='px-3 py-1 text-sm bg-black rounded-full'>
                        {skill}
                      </span>
                    ))}
                </div>

                <div className='grid grid-cols-2 grid-rows-2 gap-px'>
                  <div className='col-start-1 row-start-1'>
                    <p className='mb-3 text-sm text-gray-400 text-nowrap'>
                      Exp {formatExperience(job.minExperienceYears, job.maxExperienceYears)} |{' '}
                      {formatSalary(job.minCTC, job.maxCTC)} AUSD
                    </p>
                  </div>

                  <div className='col-start-1 row-start-2'>
                    <div className='flex items-center gap-4 mt-0'>
                      <div className='flex items-center text-sm text-gray-400'>
                        <MapPin className='w-4 h-4 mr-1' />
                        <span className='text-nowrap'>{job.jobLocation || 'Sydney AUS'}</span>
                      </div>
                      <div className='flex items-center text-sm text-gray-400'>
                        <User className='w-4 h-4 mr-0' />
                        <span className='text-nowrap'>
                          {`Applied: ${job.interestedCount || job.appliedCount || 136}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-start justify-end col-start-2 row-span-2 row-start-1'>
                    <a
                      className='flex items-center'
                      onClick={() => router.navigate({ to: `/app/company-details` })}
                    >
                      <NextButtonPurpleIcon />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // if we already used mock data (fetchErrorOccurred true) we still show mock jobs, else we show a friendly no-data block
          !loading && (
            <div className='py-10 text-center text-gray-400'>
              {fetchErrorOccurred
                ? 'Displaying sample jobs due to network issue.'
                : 'No jobs found matching your criteria'}
            </div>
          )
        )}
      </div>

      {/* Two column section */}
      <div className='flex flex-col gap-6 px-4 mt-6 lg:flex-row lg:px-6 lg:gap-8'>
        {/* LEFT */}
        <div className='w-full lg:w-[70%] space-y-6'>
          <div>
            <img
              src={Industry2}
              className='object-cover w-full h-auto rounded-2xl'
              alt='Industry banner'
            />
          </div>

          <div>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-xl font-bold'>Career Guidance</h2>
              <a href='#' className='text-sm text-purple-500'>
                View all
              </a>
            </div>
            <p className='mb-4 text-sm text-gray-400'>Get Industry standard experts</p>
            {renderMentors()}
          </div>

          <div>
            <div
              className='flex items-center justify-between p-4 rounded-lg'
              style={{
                background: 'linear-gradient(147.52deg, #232323 37.14%, #D4D35C 156.21%)',
              }}
            >
              <div className='flex items-center'>
                <div className='flex mr-3'>
                  <LogoIcon />
                </div>
                <div>
                  <p className='font-semibold text-white'>Metie Provided AI based Training.</p>
                  <p className='text-sm text-gray-300'>Get Industry standard experts</p>
                </div>
              </div>
              <div className='text-gray-200'>
                <NextButtonPurpleIcon />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className='w-full lg:w-[30%] space-y-4 sticky top-6 h-fit'>
          <div className='flex items-center justify-between px-0'>
            <h2 className='text-xl font-bold'>Top Companies</h2>
            <Link to='/app/companies-listing' className='text-sm text-purple-500'>
              View all
            </Link>
          </div>

          {loading ? (
            renderCompanySkeleton()
          ) : Array.isArray(topCompanies) && topCompanies.length > 0 ? (
            topCompanies.slice(0, INITIAL_COMPANY_DISPLAY_LIMIT).map((company) => (
              <div key={company.id || company.name} className='bg-cardblack rounded-[24px] p-4'>
                <div className='flex items-start justify-between mb-2 md:items-center'>
                  <div className='p-2 bg-white rounded-full'>
                    <div className='flex items-center justify-center w-10 h-10 font-bold text-blue-500'>
                      <span className='text-blue-500'>
                        {company.logoText || company.name?.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center bg-[#3C3803] px-2 py-1 rounded-full'>
                    <span className='mr-1 text-lg text-yellow-400'>
                      <StarIcon />
                    </span>
                    <span className='font-semibold text-yellow-300'>{company.rating ?? '4.0'}</span>
                  </div>
                </div>

                <h3 className='mb-1 font-semibold'>{company.name}</h3>

                <div className='flex items-center mb-3 text-sm text-gray-400'>
                  <MapPin className='w-4 h-4 mr-1' />
                  <span>{company.location || 'Sydney'}</span>
                </div>

                <div className='flex items-center justify-between'>
                  <Link to='/app/companies-listing' className='text-sm text-gray-400'>
                    View all jobs
                  </Link>
                  <NextButtonPurpleIcon />
                </div>
              </div>
            ))
          ) : (
            <div className='py-6 text-center text-gray-400'>
              <NoDataIcon className='h-auto mx-auto mb-3 w-28' />
              <div>No top companies available</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
