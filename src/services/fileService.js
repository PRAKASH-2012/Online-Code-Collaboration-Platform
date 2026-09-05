import API from './api';

export const fileService = {
  getFiles: async (projectId) => {
    const res = await API.get(`/files/project/${projectId}`);
    return res.data.files;
  },
  createFile: async (projectId, data) => {
    const res = await API.post(`/files/project/${projectId}`, data);
    return res.data.file;
  },
  updateFile: async (fileId, data) => {
    const res = await API.put(`/files/${fileId}`, data);
    return res.data.file;
  },
  renameFile: async (fileId, newName, newPath) => {
    const res = await API.put(`/files/${fileId}/rename`, { newName, newPath });
    return res.data.file;
  },
  deleteFile: async (fileId) => {
    const res = await API.delete(`/files/${fileId}`);
    return res.data;
  }
};
