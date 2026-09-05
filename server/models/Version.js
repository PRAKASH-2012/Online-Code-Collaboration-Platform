const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  filePath: { type: String, required: true },
  content: { type: String, required: true },
  editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commitMessage: { type: String, default: 'File saved' },
  snapshotLabel: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Version', versionSchema);
