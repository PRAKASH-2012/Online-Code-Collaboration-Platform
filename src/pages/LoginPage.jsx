import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Lock, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const LoginPage = () => {
  const [email, setEmail] = useState('prakash@codesync.ai');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 gold-radial-glow bg-gold-grid">
      <div className="w-full max-w-md bg-[#0D0D0D] border border-amber-500/30 rounded-2xl shadow-gold-glow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-br from-[#F5C542] to-[#A88A2D] rounded-xl text-black shadow-gold-glow mb-2">
            <Code2 className="w-8 h-8 font-bold" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-gray-400">Sign in to your CodeSync AI workspace</p>
        </div>

        {error && <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-lg text-xs font-mono">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button variant="primary" size="md" className="w-full" type="submit" icon={ArrowRight}>
            Sign In to Platform
          </Button>
        </form>

        <div className="pt-4 border-t border-[#262626] text-center space-y-3">
          <button
            onClick={() => { login('prakash@codesync.ai', 'Password123!'); navigate('/dashboard'); }}
            className="w-full py-2 bg-[#151515] hover:bg-[#262626] border border-amber-500/30 text-amber-400 rounded-lg text-xs font-mono font-bold transition-all"
          >
            ⚡ Quick Demo Login (Prakash Demo)
          </button>
          <p className="text-xs text-gray-500">
            Don't have an account? <Link to="/register" className="text-amber-400 hover:underline font-bold">Register Free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
