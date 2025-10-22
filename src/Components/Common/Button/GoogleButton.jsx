import React from 'react';

// Google Icon SVG component
const GoogleIcon = () => (
  <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill='#4285F4'
      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
    />
    <path
      fill='#34A853'
      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
    />
    <path
      fill='#FBBC05'
      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
    />
    <path
      fill='#EA4335'
      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
    />
  </svg>
);

const NeoButton = ({
  text = 'Continue with Google',
  onClick = () => console.log('Button clicked'),
  alt = 'Google',
}) => {
  return (
    <div className='w-full max-w-md relative '>
      {/* Bottom gradient blur effect */}
      <div
        className='absolute w-full h-8 bottom-0'
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, #14C0FE 20%, #A82EFF 50%, #CC9192 80%, transparent 95%)',
          filter: 'blur(18px)',
          opacity: '0.8',
          borderRadius: '999px',
        }}
      />

      {/* Button with gradient border */}
      <div
        className='relative w-full rounded-full overflow-hidden p-0.5 '
        style={{
          background: 'linear-gradient(90deg, #14C0FE 0%, #A82EFF 50%, #CC9192 100%)',
        }}
      >
        <button
          onClick={onClick}
          className='w-full flex items-center justify-center text-white  cursor-pointer rounded-full py-4 px-6 mx-auto text-lg font-medium'
          style={{
            background: '#232323',
            backdropFilter: 'blur(13px)',
            WebkitBackdropFilter: 'blur(13px)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <GoogleIcon />
          {text}
        </button>
      </div>
    </div>
  );
};

export default NeoButton;
