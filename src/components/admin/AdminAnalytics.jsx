import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminAnalytics = () => {
  const data = [
    { day: 'Mon', users: 12, executions: 45, aiRequests: 90 },
    { day: 'Tue', users: 18, executions: 60, aiRequests: 120 },
    { day: 'Wed', users: 24, executions: 95, aiRequests: 180 },
    { day: 'Thu', users: 30, executions: 110, aiRequests: 210 },
    { day: 'Fri', users: 42, executions: 150, aiRequests: 290 }
  ];

  return (
    <div className="bg-[#0D0D0D] border border-[#262626] rounded-xl p-5 space-y-4">
      <h3 className="text-sm font-bold text-amber-400">Platform System Metrics & Execution Growth</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="day" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip contentStyle={{ backgroundColor: '#050505', borderColor: '#D4AF37', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="aiRequests" stroke="#D4AF37" fill="rgba(212, 175, 55, 0.2)" />
            <Area type="monotone" dataKey="executions" stroke="#F5C542" fill="rgba(245, 197, 66, 0.1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
