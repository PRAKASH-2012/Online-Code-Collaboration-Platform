const { processAIRequest } = require('../services/aiService');
const AIInteraction = require('../models/AIInteraction');

const askAI = async (req, res) => {
  try {
    const { actionType, prompt, code, language, persona, projectId } = req.body;
    if (!prompt && !actionType) return res.status(400).json({ success: false, message: 'Prompt or action required.' });

    const responseContent = await processAIRequest({
      actionType: actionType || 'ask',
      prompt: prompt || 'Analyze this code snippet',
      code: code || '',
      language: language || 'javascript',
      persona: persona || 'Architect'
    });

    let recordId;
    try {
      const record = await AIInteraction.create({
        project: projectId || null,
        user: req.user.id,
        actionType: actionType || 'ask',
        requestPrompt: prompt || actionType,
        responseContent
      });
      recordId = record._id;
    } catch (storageError) {
      console.warn(`[AI] Interaction storage unavailable: ${storageError.message}`);
    }

    res.json({ success: true, response: responseContent, recordId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAIHistory = async (req, res) => {
  try {
    const history = await AIInteraction.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(30);
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { askAI, getAIHistory };
