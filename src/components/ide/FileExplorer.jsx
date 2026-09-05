import React, { useState } from 'react';
import { FileCode, Folder, FilePlus, FolderPlus, Trash2, ChevronRight, ChevronDown, Edit3 } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';

export const FileExplorer = () => {
  const { files, setFiles, openFile, activeTabPath } = useIDE();
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const handleCreateFile = (e) => {
    e.preventDefault();
    if (!newFileName) return;
    const filename = newFileName.split('/').pop();
    const path = newFileName.startsWith('/') ? newFileName : `/${newFileName}`;
    const newFile = {
      _id: `file-${Date.now()}`,
      name: filename,
      path,
      type: 'file',
      content: '// New collaborative file\n',
      language: getLanguageFromExtension(filename)
    };
    setFiles((current) => [...current.filter((file) => file.path !== path), newFile]);
    openFile(newFile);
    setNewFileName('');
    setIsCreatingFile(false);
  };

  const handleCreateFolder = (event) => {
    event.preventDefault();
    const folderName = newFolderName.trim().replace(/^\/+|\/+$/g, '');
    if (!folderName) return;
    const path = `/${folderName}`;
    const folder = { _id: `folder-${Date.now()}`, name: folderName, path, type: 'folder', content: '' };
    setFiles((current) => [...current.filter((file) => file.path !== path), folder]);
    setNewFolderName('');
    setIsCreatingFolder(false);
  };

  const getLanguageFromExtension = (filename) => {
    if (filename.endsWith('.py')) return 'python';
    if (filename.endsWith('.jsx') || filename.endsWith('.js')) return 'javascript';
    if (filename.endsWith('.html')) return 'html';
    if (filename.endsWith('.css')) return 'css';
    if (filename.endsWith('.cpp') || filename.endsWith('.c')) return 'cpp';
    if (filename.endsWith('.java')) return 'java';
    return 'javascript';
  };

  return (
    <div className="w-60 bg-[#0D0D0D] border-r border-[#262626] flex flex-col h-full select-none">
      <div className="p-3 border-b border-[#262626] flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">Explorer</span>
        <div className="flex items-center gap-1 text-gray-400">
          <button
            onClick={() => setIsCreatingFile(true)}
            title="New File"
            className="p-1 hover:text-amber-400 hover:bg-[#1A1A1A] rounded"
          >
            <FilePlus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsCreatingFolder(true)}
            title="New Folder"
            className="p-1 hover:text-amber-400 hover:bg-[#1A1A1A] rounded"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isCreatingFile && (
        <form onSubmit={handleCreateFile} className="p-2 border-b border-[#262626]">
          <input
            type="text"
            placeholder="filename.js..."
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="w-full bg-[#050505] border border-amber-500/40 text-xs px-2 py-1 rounded text-white focus:outline-none"
            autoFocus
          />
        </form>
      )}

      {isCreatingFolder && (
        <form onSubmit={handleCreateFolder} className="p-2 border-b border-[#262626]">
          <input
            type="text"
            placeholder="folder-name"
            value={newFolderName}
            onChange={(event) => setNewFolderName(event.target.value)}
            className="w-full bg-[#050505] border border-amber-500/40 text-xs px-2 py-1 rounded text-white focus:outline-none"
            autoFocus
          />
        </form>
      )}

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {files.map((file) => {
          const isActive = activeTabPath === file.path;
          return (
            <div
              key={file.path || file._id}
              onClick={() => file.type !== 'folder' && openFile(file)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                isActive
                  ? 'bg-amber-500/10 text-[#F5C542] border border-amber-500/30 font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#151515]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {file.type === 'folder' ? <Folder className="w-3.5 h-3.5 text-amber-500" /> : <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-gray-500'}`} />}
                <span className="truncate">{file.name}</span>
              </div>
              {file.isUnsaved && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
