const mongoose = require('mongoose');

const executionSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  stdin: { type: String, default: '' },
  stdout: { type: String, default: '' },
  stderr: { type: String, default: '' },
  runtimeMs: { type: Number, default: 0 },
  memoryKb: { type: Number, default: 0 },
  status: { type: String, default: 'Success' },
  exitCode: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Execution', executionSchema);
