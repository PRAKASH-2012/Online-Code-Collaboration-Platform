import React from 'react';
import { Bell, CheckCheck, X } from 'lucide-react';
import { Badge } from './Badge';

export const NotificationsDrawer = ({ isOpen, onClose, notifications = [], onMarkAllRead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-96 bg-[#0D0D0D] border-l border-amber-500/30 shadow-gold-glow p-6 flex flex-col justify-between animate-slide-left">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-white">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onMarkAllRead} className="text-xs text-amber-400 hover:underline flex items-center gap-1">
              <CheckCheck className="w-3.5 h-3.5" /> Read All
            </button>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3 max-h-[80vh] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              No new notifications. All caught up!
            </div>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="p-3 bg-[#151515] border border-[#262626] rounded-xl hover:border-amber-500/40 transition-all">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xs font-bold text-amber-400">{n.title}</h4>
                  <Badge variant="gray">{n.type}</Badge>
                </div>
                <p className="text-xs text-gray-300">{n.message}</p>
                <span className="text-[10px] text-gray-500 block mt-2">Just now</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
