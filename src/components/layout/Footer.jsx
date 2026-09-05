import React from 'react';
import { Code2, ShieldCheck, Sparkles, Activity } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-[#262626] py-8 px-6 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-bold text-gray-300">CodeSync AI</span>
          <span>© 2026 Intelligent Real-Time Platform.</span>
        </div>

        <div className="flex items-center gap-6 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Activity className="w-3.5 h-3.5" /> Engine: Operational
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" /> Black & Gold Dark IDE
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Isolated Evaluator Active
          </span>
        </div>
      </div>
    </footer>
  );
};
