import API from './api';

export const taskService = {
  getTasks: async (projectId) => {
    const res = await API.get(`/tasks/project/${projectId}`);
    return res.data.tasks;
  },
  createTask: async (projectId, data) => {
    const res = await API.post(`/tasks/project/${projectId}`, data);
    return res.data.task;
  },
  updateTask: async (taskId, data) => {
    const res = await API.put(`/tasks/${taskId}`, data);
    return res.data.task;
  },
  deleteTask: async (taskId) => {
    const res = await API.delete(`/tasks/${taskId}`);
    return res.data;
  }
};
