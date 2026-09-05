import React, { useState } from 'react';
import { Bot, Sparkles, Shield, Cpu, FileCheck, Send, RefreshCw, Zap } from 'lucide-react';
import { useAI } from '../../hooks/useAI';
import { useIDE } from '../../hooks/useIDE';
import { AIPersonaSelector } from './AIPersonaSelector';

export const AISidebar = ({ onOpenSecurityScan, onOpenReviewScore }) => {
  const { queryAI, loading } = useAI();
  const { aiPersona, files, activeTabPath, activeProject } = useIDE();
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Hello! I am your CodeSync AI Developer Assistant. Select a quick prompt or ask me anything about your active code buffer.' }
  ]);

  const activeFile = files.find(f => f.path === activeTabPath);

  const handleAskAI = async (actionType = 'ask', customPrompt = null) => {
    const userMsg = customPrompt || prompt;
    if (!userMsg && actionType === 'ask') return;

    if (userMsg) {
      setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
      setPrompt('');
    }

    const result = await queryAI({
      actionType,
      prompt: userMsg || actionType,
      code: activeFile ? activeFile.content : '',
      language: activeFile ? activeFile.language : 'javascript',
      persona: aiPersona,
      projectId: activeProject?._id
    });

    setChatHistory(prev => [...prev, { role: 'ai', text: result.response }]);
  };

  return (
    <div className="w-80 bg-[#0D0D0D] border-l border-[#262626] flex flex-col h-full select-none">
      {/* Header */}
      <div className="p-3 border-b border-[#262626] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Copilot</h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <Zap className="w-3 h-3" /> Gemini 1.5
          </span>
        </div>

        <AIPersonaSelector />
      </div>

      {/* Quick AI Action Triggers */}
      <div className="p-3 border-b border-[#262626] grid grid-cols-2 gap-2 text-xs">
        <button
          onClick={() => handleAskAI('explain')}
          className="p-2 bg-[#151515] hover:bg-[#262626] text-gray-300 hover:text-white rounded-lg border border-[#262626] flex items-center gap-1.5 font-mono text-[11px] transition-colors"
        >
          <Sparkles className="w-3 h-3 text-amber-400" /> Explain Code
        </button>

        <button
          onClick={() => handleAskAI('refactor')}
          className="p-2 bg-[#151515] hover:bg-[#262626] text-gray-300 hover:text-white rounded-lg border border-[#262626] flex items-center gap-1.5 font-mono text-[11px] transition-colors"
        >
          <Cpu className="w-3 h-3 text-amber-400" /> Refactor Code
        </button>

        <button
          onClick={onOpenSecurityScan}
          className="p-2 bg-[#151515] hover:bg-[#262626] text-gray-300 hover:text-white rounded-lg border border-[#262626] flex items-center gap-1.5 font-mono text-[11px] transition-colors"
        >
          <Shield className="w-3 h-3 text-amber-400" /> Security Audit
        </button>

        <button
          onClick={onOpenReviewScore}
          className="p-2 bg-[#151515] hover:bg-[#262626] text-gray-300 hover:text-white rounded-lg border border-[#262626] flex items-center gap-1.5 font-mono text-[11px] transition-colors"
        >
          <FileCheck className="w-3 h-3 text-amber-400" /> Quality Score
        </button>
        <button
          onClick={onOpenProjectGenerator}
          className="col-span-2 p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30 flex items-center justify-center gap-1.5 font-mono text-[11px] transition-colors"
        >
          <Bot className="w-3 h-3" /> Generate Project From Prompt
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 font-mono text-xs">
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl ${
              msg.role === 'user'
                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 ml-4'
                : 'bg-[#151515] border border-[#262626] text-gray-200 mr-2'
            }`}
          >
            <div className="text-[10px] font-bold text-gray-500 mb-1">
              {msg.role === 'user' ? 'You' : `AI Assistant (${aiPersona} Mode)`}
            </div>
            <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="p-3 bg-[#151515] border border-[#262626] rounded-xl text-amber-400 flex items-center gap-2 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> AI analyzing code...
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-[#262626]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI assistant..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAskAI(); }}
            className="flex-1 bg-[#050505] border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          />
          <button
            onClick={() => handleAskAI()}
            disabled={loading}
            className="p-2 bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold rounded-lg transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
