const mongoose = require('mongoose');

const aiInteractionSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  actionType: { type: String, required: true },
  requestPrompt: { type: String, required: true },
  responseContent: { type: String, required: true },
  model: { type: String, default: 'Gemini AI Engine' },
  tokensUsed: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('AIInteraction', aiInteractionSchema);
