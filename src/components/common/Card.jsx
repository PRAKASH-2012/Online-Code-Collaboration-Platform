import React from 'react';

export const Card = ({
  children,
  className = '',
  goldGlow = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#0D0D0D] border border-[#262626] rounded-xl p-5 transition-all duration-200 ${
        goldGlow ? 'border-amber-500/40 shadow-gold-glow' : 'hover:border-[#D4AF37]/50 hover:bg-[#121212]'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
