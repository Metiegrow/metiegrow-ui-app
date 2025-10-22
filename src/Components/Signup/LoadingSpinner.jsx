import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => (
  <div className='flex justify-center items-center'>
    <Loader2 className='w-6 h-6 text-purple-500 animate-spin' />
  </div>
);
