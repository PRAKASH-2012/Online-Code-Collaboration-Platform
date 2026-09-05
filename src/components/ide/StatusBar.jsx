import React, { useContext } from 'react';
import { GitBranch, Users, Bell, ShieldCheck, Wifi } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';
import { SocketContext } from '../../context/SocketContext';

export const StatusBar = () => {
  const { files, activeTabPath } = useIDE();
  const { presenceList } = useContext(SocketContext);

  const activeFile = files.find(f => f.path === activeTabPath);

  return (
    <div className="h-6 bg-[#050505] border-t border-[#262626] px-3 flex items-center justify-between text-[11px] font-mono text-gray-400 select-none z-10">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-amber-400 font-semibold">
          <GitBranch className="w-3 h-3" /> main
        </span>
        <span className="flex items-center gap-1 text-emerald-400">
          <Wifi className="w-3 h-3" /> Socket Live
        </span>
        {activeFile && (
          <span className="text-gray-300">
            {activeFile.language ? activeFile.language.toUpperCase() : 'JAVASCRIPT'}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-gray-300">
          <Users className="w-3 h-3 text-amber-400" />
          {presenceList.length || 3} Online Collaborators
        </span>
        <span>UTF-8</span>
        <span>Spaces: 2</span>
        <span className="text-amber-500 font-bold">CodeSync AI v1.0</span>
      </div>
    </div>
  );
};
