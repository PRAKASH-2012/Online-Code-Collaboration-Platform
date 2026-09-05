const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  collegeOrCompany: { type: String, default: 'CodeSync AI Developer' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  githubUsername: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  skills: [{ type: String }],
  languages: [{ type: String }],
  role: { type: String, enum: ['Platform Admin', 'Org Admin', 'Developer'], default: 'Developer' },
  isSuspended: { type: Boolean, default: false },
  availability: { type: String, enum: ['Available', 'Busy', 'Offline'], default: 'Available' },
  timeZone: { type: String, default: 'UTC+05:30' },
  activeSessions: [{
    device: String,
    ip: String,
    lastActive: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
