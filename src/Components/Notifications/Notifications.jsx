import { ArrowLeft, Calendar, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';
import { BackButtonIcon } from '../Common/SVG/svg.function';

export default function NotificationsUI() {
  const notifications = [
    {
      id: 1,
      icon: <CheckCircle className='h-5 w-5 text-purple-500' />,
      message: 'Your session was booked successfully',
      time: 'just now',
      bgColor: 'bg-purple-900',
    },
    {
      id: 2,
      icon: <Calendar className='h-5 w-5 text-yellow-500' />,
      message: 'You have new preperences',
      time: '2m',
      bgColor: 'bg-yellow-900',
    },
    {
      id: 3,
      icon: <MessageSquare className='h-5 w-5 text-blue-500' />,
      message: 'Your questions someone response to you',
      time: '1d',
      bgColor: 'bg-blue-900',
    },
    {
      id: 4,
      icon: <AlertTriangle className='h-5 w-5 text-red-500' />,
      message: 'Your session was cancelled by mentor refund will get soon',
      time: '1w',
      bgColor: 'bg-red-900',
    },
  ];

  return (
    <div className='bg-black text-white min-h-screen w-full'>
      {/* Header */}
      <div className='flex items-center p-4 border-b border-gray-800'>
        <a className='mr-3' onClick={() => window.history.back()}>
          <BackButtonIcon className='h-6 w-6' />
        </a>
        <h1 className='text-xl font-semibold'>Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className='p-2'>
        {notifications.map((notification) => (
          <div key={notification.id} className='flex items-start p-3 mb-2 rounded-lg'>
            <div className={`${notification.bgColor} p-2 rounded-lg mr-3`}>{notification.icon}</div>
            <div className='flex-1'>
              <div className='flex justify-between items-start'>
                <p className='text-sm pr-4'>{notification.message}</p>
                <span className='text-xs text-gray-400 whitespace-nowrap'>{notification.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
