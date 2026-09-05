import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code, Compass, Store, BarChart2, Shield, Users, Settings } from 'lucide-react';

export const Sidebar = () => {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/ide', label: 'IDE Workspace', icon: Code },
    { to: '/explore', label: 'Public Projects', icon: Compass },
    { to: '/templates', label: 'Templates', icon: Store },
    { to: '/analytics', label: 'Analytics', icon: BarChart2 },
    { to: '/organizations', label: 'Organizations', icon: Users },
    { to: '/settings', label: 'User Settings', icon: Settings }
  ];

  return (
    <aside className="w-56 bg-[#0D0D0D] border-r border-[#262626] p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-3.5rem)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-500/70">
          Navigation
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-[#F5C542] border border-amber-500/30 font-semibold shadow-gold-glow'
                    : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          );
        })}
      </div>

      <div className="p-3 bg-[#151515] border border-amber-500/20 rounded-xl text-xs space-y-1">
        <div className="font-bold text-amber-400">Pro Feature Active</div>
        <p className="text-[11px] text-gray-400">Gemini AI Assistant & Judge0 Isolated Sandbox enabled.</p>
      </div>
    </aside>
  );
};
