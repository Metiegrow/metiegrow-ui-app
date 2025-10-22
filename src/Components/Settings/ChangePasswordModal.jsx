import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { ModalCloseIcon } from '../Common/SVG/svg.function';
import PasswordInput from '../Common/Inputs/PasswordInput';

const ChangePasswordModal = ({ isOpen, onClose, onUpdate }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      message.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error('New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await onUpdate(oldPassword, newPassword, confirmPassword);
      message.success('Password changed successfully');
      handleReset();
      onClose();
    } catch (error) {
      message.error(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className='max-w-md'
      destroyOnClose
      closeIcon={<ModalCloseIcon />}
    >
      <div className='space-y-6 py-4 px-5 shadow-xl'>
        <h2 className='text-2xl font-semibold text-white'>Change Password</h2>

        <div>
          <PasswordInput
            label='Current Password'
            value={oldPassword}
            onChange={setOldPassword}
            placeholder='Enter current password'
          />
        </div>

        <div>
          <PasswordInput
            label='New Password'
            value={newPassword}
            onChange={setNewPassword}
            placeholder='Enter new password'
          />
        </div>

        <div>
          <PasswordInput
            label='Confirm New Password'
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder='Confirm new password'
          />
        </div>

        <div className='flex justify-end space-x-4 pt-4'>
          <Button
            type='primary'
            onClick={handleSubmit}
            loading={loading}
            className='bg-purple-500 px-6 text-white rounded-full hover:bg-purple-600'
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
