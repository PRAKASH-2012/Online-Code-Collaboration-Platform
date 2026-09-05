import React, { useState } from 'react';
import { Shield, UserX, UserCheck, Search } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AdminUsers = () => {
  const [users, setUsers] = useState([
    { _id: '1', username: 'prakash_demo', email: 'prakash@codesync.ai', role: 'Platform Admin', isSuspended: false },
    { _id: '2', username: 'arun_demo', email: 'arun@codesync.ai', role: 'Developer', isSuspended: false },
    { _id: '3', username: 'kumar_demo', email: 'kumar@codesync.ai', role: 'Developer', isSuspended: false },
    { _id: '4', username: 'meena_demo', email: 'meena@codesync.ai', role: 'Developer', isSuspended: false }
  ]);

  const toggleSuspend = (id) => {
    setUsers(prev => prev.map(u => u._id === id ? { ...u, isSuspended: !u.isSuspended } : u));
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex justify-between items-center bg-[#0D0D0D] p-4 rounded-xl border border-[#262626]">
        <h3 className="font-bold text-white">Platform Registered Accounts</h3>
        <Badge variant="gold">{users.length} Users Total</Badge>
      </div>

      <div className="bg-[#0D0D0D] border border-[#262626] rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#151515] text-gray-400 border-b border-[#262626]">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-[#121212]">
                <td className="p-3 font-bold text-white">{u.username}</td>
                <td className="p-3 text-gray-400">{u.email}</td>
                <td className="p-3"><Badge variant="gold">{u.role}</Badge></td>
                <td className="p-3">
                  <Badge variant={u.isSuspended ? 'red' : 'green'}>{u.isSuspended ? 'Suspended' : 'Active'}</Badge>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => toggleSuspend(u._id)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                      u.isSuspended ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-950/60 text-red-400 border border-red-800'
                    }`}
                  >
                    {u.isSuspended ? 'Reactivate' : 'Suspend'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
