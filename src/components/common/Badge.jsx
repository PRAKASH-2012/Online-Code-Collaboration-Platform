import React from 'react';

export const Badge = ({
  children,
  variant = 'gold', // 'gold' | 'green' | 'red' | 'gray' | 'blue'
  className = ''
}) => {
  const variantStyles = {
    gold: 'bg-amber-500/10 text-[#F5C542] border-amber-500/30',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    red: 'bg-red-500/10 text-red-400 border-red-500/30',
    gray: 'bg-gray-800 text-gray-300 border-gray-700',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
