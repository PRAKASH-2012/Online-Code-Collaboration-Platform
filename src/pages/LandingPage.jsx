import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Sparkles, Zap, ShieldCheck, Users, Terminal, Play, Bot, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Footer } from '../components/layout/Footer';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans gold-radial-glow bg-gold-grid">
      {/* Landing Navbar */}
      <nav className="h-20 border-b border-amber-500/20 px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-[#050505]/80">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#F5C542] to-[#A88A2D] rounded-xl text-black shadow-gold-glow">
            <Code2 className="w-6 h-6 font-bold" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            CodeSync<span className="text-[#D4AF37]">.AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-[#F5C542] transition-colors">Features</a>
          <a href="#collaboration" className="hover:text-[#F5C542] transition-colors">Real-Time Sync</a>
          <a href="#ai" className="hover:text-[#F5C542] transition-colors">AI Assistant</a>
          <a href="#execution" className="hover:text-[#F5C542] transition-colors">Code Execution</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Button variant="primary" size="md" icon={Sparkles} onClick={() => navigate('/register')}>
            Start Coding Free
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <Sparkles className="w-4 h-4" /> Next-Gen Black & Gold Developer Ecosystem
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Code Together. Build Faster. <br />
          <span className="bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#A88A2D] bg-clip-text text-transparent shadow-gold-glow">
            Create Smarter.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          The ultimate intelligent online code collaboration platform. Write code in real time with Monaco editor, execute scripts in isolated sandboxes, leverage Gemini AI copilot, and manage team workflows effortlessly.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button variant="primary" size="lg" icon={ArrowRight} onClick={() => navigate('/dashboard')}>
            Launch Workspace Demo
          </Button>
          <Button variant="outline" size="lg" icon={Play} onClick={() => navigate('/explore')}>
            Explore Public Projects
          </Button>
        </div>

        {/* IDE Animated Preview Frame */}
        <div className="mt-16 bg-[#0D0D0D] border border-amber-500/30 rounded-2xl p-4 shadow-gold-glow-lg text-left font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626] mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500/80 rounded-full" />
              <span className="w-3 h-3 bg-amber-500/80 rounded-full" />
              <span className="w-3 h-3 bg-green-500/80 rounded-full" />
              <span className="ml-2 text-amber-400 font-bold">App.jsx — CodeSync AI Workspace</span>
            </div>
            <span className="text-emerald-400 flex items-center gap-1">● 3 Collaborators Syncing Live</span>
          </div>

          <div className="bg-[#050505] p-6 rounded-xl text-gray-300 space-y-2 border border-[#1A1A1A]">
            <div className="text-gray-500">// Real-Time Collaborative Yjs CRDT Editor Buffer</div>
            <div><span className="text-amber-400 font-bold">import</span> React <span className="text-amber-400 font-bold">from</span> <span className="text-yellow-300">'react'</span>;</div>
            <div><span className="text-amber-400 font-bold">import</span> &#123; CodeSyncAI &#125; <span className="text-amber-400 font-bold">from</span> <span className="text-yellow-300">'@codesync/engine'</span>;</div>
            <br />
            <div><span className="text-amber-400 font-bold">export default function</span> <span className="text-white font-bold">App</span>() &#123;</div>
            <div className="pl-4 text-green-400">// AI Copilot Score: 98% | Security Scan: Verified</div>
            <div className="pl-4"><span className="text-amber-400 font-bold">return</span> &lt;<span className="text-amber-300">CodeSyncAI</span> theme=<span className="text-yellow-300">"black-gold"</span> realTime=<span className="text-amber-400">true</span> /&gt;;</div>
            <div>&#125;</div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-20 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0D0D0D] border border-[#262626] p-6 rounded-2xl hover:border-amber-500/40 transition-all space-y-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[#F5C542] w-fit">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Live Real-Time Collaboration</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Multi-user simultaneous code editing with live cursors, follow mode, typing indicators, and Yjs CRDT sync.
          </p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#262626] p-6 rounded-2xl hover:border-amber-500/40 transition-all space-y-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[#F5C542] w-fit">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Gemini AI Developer Suite</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Ask AI, refactor code, run security vulnerability scans, calculate quality scores, and generate unit tests.
          </p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#262626] p-6 rounded-2xl hover:border-amber-500/40 transition-all space-y-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[#F5C542] w-fit">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Isolated Code Execution</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Execute Node.js, Python, Java, C, C++, and TypeScript in isolated execution environments with live output.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
