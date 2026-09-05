import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { ActivityBar } from '../components/ide/ActivityBar';
import { FileExplorer } from '../components/ide/FileExplorer';
import { MonacoCodeEditor } from '../components/ide/MonacoCodeEditor';
import { TopToolbar } from '../components/ide/TopToolbar';
import { StatusBar } from '../components/ide/StatusBar';
import { TerminalPanel } from '../components/ide/TerminalPanel';
import { FollowBanner } from '../components/ide/FollowBanner';
import { AudioHuddleBar } from '../components/chat/AudioHuddleBar';
import { AISidebar } from '../components/ai/AISidebar';
import { TeamChatPanel } from '../components/chat/TeamChatPanel';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { CollaboratorPanel } from '../components/ide/CollaboratorPanel';
import { VersionHistoryPanel } from '../components/ide/VersionHistoryPanel';
import { LiveWebPreview } from '../components/ide/LiveWebPreview';
import { TimeTravelReplayModal } from '../components/ide/TimeTravelReplayModal';
import { DiffViewerModal } from '../components/ide/DiffViewerModal';
import { ExtensionsMarketplace } from '../components/ide/ExtensionsMarketplace';
import { AISecurityScannerModal } from '../components/ai/AISecurityScannerModal';
import { AICodeReviewModal } from '../components/ai/AICodeReviewModal';
import { useIDE } from '../hooks/useIDE';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { projectService } from '../services/projectService';
import { fileService } from '../services/fileService';
import { AIProjectGeneratorModal } from '../components/ai/AIProjectGeneratorModal';
import { useAI } from '../hooks/useAI';

