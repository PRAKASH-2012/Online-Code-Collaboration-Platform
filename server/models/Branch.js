const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

branchSchema.index({ project: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Branch', branchSchema);
