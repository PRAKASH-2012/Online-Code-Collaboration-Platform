import React from 'react';
import { Files, Search, GitBranch, Play, Bot, Sparkles, MessageSquare, CheckSquare, Layers, ShieldAlert, History, Settings } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';

export const ActivityBar = () => {
  const { activeActivityTab, setActiveActivityTab, setTerminalPanelOpen, setActiveTerminalTab } = useIDE();

  const tabs = [
    { id: 'explorer', label: 'Explorer', icon: Files },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'git', label: 'Source Control', icon: GitBranch },
    { id: 'run', label: 'Run & Debug', icon: Play },
    { id: 'ai', label: 'AI Copilot', icon: Bot },
    { id: 'ai-suggestions', label: 'AI Suggestions', icon: Sparkles },
    { id: 'chat', label: 'Team Chat', icon: MessageSquare },
    { id: 'tasks', label: 'Tasks & Issues', icon: CheckSquare },
    { id: 'extensions', label: 'Extensions', icon: Layers },
    { id: 'review', label: 'Code Review', icon: ShieldAlert },
    { id: 'history', label: 'Version History', icon: History }
  ];

  return (
    <aside className="w-12 bg-[#050505] border-r border-[#262626] flex flex-col items-center justify-between py-3 select-none z-20">
      <div className="flex flex-col items-center gap-1 w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeActivityTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'ai-suggestions') {
                  setActiveActivityTab('ai');
                  setTerminalPanelOpen(true);
                  setActiveTerminalTab('ai-suggestions');
                  return;
                }
                setActiveActivityTab(isActive ? null : tab.id);
              }}
              title={tab.label}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                isActive
                  ? 'bg-amber-500/10 text-[#F5C542] border border-amber-500/40 shadow-gold-glow'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-[#121212]'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setActiveActivityTab('settings')}
        title="Settings"
        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-amber-400 hover:bg-[#121212] rounded-lg transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>
    </aside>
  );
};
