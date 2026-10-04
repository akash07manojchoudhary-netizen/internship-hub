const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: { type: [String], default: [] },
  stipend: { type: Number, default: 0 },
  location: { type: String, default: 'Remote' },
  type: { type: String, default: 'Internship' },
  applyLink: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
