import { BellFilled, VideoCameraOutlined } from '@ant-design/icons';
import { Bell, Clock } from 'lucide-react';

export default function SessionCard(props) {
  const { dateLabel, category, title, time, bgColor = 'bg-yellow-300' } = props;

  return (
    <div className={`w-full h-64 p-4 ${bgColor} rounded-3xl flex flex-col justify-between`}>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <span className='px-3 py-1 text-xs font-semibold text-orange-400 bg-white rounded-full'>
          {dateLabel}
        </span>
        <button className='flex items-center justify-center w-8 h-8 bg-white rounded-full'>
          <BellFilled className='text-gray-600 ' />
        </button>
      </div>

      {/* Middle Section */}
      <div>
        <p className='text-xs text-neutral-600'>{category}</p>
        <h3 className='mt-1 text-lg font-semibold leading-snug text-black line-clamp-2'>{title}</h3>
        <div className='flex items-center gap-2 mt-3 text-xs text-zinc-700'>
          <Clock className='w-4 h-4' />
          <span>{time}</span>
        </div>
      </div>

      {/* Bottom Section */}
      <button className='flex items-center justify-center w-full gap-2 py-3 font-semibold text-purple-500 transition bg-white border-2 rounded-full border-cyan-400 hover:bg-purple-50'>
        Join the Meeting{' '}
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z'
            stroke='#BC5FFF'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z'
            stroke='#BC5FFF'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z'
            stroke='#BC5FFF'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </button>
    </div>
  );
}
