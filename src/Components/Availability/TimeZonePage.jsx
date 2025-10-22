import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, MapPin, Edit2, X } from 'lucide-react';

const API_URL = 'http://localhost:9001/countries';

const masterCountries = [
  { name: 'India', capital: 'New Delhi', lat: 28.6139, lng: 77.209, timezone: 'Asia/Kolkata' },
  {
    name: 'United States',
    capital: 'Washington, D.C.',
    lat: 38.9072,
    lng: -77.0369,
    timezone: 'America/New_York',
  },
  {
    name: 'Brazil',
    capital: 'Brasília',
    lat: -15.8267,
    lng: -47.9218,
    timezone: 'America/Sao_Paulo',
  },
  {
    name: 'Australia',
    capital: 'Canberra',
    lat: -35.2809,
    lng: 149.13,
    timezone: 'Australia/Sydney',
  },
  { name: 'Russia', capital: 'Moscow', lat: 55.7558, lng: 37.6173, timezone: 'Europe/Moscow' },
  {
    name: 'South Africa',
    capital: 'Pretoria',
    lat: -25.7479,
    lng: 28.2293,
    timezone: 'Africa/Johannesburg',
  },
  { name: 'Canada', capital: 'Ottawa', lat: 45.4215, lng: -75.6972, timezone: 'America/Toronto' },
  { name: 'China', capital: 'Beijing', lat: 39.9042, lng: 116.4074, timezone: 'Asia/Shanghai' },
  { name: 'Germany', capital: 'Berlin', lat: 52.52, lng: 13.405, timezone: 'Europe/Berlin' },
  {
    name: 'United Kingdom',
    capital: 'London',
    lat: 51.5074,
    lng: -0.1278,
    timezone: 'Europe/London',
  },
  // ...add more as needed
];

const initialForm = { name: '', capital: '', lat: '', lng: '', timezone: '' };

