import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, History } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const TimeTravelReplayModal = ({ isOpen, onClose, code = '' }) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const lines = code ? code.split('\n') : ['// Initializing file creation...'];
  const maxSteps = lines.length;

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxSteps]);

  if (!isOpen) return null;

  const currentSnapshot = lines.slice(0, Math.max(1, step)).join('\n');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⏳ Time-Travel Code Replay" maxWidth="max-w-4xl">
      <div className="space-y-4">
        {/* Playback Controls */}
        <div className="flex items-center justify-between bg-[#121212] p-3 rounded-xl border border-amber-500/20">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={isPlaying ? Pause : Play}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause' : 'Replay Timeline'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={() => { setStep(1); setIsPlaying(false); }}
            >
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-amber-400">
            <span>Step {step} / {maxSteps}</span>
            <input
              type="range"
              min="1"
              max={maxSteps}
              value={step}
              onChange={(e) => { setStep(parseInt(e.target.value)); setIsPlaying(false); }}
              className="w-48 accent-[#D4AF37]"
            />
          </div>
        </div>

        {/* Code Replay Screen */}
        <div className="bg-[#050505] p-4 rounded-xl font-mono text-xs text-green-400 min-h-[300px] border border-[#262626] whitespace-pre-wrap overflow-y-auto">
          {currentSnapshot}
        </div>
      </div>
    </Modal>
  );
};
