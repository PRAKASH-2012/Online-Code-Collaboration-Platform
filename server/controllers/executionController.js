const { executeCode } = require('../services/executionService');
const Execution = require('../models/Execution');
const ActivityLog = require('../models/ActivityLog');

const runCode = async (req, res) => {
  try {
    const { language, code, stdin, projectId } = req.body;
    if (!language || !code) return res.status(400).json({ success: false, message: 'Language and code required.' });

    const result = await executeCode({ language, code, stdin: stdin || '' });

    let executionId;
    try {
      const record = await Execution.create({
        project: projectId || null,
        user: req.user.id,
        language,
        code,
        stdin: stdin || '',
        stdout: result.stdout,
        stderr: result.stderr,
        runtimeMs: result.runtimeMs,
        memoryKb: result.memoryKb,
        status: result.status,
        exitCode: result.exitCode
      });
      executionId = record._id;
    } catch (storageError) {
      console.warn(`[Execution] Result storage unavailable: ${storageError.message}`);
    }

    if (projectId) {
      try {
        await ActivityLog.create({
          user: req.user.id,
          project: projectId,
          action: 'CODE_EXECUTED',
          details: `Ran ${language} code (${result.status})`
        });
      } catch (activityError) {
        console.warn(`[Execution] Activity storage unavailable: ${activityError.message}`);
      }
    }

    res.json({ success: true, result, executionId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getExecutionHistory = async (req, res) => {
  try {
    const { projectId } = req.params;
    const history = await Execution.find({ project: projectId }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { runCode, getExecutionHistory };
