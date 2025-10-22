// BatchMate.jsx
import React, { useMemo, useState, useCallback, memo } from 'react';

import { Button, Input, Pagination } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import { BackButtonIcon, NextButtonPurpleIcon, SearchIcon } from '../Common/SVG/svg.function';
import { FilterIcon } from '../Stay/NeedRoomCommon.svg';
import Skelton from '../Common/Skelton';
import { useBatchmates, useBatchmatesCoursesByUniversities } from '@/hooks/students/queries';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';



// Memoized StudentCard component to prevent unnecessary re-renders
const StudentCard = memo(function StudentCard({
  student,
  index,
  URL,
  onCardClick,
  onNextClick,
  initials,
  formatName,
}) {
  const isEven = index % 2 === 0;
  const bgColor = isEven ? 'bg-[#3c3803]' : 'bg-[#10323F]';
  const textColor = isEven ? 'text-yellow-300' : 'text-[#14C0FE]';
  const avatarSrc =
    student?.profilePicUrl &&
    (student.profilePicUrl.startsWith('http')
      ? student.profilePicUrl
      : `${URL}/${student.profilePicUrl}`);

  const handleCardClick = useCallback(() => {
    onCardClick(student.id);
  }, [onCardClick, student.id]);

  const handleNextClick = useCallback(
    (e) => {
      e.stopPropagation();
      onNextClick(student.id);
    },
    [onNextClick, student.id]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') onCardClick(student.id);
    },
    [onCardClick, student.id]
  );

  return (
    <article
      className='flex flex-col h-full p-4 bg-cardblack rounded-2xl transition-shadow duration-150 hover:shadow-lg min-h-[180px]'
      onClick={handleCardClick}
      role='button'
      tabIndex={0}
      aria-label={`Open profile for ${formatName(student)}`}
      onKeyDown={handleKeyDown}
    >
      {/* Top: Avatar + name + rating */}
      <div className='flex items-start gap-3 md:gap-4'>
        {/* Avatar (never shrink) */}
        <div className='flex-shrink-0'>
          <div className='relative flex items-center justify-center overflow-hidden bg-gray-700 rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20'>
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={formatName(student)}
                className='object-cover w-full h-full'
                loading='lazy'
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '';
                }}
              />
            ) : (
              <span className='text-base font-semibold text-white sm:text-lg'>
                {initials(student)}
              </span>
            )}
          </div>
        </div>

        {/* Middle: Name, course */}
        <div className='flex-1 min-w-0'>
          <h3
            className='text-base mt-2 font-semibold leading-tight truncate sm:text-lg'
            title={`${student?.name || ''}`}
          >
            {formatName(student)}
          </h3>

          <p className='mt-0 text-xs text-gray-300 truncate sm:text-sm' title={student.course || ''}>
            {student?.course || ''}
          </p>
        </div>
      </div>

      {/* In take month year */}
      <div className={`flex items-center ${bgColor} px-3 py-2 mt-2 rounded-full h-8 w-fit`}>
        <span className={`font-normal text-[14px] ${textColor}`}>
          {student?.intakeMonthYear || ''}
        </span>
      </div>

      {/* Bottom: price and actions - stick to bottom */}
      <div className='flex items-center justify-between gap-3 pt-3 mt-auto'>
        <p
          className='mt-1 text-sm font-normal truncate sm:text-sm '
          title={student.universityName || ''}
        >
          {student.universityName || ''}
        </p>

        <div className='flex items-center gap-2'>
          <Button
            type='text'
            onClick={handleNextClick}
            aria-label={`View details for ${formatName(student)}`}
            className='p-0'
          >
            <NextButtonPurpleIcon className='text-purple-500' />
          </Button>
        </div>
      </div>
    </article>
  );
});

