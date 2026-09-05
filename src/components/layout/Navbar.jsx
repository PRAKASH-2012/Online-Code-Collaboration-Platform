import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Bell, Search, User, LogOut, Shield, FolderGit2, Sparkles } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { NotificationsDrawer } from '../common/NotificationsDrawer';
import { CommandPalette } from '../common/CommandPalette';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const notificationsMock = [
    { title: 'New Collaboration Invite', message: 'Arun invited you to Python Algorithm Lab.', type: 'Invitation' },
    { title: 'AI Security Alert', message: 'No vulnerabilities found in App.jsx.', type: 'System' }
  ];

  return (
    <>
      <nav className="h-14 bg-[#0A0A0A] border-b border-amber-500/20 px-6 flex items-center justify-between sticky top-0 z-40">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="p-1.5 bg-gradient-to-br from-[#F5C542] to-[#A88A2D] rounded-lg text-black shadow-gold-glow group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 font-bold" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-[#F5C542] transition-colors">
              CodeSync<span className="text-[#D4AF37]">.AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-[#121212] px-3 py-1 rounded-full border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5" /> Black & Gold Developer Edition
          </div>
        </div>

        {/* Global Search & Command Palette Quick Trigger */}
        <div className="hidden lg:flex items-center w-80">
          <button
            onClick={() => setShowCommandPalette(true)}
            className="w-full bg-[#141414] border border-[#262626] hover:border-amber-500/40 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-gray-400 transition-all"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-amber-500" /> Search projects, files, commands...
            </span>
            <kbd className="bg-[#050505] px-1.5 py-0.5 rounded text-[10px] text-gray-500 border border-[#262626]">Ctrl+K</kbd>
          </button>
        </div>

        {/* User Navigation Controls */}
        <div className="flex items-center gap-4">
          <Link to="/explore" className="text-xs text-gray-300 hover:text-[#F5C542] transition-colors font-medium hidden sm:block">
            Public Explorer
          </Link>
          <Link to="/templates" className="text-xs text-gray-300 hover:text-[#F5C542] transition-colors font-medium hidden sm:block">
            Marketplace
          </Link>

          {user?.role === 'Platform Admin' && (
            <Link to="/admin" className="p-2 text-amber-400 hover:bg-[#1A1A1A] rounded-lg transition-colors" title="Admin Portal">
              <Shield className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={() => setShowNotifications(true)}
            className="p-2 text-gray-400 hover:text-amber-400 hover:bg-[#1A1A1A] rounded-lg relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F5C542] rounded-full animate-ping" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-[#262626]">
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=user`}
              alt="Avatar"
              className="w-7 h-7 rounded-full border border-amber-500/40 object-cover"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white">{user?.fullName || 'Prakash Demo'}</div>
              <div className="text-[10px] text-amber-400 font-mono">{user?.role || 'Developer'}</div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors ml-1"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <NotificationsDrawer
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notificationsMock}
        onMarkAllRead={() => {}}
      />

      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onAction={(action) => {
          if (action === 'create-file') navigate('/ide');
          if (action === 'run-code') navigate('/ide');
          if (action === 'ask-ai') navigate('/ide');
        }}
      />
    </>
  );
};
