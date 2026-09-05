import React from 'react';
import { BarChart2, TrendingUp, Award, Clock } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';

export const AnalyticsPage = () => {
  const chartData = [
    { day: 'Mon', commits: 12, executions: 5, aiPrompts: 10 },
    { day: 'Tue', commits: 18, executions: 9, aiPrompts: 14 },
    { day: 'Wed', commits: 25, executions: 14, aiPrompts: 22 },
    { day: 'Thu', commits: 20, executions: 11, aiPrompts: 18 },
    { day: 'Fri', commits: 30, executions: 16, aiPrompts: 28 }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 space-y-6 overflow-y-auto font-mono">
          <div>
            <h1 className="text-2xl font-extrabold text-[#D4AF37] flex items-center gap-2">
              <BarChart2 className="w-6 h-6" /> Personal Developer Analytics
            </h1>
            <p className="text-xs text-gray-400 font-sans">Track coding velocity, contribution streak, and AI usage metrics.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-[#0D0D0D] border border-[#262626] rounded-xl space-y-1">
              <span className="text-gray-500">Coding Streak</span>
              <div className="text-2xl font-bold text-amber-400">14 Days</div>
            </div>
            <div className="p-4 bg-[#0D0D0D] border border-[#262626] rounded-xl space-y-1">
              <span className="text-gray-500">Collaborative Hours</span>
              <div className="text-2xl font-bold text-emerald-400">42 hrs</div>
            </div>
            <div className="p-4 bg-[#0D0D0D] border border-[#262626] rounded-xl space-y-1">
              <span className="text-gray-500">Tasks Completed</span>
              <div className="text-2xl font-bold text-[#F5C542]">34</div>
            </div>
            <div className="p-4 bg-[#0D0D0D] border border-[#262626] rounded-xl space-y-1">
              <span className="text-gray-500">Contribution Rank</span>
              <div className="text-2xl font-bold text-amber-400">#1 Top Dev</div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-[#262626] rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 font-sans">Weekly Activity Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis dataKey="day" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#050505', borderColor: '#D4AF37', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="aiPrompts" stroke="#D4AF37" fill="rgba(212, 175, 55, 0.2)" />
                  <Area type="monotone" dataKey="commits" stroke="#F5C542" fill="rgba(245, 197, 66, 0.1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
