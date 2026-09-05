import React, { useState } from 'react';
import { Layers, Check, Download, Star } from 'lucide-react';
import { Modal } from '../common/Modal';

export const ExtensionsMarketplace = ({ isOpen, onClose }) => {
  const [installed, setInstalled] = useState(['gitlens', 'prettier']);

  const extensions = [
    { id: 'gitlens', name: 'GitLens Companion', description: 'Supercharge Git authorship annotations & history inline.', installs: '2.4M', rating: '4.9' },
    { id: 'prettier', name: 'Prettier Code Formatter', description: 'Enforce clean JavaScript & HTML code formatting automatically.', installs: '5.1M', rating: '4.8' },
    { id: 'eslint', name: 'ESLint Linter', description: 'Real-time error highlighting and code style verification.', installs: '3.8M', rating: '4.7' },
    { id: 'python-helper', name: 'Python IntelliSense', description: 'Rich autocompletion & docstrings for Python 3.', installs: '1.9M', rating: '4.9' },
    { id: 'docker', name: 'Docker Container Helper', description: 'Manage Dockerfiles and container outputs inline.', installs: '950K', rating: '4.6' }
  ];

  const toggleInstall = (id) => {
    setInstalled(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🧩 Extensions & Plugin Marketplace" maxWidth="max-w-3xl">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {extensions.map(ext => {
            const isInst = installed.includes(ext.id);
            return (
              <div key={ext.id} className="p-4 bg-[#121212] border border-[#262626] rounded-xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-white">{ext.name}</h4>
                    <span className="flex items-center gap-1 text-xs text-amber-400 font-mono"><Star className="w-3 h-3 fill-amber-400" /> {ext.rating}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{ext.description}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#262626]">
                  <span className="text-[10px] text-gray-500 font-mono">{ext.installs} installs</span>
                  <button
                    onClick={() => toggleInstall(ext.id)}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium flex items-center gap-1 transition-all ${
                      isInst
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-[#D4AF37] text-black font-semibold hover:bg-[#F5C542]'
                    }`}
                  >
                    {isInst ? <><Check className="w-3 h-3" /> Enabled</> : <><Download className="w-3 h-3" /> Install</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
