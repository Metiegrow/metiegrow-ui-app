export const ErrorNotification = ({ message }) =>
  message && (
    <div className='fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in'>
      {message}
    </div>
  );
