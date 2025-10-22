import { useState, useEffect } from 'react';
import { Star as StarIcon } from 'lucide-react';
import { Button, Input, Skeleton } from 'antd';
import { BackButtonIcon, NextButtonPurpleIcon, SearchIcon } from '../../Common/SVG/svg.function';
import { Link, useNavigate } from '@tanstack/react-router';
import { FilterIcon } from '../../Stay/NeedRoomCommon.svg';
import { getAuthHeaders } from '../../Auth/Auth.Function';

export default function InderviewPreparation() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const router = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const categories = ['All', 'Strategist', 'Product Management', 'Researcher', 'Role'];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Fetch mentors data from API
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL}/api/v1/mentor/cards?page=0&size=10`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch mentors');
        }

        const data = await response.json();
        setMentors(data.data);
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
  }, []);

  const isMobile = windowWidth < 768;

  // Filter mentors based on active category and search query
  const filteredMentors = mentors.filter((mentor) => {
    const matchesCategory = activeCategory === 'All' || mentor.category === activeCategory;

    const matchesSearch =
      searchQuery === '' ||
      mentor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mentor.skills &&
        mentor.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className='bg-secondary text-white min-h-screen p-6 rounded-xl'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-6'>
          <div className='flex items-center gap-4'>
            {isMobile && (
              <Button className='bg-gray-800 rounded-full p-2'>
                <BackButtonIcon size={20} />
              </Button>
            )}
            <h1 className='text-2xl font-bold'>Inderview Preparation</h1>
          </div>

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
            <a className='bg-cardblack p-4 rounded-full'>
              <FilterIcon size={30} className='text-gray-400' />
            </a>
          </div>
        </div>

        {/* Category Filter */}

        <div className='flex justify-start items-center w-full p-4 text-white'>
          <div className='w-full max-w-3xl rounded-full p-2 flex items-center'>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2 px-6 mx-1 rounded-full font-medium text-lg transition-all duration-200  ${
                  activeCategory === category
                    ? 'bg-cardblack text-white border-2 !border-purple-600 '
                    : 'bg-transparent text-gray-400 border-gray-600 hover:text-gray-300'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-2'>
            {[...Array(12)].map((_, index) => (
              <div key={index} className='bg-cardblack rounded-[24px] p-4'>
                <Skeleton avatar paragraph={{ rows: 2 }} active />
              </div>
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

        {/* Mentor Cards Grid - Updated with new design */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-2'>
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className='bg-cardblack rounded-[24px] p-4'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 rounded-full overflow-hidden'>
                    <img
                      src={
                        mentor.imageUrl ||
                        'https://img.freepik.com/free-photo/confident-businessman_1098-21002.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740'
                      }
                      alt={`${mentor.firstName}'s avatar`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='!m-0 !p-0'>
                    <h3 className='text-lg m-0 p-0 font-semibold mb-0 leading-tight text-white'>
                      {mentor.firstName} {mentor.lastName}
                    </h3>
                    <p className='text-[#9b9b9b] m-0 p-0 mb-0 leading-tight text-md'>
                      {mentor.jobTitle || 'Product Manager'}
                    </p>
                    <p className='text-[#47cf99] m-0 p-0 mb-4 font-bold leading-tight text-md'>
                      {mentor.company}
                    </p>
                  </div>
                </div>
                <div className='flex items-center bg-[#3c3803] px-3 py-1 rounded-full h-8'>
                  <span className='text-yellow-400 text-lg mr-1'>
                    <StarIcon size={18} />
                  </span>
                  <span className='text-yellow-300 font-semibold'>
                    {mentor.star?.toFixed(1) || '5.0'}
                  </span>
                </div>
              </div>

              <div className='mt-4'>
                <div className='flex flex-wrap gap-2'>
                  {mentor.skills?.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className='bg-[#131313] text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 py-0.5 rounded-full font-medium'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <span className='text-2xl font-bold text-white'>$ {mentor.price}</span>
                  <span className='text-gray-400 text-sm ml-2'>Per hrs</span>
                </div>
                <div
                  className='cursor-pointer'
                  onClick={() => router({ to: '/app/mentor-dashboard' })}
                >
                  <NextButtonPurpleIcon className='text-purple-500' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
