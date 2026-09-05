import React, { useState } from 'react';
import { Mic, MicOff, Volume2, X } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';

export const AudioHuddleBar = () => {
  const { audioHuddleActive, setAudioHuddleActive } = useIDE();
  const [isMuted, setIsMuted] = useState(false);

  if (!audioHuddleActive) return null;

  return (
    <div className="bg-[#121212] border-b border-amber-500/40 px-4 py-2 flex items-center justify-between text-xs font-mono text-amber-300 animate-fade-in z-20">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-[#F5C542] rounded-full animate-gold-pulse" />
          <span className="font-bold text-white">Voice Huddle Active</span>
        </div>
        <span className="text-gray-400">3 participants in channel</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 font-bold transition-all ${
            isMuted ? 'bg-red-950/60 text-red-400 border border-red-800' : 'bg-amber-500 text-black shadow-gold-glow'
          }`}
        >
          {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          {isMuted ? 'Muted' : 'Mic On'}
        </button>

        <button
          onClick={() => setAudioHuddleActive(false)}
          className="p-1 text-gray-400 hover:text-white hover:bg-[#1A1A1A] rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
