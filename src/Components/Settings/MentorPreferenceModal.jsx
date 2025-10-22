import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { X } from 'lucide-react';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';

const { Option } = Select;

const MentorPreferenceModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Format the data
      const formattedData = {
        ...values,
        skills: values.skills || [],
        addedOn: new Date().toISOString().split('T')[0],
      };

      await onUpdate(formattedData);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Please fill in all required fields correctly');
    } finally {
      setLoading(false);
    }
  };

  const industryOptions = [
    'Information Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Other',
  ];

  const skillOptions = [
    'Product Management',
    'Software Development',
    'Data Science',
    'UI/UX Design',
    'Project Management',
    'Business Analysis',
    'Marketing',
    'Sales',
    'Other',
  ];

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      className='custom-dark-modal'
      closable={false}
    >
      <div className='bg-[#111111] rounded-lg p-5 sm:p-6 text-white'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>
            {initialData ? 'Edit Mentor Preferences' : 'Add Mentor Preferences'}
          </h2>
          <button
            onClick={onClose}
            className='appearance-none bg-transparent border-none p-1 m-0 text-gray-400 hover:text-white'
          >
            <ModalCloseIcon className='w-5 h-5 ' />
          </button>
        </div>

        <Form form={form} layout='vertical' onFinish={handleSubmit} className='space-y-4'>
          <Form.Item
            name='industryType'
            label='Industry Type'
            rules={[{ required: true, message: 'Please select an industry type' }]}
          >
            <Select placeholder='Select industry type' className='w-full'>
              {industryOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='location'
            label='Location Preferred'
            rules={[{ required: true, message: 'Please enter preferred location' }]}
          >
            <Input placeholder='e.g., Sydney, Australia' className='w-full' />
          </Form.Item>

          <Form.Item
            name='experience'
            label='Experience'
            rules={[{ required: true, message: 'Please select experience range' }]}
          >
            <Select placeholder='Select experience range' className='w-full'>
              <Option value='0-2'>0-2 years</Option>
              <Option value='2-5'>2-5 years</Option>
              <Option value='5-10'>5-10 years</Option>
              <Option value='10+'>10+ years</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='skills'
            label='Skills'
            rules={[{ required: true, message: 'Please select at least one skill' }]}
          >
            <Select mode='multiple' placeholder='Select skills' className='w-full'>
              {skillOptions.map((skill) => (
                <Option key={skill} value={skill}>
                  {skill}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name='description' label='Additional Requirements'>
            <Input.TextArea
              placeholder='Add any additional requirements or preferences'
              rows={4}
              className='w-full'
            />
          </Form.Item>

          {/* Footer */}
          <div className='flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4'>
            <Button onClick={onClose} className='w-full sm:w-auto'>
              Cancel
            </Button>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              className='w-full sm:w-auto bg-[#a259ff] text-white px-6 py-2 rounded-full text-sm shadow-lg'
            >
              {initialData ? 'Update' : 'Add'}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default MentorPreferenceModal;
