import React from 'react';

const NeonButton = ({
  text = 'Ask a Free Question',
  onClick = () => console.log('Button clicked'),
  className = '',
  containerClassName = '',
}) => {
  return (
    <div className={`w-full max-w-md relative ${containerClassName}`}>
      {/* Bottom gradient blur effect - more prominent in center, fading at sides */}
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

      {/* Button with gradient border with accurate color representation from image */}
      <div
        className='relative w-full rounded-full overflow-hidden p-0.5'
        style={{
          background: 'linear-gradient(90deg, #14C0FE 0%, #A82EFF 50%, #CC9192 100%)',
        }}
      >
        <button
          onClick={onClick}
          className={`w-full text-white rounded-full py-4 mx-auto text-xl font-semibold cursor-pointer ${className}`}
          style={{
            background: '#232323',
            backdropFilter: 'blur(13px)',
            WebkitBackdropFilter: 'blur(13px)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default NeonButton;
