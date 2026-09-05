import React, { useState } from 'react';
import { Search, Star, GitFork, Compass, Filter } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { ProjectCard } from '../components/projects/ProjectCard';

export const PublicExplorerPage = () => {
  const [search, setSearch] = useState('');

  const publicProjects = [
    { _id: '1', name: 'AI Student Portal', description: 'Collaborative student portal powered by React & Node.js.', language: 'javascript', framework: 'React', visibility: 'Public', starsCount: 28, forksCount: 6 },
    { _id: '2', name: 'Collaborative Portfolio', description: 'Futuristic black-and-gold interactive portfolio.', language: 'javascript', framework: 'HTML/CSS/JS', visibility: 'Public', starsCount: 42, forksCount: 12 },
    { _id: '3', name: 'Python Algorithm Lab', description: 'High-performance Python algorithm benchmark suite.', language: 'python', framework: 'Flask', visibility: 'Public', starsCount: 19, forksCount: 3 }
  ];

  const filtered = publicProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-[#D4AF37] flex items-center gap-2">
              <Compass className="w-6 h-6" /> Public Project Explorer
            </h1>
            <p className="text-xs text-gray-400">Discover, star, and fork open-source collaborative projects.</p>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              type="text"
              placeholder="Search public projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0D0D0D] border border-amber-500/30 pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.map(proj => (
              <ProjectCard key={proj._id} project={proj} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
