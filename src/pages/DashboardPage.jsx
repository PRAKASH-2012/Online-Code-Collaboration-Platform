import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderGit2, Sparkles, ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectCreationWizard } from '../components/projects/ProjectCreationWizard';
import { Button } from '../components/common/Button';
import { projectService } from '../services/projectService';

export const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showWizard, setShowWizard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [visibility, setVisibility] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data.length ? data : getDemoProjects());
      } catch (err) {
        setProjects(getDemoProjects());
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const visibleProjects = projects.filter((project) => {
    const searchable = `${project.name} ${project.description || ''} ${project.framework || ''}`.toLowerCase();
    const matchesQuery = searchable.includes(query.toLowerCase());
    const matchesVisibility = visibility === 'All' || project.visibility === visibility;
    return matchesQuery && matchesVisibility;
  });

  const getDemoProjects = () => [
    { _id: '665100000000000000000001', name: 'AI Student Portal', description: 'Collaborative student portal powered by React & Node.js.', language: 'javascript', framework: 'React', visibility: 'Public', starsCount: 28, forksCount: 6 },
    { _id: '665100000000000000000002', name: 'Collaborative Portfolio', description: 'Futuristic black-and-gold interactive portfolio.', language: 'javascript', framework: 'HTML/CSS/JS', visibility: 'Public', starsCount: 42, forksCount: 12 },
    { _id: '665100000000000000000003', name: 'Python Algorithm Lab', description: 'Python algorithm benchmark suite with live AI scoring.', language: 'python', framework: 'Flask', visibility: 'Public', starsCount: 19, forksCount: 3 },
    { _id: '665100000000000000000004', name: 'Java Management System', description: 'Enterprise resource management backend system in Java.', language: 'java', framework: 'Spring Boot', visibility: 'Private', starsCount: 8, forksCount: 1 }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#0D0D0D] via-[#151515] to-[#0D0D0D] border border-amber-500/30 p-6 rounded-2xl shadow-gold-glow">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
                <Sparkles className="w-4 h-4" /> Welcome back to CodeSync AI
              </div>
              <h1 className="text-2xl font-extrabold text-white">Hello, {user?.fullName || 'Prakash Demo'}!</h1>
              <p className="text-xs text-gray-400">4 active projects | 3 pending review requests | 98% AI Code Quality Score</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowWizard(true)}>
                Create Project
              </Button>
              <Button variant="secondary" size="sm" icon={FolderGit2} onClick={() => navigate('/ide')}>
                Open IDE Scratchpad
              </Button>
            </div>
          </div>

          {/* Metric Dashboard Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
            <div className="bg-[#0D0D0D] border border-[#262626] p-4 rounded-xl space-y-1">
              <span className="text-xs text-gray-500">Total Projects</span>
              <div className="text-2xl font-extrabold text-amber-400">{projects.length || 4}</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#262626] p-4 rounded-xl space-y-1">
              <span className="text-xs text-gray-500">Active Collaborators</span>
              <div className="text-2xl font-extrabold text-emerald-400">4</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#262626] p-4 rounded-xl space-y-1">
              <span className="text-xs text-gray-500">AI Code Prompts</span>
              <div className="text-2xl font-extrabold text-[#F5C542]">89</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#262626] p-4 rounded-xl space-y-1">
              <span className="text-xs text-gray-500">Contribution Score</span>
              <div className="text-2xl font-extrabold text-amber-400">1,250</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, frameworks, or descriptions"
                className="w-full bg-[#0D0D0D] border border-[#262626] focus:border-amber-500 rounded-lg py-2 pl-9 pr-3 text-sm text-white outline-none"
              />
            </div>
            <label className="flex items-center gap-2 bg-[#0D0D0D] border border-[#262626] rounded-lg px-3 text-xs text-gray-400">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <select value={visibility} onChange={(event) => setVisibility(event.target.value)} className="bg-transparent text-white py-2 outline-none">
                <option value="All">All visibility</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </label>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-[#D4AF37]" /> Your Workspaces & Projects
              </h2>
              <button onClick={() => navigate('/explore')} className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                Explore Public Projects <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleProjects.map((proj) => (
                <ProjectCard key={proj._id} project={proj} />
              ))}
              {!loading && visibleProjects.length === 0 && (
                <div className="md:col-span-2 lg:col-span-4 border border-dashed border-[#333] rounded-xl p-8 text-center text-sm text-gray-500">
                  No projects match your filters.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ProjectCreationWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onProjectCreated={(newProj) => setProjects(prev => [newProj, ...prev])}
      />
    </div>
  );
};
