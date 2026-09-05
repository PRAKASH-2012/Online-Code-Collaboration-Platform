import API from './api';

export const authService = {
  login: async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.accessToken) {
      localStorage.setItem('codesync_token', res.data.accessToken);
    }
    return res.data;
  },
  register: async (userData) => {
    const res = await API.post('/auth/register', userData);
    if (res.data.accessToken) {
      localStorage.setItem('codesync_token', res.data.accessToken);
    }
    return res.data;
  },
  getProfile: async () => {
    const res = await API.get('/auth/profile');
    return res.data;
  },
  updateProfile: async (data) => {
    const res = await API.put('/auth/profile', data);
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('codesync_token');
  }
};
