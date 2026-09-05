const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'code' },
  color: { type: String, default: '#D4AF37' },
  category: { type: String, default: 'General' },
  language: { type: String, default: 'javascript' },
  framework: { type: String, default: 'React' },
  template: { type: String, default: 'React Starter' },
  visibility: { type: String, enum: ['Public', 'Private', 'Unlisted', 'Organization-Only'], default: 'Public' },
  license: { type: String, default: 'MIT' },
  readmeContent: { type: String, default: '# Project Readme\nWelcome to CodeSync AI Project.' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  tags: [{ type: String }],
  isArchived: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  starsCount: { type: Number, default: 0 },
  forksCount: { type: Number, default: 0 },
  forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  defaultBranch: { type: String, default: 'main' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
