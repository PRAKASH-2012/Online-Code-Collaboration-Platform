import React, { useContext } from 'react';
import { User, Settings, Shield, Laptop } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const UserProfileSettingsPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 space-y-6 overflow-y-auto max-w-4xl">
          <div>
            <h1 className="text-2xl font-extrabold text-[#D4AF37] flex items-center gap-2">
              <Settings className="w-6 h-6" /> User Profile & Settings
            </h1>
            <p className="text-xs text-gray-400 font-sans">Update profile details, developer availability, and active sessions.</p>
          </div>

          <div className="bg-[#0D0D0D] border border-[#262626] rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" /> Account Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={user?.fullName || 'Prakash Demo'} />
              <Input label="Username" defaultValue={user?.username || 'prakash_demo'} />
              <Input label="Email Address" defaultValue={user?.email || 'prakash@codesync.ai'} disabled />
              <Input label="College / Company" defaultValue={user?.collegeOrCompany || 'CodeSync AI Labs'} />
            </div>

            <Button variant="primary" size="sm">Save Profile Changes</Button>
          </div>

          <div className="bg-[#0D0D0D] border border-[#262626] rounded-xl p-6 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-white font-sans flex items-center gap-2">
              <Laptop className="w-4 h-4 text-amber-400" /> Active Logged-in Sessions
            </h3>
            <div className="p-3 bg-[#151515] border border-[#262626] rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-400">Current Windows Workstation</span>
                <span className="text-gray-500 block text-[10px]">IP: 127.0.0.1 | Active Session</span>
              </div>
              <span className="text-amber-400 text-[10px]">ONLINE</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