const WorldClockGlobe = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('Sydney');
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    timezone: '',
    offset: '',
    coords: { x: 0, y: 0 },
    country: '',
  });
  const globeRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [selectedCountryName, setSelectedCountryName] = useState('');

  const [cities, setCities] = useState({
    Sydney: {
      timezone: 'Australia/Sydney',
      offset: '+10hrs',
      coords: { x: 210, y: 170 },
      country: 'Australia',
    },
    'New York': {
      timezone: 'America/New_York',
      offset: '-5hrs',
      coords: { x: 60, y: 100 },
      country: 'United States',
    },
    London: {
      timezone: 'Europe/London',
      offset: '+0hrs',
      coords: { x: 120, y: 80 },
      country: 'United Kingdom',
    },
    Tokyo: { timezone: 'Asia/Tokyo', offset: '+9hrs', coords: { x: 200, y: 90 }, country: 'Japan' },
    'Los Angeles': {
      timezone: 'America/Los_Angeles',
      offset: '-8hrs',
      coords: { x: 30, y: 110 },
      country: 'United States',
    },
    Dubai: { timezone: 'Asia/Dubai', offset: '+4hrs', coords: { x: 140, y: 110 }, country: 'UAE' },
    Paris: {
      timezone: 'Europe/Paris',
      offset: '+1hrs',
      coords: { x: 122, y: 75 },
      country: 'France',
    },
    Singapore: {
      timezone: 'Asia/Singapore',
      offset: '+8hrs',
      coords: { x: 180, y: 130 },
      country: 'Singapore',
    },
    Mumbai: {
      timezone: 'Asia/Kolkata',
      offset: '+5:30hrs',
      coords: { x: 155, y: 120 },
      country: 'India',
    },
    Cairo: {
      timezone: 'Africa/Cairo',
      offset: '+2hrs',
      coords: { x: 125, y: 110 },
      country: 'Egypt',
    },
    Moscow: {
      timezone: 'Europe/Moscow',
      offset: '+3hrs',
      coords: { x: 135, y: 60 },
      country: 'Russia',
    },
    Beijing: {
      timezone: 'Asia/Shanghai',
      offset: '+8hrs',
      coords: { x: 190, y: 85 },
      country: 'China',
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    setCountries(data);
    setLoading(false);
  };

  const getCityTime = (timezone) => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getCityTemp = (city) => {
    const temps = {
      Sydney: 18,
      'New York': -2,
      London: 5,
      Tokyo: 8,
      'Los Angeles': 20,
      Dubai: 22,
      Paris: 3,
      Singapore: 28,
      Mumbai: 25,
      Cairo: 15,
      Moscow: -8,
      Beijing: 2,
    };
    return temps[city] || 15;
  };

  const isNightTime = (timezone) => {
    const hour = parseInt(
      new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        hour12: false,
      })
    );
    return hour < 6 || hour > 18;
  };

  const handleCountryClick = (cityName) => {
    setSelectedCity(cityName);
    setEditMode(false);
  };

  const handleEditClick = (cityName) => {
    const city = cities[cityName];
    setEditData({
      name: cityName,
      timezone: city.timezone,
      offset: city.offset,
      coords: { ...city.coords },
      country: city.country,
    });
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'x' || name === 'y') {
      setEditData((prev) => ({
        ...prev,
        coords: { ...prev.coords, [name]: Number(value) },
      }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSave = () => {
    setCities((prev) => {
      const newCities = { ...prev };
      // If name changed, delete old key
      if (editData.name !== selectedCity) {
        delete newCities[selectedCity];
      }
      newCities[editData.name] = {
        timezone: editData.timezone,
        offset: editData.offset,
        coords: { ...editData.coords },
        country: editData.country,
      };
      return newCities;
    });
    setSelectedCity(editData.name);
    setEditMode(false);
  };

  // Add country
  const handleAdd = async () => {
    const countryToAdd = masterCountries.find((c) => c.name === selectedCountryName);
    if (!countryToAdd) return;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(countryToAdd),
    });
    setSelectedCountryName('');
    fetchCountries();
  };

  // Edit country
  const handleEditCountry = async () => {
    await fetch(`${API_URL}/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setShowEditModal(false);
    setForm(initialForm);
    fetchCountries();
  };

  // Delete country
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchCountries();
  };

  // Open modals
  const openAddModal = () => {
    setForm(initialForm);
    setShowAddModal(true);
  };
  const openEditModal = (country) => {
    setForm(country);
    setSelectedCountry(country);
    setShowEditModal(true);
  };

  // Countries not yet added
  const addedNames = new Set(countries.map((c) => c.name));
  const availableCountries = masterCountries.filter((c) => !addedNames.has(c.name));

  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center p-4'>
      {/* Time Display Card */}
      <div className='bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-6 mb-8 w-full max-w-sm shadow-2xl'>
        <div className='flex justify-between items-start'>
          <div>
            <h2 className='text-white text-2xl font-medium mb-1 flex items-center gap-2'>
              {selectedCity}
              <button
                className='ml-2 p-1 rounded hover:bg-gray-700'
                onClick={() => handleEditClick(selectedCity)}
                title='Edit city info'
              >
                <Edit2 className='w-4 h-4 text-blue-300' />
              </button>
            </h2>
            <p className='text-gray-300 text-sm'>GMT{cities[selectedCity].offset}</p>
            <p className='text-gray-400 text-xs mt-1'>{cities[selectedCity].country}</p>
          </div>
          <div className='text-right'>
            <div className='flex items-center gap-2 mb-1'>
              <span className='text-white text-3xl font-light'>
                {getCityTime(cities[selectedCity].timezone)}
              </span>
              {isNightTime(cities[selectedCity].timezone) ? (
                <Moon className='text-yellow-300 w-6 h-6' />
              ) : (
                <Sun className='text-yellow-400 w-6 h-6' />
              )}
            </div>
            <p className='text-gray-300 text-lg'>{getCityTemp(selectedCity)}°</p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40'>
          <div className='bg-white rounded-xl p-6 w-80 relative'>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
              onClick={() => setEditMode(false)}
            >
              <X className='w-5 h-5' />
            </button>
            <h3 className='text-lg font-bold mb-4'>Edit City Info</h3>
            <div className='mb-2'>
              <label className='block text-xs font-semibold'>City Name</label>
              <input
                className='border p-1 w-full rounded'
                name='name'
                value={editData.name}
                onChange={handleEditChange}
              />
            </div>
            <div className='mb-2'>
              <label className='block text-xs font-semibold'>Country</label>
              <input
                className='border p-1 w-full rounded'
                name='country'
                value={editData.country}
                onChange={handleEditChange}
              />
            </div>
            <div className='mb-2'>
              <label className='block text-xs font-semibold'>Timezone</label>
              <input
                className='border p-1 w-full rounded'
                name='timezone'
                value={editData.timezone}
                onChange={handleEditChange}
              />
            </div>
            <div className='mb-2'>
              <label className='block text-xs font-semibold'>GMT Offset</label>
              <input
                className='border p-1 w-full rounded'
                name='offset'
                value={editData.offset}
                onChange={handleEditChange}
              />
            </div>
            <div className='mb-2 flex gap-2'>
              <div>
                <label className='block text-xs font-semibold'>X</label>
                <input
                  className='border p-1 w-16 rounded'
                  name='x'
                  type='number'
                  value={editData.coords.x}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className='block text-xs font-semibold'>Y</label>
                <input
                  className='border p-1 w-16 rounded'
                  name='y'
                  type='number'
                  value={editData.coords.y}
                  onChange={handleEditChange}
                />
              </div>
            </div>
            <button
              className='mt-2 w-full bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800'
              onClick={handleEditSave}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Interactive World Globe (smaller size) */}
      <div className='relative w-72 h-72 mb-8' ref={globeRef}>
        <div className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-900 via-blue-700 to-purple-800 shadow-2xl overflow-hidden'>
          {/* World Map SVG */}
          <svg width='100%' height='100%' viewBox='0 0 256 256' className='absolute inset-0'>
            {/* Ocean background with subtle pattern */}
            <defs>
              <radialGradient id='oceanGradient' cx='50%' cy='50%' r='50%'>
                <stop offset='0%' stopColor='rgba(59, 130, 246, 0.8)' />
                <stop offset='100%' stopColor='rgba(147, 51, 234, 0.9)' />
              </radialGradient>
              <pattern
                id='oceanPattern'
                x='0'
                y='0'
                width='20'
                height='20'
                patternUnits='userSpaceOnUse'
              >
                <circle cx='10' cy='10' r='1' fill='rgba(255,255,255,0.1)' />
              </pattern>
            </defs>
            <circle cx='128' cy='128' r='120' fill='url(#oceanGradient)' />
            <circle cx='128' cy='128' r='120' fill='url(#oceanPattern)' />
            {/* Continents - stylized shapes for demo */}
            {/* North America */}
            <path
              d='M35 80 Q25 60 45 50 Q65 45 85 55 Q105 65 115 85 Q120 105 110 125 Q100 145 80 150 Q60 145 50 130 Q40 110 35 80'
              fill='rgba(34, 197, 94, 0.8)'
              stroke='rgba(255,255,255,0.3)'
              strokeWidth='1'
              className='cursor-pointer hover:fill-green-400 transition-colors'
              onClick={() => handleCountryClick('New York')}
              onMouseEnter={() => setHoveredCountry('North America')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* South America */}
            <path
              d='M70 160 Q65 150 75 155 Q85 160 90 180 Q95 210 85 230 Q75 240 65 225 Q60 205 62 185 Q65 165 70 160'
              fill='rgba(34, 197, 94, 0.8)'
              stroke='rgba(255,255,255,0.3)'
              strokeWidth='1'
              className='cursor-pointer hover:fill-green-400 transition-colors'
            />
            {/* Europe */}
            <path
              d='M125 60 Q115 55 135 50 Q145 55 150 65 Q145 75 140 80 Q130 75 125 60'
              fill='rgba(34, 197, 94, 0.8)'
              stroke='rgba(255,255,255,0.3)'
              strokeWidth='1'
              className='cursor-pointer hover:fill-green-400 transition-colors'
              onClick={() => handleCountryClick('London')}
              onMouseEnter={() => setHoveredCountry('Europe')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Africa */}
            <path
              d='M130 90 Q120 85 125 100 Q130 120 135 140 Q140 160 135 180 Q130 195 125 180 Q120 160 122 140 Q125 120 128 100 Q130 90 130 90'
              fill='rgba(34, 197, 94, 0.8)'
              stroke='rgba(255,255,255,0.3)'
              strokeWidth='1'
              className='cursor-pointer hover:fill-green-400 transition-colors'
              onClick={() => handleCountryClick('Cairo')}
              onMouseEnter={() => setHoveredCountry('Africa')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Asia */}
            <path
              d='M145 65 Q135 60 160 55 Q190 60 220 70 Q240 85 245 105 Q240 125 230 135 Q210 140 190 135 Q170 130 155 115 Q145 95 145 65'
              fill='rgba(34, 197, 94, 0.8)'
              stroke='rgba(255,255,255,0.3)'
              strokeWidth='1'
              className='cursor-pointer hover:fill-green-400 transition-colors'
              onClick={() => handleCountryClick('Beijing')}
              onMouseEnter={() => setHoveredCountry('Asia')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Australia */}
            <path
              d='M210 170 Q200 165 215 160 Q230 165 235 175 Q230 185 220 190 Q210 185 210 170'
              fill='rgba(34, 197, 94, 0.8)'
              stroke='rgba(255,255,255,0.3)'
              strokeWidth='1'
              className='cursor-pointer hover:fill-green-400 transition-colors'
              onClick={() => handleCountryClick('Sydney')}
              onMouseEnter={() => setHoveredCountry('Australia')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* India */}
            <path
              d='M150 120 Q145 115 160 110 Q170 115 175 125 Q170 135 160 140 Q150 135 150 120'
              fill='rgba(34, 197, 94, 0.8)'
              stroke='rgba(255,255,255,0.3)'
              strokeWidth='1'
              className='cursor-pointer hover:fill-green-400 transition-colors'
              onClick={() => handleCountryClick('Mumbai')}
              onMouseEnter={() => setHoveredCountry('India')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Japan */}
            <path
              d='M200 85 Q195 80 205 75 Q210 80 215 90 Q210 95 205 100 Q200 95 200 85'
              fill='rgba(34, 197, 94, 0.8)'
              stroke='rgba(255,255,255,0.3)'
              strokeWidth='1'
              className='cursor-pointer hover:fill-green-400 transition-colors'
              onClick={() => handleCountryClick('Tokyo')}
              onMouseEnter={() => setHoveredCountry('Japan')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
          </svg>
          {/* City Markers */}
          {Object.entries(cities).map(([cityName, cityData]) => (
            <div
              key={cityName}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${selectedCity === cityName ? 'scale-125 z-20' : 'scale-100 z-10'}`}
              style={{
                left: `${cityData.coords.x}px`,
                top: `${cityData.coords.y}px`,
              }}
              onClick={() => handleCountryClick(cityName)}
            >
              <div className={`relative ${selectedCity === cityName ? 'animate-pulse' : ''}`}>
                <MapPin
                  className={`w-6 h-6 ${selectedCity === cityName ? 'text-yellow-400 drop-shadow-lg' : 'text-red-400 hover:text-red-300'}`}
                />
                {selectedCity === cityName && (
                  <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded whitespace-nowrap'>
                    {cityName}
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Globe lighting effect */}
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-white via-transparent to-transparent opacity-20 pointer-events-none'></div>
          <div className='absolute top-8 left-8 w-16 h-16 rounded-full bg-white opacity-10 blur-xl pointer-events-none'></div>
        </div>
        {/* Hover tooltip */}
        {hoveredCountry && (
          <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm'>
            Click {hoveredCountry}
          </div>
        )}
      </div>

      {/* City Grid */}
      <div className='w-full max-w-2xl'>
        <div className='grid grid-cols-3 gap-3'>
          {Object.entries(cities).map(([city, data]) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`p-3 rounded-xl text-left transition-all duration-300 ${selectedCity === city ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-102'}`}
            >
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-medium text-sm'>{city}</p>
                  <p className='text-xs opacity-75'>{getCityTime(data.timezone)}</p>
                  <p className='text-xs opacity-60'>{data.country}</p>
                </div>
                <div className='text-right'>
                  {isNightTime(data.timezone) ? (
                    <Moon className='w-4 h-4 text-yellow-300 mb-1' />
                  ) : (
                    <Sun className='w-4 h-4 text-yellow-400 mb-1' />
                  )}
                  <p className='text-xs'>{getCityTemp(city)}°</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Country Manager */}
      <div className='p-6 max-w-xl mx-auto'>
        <h2 className='text-2xl font-bold mb-4'>Country Manager</h2>
        <div className='mb-4 flex gap-2 items-center'>
          <select
            className='border p-2 rounded w-64'
            value={selectedCountryName}
            onChange={(e) => setSelectedCountryName(e.target.value)}
          >
            <option value=''>Select a country to add</option>
            {availableCountries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.capital})
              </option>
            ))}
          </select>
          <button
            className='bg-blue-600 text-white px-3 py-1 rounded'
            onClick={handleAdd}
            disabled={!selectedCountryName}
          >
            Add
          </button>
        </div>
        {loading && <div>Loading...</div>}
        {/* Edit Modal */}
        {showEditModal && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50'>
            <div className='bg-white p-6 rounded-xl w-80'>
              <h3 className='text-lg font-bold mb-4'>Edit Country</h3>
              <input
                className='border p-1 w-full mb-2'
                placeholder='Name'
                name='name'
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <input
                className='border p-1 w-full mb-2'
                placeholder='Capital'
                name='capital'
                value={form.capital}
                onChange={(e) => setForm((f) => ({ ...f, capital: e.target.value }))}
              />
              <input
                className='border p-1 w-full mb-2'
                placeholder='Timezone'
                name='timezone'
                value={form.timezone}
                onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
              />
              <input
                className='border p-1 w-full mb-2'
                placeholder='Latitude'
                name='lat'
                type='number'
                value={form.lat}
                onChange={(e) => setForm((f) => ({ ...f, lat: e.target.value }))}
              />
              <input
                className='border p-1 w-full mb-2'
                placeholder='Longitude'
                name='lng'
                type='number'
                value={form.lng}
                onChange={(e) => setForm((f) => ({ ...f, lng: e.target.value }))}
              />
              <div className='flex gap-2 mt-2'>
                <button
                  className='bg-yellow-500 text-white px-3 py-1 rounded'
                  onClick={handleEditCountry}
                >
                  Save
                </button>
                <button
                  className='bg-gray-400 text-black px-3 py-1 rounded'
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* List countries */}
        <div className='mt-6'>
          <h4 className='font-semibold mb-2'>Added Countries</h4>
          <ul className='divide-y divide-gray-200'>
            {countries.map((c) => (
              <li key={c.id} className='py-2 flex justify-between items-center'>
                <span>
                  {c.name} ({c.capital})
                </span>
                <div className='flex gap-2'>
                  <button className='text-blue-600' onClick={() => openEditModal(c)}>
                    Edit
                  </button>
                  <button className='text-red-600' onClick={() => handleDelete(c.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorldClockGlobe;
