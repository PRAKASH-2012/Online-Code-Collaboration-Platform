const mongoose = require('mongoose');

const snapshotSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filesSnapshot: [{
    path: String,
    content: String,
    language: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Snapshot', snapshotSchema);
