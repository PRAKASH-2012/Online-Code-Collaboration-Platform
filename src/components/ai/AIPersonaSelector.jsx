import React from 'react';
import { useIDE } from '../../hooks/useIDE';

export const AIPersonaSelector = () => {
  const { aiPersona, setAiPersona } = useIDE();

  const personas = ['Architect', 'Refactor Master', 'Bug Hunter', 'Security Auditor', 'Speed Coder'];

  return (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
      {personas.map((p) => (
        <button
          key={p}
          onClick={() => setAiPersona(p)}
          className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-all ${
            aiPersona === p
              ? 'bg-[#D4AF37] text-black font-bold shadow-gold-glow'
              : 'bg-[#151515] text-gray-400 hover:text-white border border-[#262626]'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};
