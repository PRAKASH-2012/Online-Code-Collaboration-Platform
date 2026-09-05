import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  const variantStyles = {
    primary: "bg-[#D4AF37] hover:bg-[#F5C542] text-black font-semibold shadow-gold-glow hover:shadow-gold-glow-lg border border-[#F5C542]",
    secondary: "bg-[#151515] hover:bg-[#262626] text-white border border-[#333333] hover:border-amber-500/40",
    outline: "bg-transparent hover:bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/50 hover:border-[#F5C542]",
    danger: "bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/50",
    ghost: "bg-transparent hover:bg-[#1A1A1A] text-gray-300 hover:text-white"
  };

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
};
