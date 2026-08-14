/**
 * Authentication Middleware — SIH25073
 *
 * Real JWT-based authentication replacing the previous stub.
 * - authenticateToken: Verifies Bearer token, attaches user to req.user
 * - requireRole: Role-based authorization gate
 */

const jwt = require('jsonwebtoken');
const { findById } = require('../models/User');

/**
 * Verify JWT Bearer token and attach authenticated user to req.user.
 * Rejects with 401 if token is missing, invalid, or expired.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Authentication is required.'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'sih25073_default_dev_secret';
    const decoded = jwt.verify(token, secret);

    // Verify user still exists in store
    const user = findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Authentication is required.'
      });
    }

    // Attach verified user info from token (not from client input)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'TOKEN_EXPIRED',
        message: 'Authentication token has expired.'
      });
    }

    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Authentication is required.'
    });
  }
}

/**
 * Role-based authorization middleware.
 * Must be used AFTER authenticateToken.
 * @param {string} role - Required role (e.g., 'ATHLETE', 'COACH')
 */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Authentication is required.'
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        error: 'FORBIDDEN',
        message: 'You do not have permission to access this resource.'
      });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  requireRole
};
