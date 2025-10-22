import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE = 'http://localhost:9001/compliances';

const fetchCompliance = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

const patchMessages = async ({ id, messages }) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error('Failed to update messages');
  return res.json();
};

const ComplianceDetails = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const timelineRef = useRef(null);
  const queryClient = useQueryClient();

  // Fetch compliance details
  const {
    data: compliance,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['compliance', id],
    queryFn: () => fetchCompliance(id),
    refetchOnWindowFocus: false,
  });

  // Mutation for posting a new message
  const mutation = useMutation({
    mutationFn: ({ id, messages }) => patchMessages({ id, messages }),
    onSuccess: () => {
      queryClient.invalidateQueries(['compliance', id]);
    },
  });

  // Scroll to bottom on new message
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [compliance]);

  // Post a new message
  const handleSend = async () => {
    if (!newMessage.trim() || !compliance) return;
    const messageObj = {
      sender: 'You',
      avatar: 'https://i.pravatar.cc/40?img=2', // Replace with actual user
      message: newMessage,
      date: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const updatedMessages = [...(compliance.messages || []), messageObj];
    mutation.mutate({ id, messages: updatedMessages });
    setNewMessage('');
  };

  if (isLoading) return <div className='text-white p-4'>Loading...</div>;
  if (isError || !compliance) return <div className='text-white p-4'>Not found</div>;

  // Combine complaint details and messages for timeline
  const timelineItems = [
    ...(compliance.complaintDetails || []).map((cd) => ({
      type: 'complaint',
      avatar: compliance.raisedBy.avatar,
      label: 'Complaint details',
      sender: compliance.raisedBy.name,
      date: cd.date,
      message: cd.message,
    })),
    ...(compliance.messages || []).map((msg) => ({
      type: 'response',
      avatar: msg.avatar,
      label: msg.sender === 'You' ? 'Your response' : msg.sender,
      sender: msg.sender,
      date: msg.date,
      message: msg.message,
    })),
  ];

  return (
    <div className='bg-[#181818] min-h-screen text-white p-4 flex flex-col'>
      {/* Header */}
      <div className='flex items-center mb-4'>
        <button className='text-white text-2xl mr-2' onClick={() => window.history.back()}>
          &larr;
        </button>
        <h2 className='text-xl font-semibold'>Compliance details</h2>
      </div>

      {/* Compliance Card */}
      <div className='bg-[#232323] rounded-2xl p-4 mb-4'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-gray-400 text-sm font-mono'>#{compliance.id}</span>
          <span className={compliance.status === 'Completed' ? 'text-[#00C896]' : 'text-[#FFD600]'}>
            {compliance.status}
          </span>
        </div>
        <div className='font-bold text-lg mb-2'>{compliance.title}</div>
        <div className='text-gray-300 text-sm'>{compliance.description}</div>
      </div>

      {/* Details */}
      <div className='mb-2'>
        <div className='flex gap-2'>
          <span className='text-gray-400'>Reason:</span>
          <span className='font-semibold'>{compliance.reason}</span>
        </div>
        <div className='flex gap-2'>
          <span className='text-gray-400'>Title:</span>
          <span className='font-semibold'>{compliance.complaintTitle}</span>
        </div>
        <div className='flex items-center gap-2 mb-2'>
          <span className='text-gray-400'>Raised by</span>
          <img src={compliance.raisedBy.avatar} alt='avatar' className='w-6 h-6 rounded-full' />
          <span className='font-semibold'>{compliance.raisedBy.name}</span>
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className='flex-1 overflow-y-auto mb-2 relative pl-8 max-h-96'>
        {/* Vertical line */}
        <div className='absolute left-3 top-0 w-0.5 h-full bg-[#A259FF] z-0'></div>
        {timelineItems.map((item, idx) => (
          <div key={idx} className='flex items-start mb-6 relative z-10'>
            {/* Timeline dot */}
            <div className='absolute left-[-1.25rem] top-2 w-3 h-3 bg-[#A259FF] rounded-full'></div>
            <img src={item.avatar} alt='avatar' className='w-6 h-6 rounded-full mr-2' />
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-xs text-gray-400'>{item.label}</span>
                <span className='text-xs text-gray-400'>{item.date}</span>
              </div>
              <div className='bg-[#232323] rounded-xl px-3 py-2 text-sm text-gray-200'>
                {item.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className='flex items-center bg-[#232323] rounded-2xl px-3 py-2 mt-2'>
        <input
          className='flex-1 bg-transparent text-white placeholder-gray-400 outline-none'
          placeholder='Type Something....'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className='mx-2 text-xl' title='Attach'>
          <svg width='20' height='20' fill='none'>
            <path
              d='M5 10l5 5 5-5'
              stroke='#fff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <button className='bg-[#A259FF] rounded-full p-2 text-white' onClick={handleSend}>
          <svg width='20' height='20' fill='none'>
            <path d='M2.5 17.5l15-7.5-15-7.5v6l10 1.5-10 1.5v6z' fill='#fff' />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ComplianceDetails;
