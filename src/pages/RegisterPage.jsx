import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Lock, Mail, User, Sparkles, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ fullName, username, email, password });
      navigate('/dashboard');
    } catch (err) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 gold-radial-glow bg-gold-grid">
      <div className="w-full max-w-md bg-[#0D0D0D] border border-amber-500/30 rounded-2xl shadow-gold-glow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-br from-[#F5C542] to-[#A88A2D] rounded-xl text-black shadow-gold-glow mb-2">
            <Code2 className="w-8 h-8 font-bold" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create Developer Account</h2>
          <p className="text-xs text-gray-400">Join the real-time AI code collaboration ecosystem</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Prakash Demo"
            icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Username"
            placeholder="prakash_dev"
            icon={User}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="prakash@codesync.ai"
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
            Register Free Account
          </Button>
        </form>

        <div className="pt-4 border-t border-[#262626] text-center">
          <p className="text-xs text-gray-500">
            Already have an account? <Link to="/login" className="text-amber-400 hover:underline font-bold">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
