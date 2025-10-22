import { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpRight, ArrowLeft, Star as StarIcon, Calendar } from 'lucide-react';
import { Button, Input, Skeleton, Pagination } from 'antd';
import { BackButtonIcon, NextButtonPurpleIcon, SearchIcon } from '../Common/SVG/svg.function';
import { Link, useNavigate } from '@tanstack/react-router';
import { FilterIcon } from '../Stay/NeedRoomCommon.svg';
import { getAuthHeaders } from '../Auth/Auth.Function';
import Skelton from '../Common/Skelton';
import MentorCard from './MentorCard';
import MentorFilterDropdown from './MentorFilterDropdown';
import { mentorService } from '../Services/mentorService';

// Custom CSS for pagination
const paginationStyles = `
  .mentor-pagination .ant-pagination-item {
    background: #1a1b24;
    border: 1px solid #333;
    color: white;
  }
  .mentor-pagination .ant-pagination-item:hover {
    border-color: #a259ff;
    color: #a259ff;
  }
  .mentor-pagination .ant-pagination-item-active {
    background: #a259ff;
    border-color: #a259ff;
    color: white;
  }
  .mentor-pagination .ant-pagination-prev,
  .mentor-pagination .ant-pagination-next {
    background: #1a1b24;
    border: 1px solid #333;
    color: white;
  }
  .mentor-pagination .ant-pagination-prev:hover,
  .mentor-pagination .ant-pagination-next:hover {
    border-color: #a259ff;
    color: #a259ff;
  }
  .mentor-pagination .ant-pagination-options {
    color: white;
  }
  .mentor-pagination .ant-select-selector {
    background: #1a1b24 !important;
    border: 1px solid #333 !important;
    color: white !important;
  }
  .mentor-pagination .ant-select-arrow {
    color: white !important;
  }
  .mentor-pagination .ant-pagination-total-text {
    color: #9b9b9b;
  }
`;

export default function MentorRecommendation() {
  const router = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    totalCount: 0,
    totalPage: 0,
    pageNumber: 0,
    pageSize: 10,
    hasNextPage: false,
    hasPreviousPage: false,
    first: true,
    last: true,
  });

  // Extract unique categories from the API data
  const categories = ['All', 'Strategist', 'Product Management', 'Researcher', 'Role'];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Fetch mentors data from API using the service
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const result = await mentorService.getMentorCards(currentPage, pageSize);

        if (result.success) {
          setMentors(result.data.data);
          setPaginationMeta(result.data.paginationMeta);
        } else {
          setError(result.error);
          console.error('Error fetching mentors:', result.error);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching mentors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPage, pageSize]);

  const isMobile = windowWidth < 768;

  // Handle page change
  const handlePageChange = (page, size) => {
    setCurrentPage(page - 1); // API uses 0-based indexing
    setPageSize(size);
  };

  // Filter mentors based on active category and search query
  const filteredMentors = mentors.filter((mentor) => {
    const matchesCategory = activeCategory === 'All' || mentor.category === activeCategory;

    const matchesSearch =
      searchQuery === '' ||
      mentor.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mentor.skills &&
        mentor.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesFilter = filterValues
      ? (!filterValues.jobTitles.length || filterValues.jobTitles.includes(mentor.jobTitle)) &&
        (!filterValues.location || mentor.location === filterValues.location) &&
        (!filterValues.employmentType || mentor.employmentType === filterValues.employmentType) &&
        (!filterValues.salary || mentor.price <= filterValues.salary) &&
        (!filterValues.remoteType || mentor.remoteType === filterValues.remoteType) &&
        (!filterValues.industry || mentor.industry === filterValues.industry) &&
        (!filterValues.jobFunction || mentor.jobFunction === filterValues.jobFunction) &&
        (!filterValues.skill || mentor.skills?.includes(filterValues.skill)) &&
        (!filterValues.datePosted || mentor.datePosted === filterValues.datePosted)
      : true;

    return matchesCategory && matchesSearch && matchesFilter;
  });

  return (
    <>
      <style>{paginationStyles}</style>
      <div className='bg-secondary text-white min-h-screen p-6 rounded-xl'>
        <div className='max-w-7xl mx-auto'>
          {/* Header Section */}
          <div className='flex flex-col items-start mb-6'>
            <div className='flex items-center gap-4'>
              {isMobile && (
                <Link className='rounded-full p-2'>
                  <BackButtonIcon className='w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-3 lg:h-3' />
                </Link>
              )}
              <h1 className='text-xl sm:text-2xl md:text-lg lg:text-xl xl:text-2xl font-bold'>
                Recommended Mentors
              </h1>
            </div>

            {showFilter && (
              <MentorFilterDropdown
                onApply={(filters) => setFilterValues(filters)}
                onClose={() => setShowFilter(false)}
              />
            )}

            {/* Search and Help Section */}
            <div className='flex items-center gap-4'>
              <div className='relative w-[280px]'>
                <div className='flex items-center bg-cardblack rounded-full'>
                  <SearchIcon className='ml-4 text-white' size={18} />
                  <Input
                    type='text'
                    placeholder='Search..'
                    className='w-full bg-transparent border-none text-white placeholder-white'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <a
                className='bg-cardblack p-4 rounded-full cursor-pointer'
                onClick={() => setShowFilter(!showFilter)}
              >
                <FilterIcon size={30} className='text-gray-400' />
              </a>
            </div>
          </div>

          {/* Category Filter */}
          <div className='flex justify-start items-center w-full p-4 text-white'>
            <div className='w-full max-w-3xl bg-[#1A1B24] custom-border rounded-full p-2 flex items-center'>
              {categories.map((category) => (
                <a
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`py-2 px-6 rounded-full font-medium text-lg transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-2'>
              {[...Array(12)].map((_, index) => (
                <Skelton key={index} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className='flex justify-center items-center h-64'>
              <div className='text-red-500'>Error loading mentors: {error}</div>
            </div>
          )}

          {/* No Results State */}
          {!loading && !error && filteredMentors.length === 0 && (
            <div className='flex justify-center items-center h-64'>
              <div className='text-gray-400'>No mentors found matching your criteria</div>
            </div>
          )}

          {/* Mentor Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-2'>
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                backendUrl={import.meta.env.VITE_API_BASE_URL_BACKEND}
                onClick={() => router({ to: '/app/mentor-profile' })}
              />
            ))}
          </div>

          {/* Pagination */}
          {!loading && !error && paginationMeta.totalPage > 1 && (
            <div className='flex justify-center mt-8'>
              <Pagination
                current={currentPage + 1}
                total={paginationMeta.totalCount}
                pageSize={pageSize}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} mentors`}
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                className='mentor-pagination'
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
