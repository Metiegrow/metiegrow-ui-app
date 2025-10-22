import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Button, message } from 'antd';
import dayjs from 'dayjs';
import { ModalCloseIcon } from '../Common/SVG/svg.function';

const StudyPreferenceModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        startDate: initialData.startDate ? dayjs(initialData.startDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Format the date
      const formattedData = {
        ...values,
        startDate: values.startDate.format('MMMM YYYY'),
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

  return (
    <div className=''>
      <Modal
        title={initialData ? 'Edit Study Preference' : 'Add Study Preference'}
        open={isOpen}
        onCancel={onClose}
        footer={[
          <Button key='cancel' onClick={onClose}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleSubmit}
            className='bg-purple-600 hover:bg-purple-700'
          >
            {initialData ? 'Update' : 'Add'}
          </Button>,
        ]}
        className='bg-gray-900'
        closeIcon={<ModalCloseIcon />}
        size='large'
        width={800}
      >
        <Form form={form} layout='vertical' className='text-white'>
          <Form.Item
            name='course'
            label='Course'
            rules={[{ required: true, message: 'Please enter the course name' }]}
          >
            <Input placeholder='e.g., B.Tech Computer Science' />
          </Form.Item>

          <Form.Item
            name='university'
            label='University'
            rules={[{ required: true, message: 'Please enter the university name' }]}
          >
            <Input placeholder='e.g., University of Technology' />
          </Form.Item>

          <Form.Item
            name='startDate'
            label='Start Date'
            rules={[{ required: true, message: 'Please select the start date' }]}
          >
            <DatePicker picker='month' className='w-full' placeholder='Select start date' />
          </Form.Item>

          <Form.Item name='description' label='Description'>
            <Input.TextArea
              placeholder='Add any additional details about your study preference'
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudyPreferenceModal;

// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Input, Select, Row, Col } from 'antd';
// import { ModalCloseIcon,DropdownIcon } from '../Common/SVG/svg.function';
// import dayjs from 'dayjs';

// const { Option } = Select;

// // A simple SVG icon for the modal close button

// const StudyPreferenceModal = ({ isOpen, onClose, initialData }) => {
//     const [form] = Form.useForm();
//     const [loading, setLoading] = useState(false);

//     // Effect to set initial form values when initialData changes or modal opens
//     useEffect(() => {
//         if (isOpen && initialData) {
//             form.setFieldsValue({
//                 ...initialData,
//             });
//         } else if (isOpen && !initialData) {
//             form.resetFields();
//         }
//     }, [isOpen, initialData, form]);

//     const handleSubmit = async () => {
//         try {
//             setLoading(true);
//             const values = await form.validateFields();

//             console.log('Form values:', values);

//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 1500));

//             onClose();
//             form.resetFields();
//         } catch (error) {
//             console.error('Validation failed or submission error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Dummy options for Select components
//     const courseOptions = [
//         { value: 'btech-cs', label: 'B.Tech Computer Science' },
//         { value: 'mtech-ai', label: 'M.Tech Artificial Intelligence' },
//         { value: 'mba', label: 'MBA Business Administration' },
//     ];

//     const intakeYearOptions = [
//         { value: '2024-fall', label: 'Fall 2024' },
//         { value: '2025-spring', label: 'Spring 2025' },
//         { value: '2025-fall', label: 'Fall 2025' },
//     ];

//     const fieldOfStudyOptions = [
//         { value: 'medical', label: 'Medical' },
//         { value: 'engineering', label: 'Engineering' },
//         { value: 'business', label: 'Business' },
//         { value: 'arts', label: 'Arts' },
//     ];

//     const universityOptions = [
//         { value: 'uni-tech', label: 'University of Technology' },
//         { value: 'state-uni', label: 'State University' },
//         { value: 'global-uni', label: 'Global University' },
//     ];

//     const countryOptions = [
//         { value: 'usa', label: 'United States' },
//         { value: 'canada', label: 'Canada' },
//         { value: 'uk', label: 'United Kingdom' },
//         { value: 'australia', label: 'Australia' },
//     ];

//     const cityOptions = [
//         { value: 'ny', label: 'New York' },
//         { value: 'la', label: 'Los Angeles' },
//         { value: 'toronto', label: 'Toronto' },
//         { value: 'london', label: 'London' },
//     ];

//     const stateOptions = [
//         { value: 'ca', label: 'California' },
//         { value: 'ny', label: 'New York' },
//         { value: 'on', label: 'Ontario' },
//         { value: 'eng', label: 'England' },
//     ];

//     return (
//         <div className=''>
//             <Modal
//                 title={<span className="text-white text-xl font-semibold">Add Study Phase</span>}
//                 open={isOpen}
//                 onCancel={onClose}
//                 footer={[
//                     <Button
//                         key="submit"
//                         type="primary"
//                         loading={loading}
//                         onClick={handleSubmit}
//                         className="bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2"
//                     >
//                         Confirm
//                     </Button>
//                 ]}
//                 className="rounded-lg shadow-lg"
//                 closeIcon={<ModalCloseIcon />}
//                 size="large"
//                 // Adjusted width for responsiveness: full width on small screens, wider on larger screens
//                 width={"calc(100% - 32px)"} // Full width minus some margin on mobile
//                 style={{ maxWidth: '900px' }} // Max width for larger screens
//                 styles={{
//                     content: { backgroundColor: '#000000', padding: 0 },
//                     header: { backgroundColor: '#000000', borderBottom: 'none', padding: '24px 24px 0px 24px' },
//                     body: { backgroundColor: '#000000', padding: '0px 24px 24px 24px' },
//                     footer: { backgroundColor: '#000000', borderTop: 'none', padding: '0px 24px 24px 24px', display: 'flex', justifyContent: 'flex-end' },
//                 }}
//             >
//                 <Form
//                     form={form}
//                     layout="vertical"
//                     className="text-white"
//                 >
//                     {/* Course Field */}
//                     <div className="mb-4">
//                         <label htmlFor="course" className="block text-sm font-medium text-gray-300 mb-1">
//                             Course <span className="text-red-500">*</span>
//                         </label>
//                         <Form.Item
//                             name="course"
//                             noStyle
//                             rules={[{ required: true, message: 'Please select a course' }]}
//                         >
//                             <Select
//                                 id="course"
//                                 placeholder="Select Course"
//                                 className="w-full rounded-xl ant-select-dark"
//                                 options={courseOptions}
//                                 style={{ height: '51px' }}
//                                 suffixIcon={<DropdownIcon />}
//                                 styles={{
//                                     selector: {
//                                         backgroundColor: '#2d3748',
//                                         borderColor: '#4a5568',
//                                         color: '#ffffff'
//                                     },
//                                     placeholder: {
//                                         color: '#a0aec0'
//                                     }
//                                 }}
//                             />
//                         </Form.Item>
//                     </div>

//                     {/* Intake & Year Field */}
//                     <div className="mb-4">
//                         <label htmlFor="intakeYear" className="block text-sm font-medium text-gray-300 mb-1">
//                             Intake & Year <span className="text-red-500">*</span>
//                         </label>
//                         <Form.Item
//                             name="intakeYear"
//                             noStyle
//                             rules={[{ required: true, message: 'Please select intake & year' }]}
//                         >
//                             <Select
//                                 id="intakeYear"
//                                 placeholder="Select Intake & Year"
//                                 className="w-full rounded-xl ant-select-dark"
//                                 options={intakeYearOptions}
//                                 style={{ height: '51px' }}
//                                 suffixIcon={<DropdownIcon />}
//                                 styles={{
//                                     selector: { backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#ffffff' },
//                                     placeholder: { color: '#a0aec0' }
//                                 }}
//                             />
//                         </Form.Item>
//                     </div>

//                     {/* Field of Study Field */}
//                     <div className="mb-4">
//                         <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-300 mb-1">
//                             Field of study <span className="text-red-500">*</span>
//                         </label>
//                         <Form.Item
//                             name="fieldOfStudy"
//                             noStyle
//                             rules={[{ required: true, message: 'Please select a field of study' }]}
//                         >
//                             <Select
//                                 id="fieldOfStudy"
//                                 placeholder="Select study field (eg. Medical, Eng.)"
//                                 className="w-full rounded-xl ant-select-dark"
//                                 options={fieldOfStudyOptions}
//                                 style={{ height: '51px' }}
//                                 suffixIcon={<DropdownIcon />}
//                                 styles={{
//                                     selector: { backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#ffffff' },
//                                     placeholder: { color: '#a0aec0' }
//                                 }}
//                             />
//                         </Form.Item>
//                     </div>

//                     {/* Preferred Universities Field */}
//                     <div className="mb-4">
//                         <label htmlFor="preferredUniversities" className="block text-sm font-medium text-gray-300 mb-1">
//                             Preferred Universities <span className="text-red-500">*</span>
//                         </label>
//                         <Form.Item
//                             name="preferredUniversities"
//                             noStyle
//                             rules={[{ required: true, message: 'Please select preferred universities' }]}
//                         >
//                             <Select
//                                 id="preferredUniversities"
//                                 mode="multiple"
//                                 placeholder="Select Universities"
//                                 className="w-full rounded-xl ant-select-dark"
//                                 options={universityOptions}
//                                 style={{ height: '51px' }}
//                                 suffixIcon={<DropdownIcon />}
//                                 styles={{
//                                     selector: { backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#ffffff' },
//                                     placeholder: { color: '#a0aec0' }
//                                 }}
//                             />
//                         </Form.Item>
//                     </div>

//                     {/* Country Field */}
//                     <div className="mb-4">
//                         <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
//                             Country <span className="text-red-500">*</span>
//                         </label>
//                         <Form.Item
//                             name="country"
//                             noStyle
//                             rules={[{ required: true, message: 'Please select a country' }]}
//                         >
//                             <Select
//                                 id="country"
//                                 placeholder="Select Country"
//                                 className="w-full rounded-xl ant-select-dark"
//                                 options={countryOptions}
//                                 style={{ height: '51px' }}
//                                 suffixIcon={<DropdownIcon />}
//                                 styles={{
//                                     selector: { backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#ffffff' },
//                                     placeholder: { color: '#a0aec0' }
//                                 }}
//                             />
//                         </Form.Item>
//                     </div>

//                     {/* City and State Fields (side-by-side) */}
//                     <Row gutter={16} className="mb-4"> {/* Adjusted gutter for better mobile spacing */}
//                         <Col xs={24} sm={12}> {/* Full width on extra small, half width on small and up */}
//                             <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
//                                 City <span className="text-red-500">*</span>
//                             </label>
//                             <Form.Item
//                                 name="city"
//                                 noStyle
//                                 rules={[{ required: true, message: 'Please select a city' }]}
//                             >
//                                 <Select
//                                     id="city"
//                                     placeholder="Select City"
//                                     className="w-full rounded-xl ant-select-dark"
//                                     options={cityOptions}
//                                     style={{ height: '51px' }}
//                                     suffixIcon={<DropdownIcon />}
//                                     styles={{
//                                         selector: { backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#ffffff' },
//                                         placeholder: { color: '#a0aec0' }
//                                     }}
//                                 />
//                             </Form.Item>
//                         </Col>
//                         <Col xs={24} sm={12}> {/* Full width on extra small, half width on small and up */}
//                             <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
//                                 State <span className="text-red-500">*</span>
//                             </label>
//                             <Form.Item
//                                 name="state"
//                                 noStyle
//                                 rules={[{ required: true, message: 'Please select a state' }]}
//                             >
//                                 <Select
//                                     id="state"
//                                     placeholder="Select State"
//                                     className="w-full rounded-xl ant-select-dark"
//                                     options={stateOptions}
//                                     style={{ height: '51px' }}
//                                     suffixIcon={<DropdownIcon />}
//                                     styles={{
//                                         selector: { backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#ffffff' },
//                                         placeholder: { color: '#a0aec0' }
//                                     }
//                                     }
//                                 />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default StudyPreferenceModal;
