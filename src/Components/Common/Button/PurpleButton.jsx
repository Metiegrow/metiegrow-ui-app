import React from 'react';

const PurpleButton = ({
  text = 'Add Address',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <div
      className={`
        relative 
        w-full 
        max-w-md 
        flex 
        justify-center 
        md:justify-end
      `}
    >
      {/* Wrapper for button and its glow */}
      <div className='relative w-full md:w-[125px]'>
        {/* Bottom glow effect only on md+ */}
        <div
          className='absolute w-full h-16 -bottom-6 rounded-full'
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(168, 46, 255, 0.7) 0%, rgba(168, 46, 255, 0.2) 50%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(13px)',
          }}
        />

        {/* Main button */}
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`
            w-full 
            h-[62px] 
            rounded-full 
            text-white 
            text-xl 
            font-medium 
            relative 
            z-10 
            cursor-pointer 
            transition-opacity
            disabled:opacity-50
            bg-[#A82EFF] 
            md:bg-[#BC5FFF]
            ${className}
          `}
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default PurpleButton;
