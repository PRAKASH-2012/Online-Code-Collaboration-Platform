import React from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { Modal } from '../common/Modal';

export const DiffViewerModal = ({ isOpen, onClose, originalCode, modifiedCode, filename }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Version Diff Comparison - ${filename || 'File'}`} maxWidth="max-w-5xl">
      <div className="h-[60vh] bg-[#050505] rounded-lg overflow-hidden border border-[#262626]">
        <DiffEditor
          height="100%"
          original={originalCode || '// Original version\n'}
          modified={modifiedCode || '// Current modified version\n'}
          language="javascript"
          theme="vs-dark"
          options={{
            renderSideBySide: true,
            minimap: { enabled: false }
          }}
        />
      </div>
    </Modal>
  );
};
