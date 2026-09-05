import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-[#F5C542]" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-[#0D0D0D] border border-amber-500/40 shadow-gold-glow rounded-xl text-sm font-medium text-white animate-bounce-short">
      {icons[type]}
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
