import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import { CheckCircle2, Search } from 'lucide-react';
import { BackButtonIcon, ModalCloseIcon } from '../Common/SVG/svg.function';
import { fetchCountries } from '../../Common/APIHandler';

const ChangeLanguageModal = ({ visible, onClose, onSelect, selectedLanguage }) => {
  const [selected, setSelected] = useState(selectedLanguage);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const list = await fetchCountries();
        if (isMounted) setCountries(list || []);
      } catch (e) {
        if (isMounted) setCountries([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleConfirm = () => {
    onSelect(selected);
    onClose();
  };

  const filteredCountries = (countries || []).filter((country) =>
    (country.name || '').toLowerCase().includes(search.toLowerCase())
  );

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
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-4 sm:py-6 border-b border-[#222]'>
          <div className='flex items-center gap-2'>
            <button
              onClick={onClose}
              className='block sm:hidden p-0 border-none focus:outline-none bg-transparent'
            >
              <BackButtonIcon className='w-6 h-6 text-white' />
            </button>
            <h2 className='text-lg sm:text-xl font-semibold'>Select Language</h2>
          </div>
          <button
            onClick={onClose}
            className='hidden sm:block focus:outline-none bg-transparent border-none cursor-pointer'
          >
            <ModalCloseIcon />
          </button>
        </div>

        {/* Search */}
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

        {/* Language List (Countries) */}
        <div className='overflow-y-auto px-4 py-2 flex-1 custom-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-[#111]'>
          {loading ? (
            <div className='flex items-center justify-center h-full py-10'>
              <Spin tip='Loading countries...' />
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className='text-center text-gray-400 py-6'>No countries found</div>
          ) : (
            <div className='space-y-2'>
              {filteredCountries.map((country) => (
                <div
                  key={country.name}
                  onClick={() => setSelected(country.name)}
                  className={`flex items-center justify-between px-4 py-2 rounded-3xl cursor-pointer transition duration-200 ${
                    selected === country.name
                      ? 'border border-purple-500 ring-1 ring-purple-400 bg-black'
                      : 'border border-white bg-black'
                  }`}
                >
                  <div className='flex items-center space-x-3 text-base text-white'>
                    <div className='w-10 h-10 rounded-full overflow-hidden border border-gray-700'>
                      <img
                        src={country.flagUrl}
                        alt={country.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span>{country.name}</span>
                  </div>
                  {selected === country.name && <CheckCircle2 className='text-green-500 w-5 h-5' />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Button */}
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

export default ChangeLanguageModal;
