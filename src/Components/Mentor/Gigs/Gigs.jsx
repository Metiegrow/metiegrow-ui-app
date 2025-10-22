import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Form, Input, InputNumber, Button, Upload, message, Popconfirm } from 'antd';
import { Pencil, ArrowUpRight, Trash2 } from 'lucide-react';
import ResumeImage from '../../../assets/Resume.png';

const API_URL = import.meta.env.VITE_API_BASE_URL_BACKEND + '/gigs';

const fetchGigs = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch gigs');
  return await res.json();
};

const postGig = async (gig) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gig),
  });
  if (!res.ok) throw new Error('Failed to add gig');
  return await res.json();
};

const updateGig = async (gig) => {
  const res = await fetch(`${API_URL}/${gig.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gig),
  });
  if (!res.ok) throw new Error('Failed to update gig');
  return await res.json();
};

const deleteGig = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete gig');
  return id;
};

const GigCard = ({ gig, onEdit, onDelete }) => (
  <div className='bg-[#232323] rounded-3xl p-8 shadow-lg relative w-full min-h-[320px] flex flex-col justify-between'>
    {/* Edit & Delete buttons top right */}
    <div className='absolute top-4 right-4 flex gap-2 z-10'>
      <button
        className='bg-white/10 hover:bg-purple-500 text-white rounded-full p-2'
        onClick={onEdit}
        aria-label='Edit'
      >
        <Pencil size={20} />
      </button>
      <Popconfirm title='Delete this gig?' onConfirm={onDelete} okText='Yes' cancelText='No'>
        <button
          className='bg-white/10 hover:bg-red-500 text-white rounded-full p-2'
          aria-label='Delete'
        >
          <Trash2 size={20} />
        </button>
      </Popconfirm>
    </div>
    {/* No image shown on the card */}
    <div className='text-gray-400 text-lg mb-1'>{gig.subject}</div>
    <div className='font-bold text-2xl mb-2 text-white'>{gig.title}</div>
    <div className='text-gray-300 text-lg mb-4'>
      {gig.description?.slice(0, 55)}
      {gig.description?.length > 55 && (
        <>
          -<span className='text-purple-500 cursor-pointer ml-1'>more</span>
        </>
      )}
    </div>
    <div className='flex items-end justify-between mt-6'>
      <div className='flex items-baseline gap-2'>
        <span className='text-3xl font-extrabold text-white'>${gig.price}</span>
        <span className='text-gray-400 text-lg'>Per hrs</span>
      </div>
      <button
        className='bg-purple-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg'
        aria-label='Action'
      >
        <ArrowUpRight size={32} className='text-white' />
      </button>
    </div>
  </div>
);

const Gigs = () => {
  const queryClient = useQueryClient();
  const {
    data: gigs = [],
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ['gigs'], queryFn: fetchGigs });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGig, setEditingGig] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const postMutation = useMutation({
    mutationFn: postGig,
    onSuccess: () => {
      queryClient.invalidateQueries(['gigs']);
      message.success('Gig added!');
      setModalOpen(false);
      setFileList([]);
    },
    onError: () => message.error('Failed to add gig'),
  });
  const updateMutation = useMutation({
    mutationFn: updateGig,
    onSuccess: () => {
      queryClient.invalidateQueries(['gigs']);
      message.success('Gig updated!');
      setModalOpen(false);
      setFileList([]);
    },
    onError: () => message.error('Failed to update gig'),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteGig,
    onSuccess: () => {
      queryClient.invalidateQueries(['gigs']);
      message.success('Gig deleted!');
    },
    onError: () => message.error('Failed to delete gig'),
  });

  const handleAdd = () => {
    setEditingGig(null);
    form.resetFields();
    setFileList([]);
    setModalOpen(true);
  };

  const handleEdit = (gig) => {
    setEditingGig(gig);
    form.setFieldsValue(gig);
    setFileList(gig.image ? [{ uid: '-1', url: gig.image, name: 'image', status: 'done' }] : []);
    setModalOpen(true);
  };

  const handleDelete = (gig) => {
    deleteMutation.mutate(gig.id);
  };

  const handleFinish = (values) => {
    // Only 'description' is required
    if (!values.description) {
      message.error('Please enter a description.');
      return;
    }
    // Only one image
    const image = fileList[0]?.url || fileList[0]?.thumbUrl;
    if (editingGig) {
      updateMutation.mutate({ ...editingGig, ...values, image });
    } else {
      postMutation.mutate({ ...values, image });
    }
  };

  return (
    <div className='min-h-screen bg-black flex flex-col items-center py-10 px-2'>
      {isError ? (
        <div className='text-red-500'>Error: {error.message}</div>
      ) : (!gigs || gigs.length === 0) && !isLoading ? (
        <div className='flex flex-col items-center justify-center w-full h-[70vh]'>
          <img src={ResumeImage} alt='No gigs' className='w-40 h-40 mb-6' />
          <div className='text-white text-center mb-2'>Still you're not add any gigs</div>
          <Button
            type='primary'
            className='bg-purple-500 rounded-full w-full max-w-md h-16 text-lg font-semibold mt-4'
            style={{ boxShadow: '0 8px 32px 0 #b36bfc55' }}
            onClick={handleAdd}
          >
            Add Gigs
          </Button>
        </div>
      ) : isLoading ? (
        <div className='text-white'>Loading...</div>
      ) : (
        <>
          <Button type='primary' className='mb-8 bg-purple-500' onClick={handleAdd}>
            Add Gig
          </Button>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl'>
            {gigs.map((gig) => (
              <GigCard
                key={gig.id}
                gig={gig}
                onEdit={() => handleEdit(gig)}
                onDelete={() => handleDelete(gig)}
              />
            ))}
          </div>
        </>
      )}
      <Modal
        open={modalOpen}
        title={editingGig ? 'Edit Gig' : 'Add Gig'}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        destroyOnClose
      >
        <Form
          form={form}
          layout='vertical'
          initialValues={editingGig || {}}
          onFinish={handleFinish}
        >
          <Form.Item name='title' label='Title' rules={[]}>
            <Input />
          </Form.Item>
          <Form.Item name='subject' label='Subject' rules={[]}>
            <Input />
          </Form.Item>
          <Form.Item name='price' label='Price' rules={[]}>
            <InputNumber min={1} className='w-full' />
          </Form.Item>
          <Form.Item
            name='description'
            label='Description'
            rules={[
              { required: true, message: 'Please enter a description' },
              { max: 1000, message: 'Max 1000 characters' },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label='Cover Image' required={false} rules={[]}>
            <Upload
              listType='picture-card'
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([
                  {
                    uid: file.uid,
                    name: file.name,
                    status: 'done',
                    url: URL.createObjectURL(file),
                  },
                ]);
                return false;
              }}
              onRemove={() => setFileList([])}
              maxCount={1}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full bg-purple-500'>
              {editingGig ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Gigs;
