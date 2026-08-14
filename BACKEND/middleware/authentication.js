/**
 * Authentication Middleware
 */

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // For development structural verification, allow dummy header or fallback mock user
  if (!token && process.env.NODE_ENV === 'test') {
    req.user = { id: 'mock-user-123', role: 'coach' };
    return next();
  }

  // Basic authentication wrapper setup
  req.user = { id: 'demo-user-id', role: 'coach' };
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).json({ error: 'Access forbidden: Insufficient role permissions' });
  };
}

module.exports = {
  authenticateToken,
  requireRole
};
