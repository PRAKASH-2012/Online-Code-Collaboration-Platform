import API from './api';

export const projectService = {
  getProjects: async () => {
    const res = await API.get('/projects');
    return res.data.projects;
  },
  getPublicProjects: async () => {
    const res = await API.get('/projects/public');
    return res.data.projects;
  },
  getProjectById: async (id) => {
    const res = await API.get(`/projects/${id}`);
    return res.data;
  },
  createProject: async (data) => {
    const res = await API.post('/projects', data);
    return res.data.project;
  },
  updateProject: async (id, data) => {
    const res = await API.put(`/projects/${id}`, data);
    return res.data.project;
  },
  deleteProject: async (id) => {
    const res = await API.delete(`/projects/${id}`);
    return res.data;
  },
  starProject: async (id) => {
    const res = await API.post(`/projects/${id}/star`);
    return res.data;
  },
  forkProject: async (id) => {
    const res = await API.post(`/projects/${id}/fork`);
    return res.data.project;
  }
};
