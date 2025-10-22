import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { ModalCloseIcon } from '../Common/SVG/svg.function';

const ChangeEmailModal = ({ isOpen, onClose, onUpdate, currentEmail }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form values when modal opens
  useEffect(() => {
    if (isOpen && currentEmail) {
      form.setFieldsValue({
        oldEmail: currentEmail,
      });
    }
  }, [isOpen, currentEmail, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (values.newEmail !== values.confirmEmail) {
        message.error('Email addresses do not match');
        return;
      }

      const result = await onUpdate(values.newEmail);
      const successMsg =
        (result && (result.message || result.msg || result.successMessage)) ||
        (result && result.data && (result.data.message || result.data.msg)) ||
        'Email updated successfully!';
      message.success(successMsg);
      form.resetFields();
      onClose();
    } catch (error) {
      const errorMsg =
        (error &&
          error.response &&
          error.response.data &&
          (error.response.data.message || error.response.data.msg)) ||
        error.message ||
        'Failed to update email. Please try again.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closeIcon={<ModalCloseIcon />}
      className='max-w-4xl'
    >
      <div className='bg-dark p-6 rounded-lg'>
        <h2 className='text-2xl font-semibold text-white mb-6'>Change Email Address</h2>
        <Form form={form} layout='vertical' onFinish={handleSubmit} className='space-y-4'>
          <Form.Item
            name='oldEmail'
            label={<span className='text-text-graytext'>Current Email Address</span>}
          >
            <Input
              className='w-full px-4 py-2 border rounded-lg placeholder-text-graytext focus:ring-2 focus:ring-blue-500'
              disabled
            />
          </Form.Item>

          <Form.Item
            name='newEmail'
            label='New Email Address'
            rules={[
              {
                required: true,
                message: 'Please input your new email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input
              className='w-full px-4 py-2 border placeholder-text-graytext rounded-lg focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your new email'
            />
          </Form.Item>

          <Form.Item
            name='confirmEmail'
            label='Confirm New Email'
            dependencies={['newEmail']}
            rules={[
              {
                required: true,
                message: 'Please confirm your new email!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newEmail') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two emails do not match!'));
                },
              }),
            ]}
          >
            <Input
              className='w-full px-4 py-2 border placeholder-text-graytext rounded-lg focus:ring-2 focus:ring-blue-500'
              placeholder='Re-enter your new email'
            />
          </Form.Item>

          <div className='flex justify-end space-x-4 mt-6'>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              disabled={loading}
              className='px-6 rounded-full bg-purple-500 hover:bg-purple-600 text-white disabled:bg-purple-400'
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ChangeEmailModal;
