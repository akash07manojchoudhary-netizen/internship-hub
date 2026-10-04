const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  college: { type: String, default: '' },
  skills: { type: [String], default: [] },
  cgpa: { type: Number, default: 0 },
  bio: { type: String, default: '' },
  resume: { type: String, default: '' },
  role: { type: String, default: 'student' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
