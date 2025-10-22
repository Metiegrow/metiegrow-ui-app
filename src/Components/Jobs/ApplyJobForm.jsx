import { useState } from 'react';
import { ChevronLeft, Upload, Globe, Check, ChevronDown } from 'lucide-react';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Button, Input } from 'antd';

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    education: '',
    skills: '',
    experience: '',
    authorized: null,
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [countryCode, setCountryCode] = useState('+61');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleAuthorization = (value) => {
    setFormData({
      ...formData,
      authorized: value,
    });
  };

  const handleResumeUpload = () => {
    // In a real implementation, this would trigger a file input
    alert('Resume upload functionality would open a file picker');
    // Simulating a selected file
    setFormData({
      ...formData,
      resume: 'resume.pdf',
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    if (formData.authorized === null) {
      newErrors.authorized = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Form submitted successfully!');
      // In a real app, you would send the data to your server here
    } else {
      alert('Please fix the errors in the form');
    }
  };

  return (
    <div className='bg-black text-white min-h-screen w-full mx-auto px-4 py-6'>
      {/* Header */}
      <div className='flex items-center mb-8'>
        <a href='/app/jobs' className='text-gray-400'>
          <BackButtonIcon />
        </a>
        <h1 className='text-xl font-medium'>Apply Job</h1>
      </div>

      {/* Form Fields */}
      <div className='space-y-5'>
        <div>
          <label className='block text-sm mb-2'>
            Full Name <span className='text-red-500'>*</span>
          </label>
          <Input
            type='text'
            name='fullName'
            placeholder='Enter Name'
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full bg-transparent border ${errors.fullName ? 'border-red-500' : 'border-gray-700'} rounded-full p-3 text-white placeholder-gray-500`}
          />
          {errors.fullName && <p className='text-red-500 text-sm mt-1'>{errors.fullName}</p>}
        </div>

        <div>
          <label className='block text-sm mb-2'>
            Email Address <span className='text-red-500'>*</span>
          </label>
          <Input
            type='email'
            name='email'
            placeholder='Enter Email Address'
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-transparent border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-full p-3 text-white placeholder-gray-500`}
          />
          {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
        </div>

        <div>
          <label className='block text-sm mb-2'>
            Mobile Number <span className='text-red-500'>*</span>
          </label>
          <div className='flex'>
            <div className='bg-transparent border border-gray-700 rounded-xl p-2 flex items-center mr-2'>
              <Globe size={16} className='mr-1' />
              <span className='mr-1'>{countryCode}</span>
              <ChevronDown size={16} />
            </div>
            <Input
              type='tel'
              name='mobile'
              placeholder='999 999 999'
              value={formData.mobile}
              onChange={handleChange}
              className={`flex-grow bg-transparent border ${errors.mobile ? 'border-red-500' : 'border-gray-700'} rounded-full p-3 text-white placeholder-gray-500`}
            />
          </div>
          {errors.mobile && <p className='text-red-500 text-sm mt-1'>{errors.mobile}</p>}
        </div>

        <div>
          <label className='block text-sm mb-2'>Education Details</label>
          <Input
            type='text'
            name='education'
            placeholder='Ex: B.Sc (Information Technology)'
            value={formData.education}
            onChange={handleChange}
            className='w-full bg-transparent border border-gray-700 rounded-full p-3 text-white placeholder-gray-500'
          />
        </div>

        <div>
          <label className='block text-sm mb-2'>Specific skills</label>
          <div className='relative'>
            <select
              name='skills'
              value={formData.skills}
              onChange={handleChange}
              className='w-full bg-transparent border border-gray-700 rounded-full p-3 text-white appearance-none'
            >
              <option value='' disabled selected className='bg-gray-900'>
                Select Skills
              </option>
              <option value='react' className='bg-gray-900'>
                React
              </option>
              <option value='javascript' className='bg-gray-900'>
                JavaScript
              </option>
              <option value='nodejs' className='bg-gray-900'>
                Node.js
              </option>
            </select>
            <ChevronDown
              size={16}
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm mb-2'>Total No of Experience</label>
          <div className='relative'>
            <select
              name='experience'
              value={formData.experience}
              onChange={handleChange}
              className='w-full bg-transparent border border-gray-700 rounded-full p-3 text-white appearance-none'
            >
              <option value='' disabled selected className='bg-gray-900'>
                Select Experience
              </option>
              <option value='0-1' className='bg-gray-900'>
                0-1 years
              </option>
              <option value='1-3' className='bg-gray-900'>
                1-3 years
              </option>
              <option value='3-5' className='bg-gray-900'>
                3-5 years
              </option>
              <option value='5+' className='bg-gray-900'>
                5+ years
              </option>
            </select>
            <ChevronDown
              size={16}
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm mb-2'>
            Upload Your Resume <span className='text-red-500'>*</span>
          </label>
          <button
            type='button'
            onClick={handleResumeUpload}
            className={`w-full bg-transparent border ${errors.resume ? 'border-red-500' : 'border-gray-700'} border-dashed rounded-xl p-6 flex flex-col items-center justify-center`}
          >
            <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2'>
              <Upload size={18} />
            </div>
            <p className='text-sm font-medium'>Click to Upload</p>
            <p className='text-xs text-gray-400'>Supported file formats: pdf, jpeg, jpg, png</p>
            {formData.resume && (
              <div className='mt-2 text-green-500 flex items-center'>
                <Check size={16} className='mr-1' />
                <span>{formData.resume}</span>
              </div>
            )}
          </button>
          {errors.resume && <p className='text-red-500 text-sm mt-1'>{errors.resume}</p>}
        </div>

        <div>
          <p className='mb-2'>Are you authorized to work in country?</p>
          <div className='flex space-x-4'>
            <Button
              type='button'
              onClick={() => handleAuthorization(true)}
              className={`px-6 py-2 rounded-full ${formData.authorized === true ? 'bg-purple-600 text-white' : 'bg-transparent border border-gray-700 text-white'}`}
            >
              Yes
            </Button>
            <Button
              type='button'
              onClick={() => handleAuthorization(false)}
              className={`px-6 py-2 rounded-full ${formData.authorized === false ? 'bg-purple-600 text-white' : 'bg-transparent border border-gray-700 text-white'}`}
            >
              No
            </Button>
          </div>
          {errors.authorized && <p className='text-red-500 text-sm mt-1'>{errors.authorized}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleSubmit}
          className='w-full bg-purple-600 text-white py-4 rounded-full font-medium'
        >
          Submit
        </button>
      </div>
    </div>
  );
}
