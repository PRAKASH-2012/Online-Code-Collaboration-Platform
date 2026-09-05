const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'Platform Admin') {
    return res.status(403).json({ success: false, message: 'Access denied. Platform Admin privileges required.' });
  }
  next();
};

module.exports = adminMiddleware;
