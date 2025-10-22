import React, { useState } from 'react';
import { Modal, Form, Button, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QnAService, QUESTION_TYPES } from '../../Services/QnAService';
import { getAuthData } from '../Auth/Auth.Function';
import { CloseCircleOutlined } from '@ant-design/icons';
import { CustomSelect, CustomInput, CustomTextarea } from '../Common/Inputs';

// Removed TextArea import as we're using CustomTextarea

export default function AskQuestionModal({ isOpen, onClose }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const createQuestionMutation = useMutation({
    mutationFn: QnAService.createQuestion,
    onSuccess: () => {
      message.success('Question posted successfully!');
      queryClient.invalidateQueries(['questions']);
      form.resetFields();
      onClose();
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to post question');
    },
  });

  const handleSubmit = async (values) => {
    try {
      console.log('Form submitted with values:', values);
      setIsSubmitting(true);
      const authData = getAuthData();

      console.log('Auth data retrieved:', authData);

      if (!authData?.token) {
        message.error('Please login to post a question');
        return;
      }

      if (!authData?.userId) {
        message.error('User ID not found. Please login again.');
        return;
      }

      // Validate question type
      if (!QUESTION_TYPES.includes(values.questionType)) {
        message.error('Please select a valid question type');
        return;
      }

      const questionData = {
        questionType: values.questionType,
        title: values.title,
        description: values.description,
        userId: authData.userId,
      };

      console.log('Submitting question with data:', questionData);
      console.log('Auth data:', authData);

      await createQuestionMutation.mutateAsync(questionData);
    } catch (error) {
      console.error('Error submitting question:', error);
      const apiMessage = error?.response?.data?.message;
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        message.error('Your session expired. Please login again.');
      } else {
        message.error(apiMessage || 'Failed to post question');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitleCount(e.target.value.length);
  };

  const handleDescriptionChange = (e) => {
    setDescriptionCount(e.target.value.length);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={830}
      className='ask-question-modal'
      centered
      styles={{
        body: { padding: 0, backgroundColor: '#131313' },
        content: { backgroundColor: '#131313', borderRadius: '24px' },
      }}
      closeIcon={null}
    >
      <div className='bg-[#131313] rounded-[24px] p-8 sm:p-6'>
        {/* Header */}
        <div className='flex justify-between items-center mb-0 mt-o'>
          <h2 className='text-white text-[26px] font-bold'>Ask Free Questions</h2>
          <a onClick={onClose} className='text-white hover:text-gray-300 transition-colors'>
            <CloseCircleOutlined className='text-[32px]' />
          </a>
        </div>

        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          onFinishFailed={(errorInfo) => {
            console.log('Form validation failed:', errorInfo);
            message.error('Please fill in all required fields correctly');
          }}
          className='space-y-3'
        >
          {/* Question Type */}
          <div className='space-y-3'>
            <Form.Item
              name='questionType'
              rules={[{ required: true, message: 'Please select a question type' }]}
              className='mb-0'
            >
              <CustomSelect
                label='Question Type'
                placeholder='Select Type'
                options={QUESTION_TYPES.map((type) => ({ value: type, label: type }))}
                required={true}
              />
            </Form.Item>
          </div>

          {/* Question Title */}
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <label className='block text-white text-base font-normal'>
                Question Title <span className='text-red-500'>*</span>
              </label>
            </div>
            <Form.Item
              name='title'
              rules={[
                { required: true, message: 'Please enter a question title' },
                { max: 40, message: 'Title must be at most 40 characters' },
              ]}
              className='mb-0'
            >
              <CustomInput
                name='title'
                placeholder='Enter Text'
                onChange={handleTitleChange}
                maxLength={40}
                showCharCount={true}
              />
            </Form.Item>
          </div>

          {/* Description */}
          <div className='space-y-0'>
            <div className='flex justify-between items-center'>
              <label className='block text-white text-base font-normal'>
                Description <span className='text-red-500'>*</span>
              </label>
            </div>
            <Form.Item
              name='description'
              rules={[
                { required: true, message: 'Please enter your question' },
                { max: 1000, message: 'Description must be at most 1000 characters' },
              ]}
              className='mb-0'
            >
              <CustomTextarea
                name='description'
                placeholder='Typing...'
                rows={6}
                onChange={handleDescriptionChange}
                maxLength={1000}
                showCharCount={true}
              />
            </Form.Item>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end pt-0 gap-2'>
            <Form.Item className='mb-0'>
              <Button
                type='primary'
                htmlType='submit'
                loading={isSubmitting}
                className='bg-[#BC5FFF] hover:bg-[#A82EFF] border-none text-white font-semibold text-base px-8 py-3 h-auto rounded-[49px] min-w-[101px]'
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
