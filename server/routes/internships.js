const express = require('express');
const Student = require('../models/Student');
const Company = require('../models/Company');
const { generateToken, hashPassword, comparePassword } = require('../utils/generateToken');

const router = express.Router();

const sanitizeStudent = (student) => ({
  _id: student._id,
  name: student.name,
  email: student.email,
  college: student.college,
  skills: student.skills,
  cgpa: student.cgpa,
  bio: student.bio,
  resume: student.resume,
  role: student.role,
});

const sanitizeCompany = (company) => ({
  _id: company._id,
  companyName: company.companyName,
  email: company.email,
  industry: company.industry,
  website: company.website,
  hiringFor: company.hiringFor,
  description: company.description,
  role: company.role,
});

router.post('/student/signup', async (req, res) => {
  try {
    const { name, email, password, college, skills, cgpa, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const student = await Student.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      college: college || '',
      skills: Array.isArray(skills) ? skills : [],
      cgpa: cgpa || 0,
      bio: bio || '',
    });

    const token = generateToken({ ...student.toObject(), role: 'student' });

    res.status(201).json({
      token,
      user: sanitizeStudent(student),
      role: 'student',
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to register student' });
  }
});

router.post('/student/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email: email.toLowerCase() });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isMatch = await comparePassword(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({ ...student.toObject(), role: 'student' });

    res.json({
      token,
      user: sanitizeStudent(student),
      role: 'student',
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

router.post('/company/signup', async (req, res) => {
  try {
    const { companyName, email, password, industry, website, hiringFor, description } = req.body;

    if (!companyName || !email || !password) {
      return res.status(400).json({ message: 'Company name, email and password are required' });
    }

    const existingCompany = await Company.findOne({ email: email.toLowerCase() });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const company = await Company.create({
      companyName,
      email: email.toLowerCase(),
      password: hashedPassword,
      industry: industry || '',
      website: website || '',
      hiringFor: Array.isArray(hiringFor) ? hiringFor : [],
      description: description || '',
    });

    const token = generateToken({ ...company.toObject(), role: 'company' });

    res.status(201).json({
      token,
      user: sanitizeCompany(company),
      role: 'company',
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to register company' });
  }
});

router.post('/company/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email: email.toLowerCase() });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const isMatch = await comparePassword(password, company.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({ ...company.toObject(), role: 'company' });

    res.json({
      token,
      user: sanitizeCompany(company),
      role: 'company',
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

module.exports = router;
