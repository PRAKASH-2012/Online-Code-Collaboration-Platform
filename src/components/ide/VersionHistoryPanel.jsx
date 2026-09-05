import React from 'react';
import { History, GitCommit, RotateCcw } from 'lucide-react';

export const VersionHistoryPanel = ({ versions = [], onRestore }) => {
  const mockVersions = versions.length ? versions : [
    { _id: 'v1', commitMessage: 'Updated App.jsx Black & Gold styling', author: 'Prakash Demo', time: '10 mins ago' },
    { _id: 'v2', commitMessage: 'Added Yjs Socket sync logic', author: 'Arun Demo', time: '1 hour ago' },
    { _id: 'v3', commitMessage: 'Initial project snapshot created', author: 'Prakash Demo', time: '3 hours ago' }
  ];

  return (
    <div className="w-64 bg-[#0D0D0D] border-l border-[#262626] p-4 flex flex-col h-full select-none">
      <div className="flex items-center gap-2 pb-3 border-b border-[#262626] mb-3">
        <History className="w-4 h-4 text-[#D4AF37]" />
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Version Snapshots</h3>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1">
        {mockVersions.map((v, i) => (
          <div key={i} className="p-3 bg-[#151515] border border-[#262626] rounded-xl space-y-2 hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <GitCommit className="w-3.5 h-3.5" />
              <span>{v.commitMessage}</span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500">
              <span>{v.author}</span>
              <span>{v.time}</span>
            </div>

            <button
              onClick={() => onRestore && onRestore(v)}
              className="w-full py-1 bg-[#050505] hover:bg-[#1A1A1A] border border-[#262626] text-gray-300 hover:text-white rounded text-xs font-mono flex items-center justify-center gap-1 transition-all"
            >
              <RotateCcw className="w-3 h-3" /> Restore Snapshot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
