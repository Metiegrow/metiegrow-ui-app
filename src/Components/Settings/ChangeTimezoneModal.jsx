import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Spin } from 'antd';
import { CheckCircle2, Search } from 'lucide-react';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';

const getAllTimezones = () => {
  try {
    if (typeof Intl.supportedValuesOf === 'function') {
      const tz = Intl.supportedValuesOf('timeZone');
      if (Array.isArray(tz) && tz.length) return tz;
    }
  } catch (e) {
    // ignore
  }
  // Fallback list
  return [
    'UTC',
    'Pacific/Auckland',
    'Australia/Sydney',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Singapore',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'America/New_York',
    'America/Los_Angeles',
  ];
};

const ChangeTimezoneModal = ({ visible, onClose, onSelect, selectedTimezone }) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(selectedTimezone || '');
  const [loading, setLoading] = useState(true);
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const list = getAllTimezones();
    const mapped = list.map((tz) => ({ id: tz, label: tz }));
    if (isMounted) {
      setTimezones(mapped);
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  useEffect(() => {
    setSelected(selectedTimezone || '');
  }, [selectedTimezone]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return timezones.filter((t) => t.label.toLowerCase().includes(q));
  }, [timezones, search]);

  const handleConfirm = () => {
    if (!selected) return;
    onSelect(selected);
    onClose();
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      centered
      className='language-modal p-0 m-0 sm:max-w-[500px] w-full'
      width='100%'
      bodyStyle={{ padding: 0, overflow: 'hidden' }}
    >
      <div className='bg-[#0f0f0f] text-white h-[100dvh] sm:h-[90vh] flex flex-col sm:rounded-2xl border border-gray-700 shadow-xl backdrop-blur-md overflow-hidden'>
        <div className='flex items-center justify-between px-4 py-4 sm:py-6 border-b border-[#222]'>
          <div className='flex items-center gap-2'>
            <button
              onClick={onClose}
              className='block sm:hidden p-0 border-none focus:outline-none bg-transparent'
            >
              <BackButtonIcon className='w-6 h-6 text-white' />
            </button>
            <h2 className='text-lg sm:text-xl font-semibold'>Select Time Zone</h2>
          </div>
          <button
            onClick={onClose}
            className='hidden sm:block focus:outline-none bg-transparent border-none'
          >
            <ModalCloseIcon />
          </button>
        </div>

        <div className='px-4 py-2 border-b border-[#222]'>
          <div className='flex items-center bg-[#1f1f1f] px-4 py-2 rounded-full shadow-inner focus-within:ring-2 focus-within:ring-purple-600 transition'>
            <Search className='text-gray-400 w-5 h-5 mr-2' />
            <input
              type='text'
              placeholder={loading ? 'Loading...' : 'Search...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
              className='flex-1 bg-transparent text-white placeholder-gray-400 outline-none border-none'
            />
          </div>
        </div>

        <div className='overflow-y-auto px-4 py-2 flex-1 custom-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-[#111]'>
          {loading ? (
            <div className='flex items-center justify-center h-full py-10'>
              <Spin tip='Loading time zones...' />
            </div>
          ) : filtered.length === 0 ? (
            <div className='text-center text-gray-400 py-6'>No time zones found</div>
          ) : (
            <div className='space-y-2'>
              {filtered.map((tz) => (
                <div
                  key={tz.id}
                  onClick={() => setSelected(tz.id)}
                  className={`flex items-center justify-between px-4 py-2 rounded-3xl cursor-pointer transition duration-200 ${selected === tz.id ? 'border border-purple-500 ring-1 ring-purple-400 bg-black' : 'border border-white bg-black'}`}
                >
                  <div className='flex items-center space-x-3 text-base text-white'>
                    <span>{tz.label}</span>
                  </div>
                  {selected === tz.id && <CheckCircle2 className='text-green-500 w-5 h-5' />}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='px-4 py-3 md:flex md:justify-end'>
          <button
            onClick={handleConfirm}
            disabled={loading || !selected}
            className={`w-full md:w-auto px-4 py-2 rounded-full text-sm shadow-lg ${loading || !selected ? 'bg-[#6d3db3] cursor-not-allowed text-white/70' : 'bg-[#a259ff] text-white'}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeTimezoneModal;
