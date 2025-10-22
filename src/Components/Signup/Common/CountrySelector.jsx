import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Input, Card } from 'antd';

function CountrySelector({
  label,
  name,
  value = '', // can be string (phoneCode/name) or object
  options = [], // [{ name, phoneCode, flagUrl }]
  placeholder = 'Select country',
  required = false,
  onChange,
  searchable = true,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const ref = useRef(null);

  const [localError, setLocalError] = useState(error);

  // sync external error -> local error
  useEffect(() => {
    setLocalError(error);
  }, [error]);

  // Debounce search
  // Debounce search term
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // Preprocess countries
  const processedCountries = useMemo(() => {
    return [...options]
      .map((c) => ({
        ...c,
        nameLower: (c.name || '').toLowerCase(),
        phoneDigits: (c.phoneCode || '').replace(/\D/g, ''),
      }))
      .sort((a, b) => a.nameLower.localeCompare(b.nameLower));
  }, [options]);

  // Filter by search
  const filteredCountries = useMemo(() => {
    const term = (debouncedSearchTerm || '').trim().toLowerCase();
    if (!term) return processedCountries.slice(0);

    const termDigits = term.replace(/\D/g, '');
    return processedCountries
      .filter((country) => {
        if (country.nameLower.startsWith(term)) return true;
        if (termDigits && country.phoneDigits.startsWith(termDigits)) return true;
        if ((country.phoneCode || '').toLowerCase().startsWith(term)) return true;
        return false;
      })
      .slice(0);
  }, [debouncedSearchTerm, processedCountries]);

  // Close on outside click / esc
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Compute selected country based on value type
  const selectedCountry = useMemo(() => {
    if (!value) return null;

    if (typeof value === 'string') {
      return options.find((c) => c.name === value || c.phoneCode === value);
    }

    if (typeof value === 'object' && value.phoneCode) {
      return options.find((c) => c.phoneCode === value.phoneCode);
    }

    return null;
  }, [value, options]);

  return (
    <div className='relative w-full register-page' ref={ref}>
      {label && (
        <label className='block mb-1 text-sm font-medium text-gray-300'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}

      {/* Button */}
      <Card
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={() => {
          setOpen((s) => !s);
          if (!open) {
            setSearchTerm('');
            setDebouncedSearchTerm('');
          }
        }}
        bodyStyle={{
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 0,
        }}
        className={`w-full h-[56px] bg-transparent border border-gray-700 rounded-[28px] px-4 md:px-5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer ${open ? 'border-purple-500' : 'border-gray-700'
          }`}
      >
        <Card
          className='items-center justify-between flex-1 h-12 truncate bg-transparent border-0'
          bodyStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 16,
            paddingLeft: 0,
          }}
        >
          {selectedCountry?.flagUrl && (
            <img
              src={selectedCountry.flagUrl}
              alt={selectedCountry.name}
              className='w-5 h-5 bg-red-500 rounded-full'
              onError={(e) => (e.target.style.display = 'none')}
              loading='lazy'
            />
          )}
          <span
            className={`flex-1 truncate text-base ${!selectedCountry ? 'text-gray-400' : 'text-white px-4'
              }`}
          >
            {selectedCountry ? selectedCountry.name : placeholder}
          </span>
        </Card>
        <ChevronDown
          className={`mr-4 text-gray-400 transform transition-transform ${open ? 'rotate-180' : ''
            }`}
          size={20}
        />
      </Card>
      {/* Error Message */}
      {localError && (
        <p id={`${name}-error`} className='mt-1 text-xs text-red-500 md:text-sm'>
          {localError}
        </p>
      )}

      {/* Dropdown */}
      {open && (
        <Card className='absolute left-0 right-0 z-50 w-auto mt-1 border border-gray-700 rounded-[2.5rem] shadow-lg bg-cardblack custom-scrollbar'>
          {/* Search */}
          {searchable && (
            <div className='relative mb-2'>
              <Search className='absolute z-10 w-4 h-4 text-gray-400 transform -translate-y-1/2 left-4 top-1/2' />
              <Input
                type='text'
                placeholder='Search country...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-12 py-1.5 text-sm bg-black border border-gray-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500'
                autoFocus
              />
            </div>
          )}

          {/* Options */}
          <ul className='p-1 overflow-y-auto max-h-56'>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li
                  key={`${country.phoneCode}-${country.name}`}
                  role='option'
                  aria-selected={selectedCountry?.phoneCode === country.phoneCode}
                  onClick={() => {
                    onChange?.(name, country.name); // <-- send only name
                    setOpen(false);
                    setSearchTerm('');
                    setDebouncedSearchTerm('');
                  }}
                  className={`cursor-pointer select-none px-3 py-2 rounded-md text-sm flex items-center gap-3 hover:bg-gray-800 ${selectedCountry?.phoneCode === country.phoneCode
                    ? 'bg-gray-800 font-medium'
                    : 'bg-transparent'
                    }`}
                >
                  {country.flagUrl && (
                    <img
                      src={country.flagUrl}
                      alt={country.name}
                      className='flex-shrink-0 w-5 h-5 rounded-sm'
                      onError={(e) => (e.target.style.display = 'none')}
                      loading='lazy'
                    />
                  )}
                  <div className='flex-grow min-w-0'>
                    <div className='text-white truncate'>{country.name}</div>
                    <div className='text-xs text-gray-400'>{country.phoneCode}</div>
                  </div>
                </li>
              ))
            ) : (
              <li className='px-3 py-2 text-sm text-center text-gray-400'>No countries found</li>
            )}
          </ul>
        </Card>
      )}
    </div>
  );
}

export default CountrySelector;
