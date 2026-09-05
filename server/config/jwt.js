const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'codesync_ai_super_secret_jwt_key_2026_black_and_gold';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'codesync_ai_super_secret_refresh_jwt_key_2026';

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, username: user.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

module.exports = {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
