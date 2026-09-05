import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, RefreshCw, ExternalLink, X } from 'lucide-react';

export const LiveWebPreview = ({ isOpen, onClose, htmlCode = '' }) => {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  if (!isOpen) return null;

  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  const previewContent = htmlCode || `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { background: #050505; color: #FFF; font-family: sans-serif; padding: 2rem; }
        h1 { color: #D4AF37; }
        .box { background: #151515; border: 1px solid #D4AF37; padding: 1.5rem; borderRadius: 8px; }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>CodeSync AI Live Web Preview</h1>
        <p>Interactive web preview rendering HTML/CSS/JS content in real time.</p>
        <button style="background: #D4AF37; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold;">Interactive Element</button>
      </div>
    </body>
    </html>
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-6xl h-[85vh] bg-[#0D0D0D] border border-amber-500/30 rounded-xl shadow-gold-glow flex flex-col overflow-hidden">
        {/* Device Controls Header */}
        <div className="px-4 py-2 bg-[#121212] border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded ${device === 'desktop' ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400'}`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded ${device === 'tablet' ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400'}`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded ${device === 'mobile' ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400'}`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs font-mono text-amber-400 font-bold">http://localhost:5173/preview</span>

          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Frame Container */}
        <div className="flex-1 bg-[#050505] flex items-center justify-center p-4 overflow-auto">
          <iframe
            srcDoc={previewContent}
            title="Live Web Preview"
            className={`${deviceWidths[device]} h-full bg-white rounded-lg shadow-2xl transition-all duration-300`}
          />
        </div>
      </div>
    </div>
  );
};
