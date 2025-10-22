import React from 'react';
import { Form, Input, Button } from 'antd';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';
const ContactForm = ({ onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    form.resetFields();
    onClose();
  };

  return (
    // <div className="bg-[#1f1f1f] p-6 rounded-2xl w-full">

    //     <div className="flex items-center justify-between mb-4">
    //         <h2 className="text-white text-xl font-semibold">Contact Us</h2>
    //         <button className="bg-transparent p-0 m-0 border-none text-white" onClick={onClose} >
    //             <ModalCloseIcon />
    //         </button>

    //     </div>

    //     <Form
    //         form={form}
    //         layout="vertical"
    //         onFinish={handleSubmit}
    //         className="space-y-4"
    //     >
    //         <Form.Item
    //             label={<span className="text-white">Reason</span>}
    //             name="reason "
    //             rules={[{ required: true, message: 'Select The Reason Type' }]}
    //         >
    //             <Input
    //                 placeholder="Select Reason"
    //                 className="bg-transparent text-white border border-white/20 placeholder-gray-400"
    //             />
    //         </Form.Item>

    //         <Form.Item
    //             label={<span className="text-white">Question Title</span>}
    //             name="message"
    //             rules={[{ required: true, message: 'Enter the question Title' }]}
    //         >
    //             <Input
    //                 placeholder="Enter Text"
    //                 className="bg-transparent text-white border border-white/20 placeholder-gray-400"
    //             />
    //         </Form.Item>

    //         <Form.Item
    //             label={<span className="text-white">Comments</span>}
    //             name="message"
    //             rules={[{ required: true, message: 'Please enter your Comments' }]}
    //         >
    //             <Input.TextArea
    //                 rows={4}
    //                 placeholder="Typing..."
    //                 className="bg-transparent text-white border border-white/20 placeholder-gray-400"
    //             />
    //         </Form.Item>

    //         <Form.Item>
    //             <Button
    //                 htmlType="submit"
    //                 className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition"
    //             >
    //                 Submit
    //             </Button>
    //         </Form.Item>
    //     </Form>
    // </div>

    // Outer fullscreen wrapper (modal or page-level)
    <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 sm:px-4 px-0'>
      {/* Form Card: full screen on mobile, centered max-width on desktop */}
      <div className='w-screen h-screen sm:h-auto sm:w-full sm:max-w-[600px] sm:rounded-2xl rounded-none bg-[#1f1f1f] p-6 overflow-y-auto'>
        {/* Mobile Header */}
        <div className='flex items-center justify-between mb-4 sm:hidden'>
          <div onClick={onClose} className='bg-[#2b2b2b] p-2 rounded-full cursor-pointer'>
            <BackButtonIcon className='w-5 h-5 text-white' />
          </div>
          <h2 className='text-white text-xl font-semibold flex-1 text-center -ml-6'>Contact Us</h2>
          <div className='w-8' /> {/* Dummy spacer */}
        </div>

        {/* Desktop Header */}
        <div className='hidden sm:flex items-center justify-between mb-4'>
          <h2 className='text-white text-xl font-semibold'>Contact Us</h2>
          <button className='bg-transparent p-0 m-0 border-none text-white' onClick={onClose}>
            <ModalCloseIcon />
          </button>
        </div>

        <Form form={form} layout='vertical' onFinish={handleSubmit} className='space-y-4'>
          <Form.Item
            label={<span className='text-white'>Reason</span>}
            name='reason'
            rules={[{ required: true, message: 'Select The Reason Type' }]}
          >
            <Input
              placeholder='Select Reason'
              className='bg-transparent text-white border border-white/20 placeholder-gray-400'
            />
          </Form.Item>

          <Form.Item
            label={<span className='text-white'>Question Title</span>}
            name='title'
            rules={[{ required: true, message: 'Enter the question Title' }]}
          >
            <Input
              placeholder='Enter Text'
              className='bg-transparent text-white border border-white/20 placeholder-gray-400'
            />
          </Form.Item>

          <Form.Item
            label={<span className='text-white'>Comments</span>}
            name='message'
            rules={[{ required: true, message: 'Please enter your Comments' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder='Typing...'
              className='bg-transparent text-white border border-white/20 placeholder-gray-400'
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType='submit'
              className='bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto py-2 rounded-full transition'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
