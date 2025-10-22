import { Button, Pagination, Modal, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CloseOutlined } from '@ant-design/icons';
import { usePagination } from '@/hooks/usePagination';
import { NoDataIcon, SearchIcon } from '../../Common/SVG/svg.function';
import MyPlanForm from './LandlordMyPostForm';
import NeonButton from '../../Common/Button/NeonButton';

const LandlordMyPost = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const {
    currentPage: propertiesPage,
    pageSize: propertiesPageSize,
    handlePageChange: handlePropertiesPageChange,
  } = usePagination({
    initialPage: 0,
    initialPageSize: 6,
    zeroIndexed: true,
  });

  useEffect(() => {
    setProperties([
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
    ]);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className='bg-dark text-white min-h-screen w-full font-sans px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='mt-2 sm:mt-4'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-2 sm:py-4 mb-4 lg:mb-0'>
            <h2 className='text-white text-xl sm:text-3xl font-bold leading-tight'>My Post</h2>
            <div className='relative w-full lg:w-auto lg:min-w-[400px]'>
              <div className='absolute left-5 top-1/2 -translate-y-1/2 z-10'>
                <SearchIcon />
              </div>
              <Input
                placeholder='Search..'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='rounded-full border-0 bg-[#2a2a2a] text-white placeholder:text-gray-500 pl-14 pr-6 py-3 text-base focus:ring-2 focus:ring-purple-500'
                style={{
                  height: '48px',
                }}
              />
            </div>
          </div>

          {Array.isArray(properties) && properties.length > 0 ? (
            <>
              {/* Properties Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-6'>
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className='relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] group cursor-pointer'
                    role='button'
                    tabIndex={0}
                    onClick={() => navigate({ to: `/app/landlord-post/${property.id}` })}
                  >
                    <img
                      src={property.imageUrl}
                      alt={property.name}
                      className='absolute w-full h-full object-cover object-center'
                      loading='lazy'
                    />

                    {property.recentlyPosted && (
                      <div className='absolute top-2 sm:top-3 left-2 sm:left-3 bg-black text-white font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs'>
                        Recently Posted
                      </div>
                    )}

                    <div className='absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-[16px] sm:rounded-[20px] backdrop-blur-sm group-hover:bg-opacity-70 transition-all'>
                      <div className='flex justify-between items-end gap-2'>
                        <div className='flex-1 min-w-0'>
                          <h2 className='text-xs sm:text-base md:text-lg p-0 m-0  font-medium leading-tight truncate'>
                            {property.name}
                          </h2>
                          <p className='text-[11px] sm:text-xs md:text-sm text-gray-300 mt-0.5 sm:mt-1 truncate'>
                            {property.address}
                          </p>
                        </div>
                        <div className='flex-shrink-0 ml-1 sm:ml-2 text-right'>
                          <p className='text-base sm:text-lg md:text-xl font-bold text-white whitespace-nowrap'>
                            ₹{property.price}{' '}
                            <span className='text-xs sm:text-sm font-normal'>
                              /{property.priceUnit}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination for Properties */}
              <div className='flex justify-center mt-8 pb-6'>
                <Pagination
                  current={propertiesPage}
                  pageSize={propertiesPageSize}
                  total={properties.length}
                  onChange={handlePropertiesPageChange}
                  showSizeChanger={false}
                  className='custom-pagination'
                />
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center w-full p-8 mt-6 rounded-2xl bg-cardblack'>
              <NoDataIcon />
              <p className='text-base text-gray-300'>No properties found</p>
            </div>
          )}
          <div className='flex justify-center items-center py-6 pb-24 lg:pb-6'>
            <div onClick={showModal} className='w-full md:w-full flex justify-center'>
              <NeonButton text='Make a New Post'></NeonButton>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={null}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width='100%'
        style={{ maxWidth: 700 }}
        styles={{
          content: { backgroundColor: 'black', padding: 0 },
          body: { padding: 0, backgroundColor: 'black' },
        }}
        closeIcon={
          isMobile ? null : (
            <div
              style={{
                border: '2px solid white',
                borderRadius: '9999px',
                padding: '8px',
                marginTop: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloseOutlined style={{ color: 'white', fontSize: 16 }} />
            </div>
          )
        }
      >
        <MyPlanForm noPadding />
      </Modal>
    </>
  );
};

export default LandlordMyPost;
