// customSelect.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Input, Card } from 'antd';
import { ChevronDown, Search } from 'lucide-react';
import { CheckCircleFilled } from '@ant-design/icons';

/**
 * Props:
 * - label, name, value (string), options (array of strings or objects), required, placeholder
 * - onChange: optional callback (value) => void
 * - handleInputChange: optional callback to match existing shape: ({ target: { name, value } }) => void
 */
const CustomSelect = ({
  label,
  name,
  value,
  options = [],
  required = false,
  error,
  placeholder = '',
  onChange, // (value) => void
  handleInputChange, // ({ target: { name, value } }) => void
  searchable = true,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [localValue, setLocalValue] = useState(value ?? '');
  const ref = useRef(null);

  const [localError, setLocalError] = useState(error);

  // sync external error -> local error
  useEffect(() => {
    setLocalError(error);
  }, [error]);

  // sync controlled value -> local
  useEffect(() => setLocalValue(value ?? ''), [value]);

  // debounce search for perf
  useEffect(() => {
    const id = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 150);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // click outside -> close
  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Normalize incoming options into { label, value } objects
  const normalizedOptions = useMemo(() => {
    if (!Array.isArray(options)) return [];
    return options.map((opt) => {
      if (typeof opt === 'string') return { label: opt, value: opt };
      if (opt && typeof opt === 'object') {
        if ('label' in opt && 'value' in opt) return opt;
        if ('name' in opt && 'id' in opt) return { label: opt.name, value: opt.name };
        if ('universityName' in opt && 'code' in opt)
          return { label: opt.universityName, value: opt.universityName };
        // fallback: prefer readable label and make value the label (safe for name-based payloads)
        const label = opt.label ?? opt.name ?? opt.universityName ?? String(opt);
        return { label, value: label };
      }
      return { label: String(opt), value: String(opt) };
    });
  }, [options]);

  // filter using prefix (startsWith) on label or value
  const filteredOptions = useMemo(() => {
    const term = (debouncedTerm || '').toLowerCase();
    if (!term) return normalizedOptions;
    return normalizedOptions.filter((o) => {
      const lbl = (o.label || '').toString().toLowerCase();
      const val = (o.value || '').toString().toLowerCase();
      return lbl.startsWith(term) || val.startsWith(term);
    });
  }, [normalizedOptions, debouncedTerm]);

  // compute display label for current value
  const localLabel = useMemo(() => {
    const found = normalizedOptions.find((o) => String(o.value) === String(localValue));
    return found ? found.label : localValue || '';
  }, [normalizedOptions, localValue]);

  // selection handler: calls both callback shapes for compatibility
  const handleSelect = (opt) => {
    setLocalValue(opt.value);
    setOpenDropdown(false);
    setSearchTerm('');
    setDebouncedTerm('');
    setLocalError(null);

    // call onChange(name, value) if present
    if (typeof onChange === 'function') onChange(name, opt.value);

    // call handleInputChange({ target: { name, value } }) if present
    if (typeof handleInputChange === 'function') {
      handleInputChange({ target: { name, value: opt.value } });
    }
  };

  return (
    <div className='relative w-full register-page' ref={ref}>
      {label && (
        <label className='block mb-1 text-sm font-medium text-gray-300'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}

      <Card
        bodyStyle={{
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 17,
        }}
        className={`w-full h-[56px] bg-transparent border border-gray-700 rounded-[28px] bg-black px-4 md:px-5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer ${openDropdown ? 'border-purple-500' : 'border-gray-700'
          }`}
        onClick={() => setOpenDropdown((s) => !s)}
      >
        <span
          className={`flex-1 truncate  text-base ${!localLabel ? 'text-gray-400' : 'text-white'}`}
        >
          {!localLabel ? placeholder : localLabel}
        </span>

        <ChevronDown
          className={`mr-4 text-gray-400 transform transition-transform ${openDropdown ? 'rotate-180' : ''
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

      {openDropdown && (
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
                className='w-full px-12 py-1.5 text-sm bg-black border border-gray-600 text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500'
                autoFocus
              />
            </div>
          )}

          <div className='max-h-60 overflow-y-auto custom-scrollbar rounded-b-[2.5rem]'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <div
                  key={opt.value != null ? String(opt.value) : idx}
                  className={`px-4 py-3 cursor-pointer text-sm flex items-center justify-between transition ${String(localValue) === String(opt.value)
                      ? 'text-white'
                      : 'hover:bg-gray-750 text-gray-200'
                    }`}
                  onClick={() => handleSelect(opt)}
                >
                  <span className='truncate'>{opt.label}</span>
                  {String(localValue) === String(opt.value) && (
                    <CheckCircleFilled
                      style={{
                        fontSize: 16,
                        color: 'rgb(34 197 94)',
                        background: 'white',
                        borderRadius: 9999,
                      }}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className='px-4 py-3 text-sm text-center text-gray-400'>No results found</div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CustomSelect;
