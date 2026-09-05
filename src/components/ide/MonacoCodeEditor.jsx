import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useIDE } from '../../hooks/useIDE';

export const MonacoCodeEditor = ({ file }) => {
  const { updateFileContent, heatmapEnabled, heatmapData } = useIDE();
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define Custom Black & Gold Monaco Theme
    monaco.editor.defineTheme('black-gold-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '7A7A7A', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'D4AF37', fontStyle: 'bold' },
        { token: 'string', foreground: 'F5C542' },
        { token: 'number', foreground: 'E5A93C' },
        { token: 'type', foreground: 'E2C275' },
        { token: 'function', foreground: 'FFFFFF' }
      ],
      colors: {
        'editor.background': '#050505',
        'editor.foreground': '#F3F4F6',
        'editorCursor.foreground': '#F5C542',
        'editor.lineHighlightBackground': '#121212',
        'editorLineNumber.foreground': '#333333',
        'editorLineNumber.activeForeground': '#D4AF37',
        'editorIndentGuide.background': '#1A1A1A',
        'editorIndentGuide.activeBackground': '#333333'
      }
    });

    monaco.editor.setTheme('black-gold-theme');
  };

  const getLanguage = (filepath) => {
    if (!filepath) return 'javascript';
    if (filepath.endsWith('.py')) return 'python';
    if (filepath.endsWith('.jsx') || filepath.endsWith('.js')) return 'javascript';
    if (filepath.endsWith('.html')) return 'html';
    if (filepath.endsWith('.css')) return 'css';
    if (filepath.endsWith('.cpp')) return 'cpp';
    if (filepath.endsWith('.java')) return 'java';
    if (filepath.endsWith('.json')) return 'json';
    if (filepath.endsWith('.md')) return 'markdown';
    return 'javascript';
  };

  if (!file) {
    return (
      <div className="flex-1 bg-[#050505] flex flex-col items-center justify-center text-gray-600 font-mono text-sm">
        <div className="w-12 h-12 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-500/40 mb-3">
          ⚡
        </div>
        No file selected. Select a file from the explorer or press Ctrl+K.
      </div>
    );
  }

  return (
    <div className="flex-1 h-full bg-[#050505] relative">
      {heatmapEnabled && (
        <div className="absolute top-2 right-4 z-10 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded text-[10px] font-mono text-amber-400">
          🔥 Code Heatmap Active
        </div>
      )}
      <Editor
        height="100%"
        language={getLanguage(file.path)}
        value={file.content || ''}
        onChange={(val) => updateFileContent(file.path, val || '')}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Menlo, monospace',
          minimap: { enabled: true },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 12, bottom: 12 }
        }}
      />
    </div>
  );
};
