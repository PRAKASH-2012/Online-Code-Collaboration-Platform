const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['Maintainer', 'Editor', 'Reviewer', 'Viewer'], default: 'Editor' },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Revoked'], default: 'Pending' },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ProjectInvitation', invitationSchema);
