import React from 'react';
import { Spin, Button } from 'antd';

const LoginButton = ({
  text = 'Add Address',
  onClick,
  type = 'button',
  disabled = false,

  loading = false,
}) => {
  return (
    <div className='relative w-full max-w-md'>
      {/* Bottom glow effect */}
      <div
        className='absolute w-full h-16 rounded-full pointer-events-none -bottom-6'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(168, 46, 255, 0.7) 0%, rgba(168, 46, 255, 0.2) 50%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(15px)',
        }}
      />

      <Button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          w-full py-6 rounded-full text-white text-xl font-medium relative z-10
          transition duration-200 ease-in-out
          ${disabled ? 'bg-purple-300 cursor-not-allowed' : 'cursor-pointer'}
        `}
        style={{
          background: disabled ? '#c084fc' : '#A82EFF',
          opacity: loading ? 0.8 : 1,
        }}
      >
        {loading ? <Spin size='small' className='text-white' /> : text}
      </Button>
    </div>
  );
};

export default LoginButton;