export const IDEWorkspacePage = () => {
  const navigate = useNavigate();
  const { queryAI } = useAI();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const {
    activeProject,
    setActiveProject,
    files,
    setFiles,
    openTabs,
    setOpenTabs,
    activeTabPath,
    setActiveTabPath,
    activeActivityTab,
    setActiveActivityTab,
    setTerminalPanelOpen,
    setActiveTerminalTab,
    openFile
  } = useIDE();

  useEffect(() => {
    if (!projectId) return undefined;
    let cancelled = false;

    const loadProjectWorkspace = async () => {
      try {
        const [project, projectFiles] = await Promise.all([
          projectService.getProjectById(projectId),
          fileService.getFiles(projectId)
        ]);
        if (cancelled) return;
        setActiveProject(project.project || project);
        if (!projectFiles?.length) return;
        setFiles(projectFiles);
        setOpenTabs([projectFiles[0]]);
        setActiveTabPath(projectFiles[0].path);
      } catch (error) {
        console.warn('Unable to load project workspace:', error.message);
      }
    };

    loadProjectWorkspace();
    return () => { cancelled = true; };
  }, [projectId, setActiveProject, setFiles, setOpenTabs, setActiveTabPath]);

  const [showWebPreview, setShowWebPreview] = useState(false);
  const [showTimeTravelReplay, setShowTimeTravelReplay] = useState(false);
  const [showDiffViewer, setShowDiffViewer] = useState(false);
  const [showExtensions, setShowExtensions] = useState(false);
  const [showSecurityScan, setShowSecurityScan] = useState(false);
  const [showReviewScore, setShowReviewScore] = useState(false);
  const [showProjectGenerator, setShowProjectGenerator] = useState(false);

  useEffect(() => {
    if (activeActivityTab === 'extensions') setShowExtensions(true);
    if (activeActivityTab === 'review') setShowReviewScore(true);
    if (activeActivityTab === 'settings') navigate('/settings');
  }, [activeActivityTab, navigate]);

  // Initialize starter files if empty
  useEffect(() => {
    if (files.length === 0) {
      const defaultFiles = [
        {
          _id: '1',
          name: 'App.jsx',
          path: '/src/App.jsx',
          type: 'file',
          content: `import React, { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">\n      <h1 className="text-3xl font-extrabold text-[#D4AF37]">CodeSync AI Collaborative Workspace</h1>\n      <p className="text-gray-400 mt-2">Real-time Yjs CRDT synchronization active with Monaco Editor.</p>\n      <button\n        onClick={() => setCount(c => c + 1)}\n        className="mt-4 px-4 py-2 bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold rounded-lg transition-colors"\n      >\n        Counter: {count}\n      </button>\n    </div>\n  );\n}\n`,
          language: 'javascript'
        },
        {
          _id: '2',
          name: 'main.py',
          path: '/main.py',
          type: 'file',
          content: `# Python Algorithm Lab\ndef calculate_primes(limit):\n    primes = []\n    for num in range(2, limit):\n        if all(num % i != 0 for i in range(2, int(num**0.5) + 1)):\n            primes.append(num)\n    return primes\n\nif __name__ == "__main__":\n    res = calculate_primes(50)\n    print(f"Calculated {len(res)} primes: {res}")\n`,
          language: 'python'
        },
        {
          _id: '3',
          name: 'README.md',
          path: '/README.md',
          type: 'file',
          content: '# CodeSync AI Project\nBuilt with React, Monaco, Socket.IO & Gemini AI.',
          language: 'markdown'
        }
      ];
      setFiles(defaultFiles);
      setOpenTabs(defaultFiles);
      setActiveTabPath(defaultFiles[0].path);
    }
  }, [files, setFiles, setOpenTabs, setActiveTabPath]);

  const activeFile = files.find(f => f.path === activeTabPath);

  const generateProject = async (prompt) => {
    const result = await queryAI({
      actionType: 'generate_project',
      prompt,
      code: '',
      language: 'javascript',
      persona: 'Architect',
      projectId: activeProject?._id
    });

    try {
      const generated = JSON.parse(result.response);
      const generatedFiles = (generated.files || []).map((file, index) => ({
        _id: `generated-${Date.now()}-${index}`,
        name: file.path.split('/').pop(),
        path: file.path.startsWith('/') ? file.path : `/${file.path}`,
        type: 'file',
        content: file.content || '',
        language: file.language || 'javascript',
        isUnsaved: true
      }));
      if (generatedFiles.length) {
        setFiles(generatedFiles);
        setOpenTabs(generatedFiles);
        setActiveTabPath(generatedFiles[0].path);
        setActiveActivityTab('explorer');
      }
    } catch (error) {
      console.warn('AI project response was not a scaffold:', error.message);
    }
  };

  // Keyboard Shortcuts Hook
  useKeyboardShortcuts({
    onSave: () => document.querySelector('[title="Save file (Ctrl+S)"]')?.click(),
    onRunCode: () => document.querySelector('button[title="Run code"]')?.click(),
    onToggleSidebar: () => {}
  });

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden select-none">
      <Navbar />
      <AudioHuddleBar />
      <FollowBanner />

      {/* Main IDE Body */}
      <div className="flex-1 flex overflow-hidden relative">
        <ActivityBar />

        {/* Dynamic Activity Panel */}
        {activeActivityTab === 'explorer' && <FileExplorer />}
        {activeActivityTab === 'search' && <WorkspaceSearchPanel />}
        {activeActivityTab === 'run' && (
          <aside className="w-72 bg-[#0D0D0D] border-r border-[#262626] p-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">Run & Debug</div>
            <p className="text-xs text-gray-400">Run the active file and inspect stdout, stderr, runtime, and memory in the output panel.</p>
            <button type="button" title="Run code" onClick={() => document.querySelector('button[title="Run code"]')?.click()} className="w-full bg-[#D4AF37] text-black rounded-lg px-3 py-2 text-xs font-bold">Run Active File</button>
            <button type="button" onClick={() => { setTerminalPanelOpen(true); setActiveTerminalTab('output'); }} className="w-full bg-[#151515] border border-[#333] text-gray-300 rounded-lg px-3 py-2 text-xs">Open Output</button>
          </aside>
        )}
        {activeActivityTab === 'chat' && <TeamChatPanel />}
        {activeActivityTab === 'tasks' && <KanbanBoard projectId={projectId} />}
        {activeActivityTab === 'ai' && (
          <AISidebar
            onOpenSecurityScan={() => setShowSecurityScan(true)}
            onOpenReviewScore={() => setShowReviewScore(true)}
            onOpenProjectGenerator={() => setShowProjectGenerator(true)}
          />
        )}
        {activeActivityTab === 'git' && <CollaboratorPanel />}
        {activeActivityTab === 'history' && <VersionHistoryPanel />}

        {/* Central Code Workspace */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#050505]">
          <TopToolbar
            onOpenPreview={() => setShowWebPreview(true)}
            onOpenReplay={() => setShowTimeTravelReplay(true)}
            onOpenDiff={() => setShowDiffViewer(true)}
            onOpenExtensions={() => setShowExtensions(true)}
          />

          <div className="flex-1 flex min-h-0 relative">
            <MonacoCodeEditor file={activeFile} />
          </div>

          <TerminalPanel />
          <StatusBar />
        </div>
      </div>

      {/* Modals & Drawers */}
      <LiveWebPreview isOpen={showWebPreview} onClose={() => setShowWebPreview(false)} />
      <TimeTravelReplayModal isOpen={showTimeTravelReplay} onClose={() => setShowTimeTravelReplay(false)} code={activeFile?.content} />
      <DiffViewerModal isOpen={showDiffViewer} onClose={() => setShowDiffViewer(false)} originalCode={activeFile?.content} filename={activeFile?.name} />
      <ExtensionsMarketplace isOpen={showExtensions} onClose={() => setShowExtensions(false)} />
      <AISecurityScannerModal isOpen={showSecurityScan} onClose={() => setShowSecurityScan(false)} />
      <AICodeReviewModal isOpen={showReviewScore} onClose={() => setShowReviewScore(false)} />
      <AIProjectGeneratorModal isOpen={showProjectGenerator} onClose={() => setShowProjectGenerator(false)} onGenerate={generateProject} />
    </div>
  );
};
