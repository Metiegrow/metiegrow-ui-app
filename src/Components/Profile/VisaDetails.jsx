import { useState, useEffect } from 'react';
import PassportImage from '../../assets/VisaDetails.png';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Link } from '@tanstack/react-router';

function VisaForm({ onBack, onSubmit, loading }) {
  const [form, setForm] = useState({
    visaType: '',
    validity: '',
    institution: '',
    city: '',
    state: '',
    country: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.country) return;
    onSubmit(form, () =>
      setForm({
        visaType: '',
        validity: '',
        institution: '',
        city: '',
        state: '',
        country: '',
      })
    );
  };

  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      <div className='flex items-center px-4 pt-8 pb-4'>
        <Link
          onClick={onBack}
          className='rounded-full bg-[#232323] w-10 h-10 flex items-center justify-center'
        >
          <BackButtonIcon className='w-6 h-6 text-white' />
        </Link>
        <h1 className='flex-1 text-center font-bold text-xl -ml-10'>Visa Information</h1>
      </div>
      <form onSubmit={handleSubmit} className='flex-1 flex flex-col gap-4 px-6'>
        <div>
          <label className='block mb-1'>Visa Type</label>
          <Input
            name='visaType'
            value={form.visaType}
            onChange={handleChange}
            placeholder='Enter Value'
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
          />
        </div>
        <div>
          <label className='block mb-1'>Validity</label>
          <Input
            name='validity'
            type='date'
            value={form.validity}
            onChange={handleChange}
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
          />
        </div>
        <div>
          <label className='block mb-1'>Institution Details</label>
          <Input
            name='institution'
            value={form.institution}
            onChange={handleChange}
            placeholder='Enter Institution Details'
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
          />
        </div>
        <div className='flex gap-2'>
          <div className='flex-1'>
            <label className='block mb-1'>City</label>
            <select
              name='city'
              value={form.city}
              onChange={handleChange}
              className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
            >
              <option value=''>Select city</option>
              <option value='Melbourne'>Melbourne</option>
              <option value='Sydney'>Sydney</option>
            </select>
          </div>
          <div className='flex-1'>
            <label className='block mb-1'>State</label>
            <select
              name='state'
              value={form.state}
              onChange={handleChange}
              className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
            >
              <option value=''>Select State</option>
              <option value='Victoria'>Victoria</option>
              <option value='New South Wales'>New South Wales</option>
            </select>
          </div>
        </div>
        <div>
          <label className='block mb-1'>
            Country <span className='text-red-500'>*</span>
          </label>
          <select
            name='country'
            value={form.country}
            onChange={handleChange}
            className='w-full bg-transparent border border-gray-700 rounded-full px-4 py-3 text-white'
          >
            <option value=''>Select Country</option>
            <option value='Australia'>Australia</option>
            <option value='India'>India</option>
            <option value='USA'>USA</option>
          </select>
        </div>
        <button
          type='submit'
          disabled={loading}
          className='mt-8 w-full bg-[#B16CFE] text-white font-semibold py-4 rounded-full text-lg shadow-lg'
        >
          {loading ? 'Saving...' : 'Confirm'}
        </button>
      </form>
    </div>
  );
}

export default function VisaDetails({ onNavigate }) {
  const [showForm, setShowForm] = useState(false);
  const [visaInfo, setVisaInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch visa details from db.json
  const fetchVisaInfo = async () => {
    setFetching(true);
    setError('');
    try {
      const res = await fetch('http://localhost:9001/visaDetails');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setVisaInfo(data[data.length - 1]);
      } else if (data && !Array.isArray(data)) {
        setVisaInfo(data);
      } else {
        setVisaInfo(null);
      }
    } catch (err) {
      setError('Failed to fetch visa details.');
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchVisaInfo();
  }, []);

  // POST to db.json
  const handleVisaSubmit = async (form, clearForm) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await fetch('http://localhost:9001/visaDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setSuccess(true);
      clearForm();
      fetchVisaInfo();
    } catch (err) {
      setError('Failed to save visa details.');
    }
    setLoading(false);
  };

  const hasVisaDetails = visaInfo && Object.keys(visaInfo).length > 0;

  if (showForm) {
    return (
      <VisaForm onBack={() => setShowForm(false)} onSubmit={handleVisaSubmit} loading={loading} />
    );
  }

  return (
    <div className='min-h-screen bg-black text-white flex flex-col justify-between'>
      <div className='flex items-center justify-between px-4 pt-8 pb-4'>
        <Link
          onClick={() => onNavigate && onNavigate('myPersonalInfo')}
          className='rounded-full bg-[#232323] w-10 h-10 flex items-center justify-center'
        >
          <BackButtonIcon className='w-6 h-6 text-white' />
        </Link>
        <h1 className='flex-1 text-center font-bold text-xl -ml-10'>Visa Information</h1>
      </div>
      <div className='flex flex-col items-center justify-center flex-1'>
        {fetching ? (
          <div className='text-gray-400'>Loading...</div>
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : !hasVisaDetails ? (
          <>
            <img src={PassportImage} alt='Visa' className='w-40 h-40' />
            <p className='text-center text-gray-400 mb-8'>
              Still you're not added visa information
            </p>
            {success && <div className='text-green-500 mb-2'>Visa details added successfully!</div>}
            <button
              onClick={() => setShowForm(true)}
              className='w-full max-w-md bg-[#B16CFE] text-white font-semibold py-4 rounded-full text-lg shadow-lg'
              style={{ boxShadow: '0 8px 32px 0 #B16CFE55' }}
            >
              Add Information
            </button>
          </>
        ) : (
          <div className='w-full'>
            {success && (
              <div className='text-green-500 mb-2'>Visa details updated successfully!</div>
            )}
            <h3 className='text-lg font-bold mb-2'>Visa Details</h3>
            <div className='mb-2'>
              Visa Type: <span className='text-white'>{visaInfo.visaType}</span>
            </div>
            <div className='mb-2'>
              Validity: <span className='text-white'>{visaInfo.validity}</span>
            </div>
            <div className='mb-2'>
              Institution: <span className='text-white'>{visaInfo.institution}</span>
            </div>
            <div className='mb-2'>
              City: <span className='text-white'>{visaInfo.city}</span>
            </div>
            <div className='mb-2'>
              State: <span className='text-white'>{visaInfo.state}</span>
            </div>
            <div className='mb-2'>
              Country: <span className='text-white'>{visaInfo.country}</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className='mt-6 w-full max-w-md bg-[#B16CFE] text-white font-semibold py-3 rounded-full text-md shadow-lg'
              style={{ boxShadow: '0 8px 32px 0 #B16CFE55' }}
            >
              Update Information
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