export default function BatchMate() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce search query with 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Track if search is being debounced
  const isSearching = searchQuery !== debouncedSearchQuery;

  const { data: courses, isLoading: coursesLoading } = useBatchmatesCoursesByUniversities();
  const categories = useMemo(() => ['All', ...(courses || [])], [courses]);

  const { paginationParams, handlePageChange, currentPage, pageSize } = usePagination({
    initialPage: 1,
    initialPageSize: 12,
    zeroIndexed: true,
  });

  // Only include search query in filters if it has 3+ characters
  const batchmatesFilters = useMemo(() => {
    const filters = {
      ...paginationParams,
    };
    if (activeCategory !== 'All') {
      filters.course = activeCategory;
    }
    // Only add search query if it has 3 or more characters
    if (debouncedSearchQuery && debouncedSearchQuery.trim().length >= 3) {
      filters.q = debouncedSearchQuery.trim();
    }
    return filters;
  }, [activeCategory, debouncedSearchQuery, paginationParams]);

  const {
    data: batchmatesData,
    isLoading: loading,
    error: queryError,
  } = useBatchmates(batchmatesFilters);

  // Extract students array and total count from response
  const students = useMemo(() => {
    return Array.isArray(batchmatesData?.data) ? batchmatesData.data : [];
  }, [batchmatesData]);

  const totalStudents = batchmatesData?.paginationMeta?.totalCount || 0;
  const error = queryError?.message || null;

  // Memoized utility functions
  const initials = useCallback((m) => {
    const f = (m?.name?.charAt(0) || '').toUpperCase();
    return f || '?';
  }, []);

  const formatName = useCallback((m) => `${m?.name || ''} `.trim() || 'Anonymous', []);

  // Memoized navigation handlers
  const handleCardClick = useCallback(
    (id) => {
      navigate({ to: '/app/batchmate-details/$id', params: { id: String(id) } });
    },
    [navigate]
  );

  const handleNextClick = useCallback(
    (id) => {
      navigate({ to: '/app/batchmate-details/$id', params: { id: String(id) } });
    },
    [navigate]
  );

  // Memoized search input handler
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Memoized category change handler
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  return (
    <div className='min-h-screen mb-20 text-white md:p-6 lg:p-8 md:bg-secondary rounded-xl'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-0 md:gap-4'>
            {/* <div className='md:hidden'>
              <Button
                type='text'
                className='ml-[-12px] pt-10 text-white bg-transparent'
                onClick={() => navigate({ to: '/app' })}
              >
                <BackButtonIcon />
              </Button>
            </div> */}
            <h1 className='text-2xl font-bold mb-[4px] ml-2'>My Batchmates</h1>
          </div>

          <div className='flex items-center w-full gap-3 md:w-auto'>
            <div className='relative w-full max-w-auto '>
              <div className='flex items-center px-3 py-2 ml-[-2px] rounded-full bg-cardblack'>
                <SearchIcon size={18} className='text-white' />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search min 3 characters'
                  bordered={false}
                  className='ml-3 text-sm text-white placeholder-white bg-transparent'
                />
              </div>
              {isSearching && (
                <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                  <div className='w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
                </div>
              )}
              {searchQuery.length > 0 && searchQuery.length < 3 && !isSearching && (
                <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                  <span className='text-xs text-gray-500'>
                    {3 - searchQuery.length} more
                  </span>
                </div>
              )}
            </div>

            {/* <Button type='button' className='p-2 rounded-full bg-cardblack' aria-label='Filters'>
              <FilterIcon className='text-gray-400 p-8' />
            </Button> */}
          </div>
        </div>

        {/* Categories */}
        <div className='flex items-center gap-2 mb-5 overflow-x-auto no-scrollbar'>
          {coursesLoading ? (
            <p>Loading categories...</p>
          ) : (
            categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <Button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`whitespace-nowrap px-4 py-2 mb-5 mt-1 ml-1 text-sm font-medium rounded-full transition-all duration-150 ${
                    active
                      ? 'bg-cardblack border-2 border-purple-600 text-white'
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {cat.includes('_') ? cat.replace(/_/g, ' ') : cat}
                </Button>
              );
            })
          )}
        </div>

        {/* States */}
        {loading && (
          <div className='grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skelton key={i} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className='flex items-center justify-center h-48'>
            <div className='text-red-400'>Error loading students: {error}</div>
          </div>
        )}

        {!loading && !error && students.length === 0 && (
          <div className='flex items-center justify-center h-48'>
            <div className='text-gray-400'>No students found matching your criteria</div>
          </div>
        )}

        {/* Responsive grid: change column counts here if you want */}
        {!loading && !error && students.length > 0 && (
          <div className='grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
            {students.map((student, index) => (
              <StudentCard
                key={student.id}
                student={student}
                index={index}
                URL={URL}
                onCardClick={handleCardClick}
                onNextClick={handleNextClick}
                initials={initials}
                formatName={formatName}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalStudents > 0 && (
          <div className='flex justify-center py-8'>
            <div className='bg-gray-900/50 border border-purple-600/20 rounded-lg px-6 py-4'>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalStudents}
                onChange={handlePageChange}
                showSizeChanger={false}
                showTotal={(total, range) => (
                  <span className='text-gray-300 mr-4'>
                    {range[0]}-{range[1]} of {total} students
                  </span>
                )}
                className='custom-pagination'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
