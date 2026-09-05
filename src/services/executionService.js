import API from './api';

export const executionService = {
  runCode: async ({ language, code, stdin, projectId }) => {
    const res = await API.post('/executions/run', { language, code, stdin, projectId });
    return res.data;
  },
  getHistory: async (projectId) => {
    const res = await API.get(`/executions/history/${projectId}`);
    return res.data.history;
  }
};
