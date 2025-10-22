import { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import HouseImage from '../../assets/House.png';
import RoommatesImage from '../../assets/Roommates.png';
import RoomateNeedPage from '../Stay/NeedRoomate/NeedRoommateForm';
import RoomNeedPage from '../Stay/NeedRoom/NeedRoomForm';
import Modal from 'antd/es/modal/Modal';

export default function PostRequirement({
  title = 'Post Your Requirement',
  showTitle = true,
  className = '',
  cardSize = 'default', // "default" or "compact"
  openRoommateModal = false, // External trigger for roommate modal
  onRoommateModalClose = null, // Callback when roommate modal closes
  openRoomModal = false, // External trigger for room modal
  onRoomModalClose = null, // Callback when room modal closes
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRoomateVisible, setRoomateModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Blur background when modal is open
  useEffect(() => {
    const body = document.body;
    if (modalRoomateVisible || modalVisible) {
      body.classList.add('modal-blur');
    } else {
      body.classList.remove('modal-blur');
    }
  }, [modalRoomateVisible, modalVisible]);

  // Handle external trigger to open roommate modal
  useEffect(() => {
    if (openRoommateModal) {
      setRoomateModalVisible(true);
    }
  }, [openRoommateModal]);

  // Handle external trigger to open room modal
  useEffect(() => {
    if (openRoomModal) {
      setModalVisible(true);
    }
  }, [openRoomModal]);

  const isCompact = cardSize === 'compact';

  return (
    <div className={className}>
      {showTitle && (
        <div className='mb-6'>
          <h2 className='font-bold text-xl mb-2'>{title}</h2>
        </div>
      )}

      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-4 ${isCompact ? '' : 'bg-opacity-100'}`}
      >
        {/* Need Room with Roommate Card */}
        <div
          onClick={() => setModalVisible(true)}
          className={`bg-[#14C0FE] rounded-xl flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity ${
            isCompact ? 'p-3' : 'p-6'
          }`}
        >
          <img
            src={HouseImage}
            className={`object-contain ${isCompact ? 'w-12 h-12' : 'w-16 h-16 mb-3'}`}
            alt='Find room'
          />
          <p
            className={`text-black font-medium text-center leading-tight ${
              isCompact ? 'text-sm' : 'text-lg mb-2'
            }`}
          >
            Need Room <br /> with roommate
          </p>
          {!isCompact && (
            <p className='text-black text-sm text-center'>
              Looking for a room where you can share with a roommate
            </p>
          )}
        </div>

        {/* Need Roommate Card */}
        <div
          onClick={() => setRoomateModalVisible(true)}
          className={`bg-[#F0F424] rounded-xl flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity ${
            isCompact ? 'p-3' : 'p-6'
          }`}
        >
          <img
            src={RoommatesImage}
            className={`object-contain mt-2 ${isCompact ? 'w-10 h-10' : 'w-14 h-14 mb-3'}`}
            alt='Find roommate'
          />
          <p
            className={`text-black font-medium text-center leading-tight ${
              isCompact ? 'text-sm' : 'text-lg mb-2'
            }`}
          >
            Need Roommate
            {isCompact && <br />}
            {isCompact && 'for your room'}
          </p>
          {!isCompact && (
            <p className='text-black text-sm text-center'>
              Looking for a roommate to share your room
            </p>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          if (onRoomModalClose) {
            onRoomModalClose();
          }
        }}
        footer={null}
        width='100%'
        style={{ maxWidth: 700 }}
        bodyStyle={{ padding: 0, backgroundColor: 'black' }}
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
        <RoomNeedPage noPadding />
      </Modal>

      <Modal
        open={modalRoomateVisible}
        onCancel={() => {
          setRoomateModalVisible(false);
          if (onRoommateModalClose) {
            onRoommateModalClose();
          }
        }}
        footer={null}
        width='100%'
        style={{ maxWidth: 800 }}
        bodyStyle={{ padding: 0, backgroundColor: 'black' }}
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
        <RoomateNeedPage noPadding />
      </Modal>
    </div>
  );
}
