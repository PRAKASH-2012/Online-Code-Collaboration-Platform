import React, { useState } from 'react';
import { MessageSquare, Send, Code, Smile, User } from 'lucide-react';

export const TeamChatPanel = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Prakash Demo', content: 'Hey team! Black & Gold theme styling is live on main branch.', time: '10:14 AM' },
    { id: 2, sender: 'Arun Demo', content: 'Awesome! Testing live cursor updates right now.', time: '10:15 AM' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'You',
      content: inputText,
      time: 'Just now'
    }]);
    setInputText('');
  };

  return (
    <div className="w-80 bg-[#0D0D0D] border-l border-[#262626] flex flex-col h-full select-none">
      <div className="p-3 border-b border-[#262626] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Team Chat</h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400">● Live Room</span>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-3 font-mono text-xs">
        {messages.map((m) => (
          <div key={m.id} className="p-2.5 bg-[#151515] border border-[#262626] rounded-xl space-y-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold text-amber-400">{m.sender}</span>
              <span className="text-gray-500">{m.time}</span>
            </div>
            <p className="text-gray-200 leading-relaxed">{m.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-[#262626] flex items-center gap-2">
        <input
          type="text"
          placeholder="Send team message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-[#050505] border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
        />
        <button type="submit" className="p-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#F5C542]">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
