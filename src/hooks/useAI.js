import { useState } from 'react';
import API from '../services/api';

export const useAI = () => {
  const [loading, setLoading] = useState(false);

  const queryAI = async ({ actionType, prompt, code, language, persona, projectId }) => {
    setLoading(true);
    try {
      const res = await API.post('/ai/prompt', { actionType, prompt, code, language, persona, projectId });
      return res.data;
    } catch (err) {
      return { success: false, response: 'AI Service currently operating in offline fallback mode.' };
    } finally {
      setLoading(false);
    }
  };

  return { queryAI, loading };
};
