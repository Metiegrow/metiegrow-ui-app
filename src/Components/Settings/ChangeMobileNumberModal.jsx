import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useState, useEffect } from 'react';
import { ModalCloseIcon } from '../Common/SVG/svg.function';
import { fetchCountries as fetchCountriesApi } from '../../Common/APIHandler';

const ChangeMobileNumberModal = ({ isOpen, onClose, onUpdate, currentPhoneNumber }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  console.log('ChangeMobileNumberModal - currentPhoneNumber prop:', currentPhoneNumber);
  console.log('ChangeMobileNumberModal - isOpen:', isOpen);

  // Load countries from backend API (flags + phone codes)
  const loadCountries = async () => {
    try {
      const data = await fetchCountriesApi();
      setCountries(data || []);
      console.log('Countries loaded:', data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Parse phone number to extract phone code and number
  const parsePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return { phoneCode: '', number: '' };

    // Find matching country by phone code
    const country = countries.find((country) => phoneNumber.startsWith(country.phoneCode));

    if (country) {
      return {
        phoneCode: country.phoneCode,
        number: phoneNumber.replace(country.phoneCode, '').trim(),
        country: country,
      };
    }

    // Default fallback
    return { phoneCode: '', number: phoneNumber };
  };

  // Set form values when modal opens
  useEffect(() => {
    if (isOpen) {
      loadCountries();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && currentPhoneNumber && countries.length > 0) {
      const parsed = parsePhoneNumber(currentPhoneNumber);
      console.log('Parsed phone number:', parsed);

      form.setFieldsValue({
        oldPhoneNumber: currentPhoneNumber,
        country: parsed.country ? parsed.country.name : undefined,
        phoneCode: parsed.phoneCode,
        newPhoneNumber: parsed.number,
      });

      if (parsed.country) {
        setSelectedCountry(parsed.country);
      }
    }
  }, [isOpen, currentPhoneNumber, countries, form]);

  // Handle country selection change
  const handleCountryChange = (countryName) => {
    const country = countries.find((c) => c.name === countryName);
    if (country) {
      setSelectedCountry(country);
      form.setFieldsValue({
        phoneCode: country.phoneCode,
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (values.newPhoneNumber !== values.confirmPhoneNumber) {
        message.error('Phone numbers do not match');
        return;
      }

      // Combine phone code and number with safeguards
      const resolvedPhoneCode = values.phoneCode || selectedCountry?.phoneCode || '';
      const normalizedPhoneCode = resolvedPhoneCode
        ? resolvedPhoneCode.startsWith('+')
          ? resolvedPhoneCode
          : `+${resolvedPhoneCode}`
        : '';
      const fullPhoneNumber = `${normalizedPhoneCode}${values.newPhoneNumber}`.trim();

      await onUpdate(fullPhoneNumber);
      message.success('Phone number updated successfully!');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(error.message || 'Failed to update phone number. Please try again.');
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
      className='max-w-md'
    >
      <div className='bg-dark p-6 rounded-lg'>
        <h2 className='text-2xl font-semibold text-white mb-6'>Change Phone Number</h2>
        <Form form={form} layout='vertical' onFinish={handleSubmit} className='space-y-4'>
          <Form.Item
            name='oldPhoneNumber'
            label={<span className='text-text-graytext'>Current Phone Number</span>}
          >
            <Input
              className='w-full px-4 py-2 border rounded-lg placeholder-text-graytext focus:ring-2 focus:ring-blue-500'
              disabled
            />
          </Form.Item>

          <Form.Item
            name='country'
            label='Country'
            rules={[
              {
                required: true,
                message: 'Please select your country!',
              },
            ]}
          >
            <Select
              className='w-full'
              placeholder='Select your country'
              onChange={handleCountryChange}
              showSearch
              optionFilterProp='value'
              filterOption={(input, option) => {
                const text = typeof option?.children === 'string' ? option.children : option?.value;
                return String(text ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {countries.map((country) => (
                <Select.Option key={country.name} value={country.name}>
                  <div className='flex items-center space-x-2'>
                    <img
                      src={country.flagUrl}
                      alt={`${country.name} flag`}
                      className='w-4 h-3 object-cover rounded'
                    />
                    <span>{country.name}</span>
                    <span className='text-gray-500'>({country.phoneCode})</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='newPhoneNumber'
            label='New Phone Number'
            rules={[
              {
                required: true,
                message: 'Please input your new phone number!',
              },
              {
                pattern: /^\d{6,14}$/,
                message: 'Please enter a valid phone number (6-14 digits)!',
              },
            ]}
          >
            <Input
              className='w-full px-4 py-2 border placeholder-text-graytext rounded-lg focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your phone number'
            />
          </Form.Item>

          <Form.Item
            name='confirmPhoneNumber'
            label='Confirm New Phone Number'
            dependencies={['newPhoneNumber']}
            rules={[
              {
                required: true,
                message: 'Please confirm your new phone number!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPhoneNumber') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two phone numbers do not match!'));
                },
              }),
            ]}
          >
            <Input
              className='w-full px-4 py-2 border placeholder-text-graytext rounded-lg focus:ring-2 focus:ring-blue-500'
              placeholder='Re-enter your phone number'
            />
          </Form.Item>

          <div className='flex justify-end space-x-4 mt-6'>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              className='px-6 rounded-full bg-purple-500 hover:bg-purple-600 text-white'
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ChangeMobileNumberModal;
