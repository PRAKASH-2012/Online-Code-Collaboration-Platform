const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
  type: { type: String, enum: ['file', 'folder'], default: 'file' },
  content: { type: String, default: '' },
  language: { type: String, default: 'javascript' },
  parentPath: { type: String, default: '/' },
  sizeBytes: { type: Number, default: 0 },
  isUnsaved: { type: Boolean, default: false },
  lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

fileSchema.index({ project: 1, path: 1 }, { unique: true });

module.exports = mongoose.model('File', fileSchema);
