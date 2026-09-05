import React, { useState } from 'react';
import { Terminal, AlertTriangle, Bug, MessageSquare, Bot, Trash2, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';
import { useAI } from '../../hooks/useAI';

export const TerminalPanel = () => {
  const {
    terminalPanelOpen,
    setTerminalPanelOpen,
    activeTerminalTab,
    setActiveTerminalTab,
    terminalOutput,
    setTerminalOutput,
    files,
    activeTabPath,
    activeProject,
    aiPersona
  } = useIDE();
  const { queryAI, loading: aiLoading } = useAI();
  const [suggestions, setSuggestions] = useState('');
  const activeFile = files.find((file) => file.path === activeTabPath);

  const generateSuggestions = async () => {
    if (!activeFile) {
      setSuggestions('Open a source file first so AI can inspect the active buffer.');
      return;
    }
    const result = await queryAI({
      actionType: 'ask',
      prompt: 'Review this active file and provide 3 concrete improvements, possible bugs, and the next implementation step. Keep the response concise and actionable.',
      code: activeFile.content || '',
      language: activeFile.language || 'javascript',
      persona: aiPersona,
      projectId: activeProject?._id
    });
    setSuggestions(result.response || 'No suggestions returned.');
  };

  if (!terminalPanelOpen) {
    return (
      <div className="h-7 bg-[#0A0A0A] border-t border-[#262626] px-4 flex items-center justify-between text-xs font-mono text-gray-400 select-none">
        <button
          onClick={() => setTerminalPanelOpen(true)}
          className="flex items-center gap-1.5 hover:text-amber-400 font-semibold"
        >
          <Terminal className="w-3.5 h-3.5 text-amber-500" /> Open Terminal & Output Panel
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'output', label: 'Output', icon: Terminal },
    { id: 'problems', label: 'Problems (0)', icon: AlertTriangle },
    { id: 'debug', label: 'Debug Console', icon: Bug },
    { id: 'ai-suggestions', label: 'AI Suggestions', icon: Bot }
  ];

  return (
    <div className="h-48 bg-[#050505] border-t border-[#262626] flex flex-col font-mono text-xs z-10">
      {/* Panel Header Tabs */}
      <div className="h-8 bg-[#0D0D0D] border-b border-[#262626] px-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTerminalTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTerminalTab(t.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                  isActive
                    ? 'bg-[#151515] text-[#F5C542] border border-amber-500/30 font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <button onClick={() => setTerminalOutput([])} title="Clear Output" className="p-1 hover:text-white rounded">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setTerminalPanelOpen(false)} title="Close Panel" className="p-1 hover:text-white rounded">
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Log Output Area */}
      {activeTerminalTab === 'ai-suggestions' ? (
        <div className="flex-1 p-3 overflow-y-auto bg-[#050505] text-gray-300 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-amber-400 font-bold">AI Suggestions</div>
              <div className="text-gray-500 text-[10px]">Reviewing {activeFile?.name || 'the active file'}</div>
            </div>
            <button type="button" onClick={generateSuggestions} disabled={aiLoading} className="px-2.5 py-1.5 rounded border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 disabled:opacity-50">
              {aiLoading ? 'Analyzing...' : 'Generate Suggestions'}
            </button>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed bg-[#0D0D0D] border border-[#262626] rounded-lg p-3">
            {suggestions || 'Generate suggestions to inspect the active code buffer.'}
          </div>
        </div>
      ) : <div className="flex-1 p-3 overflow-y-auto space-y-1.5 bg-[#050505] text-gray-300">
        {terminalOutput.length === 0 ? (
          <div className="text-gray-600">No output logs. Press Run (Ctrl+Enter) to evaluate code.</div>
        ) : (
          terminalOutput.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed whitespace-pre-wrap ${
                log.type === 'error' || log.type === 'stderr' ? 'text-red-400 bg-red-950/20 p-1.5 rounded border border-red-900/30' :
                log.type === 'success' ? 'text-emerald-400 font-bold' :
                log.type === 'info' ? 'text-amber-400' : 'text-gray-200'
              }`}
            >
              {log.text}
            </div>
          ))
        )}
      </div>}
    </div>
  );
};
