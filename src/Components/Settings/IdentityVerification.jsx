import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react';
import useUserRole from '../Dashboard/hooks/useUserRole';
import { getAuthData } from '../Auth/Auth.Function';

export default function IdentityVerification() {
  const { isRealEstate } = useUserRole();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

  // Get user ID from auth data
  const getUserId = () => {
    try {
      const authData = getAuthData();
      return authData?.userId || 1;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return 1;
    }
  };

  // Fetch existing documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const response = await fetch(`${URL}/api/account-settings/${userId}/documents`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(data || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRealEstate()) {
      fetchDocuments();
    }
  }, [isRealEstate]);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const userId = getUserId();

      const formData = new FormData();
      formData.append('document', file);
      formData.append('documentType', 'identity');

      const response = await fetch(`${URL}/api/account-settings/${userId}/upload-document`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setDocuments((prev) => [...prev, result]);
        // Show success message
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      // Show error message
    } finally {
      setUploading(false);
    }
  };

  if (!isRealEstate()) {
    return (
      <div className='bg-black text-white p-6 rounded-lg min-h-screen'>
        <h2 className='text-lg font-semibold mb-4'>Identity Verification</h2>
        <p className='text-gray-400'>
          Identity verification is not required for your account type.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-black text-white p-6 rounded-lg min-h-screen'>
      <h2 className='text-lg font-semibold mb-6'>Identity Verification</h2>

      <div className='space-y-6'>
        <div className='bg-gray-900 p-4 rounded-lg'>
          <h3 className='text-md font-medium mb-2'>Document Requirements</h3>
          <ul className='text-sm text-gray-300 space-y-1'>
            <li>• Government issued ID (Passport, Driver's License, etc.)</li>
            <li>• ID must be clear and readable</li>
            <li>• Document must not be expired</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Accepted formats: PDF, JPG, PNG</li>
          </ul>
        </div>

        <div className='bg-gray-900 p-4 rounded-lg'>
          <h3 className='text-md font-medium mb-4'>Upload Documents</h3>

          <div className='space-y-4'>
            <div className='flex items-center justify-between p-3 bg-gray-800 rounded-lg'>
              <div className='flex items-center space-x-3'>
                <FileText className='w-5 h-5 text-gray-400' />
                <div>
                  <p className='text-sm font-medium'>Government Issued ID</p>
                  <p className='text-xs text-gray-400'>
                    {documents.length > 0
                      ? `${documents.length} document(s) uploaded`
                      : 'No documents uploaded'}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                {documents.length > 0 && <CheckCircle className='w-5 h-5 text-green-500' />}
                <input
                  type='file'
                  accept='.pdf,.jpg,.jpeg,.png'
                  onChange={handleFileUpload}
                  className='hidden'
                  id='id-upload'
                />
                <label
                  htmlFor='id-upload'
                  className='cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1'
                >
                  <Upload className='w-4 h-4' />
                  <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {documents.length > 0 && (
          <div className='bg-gray-900 p-4 rounded-lg'>
            <h3 className='text-md font-medium mb-4'>Uploaded Documents</h3>
            <div className='space-y-2'>
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 bg-gray-800 rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <FileText className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-sm font-medium'>
                        {doc.fileName || `Document ${index + 1}`}
                      </p>
                      <p className='text-xs text-gray-400'>
                        Uploaded on {new Date(doc.uploadDate || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        doc.status === 'verified'
                          ? 'bg-green-600 text-white'
                          : doc.status === 'pending'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-red-600 text-white'
                      }`}
                    >
                      {doc.status || 'pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='bg-gray-900 p-4 rounded-lg'>
          <h3 className='text-md font-medium mb-2'>Verification Status</h3>
          <div className='flex items-center space-x-2'>
            {documents.some((doc) => doc.status === 'verified') ? (
              <>
                <CheckCircle className='w-5 h-5 text-green-500' />
                <span className='text-sm text-green-400'>Verified</span>
              </>
            ) : documents.length > 0 ? (
              <>
                <div className='w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin'></div>
                <span className='text-sm text-yellow-400'>Under Review</span>
              </>
            ) : (
              <>
                <XCircle className='w-5 h-5 text-red-500' />
                <span className='text-sm text-red-400'>Not Verified</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
