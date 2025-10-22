import { useState, useEffect } from 'react';

/**
 * Custom hook to manage PostRequirement modal states from sessionStorage
 * Checks for flags set by Roomhousing/RoommateHousing components and opens appropriate modals
 */
export const usePostRequirementModals = () => {
  const [openRoommateModal, setOpenRoommateModal] = useState(false);
  const [openRoomModal, setOpenRoomModal] = useState(false);

  useEffect(() => {
    // Check if we need to open roommate modal after navigation from Roomhousing page
    const shouldOpenRoommateModal = sessionStorage.getItem('openRoommateModal');
    if (shouldOpenRoommateModal === 'true') {
      sessionStorage.removeItem('openRoommateModal');
      setOpenRoommateModal(true);
    }

    // Check if we need to open room modal after navigation from RoommateHousing page
    const shouldOpenRoomModal = sessionStorage.getItem('openRoomModal');
    if (shouldOpenRoomModal === 'true') {
      sessionStorage.removeItem('openRoomModal');
      setOpenRoomModal(true);
    }
  }, []);

  const handleRoommateModalClose = () => {
    setOpenRoommateModal(false);
  };

  const handleRoomModalClose = () => {
    setOpenRoomModal(false);
  };

  return {
    openRoommateModal,
    openRoomModal,
    handleRoommateModalClose,
    handleRoomModalClose,
  };
};
