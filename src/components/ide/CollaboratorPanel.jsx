import React from 'react';
import { Users, Eye, MessageSquare, Shield } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';

export const CollaboratorPanel = ({ collaborators = [] }) => {
  const { setFollowedUser } = useIDE();

  const mockUsers = collaborators.length ? collaborators : [
    { id: '1', username: 'prakash_demo', role: 'Owner', currentFile: 'App.jsx', availability: 'Available' },
    { id: '2', username: 'arun_demo', role: 'Maintainer', currentFile: 'App.jsx', availability: 'Available' },
    { id: '3', username: 'meena_demo', role: 'Editor', currentFile: 'main.py', availability: 'Busy' }
  ];

  return (
    <div className="w-64 bg-[#0D0D0D] border-l border-[#262626] p-4 flex flex-col h-full select-none">
      <div className="flex items-center gap-2 pb-3 border-b border-[#262626] mb-3">
        <Users className="w-4 h-4 text-[#D4AF37]" />
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Collaborators</h3>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1">
        {mockUsers.map((u, i) => (
          <div key={i} className="p-3 bg-[#151515] border border-[#262626] rounded-xl space-y-2 hover:border-amber-500/40 transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span className="text-xs font-bold text-white">{u.username}</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-[#050505] px-1.5 py-0.5 rounded border border-[#262626]">{u.role}</span>
            </div>

            <div className="text-[11px] text-gray-400 font-mono">Editing: <span className="text-gray-200">{u.currentFile || 'App.jsx'}</span></div>

            <button
              onClick={() => setFollowedUser(u)}
              className="w-full text-center py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded text-xs font-mono flex items-center justify-center gap-1 transition-all"
            >
              <Eye className="w-3 h-3" /> Follow Collaborator
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
