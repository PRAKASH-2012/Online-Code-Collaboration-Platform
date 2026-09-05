import React, { useState } from 'react';
import { Bot, Sparkles, FolderPlus } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const AIProjectGeneratorModal = ({ isOpen, onClose, onGenerate }) => {
  const [promptText, setPromptText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!promptText) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      if (onGenerate) onGenerate(promptText);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🪄 AI Project Generator" maxWidth="max-w-xl">
      <div className="space-y-4">
        <p className="text-xs text-gray-400">
          Describe the application you want to build in plain English (e.g. "Create a student task manager with React and Tailwind CSS"). AI will generate folder tree structure, initial code, and tasks.
        </p>

        <textarea
          rows={4}
          placeholder="Enter prompt..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="w-full bg-[#121212] border border-amber-500/30 rounded-lg p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
        />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" icon={Sparkles} onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating Scaffold...' : 'Generate Project'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
