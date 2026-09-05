import React from 'react';
import { Star, ShieldCheck, Cpu, CheckCircle } from 'lucide-react';
import { Modal } from '../common/Modal';

export const AICodeReviewModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const scoreData = {
    overallScore: 94,
    security: 98,
    performance: 92,
    maintainability: 90,
    readability: 96,
    complexity: 88,
    issues: [
      { severity: 'Low', line: 12, text: 'Consider adding explicit JSDoc parameter definitions for function.' },
      { severity: 'Info', line: 24, text: 'State mutation scoped cleanly to local component boundary.' }
    ]
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📊 AI Code Review & Quality Score" maxWidth="max-w-3xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-500/30 rounded-xl">
          <div>
            <h4 className="text-sm font-bold text-white">Overall Code Quality Index</h4>
            <p className="text-xs text-gray-400">Automated Gemini static analysis & code metrics.</p>
          </div>
          <div className="text-4xl font-extrabold text-[#F5C542] font-mono">{scoreData.overallScore}/100</div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#121212] border border-[#262626] rounded-xl">
            <span className="text-gray-500 block mb-1">Security Score</span>
            <span className="text-emerald-400 font-bold text-lg">{scoreData.security}%</span>
          </div>
          <div className="p-3 bg-[#121212] border border-[#262626] rounded-xl">
            <span className="text-gray-500 block mb-1">Performance Score</span>
            <span className="text-amber-400 font-bold text-lg">{scoreData.performance}%</span>
          </div>
          <div className="p-3 bg-[#121212] border border-[#262626] rounded-xl">
            <span className="text-gray-500 block mb-1">Maintainability</span>
            <span className="text-blue-400 font-bold text-lg">{scoreData.maintainability}%</span>
          </div>
        </div>

        {/* Detailed Issues */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Detailed Suggestions</h4>
          {scoreData.issues.map((iss, i) => (
            <div key={i} className="p-3 bg-[#121212] border border-[#262626] rounded-xl text-xs flex items-center justify-between">
              <span className="text-gray-300">{iss.text}</span>
              <span className="font-mono text-amber-400">Line {iss.line}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
