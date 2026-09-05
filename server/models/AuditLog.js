const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  ip: { type: String, default: '127.0.0.1' },
  metadata: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
