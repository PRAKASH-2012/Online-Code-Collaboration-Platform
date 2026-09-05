import React, { useState } from 'react';
import { Shield, Users, Activity, FileText } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { AdminUsers } from '../components/admin/AdminUsers';
import { AdminAnalytics } from '../components/admin/AdminAnalytics';

export const AdminDashboardPage = () => {
  const [tab, setTab] = useState('users');

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 space-y-6 overflow-y-auto font-mono">
          <div>
            <h1 className="text-2xl font-extrabold text-[#D4AF37] flex items-center gap-2">
              <Shield className="w-6 h-6" /> Platform Admin Portal
            </h1>
            <p className="text-xs text-gray-400 font-sans">Monitor system health, manage accounts, and inspect audit logs.</p>
          </div>

          <div className="flex gap-2 border-b border-[#262626] pb-2 text-xs">
            <button
              onClick={() => setTab('users')}
              className={`px-3 py-1.5 rounded ${tab === 'users' ? 'bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30' : 'text-gray-400'}`}
            >
              User Moderation
            </button>
            <button
              onClick={() => setTab('analytics')}
              className={`px-3 py-1.5 rounded ${tab === 'analytics' ? 'bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30' : 'text-gray-400'}`}
            >
              System Analytics
            </button>
          </div>

          {tab === 'users' && <AdminUsers />}
          {tab === 'analytics' && <AdminAnalytics />}
        </main>
      </div>
    </div>
  );
};
