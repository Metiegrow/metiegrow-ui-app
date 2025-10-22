import { useState, useRef } from 'react';
import { Upload, X, Camera, File } from 'lucide-react';

export const FileUpload = ({
  label,
  name,
  value = null,
  onChange,
  error,
  disabled = false,
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = false,
  showPreview = true,
  className = '',
  ...props
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    if (disabled || isUploading) return;

    const file = multiple ? files : files[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      alert(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    // Validate file type
    if (accept && !file.type.match(accept.replace(/\*/g, '.*'))) {
      alert(`Please select a valid file type. Accepted: ${accept}`);
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      onChange(name, file);
      setIsUploading(false);
    }, 500);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFileSelect(files);
  };

  const handleRemove = () => {
    if (!disabled) {
      onChange(name, null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Camera className='w-8 h-8 text-gray-400' />;
    }
    return <File className='w-8 h-8 text-gray-400' />;
  };

  return (
    <div className={`mb-4 md:mb-6 ${className}`}>
      <label className='block text-sm md:text-base font-medium mb-1 md:mb-2 text-white'>
        {label}
      </label>

      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${error ? 'border-red-500' : isDragOver ? 'border-purple-500 bg-purple-500 bg-opacity-10' : 'border-gray-500'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}
          ${isUploading ? 'pointer-events-none' : ''}
        `.trim()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        {...props}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className='hidden'
          disabled={disabled}
        />

        {isUploading ? (
          <div className='flex flex-col items-center'>
            <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2'></div>
            <p className='text-gray-400'>Uploading...</p>
          </div>
        ) : value ? (
          <div className='flex flex-col items-center'>
            {showPreview && value.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(value)}
                alt='Preview'
                className='w-20 h-20 object-cover rounded-lg mb-2'
              />
            ) : (
              <div className='w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center mb-2'>
                {getFileIcon(value)}
              </div>
            )}
            <p className='text-white font-medium mb-1'>{value.name}</p>
            <p className='text-gray-400 text-sm mb-2'>{formatFileSize(value.size)}</p>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className='text-red-400 hover:text-red-300 transition-colors'
              disabled={disabled}
            >
              <X className='w-4 h-4' />
            </button>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <Upload className='w-8 h-8 text-gray-400 mb-2' />
            <p className='text-gray-400 mb-1'>
              {isDragOver ? 'Drop file here' : 'Click to upload or drag and drop'}
            </p>
            <p className='text-xs text-gray-500'>
              Max size: {Math.round(maxSize / (1024 * 1024))}MB
            </p>
            {accept && <p className='text-xs text-gray-500 mt-1'>Accepted: {accept}</p>}
          </div>
        )}
      </div>

      {error && <p className='text-red-500 text-xs md:text-sm mt-1'>{error}</p>}
    </div>
  );
};
