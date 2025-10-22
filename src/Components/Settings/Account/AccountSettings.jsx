import { Button } from 'antd';
import { ArrowLeft, ChevronRight, Plus, Upload, FileText, Import } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import ChangeEmailModal from '../ChangeEmailModal';
import ChangeMobileNumberModal from '../ChangeMobileNumberModal';
import ChangePasswordModal from '../ChangePasswordModal';
import NotificationSetting from '../NotificationSetting';
import PaymentSettings from '../PaymentSettings';
import StudyPreferencesUI from '../Personalisation/Personalisation';
import ChangeLanguageModal from '../ChangeLanguageModal';
import ChangeTimezoneModal from '../ChangeTimezoneModal';
import useUserRole from '../../Common/hooks/useUserRole';
import IdentityVerification from '../IdentityVerification';
import PrivacySettings from '../PrivacySettings';

import {
  AccountSettingIcon,
  IdentifyIcon,
  NotificationIcon,
  PaymentSettingIcon,
  PersonalisationIcon,
  PrivacySettingIcon,
} from '../Settings.svg.jsx';
import { getAuthData } from '../../Auth/Auth.Function.jsx';

const MobileSettingsUI = () => {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const { userRole, isRealEstate } = useUserRole();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [currentView, setCurrentView] = useState(() => {
    const path = routerState?.location?.pathname || '';
    if (path.includes('/settings/notifications')) return 'notifications';
    if (path.includes('/settings/payment')) return 'payment';
    if (path.includes('/settings/personalisation')) return 'personalization';
    if (path.includes('/settings/identity')) return 'identity';
    if (path.includes('/settings/privacy')) return 'privacy';
    return 'account';
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
  const [isChangeMobileNumberModalOpen, setIsChangeMobileNumberModalOpen] = useState(false);
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isChangeTimezoneModalOpen, setIsChangeTimezoneModalOpen] = useState(false);
  const [userSettings, setUserSettings] = useState({
    email: '',
    phoneNumber: '',
    language: '',
    timeZone: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isChangeLanguageModalOpen, setIsChangeLanguageModalOpen] = useState(false);

  // Sanitize phone number coming from API to avoid rendering 'undefined123...'
  const sanitizePhoneNumber = (raw) => {
    if (!raw) return '';
    // Remove literal 'undefined' that may have been concatenated previously
    const cleaned = String(raw).replace(/^undefined\+?/, '');
    return cleaned;
  };

  // ID Document state for PG owners
  const [idDocuments, setIdDocuments] = useState({
    govtIdType: '',
    idNumber: '',
    documentFile: null,
    documentPreview: null,
  });
  const [uploadingDocument, setUploadingDocument] = useState(false);

  const handleTimezoneUpdate = async (timeZone) => {
    try {
      const userId = getUserId();
      const response = await fetch(
        `${URL}/api/account-settings/${userId}/change-timezone?timeZone=${timeZone}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setUserSettings((prev) => ({ ...prev, timeZone: timeZone }));
      } else {
        throw new Error('Failed to update timezone');
      }
    } catch (error) {
      console.error('Error updating timezone:', error);
      setError('Failed to update timezone');
    }
  };

  // Get user ID from auth data
  const getUserId = () => {
    try {
      const authData = getAuthData();
      return authData?.userId;
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  };

  // Fetch user settings
  const fetchUserSettings = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      console.log('Fetching user settings for userId:', userId);
      const response = await fetch(`${URL}/api/account-settings/${userId}`);
      console.log('API Response status:', response.status);
      const data = await response.json();
      console.log('API Response data:', data);
      if (data) {
        setUserSettings({
          email: data.email || '',
          phoneNumber: sanitizePhoneNumber(data.phoneNumber) || '',
          language: data.language || '',
          timeZone: data.timeZone || '',
        });
        console.log('Updated userSettings:', {
          email: data.email || '',
          phoneNumber: sanitizePhoneNumber(data.phoneNumber) || '',
          language: data.language || '',
          timeZone: data.timeZone || '',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSettings();
  }, []);

  // Update email method
  const handleEmailUpdate = async (newEmail) => {
    try {
      const userId = getUserId();
      const response = await fetch(`${URL}/api/account-settings/${userId}/change-email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldEmail: userSettings.email,
          newEmail: newEmail,
        }),
      });

      if (response.ok) {
        setUserSettings((prev) => ({ ...prev, email: newEmail }));
        setIsChangeEmailModalOpen(false);
      } else {
        throw new Error('Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      setError('Failed to update email');
    }
  };

  // Update phone number method
  const handlePhoneNumberUpdate = async (newNumber) => {
    try {
      const userId = getUserId();
      const response = await fetch(`${URL}/api/account-settings/${userId}/change-phone`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPhone: userSettings.phoneNumber,
          newPhone: newNumber,
        }),
      });

      if (response.ok) {
        setUserSettings((prev) => ({ ...prev, phoneNumber: newNumber }));
        setIsChangeMobileNumberModalOpen(false);
      } else {
        throw new Error('Failed to update phone number');
      }
    } catch (error) {
      console.error('Error updating phone number:', error);
      setError('Failed to update phone number');
    }
  };

  // Update password method
  const handlePasswordUpdate = async (currentPassword, newPassword) => {
    try {
      const userId = getUserId();
      const response = await fetch(`${URL}/api/account-settings/${userId}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: newPassword,
        }),
      });

      if (response.ok) {
        setIsChangePasswordModalOpen(false);
        // Show success message
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password');
    }
  };

  const handleLanguageUpdate = async (langCode) => {
    try {
      const userId = getUserId();
      const response = await fetch(
        `${URL}/api/account-settings/${userId}/change-language?language=${langCode}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setUserSettings((prev) => ({ ...prev, language: langCode }));
        setIsChangeLanguageModalOpen(false);
      } else {
        throw new Error('Failed to update language');
      }
    } catch (error) {
      console.error('Error updating language:', error);
      setError('Failed to update language');
    }
  };

  // Handle ID document upload for PG owners
  const handleDocumentUpload = async (file) => {
    try {
      setUploadingDocument(true);
      const userId = getUserId();

      const formData = new FormData();
      formData.append('document', file);
      formData.append('govtIdType', idDocuments.govtIdType);
      formData.append('idNumber', idDocuments.idNumber);

      const response = await fetch(`${URL}/api/account-settings/${userId}/upload-id-document`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setIdDocuments((prev) => ({
          ...prev,
          documentFile: file,
          documentPreview: URL.createObjectURL(file),
        }));
        // Show success message
      } else {
        throw new Error('Failed to upload document');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      setError('Failed to upload document');
    } finally {
      setUploadingDocument(false);
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIdDocuments((prev) => ({
        ...prev,
        documentFile: file,
        documentPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSetCurrentView = (view) => {
    setCurrentView(view);
    localStorage.setItem('settingsCurrentView', view);
    if (view === 'account') navigate({ to: '/app/settings/account' });
    else if (view === 'notifications') navigate({ to: '/app/settings/notifications' });
    else if (view === 'payment') navigate({ to: '/app/settings/payment' });
    else if (view === 'personalization') navigate({ to: '/app/settings/personalisation' });
    else if (view === 'identity') navigate({ to: '/app/settings/identity' });
    else if (view === 'privacy') navigate({ to: '/app/settings/privacy' });
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
      if (window.innerWidth >= 750) {
        setCurrentView((prev) => prev);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync currentView on URL change
  useEffect(() => {
    const path = routerState?.location?.pathname || '';
    if (path.includes('/settings/notifications')) setCurrentView('notifications');
    else if (path.includes('/settings/payment')) setCurrentView('payment');
    else if (path.includes('/settings/personalisation')) setCurrentView('personalization');
    else if (path.includes('/settings/identity')) setCurrentView('identity');
    else if (path.includes('/settings/privacy')) setCurrentView('privacy');
    else setCurrentView('account');
  }, [routerState?.location?.pathname]);

  const menuItems = [
    { id: 'account', icon: <AccountSettingIcon />, label: 'Account Settings' },
    {
      id: 'personalization',
      icon: <PersonalisationIcon />,
      label: 'Personalisation',
      component: <StudyPreferencesUI />,
    },
    {
      id: 'notifications',
      icon: <NotificationIcon />,
      label: 'Notifications Settings',
      component: <NotificationSetting />,
    },
    {
      id: 'payment',
      icon: <PaymentSettingIcon />,
      label: 'Payment Settings',
      component: <PaymentSettings />,
    },
    { id: 'identity', icon: <IdentifyIcon />, label: 'Identity Verification' },
    { id: 'privacy', icon: <PrivacySettingIcon />, label: 'Privacy Settings' },
  ];

  const AccountSettings = () => (
    <div className='text-white min-h-screen'>
      {isMobile && (
        <div className='flex items-center border-b border-gray-800'>
          <button onClick={() => handleSetCurrentView('sidebar')} className='mr-3'>
            <ArrowLeft className='w-5 h-5' />
          </button>
          <h1 className='text-lg font-medium'>Account Settings</h1>
        </div>
      )}

      <div className='pt-3 px-4'>
        <div className='flex items-center justify-between space-x-4 group py-4'>
          <div>
            <label className='block text-gray-400 text-sm mb-2'>Email Address</label>
            <div className='text-white'>{userSettings.email}</div>
          </div>
          {!isMobile && (
            <div className=''>
              <Button
                onClick={() => setIsChangeEmailModalOpen(true)}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              >
                Change
              </Button>
            </div>
          )}
        </div>
        <hr className='border-t border-[#2B2B2B]' />

        <div className='group py-4'>
          <label className='block text-gray-400 text-sm mb-2'>Phone Number</label>
          <div className='flex justify-between items-center'>
            <span className='text-white'>{userSettings.phoneNumber}</span>
            {!isMobile && (
              <Button
                onClick={() => setIsChangeMobileNumberModalOpen(true)}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              >
                Change
              </Button>
            )}
          </div>
        </div>
        <hr className='border-t border-[#2B2B2B]' />

        <div className='group py-4'>
          <label className='block text-gray-400 text-sm mb-2'>Change Password</label>
          <div className='flex justify-between items-center'>
            <span className='text-white'>••••••••••••</span>
            {!isMobile && (
              <Button
                onClick={() => setIsChangePasswordModalOpen(true)}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              >
                Change
              </Button>
            )}
          </div>
        </div>
        <hr className='border-t border-[#2B2B2B]' />

        {/* <div className="group">
          <label className="block text-gray-400 text-sm mb-2">Language</label>
          <div className="flex justify-between items-center">
            <span className="text-white">{userSettings.language}</span>
            {!isMobile && (
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Change
              </Button>
            )}
            {isMobile && <span className="text-purple-500 text-sm">ENG</span>}
          </div>
        </div> */}
        <div className='group py-4'>
          <label className='block text-gray-400 text-sm mb-2'>Language</label>
          <div className='flex justify-between items-center'>
            <span className='text-white'>{userSettings.language}</span>
            {!isMobile && (
              <Button
                onClick={() => setIsChangeLanguageModalOpen(true)}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              >
                Change
              </Button>
            )}
            {isMobile && (
              <span
                onClick={() => setIsChangeLanguageModalOpen(true)}
                className='text-purple-500 text-sm cursor-pointer'
              >
                ENG
              </span>
            )}
          </div>
        </div>
        <hr className='border-t border-[#2B2B2B]' />

        <div className='group py-4'>
          <label className='block text-gray-400 text-sm mb-2'>Time Zone Settings</label>
          <div className='flex justify-between items-center'>
            <span className='text-white'>{userSettings.timeZone}</span>
            {!isMobile && (
              <Button
                onClick={() => setIsChangeTimezoneModalOpen(true)}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              >
                Change
              </Button>
            )}
            {isMobile && <span className='text-purple-500 text-sm'>AUS GMT+5</span>}
          </div>
        </div>
        <hr className='border-t border-[#2B2B2B]' />

        {/* ID Documents section for PG Owners */}
        {isRealEstate() && (
          <div className='group py-4'>
            <label className='block text-gray-400 text-sm mb-2'>ID Documents</label>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-white'>
                  Govt Issued ID: {idDocuments.govtIdType || 'Not set'}
                </span>
                {!isMobile && (
                  <Button className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    Change
                  </Button>
                )}
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white'>ID Number: {idDocuments.idNumber || 'Not set'}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white'>
                  Document:{' '}
                  {idDocuments.documentFile ? idDocuments.documentFile.name : 'Not uploaded'}
                </span>
                <div className='flex items-center space-x-2'>
                  <input
                    type='file'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={handleFileChange}
                    className='hidden'
                    id='document-upload'
                  />
                  <label
                    htmlFor='document-upload'
                    className='cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm flex items-center space-x-1'
                  >
                    <Upload className='w-4 h-4' />
                    <span>Upload</span>
                  </label>
                  {idDocuments.documentFile && (
                    <Button
                      onClick={() => handleDocumentUpload(idDocuments.documentFile)}
                      loading={uploadingDocument}
                      className='bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm'
                    >
                      Save
                    </Button>
                  )}
                </div>
              </div>
              {idDocuments.documentPreview && (
                <div className='mt-2'>
                  <img
                    src={idDocuments.documentPreview}
                    alt='ID Document Preview'
                    className='max-w-full h-32 object-contain border border-gray-600 rounded'
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className='bg-secondary text-white min-h-screen p-4 fixed w-80'>
      {isMobile && (
        <div className='flex items-center p-4 border-b border-gray-800'>
          <Plus className='w-5 h-5 mr-3' />
          <h1 className='text-lg font-medium'>Settings</h1>
        </div>
      )}

      <div className='pt-3 bg-secondary h-full '>
        <nav className='space-y-2 cursor-pointer'>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleSetCurrentView(item.id)}
              className={`cursor-pointer  w-full flex items-center border-none justify-between p-3 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-[#1C1C1E] text-white border-l-4 border-[#A82EFF]'
                  : ' bg-transparent hover:bg-cardblack text-gray-300'
              }`}
            >
              <div className='flex items-center space-x-3 py-2 my-4'>
                <span className='text-lg mt-2'>
                  {React.cloneElement(item.icon, {
                    color: currentView === item.id ? '#A82EFF' : '#B8B8B8',
                  })}
                </span>

                <span
                  className={`text-sm ${currentView === item.id ? 'text-white' : 'text-gray-300'}`}
                >
                  {item.label}
                </span>
              </div>
              <ChevronRight className='w-4 h-4' />
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile header wrapper for settings pages
  const MobileSettingsPageWrapper = ({ title, onBack, children }) => (
    <div className='text-white min-h-screen'>
      <div className='flex items-center border-b border-gray-800'>
        <button onClick={onBack} className='mr-3'>
          <ArrowLeft className='w-5 h-5' />
        </button>
        <h1 className='text-lg font-medium'>{title}</h1>
      </div>
      <div className='pt-3 px-4 space-y-6'>{children}</div>
    </div>
  );

  // Desktop layout
  if (!isMobile) {
    return (
      <div
        className={`flex h-screen bg-black ${isChangeMobileNumberModalOpen || isChangeEmailModalOpen ? 'opacity-25 bg-cardblack' : ''}`}
      >
        <div className='w-80 border-r border-gray-800'>
          <Sidebar />
        </div>
        <div className='flex-1 p-4'>
          {currentView === 'account' && <AccountSettings />}
          {currentView === 'notifications' && <NotificationSetting />}
          {currentView === 'payment' && <PaymentSettings />}
          {currentView === 'personalization' && <StudyPreferencesUI />}
          {currentView === 'identity' && <IdentityVerification />}
          {currentView === 'privacy' && <PrivacySettings />}
          {isChangeMobileNumberModalOpen && (
            <ChangeMobileNumberModal
              isOpen={isChangeMobileNumberModalOpen}
              onClose={() => setIsChangeMobileNumberModalOpen(false)}
              onUpdate={handlePhoneNumberUpdate}
              currentNumber={userSettings.phoneNumber}
            />
          )}
          {console.log('AccountSettings - userSettings.phoneNumber:', userSettings.phoneNumber)}
          {console.log(
            'AccountSettings - isChangeMobileNumberModalOpen:',
            isChangeMobileNumberModalOpen
          )}
          {isChangeEmailModalOpen && (
            <ChangeEmailModal
              isOpen={isChangeEmailModalOpen}
              onClose={() => setIsChangeEmailModalOpen(false)}
              onUpdate={handleEmailUpdate}
              currentEmail={userSettings.email}
            />
          )}
          {isChangePasswordModalOpen && (
            <ChangePasswordModal
              isOpen={isChangePasswordModalOpen}
              onClose={() => setIsChangePasswordModalOpen(false)}
              onUpdate={handlePasswordUpdate}
            />
          )}
          {isChangeLanguageModalOpen && (
            <ChangeLanguageModal
              visible={isChangeLanguageModalOpen}
              onClose={() => setIsChangeLanguageModalOpen(false)}
              onSelect={handleLanguageUpdate}
              selectedLanguage={userSettings.language}
            />
          )}
          {isChangeTimezoneModalOpen && (
            <ChangeTimezoneModal
              visible={isChangeTimezoneModalOpen}
              onClose={() => setIsChangeTimezoneModalOpen(false)}
              onSelect={handleTimezoneUpdate}
              selectedTimezone={userSettings.timeZone}
            />
          )}
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <div className={`bg-black min-h-screen  ${isChangeMobileNumberModalOpen ? 'opacity-50' : ''}`}>
      {currentView === 'sidebar' && <Sidebar />}
      {currentView === 'sidebar' && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-[100]'
          onClick={() => handleSetCurrentView('account')}
        />
      )}
      {currentView === 'account' && <AccountSettings />}
      {currentView === 'notifications' && (
        <MobileSettingsPageWrapper
          title='Notifications Settings'
          onBack={() => handleSetCurrentView('sidebar')}
        >
          <NotificationSetting />
        </MobileSettingsPageWrapper>
      )}
      {currentView === 'payment' && (
        <MobileSettingsPageWrapper
          title='Payment Settings'
          onBack={() => handleSetCurrentView('sidebar')}
        >
          <PaymentSettings />
        </MobileSettingsPageWrapper>
      )}
      {currentView === 'personalization' && (
        <MobileSettingsPageWrapper
          title='Personalisation'
          onBack={() => handleSetCurrentView('sidebar')}
        >
          <StudyPreferencesUI />
        </MobileSettingsPageWrapper>
      )}
      {currentView === 'identity' && (
        <MobileSettingsPageWrapper
          title='Identity Verification'
          onBack={() => handleSetCurrentView('sidebar')}
        >
          <IdentityVerification />
        </MobileSettingsPageWrapper>
      )}
      {currentView === 'privacy' && (
        <MobileSettingsPageWrapper
          title='Privacy Settings'
          onBack={() => handleSetCurrentView('sidebar')}
        >
          <PrivacySettings />
        </MobileSettingsPageWrapper>
      )}
      {isChangeMobileNumberModalOpen && (
        <ChangeMobileNumberModal
          isOpen={isChangeMobileNumberModalOpen}
          onClose={() => setIsChangeMobileNumberModalOpen(false)}
          onUpdate={handlePhoneNumberUpdate}
          currentNumber={userSettings.phoneNumber}
        />
      )}
      {isChangeEmailModalOpen && (
        <ChangeEmailModal
          isOpen={isChangeEmailModalOpen}
          onClose={() => setIsChangeEmailModalOpen(false)}
          onUpdate={handleEmailUpdate}
          currentEmail={userSettings.email}
        />
      )}
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
          onUpdate={handlePasswordUpdate}
        />
      )}
      {isChangeLanguageModalOpen && (
        <ChangeLanguageModal
          visible={isChangeLanguageModalOpen}
          onClose={() => setIsChangeLanguageModalOpen(false)}
          onSelect={handleLanguageUpdate}
          selectedLanguage={userSettings.language}
        />
      )}
    </div>
  );
};

export default MobileSettingsUI;
