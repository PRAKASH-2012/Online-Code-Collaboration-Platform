import React from 'react';
import { Users, Plus, Building } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Button } from '../components/common/Button';

export const OrganizationPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 space-y-6 overflow-y-auto font-mono">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-extrabold text-[#D4AF37] flex items-center gap-2">
                <Building className="w-6 h-6" /> Organization Workspaces
              </h1>
              <p className="text-xs text-gray-400 font-sans">Manage team organizations, projects, and permissions.</p>
            </div>
            <Button variant="primary" size="sm" icon={Plus}>Create Organization</Button>
          </div>

          <div className="p-6 bg-[#0D0D0D] border border-amber-500/30 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg">
                CS
              </div>
              <div>
                <h3 className="font-bold text-white text-base">CodeSync AI Labs</h3>
                <span className="text-xs text-gray-400">4 Active Members | 4 Team Projects</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
