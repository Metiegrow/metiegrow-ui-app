import React, { useState } from 'react';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Button } from 'antd';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    responsibilities: '',
    experience: '',
    skills: '',
    salaryMin: '',
    salaryMax: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required';
    if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Description is required';
    if (!formData.responsibilities.trim())
      newErrors.responsibilities = 'Key Responsibilities required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.skills) newErrors.skills = 'Key skills required';
    if (!formData.salaryMin || !formData.salaryMax) newErrors.salary = 'Salary range is required';
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
        {/* Header */}
        <div className='flex items-center mb-4'>
          <Button type='button' className='-ml-2 md:-ml-4 mr-2'>
            <BackButtonIcon size={24} className='text-white' />
          </Button>
          <h2 className='text-xl md:text-2xl font-semibold'>Create A Job Post</h2>
        </div>

        {/* Job Title */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Job Title <span className='text-red-500'>*</span>
          </label>
          <input
            name='jobTitle'
            placeholder='Ex: Product Designer'
            value={formData.jobTitle}
            onChange={handleChange}
            className='w-full h-[51px] p-4 border border-[#646464] rounded-2xl bg-transparent placeholder-gray-400'
          />
          {errors.jobTitle && <p className='text-red-500 text-sm'>{errors.jobTitle}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label className='block text-sm font-medium mb-1'>Company Name</label>
          <input
            name='companyName'
            placeholder='MC info Tech PVT Ltd'
            value={formData.companyName}
            onChange={handleChange}
            className='w-full h-[51px] p-4 border border-[#646464] rounded-2xl bg-transparent placeholder-gray-400'
          />
        </div>

        {/* Job Details */}
        <h3 className='text-white font-semibold text-[17px]'>Job details</h3>

        {/* Job Description */}
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

        {/* Key Responsibilities */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Key Responsibilities <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='responsibilities'
            placeholder='Typing...'
            value={formData.responsibilities}
            onChange={handleChange}
            maxLength={10000}
            className='w-full h-[124px] p-4 border border-[#646464] rounded-xl bg-transparent placeholder-gray-400 resize-none'
          />
          {errors.responsibilities && (
            <p className='text-red-500 text-sm'>{errors.responsibilities}</p>
          )}
        </div>

        {/* Experience Required */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Experience Required <span className='text-red-500'>*</span>
          </label>
          <select
            name='experience'
            value={formData.experience}
            onChange={handleChange}
            className='w-full h-[51px] p-4 border border-[#646464] rounded-2xl bg-transparent text-white'
          >
            <option value='' disabled className='bg-black text-gray-500'>
              Select Exp Range
            </option>
            <option className='bg-black text-white' value='0-1'>
              0-1 Years
            </option>
            <option className='bg-black text-white' value='2-5'>
              2-5 Years
            </option>
            <option className='bg-black text-white' value='5+'>
              5+ Years
            </option>
          </select>
          {errors.experience && <p className='text-red-500 text-sm'>{errors.experience}</p>}
        </div>

        {/* Key Skills Required */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Key Skills Required <span className='text-red-500'>*</span>
          </label>
          <select
            name='skills'
            value={formData.skills}
            onChange={handleChange}
            className='w-full h-[51px] p-4 border border-[#646464] rounded-2xl bg-transparent text-white'
          >
            <option value='' disabled className='bg-black text-gray-500'>
              Select Key Skills
            </option>
            <option className='bg-black text-white' value='ReactJS'>
              ReactJS
            </option>
            <option className='bg-black text-white' value='NodeJS'>
              NodeJS
            </option>
            <option className='bg-black text-white' value='UI/UX'>
              UI/UX
            </option>
          </select>
          {errors.skills && <p className='text-red-500 text-sm'>{errors.skills}</p>}
        </div>

        {/* Salary Range */}
        <div>
          <label className='block text-sm font-medium mb-1'>Salary Range</label>
          <div className='flex gap-4'>
            {/* Salary Min */}
            <div className='relative w-1/2'>
              <Button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    salaryMin: Number(prev.salaryMin || 0) + 100,
                  }))
                }
                className='absolute right-2 top-1/2 -translate-y-1/2 text-white font-bold px-2 cursor-pointer z-10'
              >
                <svg
                  width='22'
                  height='23'
                  viewBox='0 0 22 23'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M11 2.25C5.89137 2.25 1.75 6.39137 1.75 11.5C1.75 16.6086 5.89137 20.75 11 20.75C16.1086 20.75 20.25 16.6086 20.25 11.5C20.25 6.39137 16.1086 2.25 11 2.25ZM0.25 11.5C0.25 5.56294 5.06294 0.75 11 0.75C16.9371 0.75 21.75 5.56294 21.75 11.5C21.75 17.4371 16.9371 22.25 11 22.25C5.06294 22.25 0.25 17.4371 0.25 11.5ZM11 4.75C11.4142 4.75 11.75 5.08579 11.75 5.5V5.81673C13.3804 6.10867 14.75 7.33361 14.75 9C14.75 9.41421 14.4142 9.75 14 9.75C13.5858 9.75 13.25 9.41421 13.25 9C13.25 8.15573 12.3765 7.25 11 7.25C9.62351 7.25 8.75 8.15573 8.75 9C8.75 9.84427 9.62351 10.75 11 10.75C12.9372 10.75 14.75 12.0828 14.75 14C14.75 15.6664 13.3804 16.8913 11.75 17.1833V17.5C11.75 17.9142 11.4142 18.25 11 18.25C10.5858 18.25 10.25 17.9142 10.25 17.5V17.1833C8.61957 16.8913 7.25 15.6664 7.25 14C7.25 13.5858 7.58579 13.25 8 13.25C8.41421 13.25 8.75 13.5858 8.75 14C8.75 14.8443 9.62351 15.75 11 15.75C12.3765 15.75 13.25 14.8443 13.25 14C13.25 13.1557 12.3765 12.25 11 12.25C9.06278 12.25 7.25 10.9172 7.25 9C7.25 7.33361 8.61957 6.10867 10.25 5.81673V5.5C10.25 5.08579 10.5858 4.75 11 4.75Z'
                    fill='white'
                  />
                </svg>
              </Button>
              <input
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                name='salaryMin'
                placeholder='Min'
                value={formData.salaryMin}
                onChange={handleChange}
                className='w-full h-[51px] pl-8 pr-4 py-2 border border-[#646464] rounded-2xl bg-transparent text-white placeholder-gray-400 appearance-none'
              />
            </div>

            {/* Salary Max */}
            {/* Salary Max */}
            <div className='relative w-1/2'>
              <Button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    salaryMax: Number(prev.salaryMax || 0) + 100, // ✅ Increase instead of decrease
                  }))
                }
                className='absolute right-2 top-1/2 -translate-y-1/2 text-white font-bold px-2 cursor-pointer z-10'
              >
                <svg
                  width='22'
                  height='23'
                  viewBox='0 0 22 23'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M11 2.25C5.89137 2.25 1.75 6.39137 1.75 11.5C1.75 16.6086 5.89137 20.75 11 20.75C16.1086 20.75 20.25 16.6086 20.25 11.5C20.25 6.39137 16.1086 2.25 11 2.25ZM0.25 11.5C0.25 5.56294 5.06294 0.75 11 0.75C16.9371 0.75 21.75 5.56294 21.75 11.5C21.75 17.4371 16.9371 22.25 11 22.25C5.06294 22.25 0.25 17.4371 0.25 11.5ZM11 4.75C11.4142 4.75 11.75 5.08579 11.75 5.5V5.81673C13.3804 6.10867 14.75 7.33361 14.75 9C14.75 9.41421 14.4142 9.75 14 9.75C13.5858 9.75 13.25 9.41421 13.25 9C13.25 8.15573 12.3765 7.25 11 7.25C9.62351 7.25 8.75 8.15573 8.75 9C8.75 9.84427 9.62351 10.75 11 10.75C12.9372 10.75 14.75 12.0828 14.75 14C14.75 15.6664 13.3804 16.8913 11.75 17.1833V17.5C11.75 17.9142 11.4142 18.25 11 18.25C10.5858 18.25 10.25 17.9142 10.25 17.5V17.1833C8.61957 16.8913 7.25 15.6664 7.25 14C7.25 13.5858 7.58579 13.25 8 13.25C8.41421 13.25 8.75 13.5858 8.75 14C8.75 14.8443 9.62351 15.75 11 15.75C12.3765 15.75 13.25 14.8443 13.25 14C13.25 13.1557 12.3765 12.25 11 12.25C9.06278 12.25 7.25 10.9172 7.25 9C7.25 7.33361 8.61957 6.10867 10.25 5.81673V5.5C10.25 5.08579 10.5858 4.75 11 4.75Z'
                    fill='white'
                  />
                </svg>
              </Button>
              <input
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                name='salaryMax'
                placeholder='Max'
                value={formData.salaryMax}
                onChange={handleChange}
                className='w-full h-[51px] pl-8 pr-4 py-2 border border-[#646464] rounded-2xl bg-transparent text-white placeholder-gray-400 appearance-none'
              />
            </div>
          </div>
          {errors.salary && <p className='text-red-500 text-sm'>{errors.salary}</p>}
        </div>

        {/* Submit */}
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

export default JobPostForm;
