import { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpRight, ArrowLeft, Star as StarIcon, Calendar } from 'lucide-react';
import { Button, Input, Skeleton } from 'antd';
import { BackButtonIcon, NextButtonPurpleIcon, SearchIcon } from '../Common/SVG/svg.function';
import { useNavigate } from '@tanstack/react-router';
import { FilterIcon } from '../Stay/NeedRoomCommon.svg';
import { getAuthHeaders } from '../Auth/Auth.Function';
import Skelton from '../Common/Skelton';
import AlumniCard from './AlumniCard';

export default function Alumni() {
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

  // Extract unique categories from the API data
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
        const response = await fetch(`${URL}/api/alumni/cards`, {
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
            <h1 className='text-2xl font-bold'>Recommended Alumni</h1>
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

        {/* Mentor Cards Grid - Updated with new design */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-2'>
          {filteredMentors.map((mentor) => (
            <AlumniCard
              key={mentor.id}
              alumni={mentor}
              backendUrl={URL}
              onClick={() => router({ to: '/app/mentor-dashboard' })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
