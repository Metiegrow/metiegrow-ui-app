import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalCloseIcon } from '../Common/SVG/svg.function';

const PaymentSettings = () => {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from db.json
    fetch(`${URL}/api/paymentSettings`)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setSavedCards(data?.savedCards?.cards || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payment settings:', error);
        setSavedCards([]);
        setLoading(false);
      });
  }, []);

  const handleAddCard = async (values) => {
    try {
      const newCard = {
        id: savedCards.length + 1,
        cardNumber: `**** **** **** ${values.cardNumber.slice(-4)}`,
        cardHolderName: values.cardName,
        expiryDate: values.expiryDate.format('MM/YY'),
        isDefault: savedCards.length === 0,
      };

      // Update backend first
      const response = await fetch(`${URL}/api/paymentSettings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savedCards: {
            cards: [...savedCards, newCard],
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save card');
      }

      // Update local state only after successful API call
      setSavedCards((prevCards) => [...prevCards, newCard]);
      message.success('Card added successfully');
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Error adding card:', error);
      message.error('Failed to add card. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <div className='text-white'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-white'>Saved Cards</h1>
        <Button
          type='link'
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className='bg-transparent text-purple-500 text-lg border-none'
        >
          Add New Card
        </Button>
      </div>

      <div className='grid gap-4'>
        {savedCards && savedCards.length > 0 ? (
          savedCards.map((card) => (
            <Card key={card.id} className='bg-[#1a1a1a] text-white border border-gray-700'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 flex items-center justify-center'>
                    <img src='/visa-logo.png' alt='Card' className='w-full h-auto' />
                  </div>
                  <div>
                    <p className='font-medium'>{card.cardHolderName}</p>
                    <p className='text-gray-400'>{card.cardNumber}</p>
                    <p className='text-gray-400'>Expires: {card.expiryDate}</p>
                    {card.isDefault && (
                      <span className='text-xs text-purple-500'>Default Card</span>
                    )}
                  </div>
                </div>
                <Button type='link' className='border-purple-500 text-white rounded-full'>
                  Manage
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className='text-center text-gray-400 py-8'>
            No saved cards found. Add a new card to get started.
          </div>
        )}
      </div>

      <Modal
        title={<h1 className='text-white bg-dark text-2xl font-semibold'>Add New Card</h1>}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        className='bg-dark py-4 px-6'
        width={600}
        closeIcon={<ModalCloseIcon />}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleAddCard}
          className='my-8 bg-transparent'
        >
          <Form.Item
            name='cardNumber'
            label={<span className='text-white'>Card Number</span>}
            className='mb-6 text-white'
            rules={[
              { required: true, message: 'Please enter card number' },
              {
                pattern: /^\d{16}$/,
                message: 'Please enter a valid 16-digit card number',
              },
            ]}
          >
            <Input
              placeholder='XXXX XXXX XXXX XXXX'
              className='h-12 bg-transparent border !border-borders text-white rounded-full placeholder:text-text-graytext'
              maxLength={16}
            />
          </Form.Item>

          <Form.Item
            name='cardName'
            label={<span className='text-white'>Card Holder Name</span>}
            className='mb-6'
            rules={[{ required: true, message: 'Please enter card holder name' }]}
          >
            <Input
              placeholder='Enter Name'
              className='h-12 bg-transparent border !border-borders placeholder:text-text-graytext text-white rounded-full'
            />
          </Form.Item>

          <div className='flex gap-4'>
            <Form.Item
              name='expiryDate'
              label={<span className='text-white'>Expire on</span>}
              className='flex-1 mb-6'
              rules={[{ required: true, message: 'Please select expiry date' }]}
            >
              <DatePicker
                picker='month'
                format='MM/YY'
                className='w-full h-12 bg-transparent border !border-borders text-white rounded-full'
              />
            </Form.Item>

            <Form.Item
              name='cvv'
              label={<span className='text-white'>CVV</span>}
              className='flex-1 mb-6'
              rules={[
                { required: true, message: 'Please enter CVV' },
                { pattern: /^\d{3,4}$/, message: 'Please enter a valid CVV' },
              ]}
            >
              <Input
                placeholder='Enter CVV Number'
                className='h-12 placeholder:text-text-graytext bg-transparent border !border-borders text-white rounded-full'
                maxLength={4}
                type='password'
              />
            </Form.Item>
          </div>

          <Form.Item className='mb-0'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full h-12 bg-purple-600 hover:bg-purple-700 rounded-full text-white'
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentSettings;
