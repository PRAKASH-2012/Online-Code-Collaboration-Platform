import React, { useMemo, useState } from 'react';
import { FileCode, Search } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';

export const WorkspaceSearchPanel = () => {
  const { files, openFile, setActiveActivityTab } = useIDE();
  const [query, setQuery] = useState('');
  const matches = useMemo(() => {
    const normalized = query.toLowerCase();
    return files.filter((file) => `${file.name} ${file.path} ${file.content || ''}`.toLowerCase().includes(normalized));
  }, [files, query]);

  return (
    <aside className="w-72 bg-[#0D0D0D] border-r border-[#262626] flex flex-col h-full">
      <div className="p-3 border-b border-[#262626]">
        <div className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono mb-2">Workspace Search</div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder="Search files and code" className="w-full bg-[#050505] border border-[#262626] rounded-lg py-2 pl-8 pr-2 text-xs text-white outline-none focus:border-amber-500" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {matches.map((file) => (
          <button key={file.path} type="button" onClick={() => { openFile(file); setActiveActivityTab('explorer'); }} className="w-full text-left p-2 rounded-lg hover:bg-[#151515] text-xs text-gray-300">
            <div className="flex items-center gap-2"><FileCode className="w-3.5 h-3.5 text-amber-400" />{file.name}</div>
            <div className="text-[10px] text-gray-600 pl-5 mt-1 truncate">{file.path}</div>
          </button>
        ))}
        {!matches.length && <div className="p-3 text-xs text-gray-600">No matching files.</div>}
      </div>
    </aside>
  );
};
