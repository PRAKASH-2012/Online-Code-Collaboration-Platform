const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['User', 'Project', 'Message', 'Comment'], required: true },
  targetId: { type: String, required: true },
  reason: { type: String, required: true },
  details: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Dismissed', 'Action Taken'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
