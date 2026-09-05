import React from 'react';
import { Eye, X } from 'lucide-react';
import { useIDE } from '../../hooks/useIDE';

export const FollowBanner = () => {
  const { followedUser, setFollowedUser } = useIDE();

  if (!followedUser) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border-b border-amber-500/40 px-4 py-1.5 flex items-center justify-between text-xs font-mono text-amber-300">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-[#F5C542] animate-pulse" />
        <span>Following <strong>{followedUser.username}</strong> (Live Scroll & File Sync Active)</span>
      </div>
      <button
        onClick={() => setFollowedUser(null)}
        className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded border border-amber-500/40 flex items-center gap-1"
      >
        <X className="w-3 h-3" /> Stop Following
      </button>
    </div>
  );
};
