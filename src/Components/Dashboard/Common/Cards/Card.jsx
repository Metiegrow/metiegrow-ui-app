import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'p-6',
  background = 'bg-[#232323]',
  borderRadius = 'rounded-3xl',
  ...props
}) => {
  return (
    <div className={`${background} ${borderRadius} ${padding} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
