import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react'; // or your existing icons
import { Card, Input } from 'antd';
import { CustomInput } from '../../Common/Inputs';

function CountryCodeSelector({
  selectedCountryCode = '+91', // default value
  onCountryCodeChange, // callback when a country is selected
  countries = [], // array of { name, phoneCode, flagUrl }
  loading = false, // loading state from props
  maxResults = 250, // optional limit
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const ref = useRef(null);

  // Debounce search term
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // Preprocess country data
  const processedCountries = useMemo(() => {
    return [...countries]
      .map((c) => ({
        ...c,
        nameLower: (c.name || '').toLowerCase(),
        phoneDigits: (c.phoneCode || '').replace(/\D/g, ''),
      }))
      .sort((a, b) => a.nameLower.localeCompare(b.nameLower));
  }, [countries]);

  // Filter by name or phone code
  const filteredCountries = useMemo(() => {
    const term = (debouncedSearchTerm || '').trim().toLowerCase();
    if (!term) return processedCountries.slice(0, maxResults);

    const termDigits = term.replace(/\D/g, '');
    return processedCountries
      .filter((country) => {
        if (country.nameLower.startsWith(term)) return true;
        if (termDigits && country.phoneDigits.startsWith(termDigits)) return true;
        if ((country.phoneCode || '').toLowerCase().startsWith(term)) return true;
        return false;
      })
      .slice(0, maxResults);
  }, [debouncedSearchTerm, processedCountries, maxResults]);

  // Click outside & ESC to close
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

  const selectedCountry =
    countries.find((c) => c.phoneCode === selectedCountryCode) ||
    (countries.length ? countries[0] : null);

  if (loading) {
    return (
      <div className='flex items-center gap-2 py-1.5 px-3 text-sm bg-gray-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 border-0'>
        {/* <div className="w-4 h-4 mr-2 border-2 border-gray-400 rounded-full border-t-transparent animate-spin"></div> */}
        <span className='text-gray-400'>Loading...</span>
      </div>
    );
  }

  return (
    <div className='relative' ref={ref}>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className='flex items-center gap-2 py-1.5 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 border-0'
      >
        {selectedCountry?.flagUrl && (
          <img
            src={selectedCountry.flagUrl}
            alt={selectedCountry.name}
            className='w-4 h-4 rounded-full'
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            loading='lazy'
          />
        )}
        <span className='text-left text-white '>{selectedCountryCode}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role='listbox'
          aria-label='Country codes'
          className='absolute left-0 z-50 p-2 mt-2 overflow-hidden border border-gray-700 shadow-lg rounded-3xl bg-cardblack top-full w-60 custom-scrollbar'
        >
          {/* Search Input */}
          {/* <div className="relative mb-2">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <CustomInput
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // className="w-full pl-10 pr-3 py-1.5 text-sm bg-black border border-gray-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              autoFocus
            />
          </div> */}

          <CustomInput
            prefix={<Search className='w-4 h-4 text-gray-400' />}
            type='text'
            placeholder='Search country...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // className="w-full pl-10 pr-3 py-1.5 text-sm bg-black border border-gray-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            autoFocus
          />

          <ul className='p-3 overflow-y-auto max-h-56'>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li
                  key={`${country.phoneCode}-${country.name}`}
                  role='option'
                  aria-selected={country.phoneCode === selectedCountryCode}
                  onClick={() => {
                    onCountryCodeChange(country.phoneCode);
                    setOpen(false);
                    setSearchTerm('');
                    setDebouncedSearchTerm('');
                  }}
                  className={`cursor-pointer select-none px-2 py-2 rounded-md text-sm flex items-center gap-3 hover:bg-gray-800 ${
                    country.phoneCode === selectedCountryCode
                      ? 'bg-gray-800 font-medium'
                      : 'bg-transparent'
                  }`}
                >
                  {country.flagUrl && (
                    <img
                      src={country.flagUrl}
                      alt={country.name}
                      className='flex-shrink-0 w-5 h-5 rounded-sm'
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
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
        </div>
      )}
    </div>
  );
}

// import React from "react";
// import { Select } from "antd";
// import { DownOutlined } from "@ant-design/icons";

// const { Option } = Select;

// const CountryCodeSelector = ({
//   selectedCountryCode,
//   onCountryCodeChange,
//   countries,
//   loading = false,
// }) => {
//   const selectedCountry = countries.find(
//     (c) => c.phoneCode === selectedCountryCode
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center bg-cardblack border border-gray-700 rounded-[28px] px-4 md:px-5 h-[56px]">
//         <div className="w-4 h-4 mr-2 border-2 border-gray-400 rounded-full border-t-transparent animate-spin"></div>
//         <span className="text-gray-400">Loading...</span>
//       </div>
//     );
//   }

//   return (
//     <Select
//       value={selectedCountryCode}
//       onChange={onCountryCodeChange}
//       style={{ width: 144 }}
//       className="bg-yellow-500"
//       size="large"
//       showSearch
//       optionFilterProp="label"
//       valueRender={(value) => {
//         const country = countries.find((c) => c.phoneCode === value);
//         return (
//           <div className="flex items-center h-full">
//             <img
//               src={country?.flagUrl}
//               alt={country?.name}
//               className="object-cover w-5 h-5 mr-2 rounded"
//             />
//             <span className="text-white">{country?.phoneCode}</span>
//           </div>
//         );
//       }}
//     >
//       {countries.map((country) => (
//         <Option
//           key={country.phoneCode}
//           value={country.phoneCode}
//           label={`${country.name} ${country.phoneCode}`}
//         >
//           <div className="flex items-center h-full">
//             <img
//               src={country.flagUrl}
//               alt={country.name}
//               className="object-cover w-5 h-5 mr-2 rounded"
//             />
//             <span className="text-white">{country.phoneCode}</span>
//           </div>
//         </Option>
//       ))}
//     </Select>
//   );
// };

export default CountryCodeSelector;
