import React, { useState, useEffect } from 'react';
import { Search, Code, Play, Bot, UserPlus, Settings, FileCode, Layers } from 'lucide-react';
import { Modal } from './Modal';

export const CommandPalette = ({ isOpen, onClose, onAction }) => {
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'create-file', label: 'Create New File', category: 'IDE', icon: FileCode, action: () => onAction('create-file') },
    { id: 'run-code', label: 'Run Active Program (Ctrl+Enter)', category: 'Execution', icon: Play, action: () => onAction('run-code') },
    { id: 'ask-ai', label: 'Ask AI Assistant', category: 'AI', icon: Bot, action: () => onAction('ask-ai') },
    { id: 'invite-member', label: 'Invite Teammate to Workspace', category: 'Team', icon: UserPlus, action: () => onAction('invite-member') },
    { id: 'view-tasks', label: 'Open Kanban Task Board', category: 'Tasks', icon: Layers, action: () => onAction('view-tasks') },
    { id: 'settings', label: 'Open Project Settings', category: 'System', icon: Settings, action: () => onAction('settings') }
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Command Palette" maxWidth="max-w-xl">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
          <input
            type="text"
            placeholder="Type a command or search action (e.g. Run, AI, File)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#121212] border border-amber-500/30 pl-10 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            autoFocus
          />
        </div>

        <div className="divide-y divide-[#262626] max-h-64 overflow-y-auto">
          {filtered.map(cmd => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.id}
                onClick={() => { cmd.action(); onClose(); }}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-[#1A1A1A] transition-colors rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-amber-400 group-hover:text-[#F5C542]" />
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white">{cmd.label}</span>
                </div>
                <span className="text-xs font-mono text-gray-500 bg-[#050505] px-2 py-0.5 rounded border border-[#262626]">{cmd.category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
