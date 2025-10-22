import React from 'react';
import { useState } from 'react';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Button } from 'antd';

const AboutCompanyForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    industryType: '',
    website: '',
    headquartersLocation: '',
    specialties: '',
    jobDescription: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.industryType.trim()) newErrors.industryType = 'select industry type';
    if (!formData.website.trim()) newErrors.website = 'company Website is required';
    if (!formData.headquartersLocation.trim())
      newErrors.headquartersLocation = 'Headquarters location is required';
    if (!formData.specialties) newErrors.specialties = 'Specialties are required';
    if (!formData.jobDescription) newErrors.jobDescription = 'Job description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className='min-h-screen bg-black flex justify-center px-4 py-10 text-white'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[375px] md:max-w-[650px] md:px-6 space-y-5'
      >
        <div className='flex items-center mb-4'>
          <Button type='button' className='-ml-2 md:-ml-4 mr-2'>
            <BackButtonIcon size={24} className='text-white' />
          </Button>
          <h2 className='text-xl md:text-2xl font-semibold'>Create A Job Post</h2>
        </div>
        <h2>About Company</h2>
        <div>
          <label className='block text-sm font-medium mb-1'>
            IndustryType <span className='text-red-500'>*</span>
          </label>
          <select
            name='skills'
            value={formData.industryType}
            onChange={handleChange}
            className='w-full h-[51px] p-4 border border-[#646464] rounded-2xl bg-transparent text-white'
          >
            <option value='' disabled className='bg-black text-gray-500'>
              Select Key Skills
            </option>
            <option className='bg-black text-white' value='Tech'>
              Tech
            </option>
            <option className='bg-black text-white' value='non-tech'>
              non-tech
            </option>
            <option className='bg-black text-white' value='medical'>
              medical
            </option>
          </select>
          {errors.industryType && <p className='text-red-500 text-sm'>{errors.industryType}</p>}
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>
            Websites
            {/* <span className="text-red-500">*</span> */}
          </label>
          <input
            name='website'
            placeholder='Ex: Product Designer'
            value={formData.website}
            onChange={handleChange}
            className='w-full h-[51px] p-4 border border-[#646464] rounded-2xl bg-transparent placeholder-gray-400'
          />
          {errors.website && <p className='text-red-500 text-sm'>{errors.website}</p>}
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>
            Headquarters Location
            {/* <span className="text-red-500">*</span> */}
          </label>
          <input
            name='headquartersLocation'
            placeholder='Ex: Product Designer'
            value={formData.headquartersLocation}
            onChange={handleChange}
            className='w-full h-[51px] p-4 border border-[#646464] rounded-2xl bg-transparent placeholder-gray-400'
          />
          {errors.headquartersLocation && (
            <p className='text-red-500 text-sm'>{errors.headquartersLocation}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>
            Specialties
            {/* <span className="text-red-500">*</span> */}
          </label>
          <input
            name='specialties'
            placeholder='Ex: Product Designer'
            value={formData.specialties}
            onChange={handleChange}
            className='w-full h-[51px] p-4 border border-[#646464] rounded-2xl bg-transparent placeholder-gray-400'
          />
          {errors.specialties && <p className='text-red-500 text-sm'>{errors.specialties}</p>}
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>
            Job Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='jobDescription'
            placeholder='Typing...'
            value={formData.jobDescription}
            onChange={handleChange}
            maxLength={10000}
            className='w-full h-[124px] p-4 border border-[#646464] rounded-xl bg-transparent placeholder-gray-400 resize-none'
          />
          {errors.jobDescription && <p className='text-red-500 text-sm'>{errors.jobDescription}</p>}
        </div>
        <button
          type='submit'
          className='w-full h-[48px] rounded-full bg-[#A259FF] text-white font-semibold shadow-lg shadow-[#a259ff88] mt-2'
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AboutCompanyForm;
