const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  dueDate: { type: Date },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  progressPercentage: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Milestone', milestoneSchema);
