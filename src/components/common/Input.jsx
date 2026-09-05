import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={`w-full bg-[#0D0D0D] border border-[#262626] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg py-2 ${Icon ? 'pl-9' : 'pl-3'} pr-3 text-sm text-white placeholder-gray-600 transition-all ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};
