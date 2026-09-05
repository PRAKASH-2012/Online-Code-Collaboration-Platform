import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts = {}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      
      if (isCtrlOrCmd && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (shortcuts.onSave) shortcuts.onSave();
      }

      if (isCtrlOrCmd && (e.key.toLowerCase() === 'k' || (e.shiftKey && e.key.toLowerCase() === 'p'))) {
        e.preventDefault();
        if (shortcuts.onCommandPalette) shortcuts.onCommandPalette();
      }

      if (isCtrlOrCmd && e.key === 'Enter') {
        e.preventDefault();
        if (shortcuts.onRunCode) shortcuts.onRunCode();
      }

      if (isCtrlOrCmd && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        if (shortcuts.onToggleSidebar) shortcuts.onToggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
