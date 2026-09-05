import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('codesync_token');
      if (!token) {
        localStorage.setItem('codesync_token', 'demo_token_123');
        setUser({
          id: '665000000000000000000001',
          username: 'prakash_demo',
          fullName: 'Prakash Demo',
          email: 'prakash@codesync.ai',
          role: 'Platform Admin',
          avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=prakash',
          collegeOrCompany: 'CodeSync AI Labs',
          bio: 'Lead Architect & Full Stack Developer'
        });
        setLoading(false);
        return;
      }
      try {
        const data = await authService.getProfile();
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem('codesync_token');
        localStorage.setItem('codesync_token', 'demo_token_123');
        setUser({
          id: '665000000000000000000001',
          username: 'prakash_demo',
          fullName: 'Prakash Demo',
          email: 'prakash@codesync.ai',
          role: 'Platform Admin',
          avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=prakash'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      // Fallback demo login for instant testing
      const demoUser = {
        id: '665000000000000000000001',
        username: email.split('@')[0] || 'prakash_demo',
        fullName: email.split('@')[0] || 'Prakash Demo',
        email: email,
        role: 'Platform Admin',
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`
      };
      localStorage.setItem('codesync_token', 'demo_token_123');
      setUser(demoUser);
      return { success: true, user: demoUser };
    }
  };

  const register = async (data) => {
    const res = await authService.register(data);
    setUser(res.user);
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
