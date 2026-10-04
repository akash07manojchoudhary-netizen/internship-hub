const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      type: user.role || 'student',
    },
    process.env.JWT_SECRET || 'internship_hub_secret',
    { expiresIn: '7d' }
  );
};

const hashPassword = async (password) => bcrypt.hash(password, 10);
const comparePassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
};
