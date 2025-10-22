import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { validationRules } from './validationUtils';
import { CalendarIcon, ClockIcon, CalendarClockIcon, YearIcon } from './Icons';

const DatePickerExample = () => {
  const [formData, setFormData] = useState({
    birthDate: '',
    graduationYear: '',
    eventDate: '',
    appointmentTime: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate birth date (must be in the past)
    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const birthDateError = validationRules.pastDate(formData.birthDate);
      if (birthDateError) newErrors.birthDate = birthDateError;
    }

    // Validate graduation year
    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    } else {
      const yearError = validationRules.year(formData.graduationYear);
      if (yearError) newErrors.graduationYear = yearError;
    }

    // Validate event date (must be in the future)
    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    } else {
      const eventDateError = validationRules.futureDate(formData.eventDate);
      if (eventDateError) newErrors.eventDate = eventDateError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg'>
      <h2 className='text-2xl font-bold text-white mb-6'>DatePicker Component Examples</h2>

      {/* Icon Examples */}
      <div className='mb-8 p-4 bg-gray-800 rounded-lg'>
        <h3 className='text-lg font-semibold text-white mb-4'>Calendar Icons Preview:</h3>
        <div className='flex items-center space-x-6 text-gray-300'>
          <div className='flex items-center space-x-2'>
            <CalendarIcon className='w-6 h-6' />
            <span>Calendar</span>
          </div>
          <div className='flex items-center space-x-2'>
            <ClockIcon className='w-6 h-6' />
            <span>Clock</span>
          </div>
          <div className='flex items-center space-x-2'>
            <CalendarClockIcon className='w-6 h-6' />
            <span>Calendar + Clock</span>
          </div>
          <div className='flex items-center space-x-2'>
            <YearIcon className='w-6 h-6' />
            <span>Year</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Regular Date Input */}
        <DatePicker
          label='Birth Date'
          name='birthDate'
          value={formData.birthDate}
          onChange={handleInputChange}
          placeholder='Select your birth date'
          required
          error={errors.birthDate}
          maxDate={new Date().toISOString().split('T')[0]}
        />

        {/* Year Input */}
        <DatePicker
          label='Graduation Year'
          name='graduationYear'
          value={formData.graduationYear}
          onChange={handleInputChange}
          placeholder='Enter graduation year'
          required
          type='year'
          error={errors.graduationYear}
          minDate={1950}
          maxDate={new Date().getFullYear()}
        />

        {/* Future Date Input */}
        <DatePicker
          label='Event Date'
          name='eventDate'
          value={formData.eventDate}
          onChange={handleInputChange}
          placeholder='Select event date'
          required
          error={errors.eventDate}
          minDate={new Date().toISOString().split('T')[0]}
        />

        {/* DateTime Input */}
        <DatePicker
          label='Appointment Time'
          name='appointmentTime'
          value={formData.appointmentTime}
          onChange={handleInputChange}
          placeholder='Select date and time'
          type='datetime-local'
          minDate={new Date().toISOString().slice(0, 16)}
        />

        <button
          type='submit'
          className='w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors'
        >
          Submit Form
        </button>
      </form>

      {/* Display current form data */}
      <div className='mt-8 p-4 bg-gray-800 rounded-lg'>
        <h3 className='text-lg font-semibold text-white mb-2'>Current Form Data:</h3>
        <pre className='text-sm text-gray-300'>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DatePickerExample;
