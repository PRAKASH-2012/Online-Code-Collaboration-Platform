import React, { useState } from 'react';
import { Play, Save, Mic, Eye, GitBranch, Flame, History, Layers, X, Sparkles } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';
import { useExecution } from '../../hooks/useExecution';
import { fileService } from '../../services/fileService';
import { Button } from '../common/Button';

export const TopToolbar = ({ onOpenPreview, onOpenReplay, onOpenDiff, onOpenExtensions }) => {
  const {
    openTabs,
    activeTabPath,
    setActiveTabPath,
    closeTab,
    files,
    activeProject,
    markFileSaved,
    addTerminalLog,
    setTerminalPanelOpen,
    setActiveTerminalTab,
    setActiveActivityTab,
    audioHuddleActive,
    setAudioHuddleActive,
    heatmapEnabled,
    setHeatmapEnabled
  } = useIDE();

  const { execute, isRunning } = useExecution();

  const activeFile = files.find(f => f.path === activeTabPath);

  const handleSave = async () => {
    if (!activeFile?.isUnsaved) {
      addTerminalLog({ type: 'info', text: 'No unsaved changes.' });
      return;
    }

    if (!activeFile._id || !activeProject?._id) {
      addTerminalLog({ type: 'info', text: 'Scratchpad changes are local. Open a project to save files.' });
      return;
    }

    try {
      const savedFile = await fileService.updateFile(activeFile._id, {
        content: activeFile.content,
        commitMessage: `Updated ${activeFile.name}`
      });
      markFileSaved(activeFile.path, savedFile);
      addTerminalLog({ type: 'success', text: `Saved ${activeFile.path}` });
    } catch (error) {
      addTerminalLog({ type: 'stderr', text: `Save failed: ${error.message}` });
    }
  };

  const handleRunCode = async () => {
    if (!activeFile) return;
    setTerminalPanelOpen(true);
    setActiveTerminalTab('output');
    addTerminalLog({ type: 'info', text: `Executing ${activeFile.name}...` });

    const res = await execute({
      language: activeFile.language || 'javascript',
      code: activeFile.content || '',
      stdin: '',
      projectId: activeProject?._id
    });

    if (res.result) {
      if (res.result.stdout) addTerminalLog({ type: 'stdout', text: res.result.stdout });
      if (res.result.stderr) addTerminalLog({ type: 'stderr', text: res.result.stderr });
      addTerminalLog({
        type: 'success',
        text: `[Process Exited with Code ${res.result.exitCode}] Execution Time: ${res.result.runtimeMs}ms | Memory: ${res.result.memoryKb}KB`
      });
    }
  };

  return (
    <div className="h-10 bg-[#0A0A0A] border-b border-[#262626] flex items-center justify-between px-3 select-none z-10">
      {/* File Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-2xl no-scrollbar">
        {openTabs.map((tab) => {
          const isActive = tab.path === activeTabPath;
          return (
            <div
              key={tab.path}
              onClick={() => setActiveTabPath(tab.path)}
              className={`group flex items-center gap-2 px-3 py-1 rounded-t-lg text-xs font-mono cursor-pointer border-t-2 transition-all ${
                isActive
                  ? 'bg-[#050505] text-[#F5C542] border-[#D4AF37] font-semibold'
                  : 'bg-[#121212] text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <span>{tab.name}</span>
              {tab.isUnsaved && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />}
              <button
                onClick={(e) => { e.stopPropagation(); closeTab(tab.path); }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-white rounded"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveActivityTab('ai');
            setTerminalPanelOpen(true);
            setActiveTerminalTab('ai-suggestions');
          }}
          title="Open AI Suggestions"
          className="px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 text-amber-300 border border-amber-500/30 hover:bg-amber-500/10"
        >
          <Sparkles className="w-3.5 h-3.5" /> AI Suggestions
        </button>

        <button
          onClick={handleSave}
          title="Save file (Ctrl+S)"
          className={`p-1.5 rounded-lg transition-colors ${activeFile?.isUnsaved ? 'text-amber-400 hover:bg-amber-500/10' : 'text-gray-500 hover:text-gray-200 hover:bg-[#1A1A1A]'}`}
        >
          <Save className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setHeatmapEnabled(!heatmapEnabled)}
          title="Toggle Code Heatmap"
          className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all ${
            heatmapEnabled ? 'bg-amber-500/20 text-[#F5C542] border border-amber-500/40' : 'text-gray-400 hover:bg-[#1A1A1A]'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenReplay}
          title="Time-Travel Replay"
          className="p-1.5 text-gray-400 hover:text-amber-400 hover:bg-[#1A1A1A] rounded-lg transition-colors"
        >
          <History className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenDiff}
          title="Compare current file versions"
          className="p-1.5 text-gray-400 hover:text-amber-400 hover:bg-[#1A1A1A] rounded-lg transition-colors"
        >
          <GitBranch className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenExtensions}
          title="Extensions Marketplace"
          className="p-1.5 text-gray-400 hover:text-amber-400 hover:bg-[#1A1A1A] rounded-lg transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setAudioHuddleActive(!audioHuddleActive)}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
            audioHuddleActive
              ? 'bg-amber-500 text-black font-bold shadow-gold-glow animate-gold-pulse'
              : 'bg-[#151515] text-gray-300 hover:border-amber-500/40 border border-[#262626]'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          {audioHuddleActive ? 'Huddle Live' : 'Voice Huddle'}
        </button>

        <button
          onClick={onOpenPreview}
          className="px-2.5 py-1 bg-[#151515] hover:bg-[#262626] text-gray-300 border border-[#262626] rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" /> Preview
        </button>

        <Button
          variant="primary"
          size="sm"
          icon={Play}
          title="Run code"
          onClick={handleRunCode}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run (Ctrl+Enter)'}
        </Button>
      </div>
    </div>
  );
};
