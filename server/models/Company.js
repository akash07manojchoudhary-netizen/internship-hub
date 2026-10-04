const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  industry: { type: String, default: '' },
  website: { type: String, default: '' },
  hiringFor: { type: [String], default: [] },
  description: { type: String, default: '' },
  role: { type: String, default: 'company' },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
