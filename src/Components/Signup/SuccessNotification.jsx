import { CheckCircle } from 'lucide-react';

export const SuccessNotification = ({ message, showSuccess }) =>
  showSuccess && (
    <div className='fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center animate-fade-in'>
      <CheckCircle className='w-5 h-5 mr-2' />
      {message}
    </div>
  );
