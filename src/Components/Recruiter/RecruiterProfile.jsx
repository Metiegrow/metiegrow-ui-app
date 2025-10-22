import { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import { getAuthHeaders, getAuthData } from '../Auth/Auth.Function';
import { BackButtonIcon } from '../Common/SVG/svg.function';
// import Profilebg from '../assets/Profilebg.jpg';
// import Profilebg from "../assets/Profilebg.png";

const getInitialAvatar = (name) => {
  if (!name) return '';
  const initials = name
    .trim()
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  return initials.length > 2 ? initials.substring(0, 2) : initials;
};

export default function RecruiterProfile() {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    photoUrl: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchRecruiterProfileData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL}/api/userprofile/profiledetails`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const profileData = await response.json();
        setFormData({
          fullName: profileData.fullName || '',
          phoneNumber: profileData.phoneNumber || '',
          email: profileData.email || '',
          photoUrl: profileData.photoUrl || '',
          bio: profileData.bio || '',
        });

        if (profileData.photoUrl) {
          setImagePreview(`${URL}/${profileData.photoUrl}`);
        }
      } catch (err) {
        setError(err.message);
        message.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bio' && value.length > 40) {
      message.error('Profile Bio cannot exceed 40 characters.');
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (!file.type.match('image.*')) {
        message.error('Please select an image file (JPEG, PNG)');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        message.error('Image size should be less than 2MB');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateProfileImage = async () => {
    if (!imageFile) return { success: true, photoUrl: formData.photoUrl };

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const headers = getAuthHeaders();
      delete headers['Content-Type']; // Let browser set content-type for FormData

      const response = await fetch(`${URL}/api/userprofile/profile-image`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile image');
      }

      const result = await response.json();
      if (result.statuses?.[0]?.status !== 'success') {
        throw new Error(result.statuses[0]?.message || 'Image update failed');
      }

      // Return the new photo URL
      return {
        success: true,
        photoUrl: `api/public/images/profile-pic/${imageFile.name}`, // Adjust based on actual API response
      };
    } catch (err) {
      console.error('Image upload error:', err);
      return { success: false, error: err.message };
    }
  };

  const updateProfileDetails = async () => {
    try {
      const authData = getAuthData();
      if (!authData) {
        throw new Error('Authentication required');
      }

      const queryParams = new URLSearchParams({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        bio: formData.bio,
      }).toString();

      const response = await fetch(`${URL}/api/userprofile/profiledetails?${queryParams}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return { success: true };
    } catch (err) {
      console.error('Profile update error:', err);
      return { success: false, error: err.message };
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.fullName.trim()) {
      message.error('Full Name is required.');
      setLoading(false);
      return;
    }
    if (!formData.email.trim()) {
      message.error('Email is required.');
      setLoading(false);
      return;
    }
    if (formData.bio.length > 40) {
      message.error('Profile Bio cannot exceed 40 characters.');
      setLoading(false);
      return;
    }

    try {
      let imageResult = { success: true, photoUrl: formData.photoUrl };
      if (imageFile) {
        imageResult = await updateProfileImage();
        if (!imageResult.success) {
          message.error(imageResult.error);
          throw new Error(imageResult.error);
        }
      }

      const profileResult = await updateProfileDetails();
      if (!profileResult.success) {
        message.error(profileResult.error);
        throw new Error(profileResult.error);
      }

      // Show success toaster only once after all updates
      message.success({ content: 'Profile updated successfully!', duration: 2 });

      if (imageResult.photoUrl && imageResult.photoUrl !== formData.photoUrl) {
        setFormData((prev) => ({ ...prev, photoUrl: imageResult.photoUrl }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setImageFile(null);
    }
  };

  const renderAvatar = () => {
    if (imagePreview) {
      return <img src={imagePreview} alt='Profile' className='w-full h-full object-cover' />;
    }
    return (
      <div className='w-full h-full bg-gray-700 flex items-center justify-center'>
        {formData.fullName ? (
          <span className='text-2xl font-bold text-white'>
            {getInitialAvatar(formData.fullName)}
          </span>
        ) : (
          <span className='text-gray-400'>No Image</span>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col bg-black sm:bg-cardblack text-white min-h-screen mx-0 md:mx-40 rounded-xl'>
      {/* Header image */}
      <div className='hidden sm:block relative h-48 w-full overflow-hidden rounded-t-xl'>
        <img src={Profilebg} alt='Profile header' className='w-full h-full object-cover' />
      </div>
      <div className='flex items-center space-x-2 px-4 pt-4 sm:hidden'>
        <BackButtonIcon className='w-4 h-4 text-white' />
        <h2 className='text-base font-semibold text-white'>Edit Profile</h2>
      </div>

      {/* Profile picture */}
      <div className='relative sm:-mt-16 mt-6 ml-0 sm:ml-4 flex justify-center sm:justify-start'>
        <label htmlFor='profile-upload-desktop' className='cursor-pointer'>
          <div className='w-20 h-20 rounded-full border-4 border-cardblack overflow-hidden mx-auto sm:mx-0'>
            {renderAvatar()}
          </div>
          <div className='absolute -bottom-3 left-1/2 sm:left-7 transform -translate-x-1/2 sm:translate-x-0 rounded-full'>
            <ImageIcon className='w-5 h-5' />
          </div>
        </label>
        <Input
          id='profile-upload-desktop'
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='hidden'
        />
      </div>

      {/* Form */}
      <div className='max-w-4xl mx-auto w-full px-2 py-8 space-y-6'>
        <div className='space-y-2 px-4'>
          <label className='block text-sm'>
            Full Name<span className='text-red-500'>*</span>
          </label>
          <Input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            required
            className='w-full border border-gray-700 rounded-full px-4 py-2 text-white'
          />
        </div>

        <div className='space-y-2 px-4'>
          <label className='block text-sm'>Mobile Number</label>
          <Input
            type='tel'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            className='w-full border border-gray-700 rounded-full px-4 py-2 text-white'
          />
        </div>

        <div className='space-y-2 px-4'>
          <label className='block text-sm'>Email Address</label>
          <Input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full border border-gray-700 rounded-full px-4 py-2 text-white'
          />
        </div>

        <div className='space-y-2 px-4'>
          <label className='block text-sm'>Profile Bio</label>
          <Input
            type='text'
            name='bio'
            value={formData.bio}
            onChange={handleChange}
            placeholder='Type something...'
            className='w-full border border-gray-700 rounded-full px-4 py-2 text-white'
            maxLength={40}
          />
          <div className='text-right text-xs text-gray-400'>{formData.bio.length}/40</div>
        </div>

        <div className='flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-4 px-4'>
          {/* Cancel Button — only visible on desktop */}
          <Button
            type='button'
            className='hidden sm:block w-full sm:w-auto text-white px-6 py-2 bg-found rounded-full hover:bg-gray-700 transition-colors'
          >
            Cancel
          </Button>

          {/* Update / Save Changes Button */}
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={loading}
            className='w-full sm:w-auto text-white px-6 py-2 bg-[#bc5fff] rounded-full hover:bg-purple-700 transition-colors disabled:opacity-70'
          >
            {loading ? (
              'Updating...'
            ) : (
              <>
                <span className='block sm:hidden'>Save Changes</span>
                <span className='hidden sm:block'>Update</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
