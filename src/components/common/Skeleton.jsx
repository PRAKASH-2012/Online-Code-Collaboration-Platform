import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-[#1A1A1A] rounded-lg ${className}`} />
  );
};
