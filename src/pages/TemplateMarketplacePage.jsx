import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Code, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const TemplateMarketplacePage = () => {
  const navigate = useNavigate();

  const templates = [
    { title: 'React & Tailwind Starter', language: 'JavaScript', description: 'Production-ready React 18 template preconfigured with Tailwind CSS and Lucide Icons.' },
    { title: 'Python Algorithm Lab', language: 'Python 3', description: 'Sieve algorithms, benchmark timers, and AI optimization prompts.' },
    { title: 'Node.js Express REST API', language: 'JavaScript', description: 'JWT authentication, rate limiting, and MongoDB Mongoose schemas.' },
    { title: 'Java Spring Boot App', language: 'Java', description: 'Enterprise backend structure with Controller and Service layers.' },
    { title: 'C++ Competitive Coding', language: 'C++', description: 'Fast I/O template with STL algorithms and test suite runner.' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-[#D4AF37] flex items-center gap-2">
              <Store className="w-6 h-6" /> Free Template Marketplace
            </h1>
            <p className="text-xs text-gray-400">Launch preconfigured starter templates into your collaborative workspace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((tpl, i) => (
              <Card key={i} className="flex flex-col justify-between h-48">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-white">{tpl.title}</h3>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">{tpl.language}</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-3">{tpl.description}</p>
                </div>

                <Button variant="primary" size="sm" icon={ArrowRight} onClick={() => navigate('/ide')}>
                  Use Template
                </Button>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
