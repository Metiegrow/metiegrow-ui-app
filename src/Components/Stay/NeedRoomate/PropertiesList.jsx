// PropertiesList.jsx - Full properties list with pagination
import { Button, Pagination } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { NoDataIcon, BackButtonIcon } from '../../Common/SVG/svg.function';
import { useRouter } from '@tanstack/react-router';

export default function PropertiesList() {
  const router = useRouter();
  const [allProperties, setAllProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Load dummy properties (expanded dataset)
  useEffect(() => {
    // Generate more dummy properties for pagination demo
    const dummyProperties = [
      {
        id: 1,
        name: 'Luxury Apartment',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Downtown, Chennai',
        price: 12000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 2,
        name: 'Studio Apartment',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Central Chennai',
        price: 8000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 3,
        name: 'Shared Housing',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Near University, Chennai',
        price: 5000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 4,
        name: 'Cozy 2BHK',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Anna Nagar, Chennai',
        price: 15000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 5,
        name: 'Modern 3BHK',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'T Nagar, Chennai',
        price: 18000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 6,
        name: 'Spacious Villa',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Velachery, Chennai',
        price: 25000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 7,
        name: 'Budget Friendly PG',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Guindy, Chennai',
        price: 6000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 8,
        name: 'Premium Flat',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Adyar, Chennai',
        price: 22000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 9,
        name: 'Family House',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Mylapore, Chennai',
        price: 20000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 10,
        name: 'Compact 1BHK',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Tambaram, Chennai',
        price: 9000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 11,
        name: 'Duplex Apartment',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Porur, Chennai',
        price: 17000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 12,
        name: 'Sea View Flat',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Besant Nagar, Chennai',
        price: 28000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 13,
        name: 'Garden Villa',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Kelambakkam, Chennai',
        price: 16000,
        priceUnit: 'month',
        recentlyPosted: false,
      },
      {
        id: 14,
        name: 'Downtown Studio',
        imageUrl:
          'https://img.freepik.com/premium-photo/modern-living-room-interior_1375194-33018.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'Nungambakkam, Chennai',
        price: 14000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
      {
        id: 15,
        name: 'Penthouse Suite',
        imageUrl:
          'https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?uid=R166921530&ga=GA1.1.1342267882.1744083974&semt=ais_hybrid&w=740',
        address: 'OMR, Chennai',
        price: 35000,
        priceUnit: 'month',
        recentlyPosted: true,
      },
    ];
    setAllProperties(dummyProperties);
  }, []);

  // Calculate paginated properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allProperties.slice(startIndex, endIndex);
  }, [allProperties, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    router.navigate({ to: '/app/room-housing' });
  };

  const navigateToPropertyDetail = (id) => {
    router.navigate({
      to: '/app/stay-room-details/$id',
      params: { id: String(id) },
    });
  };

  return (
    <div className='w-full min-h-screen px-4 mx-auto font-sans text-white bg-dark sm:px-6 lg:px-8 max-w-7xl'>
      {/* Header Section */}
      <div className='flex flex-col items-start justify-between w-full py-4 text-white bg-dark sm:py-6 sm:flex-row sm:items-center'>
        <div className='flex items-center gap-4'>
          <button
            onClick={handleBackClick}
            className='flex items-center justify-center w-12 h-12 transition-colors rounded-full bg-cardblack hover:bg-gray-700 focus:outline-none'
            aria-label='Go back'
          >
            <BackButtonIcon />
          </button>
          <div>
            <h1 className='text-xl font-bold leading-tight sm:text-3xl'>
              All Properties ({allProperties.length})
            </h1>
            <p className='mt-1 text-sm text-gray-400'>Find your next home</p>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className='mt-6 mb-8'>
        {Array.isArray(paginatedProperties) && paginatedProperties.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6'>
              {paginatedProperties.map((property) => (
                <div
                  key={property.id}
                  className='relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] cursor-pointer group'
                  onClick={() => navigateToPropertyDetail(property.id)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigateToPropertyDetail(property.id);
                  }}
                >
                  <img
                    src={property.imageUrl}
                    alt={property.name}
                    className='absolute object-cover object-center w-full h-full'
                    loading='lazy'
                  />

                  {property.recentlyPosted && (
                    <div className='absolute top-2 sm:top-3 left-2 sm:left-3 bg-black text-white font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs'>
                      Recently Posted
                    </div>
                  )}

                  <div className='absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-black bg-opacity-50 text-white p-3 sm:p-4 rounded-[16px] sm:rounded-[20px] backdrop-blur-sm group-hover:bg-opacity-70 transition-all'>
                    <div className='flex items-end justify-between gap-2'>
                      <div className='flex-1 min-w-0'>
                        <h2 className='text-sm font-semibold leading-tight truncate sm:text-base md:text-lg'>
                          {property.name}
                        </h2>
                        <p className='text-[11px] sm:text-xs md:text-sm text-gray-300 mt-0.5 sm:mt-1 truncate'>
                          {property.address}
                        </p>
                      </div>
                      <div className='flex-shrink-0 ml-1 text-right sm:ml-2'>
                        <p className='text-base font-bold text-white sm:text-lg md:text-xl whitespace-nowrap'>
                          ₹{property.price}{' '}
                          <span className='text-xs font-normal sm:text-sm'>
                            /{property.priceUnit}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {allProperties.length > pageSize && (
              <div className='flex justify-center py-8 mt-8'>
                <div className='bg-gray-900/50 border border-purple-600/20 rounded-lg px-6 py-4'>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={allProperties.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showTotal={(total, range) => (
                      <span className='mr-4 text-gray-300'>
                        {range[0]}-{range[1]} of {total} properties
                      </span>
                    )}
                    className='custom-pagination'
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className='flex flex-col items-center justify-center w-full p-8 mt-6 rounded-2xl bg-cardblack'>
            <NoDataIcon />
            <p className='text-base text-gray-300'>No properties found</p>
          </div>
        )}
      </div>
    </div>
  );
}
