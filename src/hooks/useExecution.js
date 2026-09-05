import { useState } from 'react';
import { executionService } from '../services/executionService';

export const useExecution = () => {
  const [isRunning, setIsRunning] = useState(false);

  const execute = async ({ language, code, stdin, projectId }) => {
    setIsRunning(true);
    try {
      const data = await executionService.runCode({ language, code, stdin, projectId });
      return data;
    } catch (err) {
      return {
        success: false,
        result: { stdout: '', stderr: err.message, status: 'Execution Error', exitCode: 1 }
      };
    } finally {
      setIsRunning(false);
    }
  };

  return { execute, isRunning };
};
